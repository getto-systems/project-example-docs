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
    setDocumentTitle("認証・認可 | 詳細設計");
  }, [state]);

  return html`
    <article class="layout__main">
      <header class="main__header">
        <h1 class="main__title">認証・認可 <small>詳細設計</small></h1>
        <${BreadcrumbLinks} breadcrumbs=${props.breadcrumbs}/>
      </header>
      <article class="main__body">
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
                      <li>VerifyPassword</li>
                      <li>VerifyPasswordFailed</li>
                      <li>AuthenticatedByPassword</li>
                    </ul>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">詳細</dt>
                  <dd class="form__field">
                    <p>指定されたパスワードが暗号化されたパスワードと一致するか適切な方法で確認</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">ユーザーのパスワードの取得</dt>
                  <dd class="form__field">
                    <p>暗号化したパスワードは適切に保管</p>
                    <p>ユーザーID をキーとして取得</p>
                    <p>見つからなかった場合、妥当性検証は必ず失敗</p>
                  </dd>
                </dl>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">パスワード登録</h2>
              </header>
              <section class="box__body paragraph">
                <dl class="form">
                  <dt class="form__header">操作</dt>
                  <dd class="form__field">
                    <p>パスワードの登録</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">イベント</dt>
                  <dd class="form__field">
                    <ul>
                      <li>ValidatePassword</li>
                      <li>ValidatePasswordFailed</li>
                      <li>PasswordRegistered</li>
                    </ul>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">詳細</dt>
                  <dd class="form__field">
                    <p>パスワードを適切に暗号化して登録</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">ユーザーのパスワードの登録</dt>
                  <dd class="form__field">
                    <p>暗号化したパスワードは適切に保管</p>
                    <p>ユーザーID をキーとして登録</p>
                  </dd>
                </dl>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">web 証明書妥当性検証 <span class="label label_pending">あとで</span></h2>
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
                      <li>ExchangeWebCredentialAuth</li>
                      <li>VerifyWebCredential</li>
                      <li>VerifyWebCredentialFailed</li>
                      <li>AuthenticatedByWebCredential</li>
                    </ul>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">詳細</dt>
                  <dd class="form__field">
                    <p>適切な方式で証明書を確認</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">ユーザーの web 証明書の取得</dt>
                  <dd class="form__field">
                    <p>web 証明書は適切に保管</p>
                    <p>ユーザーID をキーとして取得</p>
                    <p>見つからなかった場合、妥当性検証は必ず失敗</p>
                  </dd>
                </dl>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">web 証明書登録 <span class="label label_pending">あとで</span></h2>
              </header>
              <section class="box__body paragraph">
                <dl class="form">
                  <dt class="form__header">操作</dt>
                  <dd class="form__field">
                    <p>トークンの交換</p>
                    <p>証明書の登録</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">イベント</dt>
                  <dd class="form__field">
                    <ul>
                      <li>ExchangeWebCredentialRegister</li>
                      <li>ValidateWebCredential</li>
                      <li>ValidateWebCredentialFailed</li>
                      <li>WebCredentialRegistered</li>
                    </ul>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">詳細</dt>
                  <dd class="form__field">
                    <p>適切な方式で証明書を確認して登録</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">ユーザーの web 証明書の登録</dt>
                  <dd class="form__field">
                    <p>web 証明書は適切に保管</p>
                    <p>ユーザーID をキーとして登録</p>
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
                      <li>VerifyTicket</li>
                      <li>VerifyTicketFailed</li>
                      <li>AuthenticatedByTicket</li>
                    </ul>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">詳細</dt>
                  <dd class="form__field">
                    <p>署名が妥当か適切に検証</p>
                    <p>有効期限を適切に検証</p>
                  </dd>
                </dl>
              </section>
            </div>
          </section>
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
                <dl class="form">
                  <dt class="form__header">詳細</dt>
                  <dd class="form__field">
                    <p>チケット有効期限延長時に使用</p>
                    <p>適切な方法で署名</p>
                    <p>有効期限は適切に制限</p>
                    <small><p>経路によって時間を長くする、とか必要かも</p></small>
                    <small><p>web-authn で認証したら最大延長期間を長くしていいかも</p></small>
                    <p>nonce を生成</p>
                    <p>認証済チケットを登録</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">認証済チケット情報の登録</dt>
                  <dd class="form__field">
                    <p>nonce をキーとして、以下の認証済みチケット情報を登録する</p>
                    <ul>
                      <li><small><i class="lnir lnir-chevron-right"></i></small> ユーザーID</li>
                      <li><small><i class="lnir lnir-chevron-right"></i></small> 最大延長期間</li>
                    </ul>
                    <p>nonce が衝突したら一定回数再試行</p>
                    <p>すべて失敗した場合は認証失敗</p>
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
                      <li>ExtendTicket</li>
                      <li>ExtendTicketFailed</li>
                    </ul>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">詳細</dt>
                  <dd class="form__field">
                    <p>認証済みチケットが取得できない場合延長しない</p>
                    <p>ユーザーID が異なる場合延長しない</p>
                    <p>最大延長期間を超えて延長しない</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">認証済チケット情報の取得</dt>
                  <dd class="form__field">
                    <p>nonce をキーとして認証済みチケット情報を取得</p>
                  </dd>
                </dl>
              </section>
            </div>
          </section>
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">チケット最大延長期間削除</h2>
              </header>
              <section class="box__body paragraph">
                <dl class="form">
                  <dt class="form__header">操作</dt>
                  <dd class="form__field">
                    <p>チケットの最大延長期間を削除</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">イベント</dt>
                  <dd class="form__field">
                    <ul>
                      <li>ShrinkTicket</li>
                      <li>ShrinkTicketFailed</li>
                    </ul>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">認証済チケット情報の更新</dt>
                  <dd class="form__field">
                    <p>以下の情報を削除</p>
                    <ul>
                      <li><small><i class="lnir lnir-chevron-right"></i></small> 最大延長期間</li>
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
                      <li>IssueApiToken</li>
                      <li>IssueApiTokenFailed</li>
                    </ul>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">詳細</dt>
                  <dd class="form__field">
                    <p>アプリケーション API 認証に使用</p>
                    <p>適切な方法で署名</p>
                    <p>有効期限はチケットと同じ</p>
                    <p>アプリケーション API 側の認可で必要なユーザーの権限情報を含める</p>
                  </dd>
                </dl>
                <dl class="form">
                  <dt class="form__header">ユーザーの権限情報の取得</dt>
                  <dd class="form__field">
                    <p>権限情報は適切に保管</p>
                    <p>ユーザーID をキーとして取得</p>
                    <p>見つからなかった場合「権限なし」として扱う</p>
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
                <dl class="form">
                  <dt class="form__header">詳細</dt>
                  <dd class="form__field">
                    <p>コンテンツ取得の認証時に使用</p>
                    <small><p>AWS CloudFront Signed Cookie を想定</p></small>
                    <p>適切な方法で署名</p>
                    <p>有効期限はチケットと同じ</p>
                    <p>アクセス許可リソースは適切に制限</p>
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
                <h2 class="box__title">http handler</h2>
              </header>
              <section class="box__body paragraph">
                <p>チケットとコンテンツトークンは cookie を使用してクライアントに http only、same site で送信</p>
                <p>API トークンはレスポンスとして送信</p>
                <small><p>API トークンは Authenticate ヘッダで送信する必要がある</p></small>
                <br/>
                <p>認証失敗時は cookie をすべて無効化</p>
                <p>有効期限の延長に失敗した場合は cookie の無効化はしない</p>
                <small><p>別ユーザーとしてログインした可能性がある</p></small>
                <br/>
                <p>ログアウト時はチケットの最大延長期間を削除して cookie をすべて無効化</p>
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
          <section class="box">
            <div>
              <header class="box__header">
                <h2 class="box__title">クライアントライブラリ</h2>
              </header>
              <section class="box__body paragraph">
                <p>nonce はユーザーID と一緒にメモリと local storage に保存</p>
                <p>有効期限の延長のリクエストでは local storage の内容を確認</p>
                <p>ユーザーID が変わった場合は「ユーザーが変わった」という通知を表示</p>
                <p>nonce だけが変わっていた場合はその nonce を使用してリクエストする</p>
                <br/>
                <p>local storage の変更を追跡し、別なタブでログインしたらログイン後画面を表示</p>
              </section>
            </div>
          </section>
        </section>
      </article>
      <${Footer}/>
    </article>
  `;
};
