import Foundation

public enum RuntimeAction: Equatable, Sendable {
    case placeComponent(String)
    case answerCheck(checkID: String, optionID: String)
    case rotatePlug
}

public struct RuntimeObservation: Codable, Equatable, Sendable, Identifiable {
    public let id: Int
    public let stepID: String
    public let actionKind: String
    public let targetID: String?
    public let accepted: Bool
}

public struct RuntimeResult: Equatable, Sendable {
    public let accepted: Bool
    public let feedback: String
    public let observation: RuntimeObservation
}

public enum RuntimeError: Error, Equatable, Sendable, CustomStringConvertible {
    case incompatibleProgress(expectedBuildID: String, receivedBuildID: String)
    case invalidProgressIndex(Int)

    public var description: String {
        switch self {
        case let .incompatibleProgress(expected, received):
            "Progress belongs to \(received), but this runtime loaded \(expected)."
        case let .invalidProgressIndex(index):
            "Progress step index \(index) is outside this Course Build."
        }
    }
}

public struct CourseRuntime: Sendable {
    public let build: CourseBuild
    public private(set) var currentStepIndex: Int
    public private(set) var placedComponentIDs: Set<String>
    public private(set) var completedStepIDs: Set<String>
    public private(set) var observations: [RuntimeObservation]

    public init(build: CourseBuild, progress: CourseProgress? = nil) throws {
        self.build = build
        self.observations = []

        if let progress {
            guard progress.buildID == build.buildID else {
                throw RuntimeError.incompatibleProgress(
                    expectedBuildID: build.buildID,
                    receivedBuildID: progress.buildID
                )
            }
            guard (0...build.orderedSteps.count).contains(progress.nextStepIndex) else {
                throw RuntimeError.invalidProgressIndex(progress.nextStepIndex)
            }
            self.currentStepIndex = progress.nextStepIndex
            self.placedComponentIDs = progress.placedComponentIDs
            self.completedStepIDs = progress.completedStepIDs
        } else {
            self.currentStepIndex = 0
            self.placedComponentIDs = []
            self.completedStepIDs = []
        }
    }

    public var currentStep: CompiledStep? {
        guard currentStepIndex < build.orderedSteps.count else { return nil }
        return build.orderedSteps[currentStepIndex]
    }

    public var isComplete: Bool {
        currentStep == nil
    }

    public var progress: CourseProgress {
        CourseProgress(
            buildID: build.buildID,
            nextStepIndex: currentStepIndex,
            placedComponentIDs: placedComponentIDs,
            completedStepIDs: completedStepIDs
        )
    }

    public var visibleRepresentations: [SchematicElement] {
        build.representations.filter { element in
            Set(element.showWhenPlaced).isSubset(of: placedComponentIDs)
                && Set(element.hideWhenPlaced).isDisjoint(with: placedComponentIDs)
                && Set(element.showWhenStepsCompleted).isSubset(of: completedStepIDs)
        }
    }

    public mutating func perform(_ action: RuntimeAction) -> RuntimeResult {
        guard let step = currentStep else {
            return record(
                action: action,
                stepID: "course-complete",
                accepted: false,
                feedback: "El curso ya está completo."
            )
        }

        let accepted: Bool
        let feedback: String

        switch (step.action.kind, action) {
        case let (.placeComponent, .placeComponent(componentID)):
            accepted = componentID == step.action.targetID
            if accepted {
                placedComponentIDs.insert(componentID)
                feedback = step.completionMessage
            } else {
                feedback = "Esa pieza todavía no corresponde. \(step.hint)"
            }
        case let (.answerCheck, .answerCheck(checkID, optionID)):
            if checkID == step.action.targetID,
               let check = build.checks.first(where: { $0.id == checkID }) {
                accepted = optionID == check.correctOptionID
                feedback = accepted ? check.successMessage : check.retryMessage
            } else {
                accepted = false
                feedback = "Esta comprobación no corresponde al estado actual."
            }
        case (.rotatePlug, .rotatePlug):
            accepted = true
            feedback = step.completionMessage
        default:
            accepted = false
            feedback = "La acción no corresponde al paso actual. \(step.hint)"
        }

        let result = record(action: action, stepID: step.id, accepted: accepted, feedback: feedback)
        if accepted {
            completedStepIDs.insert(step.id)
            currentStepIndex += 1
        }
        return result
    }

    public func help() -> String {
        currentStep?.hint ?? "El curso ya está completo."
    }

    private mutating func record(
        action: RuntimeAction,
        stepID: String,
        accepted: Bool,
        feedback: String
    ) -> RuntimeResult {
        let actionKind: String
        let targetID: String?
        switch action {
        case let .placeComponent(componentID):
            actionKind = StepActionKind.placeComponent.rawValue
            targetID = componentID
        case let .answerCheck(checkID, optionID):
            actionKind = StepActionKind.answerCheck.rawValue
            targetID = "\(checkID):\(optionID)"
        case .rotatePlug:
            actionKind = StepActionKind.rotatePlug.rawValue
            targetID = nil
        }

        let observation = RuntimeObservation(
            id: observations.count,
            stepID: stepID,
            actionKind: actionKind,
            targetID: targetID,
            accepted: accepted
        )
        observations.append(observation)
        return RuntimeResult(accepted: accepted, feedback: feedback, observation: observation)
    }
}
