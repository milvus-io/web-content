---
id: milvus_for_agents.md
title: 適用於 AI 代理的 Milvus
summary: 了解 AI 代理如何將 Milvus 作為向量資料庫，應用於 RAG、語義搜尋及長期記憶。
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">適用於 AI 代理的 Milvus<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 提供適合代理程式的介面，讓 AI 編碼代理程式和自主代理系統能夠透過程式化方式與向量資料庫互動。無論您是正在建置 RAG 處理管線、語義搜尋，還是代理程式記憶體系統，Milvus 皆提供多種方式供代理程式進行連線與運作。</p>
<h2 id="Agent-tools" class="common-anchor-header">代理工具<button data-href="#Agent-tools" class="anchor-icon" translate="no">
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
    </button></h2><div class="card-wrapper">
<div class="start_card_container">
  <a href="https://github.com/zilliztech/milvus-skill" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Milvus 技能</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">一款適用於 Claude Code 的代理程式技能，旨在教導大型語言模型（LLMs）使用 PyMilvus 進行向量資料庫操作。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">MCP 伺服器</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">一種 Model Context Protocol 伺服器，可讓任何相容於 MCP 的代理直接與 Milvus 進行互動。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Claude 情境 MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">專為 Claude Code 設計的 MCP 伺服器，提供具情境感知能力的 Milvus 文件存取功能。</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">AI 提示詞<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>經過精心整理的提示語，可協助 AI 程式設計助手撰寫正確的 Milvus 程式碼。每個提示語皆內建規則與模式，能有效避免最常見的錯誤。</p>
<p><strong>使用方法：</strong></p>
<ol>
<li>從任何提示頁面的「完整提示」<strong>區段複製</strong>一個提示。</li>
<li><strong>將</strong>其<strong>儲存</strong>至您的 AI 工具所支援的檔案格式（請參閱下方的<a href="#use-in-different-environments">環境對照表</a>）。</li>
<li>您的 AI 助理在生成或審查 Milvus 程式碼時，將自動套用這些規則。</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">提示頁面<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
    </button></h3><div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/zh-hant/agents_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTS.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">適用於任何 AI 編碼代理的頂層規則。若您僅需一個檔案，請由此開始。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh-hant/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">正確的連線模式、MilvusClient 的使用方式，以及 ORM API 的禁用規定。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh-hant/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">資料結構設計</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">欄位類型、主鍵、資料結構不可變性，以及 BM25 配置。</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/zh-hant/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">搜尋模式</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">具備關鍵約束規則的 ANN、混合式及全文搜尋。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh-hant/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">索引選擇</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">適用於 AUTOINDEX、HNSW、DiskANN 及 IVF_FLAT 的決策樹。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh-hant/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RAG 處理流程</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">採用 Milvus 的端到端檢索增強生成流程。</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/zh-hant/nodejs_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Node.js SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">MilvusClient 的方法呼叫、欄位定義、回應狀態檢查以及搜尋結果的資料結構。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh-hant/go_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Go SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Go SDK v3 模組路徑、連線超時、集合載入及搜尋結果集。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh-hant/restful_api.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RESTful API v2</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">v2 端點、camelCase 請求欄位、回應碼檢查，以及載入狀態輪詢。</p>
  </a>
</div>
</div>
<p>AGENTS.md 及四個主題提示的卡片會開啟 Python 版本。每項提示亦提供 Node.js、Go 及 RESTful API v2 版本：</p>
<table>
<thead>
<tr><th>提示</th><th>Python</th><th>Node.js</th><th>Go</th><th>RESTful API v2</th></tr>
</thead>
<tbody>
<tr><td>AGENTS.md</td><td><a href="/docs/zh-hant/agents_overview.md">Python</a></td><td><a href="/docs/zh-hant/agents_overview_nodejs.md">Node.js</a></td><td><a href="/docs/zh-hant/agents_overview_go.md">Go</a></td><td><a href="/docs/zh-hant/agents_overview_restful.md">RESTful API v2</a></td></tr>
<tr><td>架構設計</td><td><a href="/docs/zh-hant/schema_design.md">Python</a></td><td><a href="/docs/zh-hant/schema_design_nodejs.md">Node.js</a></td><td><a href="/docs/zh-hant/schema_design_go.md">Go</a></td><td><a href="/docs/zh-hant/schema_design_restful.md">RESTful API v2</a></td></tr>
<tr><td>搜尋模式</td><td><a href="/docs/zh-hant/search_patterns.md">Python</a></td><td><a href="/docs/zh-hant/search_patterns_nodejs.md">Node.js</a></td><td><a href="/docs/zh-hant/search_patterns_go.md">Go</a></td><td><a href="/docs/zh-hant/search_patterns_restful.md">RESTful API v2</a></td></tr>
<tr><td>索引選擇</td><td><a href="/docs/zh-hant/index_selection.md">Python</a></td><td><a href="/docs/zh-hant/index_selection_nodejs.md">Node.js</a></td><td><a href="/docs/zh-hant/index_selection_go.md">Go</a></td><td><a href="/docs/zh-hant/index_selection_restful.md">RESTful API v2</a></td></tr>
<tr><td>RAG 處理流程</td><td><a href="/docs/zh-hant/rag_pipeline.md">Python</a></td><td><a href="/docs/zh-hant/rag_pipeline_nodejs.md">Node.js</a></td><td><a href="/docs/zh-hant/rag_pipeline_go.md">Go</a></td><td><a href="/docs/zh-hant/rag_pipeline_restful.md">RESTful API v2</a></td></tr>
</tbody>
</table>
<h3 id="Use-in-different-environments" class="common-anchor-header">在不同環境中的應用<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>環境</th><th>提示語應放置於何處</th><th>操作說明</th></tr>
</thead>
<tbody>
<tr><td>游標</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">設定專案規則</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">自訂指示</a></td></tr>
<tr><td>Claude Code</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Claude Code 文件</a></td></tr>
<tr><td>JetBrains 整合開發環境</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">自訂指引</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Gemini CLI 實作課程</a></td></tr>
<tr><td>VS Code</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">設定 .instructions.md</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">設定 guidelines.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">代理程式的建議部署方式<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>選擇合適的 Milvus 部署方案取決於您的開發階段。</p>
<table>
<thead>
<tr><th>階段</th><th>部署</th><th>原因</th></tr>
</thead>
<tbody>
<tr><td>原型開發</td><td><a href="/docs/zh-hant/milvus_lite.md">Milvus Lite</a></td><td>零配置、進程內運行。可在任何能執行 Python 的環境中運行——非常適合快速進行代理程式原型開發。</td></tr>
<tr><td>開發</td><td><a href="/docs/zh-hant/install_standalone-docker.md">Milvus 獨立版</a></td><td>單節點 Docker 部署。適合在本地進行開發與測試，並可處理實際規模的資料量。</td></tr>
<tr><td>生產環境</td><td><a href="https://cloud.zilliz.com/signup">Zilliz 雲端</a></td><td>完全託管、無伺服器的 Milvus。無需管理基礎架構——代理程式只需連線即可運作。</td></tr>
<tr><td>自建生產環境</td><td><a href="/docs/zh-hant/install_cluster-helm.md">Milvus 分散式</a></td><td>專為需要完全掌控基礎架構的團隊設計的多節點 Kubernetes 部署方案。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>針對代理程式工作負載，建議在生產環境中使用<strong><a href="https://zilliz.com/cloud">Zilliz Cloud</a></strong>。代理程式通常無需管理基礎架構，因此無伺服器部署可消除營運開銷並提供自動擴展功能。</p>
</div>
