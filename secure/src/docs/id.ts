import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { html } from "htm/preact";
import { config } from "../config.js";
import { GettoExampleCredential } from "../credential.js";
import { GettoExamplePages, Breadcrumbs } from "./pages.ts";
import { setDocumentTitle, Menu, BreadcrumbLinks, Footer } from "./layout.ts";

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
    setDocumentTitle("認証・認可");
  }, [state]);

  return html`
    <article class="layout__main">
      <header class="main__header">
        <h1 class="main__title">認証・認可</h1>
        <${BreadcrumbLinks} breadcrumbs=${props.breadcrumbs}/>
      </header>
      <article class="main__body">
        <section class="container">
          <section class="box box_double">
            <div>
              <header class="box__header">
                <h2 class="box__title">ストレスなく使用できて、セキュアな認証のために</h2>
              </header>
              <section class="box__body paragraph">
                <p>認証完了したらクライアントに署名付きチケットを発行</p>
                <p>チケットはセキュアな方法で送信することで漏洩を防ぐ</p>
                <p>チケットの有効期限を短く設定することで漏れた時の被害を抑える</p>
                <p>チケットの署名を検証して有効期限を延長することで、再ログインを抑制</p>
                <p>認証済みチケットは記録しておき、最大延長期限を管理</p>
                <p>リクエスト情報が発行時と一致しなければ有効期限を延長しない</p>
                <p>認証完了、認証失敗などのイベントを記録</p>
              </section>
            </div>
          </section>
          <section class="box box_double">
            <div>
              <header class="box__header">
                <h2 class="box__title">判明しているダメな点</h2>
              </header>
              <section class="box__body paragraph">
                <p><i class="lnir lnir-close"></i> チケットの有効期限切れの前にチケットを無効化できない</p>
                <small><p>最大延長期間を操作することで再認証を促すことは可能</p></small>
                <p><i class="lnir lnir-close"></i> チケットが漏れた場合、有効期限延長を続けることで最大期間アクセス可能</p>
                <small><p>これをするためには cookie の奪取とメモリの解析を行う必要があるので、事実上不可能としていいかな</p></small>
                <p><i class="lnir lnir-close"></i> http を使用することを想定</p>
                <small><p>http 以外の方式で通信する必要が出たときに考える</p></small>
                <p><i class="lnir lnir-close"></i> cookie を使用するため別なタブで別ユーザーとしてログインできない</p>
                <small><p>アプリケーションを別ユーザーでログインする必要がある設計にしないことで対応</p></small>
              </section>
            </div>
          </section>
        </section>

        <br/>

        <section class="container">
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">パスワード認証</h2>
              </header>
              <section class="box__body paragraph">
                <p>パスワードの妥当性検証</p>
                <p>チケットを新規発行</p>
                <p>API トークンを発行</p>
                <p>コンテンツトークンを発行</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">パスワード登録</h2>
              </header>
              <section class="box__body paragraph">
                <p>パスワードの妥当性検証</p>
                <p>新パスワードの登録</p>
                <small><p>以前のパスワードは使用不可能になる</p></small>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">web 証明書認証 <span class="label label_pending">あとで</span></h2>
              </header>
              <section class="box__body paragraph">
                <p>web 証明書の妥当性検証</p>
                <p>チケットを新規発行</p>
                <p>API トークンを発行</p>
                <p>コンテンツトークンを発行</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">web 証明書登録 <span class="label label_pending">あとで</span></h2>
              </header>
              <section class="box__body paragraph">
                <p>パスワードの妥当性検証</p>
                <p>新 web 証明書の登録</p>
                <small><p>以前の証明書は使用不可能になる</p></small>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">チケット有効期限延長</h2>
              </header>
              <section class="box__body paragraph">
                <p>チケットの妥当性検証</p>
                <p>チケットの有効期限を延長</p>
                <p>API トークンを発行</p>
                <p>コンテンツトークンを発行</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">チケット最大延長期間削除</h2>
              </header>
              <section class="box__body paragraph">
                <p>チケットの妥当性検証</p>
                <p>チケットの最大延長期間を削除</p>
              </section>
            </div>
          </section>
        </section>
      </article>
      <${Footer}/>
    </article>
  `;
};
