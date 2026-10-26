# Rosenblatt

Rosenblatt helps people understand how machines work. The current direction is
to begin with a complete Machine and investigate its subsystems only as deeply
as the explanation requires. The creator will choose the next Machine and
participate directly in the code; see [machine-first direction](docs/human/machine-first.md).

The retained [Assembly Journey study](Prototypes/MachinesMouseThree/Experiments/AssemblyJourney/README.md)
still supplies the app content pending that selection. A native cold-launch
wordmark introduces the app for about 2.5 seconds. Its visual/device acceptance
remains open; this is not yet a new machine-first Course.

Start contributing with the [code map](docs/human/code-map.md) and
[creator-operated TestFlight guide](docs/human/testflight.md).

The Lab target delivers through the existing Rosenblatt TestFlight app,
`com.machines.mouse.preview`. Candidate 1.0 (7) adds the native introduction and passes simulator compilation;
it has not been archived or uploaded. Build 6 uploaded previously, with Apple
processing and Insiders availability still unverified here. Build 4 is retained
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
