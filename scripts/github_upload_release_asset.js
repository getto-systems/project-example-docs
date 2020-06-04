const { getOctokit } = require('@actions/github');
const fs = require('fs');
const path = require('path');

(async function run() {
  try {
    const github = getOctokit(process.env.GITHUB_RELEASE_TOKEN);

    const version = `${fs.readFileSync(path.join(__dirname, "../.release-version"))}`.trim();

    const release = await github.repos.createRelease({
      owner: "getto-systems",
      repo: "project-example-docs",
      tag_name: version,
    });

    const assetPath = path.join(__dirname, "../build.tar.gz");

    const contentLength = filePath => fs.statSync(filePath).size;

    const headers = {
      'content-type': "application/gzip",
      'content-length': contentLength(assetPath),
    };

    await github.repos.uploadReleaseAsset({
      url: release.data.upload_url({
        name: "docs.tar.gz",
      }),
      headers,
      file: fs.readFileSync(assetPath)
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
