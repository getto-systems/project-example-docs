import { config } from "./config";

const path = location.pathname.replace(".html", ".js");

const script = document.createElement("script");
script.src = `//${config.secure_server}${path}`;
document.body.appendChild(script);
