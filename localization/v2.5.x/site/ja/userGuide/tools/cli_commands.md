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
    </button></h1><p>Milvusコマンドラインインタフェース(CLI)はデータベース接続、データ操作、データのインポート/エクスポートをサポートするコマンドラインツールです。</p>
<p>このトピックでは、サポートされているすべてのコマンドと対応するオプションを紹介します。また、参考のためにいくつかの例も含まれています。</p>
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
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="connect">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-uri</td><td style="text-align:left">-uri</td><td style="text-align:left">(オプション) uri名。デフォルトは &quot;http://127.0.0.1:19530&quot;。</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-トークン</td><td style="text-align:left">(オプション) zillizクラウドのapikeyまたは<code translate="no">username:password</code> 。デフォルトはNoneです。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<p><h3 id="connect">例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; connect -uri <span class="hljs-attr">http</span>:<span class="hljs-comment">//127.0.0.1:19530 </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-Database" class="common-anchor-header">データベースの作成<button data-href="#create-Database" class="anchor-icon" translate="no">
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
<tr><td style="text-align:left">-db</td><td style="text-align:left">-データベース</td><td style="text-align:left">[必須] milvusでのデータベース名。</td></tr>
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
<tr><td style="text-align:left">-db</td><td style="text-align:left">-データベース</td><td style="text-align:left">[必須] milvusでのデータベース名。</td></tr>
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
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> database -<span class="hljs-title function_">db</span> (text) 
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">オプション</h3><table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-データベース</td><td style="text-align:left">[必須] milvusでのデータベース名。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">例</h3><h4 id="Example-1" class="common-anchor-header">例</h4><p>次の例では、milvusのデータベース<code translate="no">testdb</code> を削除しています。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> database -db testdb
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
<tr><td style="text-align:left">-p</td><td style="text-align:left">-パスワード</td><td style="text-align:left">milvusのユーザーパスワード。デフォルトは &quot;None&quot;。</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-ユーザー名</td><td style="text-align:left">milvusでのユーザー名。デフォルトは &quot;None&quot; です。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">例</h3><h4 id="Example-1" class="common-anchor-header">例</h4><p>次の例では、milvusにユーザー<code translate="no">zilliz</code> 、パスワード<code translate="no">zilliz</code> を作成します。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create user -u zilliz -p zilliz
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
<pre><code translate="no" class="language-shell">create <span class="hljs-built_in">alias</span> -c (text) -a (text) [-A] 
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
<pre><code translate="no" class="language-shell">milvus_cli &gt; create <span class="hljs-built_in">alias</span> -c car -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<p><h4>例 2</h4></p>
<div class="alert note">例2は、例1に基づいています。</div>
<p>次の例は、<code translate="no">carAlias1</code> エイリアスを<code translate="no">car</code> コレクションから<code translate="no">car2</code> コレクションに転送します。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create <span class="hljs-built_in">alias</span> -c car2 -A -a carAlias1
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
<pre><code translate="no" class="language-shell">create collection -c (text) -f (text) -p (text) [-a] [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-collection">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">コレクションの名前。</td></tr>
<tr><td style="text-align:left">-f</td><td style="text-align:left">-スキーマ・フィールド</td><td style="text-align:left">(複数可）<code translate="no">&lt;fieldName&gt;:&lt;dataType&gt;:&lt;dimOfVector/desc&gt;</code> 形式のフィールド・スキーマ。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-schema-primary-field</td><td style="text-align:left">主キー・フィールドの名前。</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-schema-auto-id</td><td style="text-align:left">(オプション）IDを自動的に生成するフラグ。</td></tr>
<tr><td style="text-align:left">-desc</td><td style="text-align:left">-schema-description</td><td style="text-align:left">(オプション) コレクションの説明。</td></tr>
<tr><td style="text-align:left">-level</td><td style="text-align:left">-consistency-level</td><td style="text-align:left">(オプション) 整合性レベル：Bounded、Session、Strong、Eventual。</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">-is-dynamic</td><td style="text-align:left">(オプション) コレクション・スキーマがダイナミック・フィールドをサポートするかどうか。</td></tr>
<tr><td style="text-align:left">-s</td><td style="text-align:left">-shards-num</td><td style="text-align:left">(オプション) シャード番号</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<p><h3 id="create-collection">例</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment">## For array field: --schema-field support &lt;fieldName&gt;:&lt;dataType&gt;:&lt;maxCapacity&gt;:&lt;elementDataType&gt;(:&lt;maxLength&gt;if Varchar)</span>

milvus_cli &gt; create collection -c car -f <span class="hljs-built_in">id</span>:INT64:primary_field -f vector:FLOAT_VECTOR:<span class="hljs-number">128</span> -f color:INT64:color -f brand:ARRAY:<span class="hljs-number">64</span>:VARCHAR:<span class="hljs-number">128</span> -p <span class="hljs-built_in">id</span> -A -d <span class="hljs-string">&#x27;car_collection&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-partition" class="common-anchor-header">パーティション作成<button data-href="#create-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>パーティションを作成します。</p>
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
<p><h3 id="creat-index">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<p><h3 id="creat-index">例</h3></p>
<p>フィールドのインデックスを作成し、必要な入力を求めるプロンプトを表示する：</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create index

Collection name (car, car2): car2

The name of the field to create an index <span class="hljs-keyword">for</span> (vector): vector

Index name: vectorIndex

<span class="hljs-comment"># Default is &#x27;&#x27;</span>
Index <span class="hljs-built_in">type</span> FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY, AUTOINDEX, DISKANN, GPU_IVF_FLAT, GPU_IVF_PQ, SPARSE_INVERTED_INDEX, SPARSE_WAND, SCANN, STL_SORT, Trie, INVERTED, ) []: IVF_FLAT  

<span class="hljs-comment"># Default is &#x27;&#x27;</span>
Index metric <span class="hljs-built_in">type</span> (L2, IP, HAMMING, TANIMOTO, COSINE, ) []: 

Timeout []:
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-user" class="common-anchor-header">delete user<button data-href="#delete-user" class="anchor-icon" translate="no">
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
<h3 id="Syntax" class="common-anchor-header">構文</h3><pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> user -<span class="hljs-title function_">u</span> (text)
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
<h3 id="Example" class="common-anchor-header">例</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> user -u zilliz
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
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> alias -<span class="hljs-title function_">a</span> (text) 
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-alias">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-エイリアス名</td><td style="text-align:left">別名。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
<tr><td style="text-align:left"></td></tr>
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
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> collection -<span class="hljs-title function_">c</span> (text) 
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
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> collection -c car
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
<pre><code translate="no"><span class="hljs-keyword">delete</span> entities -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">p</span> (text) 
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
<pre><code translate="no">milvus_cli &gt; <span class="hljs-keyword">delete</span> entities -c car

<span class="hljs-title class_">The</span> expression to specify entities to be deleted, such <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;film_id in [ 0, 1 ]&quot;</span>: film_id <span class="hljs-keyword">in</span> [ <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ]

<span class="hljs-title class_">You</span> are trying to <span class="hljs-keyword">delete</span> the entities <span class="hljs-keyword">of</span> collection. <span class="hljs-title class_">This</span> action cannot be undone!

<span class="hljs-title class_">Do</span> you want to <span class="hljs-keyword">continue</span>? [y/N]: y
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
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> partition -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">p</span> (text)
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
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> partition -c car -p new_partition
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
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> index -<span class="hljs-title function_">c</span> (text) -<span class="hljs-title function_">in</span> (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-index">オプション</h3></p>
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
<p><h3 id="delete-index">例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">delete</span> index -c car -<span class="hljs-keyword">in</span> indexName
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
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">exit</span>
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
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">help</span> &lt;<span class="hljs-built_in">command</span>&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="help">コマンド</h3></p>
<table>
<thead>
<tr><th style="text-align:left">コマンド</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">クリア</td><td style="text-align:left">画面を消去します。</td></tr>
<tr><td style="text-align:left">接続</td><td style="text-align:left">Milvusに接続します。</td></tr>
<tr><td style="text-align:left">作成</td><td style="text-align:left">コレクション、データベース、パーティション、ユーザ、インデックスを作成する。</td></tr>
<tr><td style="text-align:left">削除</td><td style="text-align:left">コレクション、データベース、パーティション、エイリアス、ユーザ、インデックスを削除します。</td></tr>
<tr><td style="text-align:left">終了</td><td style="text-align:left">コマンドラインウィンドウを閉じます。</td></tr>
<tr><td style="text-align:left">ヘルプ</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
<tr><td style="text-align:left">インサート</td><td style="text-align:left">パーティションにデータをインポートします。</td></tr>
<tr><td style="text-align:left">リスト</td><td style="text-align:left">コレクション、データベース、パーティション、ユーザ、インデックスをリストします。</td></tr>
<tr><td style="text-align:left">ロード</td><td style="text-align:left">コレクションやパーティションをロードします。</td></tr>
<tr><td style="text-align:left">クエリ</td><td style="text-align:left">入力したすべての条件に一致するクエリ結果を表示します。</td></tr>
<tr><td style="text-align:left">リリース</td><td style="text-align:left">コレクションまたはパーティションをリリースします。</td></tr>
<tr><td style="text-align:left">検索</td><td style="text-align:left">ベクトル類似検索またはハイブリッド検索を実行します。</td></tr>
<tr><td style="text-align:left">表示</td><td style="text-align:left">接続、データベース、コレクション、loading_progress または index_progress を表示します。</td></tr>
<tr><td style="text-align:left">rename</td><td style="text-align:left">コレクションの名前を変更します。</td></tr>
<tr><td style="text-align:left">use</td><td style="text-align:left">データベースを使用する</td></tr>
<tr><td style="text-align:left">バージョン</td><td style="text-align:left">Milvus_CLIのバージョンを表示します。</td></tr>
</tbody>
</table>
<h2 id="import" class="common-anchor-header">インポート<button data-href="#import" class="anchor-icon" translate="no">
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
<p><h3 id="import">構文</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">import</span> -<span class="hljs-title function_">c</span> (text)[-<span class="hljs-title function_">p</span> (text)] &lt;file_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="import">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">データを挿入するコレクションの名前。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-パーティション</td><td style="text-align:left">(オプション）データを挿入するパーティション名。このパーティション・オプションを渡さないと、"_default" パーティションを選択することになります。</td></tr>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示する。</td></tr>
</tbody>
</table>
<p><h3 id="import">例1</h3>
次の例は、ローカルのCSVファイルをインポートします。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-keyword">import</span> -c car <span class="hljs-string">&#x27;examples/import_csv/vectors.csv&#x27;</span>

Reading csv file...  [<span class="hljs-comment">####################################]  100%</span>

Column names are [<span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-string">&#x27;brand&#x27;</span>]

Processed <span class="hljs-number">50001</span> lines.

Inserting ...

Insert successfully.
--------------------------  ------------------
Total insert entities:                   <span class="hljs-number">50000</span>
Total collection entities:              <span class="hljs-number">150000</span>
Milvus timestamp:           <span class="hljs-number">428849214449254403</span>
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="import">例 2</h3>
次の例は、リモートの CSV ファイルをインポートします。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; import -c car <span class="hljs-string">&#x27;https://raw.githubusercontent.com/milvus-
io/milvus_cli/main/examples/import_csv/vectors.csv&#x27;</span>

Reading file from remote URL.

Reading csv file...  [####################################]  100%

Column names are [<span class="hljs-string">&#x27;vector&#x27;</span>, <span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-string">&#x27;brand&#x27;</span>]

Processed 50001 lines.

Inserting ...

Insert successfully.

--------------------------  ------------------
Total insert entities:                   50000
Total collection entities:              150000
Milvus timestamp:           428849214449254403
--------------------------  ------------------
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-users" class="common-anchor-header">ユーザ一覧<button data-href="#list-users" class="anchor-icon" translate="no">
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
    </button></h2><p>すべてのユーザーを一覧表示します。</p>
<h3 id="Syntax" class="common-anchor-header">構文</h3><pre><code translate="no" class="language-shell">list <span class="hljs-built_in">users</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">オプション</h3><p>| オプション | フルネーム | 説明 | --help | n/a | コマンドの使用に関するヘルプを表示します。|</p>
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
<pre><code translate="no" class="language-shell">load -c (text) [-p (text)]
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
<p><h3 id="query">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<p><h3 id="query">例</h3>
<h4 id="query">例1</h4></p>
<p>クエリを実行し、必要な入力を求めるプロンプトを表示する：</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: id <span class="hljs-keyword">in</span> [ <span class="hljs-number">428960801420883491</span>, <span class="hljs-number">428960801420883492</span>,
<span class="hljs-number">428960801420883493</span> ]

<span class="hljs-function">Name of partitions that contain <span class="hljs-title">entities</span>(<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) []:
<span class="hljs-literal">default</span>

A list of fields to <span class="hljs-title">return</span>(<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) []: color, brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date. [0]:
Graceful time. Only used <span class="hljs-keyword">in</span> bounded consistency level. If graceful_time <span class="hljs-keyword">is</span> <span class="hljs-keyword">set</span>, PyMilvus will use current timestamp minus the graceful_time <span class="hljs-keyword">as</span> the guarantee_timestamp. This option <span class="hljs-keyword">is</span> 5s <span class="hljs-keyword">by</span> <span class="hljs-literal">default</span> <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> <span class="hljs-keyword">set</span>. [5]:
</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="query">例 2</h4></p>
<p>クエリを実行し、必要な入力を求めるプロンプトを表示する：</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: <span class="hljs-built_in">id</span> &gt; <span class="hljs-number">428960801420883491</span>

Name of partitions that contain entities(split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) []:
default

A <span class="hljs-built_in">list</span> of fields to <span class="hljs-keyword">return</span>(split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) []: <span class="hljs-built_in">id</span>, color,
brand

timeout []:

Guarantee timestamp. This instructs Milvus to see <span class="hljs-built_in">all</span> operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search <span class="hljs-built_in">all</span> operations performed to date. [<span class="hljs-number">0</span>]:
Graceful time. Only used <span class="hljs-keyword">in</span> bounded consistency level. If graceful_time <span class="hljs-keyword">is</span> <span class="hljs-built_in">set</span>, PyMilvus will use current timestamp minus the graceful_time <span class="hljs-keyword">as</span> the guarantee_timestamp. This option <span class="hljs-keyword">is</span> 5s by default <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> <span class="hljs-built_in">set</span>. [<span class="hljs-number">5</span>]:
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
    </button></h2><p>コレクションまたはパーティションをRAMから解放します。</p>
<p><h3 id="release">構文</h3></p>
<pre><code translate="no" class="language-shell">release -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="release">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-コレクション名</td><td style="text-align:left">パーティションが属するコレクションの名前。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-パーティション</td><td style="text-align:left">(オプション/複数）パーティション名。</td></tr>
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
<p><h3 id="search">オプション</h3></p>
<table>
<thead>
<tr><th style="text-align:left">オプション</th><th style="text-align:left">フルネーム</th><th style="text-align:left">説明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-ヘルプ</td><td style="text-align:left">n/a</td><td style="text-align:left">コマンドの使用に関するヘルプを表示します。</td></tr>
</tbody>
</table>
<p><h3 id="search">例</h3>
<h4 id="search">例1</h4></p>
<p>csvファイルの検索を実行し、必要な入力を求めるプロンプトを表示する：</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-function">search

Collection <span class="hljs-title">name</span> (<span class="hljs-params">car, test_collection</span>): car

The vectors of search <span class="hljs-title">data</span>(<span class="hljs-params">the length of data <span class="hljs-keyword">is</span> number of query (nq</span>), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also import a csv file
<span class="hljs-keyword">out</span> headers): examples/import_csv/search_vectors.csv

The vector field used to search of <span class="hljs-title">collection</span> (<span class="hljs-params">vector</span>): vector

Search parameter nprobe&#x27;s <span class="hljs-keyword">value</span>: 10

The max number of returned <span class="hljs-keyword">record</span>, also known <span class="hljs-keyword">as</span> topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to <span class="hljs-title">search</span> (<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee <span class="hljs-title">Timestamp</span>(<span class="hljs-params">It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date</span>) [0]:

</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="search">例 2</h4></p>
<p>インデックス付きコレクションで検索を実行し、必要な入力を求めるには：</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; <span class="hljs-function">search

Collection <span class="hljs-title">name</span> (<span class="hljs-params">car, test_collection</span>): car

The vectors of search <span class="hljs-title">data</span>(<span class="hljs-params">the length of data <span class="hljs-keyword">is</span> number of query (nq</span>), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also import a csv file without headers):
    [[0.71, 0.76, 0.17, 0.13, 0.42, 0.07, 0.15, 0.67, 0.58, 0.02, 0.39, 0.47, 0.58, 0.88, 0.73, 0.31, 0.23, 0.57, 0.33, 0.2, 0.03, 0.43, 0.78, 0.49, 0.17, 0.56, 0.76, 0.54, 0.45, 0.46, 0.05, 0.1, 0.43, 0.63, 0.29, 0.44, 0.65, 0.01, 0.35, 0.46, 0.66, 0.7, 0.88, 0.07, 0.49, 0.92, 0.57, 0.5, 0.16, 0.77, 0.98, 0.1, 0.44, 0.88, 0.82, 0.16, 0.67, 0.63, 0.57, 0.55, 0.95, 0.13, 0.64, 0.43, 0.71, 0.81, 0.43, 0.65, 0.76, 0.7, 0.05, 0.24, 0.03, 0.9, 0.46, 0.28, 0.92, 0.25, 0.97, 0.79, 0.73, 0.97, 0.49, 0.28, 0.64, 0.19, 0.23, 0.51, 0.09, 0.1, 0.53, 0.03, 0.23, 0.94, 0.87, 0.14, 0.42, 0.82, 0.91, 0.11, 0.91, 0.37, 0.26, 0.6, 0.89, 0.6, 0.32, 0.11, 0.98, 0.67, 0.12, 0.66, 0.47, 0.02, 0.15, 0.6, 0.64, 0.57, 0.14, 0.81, 0.75, 0.11, 0.49, 0.78, 0.16, 0.63, 0.57, 0.18]]

The vector field used to search of <span class="hljs-title">collection</span> (<span class="hljs-params">vector</span>): vector

Search parameter nprobe&#x27;s <span class="hljs-keyword">value</span>: 10

The specified number of <span class="hljs-built_in">decimal</span> places of returned distance [-1]: 5

The max number of returned <span class="hljs-keyword">record</span>, also known <span class="hljs-keyword">as</span> topk: 2

The boolean expression used to filter attribute []: id &gt; 0

The names of partitions to <span class="hljs-title">search</span> (<span class="hljs-params">split <span class="hljs-keyword">by</span> <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple</span>) [&#x27;_default&#x27;] []: _default

timeout []:

Guarantee <span class="hljs-title">Timestamp</span>(<span class="hljs-params">It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search all operations performed to date</span>) [0]:

</span><button class="copy-code-btn"></button></code></pre>
<p><h4 id="search">例3</h4></p>
<p>索引付けされていないコレクションで検索を実行し、必要な入力を求めるには：</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; search

Collection name (car, car2): car

The vectors of search data(the length of data <span class="hljs-keyword">is</span> number of query (nq), the dim of every vector <span class="hljs-keyword">in</span> data must be equal to vector field’s of collection. You can also <span class="hljs-keyword">import</span> a csv file without headers): examples/import_csv/search_vectors.csv

The vector field used to search of collection (vector): vector

The specified number of decimal places of returned distance [-<span class="hljs-number">1</span>]: <span class="hljs-number">5</span>

The <span class="hljs-built_in">max</span> number of returned record, also known <span class="hljs-keyword">as</span> topk: <span class="hljs-number">2</span>

The boolean expression used to <span class="hljs-built_in">filter</span> attribute []:

The names of partitions to search (split by <span class="hljs-string">&quot;,&quot;</span> <span class="hljs-keyword">if</span> multiple) [<span class="hljs-string">&#x27;_default&#x27;</span>] []:

timeout []:

Guarantee Timestamp(It instructs Milvus to see <span class="hljs-built_in">all</span> operations performed before a provided timestamp. If no such timestamp <span class="hljs-keyword">is</span> provided, then Milvus will search <span class="hljs-built_in">all</span> operations performed to date) [<span class="hljs-number">0</span>]:

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
    </button></h2><p>接続をリストする。</p>
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
<pre><code translate="no" class="language-shell">$ milvus_cli --version
Milvus_CLI v0.4.0
<button class="copy-code-btn"></button></code></pre>
