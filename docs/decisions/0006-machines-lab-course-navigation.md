# 0006 — Machines Lab Course Navigation

- Status: Accepted for the isolated Lab experiment
- Date: 2026-09-30
- Decided by: Creator

## Decision

Replace Lab's assembly/explore/deep-dive mode tabs with course, chapter, and
lesson navigation. The mouse is one Course; each existing main part is a
chapter; authored subparts are sequential lessons, followed by an explicit
add-to-mouse action. Completing the subparts is required before installing
the complete part. No undo or restart controls are exposed.

Use near-black surfaces, a darker Lab-only app icon, pressable rounded cards
with slow Three.js border effects, chapter icons, and a floating lesson card
with a bold title and blue Start button. Unimplemented content stays gray.
A lightning streak records learning activity locally, without accounts.

## Scope and interpretation

This supersedes the previous Lab mode/navigation and assembly-panel docking
experiment. The new lesson card is fixed rather than unpredictably dismissible.
Portrait and landscape remain supported. Page double-tap zoom is disabled;
3D orbit and model zoom remain available. Existing base, optics, and PCB
content is reused. Electronics authorship remains deferred.

A day counts toward the local streak when a new subpart lesson or chapter
placement completes, not merely when the application opens. Progress remains
on the device; it is not a learner assessment or synchronized account record.
Future lessons unlock in authored order. Completed lessons can be reviewed
without undoing assembly or earning duplicate progress.

## Engineering boundary

This is an isolated Three.js research instrument, not adoption of Three.js
as the Machines-native product engine. Stable Machines source and icon remain
separate. No changes to canonical Course semantics are implied.

## Evidence and next step

Unit tests cover gated progress, restoration and streak behavior. Browser
inspection covers the course/chapter/lesson path, base placement, persisted
progress and responsive layout. Device installation is recorded in the Lab
README. Next: creator review of the feel on physical devices; electronics
research and detailed lesson authoring remain separate future work.

## Creator reference refinement — 2026-10-01

The creator supplied six Brilliant-style screenshots and requested closer visual
alignment: a horizontal course selector, connected chapter cards with completed
and partial states, circular raised lesson medallions, a green current-lesson
marker, a fixed Start card, and exactly Home/Courses/You navigation. This replaces
the earlier luminous rectangular lesson cards. Course/chapter artwork remains
blank for future creator assets; upcoming carousel entries are disabled placeholders,
not invented available courses. No notification prompt or exercise counts are shown.

The iOS Lab shell uses SwiftUI Liquid Glass on iOS 26+, with a material fallback;
the browser has a CSS glass fallback. Three.js produces medallion images once,
then DOM scrolling keeps images and text in one coordinate system. This replaces
the live canvas overlay responsible for visible scrolling drift. The app icon is
a white mouse on black. Progress remains device-local with the existing gates.
Course percentage weights each of the fourteen chapters equally; chapter progress
includes subpart placement and its final add-to-mouse action. Unimplemented
chapters contribute zero, so the partial prototype cannot claim course completion.

## B100 and Chapter 1 focus — 2026-10-05

The creator selected the Logitech B100 from iFixit guide 173556 (M-U0026), allowed
photographic dimension estimates, and prioritized the mouse structure and base
chapter over menu polish. Brilliant remains a broad reference, not an exact design
target. Remove the green lesson orb and learner-visible Lab name; distinguish the
installed experiment only through its separate icon. Home gets a course carousel
with only the real Mouse course and provisional mouse art. Remove upcoming-course
selector entries. You shows only actual local streak days and completed lessons;
no synthetic activity is added.

The photographic reconstruction and uncertainty record lives in
[the B100 reference](../../Prototypes/MachinesMouseThree/Experiments/MouseLab/B100-reference.md).
Chapter 1 groups four feet into front and rear pairs around the molded lower shell.
The experimental bundle identifier remains stable to preserve device-local data.
This does not change Reference Padlock 01 or the Machines-native engine decision.
Next: creator inspection of Chapter 1 and the estimated base geometry, followed by
B100-specific chapter authorship. Remaining course topology is provisional.

## Retained mouse experiment — 2026-10-07

The installed Lab entry now follows the authorized Origin experiment in
[0007](0007-shared-origin-journey.md). This mouse source, model, reference evidence
and tests remain recoverable; its course UI is not included in the new Lab entry.
The icon and native navigation requirements above are historical for the mouse
experiment. The original app retains its mouse behavior with a new gold Machines
icon. The Lab icon is periwinkle. No mouse progress keys are reset by Origin.
