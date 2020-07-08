import { config } from "./config";

const path = location.pathname.replace(".html", ".js");

/*
 * TODO 開発用の詳細ドキュメントが必要になったら role を参照してメニューを調整しよう
window.GETTO_EXAMPLE_AUTH = {
  roles: ["admin","dev"],
};
*/

const script = document.createElement("script");
script.src = `//${config.secure_server}${path}`;
document.body.appendChild(script);
