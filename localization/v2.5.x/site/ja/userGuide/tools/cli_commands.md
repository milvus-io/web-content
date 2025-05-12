---
id: cli_commands.md
summary: コマンドを使ってMilvusと対話する。
title: Milvus_CLI コマンドリファレンス
---
<h1 id="MilvusCLI-Command-Reference" class="common-anchor-header">Milvus_CLI コマンドリファレンス<button data-href="#MilvusCLI-Command-Reference" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusコマンドラインインタフェース(CLI)は、データベース接続、データ操作、データのインポート/エクスポートをサポートするコマンドラインツールです。</p>
<p>このトピックでは、サポートされているすべてのコマンドと対応するオプションを紹介します。また、参考のためにいくつかの例も含まれています。</p>
<h2 id="Command-Groups" class="common-anchor-header">コマンドグループ<button data-href="#Command-Groups" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusのCLIコマンドは以下のグループに分かれています：</p>
<ul>
<li><code translate="no">create</code>:コレクション、データベース、パーティション、ユーザ、ロール、インデックスの作成</li>
<li><code translate="no">delete</code>:コレクション、データベース、パーティション、エイリアス、ユーザ、ロール、インデックスの削除</li>
<li><code translate="no">list</code>:コレクション、データベース、パーティション、ユーザ、ロール、グラント、またはインデックスの一覧表示</li>
<li><code translate="no">show</code>:接続、データベース、コレクション、ローディング進行状況、インデックス進行状況の表示</li>
<li><code translate="no">grant</code>:ロールまたは権限の付与</li>
<li><code translate="no">revoke</code>:役割または権限の取り消し</li>
<li><code translate="no">load</code>:コレクションやパーティションのロード</li>
<li><code translate="no">release</code>:コレクションまたはパーティションの解放</li>
<li><code translate="no">use</code>:データベースの使用</li>
<li><code translate="no">rename</code>:コレクション名の変更</li>
<li><code translate="no">insert</code>:エンティティ（ファイルまたは行）の挿入</li>
</ul>
<h2 id="clear" class="common-anchor-header">クリア<button data-href="#clear" class="anchor-icon" translate="no">
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
    </button></h2><p>画面をクリアします。</p>
<p><h3 id="clear">構文</h3></p>
<pre><code translate="no" class="language-shell">clear
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="clear">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h2 id="connect" class="common-anchor-header">接続<button data-href="#connect" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusに接続する。</p>
<p><h3 id="connect">構文</h3></p>
<pre><code translate="no" class="language-shell">connect [-uri (text)] [-t (text)]
connect [-uri (text)] [-t (text)] [-tls (0|1)] [-cert (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="connect">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-uri</td><td style="text-align:left">-uri</td><td style="text-align:left">(オプション) uri名。デフォルトは "http://127.0.0.1:19530"。</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-トークン</td><td style="text-align:left">(オプション) zillizクラウドのapikeyまたは<code translate="no">username:password</code> 。 デフォルトは「None」です。</td></tr>
<tr><td style="text-align:left">-tls</td><td style="text-align:left">-tlsmode</td><td style="text-align:left">(オプション) TLSモードを設定します：0 (暗号化なし)、1 (一方向暗号化)、2 (双方向暗号化は未サポート)。デフォルトは0。</td></tr>
<tr><td style="text-align:left">-cert</td><td style="text-align:left">-cert</td><td style="text-align:left">(オプション) クライアント証明書ファイルへのパス。一方向暗号化で動作</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<p><h3 id="connect">例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; connect -uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-Database" class="common-anchor-header">データベース作成<button data-href="#create-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusでデータベースを作成する。</p>
<p><h3 id="create-database">構文</h3></p>
<pre><code translate="no" class="language-shell">create database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">オプション</h3><table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-データベース名</td><td style="text-align:left">[必須] milvusでのデータベース名。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">例</h3><h4 id="Example-1" class="common-anchor-header">例</h4><p>次の例では、milvusにデータベース<code translate="no">testdb</code> を作成しています。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="use-Database" class="common-anchor-header">データベース使用<button data-href="#use-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>milvusでデータベースを使用する。</p>
<p><h3 id="use-database">構文</h3></p>
<pre><code translate="no" class="language-shell">use database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">オプション</h3><table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-データベース名</td><td style="text-align:left">[必須] milvusでのデータベース名。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">例</h3><h4 id="Example-1" class="common-anchor-header">例</h4><p>以下の例では、milvusのデータベース<code translate="no">testdb</code> 。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; use database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-Databases" class="common-anchor-header">リスト データベース<button data-href="#list-Databases" class="anchor-icon" translate="no">
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
    </button></h2><p>milvusのデータベースをリストアップする。</p>
<p><h3 id="list-database">構文</h3></p>
<pre><code translate="no" class="language-shell">list databases
<button class="copy-code-btn"></button></code></pre>
<h3 id="Examples" class="common-anchor-header">例</h3><h4 id="Example-1" class="common-anchor-header">例 1</h4><p>次の例はmilvusのデータベースをリストアップします。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; list databases
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-Database" class="common-anchor-header">データベース削除<button data-href="#delete-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>milvusのデータベースを削除する。</p>
<p><h3 id="delete-database">構文</h3></p>
<pre><code translate="no" class="language-shell">delete database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">オプション</h3><table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-データベース名</td><td style="text-align:left">[必須] milvusでのデータベース名。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">例</h3><h4 id="Example-1" class="common-anchor-header">例</h4><p>次の例では、milvusのデータベース<code translate="no">testdb</code> を削除しています。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete database -db testdb

Warning! You are trying to delete the database. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-user" class="common-anchor-header">ユーザ作成<button data-href="#create-user" class="anchor-icon" translate="no">
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
    </button></h2><p>milvusにユーザを作成する。</p>
<p><h3 id="create-user">構文</h3></p>
<pre><code translate="no" class="language-shell">create user -u (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">オプション</h3><table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-パスワード</td><td style="text-align:left">milvusのユーザーパスワード。デフォルトは "None" です。</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-ユーザー名</td><td style="text-align:left">milvusでのユーザー名。デフォルトは "None" です。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">例</h3><h4 id="Example-1" class="common-anchor-header">例</h4><p>次の例では、milvusにユーザー<code translate="no">zilliz</code> 、パスワード<code translate="no">zilliz</code> 。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create user -u zilliz -p zilliz
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-role" class="common-anchor-header">ロールの作成<button data-href="#create-role" class="anchor-icon" translate="no">
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
    </button></h2><p>milvusにロールを作成する。</p>
<p><h3 id="create-role">構文</h3></p>
<pre><code translate="no" class="language-shell">create role -r (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">オプション</h3><table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-ロール名</td><td style="text-align:left">milvusロールのロール名。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">例</h3><h4 id="Example-1" class="common-anchor-header">例1</h4><p>次の例では、milvusに<code translate="no">role1</code> というロールを作成します。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create role -r role1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-alias" class="common-anchor-header">エイリアスの作成<button data-href="#create-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションに一意のエイリアスを指定します。</p>
<div class="alert note">コレクションは複数のエイリアスを持つことができます。ただし、エイリアスは最大1つのコレクションに対応します。</div>
<p><h3 id="create-alias">構文</h3></p>
<pre><code translate="no" class="language-shell">create alias -c (text) -a (text) [-A]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-alias">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">コレクションの名前。</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-エイリアス名</td><td style="text-align:left">別名。</td></tr>
<tr><td style="text-align:left">-A</td><td style="text-align:left">-alter</td><td style="text-align:left">(オプション) 別名を指定したコレクションに転送するフラグ。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<p><h3 id="create-alias">例</h3></p>
<p><h4>例 1</h4></p>
<p>次の例は、<code translate="no">car</code> コレクションの<code translate="no">carAlias1</code> と<code translate="no">carAlias2</code> エイリアスを作成します。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create alias -c car -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<p><h4>例 2</h4></p>
<div class="alert note">例2は、例1に基づいています。</div>
<p>次の例は、<code translate="no">carAlias1</code> エイリアスを<code translate="no">car</code> コレクションから<code translate="no">car2</code> コレクションに転送します。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create alias -c car2 -A -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-collection" class="common-anchor-header">コレクションの作成<button data-href="#create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションを作成する。</p>
<p><h3 id="create-collection">構文</h3></p>
<pre><code translate="no" class="language-shell">create collection
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-collection">対話的な例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create collection

Please input collection name: car
Please input auto id [False]: False
Please input description []: car collection
Is support dynamic field [False]: False
Please input consistency level(Strong(0),Bounded(1), Session(2), and Eventually(3)) [1]: 1
Please input shards number [1]: 1

Field name: id
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): INT64
Field description []: primary key
Is id the primary key? [y/N]: y

Field name: vector
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): FLOAT_VECTOR
Field description []: vector field
Dimension: 128

Field name: color
Field type (INT64, VARCHAR, FLOAT_VECTOR, etc.): INT64
Field description []: color field
Nullable [False]: False
Default value (type: INT64) [Not set]: 0

Do you want to add embedding function? [y/N]: n
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-partition" class="common-anchor-header">パーティションの作成<button data-href="#create-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>パーティションを作成する。</p>
<p><h3 id="creat-partition">構文</h3></p>
<pre><code translate="no" class="language-shell">create partition -c (text) -p (text) [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-partition">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">コレクションの名前。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-パーティション</td><td style="text-align:left">パーティション名。</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">-パーティション名。</td><td style="text-align:left">(オプション）パーティションの説明。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示する。</td></tr>
</tbody>
</table>
<p><h3 id="creat-partition">例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create partition -c car -p new_partition -d test_add_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-index" class="common-anchor-header">インデックスの作成<button data-href="#create-index" class="anchor-icon" translate="no">
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
    </button></h2><p>フィールドのインデックスを作成します。</p>
<div class="alert note">現在、コレクションは最大1つのインデックスをサポートしています。</div>
<p><h3 id="creat-index">構文</h3></p>
<pre><code translate="no" class="language-shell">create index
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-index">対話的な例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create index

Collection name (car, car2): car2
The name of the field to create an index for (vector): vector
Index name: vectorIndex
Index type (FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY, AUTOINDEX, DISKANN, GPU_IVF_FLAT, GPU_IVF_PQ, SPARSE_INVERTED_INDEX, SCANN, STL_SORT, Trie, INVERTED): IVF_FLAT
Vector Index metric type (L2, IP, HAMMING, TANIMOTO, COSINE): L2
Index params nlist: 2
Timeout []:
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-user" class="common-anchor-header">削除ユーザ<button data-href="#delete-user" class="anchor-icon" translate="no">
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
    </button></h2><p>ユーザを削除します。</p>
<h3 id="Syntax" class="common-anchor-header">構文</h3><pre><code translate="no" class="language-shell">delete user -u (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">オプション</h3><table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-ユーザー名</td><td style="text-align:left">ユーザー名。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h3 id="Example" class="common-anchor-header">例</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; delete user -u zilliz

Warning! You are trying to delete the user in milvus. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-role" class="common-anchor-header">ロール削除<button data-href="#delete-role" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusのロールを削除する。</p>
<p><h3 id="delete-role">構文</h3></p>
<pre><code translate="no" class="language-shell">delete role -r (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">オプション</h3><table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-ロール名</td><td style="text-align:left">milvusロールのロール名。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">例</h3><p>次の例では、milvusのロール<code translate="no">role1</code> を削除しています。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete role -r role1
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-alias" class="common-anchor-header">エイリアス削除<button data-href="#delete-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>エイリアスを削除します。</p>
<p><h3 id="delete-alias">構文</h3></p>
<pre><code translate="no" class="language-shell">delete alias -a (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-alias">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-エイリアス名</td><td style="text-align:left">別名。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h2 id="delete-collection" class="common-anchor-header">コレクション削除<button data-href="#delete-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションを削除します。</p>
<p><h3 id="delete-collection">構文</h3></p>
<pre><code translate="no" class="language-shell">delete collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-collection">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">削除するコレクションの名前。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<p><h3 id="delete-collection">例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete collection -c car

Warning! You are trying to delete the collection. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-entities" class="common-anchor-header">エンティティを削除する<button data-href="#delete-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>エンティティを削除する。</p>
<p><h3 id="delete-entities">構文</h3></p>
<pre><code translate="no">delete entities -c (<span class="hljs-selector-tag">text</span>) -<span class="hljs-selector-tag">p</span> (<span class="hljs-selector-tag">text</span>)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-entities">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">削除するエンティティが属するコレクションの名前。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-パーティション</td><td style="text-align:left">(オプション）削除するパーティション名。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示する。</td></tr>
</tbody>
</table>
<p><h3 id="delete-entities">例</h3></p>
<pre><code translate="no">milvus_cli &gt; delete entities -c car

The expression <span class="hljs-keyword">to</span> specify entities <span class="hljs-keyword">to</span> be deleted, such <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;film_id in [ 0, 1 ]&quot;</span>: film_id <span class="hljs-keyword">in</span> [ <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ]

Warning! You are trying <span class="hljs-keyword">to</span> delete the entities <span class="hljs-keyword">of</span> collection. This action cannot be undone!
<span class="hljs-keyword">Do</span> you want <span class="hljs-keyword">to</span> <span class="hljs-keyword">continue</span>? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-partition" class="common-anchor-header">パーティション削除<button data-href="#delete-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>パーティションを削除します。</p>
<p><h3 id="delete-partition">構文</h3></p>
<pre><code translate="no" class="language-shell">delete partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-partition">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">削除するパーティションが属するコレクションの名前。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-パーティション</td><td style="text-align:left">削除するパーティション名。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示する。</td></tr>
</tbody>
</table>
<p><h3 id="delete-partition">例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete partition -c car -p new_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-index" class="common-anchor-header">インデックスの削除<button data-href="#delete-index" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックスと対応するインデックスファイルを削除します。</p>
<div class="alert note">現在、コレクションは最大1つのインデックスをサポートしています。</div>
<p><h3 id="delete-index">構文</h3></p>
<pre><code translate="no" class="language-shell">delete index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">コレクションの名前。</td></tr>
<tr><td style="text-align:left">-in</td><td style="text-align:left">-インデックス名</td><td style="text-align:left">インデックス名。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示する。</td></tr>
</tbody>
</table>
<p><h3 >例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete index -c car -in indexName

Warning! You are trying to delete the index of collection. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="grant-role" class="common-anchor-header">ロールの付与<button data-href="#grant-role" class="anchor-icon" translate="no">
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
    </button></h2><p>ユーザにロールを付与する</p>
<p><h3 id="grant-user">構文</h3></p>
<pre><code translate="no" class="language-shell">grant role -r (text) -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-ロール名</td><td style="text-align:left">milvusロールのロール名。</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-ユーザー名</td><td style="text-align:left">milvusユーザーのユーザー名。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<p><h3 >例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; grant role -r role1 -u user1
<button class="copy-code-btn"></button></code></pre>
<h2 id="grant-privilege" class="common-anchor-header">権限付与<button data-href="#grant-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>ロールに権限を割り当てます。</p>
<p><h3 id="assign-privilege">構文</h3></p>
<pre><code translate="no" class="language-shell">grant privilege
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="assign-privilege">対話的な例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; grant privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-role" class="common-anchor-header">ロールの取り消し<button data-href="#revoke-role" class="anchor-icon" translate="no">
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
    </button></h2><p>ユーザに割り当てられたロールを取り消します。</p>
<p><h3 id="grant-user">構文</h3></p>
<pre><code translate="no" class="language-shell">revoke role -r (text) -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-ロール名</td><td style="text-align:left">milvusロールのロール名。</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-ユーザー名</td><td style="text-align:left">milvusユーザーのユーザー名。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<p><h3 >例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; revoke role -r role1 -u user1
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-privilege" class="common-anchor-header">権限を取り消す<button data-href="#revoke-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>既にロールに割り当てられている権限を取り消します。</p>
<p><h3 id="revoke-privilege">構文</h3></p>
<pre><code translate="no" class="language-shell">revoke privilege
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="revoke-privilege">対話例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; revoke privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-collection" class="common-anchor-header">ショーコレクション<button data-href="#show-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションの詳細情報を表示します。</p>
<p><h3 id="show-collection">構文</h3></p>
<pre><code translate="no" class="language-shell">show collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">コレクションの名前。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<p><h3>例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show collection -c test_collection_insert
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-partition" class="common-anchor-header">show partition<button data-href="#show-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>パーティションの詳細情報を表示します。</p>
<p><h3 id="show-partition">構文</h3></p>
<pre><code translate="no" class="language-shell">show partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">パーティションが属するコレクションの名前。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-パーティション</td><td style="text-align:left">パーティションの名前。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示する。</td></tr>
</tbody>
</table>
<p><h3>例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show partition -c test_collection_insert -p _default
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-index" class="common-anchor-header">ショー・インデックス<button data-href="#show-index" class="anchor-icon" translate="no">
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
    </button></h2><p>インデックスの詳細情報を表示します。</p>
<p><h3 id="show-index">構文</h3></p>
<pre><code translate="no" class="language-shell">show index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">コレクションの名前。</td></tr>
<tr><td style="text-align:left">-in</td><td style="text-align:left">-インデックス名</td><td style="text-align:left">インデックスの名前。</td></tr>
</tbody>
</table>
<p>| --help | n/a | コマンドの使用に関するヘルプを表示します。|</p>
<p><h3 >例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show index -c test_collection -in index_name
<button class="copy-code-btn"></button></code></pre>
<h2 id="exit" class="common-anchor-header">終了<button data-href="#exit" class="anchor-icon" translate="no">
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
    </button></h2><p>コマンドラインウィンドウを閉じます。</p>
<p><h3 id="exit">構文</h3></p>
<pre><code translate="no" class="language-shell">exit
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="exit">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h2 id="help" class="common-anchor-header">ヘルプ<button data-href="#help" class="anchor-icon" translate="no">
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
    </button></h2><p>コマンドの使用に関するヘルプを表示します。</p>
<p><h3 id="help">構文</h3></p>
<pre><code translate="no" class="language-shell">help &lt;command&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="help">コマンド</h3></p>
<table>
<thead>
<tr><th style="text-align:left">コマンド</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">クリア</td><td style="text-align:left">画面を消去します。</td></tr>
<tr><td style="text-align:left">接続</td><td style="text-align:left">Milvusに接続します。</td></tr>
<tr><td style="text-align:left">作成</td><td style="text-align:left">コレクション、データベース、パーティション、ユーザ、ロール、インデックスを作成する。</td></tr>
<tr><td style="text-align:left">グラント</td><td style="text-align:left">ロール、権限を付与する。</td></tr>
<tr><td style="text-align:left">取り消す</td><td style="text-align:left">ロール、権限を取り消します。</td></tr>
<tr><td style="text-align:left">削除</td><td style="text-align:left">コレクション、データベース、パーティション、エイリアス、ユーザ、ロール、インデックスを削除します。</td></tr>
<tr><td style="text-align:left">終了</td><td style="text-align:left">コマンドラインウィンドウを閉じます。</td></tr>
<tr><td style="text-align:left">ヘルプ</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
<tr><td style="text-align:left">インサート</td><td style="text-align:left">パーティションにデータをインポートします。</td></tr>
<tr><td style="text-align:left">リスト</td><td style="text-align:left">コレクション、データベース、パーティション、ユーザ、ロール、グラント、インデックスをリストします。</td></tr>
<tr><td style="text-align:left">ロード</td><td style="text-align:left">コレクションまたはパーティションをロードします。</td></tr>
<tr><td style="text-align:left">クエリ</td><td style="text-align:left">入力したすべての条件に一致するクエリ結果を表示します。</td></tr>
<tr><td style="text-align:left">リリース</td><td style="text-align:left">コレクションまたはパーティションをリリースします。</td></tr>
<tr><td style="text-align:left">検索</td><td style="text-align:left">ベクトル類似検索またはハイブリッド検索を実行します。</td></tr>
<tr><td style="text-align:left">表示</td><td style="text-align:left">接続、データベース、コレクション、loading_progress または index_progress を表示します。</td></tr>
<tr><td style="text-align:left">rename</td><td style="text-align:left">コレクションの名前を変更します。</td></tr>
<tr><td style="text-align:left">use</td><td style="text-align:left">データベースを使用する</td></tr>
<tr><td style="text-align:left">バージョン</td><td style="text-align:left">Milvus_CLI のバージョンを表示します。</td></tr>
</tbody>
</table>
<h2 id="insert" class="common-anchor-header">インサート<button data-href="#insert" class="anchor-icon" translate="no">
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
    </button></h2><p>ローカルまたはリモートのデータをパーティションにインポートします。</p>
<p><h3 id="insert">構文</h3></p>
<pre><code translate="no" class="language-shell">insert file -c (text) [-p (text)] [-t (text)] &lt;file_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">データを挿入するコレクションの名前。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-パーティション</td><td style="text-align:left">(オプション）データを挿入するパーティション名。このパーティション・オプションを渡さないと、"_default" パーティションを選択することになります。</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-タイムアウト</td><td style="text-align:left">(オプション) RPCに必要な時間を秒単位で指定します。timeoutが設定されていない場合、クライアントはサーバーが応答するかエラーが発生するまで待ち続けます。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<p><h3 id="insert">例 1</h3>
以下の例では、ローカルのCSVファイルをインポートします。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert file -c car &#x27;examples/import_csv/vectors.csv&#x27;

Reading csv file...  [####################################]  100%

Column names are [&#x27;vector&#x27;, &#x27;color&#x27;, &#x27;brand&#x27;]

Processed 50001 lines.

Inserting ...

Insert successfully.
--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert">例 2</h3>
以下の例では、リモートのCSVファイルをインポートします。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert file -c car &#x27;https://raw.githubusercontent.com/milvus-
io/milvus_cli/main/examples/import_csv/vectors.csv&#x27;

Reading file from remote URL.

Reading csv file...  [####################################]  100%

Column names are [&#x27;vector&#x27;, &#x27;color&#x27;, &#x27;brand&#x27;]

Processed 50001 lines.

Inserting ...

Insert successfully.

--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<h2 id="insert-row" class="common-anchor-header">行挿入<button data-href="#insert-row" class="anchor-icon" translate="no">
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
    </button></h2><p>データの行をコレクションに挿入します。</p>
<p><h3 id="insert-row">構文</h3></p>
<pre><code translate="no" class="language-shell">insert row
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert-row">対話的な例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert row

Collection name: car
Partition name [_default]: _default
Enter value for id (INT64): 1
Enter value for vector (FLOAT_VECTOR): [1.0, 2.0, 3.0]
Enter value for color (INT64): 100
Enter value for brand (VARCHAR): Toyota

Inserted successfully.
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-users" class="common-anchor-header">list users<button data-href="#list-users" class="anchor-icon" translate="no">
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
    </button></h2><p>すべてのユーザーをリストします。</p>
<h3 id="Syntax" class="common-anchor-header">構文</h3><pre><code translate="no" class="language-shell">list users
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">オプション</h3><p>| オプション | フルネーム | 説明 | --help | n/a | コマンドの使用に関するヘルプを表示します。|</p>
<h2 id="List-roles" class="common-anchor-header">ロールのリスト<button data-href="#List-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusのロールをリストアップする。</p>
<p><h3 id="list-role">構文</h3></p>
<pre><code translate="no" class="language-shell">list roles
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">オプション</h3><table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">例</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; list roles
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-grants" class="common-anchor-header">補助金の一覧表示<button data-href="#List-grants" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvusのグラント一覧を表示する。</p>
<h3 id="Options" class="common-anchor-header">オプション</h3><table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">正式名称</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-ロール名</td><td style="text-align:left">milvusロールのロール名。</td></tr>
<tr><td style="text-align:left">-o</td><td style="text-align:left">-オブジェクト名</td><td style="text-align:left">milvus オブジェクトのオブジェクト名。</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-オブジェクトタイプ</td><td style="text-align:left">グローバル、コレクションまたはユーザー。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">例</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; list grants -r role1 -o object1 -t Collection
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-collections" class="common-anchor-header">コレクションをリストする<button data-href="#list-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>すべてのコレクションを一覧表示します。</p>
<p><h3 id="list-collections">構文<h3></p>
<pre><code translate="no" class="language-shell">list collections
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-collections">オプション<h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h2 id="list-indexes" class="common-anchor-header">list indexes<button data-href="#list-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションのすべてのインデックスを一覧表示します。</p>
<div class="alert note">現在、コレクションは最大1つのインデックスをサポートしています。 </div>
<p><h3 id="list-indexes">構文</h3></p>
<pre><code translate="no" class="language-shell">list indexes -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-indexes">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">コレクションの名前。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示する。</td></tr>
</tbody>
</table>
<h2 id="list-partitions" class="common-anchor-header">list partitions<button data-href="#list-partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションのすべてのパーティションをリストする。</p>
<p><h3 id="list-partitions">構文</h3></p>
<pre><code translate="no" class="language-shell">list partitions -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-partitions">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">コレクションの名前。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示する。</td></tr>
</tbody>
</table>
<h2 id="load" class="common-anchor-header">ロード<button data-href="#load" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションまたはパーティションをハードドライブ領域からRAMにロードします。</p>
<p><h3 id="load">構文</h3></p>
<pre><code translate="no" class="language-shell">load collection -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="load">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">パーティションが属するコレクションの名前。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-パーティション</td><td style="text-align:left">(オプション/複数) パーティションの名前。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示する。</td></tr>
</tbody>
</table>
<h2 id="query" class="common-anchor-header">クエリ<button data-href="#query" class="anchor-icon" translate="no">
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
    </button></h2><p>入力したすべての条件に一致するクエリ結果を表示します。</p>
<p><h3 id="query">構文</h3></p>
<pre><code translate="no" class="language-shell">query
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="query">対話型 例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: id in [ 428960801420883491, 428960801420883492, 428960801420883493 ]

Name of partitions that contain entities(split by &quot;,&quot; if multiple) []: default

A list of fields to return(split by &quot;,&quot; if multiple) []: color, brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date. [0]:

Graceful time. Only used in bounded consistency level. If graceful_time is set, PyMilvus will use current timestamp minus the graceful_time as the guarantee_timestamp. This option is 5s by default if not set. [5]:
<button class="copy-code-btn"></button></code></pre>
<h2 id="release" class="common-anchor-header">リリース<button data-href="#release" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションまたはパーティションを RAM から解放します。</p>
<p><h3 id="release">構文</h3></p>
<pre><code translate="no" class="language-shell">release collection -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="release">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">パーティションが属するコレクションの名前。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-パーティション</td><td style="text-align:left">(オプション/複数) パーティションの名前。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示する。</td></tr>
</tbody>
</table>
<h2 id="search" class="common-anchor-header">検索<button data-href="#search" class="anchor-icon" translate="no">
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
    </button></h2><p>ベクトル類似検索またはハイブリッド検索を実行する。</p>
<p><h3 id="search">構文</h3></p>
<pre><code translate="no" class="language-shell">search
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="search">対話的な例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; search

Collection name (car, test_collection): car

The vectors of search data(the length of data is number of query (nq), the dim of every vector in data must be equal to vector field&#x27;s of collection. You can also import a csv file without headers): examples/import_csv/search_vectors.csv

The vector field used to search of collection (vector): vector

Search parameter nprobe&#x27;s value: 10

The max number of returned record, also known as topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to search (split by &quot;,&quot; if multiple) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee Timestamp(It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date) [0]:
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-connection" class="common-anchor-header">リスト接続<button data-href="#list-connection" class="anchor-icon" translate="no">
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
    </button></h2><p>接続の一覧を表示します。</p>
<p><h3 id="show-connection">構文</h3></p>
<pre><code translate="no" class="language-shell">list connections
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-connection">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h2 id="show-indexprogress" class="common-anchor-header">show index_progress<button data-href="#show-indexprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>エンティティのインデックス作成の進行状況を表示します。</p>
<p><h3 id="show-index-progress">構文</h3></p>
<pre><code translate="no" class="language-shell">show index_progress -c (text) [-i (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-index-progress">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">エンティティが属するコレクションの名前。</td></tr>
<tr><td style="text-align:left">-i</td><td style="text-align:left">-インデックス</td><td style="text-align:left">(オプション) インデックスの名前。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示する。</td></tr>
</tbody>
</table>
<h2 id="show-loadingprogress" class="common-anchor-header">show loading_progress<button data-href="#show-loadingprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションのロードの進行状況を表示します。</p>
<p><h3 id="show-loading-progress">構文</h3></p>
<pre><code translate="no" class="language-shell">show loading_progress -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-loading-progress">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">エンティティが属するコレクションの名前。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-パーティション</td><td style="text-align:left">(オプション/複数) ロード・パーティションの名前。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示する。</td></tr>
</tbody>
</table>
<h2 id="version" class="common-anchor-header">バージョン<button data-href="#version" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus_CLIのバージョンを表示します。</p>
<p><h3 id="version">構文</h3></p>
<pre><code translate="no" class="language-shell">version
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="version">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<div class="alert note">以下の例のように、シェルでMilvus_CLIのバージョンを確認することもできます。この場合、<code translate="no">milvus_cli --version</code> がコマンドとして機能します。</div>
<p><h3 id="version">例</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">milvus_cli --version</span>
Milvus_CLI v0.4.0
<button class="copy-code-btn"></button></code></pre>
