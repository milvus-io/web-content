---
id: users_and_roles.md
related_key: 'users, roles'
summary: >-
  MilvusはRBACによってきめ細かなアクセス制御を実現します。ユーザとロールの作成から始め、ロールに特権や特権グループを割り当て、最後にユーザにロールを付与してアクセス制御を管理します。この方法により、アクセス管理の効率性と安全性を確保することができます。ここでは、Milvusにおけるユーザとロールの作成方法を紹介します。
title: ユーザーとロールの作成
---
<h1 id="Create-Users--Roles​" class="common-anchor-header">ユーザーとロールの作成<button data-href="#Create-Users--Roles​" class="anchor-icon" translate="no">
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
    </button></h1><p>MilvusはRBACによりきめ細かなアクセスコントロールを実現します。まずユーザとロールを作成し、次にロールに特権または特権グループを割り当て、最後にユーザにロールを付与してアクセス制御を管理します。この方法により、アクセス管理の効率性と安全性を確保することができます。ここでは、Milvusにおけるユーザとロールの作成方法を紹介します。</p>
<h2 id="User​" class="common-anchor-header">ユーザ<button data-href="#User​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusインスタンスの初期化後、Milvusへの初回接続時に認証用のルートユーザが自動生成されます。ルートユーザのユーザ名は<code translate="no">root</code> で、パスワードは<code translate="no">Milvus</code> です。ルートユーザのデフォルトロールは<code translate="no">admin</code> で、すべてのリソースにアクセスできます。データの安全性を確保するため、不正アクセスを防止するためにルートユーザの認証情報を安全に管理してください。</p>
<p>日常的な運用では、ルート・ユーザーを使用する代わりに、ユーザーを作成することをお勧めします。</p>
<h3 id="Create-a-user​" class="common-anchor-header">ユーザーの作成</h3><p>以下の例では、ユーザー名<code translate="no">user_1</code> 、パスワード<code translate="no">P@ssw0rd</code> でユーザーを作成する方法を示しています。ユーザーのユーザー名とパスワードは、以下の規則に従う必要があります。</p>
<ul>
<li><p>ユーザー名：文字で始まり、大文字または小文字、数字、アンダースコアのみを含む。</p></li>
<li><p>パスワード：8～64文字で、大文字、小文字、数字、特殊文字のうち3つを含むこと。</p></li>
</ul>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client = <span class="hljs-title class_">MilvusClient</span>(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
client.<span class="hljs-title function_">create_user</span>(user_name=<span class="hljs-string">&quot;user_1&quot;</span>, password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.CreateUserReq;​
​
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build();​
        ​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);​
​
<span class="hljs-type">CreateUserReq</span> <span class="hljs-variable">createUserReq</span> <span class="hljs-operator">=</span> CreateUserReq.builder()​
        .userName(<span class="hljs-string">&quot;user_1&quot;</span>)​
        .password(<span class="hljs-string">&quot;P@ssw0rd&quot;</span>)​
        .build();​
        ​
client.createUser(createUserReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createUser</span>({​
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>,​
   <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>,​
 });​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/users/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;userName&quot;: &quot;user_1&quot;,​
    &quot;password&quot;: &quot;P@ssw0rd&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Update-password​" class="common-anchor-header">パスワードの更新</h3><p>ユーザーを作成した後、パスワードを忘れた場合は更新することができます。</p>
<p>また、新しいパスワードは以下のルールに従わなければなりません。</p>
<ul>
<li>8～64文字で、大文字、小文字、数字、特殊文字のうち3つを含むこと。</li>
</ul>
<p>次の例は、ユーザー<code translate="no">user_1</code> のパスワードを<code translate="no">NewP@ssw0rd</code> に更新する方法を示している。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">update_password</span>(​
    user_name=<span class="hljs-string">&quot;user_1&quot;</span>,​
    old_password=<span class="hljs-string">&quot;P@ssw0rd&quot;</span>,​
    new_password=<span class="hljs-string">&quot;NewP@ssw0rd&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.UpdatePasswordReq;​
​
<span class="hljs-type">UpdatePasswordReq</span> <span class="hljs-variable">updatePasswordReq</span> <span class="hljs-operator">=</span> UpdatePasswordReq.builder()​
        .userName(<span class="hljs-string">&quot;user_1&quot;</span>)​
        .password(<span class="hljs-string">&quot;P@ssw0rd&quot;</span>)​
        .newPassword(<span class="hljs-string">&quot;NewP@ssw0rd&quot;</span>)​
        .build();​
client.updatePassword(updatePasswordReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">updateUser</span>({​
   <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>,​
   <span class="hljs-attr">newPassword</span>: <span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>,​
   <span class="hljs-attr">oldPassword</span>: <span class="hljs-string">&#x27;NewP@ssw0rd&#x27;</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/users/update_password&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;newPassword&quot;: &quot;P@ssw0rd!&quot;,​
    &quot;userName&quot;: &quot;user_1&quot;,​
    &quot;password&quot;: &quot;P@ssw0rd&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="List-users​" class="common-anchor-header">ユーザーの一覧表示</h3><p>複数のユーザーを作成した後、すべての既存ユーザーを一覧表示することができます。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">list_users</span>()​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; resp = client.<span class="hljs-title function_">listUsers</span>();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">listUsers</span>();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/users/list&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>以下は出力例です。<code translate="no">root</code> は Milvus で自動的に生成されたデフォルトユーザーです。<code translate="no">user_1</code> は作成されたばかりの新しいユーザーです。</p>
<pre><code translate="no" class="language-bash">[<span class="hljs-string">&#x27;root&#x27;</span>, <span class="hljs-string">&#x27;user_1&#x27;</span>]​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Role​" class="common-anchor-header">ロール<button data-href="#Role​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusには、<code translate="no">admin</code> という組み込みロールが用意されています。これは、すべてのインスタンス配下のリソースにアクセスでき、すべての操作に権限を持つ管理者ロールです。よりきめ細かいアクセス管理とデータセキュリティの強化のためには、ニーズに応じてカスタムロールを作成することをお勧めします。</p>
<h3 id="Create-a-role​" class="common-anchor-header">ロールの作成</h3><p>以下の例では、<code translate="no">role_a</code> という名前のロールを作成する方法を示します。</p>
<p>ロール名は以下の規則に従わなければなりません。</p>
<ul>
<li>文字で始まり、大文字または小文字、数字、アンダースコアのみを含むことができます。&quot;</li>
</ul>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">create_role</span>(role_name=<span class="hljs-string">&quot;role_a&quot;</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.rbac.request.CreateRoleReq;​
<span class="hljs-type">CreateRoleReq</span> <span class="hljs-variable">createRoleReq</span> <span class="hljs-operator">=</span> CreateRoleReq.builder()​
        .roleName(<span class="hljs-string">&quot;role_a&quot;</span>)​
        .build();​
       ​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">createRole</span>(createRoleReq);​
<span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">createRole</span>({​
   <span class="hljs-attr">roleName</span>: <span class="hljs-string">&#x27;role_a&#x27;</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;roleName&quot;: &quot;role_a&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="List-roles​" class="common-anchor-header">ロールの一覧表示</h3><p>いくつかのロールを作成した後、既存のすべてのロールを一覧表示できます。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#shell">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">list_roles</span>()​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; roles = client.<span class="hljs-title function_">listRoles</span>();​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">listRoles</span>(​
    <span class="hljs-attr">includeUserInfo</span>: <span class="hljs-title class_">True</span>​
);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/roles/list&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>以下は出力例です。<code translate="no">admin</code> はmilvusのデフォルトのロールです。<code translate="no">role_a</code> は作成されたばかりの新しいロールです。</p>
<pre><code translate="no" class="language-bash">[<span class="hljs-string">&#x27;admin&#x27;</span>, <span class="hljs-string">&#x27;role_a&#x27;</span>]​

<button class="copy-code-btn"></button></code></pre>
