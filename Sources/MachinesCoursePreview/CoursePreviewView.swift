import MachinesCore
import SwiftUI

struct CoursePreviewView: View {
    @ObservedObject var model: CourseViewModel

    var body: some View {
        Group {
            if let error = model.loadError {
                ContentUnavailableView(
                    "Curso no disponible",
                    systemImage: "exclamationmark.triangle",
                    description: Text(error)
                )
            } else if let runtime = model.runtime {
                course(runtime: runtime)
            }
        }
        .background(Color(red: 0.055, green: 0.067, blue: 0.085))
        .preferredColorScheme(.dark)
    }

    private func course(runtime: CourseRuntime) -> some View {
        VStack(spacing: 0) {
            header(runtime: runtime)
            Divider().opacity(0.5)
            HStack(spacing: 0) {
                schematic(runtime: runtime)
                Divider().opacity(0.5)
                actionPanel(runtime: runtime)
                    .frame(width: 390)
            }
        }
    }

    private func header(runtime: CourseRuntime) -> some View {
        HStack(spacing: 16) {
            VStack(alignment: .leading, spacing: 4) {
                Text("MACHINES · GENERATION 0")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.secondary)
                Text(runtime.build.course.title)
                    .font(.title2.weight(.semibold))
            }
            Spacer()
            Text(runtime.build.course.lifecycleState)
                .font(.caption.monospaced().weight(.medium))
                .padding(.horizontal, 10)
                .padding(.vertical, 6)
                .background(.orange.opacity(0.14), in: Capsule())
                .foregroundStyle(.orange)
            Button("Reiniciar", action: model.restart)
                .buttonStyle(.bordered)
        }
        .padding(.horizontal, 24)
        .padding(.vertical, 16)
    }

    private func schematic(runtime: CourseRuntime) -> some View {
        VStack(alignment: .leading, spacing: 16) {
            VStack(alignment: .leading, spacing: 6) {
                Text("Corte esquemático")
                    .font(.headline)
                Text("La geometría es deliberadamente aproximada; las identidades y relaciones son semánticas.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            SchematicCanvas(elements: runtime.visibleRepresentations)
                .aspectRatio(5.0 / 3.0, contentMode: .fit)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(
                    Color.white.opacity(0.025),
                    in: RoundedRectangle(cornerRadius: 18)
                )
                .overlay {
                    RoundedRectangle(cornerRadius: 18)
                        .stroke(Color.white.opacity(0.08))
                }

            HStack(spacing: 18) {
                legend(color: .init(red: 0.86, green: 0.67, blue: 0.28), text: "Llave / pernos clave")
                legend(color: .init(red: 0.63, green: 0.72, blue: 0.82), text: "Núcleo / carcasa")
                legend(color: .init(red: 0.82, green: 0.38, blue: 0.34), text: "Pernos impulsores")
            }
            .font(.caption)
        }
        .padding(24)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private func actionPanel(runtime: CourseRuntime) -> some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                ProgressView(value: model.progressFraction)
                    .tint(.cyan)

                if let step = runtime.currentStep {
                    Text("\(step.chapterTitle) · \(step.lessonTitle)")
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(.cyan)
                    Text(step.instruction)
                        .font(.title3.weight(.semibold))
                        .fixedSize(horizontal: false, vertical: true)
                    Text(step.objective)
                        .font(.callout)
                        .foregroundStyle(.secondary)
                        .fixedSize(horizontal: false, vertical: true)

                    controls(for: step)

                    Button {
                        model.requestHelp()
                    } label: {
                        Label("Necesito una pista", systemImage: "lightbulb")
                    }
                    .buttonStyle(.borderless)
                } else {
                    completion(runtime: runtime)
                }

                if !model.feedback.isEmpty {
                    feedbackCard
                }

                Spacer(minLength: 0)
            }
            .padding(24)
        }
    }

    @ViewBuilder
    private func controls(for step: CompiledStep) -> some View {
        switch step.action.kind {
        case .placeComponent:
            VStack(alignment: .leading, spacing: 10) {
                Text("Piezas disponibles")
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(.secondary)
                ForEach(model.unplacedComponents) { component in
                    Button {
                        model.place(componentID: component.id)
                    } label: {
                        HStack {
                            VStack(alignment: .leading, spacing: 3) {
                                Text(component.name).fontWeight(.medium)
                                Text(component.function)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                                    .lineLimit(2)
                            }
                            Spacer()
                            Image(systemName: "plus.circle.fill")
                                .foregroundStyle(.cyan)
                        }
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(12)
                    }
                    .buttonStyle(.plain)
                    .background(Color.white.opacity(0.05), in: RoundedRectangle(cornerRadius: 10))
                }
            }
        case .answerCheck:
            if let check = model.currentCheck {
                VStack(alignment: .leading, spacing: 10) {
                    Text(check.prompt)
                        .font(.callout.weight(.medium))
                    ForEach(check.options) { option in
                        Button(option.label) {
                            model.answer(checkID: check.id, optionID: option.id)
                        }
                        .buttonStyle(.bordered)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    }
                }
            }
        case .rotatePlug:
            Button {
                model.rotatePlug()
            } label: {
                Label("Girar el núcleo", systemImage: "rotate.right")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .tint(.cyan)
        }
    }

    private func completion(runtime: CourseRuntime) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            Image(systemName: "checkmark.seal.fill")
                .font(.system(size: 42))
                .foregroundStyle(.green)
            Text("Mecanismo completo")
                .font(.title2.weight(.semibold))
            Text(runtime.build.course.outcome)
                .foregroundStyle(.secondary)
                .fixedSize(horizontal: false, vertical: true)
            Text("Este resultado prueba ejecución, no validación pedagógica ni fidelidad mecánica final.")
                .font(.caption)
                .foregroundStyle(.orange)
        }
    }

    private var feedbackCard: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: feedbackIcon)
                .foregroundStyle(feedbackColor)
            Text(model.feedback)
                .font(.callout)
                .fixedSize(horizontal: false, vertical: true)
        }
        .padding(12)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(feedbackColor.opacity(0.1), in: RoundedRectangle(cornerRadius: 10))
    }

    private var feedbackIcon: String {
        switch model.feedbackAccepted {
        case true: "checkmark.circle.fill"
        case false: "arrow.counterclockwise.circle.fill"
        case nil: "lightbulb.fill"
        }
    }

    private var feedbackColor: Color {
        switch model.feedbackAccepted {
        case true: .green
        case false: .orange
        case nil: .yellow
        }
    }

    private func legend(color: Color, text: String) -> some View {
        HStack(spacing: 6) {
            Circle().fill(color).frame(width: 8, height: 8)
            Text(text).foregroundStyle(.secondary)
        }
    }
}

private struct SchematicCanvas: View {
    let elements: [SchematicElement]

    var body: some View {
        Canvas { context, size in
            let scaleX = size.width / 1000
            let scaleY = size.height / 600
            for element in elements {
                draw(element, in: &context, scaleX: scaleX, scaleY: scaleY)
            }
        }
        .padding(12)
    }

    private func draw(
        _ element: SchematicElement,
        in context: inout GraphicsContext,
        scaleX: Double,
        scaleY: Double
    ) {
        let shape = element.shape
        let style = element.style
        let opacity = style.opacity ?? 1

        if shape.kind == .label, let text = shape.text, let x = shape.x, let y = shape.y {
            context.draw(
                Text(text)
                    .font(.system(size: (style.fontSize ?? 18) * min(scaleX, scaleY), weight: .semibold))
                    .foregroundColor(color(style.fillToken).opacity(opacity)),
                at: CGPoint(x: x * scaleX, y: y * scaleY)
            )
            return
        }

        var path = Path()
        switch shape.kind {
        case .rectangle, .roundedRectangle, .ellipse:
            guard let x = shape.x, let y = shape.y, let width = shape.width, let height = shape.height else { return }
            let rect = CGRect(x: x * scaleX, y: y * scaleY, width: width * scaleX, height: height * scaleY)
            if shape.kind == .roundedRectangle {
                path.addRoundedRect(in: rect, cornerSize: CGSize(
                    width: (shape.cornerRadius ?? 12) * scaleX,
                    height: (shape.cornerRadius ?? 12) * scaleY
                ))
            } else if shape.kind == .ellipse {
                path.addEllipse(in: rect)
            } else {
                path.addRect(rect)
            }
        case .rectangles:
            guard let rectangles = shape.rectangles else { return }
            for rectangle in rectangles {
                path.addRect(CGRect(
                    x: rectangle.x * scaleX,
                    y: rectangle.y * scaleY,
                    width: rectangle.width * scaleX,
                    height: rectangle.height * scaleY
                ))
            }
        case .line, .polyline, .polygon:
            guard let points = shape.points, let first = points.first else { return }
            path.move(to: CGPoint(x: first.x * scaleX, y: first.y * scaleY))
            for point in points.dropFirst() {
                path.addLine(to: CGPoint(x: point.x * scaleX, y: point.y * scaleY))
            }
            if shape.kind == .polygon { path.closeSubpath() }
        case .polylines:
            guard let polylines = shape.polylines else { return }
            for points in polylines {
                guard let first = points.first else { continue }
                path.move(to: CGPoint(x: first.x * scaleX, y: first.y * scaleY))
                for point in points.dropFirst() {
                    path.addLine(to: CGPoint(x: point.x * scaleX, y: point.y * scaleY))
                }
            }
        case .label:
            return
        }

        if let fillToken = style.fillToken {
            context.fill(path, with: .color(color(fillToken).opacity(opacity)))
        }
        if let strokeToken = style.strokeToken {
            context.stroke(
                path,
                with: .color(color(strokeToken).opacity(opacity)),
                lineWidth: (style.strokeWidth ?? 2) * min(scaleX, scaleY)
            )
        }
    }

    private func color(_ token: String?) -> Color {
        switch token {
        case "shell": Color(red: 0.34, green: 0.40, blue: 0.48)
        case "plug": Color(red: 0.63, green: 0.72, blue: 0.82)
        case "keyPin": Color(red: 0.86, green: 0.67, blue: 0.28)
        case "driverPin": Color(red: 0.82, green: 0.38, blue: 0.34)
        case "spring": Color(red: 0.68, green: 0.75, blue: 0.80)
        case "key": Color(red: 0.95, green: 0.73, blue: 0.24)
        case "shearLine": Color.cyan
        case "success": Color.green
        case "text": Color.white
        default: Color.white
        }
    }
}
