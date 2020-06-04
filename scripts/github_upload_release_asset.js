const { getOctokit } = require('@actions/github');
const fs = require('fs');
const path = require('path');

(async function run() {
  try {
    const github = getOctokit(process.env.GITHUB_RELEASE_TOKEN);

    const version = `${fs.readFileSync(path.join(__dirname, "../.release-version"))}`.trim();

    const uploadUrl = `https://api.github.com/repos/getto-systems/project-example-docs/releases/${version}/assets`;
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
