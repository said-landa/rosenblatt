# Machine-First Investigation — Engineering State

> [Human counterpart](../human/machine-first.md) · [Decision 0011](../decisions/0011-machine-first-investigation-and-code-collaboration.md)

## Accepted direction and bounded implementation

The 2026-10-26 request supersedes mandatory foundation-first sequencing in
0008/0010 for the next experience. Begin with a complete functional Machine,
investigate downward by explanatory need, and retain reconstruction where useful.
The creator wants to participate directly in code and choose a different Machine
from the mouse through focused questions. Do not silently choose one or create
a whole Course around an assistant suggestion.

The concrete authored behavior in scope is a two-to-three-second introduction on
cold launch, followed by the regular interface, without replay on background
return. Initial visual choice: a centered wordmark against #080d13; no new asset,
audio, analytics, persistence key or dependency. The creator approved the quiet
wordmark/fade in the follow-up; physical implementation acceptance remains open.

Implementation is in `MachinesMousePreviewApp.swift`, shared by the retained
native targets. The overlay is Lab-only. App-owned `@State` starts visible once;
WebView creation runs behind it. A cancellable async task holds for 2.15 seconds
and an ease-out transition takes 0.35 seconds. Reduced Motion holds 2.5 seconds
and dismisses without animation. Scene phase does not restart the task. The web
content cannot receive touches or accessibility focus while covered. Navigation
is hidden during the introduction. Native failure UI takes precedence if loading
fails. Reloading the WebView does not reset the App-owned flag.

The system-managed launch screen is separate. The selected treatment controls
the in-app introduction only. Real cold-start latency adds OS launch time; no
measured promise of exactly 2.5 seconds from icon tap is made. Background
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

Lab candidate is 1.0 (7); no archive/upload has been run for this revision.
The packaged learning content remains Assembly Journey pending Machine selection.
Retain `com.machines.mouse.preview`, existing progress, historical source and
release archives. Three.js remains a contained renderer beneath project-owned
state/camera/behavior contracts, under 0003. Normal delivery remains TestFlight.
GitHub commit/push is explicitly authorized for this session, not future sessions.

## Verification

See current status for completed checks. Build success supports compilation only;
it does not establish physical intro timing, visual acceptance, cold/warm
lifecycle behavior, VoiceOver usability or learning quality. Review those through
the next creator-operated TestFlight delivery.
