# Machines Mouse Lab

This is an isolated, disposable copy of the stable mouse experience. Edit only
files under `Source` for experiments. The stable app at the prototype root is
the source of truth.

## Restore the stable state

Historical reset procedure (not the active Origin recovery path): run `npm run lab:reset`. This overwrites only `Experiments/MouseLab/Source` with
the current stable source. Then Run `MachinesMouseLab.xcodeproj`, or use
`scripts/run-ipad-lab.sh`, to reinstall the restored Lab app.

`npm run lab:status` reports whether Lab differs from its latest reset. The experiment uses a separate iOS bundle identifier and icon, so it can remain
installed beside the stable Machines app. Its display name and learner interface
now say Machines, without a Lab badge.

## Accepted interface revision — 2026-09-28

The creator explicitly retained portrait and landscape support after withdrawing
the landscape-only request. No login or orientation lock is introduced.

Lab uses dark appearance from initial HTML through the native container, regardless
of OS appearance or old theme storage. Only the Lab badge and three workspace
modes remain in the header; gesture hint copy is removed, gestures retained.
Safe-area insets plus spacing protect overlays on both landscape sides.

In portrait, drag the assembly panel background/text toward any screen edge to
stash it. Drag the remaining edge tab inward to recover it (Enter/Space also
recover it for keyboard access). Buttons keep their original actions. The title,
mode controls, carousel and assembly progress are independent of docking.
Cancelled drags restore position; resizing/orientation or mode changes recover
the panel. No gesture tutorial is added.

Verification: eight existing tests, Lab syntax checks, offline bundle, and
Xcode simulator build passed. Browser portrait (390 × 844), landscape
(844 × 390), and tablet portrait were inspected; panel stash/recovery was exercised.
Physical-device safe-area and touch validation remain pending; the interface still needs physical touch and notch inspection.

Installation update (2026-09-30): the signed Lab app was installed and launched
on the paired tenth-generation iPad over local Wi-Fi. The same signed app was
subsequently installed and launched on the iPhone 16e after renewing its existing
Mac pairing. Installation and process launch are confirmed on both devices;
physical visual and touch inspection remains pending.

## Course navigation revision — 2026-09-30

Supersedes the docking and mode-tab experiment above. The entry point is now
Courses → Mouse → fourteen chapters. Base, optics and PCB have authored lessons;
eleven remaining chapters are gray and unavailable. Each subpart lesson places
one group; the final lesson explicitly installs the completed part. Dependencies
gate progress, repeated actions cannot double-count, and no undo/reset UI exists.

The lesson card remains fixed. Available content uses animated blue Three.js
rounded frames beneath semantic HTML buttons; disabled content is gray.
Press feedback, reduced-motion handling, viewport clipping, background suspension
and a shared card renderer bound animation work. A separate Lab asset catalog
contains the near-black/blue mouse icon; stable Machines keeps its icon.

Double-tap page zoom is suppressed with viewport limits and touch-action;
native page pinch is disabled in Lab while OrbitControls retains model gestures.
Lab uses persistent WKWebView storage; progress and learning-day streak are local
to each device, not synchronized or connected to any account. A new completion
marks a learning day; same-day actions do not increase the streak twice.

Validation: eleven tests passed, including sequence gating, restore validation
and streak day boundaries. Browser inspection completed the base chapter through
its add-to-mouse step, restored progress after reload, and checked mobile portrait
and landscape layouts. Physical double-tap and touch feel still require review.

Deployment: the final course-navigation build was installed and launched on both
physical devices (iPhone 16e and tenth-generation iPad) on 2026-09-30. This confirms
installation and process launch, not physical visual/touch acceptance. iPad
portrait was also inspected in the browser. Page double-click left the browser
interface unchanged; physical iOS double-tap verification remains for review.

## Reference-led visual refinement — 2026-10-01

The creator's six screenshots supersede the previous rectangular glowing cards.
Home resumes the next authored chapter. Courses provides a horizontal selector
(Mouse plus disabled future placeholders), chapter cards, completed checks and
actual progress bars. You shows only device-local progress and streak. The lesson
path uses raised circular medallions, a green current marker, selected ring and
fixed Start card. Notification prompts, exercise/lesson counts and trainer widgets
are omitted. Course and chapter illustration slots intentionally remain blank.

The iOS shell provides actual SwiftUI Liquid Glass for Home/Courses/You on iOS 26+
and a system material fallback below that version. A restricted main-frame bridge
synchronizes the selected section and hides the bar in lessons. Browser previews
use a CSS glass fallback. Medallions are generated once by Three.js and become
inline images, eliminating the live overlay/scroll desynchronization. Reduced
motion disables marker floating. The existing local progression data is retained.

Future artwork can use transparent square PNG/WebP images (1024 × 1024 source)
with a centered illustration and roughly 12% clear padding. No assets are needed
to test the interface. Blank slots are deliberate, not failed image requests.

Validation: eleven tests pass; simulator build and physical iPhone build pass.
Native Liquid Glass was visually inspected in the iPhone 16e simulator, and its
Courses button changed both native selection and web content. Earlier browser
inspection verified chapter states and the lesson path against the references.
Physical iPhone installation and launch completed; physical feel remains for
creator review. Simulator image generation is fixed to exactly 1024 × 1024 pixels
for the Lab app icon, independent of Mac display scale.

Deployment follow-up: the refined build is installed and launched on the physical
iPhone. The iPad installation attempt was rejected because the device is locked
and has not been unlocked recently (CoreDevice 10003 / RemotePairing 1016). Its
update remains pending an unlock; the prior installed build is unchanged.

Reinstallation — 2026-10-05: the current source passed Lab syntax checks,
all eleven tests, offline bundling and a signed physical-device build. The
same `com.machines.mouse.lab` bundle was installed and launched successfully
on the iPhone 16e and tenth-generation iPad, completing the pending iPad update.
Both were updated in place without uninstalling. Physical visual and touch
acceptance remains for creator review. Build log:
`/private/tmp/MachinesMouseLabReinstall20261005-build.log`.


## B100 and Chapter 1 focus — 2026-10-05

The creator selected the photographed B100 M-U0026 in iFixit guide 173556.
[Reference evidence and reconstruction limits](B100-reference.md) distinguish
observed layout from estimated geometry. The base has four feet grouped as two
front and two rear feet, integrated molded locating features, an optical opening
and a rear closure boss. The full model now follows the amber/green PCB, optical
wheel, two springs and rear cable connector arrangement. Remaining chapter
structure and fine electrical/optical geometry are provisional.

The green orb, Lab badge and upcoming-course selector entries are removed.
Home has one real Mouse carousel card with provisional vector art. You displays
actual local streak and completed lessons, including final chapter placement;
no test activity is seeded on devices. Existing local progress remains intact.
The app is named Machines; its white-on-black icon distinguishes the experiment.
CoreGraphics bitmap drawing fixes the previously all-black icon output.

Verification: twelve tests, syntax checks, offline bundle and signed physical-device
build passed. Browser inspection completed Chapter 1, reloaded its progress and
verified You showed four completed lessons without duplicating review activity.
Portrait phone (390 × 844), tablet (820 × 1180) and phone landscape (844 × 390)
were inspected. A reproduced ResizeObserver notification loop on orientation
change was fixed by CSS-owned canvas sizing and deferred observer updates; the
previously failing rotation then showed no alert. Geometry was inspected in
exterior, interior, base and underside views against the reference photographs.

The final bundle was installed in place and launched on the iPhone 16e and
tenth-generation iPad. CoreDevice confirms deployment and launch; physical
visual/touch acceptance remains for creator review. Build log:
`/private/tmp/MachinesB10020261005-build.log`. Browser evidence:
`/private/tmp/MachinesB10020261005-interior.jpg`,
`/private/tmp/MachinesB10020261005-home.jpg`,
`/private/tmp/MachinesB10020261005-you.jpg` and
`/private/tmp/MachinesB10020261005-ipad-base.jpg`.

## Preserved experiment — 2026-10-07

The active Lab app now bundles [Origin](../Origin/README.md). This mouse source,
B100 evidence and tests remain available separately. Its former navigation/icon
requirements above are historical. `lab:reset` mutates this retained source and
is not needed to build or recover Origin. Do not use it to recover the current
Lab app. Mouse local progress keys are not read or overwritten by Origin.
