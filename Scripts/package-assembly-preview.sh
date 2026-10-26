#!/bin/sh

set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
repository_root=$(dirname "$script_dir")
build_dir="$repository_root/.build"
app_dir="$build_dir/MachinesAssemblyPreview.app"
executable="$build_dir/debug/MachinesAssemblyPreview"
module_cache="$build_dir/module-cache"

cd "$repository_root"
CLANG_MODULE_CACHE_PATH="$module_cache" \
SWIFTPM_MODULECACHE_OVERRIDE="$module_cache" \
swift build --disable-sandbox --product MachinesAssemblyPreview

mkdir -p "$app_dir/Contents/MacOS"
cp "$executable" "$app_dir/Contents/MacOS/MachinesAssemblyPreview"
cp "$repository_root/Support/MachinesAssemblyPreview-Info.plist" "$app_dir/Contents/Info.plist"

printf '%s\n' "$app_dir"
