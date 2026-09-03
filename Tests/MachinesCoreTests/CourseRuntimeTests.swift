import Foundation
import Testing
@testable import MachinesCore

struct CourseRuntimeTests {
    @Test func runtimeRejectsWrongComponentWithoutAdvancing() throws {
        var runtime = try makeRuntime()

        let result = runtime.perform(.placeComponent("component.key"))

        #expect(!result.accepted)
        #expect(runtime.currentStepIndex == 0)
        #expect(runtime.placedComponentIDs.isEmpty)
        #expect(runtime.observations.count == 1)
    }

    @Test func completeReferencePathIsReachableAndResumable() throws {
        var runtime = try makeRuntime()

        #expect(runtime.perform(.placeComponent("component.shell")).accepted)
        #expect(runtime.perform(.placeComponent("component.plug")).accepted)
        #expect(runtime.perform(.placeComponent("component.key-pins")).accepted)
        #expect(runtime.perform(.placeComponent("component.driver-pins")).accepted)
        #expect(runtime.perform(.placeComponent("component.springs")).accepted)

        let checkpoint = runtime.progress
        var resumed = try CourseRuntime(build: runtime.build, progress: checkpoint)
        #expect(resumed.currentStepIndex == 5)
        #expect(resumed.placedComponentIDs == runtime.placedComponentIDs)

        #expect(resumed.perform(.answerCheck(
            checkID: "check.blocking-pin",
            optionID: "option.driver-pin"
        )).accepted)
        #expect(resumed.perform(.placeComponent("component.key")).accepted)
        #expect(resumed.perform(.answerCheck(
            checkID: "check.correct-key",
            optionID: "option.splits-align"
        )).accepted)
        #expect(resumed.perform(.rotatePlug).accepted)
        #expect(resumed.perform(.answerCheck(
            checkID: "check.wrong-key",
            optionID: "option.pin-crosses"
        )).accepted)

        #expect(resumed.isComplete)
        #expect(resumed.completedStepIDs.count == 10)
    }

    @Test func wrongCheckAnswerDoesNotAdvance() throws {
        var runtime = try makeRuntime()
        for componentID in [
            "component.shell",
            "component.plug",
            "component.key-pins",
            "component.driver-pins",
            "component.springs"
        ] {
            #expect(runtime.perform(.placeComponent(componentID)).accepted)
        }

        let result = runtime.perform(.answerCheck(
            checkID: "check.blocking-pin",
            optionID: "option.spring"
        ))

        #expect(!result.accepted)
        #expect(runtime.currentStepIndex == 5)
    }

    @Test func keyPlacementReplacesLockedPinsWithAlignedPins() throws {
        var runtime = try makeRuntime()
        for componentID in [
            "component.shell",
            "component.plug",
            "component.key-pins",
            "component.driver-pins",
            "component.springs"
        ] {
            #expect(runtime.perform(.placeComponent(componentID)).accepted)
        }

        let lockedIDs = Set(runtime.visibleRepresentations.map(\.id))
        #expect(lockedIDs.contains("representation.driver-pins-locked"))
        #expect(!lockedIDs.contains("representation.driver-pins-aligned"))

        #expect(runtime.perform(.answerCheck(
            checkID: "check.blocking-pin",
            optionID: "option.driver-pin"
        )).accepted)
        #expect(runtime.perform(.placeComponent("component.key")).accepted)

        let alignedIDs = Set(runtime.visibleRepresentations.map(\.id))
        #expect(!alignedIDs.contains("representation.driver-pins-locked"))
        #expect(alignedIDs.contains("representation.driver-pins-aligned"))
    }

    @Test func progressFromAnotherBuildIsRejected() throws {
        let runtime = try makeRuntime()
        let incompatible = CourseProgress(
            buildID: "sha256:unrelated",
            nextStepIndex: 0,
            placedComponentIDs: [],
            completedStepIDs: []
        )

        #expect(throws: RuntimeError.self) {
            try CourseRuntime(build: runtime.build, progress: incompatible)
        }
    }

    private func makeRuntime() throws -> CourseRuntime {
        let testFile = URL(fileURLWithPath: #filePath)
        let repositoryRoot = testFile
            .deletingLastPathComponent()
            .deletingLastPathComponent()
            .deletingLastPathComponent()
        let source = try MachinesSourceIO.loadSource(
            from: repositoryRoot.appendingPathComponent("Courses/pin-tumbler-lock/course.json")
        )
        return try CourseRuntime(build: CourseCompiler.compile(source))
    }
}
