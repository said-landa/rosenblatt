import Foundation
import MachinesCore
import SwiftUI

@main
struct MachinesCoursePreviewApp: App {
    @StateObject private var model: CourseViewModel

    init() {
        let repositoryRoot = URL(fileURLWithPath: #filePath)
            .deletingLastPathComponent()
            .deletingLastPathComponent()
            .deletingLastPathComponent()
        let defaultSourcePath = repositoryRoot
            .appendingPathComponent("Courses/pin-tumbler-lock/course.json")
            .path
        let sourcePath = CommandLine.arguments.dropFirst().first ?? defaultSourcePath
        _model = StateObject(
            wrappedValue: CourseViewModel(
                sourceURL: URL(fileURLWithPath: sourcePath)
            )
        )
    }

    var body: some Scene {
        WindowGroup {
            CoursePreviewView(model: model)
                .frame(minWidth: 1120, minHeight: 720)
        }
        .windowResizability(.contentMinSize)
    }
}
