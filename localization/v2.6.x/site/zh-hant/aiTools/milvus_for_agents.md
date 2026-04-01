---
id: milvus_for_agents.md
title: 適用於 AI 代理的 Milvus
summary: 瞭解 AI 代理如何使用 Milvus 作為向量資料庫，以進行 RAG、語義搜尋和長期記憶。
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
    </button></h1><p>Milvus 提供代理友好的介面，讓 AI 編碼代理和自主代理系統可以程式化的方式與向量資料庫互動。無論您是要建立 RAG 管道、語義搜尋或代理程式記憶體系統，Milvus 都能提供多種方式讓代理程式連接與操作。</p>
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Claude Code 的代理技能，教導 LLM 使用 PyMilvus 進行向量資料庫操作。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">MCP 伺服器</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Model Context Protocol 伺服器，可讓任何與 MCP 相容的代理程式直接與 Milvus 互動。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">克勞德上下文 MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">專為 Claude Code 設計的 MCP 伺服器，提供情境感知的 Milvus 文件存取。</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">AI 提示<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>經過編輯的提示，可協助 AI 編碼助理寫出正確的 Milvus 程式碼。每個提示都編碼了防止最常見錯誤的規則和模式。</p>
<p><strong>如何使用：</strong></p>
<ol>
<li>從任何提示頁面的「完整提示」部分<strong>複製</strong>提示。</li>
<li>將它<strong>儲存</strong>到您的 AI 工具所期望的檔案 (請參閱下面的<a href="#use-in-different-environments">環境表</a>)。</li>
<li>您的 AI 助手在生成或審查 Milvus 程式碼時會自動套用這些規則。</li>
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">任何 AI 編碼代理的頂層規則。如果您只需要一個檔案，請從這裡開始。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh-hant/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">正確的連線模式、MilvusClient 使用以及 ORM API 禁止。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh-hant/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">模式設計</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">欄位類型、主鍵、模式不變性和 BM25 配置。</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/zh-hant/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">搜尋模式</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">具有關鍵約束規則的 ANN、混合及全文搜尋。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh-hant/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">索引選擇</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">AUTOINDEX, HNSW, DiskANN 和 IVF_FLAT 的判斷樹。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh-hant/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">RAG 管線</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">使用 Milvus 的端對端檢索增強生成流程。</p>
  </a>
</div>
</div>
<h3 id="Use-in-different-environments" class="common-anchor-header">在不同環境中使用<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
<tr><th>環境</th><th>將提示置於何處</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td>游標</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">設定專案規則</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">自訂指示</a></td></tr>
<tr><td>克勞德程式碼</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">克勞德程式碼文件</a></td></tr>
<tr><td>JetBrains IDE</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">自訂指引</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Gemini CLI 編碼實驗室</a></td></tr>
<tr><td>VS 程式碼</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">配置 .instructions.md</a></td></tr>
<tr><td>風帆</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">設定指引.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">推薦的代理部署<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>選擇正確的 Milvus 部署取決於您的開發階段。</p>
<table>
<thead>
<tr><th>階段</th><th>部署</th><th>為什麼</th></tr>
</thead>
<tbody>
<tr><td>原型開發</td><td><a href="/docs/zh-hant/milvus_lite.md">Milvus 精簡版</a></td><td>零配置、進程中。可在任何 Python 運行的地方執行 - 是快速代理原型的理想選擇。</td></tr>
<tr><td>開發</td><td><a href="/docs/zh-hant/install_standalone-docker.md">Milvus 單機版</a></td><td>單結點 Docker 部署。適合使用實際資料量進行本機開發與測試。</td></tr>
<tr><td>生產</td><td><a href="https://cloud.zilliz.com/signup">Zilliz 雲端</a></td><td>全面管理的無伺服器 Milvus。無需管理基礎架構 - 代理程式只需連線與操作。</td></tr>
<tr><td>自託管生產</td><td><a href="/docs/zh-hant/install_cluster-helm.md">分散式 Milvus</a></td><td>多節點 Kubernetes 部署，適合需要完全控制基礎架構的團隊。</td></tr>
</tbody>
</table>
<div class="alert note">
<p>對於代理工作負載，建議在生產中使用<strong>Zilliz Cloud</strong>。代理通常不會管理基礎架構，因此無伺服器部署可消除作業開銷，並提供自動擴充功能。</p>
</div>
