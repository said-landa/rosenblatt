# Rosenblatt — Lab Delivery and Retained Mouse Prototype

A local, code-authored 3D optical mouse prototype, now packaged as an offline
SwiftUI iPad/iPhone app. The creator accepted the visual direction and requested
iPad testing on 2026-09-16. Geometry and electronics are schematic, not a
validated commercial product reproduction.

- [Current status and next action](docs/status.md)
- [Engineering, boundaries, and verification](docs/engineering.md)
- Xcode project: `iOS/MachinesMousePreview.xcodeproj`
- Model: `model.js`; scene and interaction: `main.js`; layout: `style.css`.

## Current delivery — updated 2026-10-26

The active app is Rosenblatt. Build the Lab target, `iOS/MachinesMouseLab.xcodeproj`,
with the retained [Assembly Journey study](Experiments/AssemblyJourney/README.md).
The next direction is [machine-first investigation](../../docs/human/machine-first.md);
[code map](../../docs/human/code-map.md) and [self-service TestFlight guide](../../docs/human/testflight.md)
explain the current entry points. Rosenblatt 1.0 (8), including the slower native opening fade, was
uploaded through the command line on 2026-10-28. Apple processing and tester
availability remain separate; no browser was used.
It deliberately uses Rosenblatt's existing `com.machines.mouse.preview` identity;
`RosenblattLabExperience` selects the native Lab behavior independently of the
bundle suffix. This keeps one app and its TestFlight history for eventual release.

```sh
scripts/testflight-lab.sh archive
scripts/testflight-lab.sh upload
```

Increment the build number before each new release. Archives and source snapshots
are retained under `iOS/build-releases`; builds sign outside synced folders to
avoid File Provider metadata failures. Keep older available TestFlight builds for
switching versions; they expire after 90 days. Do not use direct install scripts
for normal delivery. Historical mouse and prior Lab source remain recoverable.
[Decision 0009](../../docs/decisions/0009-rosenblatt-lab-testflight-delivery.md).

The original mouse instructions below are retained historical development steps.
They are not the active release procedure.

## Run locally

```sh
npm ci
npm start
```

Open `http://127.0.0.1:4173`. All runtime resources are local.

## Build the iPad app

```sh
npm ci
npm run build:ios
```

Open `iOS/MachinesMousePreview.xcodeproj`, select your development team and
connected iPad, and run the `MachinesMousePreview` scheme. The iPad must have
Developer Mode enabled; Xcode needs a valid Apple account session for signing.
No paid service, App Store publication, or remote hosting is used here.

Alternatively, build, install, and launch with:

```sh
./scripts/run-ipad.sh '<iPad UDID>' '<Apple development team ID>'
```

`xcrun devicectl list devices` lists connected devices. The development team ID
is available in Xcode signing settings. Device/account identifiers are not
embedded in the project.

Regenerate the bundled web resources with `npm run build:ios` after editing
JavaScript, HTML, or CSS. The native app includes the generated files and does
not need the development server or computer after installation. Development
signing may require periodic renewal.

## Historical Lab entry — 2026-10-07

The stable app remains the mouse prototype. The Lab build now uses the isolated
[Origin experiment](Experiments/Origin/README.md). The prior
[Mouse Lab](Experiments/MouseLab/README.md) is preserved separately. Both icons
use the modular Machines mark, with gold original and blue Lab variants.
