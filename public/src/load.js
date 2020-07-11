import { config } from "./config";

const path = location.pathname.replace(".html", ".js");

window.GETTO_EXAMPLE_CREDENTIAL = {
  roles: ["development"],
};

const script = document.createElement("script");
script.src = `//${config.secure_server}${path}`;
document.body.appendChild(script);
