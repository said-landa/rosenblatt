import Foundation

public struct CourseSource: Codable, Equatable, Sendable {
    public let schemaVersion: Int
    public let course: CourseDefinition
    public let machine: MachineVariant
    public let concepts: [KnowledgeConcept]
    public let checks: [CheckDefinition]
    public let representations: [SchematicElement]
    public let evidenceSources: [EvidenceSource]
    public let claims: [EvidenceClaim]
}

public struct CourseDefinition: Codable, Equatable, Sendable {
    public let id: String
    public let revisionID: String
    public let title: String
    public let locale: String
    public let lifecycleState: String
    public let primaryMachineVariantID: String
    public let targetLearner: String
    public let outcome: String
    public let chapters: [ChapterDefinition]
}

public struct ChapterDefinition: Codable, Equatable, Sendable, Identifiable {
    public let id: String
    public let title: String
    public let lessons: [LessonDefinition]
}

public struct LessonDefinition: Codable, Equatable, Sendable, Identifiable {
    public let id: String
    public let title: String
    public let objective: String
    public let steps: [AssemblyStepDefinition]
}

public struct AssemblyStepDefinition: Codable, Equatable, Sendable, Identifiable {
    public let id: String
    public let title: String
    public let instruction: String
    public let completionMessage: String
    public let hint: String
    public let action: StepActionDefinition
}

public struct StepActionDefinition: Codable, Equatable, Sendable {
    public let kind: StepActionKind
    public let targetID: String?
}

public enum StepActionKind: String, Codable, Equatable, Sendable {
    case placeComponent
    case answerCheck
    case rotatePlug
}

public struct MachineVariant: Codable, Equatable, Sendable {
    public let id: String
    public let revisionID: String
    public let name: String
    public let purpose: String
    public let boundary: String
    public let exclusions: [String]
    public let components: [MachineComponent]
    public let relations: [ComponentRelation]
}

public struct MachineComponent: Codable, Equatable, Sendable, Identifiable {
    public let id: String
    public let name: String
    public let function: String
    public let parentID: String?
    public let requiredForCompletion: Bool
}

public struct ComponentRelation: Codable, Equatable, Sendable, Identifiable {
    public let id: String
    public let kind: String
    public let participantIDs: [String]
    public let explanation: String
}

public struct KnowledgeConcept: Codable, Equatable, Sendable, Identifiable {
    public let id: String
    public let name: String
    public let explanation: String
    public let subjectIDs: [String]
}

public struct CheckDefinition: Codable, Equatable, Sendable, Identifiable {
    public let id: String
    public let prompt: String
    public let options: [CheckOption]
    public let correctOptionID: String
    public let successMessage: String
    public let retryMessage: String
}

public struct CheckOption: Codable, Equatable, Sendable, Identifiable {
    public let id: String
    public let label: String
}

public struct SchematicElement: Codable, Equatable, Sendable, Identifiable {
    public let id: String
    public let semanticEntityID: String
    public let shape: SchematicShape
    public let style: SchematicStyle
    public let showWhenPlaced: [String]
    public let hideWhenPlaced: [String]
    public let showWhenStepsCompleted: [String]
}

public struct SchematicShape: Codable, Equatable, Sendable {
    public let kind: SchematicShapeKind
    public let x: Double?
    public let y: Double?
    public let width: Double?
    public let height: Double?
    public let cornerRadius: Double?
    public let rectangles: [SchematicRectangle]?
    public let points: [SchematicPoint]?
    public let polylines: [[SchematicPoint]]?
    public let text: String?
}

public enum SchematicShapeKind: String, Codable, Equatable, Sendable {
    case rectangle
    case rectangles
    case roundedRectangle
    case ellipse
    case line
    case polygon
    case polyline
    case polylines
    case label
}

public struct SchematicRectangle: Codable, Equatable, Sendable {
    public let x: Double
    public let y: Double
    public let width: Double
    public let height: Double
}

public struct SchematicPoint: Codable, Equatable, Sendable {
    public let x: Double
    public let y: Double
}

public struct SchematicStyle: Codable, Equatable, Sendable {
    public let fillToken: String?
    public let strokeToken: String?
    public let strokeWidth: Double?
    public let opacity: Double?
    public let fontSize: Double?
}

public struct EvidenceSource: Codable, Equatable, Sendable, Identifiable {
    public let id: String
    public let title: String
    public let publisher: String
    public let url: String
    public let accessedOn: String
    public let scope: String
}

public struct EvidenceClaim: Codable, Equatable, Sendable, Identifiable {
    public let id: String
    public let statement: String
    public let subjectIDs: [String]
    public let sourceIDs: [String]
    public let reviewState: String
}

public struct CompiledStep: Codable, Equatable, Sendable, Identifiable {
    public let id: String
    public let chapterID: String
    public let chapterTitle: String
    public let lessonID: String
    public let lessonTitle: String
    public let objective: String
    public let instruction: String
    public let completionMessage: String
    public let hint: String
    public let action: StepActionDefinition
}

public struct CourseBuild: Codable, Equatable, Sendable {
    public let buildID: String
    public let compilerVersion: String
    public let sourceRevisionID: String
    public let course: CourseDefinition
    public let machine: MachineVariant
    public let concepts: [KnowledgeConcept]
    public let checks: [CheckDefinition]
    public let representations: [SchematicElement]
    public let evidenceSources: [EvidenceSource]
    public let claims: [EvidenceClaim]
    public let orderedSteps: [CompiledStep]
}

public struct CourseProgress: Codable, Equatable, Sendable {
    public let buildID: String
    public let nextStepIndex: Int
    public let placedComponentIDs: Set<String>
    public let completedStepIDs: Set<String>

    public init(
        buildID: String,
        nextStepIndex: Int,
        placedComponentIDs: Set<String>,
        completedStepIDs: Set<String>
    ) {
        self.buildID = buildID
        self.nextStepIndex = nextStepIndex
        self.placedComponentIDs = placedComponentIDs
        self.completedStepIDs = completedStepIDs
    }
}
