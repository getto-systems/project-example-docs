const fs = require("fs");
const path = require("path");

const root = "doc"

module.exports = {
  entry: () => {
    const entry = {};

    entry[`${root}/index`] = path.join(__dirname, `src/${root}/index`);

    return entry;
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),

    host: "0.0.0.0",
    port: process.env.SECURE_APP_PORT,
    disableHostCheck: true,

    https: true,
    cert: fs.readFileSync(process.env.TLS_CERT),
    key: fs.readFileSync(process.env.TLS_KEY),

    hot: true,
    sockPort: `${process.env.LABO_PORT_PREFIX}${process.env.SECURE_PORT}`,
  },
};
