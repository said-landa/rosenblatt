// swift-tools-version: 6.2

import PackageDescription

let package = Package(
    name: "Machines",
    platforms: [
        .macOS(.v15)
    ],
    products: [
        .library(name: "MachinesCore", targets: ["MachinesCore"]),
        .library(name: "MachinesGeometry", targets: ["MachinesGeometry"]),
        .executable(name: "machines", targets: ["MachinesCLI"]),
        .executable(name: "MachinesCoursePreview", targets: ["MachinesCoursePreview"]),
        .executable(name: "MachinesAssemblyPreview", targets: ["MachinesAssemblyPreview"])
    ],
    targets: [
        .target(name: "MachinesCore"),
        .target(name: "MachinesGeometry"),
        .executableTarget(
            name: "MachinesCLI",
            dependencies: ["MachinesCore"]
        ),
        .executableTarget(
            name: "MachinesCoursePreview",
            dependencies: ["MachinesCore"]
        ),
        .executableTarget(
            name: "MachinesAssemblyPreview",
            dependencies: ["MachinesGeometry"]
        ),
        .testTarget(
            name: "MachinesCoreTests",
            dependencies: ["MachinesCore"]
        ),
        .testTarget(
            name: "MachinesGeometryTests",
            dependencies: ["MachinesGeometry"]
        )
    ]
)
