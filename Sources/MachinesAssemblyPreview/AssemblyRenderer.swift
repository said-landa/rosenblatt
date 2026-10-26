import AppKit
import MachinesGeometry
import MetalKit
import simd

private struct FrameUniforms {
    var modelViewProjection: simd_float4x4
    var model: simd_float4x4
    var color: SIMD4<Float>
}

private struct GPUMesh {
    let vertexBuffer: MTLBuffer
    let indexBuffer: MTLBuffer
    let indexCount: Int

    init(device: MTLDevice, data: MeshData) {
        vertexBuffer = device.makeBuffer(
            bytes: data.vertices,
            length: MemoryLayout<MeshVertex>.stride * data.vertices.count
        )!
        indexBuffer = device.makeBuffer(
            bytes: data.indices,
            length: MemoryLayout<UInt32>.stride * data.indices.count
        )!
        indexCount = data.indices.count
    }
}

final class AssemblyRenderer: NSObject, MTKViewDelegate {
    private let commandQueue: MTLCommandQueue
    private let pipeline: MTLRenderPipelineState
    private let depthState: MTLDepthStencilState
    private let bodyMesh: GPUMesh
    private let shackleMesh: GPUMesh
    private let floorMesh: GPUMesh

    private var viewportSize = CGSize(width: 1, height: 1)
    private var shackleProgress: Float = 0
    private var shackleTarget: Float = 0
    private var shackleSelected = false
    private var yaw: Float = -0.42
    private var pitch: Float = 0.18
    private var distance: Float = 7.2
    private var elapsed: Float = 0

    init(
        device: MTLDevice,
        colorPixelFormat: MTLPixelFormat,
        depthPixelFormat: MTLPixelFormat,
        sampleCount: Int
    ) throws {
        commandQueue = device.makeCommandQueue()!

        let library = try device.makeLibrary(source: Self.shaderSource, options: nil)
        let descriptor = MTLRenderPipelineDescriptor()
        descriptor.vertexFunction = library.makeFunction(name: "assemblyVertex")
        descriptor.fragmentFunction = library.makeFunction(name: "assemblyFragment")
        descriptor.colorAttachments[0].pixelFormat = colorPixelFormat
        descriptor.colorAttachments[0].isBlendingEnabled = true
        descriptor.colorAttachments[0].sourceRGBBlendFactor = .sourceAlpha
        descriptor.colorAttachments[0].destinationRGBBlendFactor = .oneMinusSourceAlpha
        descriptor.depthAttachmentPixelFormat = depthPixelFormat
        descriptor.rasterSampleCount = sampleCount
        pipeline = try device.makeRenderPipelineState(descriptor: descriptor)

        let depthDescriptor = MTLDepthStencilDescriptor()
        depthDescriptor.isDepthWriteEnabled = true
        depthDescriptor.depthCompareFunction = .less
        depthState = device.makeDepthStencilState(descriptor: depthDescriptor)!

        bodyMesh = GPUMesh(device: device, data: MeshBuilder.box(ReferencePadlock01.body))
        shackleMesh = GPUMesh(device: device, data: MeshBuilder.shackle(ReferencePadlock01.shackle))
        floorMesh = GPUMesh(device: device, data: MeshBuilder.box(BoxRecipe(
            size: SIMD3(7.5, 0.06, 5.6),
            center: SIMD3(0, -1.08, 0)
        )))
        super.init()
    }

    func setShackleSelected(_ selected: Bool) {
        shackleSelected = selected
        shackleTarget = shackleProgress
    }

    func moveShackle(screenDeltaY: Float) {
        let next = shackleProgress - screenDeltaY * 0.006
        shackleProgress = ReferencePadlock01.insertion.clampedProgress(next)
        shackleTarget = shackleProgress
    }

    func releaseShackle() {
        shackleTarget = ReferencePadlock01.insertion.releasedTarget(progress: shackleProgress)
    }

    func orbit(deltaX: Float, deltaY: Float) {
        yaw += deltaX * 0.008
        pitch = min(0.72, max(-0.28, pitch + deltaY * 0.006))
    }

    func zoom(delta: Float) {
        distance = min(10, max(4.5, distance + delta * 0.012))
    }

    func hitsShackle(point: CGPoint, viewportSize: CGSize) -> Bool {
        let center = SIMD3<Float>(
            0,
            1.35 + ReferencePadlock01.insertion.verticalOffset(progress: shackleProgress),
            0
        )
        let projected = project(center, viewportSize: viewportSize)
        let dx = Float(point.x) - projected.x
        let dy = Float(point.y) - projected.y
        return dx * dx + dy * dy < 175 * 175
    }

    func mtkView(_ view: MTKView, drawableSizeWillChange size: CGSize) {
        viewportSize = size
    }

    func draw(in view: MTKView) {
        guard let descriptor = view.currentRenderPassDescriptor,
              let drawable = view.currentDrawable,
              let commandBuffer = commandQueue.makeCommandBuffer(),
              let encoder = commandBuffer.makeRenderCommandEncoder(descriptor: descriptor) else { return }

        elapsed += 1 / Float(max(1, view.preferredFramesPerSecond))
        if !shackleSelected {
            shackleProgress += (shackleTarget - shackleProgress) * 0.14
        }

        let aspect = Float(max(1, viewportSize.width) / max(1, viewportSize.height))
        let viewProjection = projectionMatrix(aspect: aspect) * cameraMatrix()

        encoder.setRenderPipelineState(pipeline)
        encoder.setDepthStencilState(depthState)
        encoder.setCullMode(.back)

        draw(
            floorMesh,
            model: matrix_identity_float4x4,
            color: SIMD4(0.055, 0.07, 0.09, 1),
            viewProjection: viewProjection,
            encoder: encoder
        )

        draw(
            bodyMesh,
            model: matrix_identity_float4x4,
            color: SIMD4(0.12, 0.20, 0.29, 1),
            viewProjection: viewProjection,
            encoder: encoder
        )

        if shackleProgress < 0.985 {
            let pulse = 0.12 + 0.035 * (sin(elapsed * 3.2) + 1)
            draw(
                shackleMesh,
                model: translation(y: 0.35),
                color: SIMD4(0.12, 0.82, 0.92, pulse),
                viewProjection: viewProjection,
                encoder: encoder
            )
        }

        let shackleY = 0.35 + ReferencePadlock01.insertion.verticalOffset(progress: shackleProgress)
        let shackleColor: SIMD4<Float>
        if shackleSelected {
            shackleColor = SIMD4(0.30, 0.92, 1.0, 1)
        } else if shackleProgress > 0.985 {
            shackleColor = SIMD4(0.38, 0.88, 0.69, 1)
        } else {
            shackleColor = SIMD4(0.72, 0.78, 0.84, 1)
        }
        draw(
            shackleMesh,
            model: translation(y: shackleY),
            color: shackleColor,
            viewProjection: viewProjection,
            encoder: encoder
        )

        encoder.endEncoding()
        commandBuffer.present(drawable)
        commandBuffer.commit()
    }

    private func draw(
        _ mesh: GPUMesh,
        model: simd_float4x4,
        color: SIMD4<Float>,
        viewProjection: simd_float4x4,
        encoder: MTLRenderCommandEncoder
    ) {
        var uniforms = FrameUniforms(
            modelViewProjection: viewProjection * model,
            model: model,
            color: color
        )
        encoder.setVertexBuffer(mesh.vertexBuffer, offset: 0, index: 0)
        encoder.setVertexBytes(&uniforms, length: MemoryLayout<FrameUniforms>.stride, index: 1)
        encoder.setFragmentBytes(&uniforms, length: MemoryLayout<FrameUniforms>.stride, index: 1)
        encoder.drawIndexedPrimitives(
            type: .triangle,
            indexCount: mesh.indexCount,
            indexType: .uint32,
            indexBuffer: mesh.indexBuffer,
            indexBufferOffset: 0
        )
    }

    private func project(_ position: SIMD3<Float>, viewportSize: CGSize) -> SIMD2<Float> {
        let aspect = Float(max(1, viewportSize.width) / max(1, viewportSize.height))
        let clip = projectionMatrix(aspect: aspect) * cameraMatrix() * SIMD4(position, 1)
        let ndc = SIMD3(clip.x, clip.y, clip.z) / clip.w
        return SIMD2(
            (ndc.x + 1) * 0.5 * Float(viewportSize.width),
            (ndc.y + 1) * 0.5 * Float(viewportSize.height)
        )
    }

    private func cameraMatrix() -> simd_float4x4 {
        let target = SIMD3<Float>(0, 0.75, 0)
        let eye = target + SIMD3(
            sin(yaw) * cos(pitch) * distance,
            sin(pitch) * distance,
            cos(yaw) * cos(pitch) * distance
        )
        return lookAt(eye: eye, target: target, up: SIMD3(0, 1, 0))
    }

    private func projectionMatrix(aspect: Float) -> simd_float4x4 {
        perspective(fovY: 0.72, aspect: aspect, near: 0.1, far: 100)
    }

    private func translation(y: Float) -> simd_float4x4 {
        var matrix = matrix_identity_float4x4
        matrix.columns.3.y = y
        return matrix
    }

    private static let shaderSource = """
    #include <metal_stdlib>
    using namespace metal;

    struct VertexIn {
        float3 position;
        float3 normal;
    };

    struct Uniforms {
        float4x4 modelViewProjection;
        float4x4 model;
        float4 color;
    };

    struct VertexOut {
        float4 position [[position]];
        float3 worldNormal;
        float3 worldPosition;
    };

    vertex VertexOut assemblyVertex(
        const device VertexIn *vertices [[buffer(0)]],
        constant Uniforms &uniforms [[buffer(1)]],
        uint vertexID [[vertex_id]]
    ) {
        VertexOut out;
        float4 local = float4(vertices[vertexID].position, 1.0);
        out.position = uniforms.modelViewProjection * local;
        out.worldPosition = (uniforms.model * local).xyz;
        out.worldNormal = normalize((uniforms.model * float4(vertices[vertexID].normal, 0.0)).xyz);
        return out;
    }

    fragment float4 assemblyFragment(
        VertexOut in [[stage_in]],
        constant Uniforms &uniforms [[buffer(1)]]
    ) {
        float3 normal = normalize(in.worldNormal);
        float3 key = normalize(float3(-0.45, 0.8, 0.55));
        float diffuse = max(dot(normal, key), 0.0);
        float underside = max(dot(normal, -key), 0.0) * 0.12;
        float3 color = uniforms.color.rgb * (0.25 + diffuse * 0.72 + underside);
        float rim = pow(1.0 - abs(normal.z), 3.0) * 0.12;
        return float4(color + rim, uniforms.color.a);
    }
    """
}

private func perspective(fovY: Float, aspect: Float, near: Float, far: Float) -> simd_float4x4 {
    let y = 1 / tan(fovY * 0.5)
    let x = y / aspect
    let z = far / (near - far)
    return simd_float4x4(columns: (
        SIMD4(x, 0, 0, 0),
        SIMD4(0, y, 0, 0),
        SIMD4(0, 0, z, -1),
        SIMD4(0, 0, z * near, 0)
    ))
}

private func lookAt(eye: SIMD3<Float>, target: SIMD3<Float>, up: SIMD3<Float>) -> simd_float4x4 {
    let z = simd_normalize(eye - target)
    let x = simd_normalize(simd_cross(up, z))
    let y = simd_cross(z, x)
    return simd_float4x4(columns: (
        SIMD4(x.x, y.x, z.x, 0),
        SIMD4(x.y, y.y, z.y, 0),
        SIMD4(x.z, y.z, z.z, 0),
        SIMD4(-simd_dot(x, eye), -simd_dot(y, eye), -simd_dot(z, eye), 1)
    ))
}
