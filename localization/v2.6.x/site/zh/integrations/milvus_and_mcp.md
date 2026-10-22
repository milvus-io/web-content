---
id: milvus_and_mcp.md
summary: >-
  本教程将指导您为 Milvus 设置 MCP 服务器，让人工智能应用程序能够使用自然语言命令执行向量搜索、管理 Collections
  和检索数据，而无需编写自定义数据库查询。
title: MCP + Milvus：连接人工智能与向量数据库
---
<h1 id="MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="common-anchor-header">MCP + Milvus：连接人工智能与向量数据库<button data-href="#MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="anchor-icon" translate="no">
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
    </button></h1><iframe width="560" height="315" src="https://www.youtube.com/embed/0wAsrUxv8gM?si=BVyRqLJ2PuZIBF5c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h2 id="Introduction" class="common-anchor-header">简介<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>模型上下文协议（MCP）</strong>是一种开放式协议，可使人工智能应用程序（如 Claude 和 Cursor）与外部数据源和工具进行无缝交互。无论您是要构建自定义 AI 应用程序、集成 AI 工作流，还是要增强聊天界面，MCP 都能提供一种标准化的方式，将大型语言模型 (LLM) 与相关上下文数据连接起来。</p>
<p>本教程将指导您<strong>为 Milvus 设置 MCP 服务器</strong>，让人工智能应用能够使用<strong>自然语言命令</strong>执行向量搜索、管理 Collections 和检索数据，<strong>而无需</strong>编写自定义数据库查询。</p>
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
    </button></h2><p>在设置 MCP 服务器之前，请确保您拥有</p>
<ul>
<li>Python 3.10 或更高版本</li>
<li>运行中的<a href="https://milvus.io/">Milvus</a>实例</li>
<li><a href="https://github.com/astral-sh/uv">uv</a>（建议用于运行服务器）</li>
</ul>
<h2 id="Getting-Started" class="common-anchor-header">开始使用<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>使用此 MCP 服务器的推荐方法是直接使用 uv 运行，无需安装。在下面的示例中，Claude Desktop 和 Cursor 就是这样配置的。</p>
<p>如果要克隆版本库：</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/mcp-server-milvus.git
<span class="hljs-built_in">cd</span> mcp-server-milvus
<button class="copy-code-btn"></button></code></pre>
<p>则可直接运行服务器：</p>
<pre><code translate="no" class="language-bash">uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Supported-Applications" class="common-anchor-header">支持的应用程序<button data-href="#Supported-Applications" class="anchor-icon" translate="no">
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
    </button></h2><p>此 MCP 服务器可与各种支持模型上下文协议的 AI 应用程序配合使用，例如</p>
<ul>
<li><strong>Claude Desktop</strong>：Anthropic 的Claude Desktop应用程序</li>
<li><strong>Cursor</strong>：人工智能代码编辑器，其 Composer 功能支持 MCP</li>
<li><strong>其他自定义 MCP 客户端</strong>任何执行 MCP 客户端规范的应用程序</li>
</ul>
<h2 id="Using-MCP-with-Claude-Desktop" class="common-anchor-header">将 MCP 与 Claude Desktop 结合使用<button data-href="#Using-MCP-with-Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>安装<a href="https://claude.ai/download">Claude Desktop</a>。</li>
<li>打开 Claude 配置文件：<ul>
<li>在 macOS 上：<code translate="no">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
</ul></li>
<li>添加以下配置：</li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;milvus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;--directory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;run&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;server.py&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;--milvus-uri&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>重新启动 Claude Desktop 以应用更改。</li>
</ol>
<h2 id="Using-MCP-with-Cursor" class="common-anchor-header">在 Cursor 中使用 MCP<button data-href="#Using-MCP-with-Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.cursor.com/context/model-context-protocol">Cursor</a>还通过 Composer 中的 Agents 功能支持 MCP 工具。您可以通过两种方式将 Milvus MCP 服务器添加到 Cursor：</p>
<h3 id="Option-1-Using-Cursor-Settings-UI" class="common-anchor-header">选项 1：使用 Cursor 设置用户界面</h3><ol>
<li>打开<code translate="no">Cursor Settings</code> →<code translate="no">Features</code> →<code translate="no">MCP</code> 。</li>
<li>单击<code translate="no">+ Add New MCP Server</code> 。</li>
<li>填写：<ul>
<li>类型：<code translate="no">stdio</code></li>
<li>名称：<code translate="no">milvus</code></li>
<li>命令：<pre><code translate="no" class="language-bash">/PATH/TO/uv --directory /path/to/mcp-server-milvus/src/mcp_server_milvus run server.py --milvus-uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre></li>
<li>⚠️ 提示：使用<code translate="no">127.0.0.1</code> 而不是<code translate="no">localhost</code> ，以避免潜在的 DNS 解析问题。</li>
</ul></li>
</ol>
<h3 id="Option-2-Using-Project-specific-Configuration-Recommended" class="common-anchor-header">选项 2：使用特定于项目的配置（推荐）</h3><ol>
<li>在<strong>项目根目录</strong>下创建<code translate="no">.cursor/mcp.json</code> 文件：</li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;milvus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;--directory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;run&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;server.py&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;--milvus-uri&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>重新启动 Cursor 以应用配置。</li>
</ol>
<p>添加服务器后，您可能需要按下 MCP 设置中的刷新按钮来填充工具列表。当与您的查询相关时，Composer Agent 将自动使用 Milvus 工具。</p>
<h2 id="Verifying-the-Integration" class="common-anchor-header">验证集成<button data-href="#Verifying-the-Integration" class="anchor-icon" translate="no">
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
    </button></h2><p>确保 MCP 服务器设置正确：</p>
<h3 id="For-Cursor" class="common-anchor-header">对于 Cursor</h3><ol>
<li>转到<code translate="no">Cursor Settings</code> →<code translate="no">Features</code> →<code translate="no">MCP</code> 。</li>
<li>确认<code translate="no">&quot;Milvus&quot;</code> 出现在 MCP 服务器列表中。</li>
<li>检查是否列出了 Milvus 工具（如<code translate="no">milvus_list_collections</code>,<code translate="no">milvus_vector_search</code> ）。</li>
<li>如果出现错误，请参阅下面的<strong>故障排除</strong>部分。</li>
</ol>
<h2 id="MCP-Server-Tools-for-Milvus" class="common-anchor-header">Milvus 的 MCP 服务器工具<button data-href="#MCP-Server-Tools-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>该 MCP 服务器提供多种工具，用于<strong>搜索、查询和管理 Milvus 中的向量数据</strong>。有关详细信息，请参阅<a href="https://github.com/zilliztech/mcp-server-milvus">mcp-server-milvus</a>文档。</p>
<h3 id="🔍-Search-and-Query-Tools" class="common-anchor-header">搜索和查询工具</h3><ul>
<li><strong><code translate="no">milvus-text-search</code></strong>→ 使用全文检索搜索文档。</li>
<li><strong><code translate="no">milvus-vector-search</code></strong>→ 在 Collections 上执行向量相似性搜索。</li>
<li><strong><code translate="no">milvus-hybrid-search</code></strong>→ 结合向量相似性和属性过滤执行混合搜索。</li>
<li><strong><code translate="no">milvus-multi-vector-search</code></strong>→ 使用多个查询向量执行向量相似性搜索。</li>
<li><strong><code translate="no">milvus-query</code></strong>→ 使用过滤表达式查询 Collections。</li>
<li><strong><code translate="no">milvus-count</code></strong>→ 对集合中的实体进行计数。</li>
</ul>
<h3 id="📁-Collection-Management" class="common-anchor-header">📁 Collections 管理</h3><ul>
<li><strong><code translate="no">milvus-list-collections</code></strong>→ 列出数据库中的所有 Collections。</li>
<li><strong><code translate="no">milvus-collection-info</code></strong>→ 获取有关某个 Collection 的详细信息。</li>
<li><strong><code translate="no">milvus-get-collection-stats</code></strong>→ 获取有关 Collections 的统计数据。</li>
<li><strong><code translate="no">milvus-create-collection</code></strong>→ 使用指定的 Schema 创建新 Collection。</li>
<li><strong><code translate="no">milvus-load-collection</code></strong>→ 将 Collections 加载到内存中，以便搜索和查询。</li>
<li><strong><code translate="no">milvus-release-collection</code></strong>→ 从内存中释放一个 Collection。</li>
<li><strong><code translate="no">milvus-get-query-segment-info</code></strong>→ 获取有关查询段的信息。</li>
<li><strong><code translate="no">milvus-get-collection-loading-progress</code></strong>→ 获取 Collections 的加载进度。</li>
</ul>
<h3 id="📊-Data-Operations" class="common-anchor-header">数据操作符</h3><ul>
<li><strong><code translate="no">milvus-insert-data</code></strong>→ 将数据插入 Collections。</li>
<li><strong><code translate="no">milvus-bulk-insert</code></strong>→ 分批插入数据以提高性能。</li>
<li><strong><code translate="no">milvus-upsert-data</code></strong>→ 向上插入数据到 Collections 中（如果存在，则插入或更新）。</li>
<li><strong><code translate="no">milvus-delete-entities</code></strong>→ 根据过滤表达式从 Collections 中删除实体。</li>
<li><strong><code translate="no">milvus-create-dynamic-field</code></strong>→ 向现有 Collections 添加动态字段。</li>
</ul>
<h3 id="⚙️-Index-Management" class="common-anchor-header">⚙️ 索引管理</h3><ul>
<li><strong><code translate="no">milvus-create-index</code></strong>→ 在向量字段上创建索引。</li>
<li><strong><code translate="no">milvus-get-index-info</code></strong>→ 获取集合中的索引信息。</li>
</ul>
<h2 id="Environment-Variables" class="common-anchor-header">环境变量<button data-href="#Environment-Variables" class="anchor-icon" translate="no">
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
<li><strong><code translate="no">MILVUS_URI</code></strong>→ Milvus 服务器 URI（可以设置为<code translate="no">--milvus-uri</code> ）。</li>
<li><strong><code translate="no">MILVUS_TOKEN</code></strong>→ 可选的身份验证令牌。</li>
<li><strong><code translate="no">MILVUS_DB</code></strong>→ 数据库名称（默认为 "default"）。</li>
</ul>
<h2 id="Development" class="common-anchor-header">开发<button data-href="#Development" class="anchor-icon" translate="no">
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
    </button></h2><p>直接运行服务器：</p>
<pre><code translate="no" class="language-bash">uv run server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">示例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Using-Claude-Desktop" class="common-anchor-header">使用Claude Desktop</h3><h4 id="Example-1-Listing-Collections" class="common-anchor-header">示例 1：列出 Collection</h4><pre><code translate="no">What are the collections <span class="hljs-selector-tag">I</span> have in my Milvus DB?
<button class="copy-code-btn"></button></code></pre>
<p>Claude 将使用 MCP 在我们的 Milvus DB 上检查这些信息。</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll check what collections are available in your Milvus database.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-list-collections <span class="hljs-keyword">from</span> milvus (local)

Here are the collections <span class="hljs-keyword">in</span> your Milvus database:

<span class="hljs-number">1</span>. rag_demo
<span class="hljs-number">2</span>. test
<span class="hljs-number">3</span>. chat_messages
<span class="hljs-number">4</span>. text_collection
<span class="hljs-number">5</span>. image_collection
<span class="hljs-number">6</span>. customized_setup
<span class="hljs-number">7</span>. streaming_rag_demo
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Searching-for-Documents" class="common-anchor-header">示例 2：搜索文件</h4><pre><code translate="no">Find documents in <span class="hljs-keyword">my</span> text_collection that mention <span class="hljs-string">&quot;machine learning&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Claude 将使用 Milvus 的全文搜索功能查找相关文档：</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll search for documents about machine learning in your text_collection.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-<span class="hljs-keyword">text</span>-search <span class="hljs-keyword">from</span> milvus (local)

Here are the documents I found that mention machine learning:
[Results will appear here based <span class="hljs-keyword">on</span> your actual data]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-Cursor" class="common-anchor-header">使用 Cursor</h3><h4 id="Example-Creating-a-Collection" class="common-anchor-header">示例：创建 Collections</h4><p>在 Cursor 的 Composer 中，你可以询问：</p>
<pre><code translate="no">Create a <span class="hljs-keyword">new</span> collection called <span class="hljs-string">&#x27;articles&#x27;</span> <span class="hljs-function"><span class="hljs-keyword">in</span> Milvus <span class="hljs-keyword">with</span> fields <span class="hljs-keyword">for</span> <span class="hljs-title">title</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-title">content</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-keyword">and</span> a vector <span class="hljs-title">field</span> (<span class="hljs-params"><span class="hljs-number">128</span> dimensions</span>)
</span><button class="copy-code-btn"></button></code></pre>
<p>Cursor 将使用 MCP 服务器执行此操作：</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll create a new collection called &#x27;articles&#x27; with the specified fields.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-create-collection <span class="hljs-keyword">from</span> milvus (local)

Collection <span class="hljs-comment">&#x27;articles&#x27; has been created successfully with the following schema:</span>
- title: <span class="hljs-type">string</span>
- content: <span class="hljs-type">string</span>
- vector: float vector[<span class="hljs-number">128</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Troubleshooting" class="common-anchor-header">故障排除<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Common-Issues" class="common-anchor-header">常见问题</h3><h4 id="Connection-Errors" class="common-anchor-header">连接错误</h4><p>如果看到类似 "连接 Milvus 服务器失败 "的错误：</p>
<ol>
<li>验证你的 Milvus 实例是否正在运行：<code translate="no">docker ps</code> （如果使用 Docker）</li>
<li>检查配置中的 URI 是否正确</li>
<li>确保没有防火墙规则阻止连接</li>
<li>尝试在 URI 中使用<code translate="no">127.0.0.1</code> 而不是<code translate="no">localhost</code> </li>
</ol>
<h4 id="Authentication-Issues" class="common-anchor-header">身份验证问题</h4><p>如果出现身份验证错误</p>
<ol>
<li>验证<code translate="no">MILVUS_TOKEN</code> 是否正确</li>
<li>检查你的 Milvus 实例是否需要身份验证</li>
<li>确保您有正确的权限来执行您尝试执行的操作符</li>
</ol>
<h4 id="Tool-Not-Found" class="common-anchor-header">找不到工具</h4><p>如果 MCP 工具没有出现在Claude Desktop 或 Cursor 中：</p>
<ol>
<li>重新启动应用程序</li>
<li>检查服务器日志是否有任何错误</li>
<li>确认 MCP 服务器运行正常</li>
<li>按下 MCP 设置中的刷新按钮（适用于 Cursor）</li>
</ol>
<h3 id="Getting-Help" class="common-anchor-header">获取帮助</h3><p>如果您继续遇到问题：</p>
<ol>
<li>查看<a href="https://github.com/zilliztech/mcp-server-milvus/issues">GitHub Issues</a>中的类似问题</li>
<li>加入<a href="https://discord.gg/zilliz">Zilliz 社区 Discord</a>寻求支持</li>
<li>提交一个新问题，并详细说明您的问题</li>
</ol>
<h2 id="Conclusion" class="common-anchor-header">结论<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>通过本教程，你现在已经可以运行<strong>MCP 服务器</strong>，在 Milvus 中启用人工智能驱动的向量搜索了。无论您使用的是<strong>Claude Desktop</strong>还是<strong>Cursor</strong>，现在都可以使用<strong>自然语言命令</strong>查询、管理和搜索 Milvus 数据库，<strong>而无需</strong>编写数据库代码！</p>
