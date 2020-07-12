import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { html } from "htm/preact";
import { config } from "../../config.js";
import { GettoExampleCredential } from "../../credential.js";
import { GettoExamplePages, Breadcrumbs } from "../pages.ts";
import { setDocumentTitle, Menu, BreadcrumbLinks, Footer } from "../layout.ts";

(() => {
  const [categories, breadcrumbs] = GettoExamplePages({
    current: location.pathname,
    version: config.version,
  });
  const credential = GettoExampleCredential();

  const app = h("main", { class: "layout" }, [
    html`<${Page} breadcrumbs=${breadcrumbs}/>`,
    html`<${Menu} breadcrumbs=${breadcrumbs} categories=${categories} credential=${credential} version=${config.version}/>`,
  ]);
  render(app, document.body);
})();

type Props = {
  breadcrumbs: Breadcrumbs,
}

function Page(props: Props) {
  const [state, _] = useState("STATIC-STATE");

  useEffect(() => {
    setDocumentTitle("サーバー構成 | 詳細設計");
  }, [state]);

  return html`
    <article class="layout__main">
      <header class="main__header">
        <h1 class="main__title">サーバー構成 <small>詳細設計</small></h1>
        <${BreadcrumbLinks} breadcrumbs=${props.breadcrumbs}/>
      </header>
      <section class="main__body">
        <section class="container">
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">K8s クラスタを採用</h2>
              </header>
              <section class="box__body paragraph">
                <p>アップグレードコストが抑えられる</p>
                <small><p>特に OS のアップグレードが簡単</p></small>
                <p>デプロイコストが抑えられる</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">K8s クラスタのよくない点</h2>
              </header>
              <section class="box__body paragraph">
                <p><i class="lnir lnir-close"></i> ランニングコストがより多くかかる</p>
                <small><p>OS のアップグレードは必須なので、このコストを抑えるため</p></small>
                <p><i class="lnir lnir-close"></i> プリエンプティブノードを使用すると可用性が落ちる</p>
                <small><p>カオスエンジニアリングになるととらえる</p></small>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">K8s を使用することによる制約</h2>
              </header>
              <section class="box__body paragraph">
                <p>ステートレスなアプリケーションを構築する必要がある</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">代替案</h2>
              </header>
              <section class="box__body paragraph">
                <p>普通のサーバーインスタンスを使用</p>
                <p>Lambda とか Functions を使用</p>
              </section>
            </div>
          </section>
        </section>

        <br/>

        <section class="container">
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">マネージドな SQL サービスを使用</h2>
              </header>
              <section class="box__body paragraph">
                <p>可用性のために冗長構成で構築</p>
                <p>引き継ぐシステムがリレーショナルデータベースを使用したものであるため SQL サービスを採用</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">SQL サービスをのよくない点</h2>
              </header>
              <section class="box__body paragraph">
                <p><i class="lnir lnir-close"></i> コストがかかる</p>
                <small><p>とはいえリレーショナルデータベースが最適なら採用すべき</p></small>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">代替案</h2>
              </header>
              <section class="box__body paragraph">
                <p>Key-Value ストアを使用</p>
                <p>グラフデータベースを使用</p>
              </section>
            </div>
          </section>
        </section>

        <br/>

        <section class="container">
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">現状の構成のよくない点</h2>
              </header>
              <section class="box__body paragraph">
                <p><i class="lnir lnir-close"></i> データベースのダウンで全体が停止</p>
                <small><p>冗長構成にして、ダウンしないことを祈るしかない</p></small>
              </section>
            </div>
          </section>
        </section>
      </section>
      <${Footer}/>
    </article>
  `;
};
