# Machines Origin Experiment

Current packaging, 2026-10-11: Lab now selects the
[Constituents candidate](../Constituents/README.md). This document records the
preserved Origin iterations and their historical deployments. Origin source,
archives, tests and local progress keys remain recoverable; the instructions
below describe their packaging at the time, not the current Lab entry.

Authorized isolated Lab opening, 2026-10-07. The stable app retains its mouse
functionality; both app icons now use a modular Machines M (gold original,
periwinkle Lab). The original mouse experiment remains in `../MouseLab`, with
its source, reference evidence and tests intact.

## Implemented slice

- Direct 3D entry, with an authored expansion/cooling progression; icon controls
  for pause/resume, inspection, replay and optional Spanish scientific context.
- Two-finger outward gesture advances the same constrained progression. The
  central icon is the equivalent single-pointer control.
- A guided helium-4 composition representation: two protons and two neutrons.
  Incorrect particle choices do not mutate committed state or completion.
- Orbit/zoom inspection pauses progression. Placement animation can be paused
  through inspection or the information dialog. Backgrounding stops progression.
- Independent local progress key `machines.origin.v1`. Existing mouse progress
  is neither read nor overwritten. Restoration rejects incompatible states.
- No visible mouse course, old native navigation, ads, account or analytics.

## Scientific scope and distortion

This is an educational visual model, not a cosmological or nuclear solver.
The initial field samples a region with no privileged explosion center. Particle
separations change independently of camera zoom. Expansion amount, temperature
colors, apparent sizes and 13-second duration are authored representations,
not calibrated cosmological values. The textured background is a visual cue,
not an actual nebula or an assertion that the earliest plasma was transparent.
The dots represent plasma constituents, not stars.

The nucleus step exposes composition. Sequential snapping is not a claim that
four nucleons bind through these hand-placement actions: reaction pathways,
binding energies and radiation are outside this slice. The result is a nucleus,
not a neutral atom. Matter creation and the ultimate trigger for expansion are
not implemented or presented as a settled recipe.

Sources checked 2026-10-07:
- [NASA universe overview](https://science.nasa.gov/universe/overview/).
- [NASA cosmology Q&A](https://science.nasa.gov/mission/webb/big-bang-q-and-a/).
- [DOE fusion fuel](https://www.energy.gov/science/doe-explainsdeuterium-tritium-fusion-fuel)
  confirms the two-proton/two-neutron helium composition; its D-T fusion process
  is not asserted to be the early-universe pathway shown here.

## Packaging and recovery

`npm run lab:build:ios` now builds `Experiments/Origin/Source` into the same Lab
bundle identity, `com.machines.mouse.lab`. Mouse source is retained separately.
To inspect it without changing the new bundle, use the local server path
`/Experiments/MouseLab/Source/index.html`. Restoring it as the Lab entry requires
an explicit build-source selection; do not run `lab:reset` as a recovery action,
since that older command replaces the mouse experiment with the stable baseline.

`npm run build:ios` still packages the stable mouse app. No original functionality
was replaced. No source deletion or device uninstall was performed.

## Evidence and remaining validation

Fourteen tests passed, including wrong-part rejection, prerequisite enforcement,
paused-state immutability, corrupted restoration rejection and complete valid
restoration. Offline Lab bundling and both signed device builds passed.

Browser inspection: phone 390×844, tablet 1024×768. Traversed expansion, rejected
an incorrect first neutron (progress remained 60% and zero parts), assembled all
four valid nucleons, restored completion on reload, paused expansion (progress
remained 2% across inspection of optional information), and checked the resized
scene. No browser console errors or warnings were observed.

Two-finger gesture, real-device frame time/thermal behavior, accessibility and
physical safe-area/touch quality remain unvalidated. Construction completion is
not evidence of learning. This is the first bounded origin slice, not the full
cosmic-to-modern-machine journey.

Build logs:
- `/private/tmp/MachinesOrigin20261007-build.log`
- `/private/tmp/MachinesOriginal20261007-build.log`

Screenshot: `/private/tmp/MachinesOrigin20261007-phone.jpg`.

Deployment: both packages installed on iPhone 16e and tenth-generation iPad.
Initial Lab installs encountered transient tunnel resets; retries succeeded.
iPhone process launches for both packages succeeded. iPad process launches were
rejected by iOS because the device was locked; launch verification remains pending.

Creator follow-up: focus on iPhone; further iPad launch verification deferred.
Phone landscape 844×390 was also inspected at the nucleus stage.

## Revision 2 — experiential refinement, 2026-10-07

The creator found the first control panel confusing and requested distinct,
intuitive moments with camera travel, sound and haptics. This revision replaces
the persistent dock, epoch row and two-particle tray. Only information remains a
persistent utility button. Each active scene supplies one contextual affordance.

- Expansion: hold the luminous focal cue to advance an authored camera flight
  through the sampled field. Release pauses progression; drag the scene to inspect.
- Cooling: a separate checkpoint requires renewed participation. Expansion and
  cooling remain physically linked; these are attention segments, not separate
  independent physical laws. Short chapter labels fade after three seconds.
- Nucleus composition: drag the single appropriate particle along the faint
  guide into the highlighted location. An incorrect drop returns it without
  committed progress. Each valid connection moves the camera to another angle.
- Keyboard/screen-reader activation runs to the next checkpoint or performs the
  valid placement. The only visible action words are short Spanish cues.
- Web Audio supplies filtered noise, a low evolving tone and connection chimes,
  activated only through interaction. Muting and replay are inside information.
- The Lab-only WKWebView bridge routes named cues to UIKit impact, selection and
  notification feedback. Sound and vibration are authored sensory cues, not
  claims about sound propagation in cosmic vacuum. Reduced motion suppresses
  automatic camera travel and pulsing; guidance does not depend on hearing.

The revised authored experience uses `machines.origin.v2`; the earlier origin
record and mouse records remain untouched. Its persisted state schema stays at
version 1. This provides a fresh opening for the revised experience without
purging the previous record. Each initial hold segment takes about 2.5 seconds
in the authored timeline, with progression independent of rendered frame count.
Visibility loss, information and release pause progression; assembly/camera
inspection and optional information preserve the valid path.

Validation: fifteen tests pass, including a new explicit checkpoint test. Syntax,
offline bundling and signed iPhone build passed. Browser traversal confirmed
expansion stopped at 30% in Cooling with running=false, then resumed deliberately
to the 60% nucleus stage. An incorrect drag left zero parts/60%; a valid drag
advanced to one part/70%. No browser errors/warnings were observed. The phone
opening with the simplified controls was inspected at 390×844.

During verification, a duplicate source block was caught by syntax/bundle checks
and corrected before successful packaging. Browser polling deadlines exposed
frame-count-dependent progression; the authored clock now advances in constrained
increments from active elapsed time, stopping at each boundary. Browser timing
checks are not physical device frame-rate measurements.

The updated Lab package was installed on the iPhone. Further iPad work remains
deferred at creator request. Native bridge compilation and launch do not establish
audible output, physical haptic feel, touch discoverability, motion comfort or
learning quality; those remain creator/device review. Icons and the stable app
were not changed again in this refinement.

Screenshot: `/private/tmp/MachinesOrigin20261007-revised-phone.jpg`.

Final deployment: CoreDevice confirmed successful launch of revision 2 on the iPhone.

## Revision 3 — 2026-10-07

Creator correction: English language, no selection/callouts, no info button,
brief contextual explanation, genuine camera travel and audible sound.
The prior helium composition exercise is archived in `Archive/Revision2`.
The active opening is three prerequisite checkpoints: hot early conditions,
spatial expansion and cooling, with no nucleus/atom exercise or implied known
creation-from-nothing mechanism. Each segment takes eight active seconds;
release/background pauses. A held pointer cannot cross a checkpoint automatically.
Keyboard/assistive activation runs to a safe checkpoint and supports pause.
The next particle chapter is explicitly a future chapter, not an enabled route.

A perspective camera follows a curved path spanning 270 units in depth through a real 3D volume;
world expansion independently changes relative separations. Translucent mist,
soft points and filaments are visibility cues, not literal objects or calibrated
cosmology. Reduced motion suppresses the authored camera flight. Orbit and zoom
inspect paused views without changing scientific progression.

`machines.origin.v3` leaves older local progress untouched. The Lab uses native
AVAudioPlayer PCM synthesis and a user-activated playback audio session mixing
with other audio; device volume governs loudness. Browser previews use Web Audio.
UIKit haptic cues remain Lab-only. Ambient playback stops on release/background.
No new dependency, microphone access, network audio or engine migration is added.

Verification: fifteen tests passed, including three revised checkpoint/pause/
corruption tests; JavaScript syntax and offline bundling passed. Signed Xcode
compilation passed. Browser at 390×844 confirmed English copy, computed
user-select:none, absence of info control, checkpoint pause and changed views
along the camera flight; console had no warnings/errors. Long-press on physical
WebKit and perceived sound/haptic quality still need creator device review.
Screenshot: `/private/tmp/MachinesOrigin20261007-revision3-flight.jpg`.

Further browser checks: completion reached 100%, replay returned to 0%, dragging
across introductory text left an empty selection, and pause/reload preserved
34% without autoplay. The final signed build passed (only the expected absent
AppIntents metadata warning). Installation succeeded on iPhone 16e at 08:16;
physical audio/touch/haptic acceptance remains pending. No iPad action this revision.
Launch verification: `xcrun devicectl device process launch --terminate-existing`
reported a successful launch of `com.machines.mouse.lab` on iPhone at 08:17.
This confirms process launch, not physical sensory acceptance. Browser stage
traversal used keyboard activation; actual long-press behavior on iPhone remains
for creator inspection. The preview server was stopped and viewport override reset.
