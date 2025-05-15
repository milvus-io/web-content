---
id: cli_commands.md
summary: 使用命令与 Milvus 互动。
title: Milvus_CLI 命令参考
---
<h1 id="MilvusCLI-Command-Reference" class="common-anchor-header">Milvus_CLI 命令参考<button data-href="#MilvusCLI-Command-Reference" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 命令行界面（CLI）是一个命令行工具，支持数据库连接、数据操作和数据导入导出。</p>
<p>本主题介绍所有支持的命令和相应的选项。还包括一些示例供您参考。</p>
<h2 id="Command-Groups" class="common-anchor-header">命令组<button data-href="#Command-Groups" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CLI 命令分为以下几组：</p>
<ul>
<li><code translate="no">create</code>:创建 Collections、数据库、分区、用户、角色或索引</li>
<li><code translate="no">delete</code>:删除 Collections、数据库、分区、别名、用户、角色或索引</li>
<li><code translate="no">list</code>:列出集合、数据库、分区、用户、角色、授权或索引</li>
<li><code translate="no">show</code>:显示连接、数据库、Collection、加载进度或索引进度</li>
<li><code translate="no">grant</code>:授予角色或权限</li>
<li><code translate="no">revoke</code>:撤销角色或权限</li>
<li><code translate="no">load</code>:加载 Collections 或分区</li>
<li><code translate="no">release</code>:释放 Collections 或分区</li>
<li><code translate="no">use</code>:使用数据库</li>
<li><code translate="no">rename</code>:重新命名 Collections</li>
<li><code translate="no">insert</code>:插入实体（文件或行）</li>
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
    </button></h2><p>清除屏幕。</p>
<p><h3 id="clear">语法</h3></p>
<pre><code translate="no" class="language-shell">clear
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="clear">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全称</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h2 id="connect" class="common-anchor-header">连接<button data-href="#connect" class="anchor-icon" translate="no">
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
    </button></h2><p>连接 Milvus。</p>
<p><h3 id="connect">语法</h3></p>
<pre><code translate="no" class="language-shell">connect [-uri (text)] [-t (text)]
connect [-uri (text)] [-t (text)] [-tls (0|1)] [-cert (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="connect">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-uri</td><td style="text-align:left">-uri</td><td style="text-align:left">(可选）uri 名称。默认为 "http://127.0.0.1:19530"。</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-令牌</td><td style="text-align:left">(可选）Zilliz Cloud apikey 或<code translate="no">username:password</code> 。默认为 "无"。</td></tr>
<tr><td style="text-align:left">-tls</td><td style="text-align:left">-tlsmode</td><td style="text-align:left">(可选）设置 TLS 模式：0（无加密）、1（单向加密）、2（暂不支持双向加密）。默认为 0</td></tr>
<tr><td style="text-align:left">-证书</td><td style="text-align:left">-证书</td><td style="text-align:left">(可选）客户端证书文件的路径。使用单向加密</td></tr>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<p><h3 id="connect">示例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; connect -uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-Database" class="common-anchor-header">创建数据库<button data-href="#create-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中创建数据库</p>
<p><h3 id="create-database">语法</h3></p>
<pre><code translate="no" class="language-shell">create database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">选项</h3><table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-db_name</td><td style="text-align:left">[必填] Milvus 中的数据库名称。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">示例</h3><h4 id="Example-1" class="common-anchor-header">示例 1</h4><p>下面的示例在 milvus 中创建了数据库<code translate="no">testdb</code> 。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="use-Database" class="common-anchor-header">使用数据库<button data-href="#use-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中使用数据库</p>
<p><h3 id="use-database">语法</h3></p>
<pre><code translate="no" class="language-shell">use database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">选项</h3><table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-db_name</td><td style="text-align:left">[必填] Milvus 中的数据库名称。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">示例</h3><h4 id="Example-1" class="common-anchor-header">示例 1</h4><p>下面的示例使用 milvus 中的数据库<code translate="no">testdb</code> 。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; use database -db testdb
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-Databases" class="common-anchor-header">列出数据库<button data-href="#list-Databases" class="anchor-icon" translate="no">
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
    </button></h2><p>列出 Milvus 中的数据库</p>
<p><h3 id="list-database">语法</h3></p>
<pre><code translate="no" class="language-shell">list databases
<button class="copy-code-btn"></button></code></pre>
<h3 id="Examples" class="common-anchor-header">示例</h3><h4 id="Example-1" class="common-anchor-header">示例 1</h4><p>下面的示例列出了 milvus 中的数据库。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; list databases
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-Database" class="common-anchor-header">删除数据库<button data-href="#delete-Database" class="anchor-icon" translate="no">
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
    </button></h2><p>删除 Milvus 中的数据库</p>
<p><h3 id="delete-database">语法</h3></p>
<pre><code translate="no" class="language-shell">delete database -db (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">选项</h3><table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-db</td><td style="text-align:left">-db_name</td><td style="text-align:left">[必填] Milvus 中的数据库名称。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">示例</h3><h4 id="Example-1" class="common-anchor-header">示例 1</h4><p>下面的示例删除了 milvus 中的数据库<code translate="no">testdb</code> 。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete database -db testdb

Warning! You are trying to delete the database. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-user" class="common-anchor-header">创建用户<button data-href="#create-user" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中创建用户</p>
<p><h3 id="create-user">语法</h3></p>
<pre><code translate="no" class="language-shell">create user -u (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">选项</h3><table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-密码</td><td style="text-align:left">Milvus 中的用户密码。默认为 "无"。</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-用户名</td><td style="text-align:left">Milvus 中的用户名。默认为 "无"。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">示例</h3><h4 id="Example-1" class="common-anchor-header">示例 1</h4><p>下面的示例在 milvus 中创建了用户<code translate="no">zilliz</code> 和密码<code translate="no">zilliz</code> 。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create user -u zilliz -p zilliz
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-role" class="common-anchor-header">创建角色<button data-href="#create-role" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中创建角色</p>
<p><h3 id="create-role">语法</h3></p>
<pre><code translate="no" class="language-shell">create role -r (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">选项</h3><table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-角色名称</td><td style="text-align:left">milvus 角色的角色名称。</td></tr>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">示例</h3><h4 id="Example-1" class="common-anchor-header">示例 1</h4><p>下面的示例在 milvus 中创建了角色<code translate="no">role1</code> 。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create role -r role1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-alias" class="common-anchor-header">创建别名<button data-href="#create-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>为 Collections 指定唯一的别名。</p>
<div class="alert note">一个 Collection 可以有多个别名。不过，一个别名最多对应一个 Collection。</div>
<p><h3 id="create-alias">语法</h3></p>
<pre><code translate="no" class="language-shell">create alias -c (text) -a (text) [-A]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-alias">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Collection-名称</td><td style="text-align:left">Collections 的名称。</td></tr>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-别名</td><td style="text-align:left">别名。</td></tr>
<tr><td style="text-align:left">-A</td><td style="text-align:left">-alter</td><td style="text-align:left">(可选）将别名转移到指定 Collections 的标志。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<p><h3 id="create-alias">示例</h3></p>
<p><h4>示例 1</h4></p>
<p>下面的示例为<code translate="no">car</code> Collection 创建了<code translate="no">carAlias1</code> 和<code translate="no">carAlias2</code> 别名。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create alias -c car -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<p><h4>例 2</h4></p>
<div class="alert note">例 2 基于例 1。</div>
<p>下面的示例将<code translate="no">carAlias1</code> 别名从<code translate="no">car</code> Collection 转移到<code translate="no">car2</code> Collection。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create alias -c car2 -A -a carAlias1
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-collection" class="common-anchor-header">创建 Collection<button data-href="#create-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>创建一个 Collection。</p>
<p><h3 id="create-collection">语法</h3></p>
<pre><code translate="no" class="language-shell">create collection
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="create-collection">交互式示例</h3></p>
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
<h2 id="create-partition" class="common-anchor-header">创建分区<button data-href="#create-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>创建分区。</p>
<p><h3 id="creat-partition">语法</h3></p>
<pre><code translate="no" class="language-shell">create partition -c (text) -p (text) [-d (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-partition">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Collection-名称</td><td style="text-align:left">Collections 的名称。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分区</td><td style="text-align:left">分区名称。</td></tr>
<tr><td style="text-align:left">-d</td><td style="text-align:left">-分区描述</td><td style="text-align:left">(可选）分区描述。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<p><h3 id="creat-partition">示例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create partition -c car -p new_partition -d test_add_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="create-index" class="common-anchor-header">创建索引<button data-href="#create-index" class="anchor-icon" translate="no">
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
    </button></h2><p>为字段创建索引。</p>
<div class="alert note">目前，一个 Collection 最多支持一个索引。</div>
<p><h3 id="creat-index">语法</h3></p>
<pre><code translate="no" class="language-shell">create index
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="creat-index">交互示例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; create index

Collection name (car, car2): car2
The name of the field to create an index for (vector): vector
Index name: vectorIndex
Index type (FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY, AUTOINDEX, DISKANN, GPU_IVF_FLAT, GPU_IVF_PQ, SPARSE_INVERTED_INDEX, SCANN, STL_SORT, Trie, INVERTED): IVF_FLAT
Vector Index metric type (L2, IP, HAMMING, TANIMOTO, COSINE): L2
Index params nlist: 2
Timeout []:
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-user" class="common-anchor-header">删除用户<button data-href="#delete-user" class="anchor-icon" translate="no">
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
    </button></h2><p>删除用户</p>
<h3 id="Syntax" class="common-anchor-header">语法</h3><pre><code translate="no" class="language-shell">delete user -u (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">选项</h3><table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-用户名</td><td style="text-align:left">用户名。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h3 id="Example" class="common-anchor-header">示例</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; delete user -u zilliz

Warning! You are trying to delete the user in milvus. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-role" class="common-anchor-header">删除角色<button data-href="#delete-role" class="anchor-icon" translate="no">
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
    </button></h2><p>删除 Milvus 中的角色</p>
<p><h3 id="delete-role">语法</h3></p>
<pre><code translate="no" class="language-shell">delete role -r (text)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">选项</h3><table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-角色名称</td><td style="text-align:left">milvus 角色的角色名称。</td></tr>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">示例</h3><p>下面的示例删除了 milvus 中的角色<code translate="no">role1</code> 。</p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete role -r role1
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-alias" class="common-anchor-header">删除别名<button data-href="#delete-alias" class="anchor-icon" translate="no">
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
    </button></h2><p>删除别名。</p>
<p><h3 id="delete-alias">语法</h3></p>
<pre><code translate="no" class="language-shell">delete alias -a (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-alias">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-a</td><td style="text-align:left">-别名</td><td style="text-align:left">别名。</td></tr>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h2 id="delete-collection" class="common-anchor-header">delete Collections<button data-href="#delete-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>删除一个 Collection。</p>
<p><h3 id="delete-collection">语法</h3></p>
<pre><code translate="no" class="language-shell">delete collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-collection">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-名称</td><td style="text-align:left">要删除的 Collection 的名称。</td></tr>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<p><h3 id="delete-collection">示例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete collection -c car

Warning! You are trying to delete the collection. This action cannot be undone!
Do you want to continue? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-entities" class="common-anchor-header">删除实体<button data-href="#delete-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>删除实体。</p>
<p><h3 id="delete-entities">语法</h3></p>
<pre><code translate="no">delete entities -c (<span class="hljs-selector-tag">text</span>) -<span class="hljs-selector-tag">p</span> (<span class="hljs-selector-tag">text</span>)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-entities">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Collection-名称</td><td style="text-align:left">要删除的实体所属的 Collections 名称。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分区</td><td style="text-align:left">(可选）要删除的分区名称。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<p><h3 id="delete-entities">示例</h3></p>
<pre><code translate="no">milvus_cli &gt; delete entities -c car

The expression <span class="hljs-keyword">to</span> specify entities <span class="hljs-keyword">to</span> be deleted, such <span class="hljs-keyword">as</span> <span class="hljs-string">&quot;film_id in [ 0, 1 ]&quot;</span>: film_id <span class="hljs-keyword">in</span> [ <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ]

Warning! You are trying <span class="hljs-keyword">to</span> delete the entities <span class="hljs-keyword">of</span> collection. This action cannot be undone!
<span class="hljs-keyword">Do</span> you want <span class="hljs-keyword">to</span> <span class="hljs-keyword">continue</span>? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-partition" class="common-anchor-header">删除分区<button data-href="#delete-partition" class="anchor-icon" translate="no">
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
    </button></h2><p>删除分区。</p>
<p><h3 id="delete-partition">语法</h3></p>
<pre><code translate="no" class="language-shell">delete partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="delete-partition">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Collection-名称</td><td style="text-align:left">要删除的分区所属的 Collections 名称。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分区</td><td style="text-align:left">要删除的分区的名称。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<p><h3 id="delete-partition">示例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; delete partition -c car -p new_partition
<button class="copy-code-btn"></button></code></pre>
<h2 id="delete-index" class="common-anchor-header">删除索引<button data-href="#delete-index" class="anchor-icon" translate="no">
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
    </button></h2><p>删除索引和相应的索引文件。</p>
<div class="alert note">目前，一个 Collection 最多支持一个索引。</div>
<p><h3 id="delete-index">语法</h3></p>
<pre><code translate="no" class="language-shell">delete index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Collection-名称</td><td style="text-align:left">Collections 的名称。</td></tr>
<tr><td style="text-align:left">-在</td><td style="text-align:left">-索引名称</td><td style="text-align:left">索引名称。</td></tr>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">无</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<p><h3 >示例</h3></p>
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
    </button></h2><p>授予用户角色</p>
<p><h3 id="grant-user">语法</h3></p>
<pre><code translate="no" class="language-shell">grant role -r (text) -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全称</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-角色名称</td><td style="text-align:left">milvus 角色的角色名称。</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-用户名</td><td style="text-align:left">milvus 用户的用户名。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<p><h3 >示例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; grant role -r role1 -u user1
<button class="copy-code-btn"></button></code></pre>
<h2 id="grant-privilege" class="common-anchor-header">授予权限<button data-href="#grant-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>为角色分配权限。</p>
<p><h3 id="assign-privilege">语法</h3></p>
<pre><code translate="no" class="language-shell">grant privilege
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="assign-privilege">交互式 示例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; grant privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-role" class="common-anchor-header">撤销角色<button data-href="#revoke-role" class="anchor-icon" translate="no">
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
    </button></h2><p>撤销分配给用户的角色。</p>
<p><h3 id="grant-user">语法</h3></p>
<pre><code translate="no" class="language-shell">revoke role -r (text) -u (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全称</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-角色名称</td><td style="text-align:left">milvus 角色的角色名称。</td></tr>
<tr><td style="text-align:left">-u</td><td style="text-align:left">-用户名</td><td style="text-align:left">milvus 用户的用户名。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<p><h3 >示例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; revoke role -r role1 -u user1
<button class="copy-code-btn"></button></code></pre>
<h2 id="revoke-privilege" class="common-anchor-header">撤销权限<button data-href="#revoke-privilege" class="anchor-icon" translate="no">
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
    </button></h2><p>撤销已分配给角色的权限。</p>
<p><h3 id="revoke-privilege">语法</h3></p>
<pre><code translate="no" class="language-shell">revoke privilege
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="revoke-privilege">交互式 示例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; revoke privilege

Role name: role1
The type of object for which the privilege is to be assigned. (Global, Collection, User): Collection
The name of the object to control access for: object1
The name of the privilege to assign. (CreateCollection, DropCollection, etc.): CreateCollection
The name of the database to which the object belongs. [default]: default
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-collection" class="common-anchor-header">显示 Collections<button data-href="#show-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>显示 Collection 的详细信息。</p>
<p><h3 id="show-collection">语法</h3></p>
<pre><code translate="no" class="language-shell">show collection -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Collection-名称</td><td style="text-align:left">Collections 的名称。</td></tr>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<p><h3>示例</h3></p>
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
    </button></h2><p>显示分区的详细信息。</p>
<p><h3 id="show-partition">语法</h3></p>
<pre><code translate="no" class="language-shell">show partition -c (text) -p (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3>选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Collection-名称</td><td style="text-align:left">分区所属 Collections 的名称。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分区</td><td style="text-align:left">分区的名称。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<p><h3>示例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; show partition -c test_collection_insert -p _default
<button class="copy-code-btn"></button></code></pre>
<h2 id="show-index" class="common-anchor-header">show index<button data-href="#show-index" class="anchor-icon" translate="no">
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
    </button></h2><p>显示索引的详细信息。</p>
<p><h3 id="show-index">语法</h3></p>
<pre><code translate="no" class="language-shell">show index -c (text) -in (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 >选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Collection-名称</td><td style="text-align:left">Collections 的名称。</td></tr>
<tr><td style="text-align:left">-在</td><td style="text-align:left">-索引名称</td><td style="text-align:left">索引名称。</td></tr>
</tbody>
</table>
<p>| --help | n/a | 显示命令使用帮助。|</p>
<p><h3 >示例</h3></p>
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
    </button></h2><p>关闭命令行窗口。</p>
<p><h3 id="exit">语法</h3></p>
<pre><code translate="no" class="language-shell">exit
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="exit">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h2 id="help" class="common-anchor-header">帮助<button data-href="#help" class="anchor-icon" translate="no">
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
    </button></h2><p>显示使用命令的帮助。</p>
<p><h3 id="help">语法</h3></p>
<pre><code translate="no" class="language-shell">help &lt;command&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="help">命令</h3></p>
<table>
<thead>
<tr><th style="text-align:left">命令</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">清除</td><td style="text-align:left">清除屏幕。</td></tr>
<tr><td style="text-align:left">连接</td><td style="text-align:left">连接 Milvus。</td></tr>
<tr><td style="text-align:left">创建</td><td style="text-align:left">创建 Collections、数据库、分区、用户、角色和索引。</td></tr>
<tr><td style="text-align:left">授予</td><td style="text-align:left">授予角色、权限。</td></tr>
<tr><td style="text-align:left">撤销</td><td style="text-align:left">撤销角色、权限。</td></tr>
<tr><td style="text-align:left">删除</td><td style="text-align:left">删除 Collections、数据库、分区、别名、用户、角色或索引。</td></tr>
<tr><td style="text-align:left">退出</td><td style="text-align:left">关闭命令行窗口。</td></tr>
<tr><td style="text-align:left">帮助</td><td style="text-align:left">显示命令使用帮助。</td></tr>
<tr><td style="text-align:left">插入</td><td style="text-align:left">将数据导入分区。</td></tr>
<tr><td style="text-align:left">列表</td><td style="text-align:left">列出 Collections、数据库、分区、用户、角色、授权或索引。</td></tr>
<tr><td style="text-align:left">加载</td><td style="text-align:left">加载一个 Collection 或分区。</td></tr>
<tr><td style="text-align:left">查询</td><td style="text-align:left">显示符合所有输入条件的查询结果。</td></tr>
<tr><td style="text-align:left">释放</td><td style="text-align:left">释放一个 Collection 或分区。</td></tr>
<tr><td style="text-align:left">搜索</td><td style="text-align:left">执行向量相似性搜索或混合搜索。</td></tr>
<tr><td style="text-align:left">显示</td><td style="text-align:left">显示连接、数据库、Collection、加载进度或索引进度。</td></tr>
<tr><td style="text-align:left">重命名</td><td style="text-align:left">重命名 Collections</td></tr>
<tr><td style="text-align:left">使用</td><td style="text-align:left">使用数据库</td></tr>
<tr><td style="text-align:left">版本</td><td style="text-align:left">显示 Milvus_CLI 的版本。</td></tr>
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
    </button></h2><p>将本地或远程数据导入分区。</p>
<p><h3 id="insert">语法</h3></p>
<pre><code translate="no" class="language-shell">insert file -c (text) [-p (text)] [-t (text)] &lt;file_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-collection-名称</td><td style="text-align:left">插入数据的 Collections 名称。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分区</td><td style="text-align:left">(可选）插入数据的分区名称。不通过此分区选项表示选择"_默认 "分区。</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-超时</td><td style="text-align:left">(可选）可选的 RPC 时长（以秒为单位）。如果未设置超时，客户端将一直等待，直到服务器做出响应或发生错误。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<p><h3 id="insert">示例 1</h3>
下面的示例导入了一个本地 CSV 文件。</p>
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
<p><h3 id="insert">示例 2</h3>
下面的示例导入了一个远程 CSV 文件。</p>
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
    </button></h2><p>向 Collections 插入一行数据。</p>
<p><h3 id="insert-row">语法</h3></p>
<pre><code translate="no" class="language-shell">insert row
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="insert-row">交互式示例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; insert row

Collection name: car
Partition name [_default]: _default
Enter value for id (INT64): 1
Enter value for vector (FLOAT_VECTOR): [1.0, 2.0, 3.0]
Enter value for color (INT64): 100
Enter value for brand (VARCHAR): Toyota

Inserted successfully.
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-users" class="common-anchor-header">列出用户<button data-href="#list-users" class="anchor-icon" translate="no">
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
    </button></h2><p>列出所有用户。</p>
<h3 id="Syntax" class="common-anchor-header">语法</h3><pre><code translate="no" class="language-shell">list users
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">选项</h3><p>| Option | Full name | Description | | --help | n/a | 显示命令使用帮助。|</p>
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
<p><h3 id="list-role">语法</h3></p>
<pre><code translate="no" class="language-shell">list roles
<button class="copy-code-btn"></button></code></pre>
<h3 id="Options" class="common-anchor-header">选项</h3><table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">示例</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; list roles
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-grants" class="common-anchor-header">列出拨款<button data-href="#List-grants" class="anchor-icon" translate="no">
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
    </button></h2><p>列出 Milvus 中的授权</p>
<h3 id="Options" class="common-anchor-header">选项</h3><table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全称</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-r</td><td style="text-align:left">-角色名称</td><td style="text-align:left">milvus 角色的角色名称。</td></tr>
<tr><td style="text-align:left">-o</td><td style="text-align:left">-对象名称</td><td style="text-align:left">milvus 对象的对象名称。</td></tr>
<tr><td style="text-align:left">-t</td><td style="text-align:left">-对象类型</td><td style="text-align:left">全局、Collection 或用户。</td></tr>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h3 id="Examples" class="common-anchor-header">示例</h3><pre><code translate="no" class="language-shell">milvus_cli &gt; list grants -r role1 -o object1 -t Collection
<button class="copy-code-btn"></button></code></pre>
<h2 id="list-collections" class="common-anchor-header">list Collections<button data-href="#list-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>列出所有 Collections。</p>
<p><h3 id="list-collections">语法<h3></p>
<pre><code translate="no" class="language-shell">list collections
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-collections">选项<h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
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
    </button></h2><p>列出 Collections 的所有索引。</p>
<div class="alert note">目前，一个 Collection 最多支持一个索引。 </div>
<p><h3 id="list-indexes">语法</h3></p>
<pre><code translate="no" class="language-shell">list indexes -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-indexes">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Collection-名称</td><td style="text-align:left">Collections 的名称。</td></tr>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h2 id="list-partitions" class="common-anchor-header">列出分区<button data-href="#list-partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>列出 Collections 的所有分区。</p>
<p><h3 id="list-partitions">语法</h3></p>
<pre><code translate="no" class="language-shell">list partitions -c (text)
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="list-partitions">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Collection-名称</td><td style="text-align:left">Collections 的名称。</td></tr>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h2 id="load" class="common-anchor-header">加载<button data-href="#load" class="anchor-icon" translate="no">
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
    </button></h2><p>将一个 Collection 或分区从硬盘空间加载到 RAM。</p>
<p><h3 id="load">语法</h3></p>
<pre><code translate="no" class="language-shell">load collection -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="load">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Collection-名称</td><td style="text-align:left">分区所属 Collections 的名称。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分区</td><td style="text-align:left">(可选/多个）分区的名称。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h2 id="query" class="common-anchor-header">查询<button data-href="#query" class="anchor-icon" translate="no">
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
    </button></h2><p>显示符合所有输入条件的查询结果。</p>
<p><h3 id="query">语法</h3></p>
<pre><code translate="no" class="language-shell">query
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="query">交互式 示例</h3></p>
<pre><code translate="no" class="language-shell">milvus_cli &gt; query

Collection name: car

The query expression: id in [ 428960801420883491, 428960801420883492, 428960801420883493 ]

Name of partitions that contain entities(split by &quot;,&quot; if multiple) []: default

A list of fields to return(split by &quot;,&quot; if multiple) []: color, brand

timeout []:

Guarantee timestamp. This instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date. [0]:

Graceful time. Only used in bounded consistency level. If graceful_time is set, PyMilvus will use current timestamp minus the graceful_time as the guarantee_timestamp. This option is 5s by default if not set. [5]:
<button class="copy-code-btn"></button></code></pre>
<h2 id="release" class="common-anchor-header">释放<button data-href="#release" class="anchor-icon" translate="no">
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
    </button></h2><p>从 RAM 中释放一个 Collection 或分区。</p>
<p><h3 id="release">语法</h3></p>
<pre><code translate="no" class="language-shell">release collection -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="release">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Collection-名称</td><td style="text-align:left">分区所属 Collections 的名称。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分区</td><td style="text-align:left">(可选/多个）分区的名称。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h2 id="search" class="common-anchor-header">搜索<button data-href="#search" class="anchor-icon" translate="no">
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
    </button></h2><p>执行向量相似性搜索或混合搜索。</p>
<p><h3 id="search">语法</h3></p>
<pre><code translate="no" class="language-shell">search
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="search">交互式示例</h3></p>
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
<h2 id="list-connection" class="common-anchor-header">列出连接<button data-href="#list-connection" class="anchor-icon" translate="no">
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
    </button></h2><p>列出连接。</p>
<p><h3 id="show-connection">语法</h3></p>
<pre><code translate="no" class="language-shell">list connections
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-connection">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
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
    </button></h2><p>显示实体索引的进度。</p>
<p><h3 id="show-index-progress">语法</h3></p>
<pre><code translate="no" class="language-shell">show index_progress -c (text) [-i (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-index-progress">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全名</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Collection-名称</td><td style="text-align:left">实体所属 Collections 的名称。</td></tr>
<tr><td style="text-align:left">-i</td><td style="text-align:left">-索引</td><td style="text-align:left">(可选）索引名称。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<h2 id="show-loadingprogress" class="common-anchor-header">显示加载进度<button data-href="#show-loadingprogress" class="anchor-icon" translate="no">
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
    </button></h2><p>显示 Collections 的加载进度。</p>
<p><h3 id="show-loading-progress">语法</h3></p>
<pre><code translate="no" class="language-shell">show loading_progress -c (text) [-p (text)]
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="show-loading-progress">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全称</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-c</td><td style="text-align:left">-Collection-名称</td><td style="text-align:left">实体所属 Collections 的名称。</td></tr>
<tr><td style="text-align:left">-p</td><td style="text-align:left">-分区</td><td style="text-align:left">(可选/多个）加载分区的名称。</td></tr>
<tr><td style="text-align:left">-help</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
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
    </button></h2><p>显示 Milvus_CLI 的版本。</p>
<p><h3 id="version">语法</h3></p>
<pre><code translate="no" class="language-shell">version
<button class="copy-code-btn"></button></code></pre>
<p><h3 id="version">选项</h3></p>
<table>
<thead>
<tr><th style="text-align:left">选项</th><th style="text-align:left">全称</th><th style="text-align:left">说明</th></tr>
</thead>
<tbody>
<tr><td style="text-align:left">-帮助</td><td style="text-align:left">不适用</td><td style="text-align:left">显示命令使用帮助。</td></tr>
</tbody>
</table>
<div class="alert note">也可以在 shell 中检查 Milvus_CLI 的版本，如下例所示。在这种情况下，<code translate="no">milvus_cli --version</code> 充当命令。</div>
<p><h3 id="version">示例</h3></p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">milvus_cli --version</span>
Milvus_CLI v0.4.0
<button class="copy-code-btn"></button></code></pre>
