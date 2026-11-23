---
id: monitor_overview.md
title: 顯示器概覽
related_key: 'monitor, alert'
summary: 了解 Milvus 如何運用 Prometheus 和 Grafana 來監控與發出警示。
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
    </button></h1><p>本主題說明 Milvus 如何運用 Prometheus 監控指標，並透過 Grafana 將指標視覺化及建立警示。</p>
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
    </button></h2><p><a href="https://prometheus.io/docs/introduction/overview/">Prometheus</a>是一套適用於 Kubernetes 實作的開源監控與警示工具套件。它會將指標以時間序列資料的形式進行收集與儲存。這意味著指標在記錄時會連同時間戳記一併儲存，並可選配稱為「標籤」的鍵值對。</p>
<p>目前 Milvus 使用 Prometheus 的以下元件：</p>
<ul>
<li>Prometheus 端點，用於從匯出器設定的端點拉取資料。</li>
<li>Prometheus 操作員，用於有效管理 Prometheus 監控實例。</li>
<li>Kube-prometheus，用於提供易於操作的端到端 Kubernetes 叢集監控。</li>
</ul>
<h3 id="Metric-names" class="common-anchor-header">指標名稱<button data-href="#Metric-names" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus 中有效的指標名稱包含三個元素：命名空間、子系統和名稱。這三個元素以「_」連接。</p>
<p>由 Prometheus 監控的 Milvus 指標之命名空間為「milvus」。 指標的子系統為以下其中之一：「cdc」、「cgo」、「datacoord」、「datanode」、「indexnode」、「logging」、「meta」、「msg_queue」、「msgstream」、 「proxy」、「querycoord」、「querynode」、「rootcoord」、「storage」、「streaming」、「streamingcoord」、「streamingnode」以及「wal」。少數指標（例如<code translate="no">milvus_build_info</code> 和<code translate="no">milvus_num_node</code> ）則沒有子系統。</p>
<p>例如，Milvus 中用於計算查詢向量總數的指標名為<code translate="no">milvus_proxy_search_vectors_count</code> 。</p>
<h3 id="Metric-types" class="common-anchor-header">指標類型<button data-href="#Metric-types" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus 支援四種指標類型：</p>
<ul>
<li>計數器（Counter）：一種累積型指標，其數值只能增加，或在重新啟動時重置為零。</li>
<li>Gauge：一種數值可能上升或下降的指標類型。</li>
<li>直方圖（Histogram）：基於可配置區間進行計數的指標類型。常見的例子是請求持續時間。</li>
<li>摘要（Summary）：一種類似直方圖的指標類型，會在滑動時間視窗內計算可配置的分位數。</li>
</ul>
<h3 id="Metric-labels" class="common-anchor-header">指標標籤<button data-href="#Metric-labels" class="anchor-icon" translate="no">
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
    </button></h3><p>Prometheus 透過標籤來區分具有相同指標名稱的樣本。標籤是指標的特定屬性。名稱相同的指標，其 `<code translate="no">variable_labels</code> ` 欄位的值必須相同。下表列出了 Milvus 指標常見標籤的名稱與涵義。</p>
<table>
<thead>
<tr><th>標籤名稱</th><th>定義</th><th>值</th></tr>
</thead>
<tbody>
<tr><td>“node_id”</td><td>角色的唯一識別碼。</td><td>由 Milvus 生成的全域唯一識別碼。</td></tr>
<tr><td>「status」</td><td>已處理操作或請求的狀態。</td><td>「abandon」、「success」或「fail」。</td></tr>
<tr><td>「query_type」</td><td>讀取請求的類型。</td><td>「search」或「query」。</td></tr>
<tr><td>「msg_type」</td><td>訊息的類型。</td><td>「insert」、「delete」、「search」或「query」。</td></tr>
<tr><td>「segment_state」</td><td>分段的狀態。</td><td>「已封存」、「擴充中」、「已沖洗」、「正在沖洗」、「已刪除」或「正在匯入」。</td></tr>
<tr><td>「cache_state」</td><td>快取物件的狀態。</td><td>「命中」或「未命中」。</td></tr>
<tr><td>「cache_name」</td><td>快取物件的名稱。此標籤需與「cache_state」標籤一併使用。</td><td>例如：「CollectionID」、「Schema」等。</td></tr>
<tr><td>「channel_name」</td><td>訊息儲存區（Pulsar 或 Kafka）中的實體主題。</td><td>例如：「by-dev-rootcoord-dml_0」、「by-dev-rootcoord-dml_255」等。</td></tr>
<tr><td>“function_name”</td><td>處理特定請求的函式名稱。</td><td>例如：「CreateCollection」、「CreatePartition」、「CreateIndex」等。</td></tr>
<tr><td>「user_name」</td><td>用於驗證的用戶名稱。</td><td>可依個人喜好設定的使用者名稱。</td></tr>
<tr><td>“index_task_status”</td><td>元資料儲存中索引任務的狀態。</td><td>「未發行」、「進行中」、「失敗」、「完成」或「回收」。</td></tr>
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
    </button></h2><p><a href="https://grafana.com/docs/grafana/latest/introduction/">Grafana</a>是一套開源的可視化平台，可連接所有資料來源。透過擷取指標，它能協助使用者理解、分析及監控海量資料。</p>
<p>Milvus 採用 Grafana 的可自訂儀表板來進行指標視覺化。</p>
<h2 id="Whats-next" class="common-anchor-header">接下來該做什麼<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>在了解監控與警示的基本工作流程後，請進一步學習：</p>
<ul>
<li><a href="/docs/zh-hant/monitor.md">部署監控服務</a></li>
<li><a href="/docs/zh-hant/visualize.md">視覺化 Milvus 指標</a></li>
<li><a href="/docs/zh-hant/alert.md">建立警示</a></li>
</ul>
