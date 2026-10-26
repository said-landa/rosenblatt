import AppKit
import MetalKit
import SwiftUI

struct AssemblyViewport: NSViewRepresentable {
    func makeNSView(context: Context) -> AssemblyMetalView {
        AssemblyMetalView()
    }

    func updateNSView(_ nsView: AssemblyMetalView, context: Context) {}
}

final class AssemblyMetalView: MTKView {
    private var assemblyRenderer: AssemblyRenderer!
    private var interaction: Interaction = .none

    private enum Interaction {
        case none
        case shackle
        case camera
    }

    init() {
        let device = MTLCreateSystemDefaultDevice()!
        super.init(frame: .zero, device: device)
        colorPixelFormat = .bgra8Unorm_srgb
        depthStencilPixelFormat = .depth32Float
        sampleCount = 4
        clearColor = MTLClearColor(red: 0.018, green: 0.024, blue: 0.034, alpha: 1)
        preferredFramesPerSecond = 60
        enableSetNeedsDisplay = false
        isPaused = false
        assemblyRenderer = try! AssemblyRenderer(
            device: device,
            colorPixelFormat: colorPixelFormat,
            depthPixelFormat: depthStencilPixelFormat,
            sampleCount: sampleCount
        )
        delegate = assemblyRenderer
    }

    required init(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override var acceptsFirstResponder: Bool { true }

    override func mouseDown(with event: NSEvent) {
        let point = convert(event.locationInWindow, from: nil)
        interaction = assemblyRenderer.hitsShackle(point: point, viewportSize: bounds.size)
            ? .shackle
            : .camera
        assemblyRenderer.setShackleSelected(interaction == .shackle)
    }

    override func mouseDragged(with event: NSEvent) {
        switch interaction {
        case .shackle:
            assemblyRenderer.moveShackle(screenDeltaY: Float(event.deltaY))
        case .camera:
            assemblyRenderer.orbit(deltaX: Float(event.deltaX), deltaY: Float(event.deltaY))
        case .none:
            break
        }
    }

    override func mouseUp(with event: NSEvent) {
        if interaction == .shackle {
            assemblyRenderer.releaseShackle()
        }
        assemblyRenderer.setShackleSelected(false)
        interaction = .none
    }

    override func scrollWheel(with event: NSEvent) {
        assemblyRenderer.zoom(delta: Float(event.scrollingDeltaY))
    }
}
