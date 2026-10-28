# 0009 — Rosenblatt and One TestFlight Delivery Identity

- Status: Accepted; build 1.0 (4) delivered through TestFlight; duplicate retired
- Date: 2026-10-19
- Decided by: Creator
- Refines: 0006 and 0008; preserves the engine boundary in 0003

## Decision

The project and app are now named Rosenblatt. Continue the Lab experience as
one app through TestFlight and retain that identity for eventual public release.
The creator authorizes retiring the duplicate installed app after the retained
app is ready. Eventual public release does not authorize App Store submission now.

## Why now

The creator reports confusing stable/Lab apps and missing recent changes.
Live App Store Connect inspection identifies Rosenblatt, Apple ID 6816994687,
with bundle ID `com.machines.mouse.preview` and SKU `machines-mouse-preview`.
The recent constituent archives instead used `com.machines.mouse.lab`.
Both identities are installed on the paired iPhone. The record name alone did
not establish which bundle received the changes.

## Alternatives considered

- Keep two installed apps: contradicts the requested simple single-app workflow.
- Create another App Store Connect app: would discard the existing Rosenblatt
  identity and its distribution history.
- Retain the existing Rosenblatt identity and package the Lab experience into it:
  selected; the Xcode Lab target remains the build entry.

## Consequences

- The Lab target delivers to the verified `com.machines.mouse.preview` identity.
  `RosenblattLabExperience` in its own Info.plist selects the Lab native behavior;
  experience selection no longer depends only on a `.lab` bundle suffix.
- The visible app/browser/opening name becomes Rosenblatt. Existing Machines
  source paths, modules, bundle identifiers, storage keys and historical records
  remain compatibility identifiers; no broad code or saved-data rename is implied.
- New versions go through TestFlight. Direct development installation requires
  a later explicit request. Preserve versioned archives and source snapshots;
  [0012](0012-standing-github-and-testflight-delivery.md) now supplies standing
  authorization to commit/push meaningful changes and deliver meaningful app
  revisions through command-line TestFlight without browser use.
- The old stable content is replaced in place by the Lab experience in Rosenblatt.
  Retire the separate `.lab` installation only after the retained delivery is
  usable, preserving its local data first. Do not delete source or ASC records.
- Existing `.lab` app data belongs to another sandbox. It is not automatically
  merged into the retained Rosenblatt sandbox. Preserve backup and report this
  boundary before claiming that device progress migrated.

## Evidence and uncertainty

Apple permits switching between available TestFlight builds, but each build is
usable for up to 90 days. This is a testing window, not permanent source version
control. Keep older eligible builds available and preserve local source/archive
snapshots for later reissue with a new build number.
[Apple TestFlight overview](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/)
was checked on 2026-10-19.

Local compilation, upload, Apple processing, tester availability, device install
and visible launch are separate claims. The experiment evidence records their
actual status. Current lesson quality and physical performance remain unaccepted.

## Reversibility and next action

Preserve prior source and archives. Verify the Lab archive's bundle ID and
contents, upload to Rosenblatt, then verify TestFlight processing and tester
availability. Confirm the retained app is usable before retiring the duplicate.
Revisit if App Store identity or data requirements conflict with this plan.

## Result — 2026-10-19

Rosenblatt 1.0 (4) is uploaded, processed and Testing in the existing Insiders
group alongside 1.0 (1). The archive's bundle/name/native Lab flag and packaged
HTML/CSS/JS were verified. The separate `.lab` container Library was backed up,
then that duplicate was uninstalled. Device inspection confirms the retained
`com.machines.mouse.preview` app remains and the duplicate is absent. The retained
phone app still reports 1.0 (1); install 1.0 (4) through the opened TestFlight app.
No development install or public App Store submission was performed. Evidence
and release notes are recorded with the Constituent Lab.
