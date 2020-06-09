const fs = require("fs");
const path = require("path");

const config = {
  secure_server: process.env.SECURE_SERVER,
};
const data = "export const config = " + JSON.stringify(config, null, "  ");

fs.writeFileSync(path.join(__dirname, "src/config.js"), data);
