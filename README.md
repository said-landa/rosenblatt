# Rosenblatt

Rosenblatt teaches construction from fundamental constituents toward natural
and technological systems. The current Lab entry is the
[Assembly Journey study](Prototypes/MachinesMouseThree/Experiments/AssemblyJourney/README.md):
a brief shared foundation, purposeful 3D camera travel, visible future paths and
a separately identified working switch/resistor/LED circuit preview.

The creator authorized this study on 2026-10-23 after rejecting the earlier
particle presentation. [Assembly journey](docs/human/assembly-journey.md) records
the scope; this is an experimental slice, not an accepted complete Course.
The prior constituent experience, progress namespaces and release archives remain.

The Lab target delivers through the existing Rosenblatt TestFlight app,
`com.machines.mouse.preview`. Candidate 1.0 (6) uploaded successfully; Apple processing and Insiders availability
remain to be verified. Build 4 is retained
for rollback within TestFlight's availability window. See
[current status](docs/human/status.md) and
[decision 0009](docs/decisions/0009-rosenblatt-lab-testflight-delivery.md).

Existing Machines modules, paths and storage keys remain compatibility
identifiers. The native-engine direction remains accepted; Reference Padlock 01
is its selected reference under decision 0005. The older W1 commands below are
retained implementation examples, not the current reference selection or mobile
release process. Do not directly install development builds for normal delivery.

## Run the retained W1 experiment

```bash
swift run MachinesCoursePreview Courses/pin-tumbler-lock/course.json
```

For a local macOS app bundle suitable for accessibility inspection:

```bash
sh Scripts/package-preview.sh
open .build/MachinesCoursePreview.app
```

## Validate and compile authored source

```bash
swift run machines validate Courses/pin-tumbler-lock/course.json
swift run machines build Courses/pin-tumbler-lock/course.json \
  --output /tmp/pin-tumbler-lock.course-build.json
```

## Verify

```bash
swift test
```

The current build is Generation 0 evidence. It is executable, but it is not yet
domain-reviewed, pedagogically validated, visually accepted, piloted, or ready
for release.
