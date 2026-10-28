# Rosenblatt 1.0 (8) — Gentler Opening Fade

Date: 2026-10-28. The creator asks to focus on the opening fading more slowly
instead of disappearing harshly. This continues the authorized command-line
TestFlight feedback cycle, preserving build 7 and its source/archive. Browser
use remains prohibited and none was used.

## Bounded change

The exit fade increases from 0.6 to 1.6 seconds with ease-in-out timing. Its
start remains 1.9 seconds after the native opening appears, extending the normal
opening from about 2.5 to 3.5 seconds. The 0.5-second entrance, white serif
wordmark and pure black background are unchanged. Reduced Motion retains its
separate static 2.5-second path; an enabled setting deliberately skips animation.

The overlay now animates explicit opacity while remaining mounted. SwiftUI's
animation completion dismisses it only after the fade has finished. Input and
accessibility remain excluded until completion. The earlier removal transition
no longer governs its lifetime. This addresses a possible abrupt-removal seam;
source inspection alone does not reproduce or diagnose the creator's device.

No course content, camera, persistence, audio or electronic Machine is changed.
Physical feel and creator acceptance remain to be reviewed on the phone.

## Validation and preservation

- Release script syntax checks and all 37 web tests pass.
- Signed generic-iOS Release archive succeeds.
- Signature, Rosenblatt name, retained bundle, Lab flag, version 1.0/build 8,
  launch color and offline resources are verified.
- Release-input files match Source.tar.gz exactly. Source/archive hashes and
  verification metadata are retained in the ignored versioned artifact folder.
- Swift compilation verifies the animation-completion API, not visible timing
  or device acceptance. No new tests mirror the visual constants.

Source base: `d28b115` plus the preserved uncommitted opening/refinement work.
Artifacts: `iOS/build-releases/Rosenblatt-1.0-8`, including Source.tar.gz,
Rosenblatt.xcarchive.tar.gz, archive.log, upload.log and verification.json.
No development installation, public App Store submission or Git commit/push.

## Upload state

The existing `scripts/testflight-lab.sh upload` command exits successfully.
Xcode reports upload and export success at 15:47:30 UTC
(09:47:30 America/Mexico_City), with Apple processing started.
Processing completion, tester availability and phone installation are unverified.
No browser was opened or used; no tester-group policy or release notes were
changed remotely.

## Next review

Update through TestFlight when available. Compare the exit transition with build
7 on a cold launch; check that it finishes smoothly and that returning from the
background does not restart the opening. Check Reduced Motion separately. The
[prepared notes](testflight-notes-20261028-build8.txt) are local, not published.
