import CryptoKit
import Foundation

public struct CompilerDiagnostic: Error, Codable, Equatable, Sendable, CustomStringConvertible {
    public let code: String
    public let entityID: String
    public let message: String

    public init(code: String, entityID: String, message: String) {
        self.code = code
        self.entityID = entityID
        self.message = message
    }

    public var description: String {
        "\(code) [\(entityID)]: \(message)"
    }
}

public struct CompilationFailure: Error, Sendable, CustomStringConvertible {
    public let diagnostics: [CompilerDiagnostic]

    public init(diagnostics: [CompilerDiagnostic]) {
        self.diagnostics = diagnostics
    }

    public var description: String {
        diagnostics.map(\.description).joined(separator: "\n")
    }
}

public enum CourseCompiler {
    public static let version = "machines-compiler/0.1.0"

    public static func validate(_ source: CourseSource) -> [CompilerDiagnostic] {
        var diagnostics: [CompilerDiagnostic] = []

        if source.schemaVersion != 1 {
            diagnostics.append(.init(
                code: "schema.unsupported",
                entityID: source.course.id,
                message: "Expected schemaVersion 1, received \(source.schemaVersion)."
            ))
        }

        if source.course.primaryMachineVariantID != source.machine.id {
            diagnostics.append(.init(
                code: "course.primary-machine-mismatch",
                entityID: source.course.id,
                message: "primaryMachineVariantID must reference the one embedded Machine Variant."
            ))
        }

        diagnostics += duplicateDiagnostics(source.machine.components.map(\.id), kind: "component")
        diagnostics += duplicateDiagnostics(source.machine.relations.map(\.id), kind: "relation")
        diagnostics += duplicateDiagnostics(source.concepts.map(\.id), kind: "concept")
        diagnostics += duplicateDiagnostics(source.checks.map(\.id), kind: "check")
        diagnostics += duplicateDiagnostics(source.representations.map(\.id), kind: "representation")
        diagnostics += duplicateDiagnostics(source.evidenceSources.map(\.id), kind: "evidence-source")
        diagnostics += duplicateDiagnostics(source.claims.map(\.id), kind: "claim")

        let componentIDs = Set(source.machine.components.map(\.id))
        let semanticIDs = componentIDs.union([source.machine.id])
        let sourceIDs = Set(source.evidenceSources.map(\.id))
        let checkIDs = Set(source.checks.map(\.id))
        let conceptIDs = Set(source.concepts.map(\.id))
        let relationIDs = Set(source.machine.relations.map(\.id))
        let claimSubjectIDs = semanticIDs.union(conceptIDs).union(relationIDs)

        for component in source.machine.components {
            if let parentID = component.parentID, !componentIDs.contains(parentID) {
                diagnostics.append(.init(
                    code: "component.missing-parent",
                    entityID: component.id,
                    message: "Parent \(parentID) does not exist."
                ))
            }
        }

        for relation in source.machine.relations {
            if relation.participantIDs.count < 2 {
                diagnostics.append(.init(
                    code: "relation.insufficient-participants",
                    entityID: relation.id,
                    message: "A relation requires at least two participants."
                ))
            }
            for participantID in relation.participantIDs where !componentIDs.contains(participantID) {
                diagnostics.append(.init(
                    code: "relation.missing-participant",
                    entityID: relation.id,
                    message: "Participant \(participantID) does not exist."
                ))
            }
        }

        for concept in source.concepts {
            for subjectID in concept.subjectIDs where !claimSubjectIDs.contains(subjectID) {
                diagnostics.append(.init(
                    code: "concept.missing-subject",
                    entityID: concept.id,
                    message: "Subject \(subjectID) does not exist."
                ))
            }
        }

        for check in source.checks {
            diagnostics += duplicateDiagnostics(check.options.map(\.id), kind: "check-option", ownerID: check.id)
            if !check.options.contains(where: { $0.id == check.correctOptionID }) {
                diagnostics.append(.init(
                    code: "check.missing-correct-option",
                    entityID: check.id,
                    message: "correctOptionID must reference an option in the check."
                ))
            }
        }

        for element in source.representations {
            if !semanticIDs.contains(element.semanticEntityID) {
                diagnostics.append(.init(
                    code: "representation.missing-semantic-entity",
                    entityID: element.id,
                    message: "Semantic entity \(element.semanticEntityID) does not exist."
                ))
            }
            for componentID in element.showWhenPlaced + element.hideWhenPlaced
                where !componentIDs.contains(componentID) {
                diagnostics.append(.init(
                    code: "representation.missing-visibility-component",
                    entityID: element.id,
                    message: "Visibility references missing component \(componentID)."
                ))
            }
        }

        for claim in source.claims {
            if claim.sourceIDs.isEmpty {
                diagnostics.append(.init(
                    code: "claim.missing-evidence",
                    entityID: claim.id,
                    message: "A material claim requires at least one evidence source."
                ))
            }
            for sourceID in claim.sourceIDs where !sourceIDs.contains(sourceID) {
                diagnostics.append(.init(
                    code: "claim.missing-source",
                    entityID: claim.id,
                    message: "Evidence source \(sourceID) does not exist."
                ))
            }
            for subjectID in claim.subjectIDs where !claimSubjectIDs.contains(subjectID) {
                diagnostics.append(.init(
                    code: "claim.missing-subject",
                    entityID: claim.id,
                    message: "Subject \(subjectID) does not exist."
                ))
            }
        }

        let chapters = source.course.chapters
        if chapters.isEmpty {
            diagnostics.append(.init(
                code: "course.empty",
                entityID: source.course.id,
                message: "A Course requires at least one Chapter."
            ))
        }

        let lessons = chapters.flatMap(\.lessons)
        let steps = lessons.flatMap(\.steps)
        diagnostics += duplicateDiagnostics(chapters.map(\.id), kind: "chapter")
        diagnostics += duplicateDiagnostics(lessons.map(\.id), kind: "lesson")
        diagnostics += duplicateDiagnostics(steps.map(\.id), kind: "step")

        for chapter in chapters where chapter.lessons.isEmpty {
            diagnostics.append(.init(
                code: "chapter.empty",
                entityID: chapter.id,
                message: "A Chapter requires at least one Lesson."
            ))
        }
        for lesson in lessons where lesson.steps.isEmpty {
            diagnostics.append(.init(
                code: "lesson.empty",
                entityID: lesson.id,
                message: "A Lesson requires at least one Assembly Step."
            ))
        }

        let stepIDs = Set(steps.map(\.id))
        for element in source.representations {
            for stepID in element.showWhenStepsCompleted where !stepIDs.contains(stepID) {
                diagnostics.append(.init(
                    code: "representation.missing-visibility-step",
                    entityID: element.id,
                    message: "Visibility references missing step \(stepID)."
                ))
            }
        }

        var placedComponentIDs: [String] = []
        var referencedCheckIDs: [String] = []
        for step in steps {
            switch step.action.kind {
            case .placeComponent:
                guard let targetID = step.action.targetID else {
                    diagnostics.append(.init(
                        code: "step.missing-target",
                        entityID: step.id,
                        message: "placeComponent requires targetID."
                    ))
                    continue
                }
                if !componentIDs.contains(targetID) {
                    diagnostics.append(.init(
                        code: "step.missing-component",
                        entityID: step.id,
                        message: "Component \(targetID) does not exist."
                    ))
                }
                placedComponentIDs.append(targetID)
            case .answerCheck:
                guard let targetID = step.action.targetID else {
                    diagnostics.append(.init(
                        code: "step.missing-target",
                        entityID: step.id,
                        message: "answerCheck requires targetID."
                    ))
                    continue
                }
                if !checkIDs.contains(targetID) {
                    diagnostics.append(.init(
                        code: "step.missing-check",
                        entityID: step.id,
                        message: "Check \(targetID) does not exist."
                    ))
                }
                referencedCheckIDs.append(targetID)
            case .rotatePlug:
                if step.action.targetID != nil {
                    diagnostics.append(.init(
                        code: "step.unexpected-target",
                        entityID: step.id,
                        message: "rotatePlug does not accept targetID."
                    ))
                }
            }
        }

        diagnostics += duplicateDiagnostics(placedComponentIDs, kind: "component-placement")
        diagnostics += duplicateDiagnostics(referencedCheckIDs, kind: "check-use")

        let requiredComponentIDs = Set(source.machine.components.filter(\.requiredForCompletion).map(\.id))
        let placedIDs = Set(placedComponentIDs)
        for missingID in requiredComponentIDs.subtracting(placedIDs).sorted() {
            diagnostics.append(.init(
                code: "course.unplaced-required-component",
                entityID: missingID,
                message: "Every required Component needs one placement step."
            ))
        }
        for unusedCheckID in checkIDs.subtracting(Set(referencedCheckIDs)).sorted() {
            diagnostics.append(.init(
                code: "course.unused-check",
                entityID: unusedCheckID,
                message: "Every authored Check needs one Course step."
            ))
        }

        return diagnostics.sorted {
            ($0.code, $0.entityID, $0.message) < ($1.code, $1.entityID, $1.message)
        }
    }

    public static func compile(_ source: CourseSource) throws -> CourseBuild {
        let diagnostics = validate(source)
        guard diagnostics.isEmpty else {
            throw CompilationFailure(diagnostics: diagnostics)
        }

        let orderedSteps = source.course.chapters.flatMap { chapter in
            chapter.lessons.flatMap { lesson in
                lesson.steps.map { step in
                    CompiledStep(
                        id: step.id,
                        chapterID: chapter.id,
                        chapterTitle: chapter.title,
                        lessonID: lesson.id,
                        lessonTitle: lesson.title,
                        objective: lesson.objective,
                        instruction: step.instruction,
                        completionMessage: step.completionMessage,
                        hint: step.hint,
                        action: step.action
                    )
                }
            }
        }

        let buildID = try sourceBuildID(source)
        return CourseBuild(
            buildID: buildID,
            compilerVersion: version,
            sourceRevisionID: source.course.revisionID,
            course: source.course,
            machine: source.machine,
            concepts: source.concepts,
            checks: source.checks,
            representations: source.representations,
            evidenceSources: source.evidenceSources,
            claims: source.claims,
            orderedSteps: orderedSteps
        )
    }

    private static func sourceBuildID(_ source: CourseSource) throws -> String {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.sortedKeys]
        let sourceData = try encoder.encode(source)
        let payload = Data(version.utf8) + Data([0]) + sourceData
        let digest = SHA256.hash(data: payload)
        return "sha256:" + digest.map { String(format: "%02x", $0) }.joined()
    }

    private static func duplicateDiagnostics(
        _ ids: [String],
        kind: String,
        ownerID: String? = nil
    ) -> [CompilerDiagnostic] {
        let duplicates = Dictionary(grouping: ids, by: { $0 })
            .filter { $0.value.count > 1 }
            .keys
            .sorted()
        return duplicates.map { id in
            CompilerDiagnostic(
                code: "identity.duplicate-\(kind)",
                entityID: ownerID ?? id,
                message: "Duplicate \(kind) identity \(id)."
            )
        }
    }
}
