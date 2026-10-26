#!/bin/zsh
set -euo pipefail
# Historical development helper. Routine delivery is through TestFlight (0009).
if [[ "${ROSENBLATT_DEVELOPMENT_INSTALL:-}" != explicitly-authorized ]]; then
  print -u2 'Use scripts/testflight-lab.sh for Rosenblatt releases. Direct development installation requires a new explicit creator request.'
  exit 2
fi
prototype_root="${0:A:h:h}"
if [[ $# -ne 2 ]]; then
  print -u2 'Usage: ./scripts/run-ipad-lab.sh <iPad UDID> <Apple development team ID>'
  exit 2
fi
ipad_udid="$1"
development_team="$2"
derived_data="/private/tmp/MachinesMouseLabDerivedData"
cd "$prototype_root"
npm run lab:check
npm run lab:build:ios
xcodebuild -project iOS/MachinesMouseLab.xcodeproj \
  -scheme MachinesMouseLab -configuration Debug \
  -destination "id=$ipad_udid" -derivedDataPath "$derived_data" \
  "DEVELOPMENT_TEAM=$development_team" \
  -allowProvisioningUpdates -allowProvisioningDeviceRegistration build
xcrun devicectl device install app --device "$ipad_udid" \
  "$derived_data/Build/Products/Debug-iphoneos/MachinesMouseLab.app"
xcrun devicectl device process launch --device "$ipad_udid" \
  --terminate-existing com.machines.mouse.preview
