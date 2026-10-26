import SwiftUI
import WebKit
import UIKit
import AVFoundation

private let isLab = Bundle.main.object(forInfoDictionaryKey: "RosenblattLabExperience") as? Bool == true
    || Bundle.main.bundleIdentifier?.hasSuffix(".lab") == true

@main
struct MachinesMousePreviewApp: App {
    var body: some Scene {
        WindowGroup {
            MachinesMousePreviewScreen()
                .preferredColorScheme(isLab ? .dark : .light)
        }
    }
}

private struct MachinesMousePreviewScreen: View {
    @Environment(\.scenePhase) private var scenePhase
    @State private var failure: String?
    @State private var reloadID = UUID()
    @State private var navigationSection = "home"
    @State private var navigationVisible = false

    var body: some View {
        ZStack {
            (isLab ? Color(red: 0.071, green: 0.071, blue: 0.071) : Color(red: 0.914, green: 0.925, blue: 0.910)).ignoresSafeArea()
            MachinesMouseWebView(isActive: scenePhase == .active, failure: $failure, navigationSection: $navigationSection, navigationVisible: $navigationVisible)
                .id(reloadID)
                .ignoresSafeArea()
            if let failure {
                VStack(spacing: 18) {
                    Image(systemName: "arrow.trianglehead.clockwise")
                        .font(.largeTitle)
                    Text(failure).multilineTextAlignment(.center)
                    Button(isLab ? "Reload" : "Volver a cargar") {
                        self.failure = nil
                        reloadID = UUID()
                    }
                    .buttonStyle(.borderedProminent)
                    .tint(Color(red: 0.20, green: 0.28, blue: 0.21))
                }
                .padding(28)
                .frame(maxWidth: 360)
                .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 22))
            }
        }
        .overlay(alignment: .bottom) {
            if isLab && navigationVisible && failure == nil {
                MachinesLabNavigation(selection: $navigationSection)
                    .padding(.bottom, 12)
            }
        }
    }
}

private struct MachinesLabNavigation: View {
    @Binding var selection: String
    private var buttons: some View {
        HStack(spacing: 3) {
            item("home", "Home", "house")
            item("courses", "Courses", "rectangle.stack")
            item("you", "You", "person")
        }
        .padding(5)
        .frame(width: 300)
    }
    private func item(_ id: String, _ title: String, _ symbol: String) -> some View {
        Button { selection = id } label: {
            VStack(spacing: 3) {
                Image(systemName: symbol).font(.system(size: 23, weight: .medium))
                Text(title).font(.system(size: 11, weight: .medium))
            }
            .frame(maxWidth: .infinity)
            .frame(height: 52)
            .background(selection == id ? Color.black.opacity(0.48) : Color.clear, in: Capsule())
        }
        .buttonStyle(.plain)
        .foregroundStyle(.white)
        .accessibilityAddTraits(selection == id ? .isSelected : [])
    }
    var body: some View {
        if #available(iOS 26.0, *) {
            buttons.glassEffect(.regular, in: Capsule())
        } else {
            buttons.background(.ultraThinMaterial, in: Capsule())
        }
    }
}

private struct MachinesMouseWebView: UIViewRepresentable {
    var isActive: Bool
    @Binding var failure: String?
    @Binding var navigationSection: String
    @Binding var navigationVisible: Bool

    func makeCoordinator() -> Coordinator {
        Coordinator(failure: $failure, navigationSection: $navigationSection, navigationVisible: $navigationVisible)
    }

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = isLab ? .default() : .nonPersistent()
        if isLab {
            let script = "document.addEventListener('selectstart', e => e.preventDefault()); document.addEventListener('contextmenu', e => e.preventDefault());"
            configuration.userContentController.addUserScript(WKUserScript(source: script, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        }
        if isLab {
            configuration.userContentController.add(context.coordinator, name: "machinesNavigation")
            configuration.userContentController.add(context.coordinator, name: "machinesFeedback")
        }
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.isOpaque = false
        webView.backgroundColor = .clear
        webView.scrollView.backgroundColor = .clear
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.bounces = false
        if isLab {
            webView.scrollView.pinchGestureRecognizer?.isEnabled = false
            webView.scrollView.minimumZoomScale = 1
            webView.scrollView.maximumZoomScale = 1
        }
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.navigationDelegate = context.coordinator
        webView.allowsBackForwardNavigationGestures = false
        if isLab { webView.allowsLinkPreview = false }
        #if DEBUG
        webView.isInspectable = true
        #endif
        guard let entry = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "Web") else {
            DispatchQueue.main.async { failure = isLab ? "The experience resources are missing." : "No se encontraron los recursos del modelo." }
            return webView
        }
        context.coordinator.resourceRoot = entry.deletingLastPathComponent().standardizedFileURL
        webView.loadFileURL(entry, allowingReadAccessTo: entry.deletingLastPathComponent())
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        context.coordinator.isActive = isActive
        if !isActive { context.coordinator.audio.stopAll() }
        if isLab && context.coordinator.lastSection != navigationSection {
            context.coordinator.lastSection = navigationSection
            let allowed = ["home", "courses", "you"]
            if allowed.contains(navigationSection) {
                webView.evaluateJavaScript("window.dispatchEvent(new CustomEvent('machines:navigate', {detail: '\(navigationSection)'}));", completionHandler: nil)
            }
        }
        webView.evaluateJavaScript("window.dispatchEvent(new CustomEvent('machines:visibility', {detail: \(isActive)}));", completionHandler: nil)
    }

    final class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        @Binding var failure: String?
        var resourceRoot: URL?
        var isActive = true

        @Binding var navigationSection: String
        @Binding var navigationVisible: Bool
        var lastSection = "home"
        let audio = MachinesLabAudio()
        private let touchFeedback = UIImpactFeedbackGenerator(style: .light)
        private let connectionFeedback = UIImpactFeedbackGenerator(style: .medium)
        private let stepFeedback = UISelectionFeedbackGenerator()
        private let resultFeedback = UINotificationFeedbackGenerator()

        init(failure: Binding<String?>, navigationSection: Binding<String>, navigationVisible: Binding<Bool>) {
            _failure = failure
            _navigationSection = navigationSection
            _navigationVisible = navigationVisible
        }

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "machinesFeedback" {
                guard message.frameInfo.isMainFrame,
                      let values = message.body as? [String: Any],
                      let kind = values["kind"] as? String else { return }
                guard isActive else { audio.stopAll(); return }
                switch kind {
                case "soundStart": audio.start()
                case "soundStop": audio.stop()
                case "soundCheckpoint": audio.checkpoint()
                case "soundCue":
                    if let cue = values["cue"] as? String { audio.play(cue: cue) }
                case "soundStopAll": audio.stopAll()
                case "begin": touchFeedback.prepare(); touchFeedback.impactOccurred(intensity: 0.45)
                case "progress": stepFeedback.selectionChanged()
                case "connect", "checkpoint": connectionFeedback.prepare(); connectionFeedback.impactOccurred(intensity: 0.7)
                case "complete": resultFeedback.notificationOccurred(.success)
                case "reject": resultFeedback.notificationOccurred(.warning)
                default: break
                }
                return
            }
            guard message.frameInfo.isMainFrame,
                  let values = message.body as? [String: Any],
                  let section = values["section"] as? String,
                  ["home", "courses", "you"].contains(section),
                  let visible = values["visible"] as? Bool else { return }
            lastSection = section
            navigationSection = section
            navigationVisible = visible
        }

        func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            guard let url = action.request.url?.standardizedFileURL,
                  url.isFileURL,
                  let root = resourceRoot,
                  url.path.hasPrefix(root.path + "/") else {
                decisionHandler(.cancel)
                return
            }
            decisionHandler(.allow)
        }

        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            failure = nil
            webView.evaluateJavaScript("window.dispatchEvent(new CustomEvent('machines:visibility', {detail: \(isActive)}));", completionHandler: nil)
        }

        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            failure = isLab ? "The experience could not open. Try reloading." : "No se pudo abrir el modelo. Intenta cargarlo de nuevo."
        }

        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            failure = isLab ? "The experience could not open. Try reloading." : "No se pudo abrir el modelo. Intenta cargarlo de nuevo."
        }

        func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
            failure = isLab ? "The 3D view closed. You can reload the experience." : "La vista 3D se cerró. Puedes volver a cargar el modelo."
        }
    }
}

// Lab-only sound activated by a learner gesture. Playback remains audible in silent mode;
// device volume still governs loudness. Existing music can continue through mixWithOthers.
private final class MachinesLabAudio {
    private var ambient: AVAudioPlayer?
    private var accent: AVAudioPlayer?
    private var cues: [String: AVAudioPlayer] = [:]
    private let allowedCues: Set<String> = ["touch", "place", "bind", "reuse", "complete", "return"]
    init() {
        // Prepared from bundled files; no server, microphone or music-library access.
        for cue in allowedCues {
            if let url = Bundle.main.url(forResource: cue, withExtension: "wav", subdirectory: "Web/Audio"),
               let player = try? AVAudioPlayer(contentsOf: url) {
                player.volume = 0.7
                player.prepareToPlay()
                cues[cue] = player
            }
        }
    }
    func play(cue: String) {
        guard allowedCues.contains(cue), let player = cues[cue] else { return }
        do {
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default, options: [.mixWithOthers])
            try AVAudioSession.sharedInstance().setActive(true)
            player.currentTime = 0
            player.play()
        } catch { NSLog("Machines Lab audio failed: %@", error.localizedDescription) }
    }
    func start() {
        do {
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default, options: [.mixWithOthers])
            try AVAudioSession.sharedInstance().setActive(true)
            if ambient == nil {
                ambient = try AVAudioPlayer(data: Self.wave(duration: 4, frequency: 220, looping: true))
                ambient?.numberOfLoops = -1
                ambient?.prepareToPlay()
            }
            ambient?.volume = 0.45
            ambient?.play()
        } catch { NSLog("Machines Origin audio failed: %@", error.localizedDescription) }
    }
    func stop() { ambient?.pause() }
    func stopAll() {
        ambient?.pause(); accent?.stop()
        for player in cues.values { player.stop(); player.currentTime = 0 }
    }
    func checkpoint() {
        do {
            accent = try AVAudioPlayer(data: Self.wave(duration: 1, frequency: 440, looping: false))
            accent?.volume = 0.55
            accent?.play()
        } catch { NSLog("Machines Origin checkpoint audio failed: %@", error.localizedDescription) }
    }
    private static func wave(duration: Double, frequency: Double, looping: Bool) -> Data {
        let sampleRate = 24000
        let count = Int(duration * Double(sampleRate))
        var data = Data()
        func word(_ value: UInt16) { var v = value.littleEndian; withUnsafeBytes(of: &v) { data.append(contentsOf: $0) } }
        func long(_ value: UInt32) { var v = value.littleEndian; withUnsafeBytes(of: &v) { data.append(contentsOf: $0) } }
        data.append(contentsOf: "RIFF".utf8); long(UInt32(36 + count * 2)); data.append(contentsOf: "WAVEfmt ".utf8)
        long(16); word(1); word(1); long(UInt32(sampleRate)); long(UInt32(sampleRate * 2)); word(2); word(16)
        data.append(contentsOf: "data".utf8); long(UInt32(count * 2))
        for i in 0..<count {
            let t = Double(i) / Double(sampleRate)
            let envelope = looping ? 0.75 + 0.25 * sin(2 * Double.pi * t / duration) : min(1, t / 0.025) * exp(-t * 5)
            let signal = (sin(2 * Double.pi * frequency * t) + 0.25 * sin(2 * Double.pi * frequency * 1.5 * t)) * envelope * 0.3
            word(UInt16(bitPattern: Int16(signal * 32767)))
        }
        return data
    }
}
