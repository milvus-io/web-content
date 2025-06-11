---
id: time_sync.md
title: 時間同步
summary: 了解 Milvus 中的時間同步系統。
---
<h1 id="Time-Synchronization" class="common-anchor-header">時間同步<button data-href="#Time-Synchronization" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題介紹 Milvus 的時間同步機制。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 中的事件一般可分為兩種類型：</p>
<ul>
<li><p>資料定義語言 (DDL) 事件：建立/刪除集合、建立/刪除分割區等。</p></li>
<li><p>資料操作語言 (DML) 事件：插入、搜尋等。</p></li>
</ul>
<p>任何事件，不論是 DDL 或 DML 事件，都標有時間戳記，可以指出事件發生的時間。</p>
<p>假設有兩個使用者在 Milvus 發起一系列 DML 和 DDL 事件，時間順序如下表所示。</p>
<table>
<thead>
<tr><th style="text-align:center">時間戳記</th><th style="text-align:center">使用者 1</th><th style="text-align:center">使用者 2</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">t0</td><td style="text-align:center">建立了一個名為<code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t2</td><td style="text-align:center">/</td><td style="text-align:center">在資料集中進行搜尋<code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t5</td><td style="text-align:center">插入資料<code translate="no">A1</code> 到資料庫<code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t7</td><td style="text-align:center">/</td><td style="text-align:center">在資料集中進行搜尋<code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t10</td><td style="text-align:center">插入資料<code translate="no">A2</code> 到資料庫<code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t12</td><td style="text-align:center">/</td><td style="text-align:center">在資料集中進行搜尋<code translate="no">C0</code></td></tr>
<tr><td style="text-align:center">t15</td><td style="text-align:center">從資料集中刪除資料<code translate="no">A1</code> <code translate="no">C0</code> .</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t17</td><td style="text-align:center">/</td><td style="text-align:center">在資料集中進行搜尋<code translate="no">C0</code></td></tr>
</tbody>
</table>
<p>理想情況下，使用者 2 應該可以看到</p>
<ul>
<li><p>一個空的集合<code translate="no">C0</code> 在<code translate="no">t2</code>.</p></li>
<li><p>資料<code translate="no">A1</code> 在<code translate="no">t7</code>.</p></li>
<li><p>資料<code translate="no">A1</code> 和<code translate="no">A2</code> 均位於<code translate="no">t12</code> 。</p></li>
<li><p>只有資料<code translate="no">A2</code> at<code translate="no">t17</code> (因為資料<code translate="no">A1</code> 在此點之前已從集合中刪除)。</p></li>
</ul>
<p>當只有一個單一節點時，這種理想的情況很容易實現。然而，Milvus 是分散式向量資料庫，為了確保不同節點的所有 DML 與 DDL 作業都能保持順序，Milvus 需要解決以下兩個問題：</p>
<ol>
<li><p>如果上面例子中的兩個使用者在不同的節點上，他們的時間時鐘是不同的。例如，如果使用者 2 比使用者 1 晚 24 小時，那麼使用者 1 的所有作業要到隔天才會被使用者 2 看見。</p></li>
<li><p>可能存在網路延遲。如果使用者 2 在<code translate="no">t17</code> 對資料集<code translate="no">C0</code> 進行搜尋，Milvus 應該可以保證<code translate="no">t17</code> 之前的所有作業都成功處理並完成。如果在<code translate="no">t15</code> 的刪除作業因為網路延遲而延遲，使用者 2 在<code translate="no">t17</code> 進行搜尋時，很有可能仍然可以看到應該被刪除的資料<code translate="no">A1</code> 。</p></li>
</ol>
<p>因此，Milvus 採用時間同步系統 (timetick) 來解決問題。</p>
<h2 id="Timestamp-oracle-TSO" class="common-anchor-header">時間戳oracle (TSO)<button data-href="#Timestamp-oracle-TSO" class="anchor-icon" translate="no">
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
    </button></h2><p>為了解決上一節提到的第一個問題，Milvus 和其他分散式系統一樣，提供時間戳oracle (TSO) 服務。這表示 Milvus 中的所有事件都必須從 TSO 而非本機時鐘分配時間戳。</p>
<p>TSO 服務由 Milvus 的根協調器提供。用戶端可以在單個時間戳分配請求中分配一個或多個時間戳。</p>
<p>TSO 時間戳是一種<code translate="no">uint64</code> 值，由物理部分和邏輯部分組成。下圖展示了時間戳的格式。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/TSO_Timestamp.png" alt="TSO_Timestamp" class="doc-image" id="tso_timestamp" />
   </span> <span class="img-wrapper"> <span>TSO_Timestamp</span>. </span></p>
<p>如圖所示，開頭的 46 位元是實體部分，也就是以毫秒為單位的 UTC 時間。最後的 18 位元是邏輯部分。</p>
<h2 id="Time-synchronization-system-timetick" class="common-anchor-header">時間同步系統 (timetick)<button data-href="#Time-synchronization-system-timetick" class="anchor-icon" translate="no">
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
    </button></h2><p>本節以資料插入操作為例，說明 Milvus 的時間同步機制。</p>
<p>當 proxy 收到 SDK 的資料插入請求時，會依照主鍵的哈希值將插入訊息分成不同的訊息流 (<code translate="no">MsgStream</code>) 。</p>
<p>每條插入訊息 (<code translate="no">InsertMsg</code>) 在傳送到<code translate="no">MsgStream</code> 之前，都會被指定一個時間戳。</p>
<div class="alert note">
  <code translate="no">MsgStream</code> 是訊息佇列的包裝，在 Milvus 2.0 預設是 Pulsar。</div>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/timesync_proxy_insert_msg.png" alt="timesync_proxy_insert_msg" class="doc-image" id="timesync_proxy_insert_msg" />
   </span> <span class="img-wrapper"> <span>timesync_proxy_insert_msg</span> </span></p>
<p>一個一般原則是，在<code translate="no">MsgStream</code>, 來自同一個 proxy 的<code translate="no">InsertMsgs</code> 的時間戳必須是遞增的。但是，對於來自不同代理的<code translate="no">InsertMsgs</code> ，則沒有這樣的規則。</p>
<p>下圖是<code translate="no">InsertMsgs</code> 在<code translate="no">MsgStream</code> 中的範例。該片段包含五個<code translate="no">InsertMsgs</code> ，其中三個來自<code translate="no">Proxy1</code> ，其餘來自<code translate="no">Proxy2</code> 。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/msgstream.png" alt="msgstream" class="doc-image" id="msgstream" />
   </span> <span class="img-wrapper"> <span>msgstream</span> </span></p>
<p>來自<code translate="no">Proxy1</code> 的三個<code translate="no">InsertMsgs</code> 的時間戳是遞增的，來自<code translate="no">Proxy2</code> 的兩個<code translate="no">InsertMsgs</code> 的時間戳也是遞增的。但是，<code translate="no">Proxy1</code> 和<code translate="no">Proxy2</code> <code translate="no">InsertMsgs</code> 之間沒有特定的順序。</p>
<p>一種可能的情況是，當從<code translate="no">Proxy2</code> 讀取時間戳為<code translate="no">110</code> 的訊息時，Milvus 發現時間戳為<code translate="no">80</code> 的訊息仍在<code translate="no">Proxy1</code> 的<code translate="no">MsgStream</code> 中。因此，Milvus 引進了時間同步系統 timetick，以確保從<code translate="no">MsgStream</code> 讀取訊息時，必須消耗所有時間戳值較小的訊息。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/time_synchronization.png" alt="time_synchronization" class="doc-image" id="time_synchronization" />
   </span> <span class="img-wrapper"> <span>時間同步</span> </span></p>
<p>如上圖所示、</p>
<ul>
<li><p>每個代理定期 (預設為每 200 ms) 將<code translate="no">MsgStream</code>中最新<code translate="no">InsertMsg</code> 的最大時間戳值報告給根坐標。</p></li>
<li><p>無論<code translate="no">InsertMsgs</code> 屬於哪個代理伺服器，Root Coord 都會找出這個<code translate="no">Msgstream</code> 的最小時間戳值。然後，root coord 將這個最小時間戳插入<code translate="no">Msgstream</code> 。這個時間戳也稱為 timetick。</p></li>
<li><p>當消費者元件讀取由根坐標插入的 timetick 時，它們會了解所有具有較小 Timestamp 值的插入訊息都已被消耗。因此，可以在不中斷訂單的情況下安全地執行相關請求。</p></li>
</ul>
<p>下圖是<code translate="no">Msgstream</code> 插入時間刻度的範例。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/timetick.png" alt="timetick" class="doc-image" id="timetick" />
   </span> <span class="img-wrapper"> <span>時間標記</span> </span></p>
<p><code translate="no">MsgStream</code> 會根據時間刻度分批處理訊息，以確保輸出訊息符合時間戳記的要求。在上面的範例中，它會在 消耗除了 的 以外的所有記錄，因為它是在最新的 TimeTick 之後。<code translate="no">Timestamp: 120</code> <code translate="no">Proxy2</code> <code translate="no">InsertMsgs</code> </p>
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
<li>了解<a href="/docs/zh-hant/timestamp.md">時間戳</a>的概念。</li>
<li>了解 Milvus 的<a href="/docs/zh-hant/data_processing.md">資料處理工作流程</a>。</li>
</ul>
