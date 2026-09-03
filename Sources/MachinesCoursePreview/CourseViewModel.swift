import Foundation
import MachinesCore

@MainActor
final class CourseViewModel: ObservableObject {
    @Published private(set) var runtime: CourseRuntime?
    @Published private(set) var feedback = ""
    @Published private(set) var feedbackAccepted: Bool?
    let loadError: String?

    init(sourceURL: URL) {
        do {
            let source = try MachinesSourceIO.loadSource(from: sourceURL)
            let build = try CourseCompiler.compile(source)
            runtime = try CourseRuntime(build: build)
            loadError = nil
        } catch {
            runtime = nil
            loadError = "No se pudo abrir el curso: \(error)"
        }
    }

    var currentStep: CompiledStep? {
        runtime?.currentStep
    }

    var currentCheck: CheckDefinition? {
        guard let runtime,
              runtime.currentStep?.action.kind == .answerCheck,
              let checkID = runtime.currentStep?.action.targetID else {
            return nil
        }
        return runtime.build.checks.first { $0.id == checkID }
    }

    var unplacedComponents: [MachineComponent] {
        guard let runtime else { return [] }
        return runtime.build.machine.components.filter {
            $0.requiredForCompletion && !runtime.placedComponentIDs.contains($0.id)
        }
    }

    var progressFraction: Double {
        guard let runtime, !runtime.build.orderedSteps.isEmpty else { return 0 }
        return Double(runtime.currentStepIndex) / Double(runtime.build.orderedSteps.count)
    }

    func place(componentID: String) {
        perform(.placeComponent(componentID))
    }

    func answer(checkID: String, optionID: String) {
        perform(.answerCheck(checkID: checkID, optionID: optionID))
    }

    func rotatePlug() {
        perform(.rotatePlug)
    }

    func requestHelp() {
        feedback = runtime?.help() ?? "El curso no está disponible."
        feedbackAccepted = nil
    }

    func restart() {
        guard let build = runtime?.build else { return }
        do {
            runtime = try CourseRuntime(build: build)
            feedback = "Curso reiniciado."
            feedbackAccepted = nil
        } catch {
            feedback = "No se pudo reiniciar: \(error)"
            feedbackAccepted = false
        }
    }

    private func perform(_ action: RuntimeAction) {
        guard var nextRuntime = runtime else { return }
        let result = nextRuntime.perform(action)
        runtime = nextRuntime
        feedback = result.feedback
        feedbackAccepted = result.accepted
    }
}
