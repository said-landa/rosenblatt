#!/bin/zsh
set -euo pipefail
prototype_root="${0:A:h:h}"
cd "$prototype_root"
project_file='iOS/MachinesMouseLab.xcodeproj/project.pbxproj'
release_version=$(sed -nE 's/^[[:space:]]*MARKETING_VERSION = ([^;]+);/\1/p' "$project_file" | head -1)
release_build=$(sed -nE 's/^[[:space:]]*CURRENT_PROJECT_VERSION = ([^;]+);/\1/p' "$project_file" | head -1)
artifact_root="${ROSENBLATT_TESTFLIGHT_ARTIFACT_ROOT:-$prototype_root/iOS/build-releases/Rosenblatt-$release_version-$release_build}"
build_root="/private/tmp/Rosenblatt-$release_version-$release_build"
archive_path="$build_root/Rosenblatt.xcarchive"
case "${1:-archive}" in
  archive)
    [[ ! -e "$archive_path" && ! -e "$artifact_root/Rosenblatt.xcarchive.tar.gz" ]] || { print -u2 'This build already has an archive. Increment its build number before archiving again.'; exit 2; }
    mkdir -p "$artifact_root" "$build_root"
    npm run lab:check
    npm test
    tar -czf "$artifact_root/Source.tar.gz" Experiments/Constituents/Source Experiments/AssemblyJourney/Source tests \
      iOS/MachinesMouseLab.xcodeproj iOS/MachinesMouseLab/Info.plist iOS/MachinesMouseLab/Assets.xcassets \
      iOS/MachinesMousePreview scripts/build-ios-lab-web.mjs \
      scripts/testflight-lab.sh iOS/Distribution package.json package-lock.json
    xcodebuild -project iOS/MachinesMouseLab.xcodeproj -scheme MachinesMouseLab \
      -configuration Release -destination 'generic/platform=iOS' \
      -archivePath "$archive_path" -derivedDataPath "$build_root/DerivedData" \
      -allowProvisioningUpdates archive
    COPYFILE_DISABLE=1 tar -czf "$artifact_root/Rosenblatt.xcarchive.tar.gz" -C "$build_root" Rosenblatt.xcarchive
    ;;
  upload)
    if [[ ! -d "$archive_path" && -f "$artifact_root/Rosenblatt.xcarchive.tar.gz" ]]; then
      mkdir -p "$build_root"
      tar -xzf "$artifact_root/Rosenblatt.xcarchive.tar.gz" -C "$build_root"
    fi
    [[ -d "$archive_path" ]] || { print -u2 'Archive Rosenblatt Lab before uploading.'; exit 2; }
    archived_bundle=$(/usr/libexec/PlistBuddy -c 'Print :ApplicationProperties:CFBundleIdentifier' "$archive_path/Info.plist")
    [[ "$archived_bundle" == 'com.machines.mouse.preview' ]] || { print -u2 'Archive does not match the verified Rosenblatt App Store Connect identity.'; exit 2; }
    app_plist="$archive_path/Products/Applications/MachinesMouseLab.app/Info.plist"
    archived_lab=$(/usr/libexec/PlistBuddy -c 'Print :RosenblattLabExperience' "$app_plist")
    archived_name=$(/usr/libexec/PlistBuddy -c 'Print :CFBundleDisplayName' "$app_plist")
    [[ "$archived_lab" == true && "$archived_name" == Rosenblatt ]] || { print -u2 'Archive must contain the Rosenblatt Lab experience.'; exit 2; }
    xcodebuild -exportArchive -archivePath "$archive_path" \
      -exportOptionsPlist iOS/Distribution/TestFlightExportOptions.plist \
      -exportPath "$build_root/Upload" -allowProvisioningUpdates
    ;;
  *) print -u2 'Usage: scripts/testflight-lab.sh [archive|upload]'; exit 2 ;;
esac
