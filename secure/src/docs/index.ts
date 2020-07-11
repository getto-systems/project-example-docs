import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { html } from "htm/preact";
import { config } from "../config.js";
import { GettoExamplePages, Breadcrumbs } from "./pages.ts";
import { setDocumentTitle, Menu, BreadcrumbLinks, Footer } from "./layout.ts";

(() => {
  const [categories, breadcrumbs] = GettoExamplePages({
    current: location.pathname,
    version: config.version,
  });

  const app = h("main", { class: "layout" }, [
    html`<${Page} breadcrumbs=${breadcrumbs}/>`,
    html`<${Menu} breadcrumbs=${breadcrumbs} categories=${categories} version=${config.version}/>`,
  ]);
  render(app, document.body);
})();

type Props = {
  breadcrumbs: Breadcrumbs,
}

function Page(props: Props) {
  const [state, _] = useState("STATIC-STATE");

  useEffect(() => {
    setDocumentTitle("ドキュメント");
  }, [state]);

  return html`
    <article class="layout__main">
      <header class="main__header">
        <h1 class="main__title">ドキュメント</h1>
        <${BreadcrumbLinks} breadcrumbs=${props.breadcrumbs}/>
      </header>
      <section class="main__body container">
        <section class="box">
          <div>
            <header class="box__header">
              <h2 class="box__title">GETTO project Example のゴール</h2>
            </header>
            <section class="box__body paragraph">
              <p>業務アプリケーションで使用可能な、ベースとなるテンプレートを提供</p>
              <br/>
              <p>各プロジェクトで、このテンプレートをコビーして始められるようにしたい</p>
            </section>
          </div>
        </section>
        <section class="box">
          <div>
            <header class="box__header">
              <h2 class="box__title">認証・認可のゴール</h2>
            </header>
            <section class="box__body paragraph">
              <p>Web アプリケーションを操作する際にストレスにならない、かつセキュアな認証を提供</p>
            </section>
          </div>
        </section>
      </section>
      <${Footer}/>
    </article>
  `;
};
