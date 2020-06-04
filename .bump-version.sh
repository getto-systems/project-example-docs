bump_build
bump_sync package.json 's|"version":.*|"version": "'$(cat .release-version)'"|'
