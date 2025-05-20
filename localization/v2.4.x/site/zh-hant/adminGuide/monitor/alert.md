---
id: alert.md
title: 建立警報
related_key: monitor and alert.
summary: 瞭解如何在 Grafana 中為 Milvus 服務建立警示。
---
<h1 id="Create-an-Alert-for-Milvus-Services" class="common-anchor-header">為 Milvus 服務建立警報<button data-href="#Create-an-Alert-for-Milvus-Services" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題介紹 Milvus 服務的警示機制，並解釋為何、何時及如何在 Milvus 中建立警示。</p>
<p>透過建立警示，當特定指標的值超過您預先定義的臨界值時，您可以收到通知。</p>
<p>例如，您創建一個警報，並設定 80 MB 為 Milvus 元件記憶體使用的最大值。如果實際使用量超過預先定義的數字，您將收到警報，提醒您 Milvus 元件的記憶體使用量超過 80 MB。收到警報後，您可以相應地及時調整資源分配，以確保服務的可用性。</p>
<h2 id="Scenarios-for-creating-alerts" class="common-anchor-header">建立警報的情況<button data-href="#Scenarios-for-creating-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>以下是一些您需要建立警報的常見情況。</p>
<ul>
<li>Milvus 元件的 CPU 或記憶體使用率過高。</li>
<li>Milvus 元件 pod 的磁碟空間不足。</li>
<li>Milvus 元件 pod 重新啟動的頻率太高。</li>
</ul>
<p>下列指標可用於警示設定：</p>
<table>
<thead>
<tr><th>公制</th><th>說明</th><th>測量單位</th></tr>
</thead>
<tbody>
<tr><td>CPU 使用量</td><td>Milvus 元件的 CPU 使用量，由 CPU 的運行時間顯示。</td><td>秒</td></tr>
<tr><td>記憶體</td><td>Milvus 元件消耗的記憶體資源。</td><td>MB</td></tr>
<tr><td>動畫</td><td>在 GO 語言中同時執行的活動。</td><td>/</td></tr>
<tr><td>作業系統線程</td><td>線程或作業系統中的輕量級進程。</td><td>/</td></tr>
<tr><td>已開啟的進程檔案</td><td>目前使用的檔案描述符數量。</td><td>/</td></tr>
</tbody>
</table>
<h2 id="Set-up-alerts" class="common-anchor-header">設定警報<button data-href="#Set-up-alerts" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南以建立 Milvus 元件記憶體使用警示為例。若要建立其他類型的警示，請相應調整您的指令。如果您在過程中遇到任何問題，請隨時到<a href="https://github.com/milvus-io/milvus/discussions">Github 討論區</a>詢問，或在<a href="https://discord.com/invite/8uyFbECzPX">Discord</a> 上開啟一個主題。</p>
<h3 id="Prerequisites" class="common-anchor-header">先決條件</h3><p>本教學假設您已安裝和設定 Grafana。如果沒有，建議閱讀<a href="/docs/zh-hant/v2.4.x/monitor.md">監控指南</a>。</p>
<h3 id="1-Add-a-new-query" class="common-anchor-header">1.新增查詢</h3><p>要為 Milvus 元件的記憶體使用量新增警示，請編輯記憶體面板。然後，新增一個有 metric 的新查詢：<code translate="no">process_resident_memory_bytes{app_kubernetes_io_name=&quot;milvus&quot;, app_kubernetes_io_instance=~&quot;my-release&quot;, namespace=&quot;default&quot;}</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_metric.png" alt="Alert_metric" class="doc-image" id="alert_metric" />
   </span> <span class="img-wrapper"> <span>Alert_metric</span> </span></p>
<h3 id="2-Save-the-dashboard" class="common-anchor-header">2.儲存儀表板</h3><p>儲存儀表板，等待幾分鐘就可以看到警示。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_dashboard.png" alt="Alert_dashboard" class="doc-image" id="alert_dashboard" />
   </span> <span class="img-wrapper"> <span>警報儀表板</span> </span></p>
<p>Grafana 警報查詢不支援範本變數。因此，您應該在標籤中加入第二個不含任何範本變數的查詢。第二個查詢預設命名為「A」。您可以按一下下拉式選單來重新命名。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_query.png" alt="Alert_query" class="doc-image" id="alert_query" />
   </span> <span class="img-wrapper"> <span>警報查詢</span> </span></p>
<h3 id="3-Add-alert-notifications" class="common-anchor-header">3.新增警示通知</h3><p>若要接收警示通知，請新增「通知頻道」。然後，在欄位「傳送至」中指定頻道。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/alert_notification.png" alt="Alert_notification" class="doc-image" id="alert_notification" />
   </span> <span class="img-wrapper"> <span>警報通知</span> </span></p>
<p>如果成功建立並觸發警報，您會收到如下截圖所示的通知。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/notification_message.png" alt="Notification_message" class="doc-image" id="notification_message" />
   </span> <span class="img-wrapper"> <span>通知訊息</span> </span></p>
<p>若要刪除警報，請移至「警報」面板，然後按一下刪除按鈕。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/delete_alert.png" alt="Delete_alert" class="doc-image" id="delete_alert" />
   </span> <span class="img-wrapper"> <span>刪除警報</span> </span></p>
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
    </button></h2><ul>
<li>如果您需要開始監控 Milvus 的服務：<ul>
<li>閱讀<a href="/docs/zh-hant/v2.4.x/monitor.md">監控指南</a></li>
<li>了解如何<a href="/docs/zh-hant/v2.4.x/visualize.md">可視化監控指標</a></li>
</ul></li>
<li>如果您已經為 Milvus 元件的記憶體使用創建了警報：<ul>
<li>學習如何<a href="/docs/zh-hant/v2.4.x/allocate.md#standalone">分配資源</a></li>
</ul></li>
<li>如果您正在尋找關於如何擴展 Milvus 叢集的資訊：<ul>
<li>了解如何<a href="/docs/zh-hant/v2.4.x/scaleout.md">擴充 Milvus 叢集</a></li>
</ul></li>
</ul>
