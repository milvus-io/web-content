---
id: ai_prompts_landing.md
title: Milvus 的 AI 提示
summary: 編輯提示以協助 AI 編碼助理寫出正確、最新的 Milvus 程式碼。
---
<h1 id="AI-Prompts" class="common-anchor-header">AI 提示<button data-href="#AI-Prompts" class="anchor-icon" translate="no">
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
    </button></h1><p>精心挑選的提示，可協助 AI 編碼助理寫出正確的 Milvus 程式碼。每個提示都編碼了防止最常見錯誤的規則和模式。</p>
<h2 id="How-to-use" class="common-anchor-header">如何使用<button data-href="#How-to-use" class="anchor-icon" translate="no">
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
<li>從任何提示頁面的「完整提示」部分<strong>複製</strong>提示。</li>
<li>將它<strong>儲存</strong>到您的 AI 工具所期望的檔案 (請參閱下面的<a href="#use-in-different-environments">環境表</a>)。</li>
<li>您的 AI 助手在生成或審查 Milvus 程式碼時，會自動套用這些規則。</li>
</ol>
<h2 id="Prompt-pages" class="common-anchor-header">提示頁面<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
  <a href="/docs/zh-hant/agents_overview.md">
    <p class="link-btn">適用於 Milvus 的 AGENTS.md</p>
    <p>任何 AI 編碼代理的頂層規則。如果您只想要一個檔案，請從這裡開始。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh-hant/python_sdk.md">
    <p class="link-btn">Milvus Python SDK</p>
    <p>正確的連線模式、MilvusClient 使用以及 ORM API 禁止。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh-hant/schema_design.md">
    <p class="link-btn">模式設計</p>
    <p>欄位類型、主鍵、模式不變性和 BM25 配置。</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/zh-hant/search_patterns.md">
    <p class="link-btn">搜尋模式</p>
    <p>具有關鍵約束規則的 ANN、混合和全文搜尋。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh-hant/index_selection.md">
    <p class="link-btn">🗂️ 索引選擇</p>
    <p>AUTOINDEX, HNSW, DiskANN 和 IVF_FLAT 的判斷樹。</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/zh-hant/rag_pipeline.md">
    <p class="link-btn">🔗 RAG Pipeline</p>
    <p>使用 Milvus 的端對端檢索增強生成流程。</p>
  </a>
</div>
</div>
<h2 id="Use-in-different-environments" class="common-anchor-header">在不同環境中使用<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>環境</th><th>將提示置於何處</th><th>說明</th></tr>
</thead>
<tbody>
<tr><td>游標</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">設定專案規則</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">自訂指示</a></td></tr>
<tr><td>克勞德程式碼</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">克勞德程式碼文件</a></td></tr>
<tr><td>JetBrains IDE</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">自訂指南</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Gemini CLI 編碼實驗室</a></td></tr>
<tr><td>VS 程式碼</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">配置 .instructions.md</a></td></tr>
<tr><td>風帆</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">設定指引.md</a></td></tr>
</tbody>
</table>
