import Foundation

public enum MachinesSourceIO {
    public static func loadSource(from url: URL) throws -> CourseSource {
        let data = try Data(contentsOf: url)
        return try JSONDecoder().decode(CourseSource.self, from: data)
    }

    public static func loadBuild(from url: URL) throws -> CourseBuild {
        let data = try Data(contentsOf: url)
        return try JSONDecoder().decode(CourseBuild.self, from: data)
    }

    public static func writeBuild(_ build: CourseBuild, to url: URL) throws {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys, .withoutEscapingSlashes]
        let data = try encoder.encode(build)
        try data.write(to: url, options: .atomic)
    }
}
