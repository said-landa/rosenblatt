# Creator-Operated TestFlight Delivery

> [Human procedure](../human/testflight.md) · Governing decision: 0009

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

Current candidate is 1.0 (7), not a verified unused Apple build number. Check ASC
before release. This cycle builds for validation only; no archive, upload,
physical installation or public submission is implied. Earlier build 6 upload is
historical evidence; processing and current device build were not rechecked.

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
