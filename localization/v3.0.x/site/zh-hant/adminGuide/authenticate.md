---
id: authenticate.md
summary: 瞭解如何在 Milvus 中管理使用者驗證。
title: 驗證使用者存取權限
---
<h1 id="Authenticate-User-Access" class="common-anchor-header">驗證使用者存取權限<button data-href="#Authenticate-User-Access" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>本指南說明如何在 Milvus 中管理使用者驗證，包括啟用驗證、以使用者身分連線，以及修改使用者憑證。</p>
<div class="alert note">
<ul>
<li><p>TLS 與使用者驗證是兩種截然不同的安全性方法。若您已在 Milvus 系統中同時啟用使用者驗證與 TLS，則必須提供使用者名稱、密碼以及憑證檔案路徑。有關如何啟用 TLS 的資訊，請參閱「<a href="/docs/zh-hant/tls.md">傳輸中加密</a>」。</p></li>
<li><p>本頁面的程式碼片段使用 `new<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a>`（Python）與 Milvus 進行互動。針對其他語言的全新 MilvusClient SDK 將於未來的更新中發布。</p></li>
</ul>
</div>
<h2 id="Enable-user-authentication" class="common-anchor-header">啟用使用者驗證<button data-href="#Enable-user-authentication" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><div class="filter">
 <a href="#docker">Docker Compose</a>
 <a href="#helm"> Helm</a>
 <a href="#operator"> Milvus Operator</a>
</div>
<div class="filter-docker">
<p>若要為您的 Milvus 伺服器啟用使用者驗證，請在 Milvus 設定檔<code translate="no">milvus.yaml</code> 中將 common.security.authorizationEnabled 設為 true。有關設定檔的更多資訊，請參閱《<a href="https://milvus.io/docs/configure-docker.md?tab=component">使用 Docker Compose 設定 Milvus</a>》。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">common:</span>
<span class="hljs-string">...</span>
  <span class="hljs-attr">security:</span>
    <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">true</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-helm">
<p>若要為您的 Milvus 伺服器啟用使用者驗證，請在 Milvus 設定檔<code translate="no">values.yaml</code> 中將 authorizationEnabled 設為 true。有關設定的更多資訊，請參閱《<a href="https://milvus.io/docs/configure-helm.md?tab=component">使用 Helm Charts 設定 Milvus</a>》。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">extraConfigFiles:</span>
  <span class="hljs-attr">user.yaml:</span> <span class="hljs-string">|+
    common:
      security:
        authorizationEnabled: true
</span><span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<div class="filter-operator">
<p>若要啟用驗證，請在 `<code translate="no">Milvus</code> ` CRD 中將 `<code translate="no">spec.config.common.security.authorizationEnabled</code> ` 設定為 `<code translate="no">true</code> `。有關 Milvus CRD 的更多資訊，請參閱《<a href="https://milvus.io/docs/configure_operator.md?tab=component">使用 Milvus Operator 配置 Milvus</a>》。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-comment"># Omit other fields ...</span>
  <span class="hljs-attr">config:</span>
    <span class="hljs-attr">common:</span>
      <span class="hljs-attr">security:</span>
        <span class="hljs-attr">authorizationEnabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<h2 id="Connect-to-Milvus-with-authentication" class="common-anchor-header">透過驗證連線至 Milvus<button data-href="#Connect-to-Milvus-with-authentication" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>啟用驗證後，您需要使用使用者名稱和密碼連線至 Milvus。預設情況下，當 Milvus 啟動時，系統會建立名為<code translate="no">root</code> 的使用者，並設定密碼為<code translate="no">Milvus</code> 。以下範例示範如何使用預設的<code translate="no">root</code> 使用者，在啟用驗證的情況下連線至 Milvus：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use default `root` user to connect to Milvus</span>

<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>, <span class="hljs-comment"># replace with your own Milvus server address</span>
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
) 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
若在啟用驗證的情況下連線至 Milvus 時未能提供有效的憑證，您將收到 gRPC 錯誤。
</div>
<h2 id="Create-a-new-user" class="common-anchor-header">建立新使用者<button data-href="#Create-a-new-user" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>以<code translate="no">root</code> 身分連線時，請使用<code translate="no">create_user()</code> 建立使用者。請選擇 6 至 72 個 UTF-8 位元的密碼，除非您的部署採用自訂<a href="/docs/zh-hant/authenticate.md#Password-requirements">的密碼長度限制</a>。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># create a user</span>
client.create_user(
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,
    password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,
)

<span class="hljs-comment"># verify the user has been created</span>

client.describe_user(<span class="hljs-string">&quot;user_1&quot;</span>)

<span class="hljs-comment"># output</span>
<span class="hljs-comment"># {&#x27;user_name&#x27;: &#x27;user_1&#x27;, &#x27;roles&#x27;: ()}</span>
<button class="copy-code-btn"></button></code></pre>
<p>有關建立使用者的更多資訊，請參閱<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/create_user.md">create_user()</a>。</p>
<h2 id="Connect-to-Milvus-with-a-new-user" class="common-anchor-header">使用新使用者連線至 Milvus<button data-href="#Connect-to-Milvus-with-a-new-user" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>請使用新建立的使用者憑證進行連線：</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># connect to milvus with the newly created user</span>

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;user_1:P@ssw0rd&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Update-user-password" class="common-anchor-header">更新使用者密碼<button data-href="#Update-user-password" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>若要變更使用者的密碼，請提供當前密碼以及符合<a href="/docs/zh-hant/authenticate.md#Password-requirements">相同密碼要求的</a>全新密碼。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># update password</span>

client.update_password(
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,
    old_password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,
    new_password=<span class="hljs-string">&quot;P@ssw0rd123&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>有關更新使用者密碼的更多資訊，請參閱<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/update_password.md">update_password()</a>。</p>
<p>若您忘記舊密碼，Milvus 提供一項設定選項，可讓您將特定使用者指定為超級使用者。如此一來，在重設密碼時便無需提供舊密碼。</p>
<p>預設情況下，Milvus 配置檔案中的 `<code translate="no">common.security.superUsers</code> ` 欄位為空，這表示所有使用者在重設密碼時都必須提供舊密碼。不過，您可以指定特定使用者為超級使用者，這些使用者無需提供舊密碼。在以下程式碼片段中，<code translate="no">root</code> 和<code translate="no">foo</code> 被指定為超級使用者。</p>
<p>您應在管理 Milvus 實例運作的 Milvus 設定檔中，新增以下設定項目。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
    <span class="hljs-attr">security:</span>
        <span class="hljs-attr">superUsers:</span> <span class="hljs-string">root,</span> <span class="hljs-string">foo</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-a-user" class="common-anchor-header">刪除使用者<button data-href="#Drop-a-user" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>若要刪除使用者，請使用 `<code translate="no">drop_user()</code> ` 方法。</p>
<pre><code translate="no" class="language-python">client.drop_user(user_name=<span class="hljs-string">&quot;user_1&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
刪除使用者時，您不能是即將被刪除的使用者。否則，系統將拋出錯誤。
</div>
<h2 id="List-all-users" class="common-anchor-header">列出所有使用者<button data-href="#List-all-users" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>列出所有使用者。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># list all users</span>

client.list_users()
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limitations" class="common-anchor-header">限制<button data-href="#Limitations" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><h3 id="Username-requirements" class="common-anchor-header">使用者名稱要求<button data-href="#Username-requirements" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><p>使用者名稱不得為空，且長度不得超過 32 個字元。使用者名稱必須以字母開頭，且僅能包含字母、數字或底線。</p>
<h3 id="Password-requirements" class="common-anchor-header">密碼要求<button data-href="#Password-requirements" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><p>預設情況下，密碼長度必須為 6 至 72 個 UTF-8 位元組。每個 ASCII 字元佔用一個位元組；多位元組字元則佔用多個位元組。Milvus 並未要求必須包含大寫字母、小寫字母、數字或特殊字元的特定組合。</p>
<p>若要變更長度限制，請設定<code translate="no">proxy.minPasswordLength</code> 及<code translate="no">proxy.maxPasswordLength</code> 。最大長度不得超過 72 位元組。若<code translate="no">proxy.maxPasswordLength</code> 的值為零或更小，或大於 72，則會被視為 72。有關設定說明，請參閱<a href="/docs/zh-hant/dynamic_config.md">《即時設定 Milvus</a>》。</p>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ul>
<li>您可能還想了解如何：
<ul>
<li><a href="/docs/zh-hant/scaleout.md">擴展 Milvus 叢集</a></li>
</ul></li>
<li>若您已準備好在雲端部署叢集：
<ul>
<li>了解如何<a href="/docs/zh-hant/eks.md">使用 Terraform 在 Amazon EKS 上部署 Milvus</a></li>
<li>了解如何<a href="/docs/zh-hant/gcp.md">使用 Kubernetes 在 GCP 上部署 Milvus 叢集</a></li>
<li>了解如何<a href="/docs/zh-hant/azure.md">透過 Kubernetes 在 Microsoft Azure 上部署 Milvus</a></li>
</ul></li>
</ul>
