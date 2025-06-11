---
id: NLWeb_with_milvus.md
summary: >-
  了解如何将 Microsoft NLWeb 与 Milvus 集成，为网站构建强大的自然语言界面。本教程演示了如何在 NLWeb 应用程序中利用
  Milvus 的向量数据库功能进行高效语义搜索、嵌入存储和上下文检索。
title: 与 Milvus 一起使用 NLWeb
---
<h1 id="Using-NLWeb-with-Milvus" class="common-anchor-header">与 Milvus 一起使用 NLWeb<button data-href="#Using-NLWeb-with-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://github.com/microsoft/NLWeb">微软的 NLWeb</a>是一个拟议的框架，可使用<a href="https://schema.org/">Schema.org</a>、RSS 等格式和新兴的 MCP 协议为网站提供自然语言界面。</p>
<p><a href="https://milvus.io/">Milvus</a>作为 NLWeb 中的向量数据库后端，支持嵌入存储和高效向量相似性搜索，从而为自然语言处理应用实现强大的上下文检索功能。</p>
<blockquote>
<p>本文档主要基于官方<a href="https://github.com/microsoft/NLWeb/blob/main/HelloWorld.md">快速入门</a>文档。如果您发现任何过时或不一致的内容，请优先使用官方文档，并随时向我们提出问题。</p>
</blockquote>
<h2 id="Usage" class="common-anchor-header">使用方法<button data-href="#Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>NLWeb 可以配置为使用 Milvus 作为检索引擎。以下是如何使用 Milvus 设置和使用 NLWeb 的指南。</p>
<h3 id="Installation" class="common-anchor-header">安装</h3><p>克隆版本库并设置环境：</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/microsoft/NLWeb
<span class="hljs-built_in">cd</span> NLWeb
python -m venv .venv
<span class="hljs-built_in">source</span> .venv/bin/activate  <span class="hljs-comment"># or `.venv\Scripts\activate` on Windows</span>
<span class="hljs-built_in">cd</span> code
pip install -r requirements.txt
pip install pymilvus  <span class="hljs-comment"># Add Milvus Python client</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Configuring-Milvus" class="common-anchor-header">配置 Milvus</h3><p>要使用<strong>Milvus</strong>，请更新配置。</p>
<h4 id="Update-config-files-in-codeconfig" class="common-anchor-header">更新配置文件<code translate="no">code/config</code></h4><p>打开<code translate="no">config_retrieval.yaml</code> 文件，添加 Milvus 配置：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">preferred_endpoint:</span> <span class="hljs-string">milvus_local</span>

<span class="hljs-attr">endpoints:</span>
  <span class="hljs-attr">milvus_local:</span>
    <span class="hljs-attr">database_path:</span> <span class="hljs-string">&quot;../data/milvus.db&quot;</span>
    <span class="hljs-comment"># Set the collection name to use</span>
    <span class="hljs-attr">index_name:</span> <span class="hljs-string">nlweb_collection</span>
    <span class="hljs-comment"># Specify the database type</span>
    <span class="hljs-attr">db_type:</span> <span class="hljs-string">milvus</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Loading-Data" class="common-anchor-header">加载数据</h3><p>配置完成后，使用 RSS 源加载内容。</p>
<p>从<code translate="no">code</code> 目录加载内容：</p>
<pre><code translate="no" class="language-bash">python -m tools.db_load https://feeds.libsyn.com/121695/rss Behind-the-Tech
<button class="copy-code-btn"></button></code></pre>
<p>这将把内容摄取到你的 Milvus Collections 中，同时存储文本数据和向量嵌入。</p>
<h3 id="Running-the-Server" class="common-anchor-header">运行服务器</h3><p>要启动 NLWeb，请从<code translate="no">code</code> 目录运行：</p>
<pre><code translate="no" class="language-bash">python app-file.py
<button class="copy-code-btn"></button></code></pre>
<p>现在，您可以使用 http://localhost:8000/ 的网络用户界面或直接通过与 MCP 兼容的 REST API，通过自然语言查询内容。</p>
<h2 id="Further-Reading" class="common-anchor-header">更多阅读<button data-href="#Further-Reading" class="anchor-icon" translate="no">
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
<li><a href="https://milvus.io/docs">Milvus 文档</a></li>
<li><a href="https://github.com/microsoft/NLWeb">NLWeb 源</a></li>
<li>聊天查询的生命</li>
<li>通过更改提示修改行为</li>
<li>修改控制流</li>
<li>修改用户界面</li>
</ul>
