import Foundation
import Testing
@testable import MachinesCore

struct CourseCompilerTests {
    @Test func referenceCourseCompilesDeterministically() throws {
        let source = try loadReferenceSource()

        let first = try CourseCompiler.compile(source)
        let second = try CourseCompiler.compile(source)

        #expect(first == second)
        #expect(first.buildID.hasPrefix("sha256:"))
        #expect(first.orderedSteps.count == 10)
        #expect(first.course.primaryMachineVariantID == first.machine.id)
    }

    @Test func everyMaterialClaimHasResolvableEvidence() throws {
        let source = try loadReferenceSource()
        let sourceIDs = Set(source.evidenceSources.map(\.id))

        #expect(!source.claims.isEmpty)
        for claim in source.claims {
            #expect(!claim.sourceIDs.isEmpty)
            #expect(Set(claim.sourceIDs).isSubset(of: sourceIDs))
        }
    }

    @Test func compilerRejectsPrimaryMachineIdentityDrift() throws {
        let testFile = URL(fileURLWithPath: #filePath)
        let repositoryRoot = testFile
            .deletingLastPathComponent()
            .deletingLastPathComponent()
            .deletingLastPathComponent()
        let sourceURL = repositoryRoot.appendingPathComponent("Courses/pin-tumbler-lock/course.json")
        let data = try Data(contentsOf: sourceURL)
        var json = try #require(JSONSerialization.jsonObject(with: data) as? [String: Any])
        var course = try #require(json["course"] as? [String: Any])
        course["primaryMachineVariantID"] = "machine.unrelated"
        json["course"] = course
        let invalidData = try JSONSerialization.data(withJSONObject: json)
        let invalidSource = try JSONDecoder().decode(CourseSource.self, from: invalidData)

        let diagnostics = CourseCompiler.validate(invalidSource)

        #expect(diagnostics.contains { $0.code == "course.primary-machine-mismatch" })
    }

    private func loadReferenceSource() throws -> CourseSource {
        let testFile = URL(fileURLWithPath: #filePath)
        let repositoryRoot = testFile
            .deletingLastPathComponent()
            .deletingLastPathComponent()
            .deletingLastPathComponent()
        return try MachinesSourceIO.loadSource(
            from: repositoryRoot.appendingPathComponent("Courses/pin-tumbler-lock/course.json")
        )
    }
}
