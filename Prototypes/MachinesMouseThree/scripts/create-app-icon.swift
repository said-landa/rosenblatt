import AppKit
let lab = CommandLine.arguments.contains("--lab")
let context = CGContext(data: nil, width: 1024, height: 1024,
    bitsPerComponent: 8, bytesPerRow: 4096, space: CGColorSpaceCreateDeviceRGB(),
    bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(cgContext: context, flipped: false)
let dark = NSColor(calibratedRed: 0.035, green: 0.044, blue: 0.085, alpha: 1)
let mint = NSColor(calibratedRed: 0.30, green: 0.88, blue: 0.72, alpha: 1)
(lab ? dark : mint).setFill()
NSBezierPath(rect: NSRect(x: 0, y: 0, width: 1024, height: 1024)).fill()
let accent = lab ? NSColor(calibratedRed: 0.64, green: 0.73, blue: 1, alpha: 1) : dark
let points = [NSPoint(x: 250, y: 274), NSPoint(x: 250, y: 750), NSPoint(x: 512, y: 438), NSPoint(x: 774, y: 750), NSPoint(x: 774, y: 274)]
for i in 0..<4 {
    let from = points[i], to = points[i+1]
    let dx = to.x-from.x, dy = to.y-from.y, length = sqrt(dx*dx+dy*dy)
    let p = NSBezierPath()
    p.move(to: NSPoint(x: from.x+dx/length*55, y: from.y+dy/length*55))
    p.line(to: NSPoint(x: to.x-dx/length*55, y: to.y-dy/length*55))
    p.lineWidth = 66; p.lineCapStyle = .round
    accent.setStroke(); p.stroke()
}
for (i, point) in points.enumerated() {
    (i == 2 ? NSColor.white : accent).setFill()
    NSBezierPath(roundedRect: NSRect(x: point.x-46, y: point.y-46, width: 92, height: 92), xRadius: 22, yRadius: 22).fill()
}
NSGraphicsContext.restoreGraphicsState()
context.flush()
let bitmap = NSBitmapImageRep(cgImage: context.makeImage()!)
try bitmap.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: CommandLine.arguments[1]))
