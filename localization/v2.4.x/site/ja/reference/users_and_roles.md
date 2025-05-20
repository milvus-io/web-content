---
id: users_and_roles.md
related_key: 'users, roles'
summary: ロール・ベース・アクセス・コントロール（RBAC）におけるユーザー、ロール、オブジェクト、権限の定義について学びます。
title: ユーザ、権限、ロール
---
<h1 id="Users-Privileges-and-Roles" class="common-anchor-header">ユーザ、権限、ロール<button data-href="#Users-Privileges-and-Roles" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Milvusにおけるロールベースアクセスコントロール(RBAC)の概要を説明し、ユーザ、ロール、オブジェクト、権限の定義と関係について詳しく説明します。</p>
<p>以下の図にオブジェクト、権限、ロール、ユーザの関係を示します。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/users_and_roles.png" alt="users_and_roles" class="doc-image" id="users_and_roles" />
   </span> <span class="img-wrapper"> <span>ユーザとロール</span> </span></p>
<h2 id="Key-concepts" class="common-anchor-header">主要概念<button data-href="#Key-concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusリソースへのアクセスコントロールを管理するためには、RBACの主要な構成要素であるオブジェクトタイプ、オブジェクト名、ユーザ、ロール、権限を理解することが重要です。</p>
<ul>
<li><p><strong>オブジェクトタイプ</strong>: 特権が割り当てられるオブジェクトのカテゴリ。オブジェクト タイプには次のようなものがあります：</p>
<ul>
<li><code translate="no">Global</code>:システム全体のオブジェクト。すべてのコレクション、ユーザー、またはシステム全体の設定に影響するアクションをユーザーが実行できます。</li>
<li><code translate="no">Collection</code>:コレクション固有のオブジェクト ： インデックスの作成、データのロード、データの挿入または削除、特定のコレクション内のデータのクエリなどのアクションを実行できます。</li>
<li><code translate="no">User</code>:ユーザ資格情報の更新やユーザ詳細の表示など、ユーザがデータベース・ユーザの資格情報およびロールを管理できるようにします。</li>
</ul></li>
<li><p><strong>オブジェクト名</strong>：アクセスを制御するオブジェクトの具体的な名前。たとえば</p>
<ul>
<li>オブジェクトのタイプが<code translate="no">Global</code> の場合、オブジェクト名にはワイルドカード (<code translate="no">*</code>) を設定する必要があります。</li>
<li>オブジェクト・タイプが<code translate="no">Collection</code> の場合、オブジェクト名はコレクション名です。</li>
<li>オブジェクト・タイプが<code translate="no">User</code> の場合、オブジェクト名はデータベース・ユーザの名前です。</li>
</ul></li>
<li><p><strong>ユーザー(User)</strong>: Milvusと相互作用する個人またはアプリケーションで、ユーザー名と対応するパスワードから構成される。</p></li>
<li><p><strong>特権</strong>：実行可能なアクションとアクセス可能なリソースを定義する。権限はユーザに直接付与されるのではなく、ロールに割り当てられる。</p></li>
<li><p><strong>ロール</strong>：ユーザーが特定のオブジェクトに対して持つ権限のセットを定義します。ロールがユーザにバインドされると、ユーザはそのロールに付与されたすべての特権を継承します。</p></li>
</ul>
<h2 id="Example-Granting-privileges" class="common-anchor-header">例権限の付与<button data-href="#Example-Granting-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>次のコード・スニペットは、特定のコレクションに対して<code translate="no">CreateIndex</code> 特権をロールに付与する方法を示しています：</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">milvusClient.grant_privilege(
    role_name=<span class="hljs-string">&quot;CUSTOM_ROLE_NAME&quot;</span>,
    object_type=<span class="hljs-string">&quot;Collection&quot;</span>,  <span class="hljs-comment"># Valid value: Global, Collection or User.</span>
    privilege=<span class="hljs-string">&quot;CreateIndex&quot;</span>,   <span class="hljs-comment"># See the table below for valid privilege names and relevant API descriptions.</span>
    object_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>  <span class="hljs-comment"># The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">GrantPrivilegeReq</span> <span class="hljs-variable">grantPrivilegeReq</span> <span class="hljs-operator">=</span> GrantPrivilegeReq.builder()
        .roleName(<span class="hljs-string">&quot;roleName&quot;</span>)
        .objectName(<span class="hljs-string">&quot;CollectionName&quot;</span>) <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
        .objectType(<span class="hljs-string">&quot;Collection&quot;</span>) <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
        .privilege(<span class="hljs-string">&quot;CreateIndex&quot;</span>) <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
        .build();
client.grantPrivilege(grantPrivilegeReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">milvusClient.grantPrivilege({
   roleName: <span class="hljs-string">&#x27;roleName&#x27;</span>,
   <span class="hljs-built_in">object</span>: <span class="hljs-string">&#x27;Collection&#x27;</span>,  <span class="hljs-comment">// Valid value: Global, Collection or User.</span>
   objectName: <span class="hljs-string">&#x27;CollectionName&#x27;</span>, <span class="hljs-comment">// The name of the collection to grant access to. Use &quot;*&quot; to grant access to all collections.</span>
   privilegeName: <span class="hljs-string">&#x27;CreateIndex&#x27;</span> <span class="hljs-comment">// See the table below for valid privilege names and relevant API descriptions.</span>
 })
<button class="copy-code-btn"></button></code></pre>
<div class="language-python">
<p>権限関連APIの詳細については、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/grant_privilege.md">grant_privilegeと</a> <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Authentication/revoke_privileges.md">revoke_privilegeを</a>参照してください。</p>
</div>
<div class="language-java">
<p>特権関連APIについての詳細は、<a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/grantPrivilege.md">grantPrivilegeと</a> <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Authentication/revokePrivilege.md">revokePrivilegeを</a>参照してください。</p>
</div>
<div class="language-javascript">
<p>特権関連 API の詳細については、<a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/grantPrivilege.md">grantPrivilege</a>および<a href="https://milvus.io/api-reference/node/v2.4.x/Authentication/revokePrivilege.md">revokePrivilege</a> を参照してください。</p>
</div>
<h2 id="Default-users-and-roles" class="common-anchor-header">デフォルトのユーザとロール<button data-href="#Default-users-and-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus はデフォルトで<code translate="no">root</code> ユーザーをデフォルトパスワード<code translate="no">Milvus</code> で作成します。<code translate="no">root</code> ユーザーには<code translate="no">admin</code> 権限が付与されます。これは、この<code translate="no">root</code> ユーザーがすべてのリソースにアクセスでき、すべてのアクションを実行できることを意味します。</p>
<p>ユーザが<code translate="no">public</code> ロールと関連付けられている場合、そのユーザには以下の権限が与えられます：</p>
<ul>
<li><code translate="no">DescribeCollection</code></li>
<li><code translate="no">ShowCollections</code></li>
<li><code translate="no">IndexDetail</code></li>
</ul>
<h2 id="List-of-object-types-and-privileges" class="common-anchor-header">オブジェクト・タイプと権限のリスト<button data-href="#List-of-object-types-and-privileges" class="anchor-icon" translate="no">
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
    </button></h2><p>次の表は、<a href="/docs/ja/v2.4.x/rbac.md">RBACを有効にする</a>ときに選択できる値の一覧です。</p>
<table>
<thead>
<tr><th>オブジェクト・タイプ</th><th>特権名</th><th>クライアント側の関連APIの説明</th></tr>
</thead>
<tbody>
<tr><td>コレクション</td><td>作成インデックス</td><td>インデックス作成</td></tr>
<tr><td>コレクション</td><td>ドロップインデックス</td><td>ドロップインデックス</td></tr>
<tr><td>コレクション</td><td>インデックスの詳細</td><td>DescribeIndex/GetIndexState/GetIndexBuildProgress(インデックス構築状況)</td></tr>
<tr><td>コレクション</td><td>ロード</td><td>LoadCollection/GetLoadingProgress/GetLoadState</td></tr>
<tr><td>コレクション</td><td>ロード進行状況取得</td><td>ロード進行状況の取得</td></tr>
<tr><td>コレクション</td><td>ロード状態取得</td><td>ロード状態取得</td></tr>
<tr><td>コレクション</td><td>リリース</td><td>リリースコレクション</td></tr>
<tr><td>コレクション</td><td>挿入</td><td>インサート</td></tr>
<tr><td>コレクション</td><td>削除</td><td>削除</td></tr>
<tr><td>コレクション</td><td>アップサート</td><td>アップサート</td></tr>
<tr><td>コレクション</td><td>検索</td><td>検索</td></tr>
<tr><td>コレクション</td><td>フラッシュ</td><td>フラッシュ/フラッシュ状態取得</td></tr>
<tr><td>コレクション</td><td>フラッシュ状態取得</td><td>フラッシュ状態の取得</td></tr>
<tr><td>コレクション</td><td>クエリー</td><td>クエリー</td></tr>
<tr><td>コレクション</td><td>統計</td><td>コレクション統計</td></tr>
<tr><td>コレクション</td><td>コンパクション</td><td>コンパクト</td></tr>
<tr><td>コレクション</td><td>インポート</td><td>一括挿入/インポート</td></tr>
<tr><td>コレクション</td><td>ロードバランス</td><td>ロードバランス</td></tr>
<tr><td>コレクション</td><td>パーティション作成</td><td>パーティションの作成</td></tr>
<tr><td>コレクション</td><td>ドロップパーティション</td><td>ドロップパーティション</td></tr>
<tr><td>コレクション</td><td>パーティションの表示</td><td>パーティションを表示</td></tr>
<tr><td>コレクション</td><td>パーティション</td><td>パーティションを持つ</td></tr>
<tr><td>グローバル</td><td>すべて</td><td>このテーブルのすべてのAPI操作権限</td></tr>
<tr><td>グローバル</td><td>コレクションの作成</td><td>コレクションの作成</td></tr>
<tr><td>グローバル</td><td>ドロップコレクション</td><td>ドロップコレクション</td></tr>
<tr><td>グローバル</td><td>DescribeCollection</td><td>DescribeCollection</td></tr>
<tr><td>グローバル</td><td>コレクションの表示</td><td>コレクションを表示</td></tr>
<tr><td>グローバル</td><td>コレクション名の変更</td><td>リネームコレクション</td></tr>
<tr><td>グローバル</td><td>すべてをフラッシュ</td><td>すべてをフラッシュ</td></tr>
<tr><td>グローバル</td><td>オーナーシップの作成</td><td>CreateUser CreateRole</td></tr>
<tr><td>グローバル</td><td>所有権の削除</td><td>削除クレデンシャル DropRole</td></tr>
<tr><td>グローバル</td><td>オーナーシップ選択</td><td>セレクトロール/セレクトグラント</td></tr>
<tr><td>グローバル</td><td>オーナーシップの管理</td><td>OperateUserRole（ユーザー役割の操作） OperatePrivilege（権限の操作</td></tr>
<tr><td>グローバル</td><td>リソースグループの作成</td><td>リソースグループの作成</td></tr>
<tr><td>グローバル</td><td>リソースグループの削除</td><td>DropResourceグループ</td></tr>
<tr><td>グローバル</td><td>DescribeResourceGroup</td><td>リソースグループ</td></tr>
<tr><td>グローバル</td><td>リソースグループの一覧</td><td>リソースグループの一覧</td></tr>
<tr><td>グローバル</td><td>転送ノード</td><td>転送ノード</td></tr>
<tr><td>グローバル</td><td>トランスファーレプリカ</td><td>トランスファーレプリカ</td></tr>
<tr><td>グローバル</td><td>データベースの作成</td><td>データベースの作成</td></tr>
<tr><td>グローバル</td><td>データベースの削除</td><td>データベースの削除</td></tr>
<tr><td>グローバル</td><td>データベース一覧</td><td>リストデータベース</td></tr>
<tr><td>グローバル</td><td>エイリアスの作成</td><td>エイリアス作成</td></tr>
<tr><td>グローバル</td><td>エイリアスの削除</td><td>ドロップエイリアス</td></tr>
<tr><td>グローバル</td><td>エイリアスの記述</td><td>エイリアス記述</td></tr>
<tr><td>グローバル</td><td>エイリアス一覧</td><td>エイリアス一覧</td></tr>
<tr><td>ユーザ</td><td>更新ユーザ</td><td>更新クレデンシャル</td></tr>
<tr><td>ユーザー</td><td>ユーザー選択</td><td>ユーザー選択</td></tr>
</tbody>
</table>
<div class="alert note">
<li>オブジェクト名と権限名は大文字と小文字を区別します。</li>
<li>Collection、Global、Userのように、ある種類のオブジェクトにすべての権限を付与するには、権限名に "*"を使用します。 </li>
<li>Globalオブジェクトに対する "*"特権名には、All特権は含まれません。All特権には、コレクションやユーザオブジェクトを含むすべての権限が含まれるからです。</li>
</div>
<h2 id="Whats-next" class="common-anchor-header">次のページ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><a href="/docs/ja/v2.4.x/rbac.md">RBACを有効に</a>する方法について説明します。</li>
</ul>
