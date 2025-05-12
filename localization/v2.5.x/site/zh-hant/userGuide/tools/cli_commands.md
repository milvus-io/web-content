---
id: cli_commands.md
summary: 使用指令與 Milvus 互動。
title: Milvus_CLI 指令參考
---
<h1 id="MilvusCLI-Command-Reference" class="common-anchor-header">Milvus_CLI 指令參考<button data-href="#MilvusCLI-Command-Reference" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Command-Line Interface (CLI) 是一個命令列工具，支援資料庫連線、資料操作及資料匯入匯出。</p>
<p>本主題介紹所有支援的命令及相對應的選項。也包括一些範例供您參考。</p>
<h2 id="Command-Groups" class="common-anchor-header">命令群組<button data-href="#Command-Groups" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CLI 命令分為以下幾組：</p>
<ul>
<li><code translate="no">create</code>:建立資料集、資料庫、分割區、使用者、角色或索引</li>
<li><code translate="no">delete</code>:刪除資料集、資料庫、分割區、別名、使用者、角色或索引</li>
<li><code translate="no">list</code>:列出資料集、資料庫、分割、使用者、角色、授權或索引</li>
<li><code translate="no">show</code>:顯示連線、資料庫、集合、載入進度或索引進度</li>
<li><code translate="no">grant</code>:授予角色或權限</li>
<li><code translate="no">revoke</code>:撤銷角色或權限</li>
<li><code translate="no">load</code>:載入收集或分割</li>
<li><code translate="no">release</code>:釋放集合或分割區</li>
<li><code translate="no">use</code>:使用資料庫</li>
<li><code translate="no">rename</code>:重新命名集合</li>
<li><code translate="no">insert</code>:插入實體（檔案或行）</li>
</ul>
<h2 id="clear" class="common-anchor-header">清除<button data-href="#clear" class="anchor-icon" translate="no">
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
    </button></h2><p>清除畫面。</p>
<p><h3 id="clear">語法</h3></p>
<pre><code translate="no" class="language-shell">clear
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="clear">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<h2 id="connect" class="common-anchor-header">連線<button data-href="#connect" class="anchor-icon" translate="no">
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
    </button></h2><p>連接至 Milvus。</p>
<p><h3 id="connect">語法</h3></p>
<pre><code translate="no" class="language-shell">connect [-uri (text)] [-t (text)]
connect [-uri (text)] [-t (text)] [-tls (0|1)] [-cert (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="connect">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-資料來源</td><td style="text-align:left">-uri</td><td style="text-align:left">(可選）uri 名稱。預設為 "http://127.0.0.1:19530"。</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-token</td><td style="text-align:left">(可選） zilliz 雲端 apikey 或<code translate="no">username:password</code> 。預設為無。</td></tr>
<tr><td style="text-align:left">-tls</td><td style="text-align:left">-tlsmode</td><td style="text-align:left">(可選）設定 TLS 模式：0 (無加密)、1 (單向加密)、2 (尚未支援雙向加密)。預設為 0</td></tr>
<tr><td style="text-align:left">-cert</td><td style="text-align:left">-cert</td><td style="text-align:left">(可選）用戶端證書檔的路徑。使用單向加密</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<p><h3 id="connect">範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; connect -uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-Database" class="common-anchor-header">建立資料庫<button data-href="#create-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中建立資料庫</p>
<p><h3 id="create-database">語法</h3></p>
<pre><code translate="no" class="language-shell">create database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">選項</h3><table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-db_name</td><td style="text-align:left">[Required] milvus 中的資料庫名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示命令使用說明。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">範例</h3><h4 id="Example-1" class="common-anchor-header">範例一</h4><p>以下範例在 milvus 中建立資料庫<code translate="no">testdb</code> 。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="use-Database" class="common-anchor-header">使用資料庫<button data-href="#use-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中使用資料庫</p>
<p><h3 id="use-database">語法</h3></p>
<pre><code translate="no" class="language-shell">use database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">選項</h3><table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-db_name</td><td style="text-align:left">[Required] milvus 中的資料庫名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示命令使用說明。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">範例</h3><h4 id="Example-1" class="common-anchor-header">範例一</h4><p>以下範例使用 milvus 中的資料庫<code translate="no">testdb</code> 。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; use database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-Databases" class="common-anchor-header">列出資料庫<button data-href="#list-Databases" class="anchor-icon" translate="no">
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
    </button></h2><p>列出 Milvus 中的資料庫</p>
<p><h3 id="list-database">語法</h3></p>
<pre><code translate="no" class="language-shell">list databases
<button class="copy-code-btn"></button></code></pre>
<h3 id="Examples" class="common-anchor-header">範例</h3><h4 id="Example-1" class="common-anchor-header">範例 1</h4><p>以下範例列出 Milvus 中的資料庫。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; list databases
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-Database" class="common-anchor-header">刪除資料庫<button data-href="#delete-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>刪除 Milvus 中的資料庫</p>
<p><h3 id="delete-database">語法</h3></p>
<pre><code translate="no" class="language-shell">delete database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">選項</h3><table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-db_name</td><td style="text-align:left">[Required] milvus 中的資料庫名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示命令使用說明。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">範例</h3><h4 id="Example-1" class="common-anchor-header">範例一</h4><p>以下範例刪除 milvus 中的資料庫<code translate="no">testdb</code> 。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete database -db testdb

Warning! You are trying to delete the database. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-user" class="common-anchor-header">建立使用者<button data-href="#create-user" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中建立使用者</p>
<p><h3 id="create-user">語法</h3></p>
<pre><code translate="no" class="language-shell">create user -u (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">選項</h3><table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-密碼</td><td style="text-align:left">用 milvus 表示的使用者密碼。預設為 「無」。</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-使用者名稱</td><td style="text-align:left">milvus 中的使用者名稱。預設為 「無」。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示命令使用說明。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">範例</h3><h4 id="Example-1" class="common-anchor-header">範例一</h4><p>以下範例在 milvus 中建立使用者<code translate="no">zilliz</code> 及密碼<code translate="no">zilliz</code> 。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create user -u zilliz -p zilliz
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-role" class="common-anchor-header">建立角色<button data-href="#create-role" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中建立角色</p>
<p><h3 id="create-role">語法</h3></p>
<pre><code translate="no" class="language-shell">create role -r (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">選項</h3><table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-角色名稱</td><td style="text-align:left">milvus 角色的角色名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">範例</h3><h4 id="Example-1" class="common-anchor-header">範例一</h4><p>以下範例在 milvus 中建立角色<code translate="no">role1</code> 。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create role -r role1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-alias" class="common-anchor-header">建立別名<button data-href="#create-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>指定集合的唯一別名。</p>
<div class="alert note">一個集合可以有多個別名。但是，一個別名最多對應一個集合。</div>
<p><h3 id="create-alias">語法</h3></p>
<pre><code translate="no" class="language-shell">create alias -c (text) -a (text) [-A]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-alias">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">集合的名稱。</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-別名</td><td style="text-align:left">別名。</td></tr>
<tr><td style="text-align:left">-A</td><td style="text-align:left">-alter</td><td style="text-align:left">(可選）將別名轉移至指定集合的旗標。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示命令使用說明。</td></tr>
</tbody>
</table>
<p><h3 id="create-alias">範例</h3></p>
<p><h4>範例一</h4></p>
<p>以下範例為<code translate="no">car</code> 套件建立<code translate="no">carAlias1</code> 和<code translate="no">carAlias2</code> 別名。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create alias -c car -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<p><h4>範例 2</h4></p>
<div class="alert note">範例 2 以範例 1 為基礎。</div>
<p>下面的示例將<code translate="no">carAlias1</code> 別名從<code translate="no">car</code> 集合轉移到<code translate="no">car2</code> 集合。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create alias -c car2 -A -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-collection" class="common-anchor-header">建立集合<button data-href="#create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>建立一個集合。</p>
<p><h3 id="create-collection">語法</h3></p>
<pre><code translate="no" class="language-shell">create collection
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-collection">互動範例</h3></p>
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
<h2 id="create-partition" class="common-anchor-header">建立分割區<button data-href="#create-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>建立分割區。</p>
<p><h3 id="creat-partition">語法</h3></p>
<pre><code translate="no" class="language-shell">create partition -c (text) -p (text) [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-partition">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">集合的名稱。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分區</td><td style="text-align:left">分割區名稱。</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">-描述</td><td style="text-align:left">(可選）磁碟分割的描述。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<p><h3 id="creat-partition">範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create partition -c car -p new_partition -d test_add_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-index" class="common-anchor-header">建立索引<button data-href="#create-index" class="anchor-icon" translate="no">
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
    </button></h2><p>為欄位建立索引。</p>
<div class="alert note">目前，一個集合最多支援一個索引。</div>
<p><h3 id="creat-index">語法</h3></p>
<pre><code translate="no" class="language-shell">create index
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-index">互動範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create index

Collection name (car, car2): car2
The name of the field to create an index for (vector): vector
Index name: vectorIndex
Index type (FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY, AUTOINDEX, DISKANN, GPU_IVF_FLAT, GPU_IVF_PQ, SPARSE_INVERTED_INDEX, SCANN, STL_SORT, Trie, INVERTED): IVF_FLAT
Vector Index metric type (L2, IP, HAMMING, TANIMOTO, COSINE): L2
Index params nlist: 2
Timeout []:
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-user" class="common-anchor-header">刪除使用者<button data-href="#delete-user" class="anchor-icon" translate="no">
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
    </button></h2><p>刪除使用者</p>
<h3 id="Syntax" class="common-anchor-header">語法</h3><pre><code translate="no" class="language-shell">delete user -u (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">選項</h3><table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-使用者名稱</td><td style="text-align:left">使用者名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示命令使用說明。</td></tr>
</tbody>
</table>
<h3 id="Example" class="common-anchor-header">範例</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; delete user -u zilliz

Warning! You are trying to delete the user in milvus. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-role" class="common-anchor-header">刪除角色<button data-href="#delete-role" class="anchor-icon" translate="no">
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
    </button></h2><p>刪除 Milvus 中的角色</p>
<p><h3 id="delete-role">語法</h3></p>
<pre><code translate="no" class="language-shell">delete role -r (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">選項</h3><table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-角色名稱</td><td style="text-align:left">milvus 角色的角色名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">範例</h3><p>以下範例刪除 milvus 中的角色<code translate="no">role1</code> 。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete role -r role1
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-alias" class="common-anchor-header">刪除別名<button data-href="#delete-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>刪除別名。</p>
<p><h3 id="delete-alias">語法</h3></p>
<pre><code translate="no" class="language-shell">delete alias -a (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-alias">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-別名</td><td style="text-align:left">別名。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<h2 id="delete-collection" class="common-anchor-header">刪除集合<button data-href="#delete-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>刪除一個集合。</p>
<p><h3 id="delete-collection">語法</h3></p>
<pre><code translate="no" class="language-shell">delete collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-collection">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-收藏集名稱</td><td style="text-align:left">要刪除的集合名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<p><h3 id="delete-collection">範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete collection -c car

Warning! You are trying to delete the collection. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-entities" class="common-anchor-header">刪除實體<button data-href="#delete-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>刪除實體。</p>
<p><h3 id="delete-entities">語法</h3></p>
<pre><code translate="no">delete entities -c (<span class="hljs-selector-tag">text</span>) -<span class="hljs-selector-tag">p</span> (<span class="hljs-selector-tag">text</span>)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-entities">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">要刪除的實體所屬的集合名稱。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分區</td><td style="text-align:left">(可選）要刪除的分割區名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用命令的說明。</td></tr>
</tbody>
</table>
<p><h3 id="delete-entities">範例</h3></p>
<pre><code translate="no">milvus_cli &gt; delete entities -c car

The expression <span class="hljs-keyword">to</span> specify entities <span class="hljs-keyword">to</span> be deleted, such <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;film_id in [ 0, 1 ]&quot;</span>: film_id <span class="hljs-keyword">in</span> [ <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ]

Warning! You are trying <span class="hljs-keyword">to</span> delete the entities <span class="hljs-keyword">of</span> collection. This action cannot be undone!
<span class="hljs-keyword">Do</span> you want <span class="hljs-keyword">to</span> <span class="hljs-keyword">continue</span>? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-partition" class="common-anchor-header">刪除分割區<button data-href="#delete-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>刪除磁碟分割。</p>
<p><h3 id="delete-partition">語法</h3></p>
<pre><code translate="no" class="language-shell">delete partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-partition">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">要刪除的分割區所屬集合的名稱。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分區</td><td style="text-align:left">要刪除的分割區的名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用命令的說明。</td></tr>
</tbody>
</table>
<p><h3 id="delete-partition">範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete partition -c car -p new_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-index" class="common-anchor-header">刪除索引<button data-href="#delete-index" class="anchor-icon" translate="no">
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
    </button></h2><p>刪除索引及相對應的索引檔案。</p>
<div class="alert note">目前，一個資料集最多支援一個索引。</div>
<p><h3 id="delete-index">語法</h3></p>
<pre><code translate="no" class="language-shell">delete index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">集合的名稱。</td></tr>
<tr><td style="text-align:left">-在</td><td style="text-align:left">-索引名稱</td><td style="text-align:left">索引名稱的名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<p><h3 >範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete index -c car -in indexName

Warning! You are trying to delete the index of collection. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="grant-role" class="common-anchor-header">授予角色<button data-href="#grant-role" class="anchor-icon" translate="no">
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
    </button></h2><p>授予使用者角色</p>
<p><h3 id="grant-user">語法</h3></p>
<pre><code translate="no" class="language-shell">grant role -r (text) -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-角色名稱</td><td style="text-align:left">milvus 角色的角色名稱。</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-使用者名稱</td><td style="text-align:left">milvus 使用者的使用者名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<p><h3 >範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; grant role -r role1 -u user1
<button class="copy-code-btn"></button></code></pre>
<h2 id="grant-privilege" class="common-anchor-header">授予特權<button data-href="#grant-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>為角色指定權限。</p>
<p><h3 id="assign-privilege">語法</h3></p>
<pre><code translate="no" class="language-shell">grant privilege
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="assign-privilege">互動範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; grant privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-role" class="common-anchor-header">撤銷角色<button data-href="#revoke-role" class="anchor-icon" translate="no">
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
    </button></h2><p>撤銷指定給使用者的角色。</p>
<p><h3 id="grant-user">語法</h3></p>
<pre><code translate="no" class="language-shell">revoke role -r (text) -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-角色名稱</td><td style="text-align:left">milvus 角色的角色名稱。</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-使用者名稱</td><td style="text-align:left">milvus 使用者的使用者名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<p><h3 >範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; revoke role -r role1 -u user1
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-privilege" class="common-anchor-header">撤銷權限<button data-href="#revoke-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>撤銷已指定給角色的特權。</p>
<p><h3 id="revoke-privilege">語法</h3></p>
<pre><code translate="no" class="language-shell">revoke privilege
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="revoke-privilege">互動範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; revoke privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-collection" class="common-anchor-header">顯示集合<button data-href="#show-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>顯示集合的詳細資訊。</p>
<p><h3 id="show-collection">語法</h3></p>
<pre><code translate="no" class="language-shell">show collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">集合的名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<p><h3>範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show collection -c test_collection_insert
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-partition" class="common-anchor-header">顯示分割區<button data-href="#show-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>顯示分割區的詳細資訊。</p>
<p><h3 id="show-partition">語法</h3></p>
<pre><code translate="no" class="language-shell">show partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">磁碟分割所屬集合的名稱。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分區</td><td style="text-align:left">分割區的名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<p><h3>範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show partition -c test_collection_insert -p _default
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-index" class="common-anchor-header">顯示索引<button data-href="#show-index" class="anchor-icon" translate="no">
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
    </button></h2><p>顯示索引的詳細資訊。</p>
<p><h3 id="show-index">語法</h3></p>
<pre><code translate="no" class="language-shell">show index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">集合的名稱。</td></tr>
<tr><td style="text-align:left">-在</td><td style="text-align:left">-索引名稱</td><td style="text-align:left">索引名稱。</td></tr>
</tbody>
</table>
<p>| --help | n/a | 顯示使用指令的說明。|</p>
<p><h3 >範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show index -c test_collection -in index_name
<button class="copy-code-btn"></button></code></pre>
<h2 id="exit" class="common-anchor-header">退出<button data-href="#exit" class="anchor-icon" translate="no">
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
    </button></h2><p>關閉命令列視窗。</p>
<p><h3 id="exit">語法</h3></p>
<pre><code translate="no" class="language-shell">exit
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="exit">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<h2 id="help" class="common-anchor-header">幫助<button data-href="#help" class="anchor-icon" translate="no">
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
    </button></h2><p>顯示使用命令的說明。</p>
<p><h3 id="help">語法</h3></p>
<pre><code translate="no" class="language-shell">help &lt;command&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="help">命令</h3></p>
<table>
<thead>
<tr><th style="text-align:left">命令</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">清除</td><td style="text-align:left">清除畫面。</td></tr>
<tr><td style="text-align:left">連線</td><td style="text-align:left">連線到 Milvus。</td></tr>
<tr><td style="text-align:left">建立</td><td style="text-align:left">建立資料集、資料庫、分割區、使用者、角色和索引。</td></tr>
<tr><td style="text-align:left">授予</td><td style="text-align:left">授予角色、權限。</td></tr>
<tr><td style="text-align:left">撤銷</td><td style="text-align:left">撤銷角色、權限。</td></tr>
<tr><td style="text-align:left">刪除</td><td style="text-align:left">刪除資料集、資料庫、分割區、別名、使用者、角色或索引。</td></tr>
<tr><td style="text-align:left">退出</td><td style="text-align:left">關閉命令列視窗。</td></tr>
<tr><td style="text-align:left">幫助</td><td style="text-align:left">顯示使用命令的說明。</td></tr>
<tr><td style="text-align:left">插入</td><td style="text-align:left">將資料匯入分割區。</td></tr>
<tr><td style="text-align:left">清單</td><td style="text-align:left">列出集合、資料庫、分割區、使用者、角色、授權或索引。</td></tr>
<tr><td style="text-align:left">載入</td><td style="text-align:left">載入集合或分割區。</td></tr>
<tr><td style="text-align:left">查詢</td><td style="text-align:left">顯示符合您輸入的所有條件的查詢結果。</td></tr>
<tr><td style="text-align:left">釋放</td><td style="text-align:left">釋放集合或分割區。</td></tr>
<tr><td style="text-align:left">搜尋</td><td style="text-align:left">執行向量相似性搜尋或混合搜尋。</td></tr>
<tr><td style="text-align:left">顯示</td><td style="text-align:left">顯示連線、資料庫、集合、載入進度或索引進度。</td></tr>
<tr><td style="text-align:left">重新命名</td><td style="text-align:left">重新命名集合</td></tr>
<tr><td style="text-align:left">使用</td><td style="text-align:left">使用資料庫</td></tr>
<tr><td style="text-align:left">版本</td><td style="text-align:left">顯示 Milvus_CLI 的版本。</td></tr>
</tbody>
</table>
<h2 id="insert" class="common-anchor-header">插入<button data-href="#insert" class="anchor-icon" translate="no">
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
    </button></h2><p>將本機或遠端資料匯入一個分割區。</p>
<p><h3 id="insert">語法</h3></p>
<pre><code translate="no" class="language-shell">insert file -c (text) [-p (text)] [-t (text)] &lt;file_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">插入資料的集合名稱。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分區</td><td style="text-align:left">(可選）資料要插入的分割區名稱。未傳送此分割區選項表示選擇「_預設」分割區。</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-超時</td><td style="text-align:left">(可選) RPC 的時間長度，以秒為單位。如果未設定 timeout，用戶端會一直等待，直到伺服器回應或發生錯誤為止。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<p><h3 id="insert">範例一</h3>
以下範例匯入本機 CSV 檔案。</p>
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
<p><h3 id="insert">範例 2</h3>
以下範例匯入遠端 CSV 檔案。</p>
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
<h2 id="insert-row" class="common-anchor-header">插入行<button data-href="#insert-row" class="anchor-icon" translate="no">
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
    </button></h2><p>插入一列資料到集合中。</p>
<p><h3 id="insert-row">語法</h3></p>
<pre><code translate="no" class="language-shell">insert row
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert-row">互動範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert row

Collection name: car
Partition name [_default]: _default
Enter value for id (INT64): 1
Enter value for vector (FLOAT_VECTOR): [1.0, 2.0, 3.0]
Enter value for color (INT64): 100
Enter value for brand (VARCHAR): Toyota

Inserted successfully.
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-users" class="common-anchor-header">列出使用者<button data-href="#list-users" class="anchor-icon" translate="no">
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
<h3 id="Syntax" class="common-anchor-header">語法</h3><pre><code translate="no" class="language-shell">list users
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">選項</h3><p>| Option | Full name | Description | | --help | n/a | 顯示使用命令的說明。|</p>
<h2 id="List-roles" class="common-anchor-header">列出角色<button data-href="#List-roles" class="anchor-icon" translate="no">
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
    </button></h2><p>列出 Milvus 中的角色</p>
<p><h3 id="list-role">語法</h3></p>
<pre><code translate="no" class="language-shell">list roles
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">選項</h3><table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">範例</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; list roles
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-grants" class="common-anchor-header">列出撥款<button data-href="#List-grants" class="anchor-icon" translate="no">
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
    </button></h2><p>列出 Milvus 中的授權</p>
<h3 id="Options" class="common-anchor-header">選項</h3><table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-角色名稱</td><td style="text-align:left">milvus 角色的角色名稱。</td></tr>
<tr><td style="text-align:left">-o</td><td style="text-align:left">-物件名稱</td><td style="text-align:left">milvus 物件的物件名稱。</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-物件類型</td><td style="text-align:left">全局、集合或使用者。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">範例</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; list grants -r role1 -o object1 -t Collection
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-collections" class="common-anchor-header">列出收藏集<button data-href="#list-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>列出所有收藏集。</p>
<p><h3 id="list-collections">語法<h3></p>
<pre><code translate="no" class="language-shell">list collections
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-collections">選項<h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<h2 id="list-indexes" class="common-anchor-header">列出索引<button data-href="#list-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>列出集合的所有索引。</p>
<div class="alert note">目前，一個資料集最多支援一個索引。 </div>
<p><h3 id="list-indexes">語法</h3></p>
<pre><code translate="no" class="language-shell">list indexes -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-indexes">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">集合的名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<h2 id="list-partitions" class="common-anchor-header">列出分區<button data-href="#list-partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>列出集合的所有分區。</p>
<p><h3 id="list-partitions">語法</h3></p>
<pre><code translate="no" class="language-shell">list partitions -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-partitions">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">集合的名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<h2 id="load" class="common-anchor-header">載入<button data-href="#load" class="anchor-icon" translate="no">
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
    </button></h2><p>將資料集或磁碟分割從硬碟空間載入 RAM。</p>
<p><h3 id="load">語法</h3></p>
<pre><code translate="no" class="language-shell">load collection -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="load">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">磁碟分割所屬集合的名稱。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分區</td><td style="text-align:left">(可選擇/多個）磁碟分割的名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<h2 id="query" class="common-anchor-header">查詢<button data-href="#query" class="anchor-icon" translate="no">
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
    </button></h2><p>顯示符合您輸入的所有條件的查詢結果。</p>
<p><h3 id="query">語法</h3></p>
<pre><code translate="no" class="language-shell">query
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="query">互動範例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: id in [ 428960801420883491, 428960801420883492, 428960801420883493 ]

Name of partitions that contain entities(split by &quot;,&quot; if multiple) []: default

A list of fields to return(split by &quot;,&quot; if multiple) []: color, brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date. [0]:

Graceful time. Only used in bounded consistency level. If graceful_time is set, PyMilvus will use current timestamp minus the graceful_time as the guarantee_timestamp. This option is 5s by default if not set. [5]:
<button class="copy-code-btn"></button></code></pre>
<h2 id="release" class="common-anchor-header">釋放<button data-href="#release" class="anchor-icon" translate="no">
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
    </button></h2><p>從 RAM 釋放資料集或分割區。</p>
<p><h3 id="release">語法</h3></p>
<pre><code translate="no" class="language-shell">release collection -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="release">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">磁碟分割所屬集合的名稱。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分區</td><td style="text-align:left">(可選擇/多個）磁碟分割的名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<h2 id="search" class="common-anchor-header">搜尋<button data-href="#search" class="anchor-icon" translate="no">
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
    </button></h2><p>執行向量相似性搜尋或混合搜尋。</p>
<p><h3 id="search">語法</h3></p>
<pre><code translate="no" class="language-shell">search
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="search">互動範例</h3></p>
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
<h2 id="list-connection" class="common-anchor-header">列出連線<button data-href="#list-connection" class="anchor-icon" translate="no">
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
    </button></h2><p>列出連線。</p>
<p><h3 id="show-connection">語法</h3></p>
<pre><code translate="no" class="language-shell">list connections
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-connection">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示命令使用說明。</td></tr>
</tbody>
</table>
<h2 id="show-indexprogress" class="common-anchor-header">顯示索引進度<button data-href="#show-indexprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>顯示實體索引的進度。</p>
<p><h3 id="show-index-progress">語法</h3></p>
<pre><code translate="no" class="language-shell">show index_progress -c (text) [-i (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-index-progress">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">實體所屬集合的名稱。</td></tr>
<tr><td style="text-align:left">-i</td><td style="text-align:left">-索引</td><td style="text-align:left">(可選）索引的名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<h2 id="show-loadingprogress" class="common-anchor-header">顯示載入進度<button data-href="#show-loadingprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>顯示載入資料集的進度。</p>
<p><h3 id="show-loading-progress">語法</h3></p>
<pre><code translate="no" class="language-shell">show loading_progress -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-loading-progress">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-集合名稱</td><td style="text-align:left">實體所屬集合的名稱。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分區</td><td style="text-align:left">(可選擇/多個）載入分割區的名稱。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<h2 id="version" class="common-anchor-header">版本<button data-href="#version" class="anchor-icon" translate="no">
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
    </button></h2><p>顯示 Milvus_CLI 的版本。</p>
<p><h3 id="version">語法</h3></p>
<pre><code translate="no" class="language-shell">version
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="version">選項</h3></p>
<table>
<thead>
<tr><th style="text-align:left">選項</th><th style="text-align:left">全名</th><th style="text-align:left">說明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不適用</td><td style="text-align:left">顯示使用指令的說明。</td></tr>
</tbody>
</table>
<div class="alert note">您也可以在 shell 中檢查 Milvus_CLI 的版本，如以下範例所示。在這種情況下，<code translate="no">milvus_cli --version</code> 作為命令。</div>
<p><h3 id="version">範例</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">milvus_cli --version</span>
Milvus_CLI v0.4.0
<button class="copy-code-btn"></button></code></pre>
