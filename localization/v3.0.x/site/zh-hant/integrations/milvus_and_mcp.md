---
id: milvus_and_mcp.md
summary: 本教學教導您設定 Milvus 的 MCP 伺服器，讓 AI 應用程式可以使用自然語言指令執行向量搜尋、管理集合及擷取資料，而無須撰寫自訂的資料庫查詢。
title: MCP + Milvus：將 AI 與向量資料庫連結在一起
---
<h1 id="MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="common-anchor-header">MCP + Milvus：連結 AI 與向量資料庫<button data-href="#MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="anchor-icon" translate="no">
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
<h2 id="Introduction" class="common-anchor-header">簡介<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Model Context Protocol (MCP)</strong>是一種開放式<strong>通訊協定</strong>，可讓 Claude 和 Cursor 等 AI 應用程式與外部資料來源和工具進行無縫互動。無論您是要建立自訂的 AI 應用程式、整合 AI 工作流程或強化聊天介面，MCP 都提供了標準化的方式來連接大型語言模型 (LLM) 與相關的情境資料。</p>
<p>本教學教導您如何<strong>為 Milvus 設定 MCP 伺服器</strong>，讓 AI 應用程式可以執行向量搜尋、管理集合，並使用<strong>自然語言指令擷取</strong>資料，<strong>而無需</strong>撰寫自訂資料庫查詢。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>在設定 MCP 伺服器之前，請確保您擁有</p>
<ul>
<li>Python 3.10 或更高版本</li>
<li>運行中的<a href="https://milvus.io/">Milvus</a>實例</li>
<li><a href="https://github.com/astral-sh/uv">uv</a>(建議用於執行伺服器)</li>
</ul>
<h2 id="Getting-Started" class="common-anchor-header">開始使用<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>使用此 MCP 伺服器的建議方式是直接使用 uv 執行，無須安裝。在下面的例子中，Claude Desktop 和 Cursor 都是這樣配置使用它的。</p>
<p>如果您想要克隆資源庫：</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/mcp-server-milvus.git
<span class="hljs-built_in">cd</span> mcp-server-milvus
<button class="copy-code-btn"></button></code></pre>
<p>則可以直接執行伺服器：</p>
<pre><code translate="no" class="language-bash">uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Supported-Applications" class="common-anchor-header">支援的應用程式<button data-href="#Supported-Applications" class="anchor-icon" translate="no">
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
    </button></h2><p>此 MCP 伺服器可與支援模型上下文通訊協定的各種 AI 應用程式搭配使用，例如</p>
<ul>
<li><strong>Claude Desktop</strong>：Anthropic 的 Claude 桌面應用程式</li>
<li><strong>Cursor</strong>：在其 Composer 功能中支援 MCP 的 AI 程式碼編輯器</li>
<li><strong>其他自訂</strong>MCP 用戶端 任何實作 MCP 用戶端規格的應用程式</li>
</ul>
<h2 id="Using-MCP-with-Claude-Desktop" class="common-anchor-header">在 Claude Desktop 中使用 MCP<button data-href="#Using-MCP-with-Claude-Desktop" class="anchor-icon" translate="no">
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
<li>安裝<a href="https://claude.ai/download">Claude Desktop</a>。</li>
<li>開啟 Claude 配置檔案：<ul>
<li>在 macOS 上：<code translate="no">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
</ul></li>
<li>新增下列設定：</li>
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
<li>重新啟動 Claude Desktop 以套用變更。</li>
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
    </button></h2><p><a href="https://docs.cursor.com/context/model-context-protocol">Cursor</a>也透過 Composer 中的 Agent 功能支援 MCP 工具。您可以透過兩種方式將 Milvus MCP 伺服器新增至 Cursor：</p>
<h3 id="Option-1-Using-Cursor-Settings-UI" class="common-anchor-header">選項 1：使用 Cursor 設定 UI<button data-href="#Option-1-Using-Cursor-Settings-UI" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>開啟<code translate="no">Cursor Settings</code> →<code translate="no">Features</code> →<code translate="no">MCP</code> 。</li>
<li>按一下<code translate="no">+ Add New MCP Server</code> 。</li>
<li>填寫<ul>
<li>類型：<code translate="no">stdio</code></li>
<li>名稱：<code translate="no">milvus</code></li>
<li>指令：<pre><code translate="no" class="language-bash">/PATH/TO/uv --directory /path/to/mcp-server-milvus/src/mcp_server_milvus run server.py --milvus-uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre></li>
<li>⚠️ 提示：使用<code translate="no">127.0.0.1</code> 而非<code translate="no">localhost</code> ，以避免潛在的 DNS 解析問題。</li>
</ul></li>
</ol>
<h3 id="Option-2-Using-Project-specific-Configuration-Recommended" class="common-anchor-header">選項 2：使用專案特定組態 (建議)<button data-href="#Option-2-Using-Project-specific-Configuration-Recommended" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>在<strong>專案根目錄中</strong>建立<code translate="no">.cursor/mcp.json</code> 檔案：</li>
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
<li>重新啟動 Cursor 以套用組態。</li>
</ol>
<p>新增伺服器後，您可能需要按下 MCP 設定中的刷新按鈕，以填充工具清單。當與您的查詢相關時，Composer Agent 會自動使用 Milvus 工具。</p>
<h2 id="Verifying-the-Integration" class="common-anchor-header">驗證整合<button data-href="#Verifying-the-Integration" class="anchor-icon" translate="no">
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
    </button></h2><p>確保 MCP 伺服器設定正確：</p>
<h3 id="For-Cursor" class="common-anchor-header">針對游標<button data-href="#For-Cursor" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>前往<code translate="no">Cursor Settings</code> →<code translate="no">Features</code> →<code translate="no">MCP</code> 。</li>
<li>確認<code translate="no">&quot;Milvus&quot;</code> 出現在 MCP 伺服器清單中。</li>
<li>檢查是否列出 Milvus 工具 (例如<code translate="no">milvus_list_collections</code>,<code translate="no">milvus_vector_search</code>)。</li>
<li>如果出現錯誤，請參閱下面的<strong>疑難排解</strong>部分。</li>
</ol>
<h2 id="MCP-Server-Tools-for-Milvus" class="common-anchor-header">適用於 Milvus 的 MCP 伺服器工具<button data-href="#MCP-Server-Tools-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>此 MCP 伺服器提供多種工具，用於<strong>搜尋、查詢和管理 Milvus 中的向量資料</strong>。如需詳細資訊，請參閱<a href="https://github.com/zilliztech/mcp-server-milvus">mcp-server-milvus</a>文件。</p>
<h3 id="🔍-Search-and-Query-Tools" class="common-anchor-header">🔍 搜尋和查詢工具<button data-href="#🔍-Search-and-Query-Tools" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong><code translate="no">milvus-text-search</code></strong>→ 使用全文檢索搜尋文件。</li>
<li><strong><code translate="no">milvus-vector-search</code></strong>→ 在資料集中執行向量相似性搜尋。</li>
<li><strong><code translate="no">milvus-hybrid-search</code></strong>→ 執行結合向量相似性和屬性篩選的混合搜尋。</li>
<li><strong><code translate="no">milvus-multi-vector-search</code></strong>→ 使用多個查詢向量執行向量相似性搜尋。</li>
<li><strong><code translate="no">milvus-query</code></strong>→ 使用篩選表達式查詢集合。</li>
<li><strong><code translate="no">milvus-count</code></strong>→ 計算集合中的實體。</li>
</ul>
<h3 id="📁-Collection-Management" class="common-anchor-header">📁 集合管理<button data-href="#📁-Collection-Management" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong><code translate="no">milvus-list-collections</code></strong>→ 列出資料庫中的所有集合。</li>
<li><strong><code translate="no">milvus-collection-info</code></strong>→ 取得關於集合的詳細資訊。</li>
<li><strong><code translate="no">milvus-get-collection-stats</code></strong>→ 取得有關集合的統計資料。</li>
<li><strong><code translate="no">milvus-create-collection</code></strong>→ 以指定的模式建立新的集合。</li>
<li><strong><code translate="no">milvus-load-collection</code></strong>→ 將集合載入記憶體以進行搜尋和查詢。</li>
<li><strong><code translate="no">milvus-release-collection</code></strong>→ 從記憶體釋放集合。</li>
<li><strong><code translate="no">milvus-get-query-segment-info</code></strong>→ 取得查詢區段的資訊。</li>
<li><strong><code translate="no">milvus-get-collection-loading-progress</code></strong>→ 取得集合的載入進度。</li>
</ul>
<h3 id="📊-Data-Operations" class="common-anchor-header">資料操作<button data-href="#📊-Data-Operations" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong><code translate="no">milvus-insert-data</code></strong>→ 將資料插入集合。</li>
<li><strong><code translate="no">milvus-bulk-insert</code></strong>→ 分批插入資料以獲得更好的效能。</li>
<li><strong><code translate="no">milvus-upsert-data</code></strong>→ 將資料上插入集合（如果存在，則插入或更新）。</li>
<li><strong><code translate="no">milvus-delete-entities</code></strong>→ 根據篩選表達式從集合中刪除實體。</li>
<li><strong><code translate="no">milvus-create-dynamic-field</code></strong>→ 將動態欄位新增至現有的集合。</li>
</ul>
<h3 id="⚙️-Index-Management" class="common-anchor-header">⚙️ 索引管理<button data-href="#⚙️-Index-Management" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong><code translate="no">milvus-create-index</code></strong>→ 在向量欄位上建立索引。</li>
<li><strong><code translate="no">milvus-get-index-info</code></strong>→ 獲取關於集合中索引的資訊。</li>
</ul>
<h2 id="Environment-Variables" class="common-anchor-header">環境變數<button data-href="#Environment-Variables" class="anchor-icon" translate="no">
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
<li><strong><code translate="no">MILVUS_URI</code></strong>→ Milvus 伺服器 URI (可以設定為<code translate="no">--milvus-uri</code>)。</li>
<li><strong><code translate="no">MILVUS_TOKEN</code></strong>→ 可選的驗證標記。</li>
<li><strong><code translate="no">MILVUS_DB</code></strong>→ 資料庫名稱（預設為 "default"）。</li>
</ul>
<h2 id="Development" class="common-anchor-header">開發<button data-href="#Development" class="anchor-icon" translate="no">
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
    </button></h2><p>直接執行伺服器：</p>
<pre><code translate="no" class="language-bash">uv run server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">範例<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Using-Claude-Desktop" class="common-anchor-header">使用 Claude 桌面<button data-href="#Using-Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Example-1-Listing-Collections" class="common-anchor-header">範例 1：列出集合</h4><pre><code translate="no">What are the collections <span class="hljs-selector-tag">I</span> have in my Milvus DB?
<button class="copy-code-btn"></button></code></pre>
<p>Claude 然後使用 MCP 在我們的 Milvus DB 上檢查這些資訊。</p>
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
<h4 id="Example-2-Searching-for-Documents" class="common-anchor-header">範例 2：搜尋文件</h4><pre><code translate="no">Find documents in <span class="hljs-keyword">my</span> text_collection that mention <span class="hljs-string">&quot;machine learning&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Claude 將使用 Milvus 的全文搜尋功能來尋找相關文件：</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll search for documents about machine learning in your text_collection.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-<span class="hljs-keyword">text</span>-search <span class="hljs-keyword">from</span> milvus (local)

Here are the documents I found that mention machine learning:
[Results will appear here based <span class="hljs-keyword">on</span> your actual data]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-Cursor" class="common-anchor-header">使用游標<button data-href="#Using-Cursor" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Example-Creating-a-Collection" class="common-anchor-header">範例：建立收藏集</h4><p>在 Cursor 的 Composer 中，您可以詢問：</p>
<pre><code translate="no">Create a <span class="hljs-keyword">new</span> collection called <span class="hljs-string">&#x27;articles&#x27;</span> <span class="hljs-function"><span class="hljs-keyword">in</span> Milvus <span class="hljs-keyword">with</span> fields <span class="hljs-keyword">for</span> <span class="hljs-title">title</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-title">content</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-keyword">and</span> a vector <span class="hljs-title">field</span> (<span class="hljs-params"><span class="hljs-number">128</span> dimensions</span>)
</span><button class="copy-code-btn"></button></code></pre>
<p>Cursor 將使用 MCP 伺服器來執行此操作：</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll create a new collection called &#x27;articles&#x27; with the specified fields.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-create-collection <span class="hljs-keyword">from</span> milvus (local)

Collection <span class="hljs-comment">&#x27;articles&#x27; has been created successfully with the following schema:</span>
- title: <span class="hljs-type">string</span>
- content: <span class="hljs-type">string</span>
- vector: float vector[<span class="hljs-number">128</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Troubleshooting" class="common-anchor-header">疑難排解<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Common-Issues" class="common-anchor-header">常見問題<button data-href="#Common-Issues" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="Connection-Errors" class="common-anchor-header">連線錯誤</h4><p>如果您看到類似 "Failed to connect to Milvus server"（連接 Milvus 伺服器失敗）的錯誤：</p>
<ol>
<li>確認您的 Milvus 實例正在執行：<code translate="no">docker ps</code> (如果使用 Docker)</li>
<li>檢查配置中的 URI 是否正確</li>
<li>確保沒有防火牆規則阻擋連線</li>
<li>嘗試在 URI 中使用<code translate="no">127.0.0.1</code> 而非<code translate="no">localhost</code> </li>
</ol>
<h4 id="Authentication-Issues" class="common-anchor-header">驗證問題</h4><p>如果您看到驗證錯誤</p>
<ol>
<li>驗證您的<code translate="no">MILVUS_TOKEN</code> 是否正確</li>
<li>檢查您的 Milvus 實例是否需要驗證</li>
<li>確保您有正確的權限來執行您要執行的操作</li>
</ol>
<h4 id="Tool-Not-Found" class="common-anchor-header">找不到工具</h4><p>如果 MCP 工具沒有出現在 Claude Desktop 或 Cursor：</p>
<ol>
<li>重新啟動應用程式</li>
<li>檢查伺服器日誌是否有任何錯誤</li>
<li>驗證 MCP 伺服器是否正常執行</li>
<li>按下 MCP 設定中的刷新按鈕（適用於 Cursor）</li>
</ol>
<h3 id="Getting-Help" class="common-anchor-header">取得協助<button data-href="#Getting-Help" class="anchor-icon" translate="no">
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
    </button></h3><p>如果您繼續遇到問題</p>
<ol>
<li>檢查<a href="https://github.com/zilliztech/mcp-server-milvus/issues">GitHub Issues</a>中的類似問題</li>
<li>加入<a href="https://discord.gg/zilliz">Zilliz 社群 Discord</a>以獲得支援</li>
<li>提交一個新的問題，並提供有關您問題的詳細資訊</li>
</ol>
<h2 id="Conclusion" class="common-anchor-header">總結<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>依照本教學，您現在已經可以執行<strong>MCP 伺服器</strong>，在 Milvus 中啟用 AI 驅動的向量搜尋。無論您使用的是<strong>Claude Desktop</strong>或<strong>Cursor</strong>，現在都可以使用<strong>自然語言指令來</strong>查詢、管理和搜尋 Milvus 資料庫，<strong>而無需</strong>撰寫資料庫程式碼！</p>
