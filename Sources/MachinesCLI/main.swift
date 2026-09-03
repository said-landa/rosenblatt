import Foundation
import MachinesCore

enum CommandError: Error, CustomStringConvertible {
    case usage
    case unknownCommand(String)
    case missingOutput

    var description: String {
        switch self {
        case .usage:
            "Usage:\n  machines validate <course-source.json>\n  machines build <course-source.json> --output <course-build.json>"
        case let .unknownCommand(command):
            "Unknown command: \(command)"
        case .missingOutput:
            "build requires --output <course-build.json>"
        }
    }
}

func run() throws {
    let arguments = Array(CommandLine.arguments.dropFirst())
    guard arguments.count >= 2 else { throw CommandError.usage }

    let command = arguments[0]
    let sourceURL = URL(fileURLWithPath: arguments[1])
    let source = try MachinesSourceIO.loadSource(from: sourceURL)

    switch command {
    case "validate":
        let diagnostics = CourseCompiler.validate(source)
        if diagnostics.isEmpty {
            print("Valid: \(source.course.id) @ \(source.course.revisionID)")
        } else {
            throw CompilationFailure(diagnostics: diagnostics)
        }
    case "build":
        guard let outputIndex = arguments.firstIndex(of: "--output"),
              arguments.indices.contains(outputIndex + 1) else {
            throw CommandError.missingOutput
        }
        let outputURL = URL(fileURLWithPath: arguments[outputIndex + 1])
        let build = try CourseCompiler.compile(source)
        try MachinesSourceIO.writeBuild(build, to: outputURL)
        print("Built: \(build.buildID)")
        print("Output: \(outputURL.path)")
    default:
        throw CommandError.unknownCommand(command)
    }
}

do {
    try run()
} catch {
    FileHandle.standardError.write(Data("\(error)\n".utf8))
    exit(1)
}
