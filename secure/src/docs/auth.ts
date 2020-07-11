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
    setDocumentTitle("認証");
  }, [state]);

  return html`
    <article class="layout__main">
      <header class="main__header">
        <h1 class="main__title">認証</h1>
        <${BreadcrumbLinks} breadcrumbs=${props.breadcrumbs}/>
      </header>
      <article class="main__body">
        <section class="container">
          <section class="box box_double">
            <div>
              <header class="box__header">
                <h2 class="box__title">ストレスのない、かつセキュアな認証のために</h2>
              </header>
              <section class="box__body paragraph">
                <p>クラスタに配備することで可用性を確保</p>
                <p>ステートレスなアプリケーションにすることで起動していれば認証可能にする</p>
                <small><p>コスト削減のため 24時間程度で停止するノードの上に配備するため、ステートレスである必要がある</p></small>
                <br/>
                <p>認証完了したらクライアントに署名付きチケットを発行</p>
                <p>チケットは http only、same site な cookie を使用することで漏洩を防ぐ</p>
                <p>チケットの有効期限を短く設定することで漏れた時の被害を抑える</p>
                <p>チケットの署名を検証して有効期限を延長することで、再ログインを抑制する</p>
                <p>認証済みチケットは記録しておき、最大延長期限を管理できるようにする</p>
                <p>リクエスト情報が発行時と一致しなければ有効期限を延長しない</p>
              </section>
            </div>
          </section>
          <section class="box box_double">
            <div>
              <header class="box__header">
                <h2 class="box__title">判明しているダメな点</h2>
              </header>
              <section class="box__body paragraph">
                <p><i class="lnir lnir-close"></i> バックエンドのデータベースがダウンした場合はサービス停止</p>
                <small><p>アプリケーション API も同じデータベースを使用することを想定しているので、データベースがダウンした場合は認証だけでなくサービス自体がダウンする</p></small>
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
                <h2 class="box__title">web 認証</h2>
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
        </section>

        <br/>

        <section class="container">
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">パスワード妥当性検証</h2>
              </header>
              <section class="box__body paragraph">
                <dl class="form">
                  <dt class="form__header">操作</dt>
                  <dd class="form__field">
                    <p>パスワードの妥当性検証</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">イベント</dt>
                  <dd class="form__field">
                    <ul>
                      <li>ValidatePassword</li>
                      <li>InvalidPassword</li>
                      <li>AuthenticatedByPassword</li>
                    </ul>
                  </dd>
                </dl>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">web 証明書妥当性検証</h2>
              </header>
              <section class="box__body paragraph">
                <dl class="form">
                  <dt class="form__header">操作</dt>
                  <dd class="form__field">
                    <p>トークンの交換</p>
                    <p>証明書の妥当性検証</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">イベント</dt>
                  <dd class="form__field">
                    <ul>
                      <li>ExchangeWebCredential</li>
                      <li>ValidateWebCredential</li>
                      <li>InvalidWebCredential</li>
                      <li>AuthenticatedByWebCredential</li>
                    </ul>
                  </dd>
                </dl>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">チケット妥当性検証</h2>
              </header>
              <section class="box__body paragraph">
                <dl class="form">
                  <dt class="form__header">操作</dt>
                  <dd class="form__field">
                    <p>チケットの妥当性検証</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">イベント</dt>
                  <dd class="form__field">
                    <ul>
                      <li>ValidateTicket</li>
                      <li>InvalidTicket</li>
                      <li>AuthenticatedByTicket</li>
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
                <h2 class="box__title">チケット発行</h2>
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
                      <li>IssueTicket</li>
                      <li>IssueTicketFailed</li>
                    </ul>
                  </dd>
                </dl>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">チケット有効期限延長</h2>
              </header>
              <section class="box__body paragraph">
                <dl class="form">
                  <dt class="form__header">操作</dt>
                  <dd class="form__field">
                    <p>チケットの有効期限を延長</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">イベント</dt>
                  <dd class="form__field">
                    <ul>
                      <li>RenewTicket</li>
                      <li>RenewTicketFailed</li>
                    </ul>
                  </dd>
                </dl>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">API トークン発行</h2>
              </header>
              <section class="box__body paragraph">
                <dl class="form">
                  <dt class="form__header">操作</dt>
                  <dd class="form__field">
                    <p>API トークンを発行</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">イベント</dt>
                  <dd class="form__field">
                    <ul>
                      <li>IssueAPIToken</li>
                      <li>IssueAPITokenFailed</li>
                    </ul>
                  </dd>
                </dl>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">コンテンツトークン発行</h2>
              </header>
              <section class="box__body paragraph">
                <dl class="form">
                  <dt class="form__header">操作</dt>
                  <dd class="form__field">
                    <p>コンテンツトークンを発行</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">イベント</dt>
                  <dd class="form__field">
                    <ul>
                      <li>IssueContentToken</li>
                      <li>IssueContentTokenFailed</li>
                    </ul>
                  </dd>
                </dl>
              </section>
            </div>
          </section>
        </section>

        <br/>

        <section class="container">
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">チケットの発行</h2>
              </header>
              <section class="box__body paragraph">
                <p>チケット有効期限延長時に使用</p>
                <p>適切な方法で署名</p>
                <p>有効期限は適切に制限</p>
                <p>認証済チケットは nonce をつけて記録</p>
                <p>認証済チケットは最大延長期間を記録</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">チケットの有効期限を延長</h2>
              </header>
              <section class="box__body paragraph">
                <p>nonce が異なる場合は延長しない</p>
                <p>最大延長期間を超えて延長しない</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">API トークンの発行</h2>
              </header>
              <section class="box__body paragraph">
                <p>アプリケーション API の認証時に使用</p>
                <p>適切な方法で署名</p>
                <p>有効期限は適切に制限</p>
                <p>アプリケーション API 側の認可で必要なユーザーの権限情報を含める</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">コンテンツトークンの発行</h2>
              </header>
              <section class="box__body paragraph">
                <p>コンテンツ取得の認証時に使用</p>
                <small><p>AWS CloudFront Signed Cookie を想定</p></small>
                <p>適切な方法で署名</p>
                <p>有効期限は適切に制限</p>
                <p>アクセス可能なリソースは適切に制限</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">有効期限の制限</h2>
              </header>
              <section class="box__body paragraph">
                <p>リクエストに応じて適切に制限</p>
                <small><p>経路によって時間を長くする、とか必要かも</p></small>
                <small><p>web-authn で認証したら最大延長期間を長くしていいかも</p></small>
              </section>
            </div>
          </section>
        </section>

        <br/>

        <section class="container">
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">パスワードの妥当性検証</h2>
              </header>
              <section class="box__body paragraph">
                <p>指定されたパスワードが暗号化されたパスワードと一致するか適切な方法で確認</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">web 証明書の妥当性検証</h2>
              </header>
              <section class="box__body paragraph">
                <p>適切な方式で証明書の妥当性を確認</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">チケットの妥当性検証</h2>
              </header>
              <section class="box__body paragraph">
                <p>署名が妥当か適切に検証</p>
                <p>有効期限を適切に検証</p>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">API トークンの妥当性検証機構</h2>
              </header>
              <section class="box__body paragraph">
                <p>API トークンの署名を検証するために必要な情報を公開</p>
                <small><p>公開鍵情報を想定</p></small>
              </section>
            </div>
          </section>
        </section>

        <section class="container">
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">ユーザーの権限情報の取得</h2>
              </header>
              <section class="box__body paragraph">
                <p>権限情報は適切に保管</p>
                <p>ユーザーID をキーとして取得</p>
                <p>見つからなかった場合、「権限なし」として扱う</p>
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
                <p>見つからなかった場合、パスワードは決して一致させない</p>
              </section>
            </div>
          </section>
        </section>

        <br/>

        <section class="container">
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">http handler</h2>
              </header>
              <section class="box__body paragraph">
                <p>チケットとコンテンツトークンは cookie を使用してクライアントに http only、same site で送信</p>
                <p>API トークンはレスポンスとして送信</p>
                <small><p>API トークンは Authenticate ヘッダで送信する必要がある</p></small>
                <br/>
                <p>認証失敗時はすべての cookie を無効にする</p>
                <p>有効期限の延長に失敗した場合は cookie の無効化はしない</p>
                <small><p>別ユーザーとしてログインした可能性がある</p></small>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">クライアントライブラリ</h2>
              </header>
              <section class="box__body paragraph">
                <p>nonce はユーザーID と一緒にメモリと local storage に保存する</p>
                <p>有効期限の延長のリクエストでは local storage の内容を確認</p>
                <p>ユーザーID が変わった場合は「ユーザーが変わった」という通知を表示</p>
                <p>nonce だけが変わっていた場合はその nonce を使用してリクエストを行う</p>
              </section>
            </div>
          </section>
        </section>
      </article>
      <${Footer}/>
    </article>
  `;
};
