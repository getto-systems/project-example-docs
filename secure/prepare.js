const fs = require("fs");
const path = require("path");

const config = {
  isProduction: false,
  version: "dist",
};
const data = "export const config = " + JSON.stringify(config, null, "  ");

console.log(data);

fs.writeFileSync(path.join(__dirname, "./src/config.js"), data);
