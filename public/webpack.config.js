const fs = require("fs");
const path = require("path");

module.exports = {
  entry: { load: path.join(__dirname, "src/load") },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  devServer: devServer(),
};

function devServer() {
  if (!process.env.WEBPACK_DEV_SERVER) {
    return {};
  }

  return {
    contentBase: path.join(__dirname, "dist"),

    host: "0.0.0.0",
    port: process.env.PUBLIC_APP_PORT,
    disableHostCheck: true,

    https: true,
    cert: fs.readFileSync(process.env.TLS_CERT),
    key: fs.readFileSync(process.env.TLS_KEY),

    hot: true,
    sockPort: `${process.env.LABO_PORT_PREFIX}${process.env.PUBLIC_PORT}`,
  };
}
