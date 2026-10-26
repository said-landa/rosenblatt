# Rosenblatt Constituent Construction Lab

> Retained prior experience. On 2026-10-23 the creator authorized the
> [Assembly Journey study](../AssemblyJourney/README.md), now the Lab packaging
> entry. This source and its progress namespaces remain preserved for rollback.
> Earlier implementation and release statements below describe dated history.

Authorized experimental implementation, 2026-10-11. The creator asks for deep
constituent construction, shared branches and reuse, with beautiful inspectable
3D assembly. Sound was deferred by the creator on 2026-10-13. This is a bounded candidate for experience review,
not an accepted Course, quantum solver or implementation of the entire graph.

## Creator review — 2026-10-21

The creator rejects the current presentation: weak orbit feel, unexplained
colored points and insufficiently meaningful assembly. The shared foundation
remains intended. A [replacement proposal](../../../../docs/human/assembly-journey.md)
now connects a brief foundation to functioning systems, with contextual
explanation and purposeful camera/interaction design. The tests and delivery
records below do not establish experience acceptance. No code change or new
app build is made by this planning turn; the physical orbit complaint remains
unresolved. See [0010](../../../../docs/decisions/0010-assembly-journey-experience.md).

## Implemented experience

- Ordered prerequisite inspection: up quark, down quark, gluon field, electron,
  binding, then the retained constrained composition. No invented subcomponents
  of elementary particles. `machines.constituents.encounters.v1` resumes the
  inspection sequence independently of assembly progress.
- Fixed 3D symbols with slow front/back camera voyages, changes of elevation and
  distance, and spherical chapter/placement transitions. Direct camera orbit
  interrupts authored travel. Reduced motion disables automatic voyages. Cosmic
  backdrop/ribbons are removed. Name, charge/interaction, one arrow and compact
  model boundaries are the particle encounter's visible copy.

- Proton valence composition: two up quarks and one down quark. A fourth focus
  action reveals the essential strong interaction/gluon field. That field is
  already present; the gesture does not switch the strong force on.
- Hydrogen-1 reuses the constructed proton. An electron placement reveals the
  stationary 1s probability distribution, not a planetary orbit.
- Neutron branch uses one up and two down valence quarks. The common ingredient
  definitions remain available. Free-neutron instability is stated; its decay
  and production pathways are outside the candidate.
- One contextual draggable ingredient and outlined destination; off-target
  drops return without completion. Keyboard/assistive activation places the
  same allowed ingredient at the same authored destination.
- Real perspective-camera translation along curved paths, orbit/zoom inspection,
  flowing field illustration, reduced-motion handling and portrait/
  landscape layouts. No info button, text selection, course catalog or ads.
- English labels explain each ingredient/charge and the visual-model boundary.
  A short opening names rocket engines, car engines, chips and cells before
  introducing their shared matter. Begin/Continue shows once per local profile,
  using `machines.constituents.introduction.v1`; assembly progress is unchanged.
  Persistent Foundation, pause and mute controls have been removed.
- An ingredient dependency map replaces the bottom branch selector. Proton and
  neutron are parallel builds from quarks/gluons; proton plus electron leads to
  hydrogen-1 with zero neutrons. Larger nuclei are a noninteractive future node.
  One contextual onward action exposes the next available construction.
- Placement now has curved travel, an illuminated trail, contact glow and timed
  binding before progress commits. Field lines strengthen gradually; electron
  probability samples reveal progressively. Ingredient/chapter fades reduce
  popping. Proton-to-hydrogen retains its proton meshes and continuously shrinks
  them into the atom view. Bloom supports the authored visual representation.
- Isolated persistence at `machines.constituents.v2`, migrating valid v1 data
  without removing its old key. Independent counts retain partial work on each
  branch. Neutron needs no completed proton; hydrogen does. Interrupted placements
  do not save; invalid state cannot fabricate prerequisites. Traversal does not
  establish understanding or mastery.

## Scientific representation contract

This is composition manipulation, not a physically executable particle-formation
recipe. Positions, sizes, colors, surface ripples and field lines are illustrative.
Color distinguishes visual ingredients; it is not a literal visible property or
a complete representation of QCD color charge. Quarks are not asserted to exist
as isolated beads that can be manufactured and hand-inserted. No smaller
experimentally established constituent is invented beneath quarks/electrons.

The valence count and electric-charge sum are constrained. Moving the symbols
into slots is an authored interaction, not a constraint on physical quark
positions. Gluon and sea-quark dynamics are essential; the moving lines and
volume mark their presence but do not solve QCD or resolve individual sea
species. Three fixed valence packets do not claim to be a complete nucleon.
This is not evidence of conserving energy, momentum or all quantum numbers in a
simulated reaction, nor does it assert an earliest natural Machine chronology.

Hydrogen samples the spherical 1s density: radius is distributed as
Gamma(3, a0/2), corresponding to radial probability proportional to
`r² exp(-2r/a0)`. Points are statistical samples of where one electron may be,
not additional electrons. Samples remain stationary; inspection changes camera
perspective. The nucleus is greatly enlarged. The electron is an independently
introduced prerequisite; proton construction does not generate an electron.
Physical capture, energy release, radiation and quantitative scale are not
simulated. The compact in-product caption declares a probability model.

Primary references checked 2026-10-11:
- [DOE protons](https://www.energy.gov/science/doe-explainsprotons): valence
  composition, sea constituents, proton/neutron charge and free-neutron decay.
- [DOE quarks and gluons](https://www.energy.gov/science/doe-explainsquarks-and-gluons):
  strong interaction, confinement and composite nuclear matter.
- [CERN subatomic particles](https://home.cern/science/physics/subatomic-particles/):
  quark/electron elementary boundary and atom/nucleus structure.
- [CERN quantum fields](https://home.web.cern.ch/science/physics/higgs-boson/what/):
  fields, excitations and force carriers.
- [OpenStax, The Hydrogen Atom](https://openstax.org/books/university-physics-volume-3/pages/8-1-the-hydrogen-atom):
  stationary states, the 1s wavefunction and probability interpretation.

## Audio and haptics

Current candidate (2026-10-13): audio playback is disabled in both browser and
native feedback paths. Native haptics remain. The offline bundle excludes WAVs
and removes its previously generated Audio directory. Source palette and
generator remain recoverable. The following details describe the retained
2026-10-11 audio experiment, not playback in the current candidate.

Six original procedural feedback cues: contact, placement, field binding, branch
reuse, completion and return. These are designed sounds, not acoustics recorded
from particles or sound traveling in vacuum. Native iPhone playback uses bundled
PCM16 stereo WAV at 48 kHz, prepared AVAudioPlayers, device volume and playback
category with music mixing. Lab-only UIKit feedback accompanies gestures,
connections, completion and returns. Browser playback uses the same WAVs through
Web Audio; it does not run alongside the native adapter.

Mute and backgrounding stop playback. Pending browser decodes are cancelled by
a generation token. There is no automatic drone on launch. No microphone,
external audio service, new entitlement or network download is required.

`npm run constituents:audio` reproducibly rebuilds `Audio/*.wav` and
`Audio/palette.json`. `Audio/sound-study.wav` auditions the six cues in the
manifest order, with pauses between them. A custom voice memo, audio file, or
video timestamp can specify a target; a description of texture, duration,
rhythm and the corresponding action also works. The creator can hum or make
the intended sound. Reference audio can communicate a direction without needing
an exact finished asset.

To integrate a custom cue, export it as PCM16 stereo 48 kHz WAV, replace its
named file and adapt the deterministic generator/manifest so the next build
preserves it. The native bridge accepts only the six allowlisted cue identifiers.
It cannot select arbitrary filesystem paths. Quality, loudness and haptic feel
remain physical creator-review questions.

## Packaging, preservation and evidence

`npm run lab:build:ios` packages this source, without audio files, into
`iOS/MachinesMouseLab/Web`. As of 2026-10-19 the Lab Xcode target delivers to
Rosenblatt's existing App Store Connect identity, `com.machines.mouse.preview`
(Apple ID 6816994687). Its own Info.plist enables `RosenblattLabExperience`;
native behavior is no longer selected solely by a `.lab` suffix. The app and
opening are named Rosenblatt. Existing source/storage identifiers remain for
compatibility. See decision 0009.
No engine migration is made: the experiment owns its composition state, and
Three.js remains a replaceable rendering dependency beneath the native-engine
direction in decision 0003. This experiment is not the canonical Course runtime.
Reference Padlock 01 remains the separate native-engine reference under 0005.

`Experiments/Origin/Source` (revision 3), its earlier archives, MouseLab source,
reference evidence, test cases and their storage keys remain retained. The
stable original mouse source and packaging entry are unchanged. Nothing is
committed or pushed.

Hierarchy, animation and Rosenblatt delivery, 2026-10-19:
- All 31 checks and syntax pass, including parallel branch prerequisites, partial
  restoration, v1 migration and the travel/binding/reveal timeline boundaries.
- Fresh-profile browser traversal at 390×844 covers the renamed opening, all
  particle encounters, hydrogen initially locked and neutron initially available,
  proton completion, continuous proton reuse and completed hydrogen-1. A pending
  placement visibly keeps progress uncommitted and prevents a duplicate action.
- Landscape 844×390 keeps the graph scrollable. Resizing during an unfinished
  placement cancels it without advancing; neutron remains at 1/4. Full neutron
  completion and reload restoration pass. No browser errors or warnings observed.
- Earlier saved hydrogen and partial neutron progress were restored; switching
  away exposes the neutron's 1/4 count. [Hierarchy](Evidence/hierarchy-fresh-phone-20261019.jpg),
  [hydrogen](Evidence/hydrogen-phone-20261019.jpg).
- Archive 1.0 (4) succeeds with the verified Rosenblatt bundle ID, visible name,
  Lab native flag and no non-exempt encryption. The signed archive's HTML/CSS/JS
  SHA-256 values match the generated Lab bundle; the dependency map is present and
  the removed bottom branch nav is absent.
- Xcode's first attempt under the synced Documents folder failed code signing
  because File Provider added Finder metadata. Building/signing in `/private/tmp`
  resolves it. Versioned compressed archives and exact source snapshots are kept
  under `iOS/build-releases/Rosenblatt-1.0-4`, ignored by Git.
- `scripts/testflight-lab.sh archive` checks/builds/signs and preserves the release.
  `scripts/testflight-lab.sh upload` checks its bundle ID against Rosenblatt and
  uploads without altering the source build number. Increment the build number
  for the next release. Export/sign outside synced folders; restore the archived
  tarball into `/private/tmp` if that working copy has been removed.
- Upload 1.0 (4) succeeds and Apple processing completes in the Rosenblatt record.
  Its Insiders group already has Automatic for Xcode Builds distribution enabled.
  Build 4 is assigned to Insiders. Build 1.0 (1) remains available and was installed by the existing tester on the
  paired iPhone. Processing, availability and the actual new phone install are
  tracked separately in [release evidence](Evidence/release-20261019.md).
- The separate legacy `.lab` app's Library is backed up locally before cleanup.
  The duplicate was then uninstalled; a fresh device query confirms only the
  retained identity remains, currently 1.0 (1). Its progress is not automatically
  merged across bundle sandboxes. No direct
  development installation of this revision is performed.

Earlier dated checks below describe historical versions, not current delivery.

Particle/camera revision checks, 2026-10-13:
- All 26 tests pass. Four new checks cover ordered/restored prerequisite progress,
  preservation of composition, malformed state and camera travel to opposite
  sides without crossing the subject. Syntax and offline bundling pass.
- Signed iPhone build succeeds. Log: `/private/tmp/MachinesParticles20261013-build.log`.
  The generated web bundle and signed app's web bundle have matching SHA-256.
- Browser inspection traverses all encounters, direct orbit, mid-encounter reload,
  binding entry, proton completion, hydrogen reuse and reload restoration.
  Previously completed hydrogen is also preserved through the new encounters.
  Portrait 390×844 and landscape 844×390 are checked; no errors/warnings appear.
  A portrait gluon clipping defect was corrected by reducing symbol scale.
- Screenshots: [quark portrait](Evidence/quark-tour-phone-20261013.jpg),
  [binding landscape](Evidence/binding-tour-landscape-20261013.jpg).
- The final signed package is installed on the paired iPhone 16e. The first
  install attempt lost its remote connection; retry succeeded. Launch returned
  an explicit device-lock rejection. Unlock and retry launch without rebuilding.
  Physical quality remains unverified. [Deployment record](Evidence/deployment-20261013.md).

Earlier opening-only checks, 2026-10-13:
- All 22 existing tests, syntax and offline bundling pass. Retained audio tests
  validate historical assets, not playback in this revision.
- A native-feedback probe confirms six valid cues send haptics only, with no
  sound-playback request; hidden-document cues are suppressed.
- Browser inspection at 390×844 verifies the introduction, Begin transition,
  invalid drop rejection, valid/keyboard placement, proton completion, hydrogen
  reuse and reload restoration. Hydrogen is also inspected at 844×390; no
  browser errors or warnings are reported.
- Browser checking caught a hidden composition/branch row after Begin; the
  introduction transition now refreshes the current construction UI.
- Screenshots: [opening](Evidence/introduction-phone-20261013.jpg),
  [hydrogen](Evidence/hydrogen-phone-20261013.jpg).
- This revision has not had signed native compilation, installation or physical
  review at that point. The 2026-10-11 package was the last installed revision
  before the particle/camera deployment above.

Historical engineering checks, 2026-10-11:
- All 22 prototype tests pass, including seven new composition/restoration/audio
  checks. Existing mouse and Origin checks continue to pass.
- Syntax and offline asset bundling pass. PCM headers, duration, reproducibility,
  boundary samples and headroom are checked; this does not rate sound quality.
- Signed iPhone compilation succeeds. Build log:
  `/private/tmp/MachinesConstituents20261011-build.log`.
- Browser inspection at 390×844 traverses invalid drop, all proton placements,
  hydrogen reuse/completion, neutron branch, pause/intentional placement,
  keyboard activation and restored hydrogen progress. Landscape 844×390 is
  inspected. No browser console errors or warnings observed.
- Final corrected Lab package installed and launched on the paired iPhone 16e,
  `FFC51592-AF0E-5BA6-81B6-D987E4DCAE53`, bundle `com.machines.mouse.lab`.
  One initial tunnel reset was resolved by retry. Installation of the final
  package and its subsequent process launch both returned success. This is not
  physical sensory or frame-time acceptance. iPad work remains deferred at the
  creator's request. The original app was not rebuilt or reinstalled this turn.

The orientation/branch regression caught accumulated camera-depth drift caused
by repositioning the assembly onto a changing camera-facing plane every frame.
The final correction fixes the assembly at the world origin and shifts optical
framing with camera view offsets. Portrait ↔ landscape and branch revisits now
keep the model framed, while authored flights still translate the real camera.
The corrected full proton/hydrogen path was retraversed, and all neutron drops
were retraversed at confirmed 390×844 dimensions. Final screenshots:
[proton](Evidence/proton-phone.png), [hydrogen](Evidence/hydrogen-phone.png).

Remaining: creator review of particle encounters, camera travel, touch, haptics, safe areas,
frame time/thermal behavior, accessibility and scientific interpretation.
Neither a build nor traversal demonstrates a beautiful or effective lesson.
Next highest-leverage decision: does the brief opening and direct composition make the
ingredient/interaction relationship clear enough to author the next dependency?
