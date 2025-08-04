---
id: milvus-sdk-helper-mcp.md
title: Milvus SDK 程式碼協助指南
summary: ⚡️ 一次設定，永遠提升效率！
---
<h1 id="Milvus-SDK-Code-Helper-Guide" class="common-anchor-header">Milvus SDK 程式碼協助指南<button data-href="#Milvus-SDK-Code-Helper-Guide" class="anchor-icon" translate="no">
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
    </button></h1><h1 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>⚡️ 一次設定，永遠提升效率！</p>
<p>還在為 LLM 過時的結果而煩惱？厭倦了 LLM 在版本更新後仍然輸出過時的內容？嘗試這個mcp，一勞永逸地解決開發Milvus相關程式碼時的資訊滯後問題！</p>
<p>Milvus 官方 SDK 程式碼助手已經上線 - 只要找到對應的 AI IDE，配置一次，就可以讓 AI 為你寫出<strong>官方推薦</strong>的 Milvus 程式碼。徹底告別過時的框架！</p>
<p>➡️ 現在就跳轉：<a href="#Quickstart">快速入門</a></p>
<h1 id="Effect-display" class="common-anchor-header">效果顯示<button data-href="#Effect-display" class="anchor-icon" translate="no">
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
    </button></h1><p>下圖比較了使用和不使用 Milvus SDK 程式碼助手產生程式碼的效果。如果不使用 Milvus SDK 代碼輔助器，寫出的代碼會沿用舊的 ORM SDK 方式，不再建議使用。以下是使用和不使用代碼助手MCP的代碼截圖比較：</p>
<table>
   <tr>
     <th><p><strong>啟用</strong>MCP 代碼輔助器</p></th>
     <th><p><strong>停用</strong>MCP 代碼助手</p></th>
   </tr>
   <tr>
     <td><p><img translate="no" width="400" src="/docs/v2.6.x/assets/code-helper-enabled.png" alt="Code Helper Enabled" /></p></td>
     <td><p><img translate="no" width="400"src="/docs/v2.6.x/assets/code-helper-disabled.png" alt="Code Helper Disabled" /></p></td>
   </tr>
   <tr>
     <td><p>使用官方推薦的最新 MilvusClient 介面來建立一個 Collection</p></td>
     <td><p>不建議使用舊的 ORM 介面來建立一個 Collection。</p></td>
   </tr>
</table>
<h1 id="Quickstart" class="common-anchor-header">快速入門<button data-href="#Quickstart" class="anchor-icon" translate="no">
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
    </button></h1><p>尋找您的 AI IDE，一鍵設定，解鎖無憂的編碼旅程。</p>
<h2 id="Cursor" class="common-anchor-header">游標<button data-href="#Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p>前往 <code translate="no">Settings</code> -&gt;<code translate="no">Cursor Settings</code> -&gt;<code translate="no">Tools &amp; Intergrations</code> -&gt;<code translate="no">Add new global MCP server</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cursor-mcp-settings.png" alt="Cursor Mcp Settings" class="doc-image" id="cursor-mcp-settings" />
   </span> <span class="img-wrapper"> <span>Cursor Mcp 設定</span> </span></p>
<p>將以下設定貼入您的 Cursor<code translate="no">~/.cursor/mcp.json</code> 檔案是建議的做法。您也可以透過在專案資料夾建立<code translate="no">.cursor/mcp.json</code> 來安裝特定專案。更多資訊請參閱<a href="https://docs.cursor.com/context/model-context-protocol">Cursor MCP 文件</a>。</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Claude-Desktop" class="common-anchor-header">Claude 桌面<button data-href="#Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h2><p>新增至您的 Claude Desktop 配置：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Claude-Code" class="common-anchor-header">克勞德程式碼<button data-href="#Claude-Code" class="anchor-icon" translate="no">
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
    </button></h2><p>Claude Code 支援透過 JSON 配置直接新增 MCP 伺服器，包括遠端 URL 類型的伺服器。使用下列指令新增配置至 Claude Code：</p>
<pre><code translate="no" class="language-sql">claude mcp <span class="hljs-keyword">add</span><span class="hljs-operator">-</span>json sdk<span class="hljs-operator">-</span>code<span class="hljs-operator">-</span>helper <span class="hljs-comment">--json &#x27;{</span>
  &quot;url&quot;: &quot;https://sdk.milvus.io/mcp/&quot;,
  &quot;headers&quot;: {
    &quot;Accept&quot;: &quot;text/event-stream&quot;
  }
}<span class="hljs-string">&#x27;
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="Windsurf" class="common-anchor-header">Windsurf<button data-href="#Windsurf" class="anchor-icon" translate="no">
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
    </button></h2><p>Windsurf 支援透過 JSON 檔案新增 MCP 設定。在 Windsurf MCP 設定中加入以下配置：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="VS-Code" class="common-anchor-header">VS 代碼<button data-href="#VS-Code" class="anchor-icon" translate="no">
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
    </button></h2><p>CodeIndexer MCP 伺服器可透過 MCP 相容的擴充套件與 VS Code 搭配使用。在您的 VS Code MCP 設定中加入以下設定：</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Cherry-Studio" class="common-anchor-header">Cherry Studio<button data-href="#Cherry-Studio" class="anchor-icon" translate="no">
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
    </button></h2><p>Cherry Studio 允許透過其設定介面進行可視化 MCP 伺服器設定。雖然它不直接支援手動 JSON 設定，但您可以透過 GUI 新增伺服器：</p>
<ol>
<li><p>導航至「設定」→「MCP 伺服器」→「新增伺服器」。</p></li>
<li><p>填寫伺服器詳細資料：</p>
<ul>
<li><p>名稱：<code translate="no">sdk code helper</code></p></li>
<li><p>類型：<code translate="no">Streamable HTTP</code></p></li>
<li><p>URL：<code translate="no">https://sdk.milvus.io/mcp/</code></p></li>
<li><p>標頭：<code translate="no">&quot;Accept&quot;: &quot;text/event-stream&quot;</code></p></li>
</ul></li>
<li><p>儲存設定以啟動伺服器。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cherry-studio-mcp-settings.png" alt="Cherry Studio Mcp Settings" class="doc-image" id="cherry-studio-mcp-settings" />
   </span> <span class="img-wrapper"> <span>Cherry Studio Mcp 設定</span> </span></p>
<h2 id="Cline" class="common-anchor-header">Cline<button data-href="#Cline" class="anchor-icon" translate="no">
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
    </button></h2><p>Cline 使用 JSON 配置檔來管理 MCP 伺服器。要整合所提供的 MCP 伺服器配置：</p>
<ol>
<li><p>開啟 Cline 並點擊頂部導覽列中的 MCP 伺服器圖示。</p></li>
<li><p>選擇已安裝索引標籤，然後按一下進階 MCP 設定。</p></li>
<li><p>在<code translate="no">cline_mcp_settings.json</code> 檔案中，新增下列組態：</p></li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Augment" class="common-anchor-header">擴充<button data-href="#Augment" class="anchor-icon" translate="no">
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
<li><p>按 Cmd/Ctrl Shift P 或前往 Augment 面板中的漢堡功能表</p></li>
<li><p>選擇「編輯設定</p></li>
<li><p>在「進階」下，按一下設定.json 中的編輯</p></li>
<li><p>將伺服器組態新增至<code translate="no">augment.advanced</code> 物件中的<code translate="no">mcpServers</code> 陣列：</p></li>
</ol>
<pre><code translate="no" class="language-markdown">{
  &quot;mcpServers&quot;: {
<span class="hljs-code">    &quot;sdk-code-helper&quot;: {
      &quot;url&quot;: &quot;https://sdk.milvus.io/mcp/&quot;,
      &quot;headers&quot;: {
        &quot;Accept&quot;: &quot;text/event-stream&quot;
      }
    }
  }
}
</span><button class="copy-code-btn"></button></code></pre>
<h2 id="Gemini-CLI" class="common-anchor-header">Gemini CLI<button data-href="#Gemini-CLI" class="anchor-icon" translate="no">
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
    </button></h2><p>Gemini CLI 需要透過 JSON 檔案進行手動設定：</p>
<ol>
<li><p>建立或編輯<code translate="no">~/.gemini/settings.json</code> 檔案。</p></li>
<li><p>新增以下配置：</p></li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol>
<li>儲存檔案並重啟 Gemini CLI 以套用變更。</li>
</ol>
<h2 id="Roo-Code" class="common-anchor-header">Roo 程式碼<button data-href="#Roo-Code" class="anchor-icon" translate="no">
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
    </button></h2><p>Roo 程式碼</p>
<p>Roo Code 為 MCP 伺服器使用 JSON 配置檔案：</p>
<ol>
<li><p>開啟 Roo Code 並導航至設定 → MCP 伺服器 → 編輯全域設定。</p></li>
<li><p>在<code translate="no">mcp_settings.json</code> 檔案中，新增以下配置：</p></li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;sdk-code-helper&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://sdk.milvus.io/mcp/&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;headers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Accept&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;text/event-stream&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol>
<li>儲存檔案以啟動伺服器。</li>
</ol>
