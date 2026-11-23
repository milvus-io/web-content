---
id: connect-to-milvus-server.md
title: Milvus サーバーへの接続
summary: このトピックでは、Milvus サーバーへのクライアント接続を確立し、一般的な接続オプションを設定する方法について説明します。
---
<h1 id="Connect-to-Milvus-Server" class="common-anchor-header">Milvus サーバーへの接続<button data-href="#Connect-to-Milvus-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Milvus サーバーへのクライアント接続を確立し、一般的な接続オプションを設定する方法について説明します。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><p>使用する言語の SDK がインストールされていること。詳細については、<a href="/docs/ja/install-pymilvus.md">Python SDK</a>、<a href="/docs/ja/install-java.md">Java SDK</a>、<a href="/docs/ja/install-go.md">Go SDK</a>、または<a href="/docs/ja/install-node.md">Node</a>.<a href="/docs/ja/install-node.md">js SDK</a> を参照してください。</p></li>
<li><p>Milvus サーバーのアドレス（ローカルのデフォルト：<code translate="no">http://localhost:19530</code> 、プロキシポート<strong>19530</strong>）。</p></li>
<li><p><a href="/docs/ja/authenticate.md">認証が有効になっている場合は</a>、<strong>トークン</strong>、<strong>またはユーザー名とパスワードの</strong>いずれかを指定してください。トークンは<code translate="no">username:password</code> 形式（例:<code translate="no">root:Milvus</code> ）で指定できます。詳細については、<a href="/docs/ja/authenticate.md">「ユーザーアクセスの認証</a>」および「<a href="/docs/ja/users_and_roles.md">ユーザーとロールの作成</a>」を参照してください。</p></li>
</ul>
<h2 id="Connect-by-URI-authentication-disabled" class="common-anchor-header">URI による接続（認証無効）<button data-href="#Connect-by-URI-authentication-disabled" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus サーバーのアドレス（例:<code translate="no">http://localhost:19530</code> ）を使用して接続を確立します。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .build();
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
   <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

c, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># The RESTful API is stateless, so there is no persistent connection.</span>
<span class="hljs-comment"># Each request hits the server directly; the /collections/list endpoint</span>
<span class="hljs-comment"># doubles as a health check when you need to verify reachability.</span>
<span class="hljs-built_in">export</span> HOST=<span class="hljs-string">&quot;localhost:19530&quot;</span>

curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${HOST}</span>/v2/vectordb/collections/list&quot;</span> \
    -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
    -d <span class="hljs-string">&#x27;{}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Connect-with-credentials-authentication-enabled" class="common-anchor-header">認証情報を使用した接続（認証有効）<button data-href="#Connect-with-credentials-authentication-enabled" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">&quot;username:password&quot;</code> の形式の<strong>トークン</strong>、または<code translate="no">user</code> と<code translate="no">password</code> を別々に指定します。デフォルトの組み込み管理者アカウントは<code translate="no">root:Milvus</code> です（本番環境ではこれを変更してください）。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Token form</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

<span class="hljs-comment"># Or explicit user/password</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    user=<span class="hljs-string">&quot;root&quot;</span>,
    password=<span class="hljs-string">&quot;Milvus&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .username(<span class="hljs-string">&quot;root&quot;</span>)
        .password(<span class="hljs-string">&quot;Milvus&quot;</span>)
        .build();
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
   <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;root&#x27;</span>,
   <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Milvus&#x27;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

c, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    Username: <span class="hljs-string">&quot;root&quot;</span>,
    Password: <span class="hljs-string">&quot;Milvus&quot;</span>,
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> HOST=<span class="hljs-string">&quot;localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${HOST}</span>/v2/vectordb/collections/list&quot;</span> \
    -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
    -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
    -d <span class="hljs-string">&#x27;{}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>トークンの形式は<code translate="no">&quot;&lt;username&gt;:&lt;password&gt;&quot;</code> です。ドキュメントでは、<code translate="no">root:Milvus</code> がデフォルトの認証情報であると明記されており、「<a href="/docs/ja/users_and_roles.md">ユーザーの作成とロールの設定</a>」ガイドではユーザー管理について解説されています。</p>
</div>
<h2 id="Configure-a-timeout" class="common-anchor-header">タイムアウトの設定<button data-href="#Configure-a-timeout" class="anchor-icon" translate="no">
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
    </button></h2><p>クライアント接続のデフォルトのタイムアウトを設定します:</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, timeout=<span class="hljs-number">1</span>) <span class="hljs-comment"># Unit: seconds. If not set, the client waits up to 10 seconds to connect.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .rpcDeadlineMs(<span class="hljs-number">1000</span>)
        .build();
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
   <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;root&#x27;</span>,
   <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Milvus&#x27;</span>,
   <span class="hljs-attr">timeout</span>: <span class="hljs-number">1000</span> <span class="hljs-comment">// ms</span>
});
<span class="hljs-comment">// await client.listCollections({ timeout: 2000})</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

ctx, cancel := context.WithTimeout(context.Background(), time.Second)
<span class="hljs-keyword">defer</span> cancel()
c, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> HOST=<span class="hljs-string">&quot;localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># Request-Timeout is applied per-request (unit: seconds). --max-time</span>
<span class="hljs-comment"># caps the total curl wall-clock so the client gives up even if the</span>
<span class="hljs-comment"># server never responds.</span>
curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${HOST}</span>/v2/vectordb/collections/list&quot;</span> \
    -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
    -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
    --max-time 7 \
    -d <span class="hljs-string">&#x27;{}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>上記のSDKでは、このタイムアウトは接続の確立時にのみ使用され、他のAPI操作のデフォルトのタイムアウトとしては機能しません。</p></li>
<li><p>RESTful API の場合、<code translate="no">Request-Timeout</code> はリクエストごとの期限（秒単位）です（Java の<code translate="no">rpcDeadlineMs</code> や Node.js の<code translate="no">timeout</code> がミリ秒単位であるのとは異なります）。そのため、期限が必要なすべての呼び出しでこれを指定してください。</p></li>
</ul>
</div>
<h2 id="Connect-to-a-specific-database" class="common-anchor-header">特定のデータベースへの接続<button data-href="#Connect-to-a-specific-database" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">db_name</code> を使用して、構築時にターゲットデータベースを選択します。また、<code translate="no">using_database()</code> を使用して後から切り替えることもできます。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Set the database when creating the client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
    db_name=<span class="hljs-string">&quot;analytics&quot;</span>,
)

<span class="hljs-comment"># (Optional) Switch the active database later</span>
<span class="hljs-comment"># client.using_database(&quot;reports&quot;)</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">config</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .username(<span class="hljs-string">&quot;root&quot;</span>)
        .password(<span class="hljs-string">&quot;Milvus&quot;</span>)
        .dbName(<span class="hljs-string">&quot;analytics&quot;</span>)
        .build();
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(config);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
   <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;root&#x27;</span>,
   <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;Milvus&#x27;</span>,
   <span class="hljs-attr">database</span>: <span class="hljs-string">&#x27;analytics&#x27;</span>
});
<span class="hljs-comment">// (Optional) Switch the active database later</span>
<span class="hljs-comment">// await milvusClient.useDatabase({</span>
<span class="hljs-comment">//   db_name: &#x27;reports&#x27;,</span>
<span class="hljs-comment">//});</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>

c, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    DBName:  <span class="hljs-string">&quot;analytics&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-comment">// (Optional) switch the active database later with:</span>
err = c.UseDatabase(ctx, milvusclient.NewUseDatabaseOption(<span class="hljs-string">&quot;reports&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> HOST=<span class="hljs-string">&quot;localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># Target a specific database by setting &quot;dbName&quot; in the request body.</span>
<span class="hljs-comment"># The RESTful API is stateless, so include &quot;dbName&quot; on every request</span>
<span class="hljs-comment"># that should run against a non-default database.</span>
curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${HOST}</span>/v2/vectordb/collections/list&quot;</span> \
    -H <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
    -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
    -H <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
    -d <span class="hljs-string">&#x27;{
      &quot;dbName&quot;: &quot;analytics&quot;
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>データベースの作成、一覧表示、説明、およびより広範なデータベース管理タスクについては、「<a href="/docs/ja/manage_databases.md">データベース</a>ガイド」を参照してください。</p>
</div>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/ja/create-collection.md">コレクションの作成</a></p></li>
<li><p><a href="/docs/ja/insert-update-delete.md">エンティティの挿入</a></p></li>
<li><p><a href="/docs/ja/single-vector-search.md">基本的なベクトル検索</a></p></li>
</ul>
