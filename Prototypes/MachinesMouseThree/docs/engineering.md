# Machines Mouse Preview — Engineering Record

Human counterpart: [Current status](status.md).

## Stable icon distinction — 2026-10-18

The creator clarifies that only stable Machines should change appearance and
that stable must remain outside TestFlight. Stable now uses a mint background
and dark Machines mark. Lab is restored to its earlier dark background and blue
mark; the proposed mint LAB-badge asset is withdrawn. App identities, versions,
web source and learner progress are unchanged. Regenerate each asset with:

```sh
swift scripts/create-app-icon.swift iOS/MachinesMousePreview/Assets.xcassets/AppIcon.appiconset/AppIcon.png
swift scripts/create-app-icon.swift iOS/MachinesMouseLab/Assets.xcassets/AppIcon.appiconset/AppIcon.png --lab
```

The stable PNG is opaque RGB at 1024×1024 and was visually inspected at 180×180.
The paired iPhone has stable `com.machines.mouse.preview` and separate Lab
`com.machines.mouse.lab`. Automatic approval review initially rejected the
direct-install build under the earlier TestFlight-only instruction. The creator
then explicitly confirmed: "Yes, directly install Stable."

Stable syntax checks, signed Debug build and strict code-signature verification
pass. The compiled 120×120 icon was decoded from the built app and visually
verified as the mint/dark mark. Direct installation and subsequent process launch
both succeed on iPhone 16e `FFC51592-AF0E-5BA6-81B6-D987E4DCAE53`. A device app
query verifies `com.machines.mouse.preview`, version 1.0 (1); command-line
`MARKETING_VERSION=1.0` preserves the existing installed version without editing
project version settings. Lab's restored asset hash remains
`c1937ee932caf51d9cbd3c58b36fc753888a99717aa47e95b6e82da77a8e6859`.

Evidence is under `/private/tmp/MachinesStableIcon20261018`: built app in
`Build/Products/Debug-iphoneos/MachinesMousePreview.app`; adjacent `-build.log`,
`-checks.log`, `-install.json`, `-launch.json` and `-installed-after.json` record
the separate checks. Compiled-icon preview: adjacent `-compiled-icon.png`.
Home-screen icon display was not visually observed on the physical device.
No Lab installation or TestFlight operation followed the creator's correction.

The earlier Lab archive at `/private/tmp/MachinesLabIcon20261018/MachinesLab.xcarchive`
(version 0.1.1 (2)) reflects the misunderstood Lab change and is superseded for
this request. Its failed export did not upload a build; no App Store Connect
record was created. TestFlight setup and agreement/account investigation are
out of scope for the corrected stable-icon request.

## Scope and authority

The originating Mouse task requested a familiar wired optical mouse whose parts
are declared in Three.js code. It explicitly authorized Three.js as a bounded
research renderer. On 2026-09-16 the creator accepted the visual result and
requested integration into a mobile app for testing on a connected iPad.

This folder is isolated from the native Machines engine and the parallel padlock
work. It does not modify `Package.swift`, canonical Course source, or the
project's native-engine decision. SwiftUI/WKWebView is an experimental mobile
host for this visual instrument, not the canonical Machines runtime. The exit
path is removal of this folder or replacement of its renderer while preserving
future creator-authored meaning outside the rendering library.

Existing global status documents still describe W1, whereas accepted Decision
0005 selects Reference Padlock 01. That pre-existing drift is outside this
bounded mouse implementation; this record does not reinterpret the lock work.

## Implementation

- `model.js`: 220 named render meshes, including five removable upper-shell
  patches, curved base, separate buttons, wheel/tread/axle, cable/USB plug, PCB,
  switches, encoder, optical sensor/lens/light guide/LED, controller, passives,
  traces, standoffs, and fasteners. Names describe rendering parts, not canonical
  Course Components. Layout, routing, dimensions, and electronics are schematic.
- `main.js`: OrbitControls, accessible HTML controls, portrait-aware camera
  projection, explicit one-finger rotation and two-finger zoom, on-demand frames
  with damping, document visibility and native lifecycle suspension.
- `style.css`: coarse-pointer controls at least 44 CSS pixels high; portrait,
  landscape, compact layouts, and safe-area offsets.
- `iOS/MachinesMousePreview/MachinesMousePreviewApp.swift`: SwiftUI host with a
  nonpersistent WKWebView, file access limited to the bundled Web folder,
  navigation restricted to local resources, background visibility forwarding,
  and recoverable native load/process-failure UI. Web inspector is Debug-only.
- `scripts/build-ios-web.mjs`: esbuild bundles the existing module graph into one
  classic script so the app does not depend on file-origin ES-module loading,
  import maps, a loopback server, CDN access, or a running development computer.
  The Three.js MIT license accompanies the bundle.
- `scripts/run-ipad.sh`: rebuilds the web assets, compiles with the caller's
  development team, provisions the selected device, installs, and launches.
  It stops on failure. No identity or credentials are stored in source.
- `scripts/create-app-icon.swift`: reproducible native drawing of the Machines
  mark; Stable has a mint background and dark mark, while `--lab` retains the dark background and blue mark. Each
  app's PNG is included in its separate asset catalog.

Deployment target is iOS/iPadOS 17; tested toolchain is Xcode 26.3. Resources are
bundled; there are no accounts, analytics, persistence, network permissions,
server endpoints, payments, or data collection in the app.

## Verification — 2026-09-16

Passed:

1. JavaScript syntax checks for the model, renderer/controller, and local server.
2. Offline web bundling with the pinned dependency lockfile.
3. Property-list and Xcode project parsing; install-script shell syntax.
4. Geometry traversal: 220 meshes, 312,561 vertices, distinct names and finite
   vertex positions; five upper-shell patches and 153 internal child objects.
5. Debug simulator compilation for arm64 and x86_64, plus an unsigned arm64
   physical-device build. Both final builds succeeded.
6. Install and launch on an iPad (A16), iPadOS 26.2 simulator.
7. Actual visible WebGL mouse render in portrait and landscape. The model,
   cable/plug, Spanish controls, and footer fit the respective layouts.
8. Final on-demand-render build installed, rendered, sent to Home and reopened
   in the same simulator process with the exterior still visible.
9. Physical-device discovery: wired, paired iPad (10th generation), iPadOS
   26.6.2; Developer Mode confirmed enabled after creator action.

Limitations and blockers:

- The earlier Apple-account signing failure was resolved before the 2026-09-23
  installation recorded below.
- Simulator coordinate interactions failed in the available Computer Use tool
  with `noWindowsAvailable`, although accessibility-based simulator rotation
  and screenshots worked. Actual touch/pinch and individual view controls still
  require physical-device verification. Do not label the simulator observations
  as full interaction coverage.
- The final on-demand-render change compiles, visibly renders, and has no
  permanent animation loop. Device energy/performance and lifecycle behavior
  still need physical evidence.
- No manufacturing, mechanical, electrical, domain, learner, or accessibility
  acceptance is implied by successful rendering. iPhone layouts are implemented
  but have not been visually verified in an iPhone simulator.

Local build diagnostics are in `evidence/*.log` (ignored). Derived web assets,
Xcode builds, node_modules, and user-specific Xcode settings are ignored.

## Primary implementation references

- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- [Three.js OrbitControls](https://threejs.org/docs/pages/OrbitControls.html)
- [Apple WKWebView](https://developer.apple.com/documentation/webkit/wkwebview)
- [Apple local-file loading](https://developer.apple.com/documentation/webkit/wkwebview/loadfileurl(_:allowingreadaccessto:))
- [Apple Developer Mode](https://developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device)
- [Apple signing workflow](https://help.apple.com/xcode/mac/current/en.lproj/dev60b6fbbc7.html)

## Nested assembly increment — 2026-09-21

Creator direction and research are recorded in [Deep-dive plan](deep-dive-plan.md). The accepted 14-group assembly remains available. `deep-dive.js` defines the proposed three-part base state; `deep-dive-view.js` clones its existing geometry into an independent journey and reconnects completion through `assemblyView.offerPart`. No dependency rules are bypassed. The renderer shares on-demand scheduling and visibility suspension with this view.

Verification: five tests pass (three general-assembly tests and two base tests); syntax checks and offline bundling pass. The updated simulator build succeeds (`evidence/ipad-deep-base-build.log`). Browser interactions verified all three placements, underside inspection, sliding/play/pause, foot separation/rejoining, completion transfer to 1/14 with lens/guide next, and retained deep progress after returning. The 820 × 1180 portrait layout was inspected in the browser. This is responsive-browser evidence, not physical-iPad touch evidence. Only the base journey is implemented; the other 13 are visibly forthcoming.

## Physical iPad integration — 2026-09-23

The Xcode target now runs `scripts/build-ios-web.mjs` before its Resources phase on every build. This fixes the stale-resource failure in which pressing Run could reinstall an older generated `Web` directory. A final build phase removes filesystem metadata from the product before signing. The command-line installer now keeps DerivedData in `/private/tmp`, outside the file-provider-managed project directory.

The current arm64 app built and signed successfully, installed on the connected iPad (10th generation), and launched under `com.machines.mouse.preview`. The exact installed build input contains the **Por dentro** mode, the three-step base journey and its transfer control. The project file parses and the install script passes shell syntax validation. Direct observation of taps and rendering on the physical display remains a separate evidence gate.

## Isolated experiment app — 2026-09-23

`MachinesMouseLab.xcodeproj` builds a second iOS app with bundle identifier
`com.machines.mouse.lab` and display name **Machines Lab**. It shares only the
small native WKWebView host and icon asset with the stable app. Learner-facing
web source is copied into `Experiments/MouseLab/Source`; Lab builds and state do
not write into the stable source or stable app container. A visible `LAB` badge
is injected at build time.

`npm run lab:reset` deterministically replaces the eight Lab source files from
the current stable working tree and records their hashes. `npm run lab:status`
compares Lab against that reset. Verification introduced a controlled change to
Lab, detected it, reset Lab and confirmed a clean match. Five stable assembly
tests still pass after the reset.

The arm64 Lab app built and signed successfully and was installed on the same
physical iPad beside Machines. Automatic launch was denied because the iPad
locked after installation; this does not invalidate installation, but visible
physical-device interaction remains unobserved. No second Git repository or
remote is required: shared history keeps stable and experimental work traceable
without coupling their installed bundles.

### Lab nested journeys — 2026-09-28

The isolated Lab source now defines data-driven journeys for `base`, `optics`
and `pcb`. `deepPartForMesh` assigns every existing optics and board mesh to one
subpart family. Each journey keeps independent state and reconnects through
`assemblyView.offerPart`, so the unchanged base → optics → board dependency is
still enforced.

The optics demonstration draws separate illumination and return routes with
moving pulses. The board demonstration follows one representative top trace
and a vertical via path. Both are declared explanatory overlays: the prototype
contains neither an optical solver nor a board netlist. Eight tests, Lab syntax
checks and offline bundling pass. Browser QA completed all new subassemblies,
played both demonstrations, separated/rejoined the board families and
transferred the first three general groups in order.

The final generic arm64 build and signing pass succeeded. An initial physical
attempt could not mount the developer disk image while the device was locked.
After unlocking, device-specific builds, installation and launch succeeded on
both the paired iPad (10th generation, iPadOS 26.6.2) and the connected iPhone
16e (iOS 27.0). Both devices received bundle `com.machines.mouse.lab` without
changing the stable app.

### Lab edge-to-edge stage and theme — 2026-09-28

Lab CSS now overrides all responsive `#viewport` insets with a full-screen
stage. The UI remains above the canvas through stacking order, so zoomed
geometry continues under the title, carousel, header and panels and is clipped
only by the physical viewport. The assembly panel uses translucent gradients,
backdrop blur, saturation and inset highlights as a bounded liquid-glass
experiment; other overlays keep their existing visual treatment.

The theme control persists its choice in local storage and follows the system
preference when no choice exists. The WebGL theme changes exposure,
environment, hemisphere, fill, key and rim lighting without recoloring the
machine materials. Browser QA at a horizontal 1280 × 720 viewport verified
light/dark switching and extreme zoom under every assembly overlay.
The resulting device-specific builds were installed and launched on both
physical devices; the iPhone required a second launch after its automatic lock.
