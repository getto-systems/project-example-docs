const { GitHub } = require('@actions/github');
const fs = require('fs');
const path = require('path');

(async function run() {
  try {
    const github = new GitHub(process.env.GITHUB_TOKEN);

    const version = fs.readFileSync(path.join(__dirname, "../.release-version"));

    const uploadUrl = `https://github.com/repos/getto-systems/project-example-docs/releases/${version}/assets`;
    const assetPath = path.join(__dirname, "../build.tar.gz");
    const assetName = "docs.tar.gz";

    const contentLength = filePath => fs.statSync(filePath).size;

    const headers = {
      'content-type': "application/gzip",
      'content-length': contentLength(assetPath),
    };

    await github.repos.uploadReleaseAsset({
      url: uploadUrl,
      headers,
      name: assetName,
      file: fs.readFileSync(assetPath)
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
