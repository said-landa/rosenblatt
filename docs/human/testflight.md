# Upload Rosenblatt to TestFlight Yourself

> [Detailed release contract](../llm/testflight.md)

Meaningful app changes now include GitHub commit/push and command-line TestFlight
delivery by default, under your [standing instruction](../decisions/0012-standing-github-and-testflight-delivery.md).
You do not need to remind the LLM to deliver each revision. The LLM uses the
script below without browser interaction; the manual UI steps are available
for your own use. Upload, Apple processing and availability remain distinct.

Use `Prototypes/MachinesMouseThree/iOS/MachinesMouseLab.xcodeproj` and the
`MachinesMouseLab` scheme. The retained app is Rosenblatt with bundle identifier
`com.machines.mouse.preview`. The source filename containing “Preview” is shared
native code; it is not a reason to select the older Preview project.

1. Open the Lab project in Xcode. In Xcode Settings → Accounts, sign in with an
   Apple Developer account authorized for this app. Confirm the target's signing
   team and automatic signing.
2. In the Lab target's General tab, set a build number unused in App Store Connect.
   Use a new build number for each archive; builds 7 and 8 have already been
   uploaded. Build 8 contains the slower-fade revision.
   Keep the version at 1.0 unless deliberately preparing another version.
3. In Terminal, preserve an archive and source snapshot using the existing script:

   ```sh
   cd /Users/cristosaidsalaslandaverde/Documents/rosenblatt/Prototypes/MachinesMouseThree
   npm ci
   ./scripts/testflight-lab.sh archive
   ```

   It checks the JavaScript, runs the web tests, bundles offline resources through
   the Xcode build phase, signs and archives. It keeps artifacts under
   `iOS/build-releases/Rosenblatt-<version>-<build>`. If that build already has an
   archive, use a new build number instead of overwriting it.
4. Upload the same archive:

   ```sh
   ./scripts/testflight-lab.sh upload
   ```

   Alternatively open `/private/tmp/Rosenblatt-<version>-<build>/Rosenblatt.xcarchive`
   in Xcode, then Organizer → Distribute App → App Store Connect → Upload.
   Keep the matching build number; this alternative uploads the existing archive.
5. In App Store Connect → Rosenblatt → TestFlight, wait for processing to finish.
   Resolve any export-compliance questions according to the actual app. Open the
   internal group **Insiders**, add the build if it was not added automatically,
   and enter concise “What to Test” notes. Upload success alone is not availability.
6. On your iPhone, open TestFlight → Rosenblatt → Update. Check the version/build
   and test the change on the phone. Keep the archive and source for rollback.

The Xcode-only archive route is: select a generic iOS device destination, then
Product → Archive. It runs the same web build phase. Before using that route,
run `npm ci`, `npm run lab:check`, and `npm test`; retain the exact source revision
and archive. The script route above automates source/archive preservation.

Internal testing and public App Store publication are separate. External testers
may need TestFlight beta review. TestFlight builds expire after 90 days.

Apple references checked 2026-10-26: [Upload builds](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/),
[internal testing](https://developer.apple.com/help/app-store-connect/test-a-beta-version/add-internal-testers/),
[TestFlight overview](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/).
