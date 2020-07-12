const fs = require("fs");
const path = require("path");

const root = "docs"

module.exports = {
  entry: () => {
    const entry = {};

    entry[`${root}/index`]  = path.join(__dirname, `src/${root}/index.ts`);
    entry[`${root}/server`] = path.join(__dirname, `src/${root}/server.ts`);
    entry[`${root}/id`]     = path.join(__dirname, `src/${root}/id.ts`);

    entry[`${root}/detail/server`] = path.join(__dirname, `src/${root}/detail/server.ts`);
    entry[`${root}/detail/id`]     = path.join(__dirname, `src/${root}/detail/id.ts`);

    return entry;
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
    ],
  },
  devServer: devServer(),
};

function devServer() {
  if (!process.env.WEBPACK_DEV_SERVER) {
    return {};
  }

  return {
    contentBase: path.join(__dirname),
    publicPath: "/dist/",

    host: "0.0.0.0",
    port: process.env.SECURE_APP_PORT,
    disableHostCheck: true,

    https: true,
    cert: fs.readFileSync(process.env.TLS_CERT),
    key: fs.readFileSync(process.env.TLS_KEY),

    hot: true,
    sockPort: `${process.env.LABO_PORT_PREFIX}${process.env.SECURE_PORT}`,
  };
}
