---
id: rbac.md
related_key: enable RBAC
summary: ユーザー、ロール、権限を管理する方法を学びます。
title: RBACの有効化
---
<h1 id="Enable-RBAC" class="common-anchor-header">RBACの有効化<button data-href="#Enable-RBAC" class="anchor-icon" translate="no">
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
    </button></h1><p>RBACを有効にすることで、特定のMilvusリソース(コレクションやパーティションなど)へのアクセスを制御したり、ユーザの役割や権限に基づいてパーミッションを制御することができます。現在、この機能は Python と Java でのみ利用可能です。</p>
<p>このトピックでは、RBACを有効にし、<a href="/docs/ja/v2.4.x/users_and_roles.md">ユーザとロールを</a>管理する方法について説明します。</p>
<div class="alert note">
<p>このページのコードスニペットでは、新しい<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a>(Python)を使用してMilvusと対話します。他の言語用の新しいMilvusClient SDKは今後のアップデートでリリースされる予定です。</p>
</div>
<h2 id="1-Initiate-a-Milvus-client-to-establish-a-connection" class="common-anchor-header">1.Milvusクライアントを起動して接続を確立する<button data-href="#1-Initiate-a-Milvus-client-to-establish-a-connection" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="/docs/ja/v2.4.x/authenticate.md">ユーザ認証を</a>有効にした後、ユーザ名とパスワードで構成される<code translate="no">token</code> 、Milvusインスタンスに接続します。デフォルトでは、Milvus は<code translate="no">root</code> ユーザとパスワード<code translate="no">Milvus</code> を使用します。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>, <span class="hljs-comment"># replace with your own Milvus server address</span>
    token=<span class="hljs-string">&#x27;root:Milvus&#x27;</span> <span class="hljs-comment"># replace with your own Milvus server token</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="2-Create-a-user" class="common-anchor-header">2.ユーザの作成<button data-href="#2-Create-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>パスワード<code translate="no">P@ssw0rd</code> で<code translate="no">user_1</code> というユーザーを作成します：</p>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_user</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    password=<span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>ユーザーを作成した後、次のことができます：</p>
<ul>
<li>ユーザーパスワードの更新.元のパスワードと新しいパスワードの両方を入力する必要があります。</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">update_password</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    old_password=<span class="hljs-string">&#x27;P@ssw0rd&#x27;</span>,
    new_password=<span class="hljs-string">&#x27;P@ssw0rd123&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>すべてのユーザをリストアップする。</li>
</ul>
<pre><code translate="no" class="language-python">client.list_users()

<span class="hljs-comment"># output:</span>
<span class="hljs-comment"># [&#x27;root&#x27;, &#x27;user_1&#x27;]</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>特定のユーザーの役割をチェックする。</li>
</ul>
<pre><code translate="no" class="language-python">client.describe_user(user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>)

# output:
# {<span class="hljs-string">&#x27;user_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>, <span class="hljs-string">&#x27;roles&#x27;</span>: ()}
<button class="copy-code-btn"></button></code></pre>
<h2 id="3-Create-a-role" class="common-anchor-header">3.ロールの作成<button data-href="#3-Create-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の例では、<code translate="no">roleA</code> という名前のロールを作成しています。</p>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_role</span>(
    role_name=<span class="hljs-string">&quot;roleA&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>ロールを作成した後、以下のことができます：</p>
<ul>
<li>すべてのロールを一覧表示します。</li>
</ul>
<pre><code translate="no" class="language-python">client.list_roles()

# output:
# [<span class="hljs-string">&#x27;admin&#x27;</span>, <span class="hljs-string">&#x27;public&#x27;</span>, <span class="hljs-string">&#x27;roleA&#x27;</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="4-Grant-a-privilege-to-a-role" class="common-anchor-header">4.ロールへの権限の付与<button data-href="#4-Grant-a-privilege-to-a-role" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の例では、<code translate="no">roleA</code> という名前のロールにすべてのコレクションを検索する権限を付与する方法を示します。</p>
<p><code translate="no">object_type</code> 、オブジェクトタイプを指定します。これはリソースタイプとしても理解できます。現在、有効な値はCollection/User/Globalなどで、Globalは特定のリソースタイプがないことを意味します。<code translate="no">object_name</code> はリソース名です。<em>objecttypeがCollectionの場合、object nameは特定のコレクション名を参照するか、*を使用してすべてのコレクションを指定することができます。objecttypeが</em>Globalの場合、オブジェクト名は*しか指定できません。付与できる他の種類の権限については、<a href="/docs/ja/v2.4.x/users_and_roles.md">ユーザとロールを</a>参照してください。</p>
<p>ロール権限を管理する前に、ユーザ認証が有効になっていることを確認してください。そうしないと、エラーが発生することがあります。ユーザ認証を有効にする方法については、「<a href="/docs/ja/v2.4.x/authenticate.md">ユーザ・アクセスの認証</a>」を参照してください。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># grant privilege to a role</span>

client.grant_privilege(
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>,
    object_type=<span class="hljs-string">&#x27;User&#x27;</span>,  <span class="hljs-comment"># value here can be Global, Collection or User, object type also depends on the API defined in privilegeName</span>
    object_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,  <span class="hljs-comment"># value here can be * or a specific user name if object type is &#x27;User&#x27;</span>
    privilege=<span class="hljs-string">&#x27;SelectUser&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>ロールに権限を付与すると、以下のことが可能になります：</p>
<ul>
<li>ロールに付与された権限を表示する。</li>
</ul>
<pre><code translate="no" class="language-python">client.describe_role(
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>
)

# output:
# {<span class="hljs-string">&#x27;role&#x27;</span>: <span class="hljs-string">&#x27;roleA&#x27;</span>,
#  <span class="hljs-string">&#x27;privileges&#x27;</span>: [{<span class="hljs-string">&#x27;object_type&#x27;</span>: <span class="hljs-string">&#x27;User&#x27;</span>,
#    <span class="hljs-string">&#x27;object_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>,
#    <span class="hljs-string">&#x27;db_name&#x27;</span>: <span class="hljs-string">&#x27;default&#x27;</span>,
#    <span class="hljs-string">&#x27;role_name&#x27;</span>: <span class="hljs-string">&#x27;roleA&#x27;</span>,
#    <span class="hljs-string">&#x27;privilege&#x27;</span>: <span class="hljs-string">&#x27;SelectUser&#x27;</span>,
#    <span class="hljs-string">&#x27;grantor_name&#x27;</span>: <span class="hljs-string">&#x27;root&#x27;</span>}]}
<button class="copy-code-btn"></button></code></pre>
<h2 id="5-Grant-a-role-to-a-user" class="common-anchor-header">5.ユーザにロールを付与する<button data-href="#5-Grant-a-role-to-a-user" class="anchor-icon" translate="no">
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
    </button></h2><p>ユーザにロールを付与し、このユーザがロールのすべての権限を継承できるようにします。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># grant a role to a user</span>

client.grant_role(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>ロールを付与した後、ロールが付与されたことを確認します：</p>
<pre><code translate="no" class="language-python">client.describe_user(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>
)

# output:
# {<span class="hljs-string">&#x27;user_name&#x27;</span>: <span class="hljs-string">&#x27;user_1&#x27;</span>, <span class="hljs-string">&#x27;roles&#x27;</span>: (<span class="hljs-string">&#x27;roleA&#x27;</span>)}
<button class="copy-code-btn"></button></code></pre>
<h2 id="6-Revoke-privileges" class="common-anchor-header">6.権限の取り消し<button data-href="#6-Revoke-privileges" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert caution">
<p>以下の操作は不可逆であるため、実行時には注意してください。</p>
</div>
<ul>
<li>ロールから権限を削除する。ロールに付与されていない権限を取り消すと、エラーが発生します。</li>
</ul>
<pre><code translate="no" class="language-python">client.revoke_privilege(
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>,
    object_type=<span class="hljs-string">&#x27;User&#x27;</span>,  <span class="hljs-comment"># value here can be Global, Collection or User, object type also depends on the API defined in privilegeName</span>
    object_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,  <span class="hljs-comment"># value here can be * or a specific user name if object type is &#x27;User&#x27;</span>
    privilege=<span class="hljs-string">&#x27;SelectUser&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>ロールからユーザを削除してください。ユーザに付与されていないロールを取り消すと、エラーが発生します。</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">revoke_role</span>(
    user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>,
    role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>ロールを削除する。</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_role</span>(role_name=<span class="hljs-string">&#x27;roleA&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>ユーザーを削除します。</li>
</ul>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">drop_user</span>(user_name=<span class="hljs-string">&#x27;user_1&#x27;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">次へ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p><a href="/docs/ja/v2.4.x/authenticate.md">ユーザ認証の</a>管理方法</p></li>
<li><p>Milvusで<a href="/docs/ja/v2.4.x/tls.md">TLSプロキシを</a>有効にする方法を学びます。</p></li>
</ul>
