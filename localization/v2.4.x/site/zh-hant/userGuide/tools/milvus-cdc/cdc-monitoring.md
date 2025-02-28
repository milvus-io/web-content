---
id: cdc-monitoring.md
order: 4
summary: Milvus-CDC 透過 Grafana 面板提供全面的監控功能。
title: 監控
---
<h1 id="Monitoring" class="common-anchor-header">監控<button data-href="#Monitoring" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC 透過 Grafana 面板提供全面的監控功能，讓您可視化關鍵指標，並確保變更資料擷取 (CDC) 任務和伺服器健康的順暢運作。</p>
<h3 id="Metrics-for-CDC-tasks" class="common-anchor-header">CDC 任務的指標</h3><p>若要開始使用，請將<a href="https://github.com/zilliztech/milvus-cdc/blob/main/server/configs/cdc-grafana.json">cdc-grafana.json</a>檔案匯入 Grafana。這將新增專為監控 CDC 任務狀態而設計的儀表板。</p>
<p><strong>CDC Grafana 面板概述</strong>：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus-cdc-dashboard.png" alt="milvus-cdc-dashboard" class="doc-image" id="milvus-cdc-dashboard" />
   </span> <span class="img-wrapper"> <span>milvus-cdc-dashboard</span> </span></p>
<p><strong>關鍵指標說明：</strong></p>
<ul>
<li><p><strong>任務</strong>：不同狀態的 CDC 任務數量，包括<strong>Initial</strong>、<strong>Running</strong> 和<strong>Paused</strong>。</p></li>
<li><p><strong>請求總數</strong>：Milvus-CDC 收到的請求總數。</p></li>
<li><p><strong>請求成功</strong>：Milvus-CDC 收到的成功請求數目。</p></li>
<li><p><strong>任務數</strong>：隨著時間的推移，處於<strong>Initial</strong>、<strong>Paused</strong> 及<strong>Running</strong>狀態的任務數量。</p></li>
<li><p><strong>任務狀態</strong>：個別任務的狀態。</p></li>
<li><p><strong>請求次數</strong>：成功的請求次數和總請求次數</p></li>
<li><p><strong>請求延遲</strong>：透過 p99 提出請求的延遲時間、平均值及其他統計資料。</p></li>
<li><p><strong>複製資料速率</strong>：讀/寫作業的複製資料速率</p></li>
<li><p><strong>複製時間滯後</strong>：讀/寫作業的複製時間滯後。</p></li>
<li><p><strong>api 執行次數</strong>：執行不同 Milvus-CDC API 的次數。</p></li>
<li><p><strong>center ts</strong>：讀/寫任務的時間戳記。</p></li>
</ul>
