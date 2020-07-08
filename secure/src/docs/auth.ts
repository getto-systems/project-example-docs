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
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">署名チケットによる再認証</h2>
              </header>
              <section class="box__body paragraph">
                <p>継続認証ユーザーで署名済みチケットを確認</p>
                <p>認証済みユーザーでチケットを発行</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">パスワード認証</h2>
              </header>
              <section class="box__body paragraph">
                <p>パスワード認証ユーザーでユーザーID、パスワードを確認</p>
                <p>認証済みユーザーでチケットを発行</p>
              </section>
            </div>
          </section>
        </section>

        <br/>

        <section class="container">
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">認証済みユーザー</h2>
              </header>
              <section class="box__body paragraph">
                <dl class="form">
                  <dt class="form__header">操作</dt>
                  <dd class="form__field">
                    <p>チケットを発行</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">イベント</dt>
                  <dd class="form__field">
                    <ul>
                      <li>Authenticated</li>
                      <li>TicketIssueFailed</li>
                    </ul>
                  </dd>
                </dl>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">継続認証ユーザー</h2>
              </header>
              <section class="box__body paragraph">
                <dl class="form">
                  <dt class="form__header">操作</dt>
                  <dd class="form__field">
                    <p>署名済みチケットを確認</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">イベント</dt>
                  <dd class="form__field">
                    <ul>
                      <li>SignedTicketParsing</li>
                      <li>SignedTicketParseFailed</li>
                      <li>TicketExpired</li>
                    </ul>
                  </dd>
                </dl>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">パスワード認証ユーザー</h2>
              </header>
              <section class="box__body paragraph">
                <dl class="form">
                  <dt class="form__header">操作</dt>
                  <dd class="form__field">
                    <p>ユーザーID、パスワードを確認</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">イベント</dt>
                  <dd class="form__field">
                    <ul>
                      <li>PasswordMatching</li>
                      <li>PasswordMatchFailed</li>
                    </ul>
                  </dd>
                </dl>
              </section>
            </div>
          </section>
        </section>
        <section class="container">
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">チケットの発行</h2>
              </header>
              <section class="box__body paragraph">
                <p>認証情報が適切ならチケットを発行</p>
                <p>チケットには適切な権限情報を含める</p>
                <p>チケットは適切な方法で署名</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">権限情報の制限</h2>
              </header>
              <section class="box__body paragraph">
                <p>チケットに含める権限情報はリクエストに応じて適切に制限する</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">チケットの署名</h2>
              </header>
              <section class="box__body paragraph">
                <p>署名の妥当性はチケットによる再認証で確認される</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">パスワード一致の確認</h2>
              </header>
              <section class="box__body paragraph">
                <p>指定されたパスワードが暗号化されたパスワードと一致するか適切な方法で確認</p>
              </section>
            </div>
          </section>
        </section>

        <br/>

        <section class="container">
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">ユーザーの権限情報の取得</h2>
              </header>
              <section class="box__body paragraph">
                <p>権限情報は適切に保管</p>
                <p>ユーザーID をキーとして取得</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">ユーザーのパスワードの取得</h2>
              </header>
              <section class="box__body paragraph">
                <p>暗号化したパスワードは適切に保管</p>
                <p>ユーザーID をキーとして取得</p>
              </section>
            </div>
          </section>
        </section>

        <br/>

        <section class="container">
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">アプリケーション API用署名</h2>
              </header>
              <section class="box__body paragraph">
                <p>アプリケーション API の認証・認可には適切な署名を使用</p>
                <p>署名の妥当性検証機構の提供を行う</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">AWS CloudFront Signed Cookie</h2>
              </header>
              <section class="box__body paragraph">
                <p>AWS CloudFront Signed Cookie を発行してプライベートコンテンツのアクセスを許可</p>
              </section>
            </div>
          </section>
        </section>
      </article>
      <${Footer}/>
    </article>
  `;
};
