# Machines Mouse Preview — Current Status

Detailed counterparts: [Engineering record](engineering.md) and [Deep-dive plan](deep-dive-plan.md).

## Stable icon distinction — 2026-10-18

The creator clarifies that stable Machines alone should change appearance and
remain outside TestFlight. Stable now has a mint background and dark Machines
mark. Lab's earlier dark background and blue mark are restored. After explicit
creator confirmation, stable was built, signed, installed directly and launched
on the paired iPhone 16e. Its existing installed version 1.0 (1) is preserved.
No TestFlight upload or app-record creation was made for stable.
See the [verification record](engineering.md#stable-icon-distinction--2026-10-18).

## Implemented

- Existing general assembly preserved: 14 groups, placement, undo, reset and exploration.
- Separate **Por dentro** section, starting with the base in the existing order.
- Base journey: molded body, front foot, rear foot; brief explanations, animated placement, underside view, separated feet and illustrative sliding.
- Completed base can be added to the general mouse without duplicating a placed base.
- Stable Machines keeps the reviewed base journey; remaining stable journeys are forthcoming.
- Offline SwiftUI/WKWebView package for iPad and iPhone.
- A separate **Machines Lab** app is installed beside Machines for disposable
  experiments. Its web source is isolated under `Experiments/MouseLab/Source`.
- Machines Lab continues in order with **Lente y guía** (frame, imaging lens,
  illumination guide) and **Placa** (body, mounting pads, traces, vias).
- The optical route and representative board pulse are explicitly simplified
  functional animations; neither claims ray tracing or a verified netlist.
- Machines Lab uses fixed dark appearance, a compact Lab badge, safe-area-aware
  overlays, and portrait assembly-panel edge docking. Both orientations remain
  supported. Gesture hints and the appearance switch are removed.
- The 3D stage now reaches every physical screen edge. Titles, header, carousel
  and controls float above it; the assembly panel uses the Lab liquid-glass
  treatment instead of reserving or clipping model space.

## Evidence

Eight automated tests, syntax checks and offline Lab bundling pass. Browser interactions verify the three Lab journeys, optical and board demonstrations, board separation, and ordered transfer of base, optics and board into the general assembly (3/14).

The updated Lab app builds and signs successfully for arm64 iOS. After both
devices were unlocked, it installed and launched successfully on the paired
iPad (10th generation) and connected iPhone 16e on 2026-09-28.

Horizontal browser QA verified both themes and extreme zoom: the model remains
rendered beneath the title, carousel and translucent assembly panel, and clips
only at the viewport edge.

This edge-to-edge/theme revision was then rebuilt, installed and launched on
both the iPad and iPhone under `com.machines.mouse.lab`.

On 2026-09-23, the updated app built, signed, installed and launched on the connected physical iPad. The installed bundle was checked for **Por dentro**, **Construye la base** and **Añadir cuerpo de la base**. Physical touch behavior has not yet been observed from this environment.

Xcode now rebuilds the bundled web experience before every Run, so source changes cannot silently leave the iPad with an older `Web` bundle.

Machines Lab has its own bundle identifier, generated resources, DerivedData and
session state. `npm run lab:status` reports experimental drift;
`npm run lab:reset` replaces only Lab source with the current stable Machines
source. A deliberate mutation/reset test restored all eight copied files.

## Next decision

Review the Lab proposals on the iPad, then investigate **Sensor y luz** in the existing order. Subpart counts and explanations remain bounded proposals for this schematic model.

## Lab revision — 2026-09-30

The Lab entry point now opens Courses → Mouse → chapters → lessons.
This supersedes Lab's mode tabs, carousel and movable assembly panel.
Subpart lessons precede explicit whole-part placement; no undo is exposed.
Three.js card borders, press feedback, near-black appearance, an isolated
dark app icon, page-zoom suppression, device-local persistence and lightning
streak are implemented. Stable Machines remains the earlier experience.
See [Lab details](../Experiments/MouseLab/README.md).

Reference refinement (2026-10-01): the creator's screenshots replace luminous
cards with progress cards and a circular lesson path. Home/Courses/You uses native
Liquid Glass on supported iOS, with a browser fallback. Blank illustration slots
are intentional. Native Courses navigation was verified in the simulator.
