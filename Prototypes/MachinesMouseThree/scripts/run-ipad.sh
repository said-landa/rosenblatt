#!/bin/zsh
set -euo pipefail
prototype_root="${0:A:h:h}"
if [[ $# -ne 2 ]]; then
  print -u2 'Usage: ./scripts/run-ipad.sh <iPad UDID> <Apple development team ID>'
  exit 2
fi
ipad_udid="$1"
development_team="$2"
derived_data="/private/tmp/MachinesMousePreviewDerivedData"
cd "$prototype_root"
npm run check
npm run build:ios
xcodebuild -project iOS/MachinesMousePreview.xcodeproj \
  -scheme MachinesMousePreview -configuration Debug \
  -destination "id=$ipad_udid" -derivedDataPath "$derived_data" \
  "DEVELOPMENT_TEAM=$development_team" \
  -allowProvisioningUpdates -allowProvisioningDeviceRegistration build
xcrun devicectl device install app --device "$ipad_udid" \
  "$derived_data/Build/Products/Debug-iphoneos/MachinesMousePreview.app"
xcrun devicectl device process launch --device "$ipad_udid" \
  --terminate-existing com.machines.mouse.preview
