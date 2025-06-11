---
id: monitor_overview.md
title: 監視器概觀
related_key: 'monitor, alert'
summary: 瞭解 Milvus 如何使用 Prometheus 和 Grafana 來監控和警示服務。
---
<h1 id="Milvus-monitoring-framework-overview" class="common-anchor-header">Milvus 監控框架概述<button data-href="#Milvus-monitoring-framework-overview" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題說明 Milvus 如何使用 Prometheus 來監控指標，以及如何使用 Grafana 來視覺化指標和建立警示。</p>
<h2 id="Prometheus-in-Milvus" class="common-anchor-header">Milvus 中的 Prometheus<button data-href="#Prometheus-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a>是 Kubernetes 實作的開放原始碼監控及警示工具套件。它以時間序列資料的方式收集並儲存指標。這表示度量記錄時會儲存時間戳記，以及稱為標籤的可選鍵值對。</p>
<p>目前 Milvus 使用 Prometheus 的下列元件：</p>
<ul>
<li>Prometheus 端點，從出口商設定的端點取得資料。</li>
<li>Prometheus 操作員，以有效管理 Prometheus 監控實體。</li>
<li>Kube-prometheus 提供易於操作的端對端 Kubernetes 群集監控。</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">度量名稱</h3><p>Prometheus 中有效的度量名稱包含三個元素：命名空間、子系統和名稱。這三個元素以「_」連結。</p>
<p>Prometheus 監控的 Milvus 公制的命名空間是 "milvus"。根據度量指標所屬的角色，其子系統應該是下列八種角色之一："rootcoord"、"proxy"、"querycoord"、"querynode"、"indexcoord"、"indexnode"、"datacoord"、"datanode"。</p>
<p>例如，計算查詢向量總數的 Milvus 公制命名為<code translate="no">milvus_proxy_search_vectors_count</code> 。</p>
<h3 id="Metric-types" class="common-anchor-header">度量類型</h3><p>Prometheus 支援四種度量類型：</p>
<ul>
<li>計數器 (Counter)：一種累積度量，其值只能增加或在重新啟動時重設為零。</li>
<li>Gauge (度量單位)：這種度量單位的值可以上升或下降。</li>
<li>直方圖：一種根據可設定的桶進行計算的度量指標。常見的範例是請求持續時間。</li>
<li>摘要：類似直方圖的度量類型，可在滑動時間視窗中計算可設定的量化值。</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">度量標籤</h3><p>Prometheus 透過標籤區分具有相同度量名稱的樣本。標籤是度量指標的特定屬性。具有相同名稱的度量值，其<code translate="no">variable_labels</code> 欄位的值必須相同。下表列出 Milvus 公制常用標籤的名稱和意義。</p>
<table>
<thead>
<tr><th>標籤名稱</th><th>定義</th><th>值</th></tr>
</thead>
<tbody>
<tr><td>"node_id"</td><td>角色的唯一 ID。</td><td>由 milvus 產生的全局唯一 ID。</td></tr>
<tr><td>狀態</td><td>已處理的作業或請求的狀態。</td><td>「放棄」、「成功 」或 「失敗」。</td></tr>
<tr><td>"查詢類型</td><td>讀取請求的類型。</td><td>「搜尋 」或 「查詢」。</td></tr>
<tr><td>"msg_type</td><td>訊息的類型。</td><td>「插入」、「刪除」、「搜尋 」或 「查詢」。</td></tr>
<tr><td>"segment_state" 區段的狀態。</td><td>區段的狀態。</td><td>"Sealed"、"Growing"、"Flushed"、"Flushing"、"Dropped 「或 」Importing"。</td></tr>
<tr><td>"cache_state" 快取物件的狀態。</td><td>快取物件的狀態。</td><td>「命中 」或 「未命中」。</td></tr>
<tr><td>"快取名稱</td><td>快取物件的名稱。此標籤與 "cache_state" 標籤一起使用。</td><td>例如："CollectionID"、"Schema "等。</td></tr>
<tr><td>"通道名稱</td><td>訊息儲存（Pulsar 或 Kafka）中的實體主題。</td><td>例如："by-dev-rootcoord-dml_0"、"by-dev-rootcoord-dml_255 "等。</td></tr>
<tr><td>"function_name"（函式名</td><td>處理特定請求的函式名稱。</td><td>例如，"CreateCollection"、"CreatePartition"、"CreateIndex "等。</td></tr>
<tr><td>"使用者名稱</td><td>用於驗證的使用者名稱。</td><td>您偏好的使用者名稱。</td></tr>
<tr><td>"索引任務的狀態</td><td>索引任務在元儲存中的狀態。</td><td>「未發佈」、「進行中」、「失敗」、「完成 」或 「回收」。</td></tr>
</tbody>
</table>
<h2 id="Grafana-in-Milvus" class="common-anchor-header">Milvus 中的 Grafana<button data-href="#Grafana-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a>是一個開放原始碼的可視化堆疊，可連結所有資料來源。透過調出指標，它可以幫助使用者瞭解、分析和監控大量資料。</p>
<p>Milvus 使用 Grafana 的可自訂儀表板來進行指標可視化。</p>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>了解監控和警示的基本工作流程後，請學習：</p>
<ul>
<li><a href="/docs/zh-hant/v2.5.x/monitor.md">部署監控服務</a></li>
<li><a href="/docs/zh-hant/v2.5.x/visualize.md">可視化 Milvus 的度量指標</a></li>
<li><a href="/docs/zh-hant/v2.5.x/alert.md">建立警示</a></li>
</ul>
