// swift-tools-version: 6.2

import PackageDescription

let package = Package(
    name: "Machines",
    platforms: [
        .macOS(.v15)
    ],
    products: [
        .library(name: "MachinesCore", targets: ["MachinesCore"]),
        .executable(name: "machines", targets: ["MachinesCLI"]),
        .executable(name: "MachinesCoursePreview", targets: ["MachinesCoursePreview"])
    ],
    targets: [
        .target(name: "MachinesCore"),
        .executableTarget(
            name: "MachinesCLI",
            dependencies: ["MachinesCore"]
        ),
        .executableTarget(
            name: "MachinesCoursePreview",
            dependencies: ["MachinesCore"]
        ),
        .testTarget(
            name: "MachinesCoreTests",
            dependencies: ["MachinesCore"]
        )
    ]
)
