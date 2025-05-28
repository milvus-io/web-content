---
id: milvus-cdc-overview.md
order: 1
summary: Milvus-CDC 是一個易於使用的工具，可以在 Milvus 實體中擷取和同步增量資料。
title: CDC 總覽
---
<h1 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC 是一款用戶友好的工具，可捕捉和同步 Milvus 實例中的增量資料。它透過在來源與目標實體之間的無縫傳輸，確保業務資料的可靠性，讓增量備份和災難復原變得簡單。</p>
<h2 id="Key-capabilities" class="common-anchor-header">主要功能<button data-href="#Key-capabilities" class="anchor-icon" translate="no">
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
<li><p><strong>順序資料同步</strong>：透過在 Milvus 實體間依序同步資料變更，確保資料完整性與一致性。</p></li>
<li><p><strong>增量資料複製</strong>：從源 Milvus 複製增量資料（包括插入和刪除）到目標 Milvus，提供持久性儲存。</p></li>
<li><p><strong>CDC 任務管理</strong>：允許透過 OpenAPI 請求管理 CDC 任務，包括建立、查詢狀態及刪除 CDC 任務。</p></li>
</ul>
<p>此外，我們正計劃擴充我們的功能，以在未來支援與串流處理系統的整合。</p>
<h2 id="Architecture" class="common-anchor-header">架構<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-CDC 採用的架構包含兩個主要元件 - 管理任務與元資料的 HTTP 伺服器，以及同步任務執行的<strong>corelib</strong>，後者是從來源 Milvus 實體取得資料的閱讀器，而寫入器則是將處理後的資料傳送至目標 Milvus 實體。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-cdc-architecture.png" alt="milvus-cdc-architecture" class="doc-image" id="milvus-cdc-architecture" />
   </span> <span class="img-wrapper"> <span>milvus-cdc 架構</span> </span></p>
<p>在上圖中</p>
<ul>
<li><p><strong>HTTP 伺服器</strong>：處理使用者請求、執行任務並維護元資料。它是 Milvus-CDC 系統內任務協調的控制平面。</p></li>
<li><p><strong>Corelib</strong>：負責任務的實際同步。它包括一個從來源 Milvus 的 etcd 和訊息佇列 (MQ) 擷取資訊的讀取元件，以及一個將訊息從 MQ 轉換成 Milvus 系統 API 參數的寫入元件，並將這些要求傳送至目標 Milvus 以完成同步處理。</p></li>
</ul>
<h2 id="Workflow" class="common-anchor-header">工作流程<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-CDC 資料處理流程包含下列步驟：</p>
<ol>
<li><p><strong>任務建立</strong>：使用者透過 HTTP 請求啟動 CDC 任務。</p></li>
<li><p><strong>元資料擷取</strong>：系統從源 Milvus 的 etcd 抓取特定於集合的元資料，包括集合的通道和檢查點資訊。</p></li>
<li><p><strong>MQ 連線</strong>：有了元資料後，系統會連線至 MQ，開始訂閱資料串流。</p></li>
<li><p><strong>資料處理</strong>：從 MQ 讀取、解析資料，並使用 Go SDK 傳送資料或處理資料，以複製在源 Milvus 執行的作業。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-cdc-workflow.png" alt="milvus-cdc-workflow" class="doc-image" id="milvus-cdc-workflow" />
   </span> <span class="img-wrapper"> <span>Milvus-cdc-workflow</span> </span></p>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><strong>增量資料同步</strong>：到目前為止，Milvus-CDC 僅能同步增量資料。如果您的業務需要完整的資料備份，請<a href="https://milvus.io/community">聯絡我們</a>尋求協助。</p></li>
<li><p><strong>同步範圍</strong>：目前，Milvus-CDC 可同步群集層級的資料。我們正努力在即將發佈的版本中增加對集合層級資料同步的支援。</p></li>
<li><p><strong>支援的 API 請求</strong>：Milvus-CDC 目前支援下列 API 請求。我們計劃在未來的版本中擴展對其他請求的支援：</p>
<ul>
<li><p>建立/刪除資料集</p></li>
<li><p>插入/刪除/增加</p></li>
<li><p>建立/刪除分割區</p></li>
<li><p>建立/刪除索引</p></li>
<li><p>載入/釋放/沖洗</p></li>
<li><p>載入/釋放磁碟分割</p></li>
<li><p>建立/刪除資料庫</p></li>
</ul></li>
</ul>
