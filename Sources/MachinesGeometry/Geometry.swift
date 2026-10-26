import Foundation
import simd

public struct MeshVertex: Sendable {
    public var position: SIMD3<Float>
    public var normal: SIMD3<Float>

    public init(position: SIMD3<Float>, normal: SIMD3<Float>) {
        self.position = position
        self.normal = normal
    }
}

public struct MeshData: Sendable {
    public var vertices: [MeshVertex]
    public var indices: [UInt32]

    public init(vertices: [MeshVertex], indices: [UInt32]) {
        self.vertices = vertices
        self.indices = indices
    }

    public var bounds: (minimum: SIMD3<Float>, maximum: SIMD3<Float>)? {
        guard let first = vertices.first?.position else { return nil }
        return vertices.dropFirst().reduce(into: (first, first)) { result, vertex in
            result.0 = simd.min(result.0, vertex.position)
            result.1 = simd.max(result.1, vertex.position)
        }
    }
}

public struct BoxRecipe: Sendable, Equatable {
    public var size: SIMD3<Float>
    public var center: SIMD3<Float>

    public init(size: SIMD3<Float>, center: SIMD3<Float> = .zero) {
        self.size = size
        self.center = center
    }
}

public struct ShackleRecipe: Sendable, Equatable {
    public var stockRadius: Float
    public var centerlineHalfWidth: Float
    public var straightLength: Float
    public var radialSegments: Int
    public var bendSegments: Int

    public init(
        stockRadius: Float,
        centerlineHalfWidth: Float,
        straightLength: Float,
        radialSegments: Int = 20,
        bendSegments: Int = 28
    ) {
        self.stockRadius = stockRadius
        self.centerlineHalfWidth = centerlineHalfWidth
        self.straightLength = straightLength
        self.radialSegments = radialSegments
        self.bendSegments = bendSegments
    }
}

public enum MeshBuilder {
    public static func box(_ recipe: BoxRecipe) -> MeshData {
        let h = recipe.size * 0.5
        let faces: [(SIMD3<Float>, [SIMD3<Float>])] = [
            (SIMD3(0, 0, 1), [SIMD3(-h.x, -h.y, h.z), SIMD3(h.x, -h.y, h.z), SIMD3(h.x, h.y, h.z), SIMD3(-h.x, h.y, h.z)]),
            (SIMD3(0, 0, -1), [SIMD3(h.x, -h.y, -h.z), SIMD3(-h.x, -h.y, -h.z), SIMD3(-h.x, h.y, -h.z), SIMD3(h.x, h.y, -h.z)]),
            (SIMD3(1, 0, 0), [SIMD3(h.x, -h.y, h.z), SIMD3(h.x, -h.y, -h.z), SIMD3(h.x, h.y, -h.z), SIMD3(h.x, h.y, h.z)]),
            (SIMD3(-1, 0, 0), [SIMD3(-h.x, -h.y, -h.z), SIMD3(-h.x, -h.y, h.z), SIMD3(-h.x, h.y, h.z), SIMD3(-h.x, h.y, -h.z)]),
            (SIMD3(0, 1, 0), [SIMD3(-h.x, h.y, h.z), SIMD3(h.x, h.y, h.z), SIMD3(h.x, h.y, -h.z), SIMD3(-h.x, h.y, -h.z)]),
            (SIMD3(0, -1, 0), [SIMD3(-h.x, -h.y, -h.z), SIMD3(h.x, -h.y, -h.z), SIMD3(h.x, -h.y, h.z), SIMD3(-h.x, -h.y, h.z)])
        ]

        var vertices: [MeshVertex] = []
        var indices: [UInt32] = []
        for (normal, corners) in faces {
            let base = UInt32(vertices.count)
            vertices.append(contentsOf: corners.map { MeshVertex(position: $0 + recipe.center, normal: normal) })
            indices.append(contentsOf: [base, base + 1, base + 2, base, base + 2, base + 3])
        }
        return MeshData(vertices: vertices, indices: indices)
    }

    public static func shackle(_ recipe: ShackleRecipe) -> MeshData {
        precondition(recipe.stockRadius > 0)
        precondition(recipe.centerlineHalfWidth > recipe.stockRadius)
        precondition(recipe.straightLength > 0)
        precondition(recipe.radialSegments >= 3)
        precondition(recipe.bendSegments >= 3)

        var centers: [SIMD3<Float>] = []
        let straightSamples = max(3, recipe.bendSegments / 2)

        for index in 0..<straightSamples {
            let t = Float(index) / Float(straightSamples - 1)
            centers.append(SIMD3(-recipe.centerlineHalfWidth, t * recipe.straightLength, 0))
        }
        for index in 1...recipe.bendSegments {
            let angle = Float.pi - Float(index) / Float(recipe.bendSegments) * Float.pi
            centers.append(SIMD3(
                cos(angle) * recipe.centerlineHalfWidth,
                recipe.straightLength + sin(angle) * recipe.centerlineHalfWidth,
                0
            ))
        }
        for index in 1..<straightSamples {
            let t = Float(index) / Float(straightSamples - 1)
            centers.append(SIMD3(recipe.centerlineHalfWidth, recipe.straightLength * (1 - t), 0))
        }

        var vertices: [MeshVertex] = []
        for index in centers.indices {
            let previous = centers[max(0, index - 1)]
            let next = centers[min(centers.count - 1, index + 1)]
            let tangent = simd_normalize(next - previous)
            let planarNormal = simd_normalize(simd_cross(SIMD3<Float>(0, 0, 1), tangent))
            for radialIndex in 0..<recipe.radialSegments {
                let angle = 2 * Float.pi * Float(radialIndex) / Float(recipe.radialSegments)
                let normal = planarNormal * cos(angle) + SIMD3<Float>(0, 0, 1) * sin(angle)
                vertices.append(MeshVertex(
                    position: centers[index] + normal * recipe.stockRadius,
                    normal: normal
                ))
            }
        }

        var indices: [UInt32] = []
        for pathIndex in 0..<(centers.count - 1) {
            for radialIndex in 0..<recipe.radialSegments {
                let nextRadial = (radialIndex + 1) % recipe.radialSegments
                let a = UInt32(pathIndex * recipe.radialSegments + radialIndex)
                let b = UInt32(pathIndex * recipe.radialSegments + nextRadial)
                let c = UInt32((pathIndex + 1) * recipe.radialSegments + nextRadial)
                let d = UInt32((pathIndex + 1) * recipe.radialSegments + radialIndex)
                indices.append(contentsOf: [a, b, c, a, c, d])
            }
        }
        appendCap(center: centers.first!, tangent: simd_normalize(centers[0] - centers[1]), recipe: recipe, vertices: &vertices, indices: &indices)
        appendCap(center: centers.last!, tangent: simd_normalize(centers.last! - centers[centers.count - 2]), recipe: recipe, vertices: &vertices, indices: &indices)
        return MeshData(vertices: vertices, indices: indices)
    }

    private static func appendCap(
        center: SIMD3<Float>,
        tangent: SIMD3<Float>,
        recipe: ShackleRecipe,
        vertices: inout [MeshVertex],
        indices: inout [UInt32]
    ) {
        let centerIndex = UInt32(vertices.count)
        vertices.append(MeshVertex(position: center, normal: tangent))
        let ringStart = UInt32(vertices.count)
        let planarNormal = simd_normalize(simd_cross(SIMD3<Float>(0, 0, 1), tangent))
        for radialIndex in 0..<recipe.radialSegments {
            let angle = 2 * Float.pi * Float(radialIndex) / Float(recipe.radialSegments)
            let offset = planarNormal * cos(angle) + SIMD3<Float>(0, 0, 1) * sin(angle)
            vertices.append(MeshVertex(position: center + offset * recipe.stockRadius, normal: tangent))
        }
        for radialIndex in 0..<recipe.radialSegments {
            let next = (radialIndex + 1) % recipe.radialSegments
            indices.append(contentsOf: [centerIndex, ringStart + UInt32(radialIndex), ringStart + UInt32(next)])
        }
    }
}

public struct ShackleInsertionConstraint: Sendable, Equatable {
    public var explodedOffset: Float
    public var snapThreshold: Float

    public init(explodedOffset: Float = 1.65, snapThreshold: Float = 0.78) {
        self.explodedOffset = explodedOffset
        self.snapThreshold = snapThreshold
    }

    public func clampedProgress(_ value: Float) -> Float {
        min(1, max(0, value))
    }

    public func verticalOffset(progress: Float) -> Float {
        explodedOffset * (1 - clampedProgress(progress))
    }

    public func releasedTarget(progress: Float) -> Float {
        clampedProgress(progress) >= snapThreshold ? 1 : 0
    }
}

public enum ReferencePadlock01 {
    public static let body = BoxRecipe(size: SIMD3(2.65, 2.05, 0.95))
    public static let shackle = ShackleRecipe(
        stockRadius: 0.18,
        centerlineHalfWidth: 0.78,
        straightLength: 1.75
    )
    public static let insertion = ShackleInsertionConstraint()
}
