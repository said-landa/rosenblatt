# 0012 — Standing GitHub and TestFlight Delivery

- Status: Accepted
- Date: 2026-10-28
- Decided by: Creator
- Refines: 0009 and 0011; preserves 0002 and 0003

## Decision

The creator grants standing authorization to commit and push meaningful
Rosenblatt changes to GitHub and deliver meaningful app changes through the
retained TestFlight identity. Complete both destinations as part of each
meaningful app revision, without waiting for another reminder or permission.
Use the command-line release workflow; do not open or operate the browser for
TestFlight delivery. Preserve source, signed archives and release evidence.

This replaces the previous session-only Git authorization in 0011 and the
requirement for a fresh commit/push request in 0009 and AGENTS.md. It does not
transfer authorship of unchosen Machine/Course behavior or authorize public
App Store submission. An explicit later instruction to hold a commit, push or
upload takes precedence for its stated scope.

## Why now

The creator explicitly requests both destinations “always” for meaningful
changes and asks that this preference be remembered. The slower-fade build 8
has already uploaded successfully, while its source changes remain uncommitted.
Future collaborators must recover the delivery expectation from project state.

## Alternatives considered

- Ask for GitHub/TestFlight permission on each revision: superseded by the
  creator's standing authorization.
- Keep working app revisions only locally: does not satisfy the requested loop.
- Re-upload an unchanged app merely to repeat a successful operation: unnecessary;
  preserve the verified upload and build identity instead.

## Working contract and consequences

1. Finish and verify one meaningful, authorized change; preserve unrelated work.
2. Commit the coherent source/evidence/docs with a descriptive conventional
   message and push to the configured Rosenblatt GitHub remote.
3. For a meaningful app revision, use a new build number, archive, verify identity
   and source, upload via the existing command-line script, and retain artifacts.
4. Report GitHub commit/push and TestFlight upload separately. Apple processing,
   tester availability, installation and physical acceptance are separate claims.
5. If an external operation fails, preserve progress, fix routine issues within
   scope, and report the actual remaining blocker. Do not silently call it done.

Documentation-only changes are committed/pushed without duplicating an unchanged
app binary. For build 8, the completed upload already satisfies TestFlight delivery;
commit/push its preserved source plus this standing contract now. No new binary
change or repeated upload is required for the policy record itself.

Update AGENTS.md, collaboration contracts, delivery guidance, current state and
the explicit requested memory note. Keep signing/account artifacts out of Git.

## Evidence and uncertainty

The user explicitly authorizes this workflow. Build 8 verification and upload
logs confirm successful upload and the start of Apple processing. They do not
establish processing completion, tester availability or device installation.
Standing authorization is not a promise that external services cannot fail.

## Reversibility and next action

The creator can revise this policy at any time. Preserve recoverable Git history
and versioned release artifacts. Next: push the existing opening changes and
record the verified GitHub result, then continue the usual app feedback cycle.

## Result — 2026-10-28

Commit `99fffd3eabd133ba573750a78212a8892c3554f1` contains the slower opening,
release evidence and this standing delivery contract. Push to `origin/main`
succeeded and the remote head was verified. Build 8's current app input files
match its preserved source snapshot and successful upload record. The requested
persistent memory note is saved. This result update changes documentation only;
no duplicate TestFlight binary is uploaded.
