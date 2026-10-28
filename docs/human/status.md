# Current Project Position

> [Engineering state and history](../llm/status.md)

## Standing delivery instruction — 2026-10-28

Meaningful app changes include GitHub commit/push and command-line TestFlight
delivery automatically; no reminder is needed. The browser stays unused for
release delivery. [0012](../decisions/0012-standing-github-and-testflight-delivery.md)
records your standing authorization. Build 8 already satisfies the upload step;
the source and saved delivery rule are pushed to GitHub as `99fffd3`.

## Slower opening fade — 2026-10-28

Following your report of a harsh disappearance, the exit fade now lasts **1.6
seconds** instead of 0.6. The opening stays mounted until the animation finishes.
The white serif lettering, black background and entrance are unchanged; the
normal opening is now about 3.5 seconds in total. Reduced Motion retains a static
2.5-second opening. Physical feel still needs your review.

**Rosenblatt 1.0 (8) uploaded successfully through the command-line release
script. No browser was used.** Apple processing started. Processing completion,
Insiders availability and phone installation remain unverified. All 37 release
checks, signed archive, signature, identity and source-snapshot verification pass.
Build 7 and its source/archive are preserved. No direct installation, public
submission was performed. Its source is committed and pushed as `99fffd3`
with the standing delivery instruction.

[Build 8 evidence](../../Prototypes/MachinesMouseThree/Experiments/AssemblyJourney/Evidence/release-20261028-build8.md)
records the change and limits. Next: update through TestFlight when available
and review the fade, warm return and Reduced Motion on iPhone.

## Product and collaboration direction

Start with a complete electronic Machine and investigate downward only as deeply
as needed to explain its function. The exact device is still open; selecting it
is deferred while we refine the opening. The existing Assembly Journey remains
the packaged learning content. Earlier mouse, constituent, circuit and native
padlock studies remain recoverable. Three.js remains the Lab renderer.

Your code workflow is a small walkthrough followed by your edit. Timing lives in
`RosenblattOpeningTiming`; typography lives in `RosenblattWordmark`.
[Decision 0011](../decisions/0011-machine-first-investigation-and-code-collaboration.md)
and the [machine-first brief](machine-first.md) retain the agreed direction.

[Code map](code-map.md) · [TestFlight procedure](testflight.md).
