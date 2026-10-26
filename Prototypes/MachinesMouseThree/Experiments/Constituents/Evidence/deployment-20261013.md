# Machines Particle Encounters — 2026-10-13

## Local verification

26 prototype tests pass. Four new tests cover prerequisite-state restoration and
camera routes. Syntax and offline web packaging pass. Browser traversal checks
up/down quarks, gluons, electron, binding, manual camera orbit, mid-encounter
reload, entry into composition, proton completion, hydrogen binding and reload.
An existing completed hydrogen snapshot remains complete after the new sequence.
Phone portrait 390×844 and landscape 844×390 are inspected. No browser errors or
warnings are reported. Gluon portrait clipping was corrected before deployment.

## Signed artifact

Build log: `/private/tmp/MachinesParticles20261013-build.log` reports
`BUILD SUCCEEDED`. Final app:
`/private/tmp/MachinesParticles20261013DerivedData/Build/Products/Debug-iphoneos/MachinesMouseLab.app`.

Generated and signed-app `Web/machines.js` SHA-256 match:
`ab40574236f714b71cdbdf678021b0210f0d662b4b48d63cc3b0576a3eb4555c`.
The app bundles the final source and excludes constituent WAV assets.

## Physical iPhone

Paired iPhone 16e; bundle `com.machines.mouse.lab`. The first installation lost
the remote connection (CoreDevice 3002 / IXRemoteErrorDomain 6). Retrying the same
package succeeded with `App installed` and the expected bundle identifier.

Process launch returned CoreDevice 10002 with an explicit `Locked` rejection.
The app is installed; observed launch is pending device unlock. Retry launch
without rebuilding or reinstalling. Physical appearance, touch, haptic quality,
frame time, thermal behavior and creator acceptance remain separate evidence.
