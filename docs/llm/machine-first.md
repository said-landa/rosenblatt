# Machine-First Investigation — Engineering State

> [Human counterpart](../human/machine-first.md) · [Decision 0011](../decisions/0011-machine-first-investigation-and-code-collaboration.md)

## Accepted direction and bounded implementation

The 2026-10-26 request supersedes mandatory foundation-first sequencing in
0008/0010 for the next experience. Begin with a complete functional Machine,
investigate downward by explanatory need, and retain reconstruction where useful.
The creator wants to participate directly in code and choose a different Machine
from the mouse through focused questions. Do not silently choose one or create
a whole Course around an assistant suggestion.

The concrete authored behavior is a brief introduction on cold launch, followed
by the regular interface without replay on background return. The 2026-10-28
feedback requests a slower exit, extending the earlier two-to-three-second
budget to a reviewable target of about 3.5 seconds. On 2026-10-27 the creator specifies pure black, elegant white lettering
and fade, and clarifies that only the name is wanted, without a rose emblem.
`RosenblattWordmark` uses the system serif face, regular weight, a 40-point
Dynamic Type-relative base size, 1.4-point tracking, and horizontal clearance.
No downloaded font, floral asset, audio, analytics, persistence key or dependency
is introduced. Physical implementation acceptance remains open.

Implementation is in `MachinesMousePreviewApp.swift`, shared by the retained
native targets. The overlay is Lab-only. App-owned `@State` starts visible once;
WebView creation runs behind it. The wordmark fades in over 0.5 seconds. A
cancellable parent task waits 1.9 seconds from appearance before a 1.6-second
ease-in-out exit fades into the app. The overlay remains mounted with explicit
`introOpacity` state until SwiftUI animation completion clears the App-owned
visible flag. Input and accessibility stay excluded until completion. This
replaces removal-driven transition timing. `RosenblattOpeningTiming` owns the
3.5-second normal total, entrance, exit and separate Reduced Motion duration.
Reduced Motion holds static lettering for 2.5 seconds and dismisses without
animation. The Lab launch-screen color asset is pure black as well. Scene phase does not restart the task. The web
content cannot receive touches or accessibility focus while covered. Navigation
is hidden during the introduction. Native failure UI takes precedence if loading
fails. Reloading the WebView does not reset the App-owned flag.

The system-managed launch screen is separate. The selected treatment controls
the in-app introduction only. Real cold-start latency adds OS launch time; no
measured promise of exactly 3.5 seconds from icon tap is made. Background
suspension can defer task delivery; resuming does not create a second intro.

## Authorship loop and depth criterion

Keep one consequential choice active. First select an exact Machine/variant;
then select an observable function the learner should explain. Propose one
complete-system interaction and one causal subsystem transition before
expanding. Target learner, copy, mechanism-specific gestures, depth, navigation
and quality acceptance remain creator-owned and unresolved.

Descend when a deeper relationship is necessary to explain the selected output,
predict a meaningful change or correct a misleading model. Stop at an explicit
boundary when the deeper layer does not serve that objective. That criterion is
an authoring proposal to refine through the selected Machine, not a validated
universal pedagogy. Reuse supported science and shared investigations without
forcing every learner through the entire constituent graph.

The creator selected small walkthroughs followed by their own edits. Explain
which function/state controls the behavior, propose one bounded edit, then leave
that edit for the creator. Continue independent enabling engineering without
requiring routine supervision. Do not keep asking for this working preference.

The first domain is electronics. The earlier hand-cranked flashlight suggestion
is withdrawn as the active recommendation. Mechanical-first introductions such
as locks or bicycles do not match this opening preference. Do not infer that
analog electronics is excluded: sensing, analog signals and digital computation
remain candidates. Narrow the observable behavior before choosing an exact
device/variant. No replacement scene or Course is authorized by this domain
selection alone.

## Compatibility and delivery

Lab 1.0 (8), the slower-fade revision, was archived and uploaded on 2026-10-28
without browser use. Build 7 remains preserved. Apple processing started; tester
availability and installation remain unverified.
The packaged learning content remains Assembly Journey pending Machine selection.
Retain `com.machines.mouse.preview`, existing progress, historical source and
release archives. Three.js remains a contained renderer beneath project-owned
state/camera/behavior contracts, under 0003. Normal delivery remains TestFlight.
[0012](../decisions/0012-standing-github-and-testflight-delivery.md) grants standing
authorization for meaningful GitHub commit/push and app TestFlight delivery.
Use command-line release tools without browser interaction; no fresh reminder
is needed.

## Verification

See current status for completed checks. Build success supports compilation only;
it does not establish physical intro timing, visual acceptance, cold/warm
lifecycle behavior, VoiceOver usability or learning quality. Review those through
the next creator-operated TestFlight delivery.
