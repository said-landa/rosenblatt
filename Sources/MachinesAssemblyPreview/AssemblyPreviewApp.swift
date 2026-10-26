import SwiftUI

@main
struct MachinesAssemblyPreviewApp: App {
    var body: some Scene {
        WindowGroup {
            AssemblyViewport()
                .ignoresSafeArea()
                .frame(minWidth: 900, minHeight: 680)
        }
        .windowResizability(.contentMinSize)
    }
}
