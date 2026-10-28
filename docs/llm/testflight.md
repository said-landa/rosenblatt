# Creator-Operated TestFlight Delivery

> [Human procedure](../human/testflight.md) · Governing decision: 0009

## Standing delivery authorization — 2026-10-28

[0012](../decisions/0012-standing-github-and-testflight-delivery.md) requires
GitHub commit/push and retained-identity TestFlight upload after meaningful
authorized app changes. This is continuing permission, not a one-turn exception.
Use the existing CLI without browser interaction. Verify before delivery and
preserve source/archive/log evidence. Push documentation-only changes to GitHub
without duplicating an unchanged binary. Build 8 already uploaded successfully;
this cycle closes its source-control delivery and records the standing rule.

## Owning implementation

- Project: `Prototypes/MachinesMouseThree/iOS/MachinesMouseLab.xcodeproj`.
- Scheme: `MachinesMouseLab`; archive configuration: Release.
- Retained bundle: `com.machines.mouse.preview`; name: Rosenblatt.
- Native mode: `RosenblattLabExperience=true` in the Lab Info.plist.
- Current packaging entry: `Experiments/AssemblyJourney/Source` through
  `scripts/build-ios-lab-web.mjs`; Three.js and app resources are offline.
- Distribution options: `iOS/Distribution/TestFlightExportOptions.plist`.
- Script: `scripts/testflight-lab.sh archive|upload`.

`archive` derives version/build from the project, rejects an existing archive,
checks source, runs web tests, preserves pinned source inputs, signs outside the
synced source tree and retains a compressed archive. `upload` restores that
archive from the retained copy if needed, verifies bundle/name/Lab flag and
exports with the existing App Store Connect settings. It requires a valid local
Xcode signing/account session and network access. Credentials stay outside Git.

Rosenblatt 1.0 (7) was successfully archived and uploaded on 2026-10-28 through
the existing script, with no browser use as explicitly required by the creator.
Apple processing started; completion, group assignment and installation remain
unverified. Future archives require a new build number. Source/archive snapshots
and verification metadata are preserved. See the
[release record](../../Prototypes/MachinesMouseThree/Experiments/AssemblyJourney/Evidence/release-20261028.md).

Build 8 followed through the same command-line flow on 2026-10-28, increasing
the opening's exit fade to 1.6 seconds and preserving the overlay until animation
completion. Signed archive, signature and source verification passed; upload and
export succeeded, with Apple processing started and tester availability unverified.
[Build 8 evidence](../../Prototypes/MachinesMouseThree/Experiments/AssemblyJourney/Evidence/release-20261028-build8.md)
retains the current result; the build 7 paragraph above is historical.

## Release evidence and limits

Record source commit, version/build, check results, archive identity, upload
result, Apple processing, group availability, device installation and physical
acceptance separately. A GitHub push transfers source, not an app update.
Retain archives/source under the existing ignored `iOS/build-releases` path;
never put signing secrets or account-bearing screenshots into the repository.

The human guide gives both the script and Organizer route. The script preserves
source snapshots automatically; an Xcode-only archive does not. Rebuilds require
new build numbers. After an upload, adding a processed build to the internal
group is separate unless automatic distribution is configured. External testing
and public publication have their own review paths.

Official Apple upload/internal-testing guidance was checked on 2026-10-26; links
are in the human guide. Account-specific signing readiness, current ASC state
and labels on the creator's installed Xcode were not verified by reading docs.

## Browser restriction for the 2026-10-28 delivery

The creator specifically prohibited browser use for this upload. The entire
archive/upload and local verification used command-line tools. No connected
App Store Connect API capability was available in the tool catalog, and no
account API configuration was assumed or created. Xcode's authenticated upload
completed normally. Its report that processing started does not establish
completion or internal tester availability; preserve that distinction.
