# Where the Code Lives

> [Machine-first direction](machine-first.md)

The current iPhone app combines Swift/SwiftUI, a WKWebView, and JavaScript using
Three.js. It bundles its web resources locally. Three.js draws the experimental
3D scenes; project-owned code decides state, behavior, camera direction and
progress. The separate Swift package contains native semantic and geometry work;
it is not yet the whole mobile app engine.

| What you want to change | Start here, relative to the repository root |
| --- | --- |
| Cold-launch wordmark, timing and fade | `Prototypes/MachinesMouseThree/iOS/MachinesMousePreview/MachinesMousePreviewApp.swift` |
| Current scene order, actions and copy | `Prototypes/MachinesMouseThree/Experiments/AssemblyJourney/Source/main.js` |
| Composition validity, circuit behavior and saved model reviews | `Prototypes/MachinesMouseThree/Experiments/AssemblyJourney/Source/model.js` |
| Camera travel and manual inspection ownership | `Prototypes/MachinesMouseThree/Experiments/AssemblyJourney/Source/director.js` |
| Three.js geometry, materials and rendering | `Prototypes/MachinesMouseThree/Experiments/AssemblyJourney/Source/renderer.js` |
| Web structure and visual layout | `index.html` and `style.css` beside that `main.js` |
| Offline packaging entry | `Prototypes/MachinesMouseThree/scripts/build-ios-lab-web.mjs` |
| iOS target, version and build number | `Prototypes/MachinesMouseThree/iOS/MachinesMouseLab.xcodeproj` |

Your chosen workflow is a small walkthrough followed by your own edit. We will
identify the intended behavior and the relevant function before handing over
the edit. A first walkthrough can follow the introduction:

1. `introVisible` belongs to the SwiftUI App. It starts true for the Lab.
2. The WebView loads while `RosenblattIntroduction` covers it.
3. `Task.sleep` waits asynchronously, leaving the UI thread free.
4. `withAnimation` fades `introOpacity` to zero; its completion then clears the
   visible flag. The cover stays mounted until the fade ends.
5. Returning from the background does not recreate the flag; a new app process does.

`RosenblattOpeningTiming` sets the 3.5-second total, 0.5-second entrance and
1.6-second exit. The exit still starts at 1.9 seconds. `RosenblattWordmark` controls
the serif face, `wordmarkSize = 40.0`, and `.tracking(1.4)`. Reduced Motion uses
a separate static 2.5-second hold. These are small, readable places to evaluate a change together. The new Machine's code will be
chosen after its function and first interaction are authored.

For local web exploration, run `npm start` from `Prototypes/MachinesMouseThree`
and open `http://127.0.0.1:4173/Experiments/AssemblyJourney/Source/index.html`.
This previews the existing web study; it cannot show the native introduction.
