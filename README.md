# Machines

Machines teaches one exact Machine Variant through construction and explanation
of its component relationships. The first executable experiment is a
low-fidelity Course about a Master Lock W1 four-pin pin-tumbler cylinder.

## Run the reference Course

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
