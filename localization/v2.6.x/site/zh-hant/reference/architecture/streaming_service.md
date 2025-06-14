---
id: streaming_service.md
title: 串流服務
summary: Streaming Service 是 Milvus 內部串流系統模組的概念，以 Write-Ahead Log (WAL) 為核心，支援各種串流相關功能。
---
<h1 id="Streaming-Service" class="common-anchor-header">串流服務<button data-href="#Streaming-Service" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>Streaming Service</strong>是 Milvus 內部串流系統模組的概念，以 Write-Ahead Log (WAL) 為核心，支援各種串流相關功能。這些功能包括串流資料的擷取/訂閱、群集狀態的故障復原、串流資料轉換為歷史資料，以及成長中的資料查詢。在架構上，串流服務由三個主要元件組成：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_distributed_arch.png" alt="Streaming Distributed Arc" class="doc-image" id="streaming-distributed-arc" />
   </span> <span class="img-wrapper"> <span>串流分散式弧</span> </span></p>
<ul>
<li><p><strong>串流協調器</strong>：協調器節點中的邏輯元件。它使用 Etcd 進行服務發現，以找出可用的串流節點，並負責將 WAL 綁定到對應的串流節點。它還會註冊服務以揭露 WAL 分佈拓樸，讓串流用戶端知道給定 WAL 的適當串流節點。</p></li>
<li><p><strong>串流節點叢集</strong>：一個串流工作節點叢集，負責所有串流處理工作，例如 WAL 附加、狀態復原、增長資料查詢。</p></li>
<li><p><strong>串流用戶端</strong>：內部開發的 Milvus 用戶端，封裝基本功能，例如服務發現和就緒檢查。它用於啟動訊息寫入和訂閱等作業。</p></li>
</ul>
<h2 id="Message" class="common-anchor-header">訊息<button data-href="#Message" class="anchor-icon" translate="no">
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
    </button></h2><p>串流服務是一個日誌驅動的串流系統，因此 Milvus 中的所有寫入作業（例如 DML 和 DDL）都被抽象<strong>為訊息</strong>。</p>
<ul>
<li><p>每個訊息都會被 Streaming Service 指定一個<strong>Timestamp Oracle (TSO) 欄位</strong>，表示訊息在 WAL 中的順序。訊息的順序決定了 Milvus 中寫入作業的順序。這使得從日誌重建最新的群集狀態成為可能。</p></li>
<li><p>每個訊息都屬於特定的<strong>VChannel</strong>(虛擬通道)，並在該通道中維持某些不變屬性，以確保作業的一致性。例如，在同一通道上，Insert 作業必須永遠發生在 DropCollection 作業之前。</p></li>
</ul>
<p>Milvus 中的訊息順序如下：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/message_order.png" alt="Message Order" class="doc-image" id="message-order" />
   </span> <span class="img-wrapper"> <span>訊息順序</span> </span></p>
<h2 id="WAL-Component" class="common-anchor-header">WAL 元件<button data-href="#WAL-Component" class="anchor-icon" translate="no">
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
    </button></h2><p>為了支援大規模的水平擴充能力，Milvus 的 WAL 不是單一的日誌檔，而是多個日誌的複合檔。每個日誌可獨立支援多個 VChannels 的串流功能。在任何時候，WAL 元件都只允許在<strong>一個串流節點</strong>上運作，這些限制是由底層 WAL 儲存的柵欄機制和串流協調器所承諾的。</p>
<p>WAL 元件的其他功能包括</p>
<ul>
<li><p><strong>區段生命週期管理</strong>：WAL 依據記憶體狀況/區段大小/區段閒置時間等政策，管理每個區段的生命週期。</p></li>
<li><p><strong>基本事務支援</strong>：由於每個訊息都有大小限制，因此 WAL 元件支援簡單的事務層級，以承諾在 VChannel 層級進行原子寫入。</p></li>
<li><p><strong>高併發遠端日誌寫入</strong>：Milvus 支援第三方遠端訊息佇列作為 WAL 儲存。為了減緩串流節點與遠端 WAL 儲存之間的往返延遲 (RTT)，以提高寫入吞吐量，串流服務支援並發日誌寫入。它透過 TSO 和 TSO 同步來維護訊息順序，WAL 中的訊息會依據 TSO 順序讀取。</p></li>
<li><p><strong>預先寫入緩衝區 (Write-Ahead Buffer)：</strong>訊息寫入 WAL 後，會暫時存放在 Write-Ahead Buffer 中。這可在不從遠端 WAL 儲存取得訊息的情況下，進行日誌的尾端讀取。</p></li>
<li><p><strong>支援多個 WAL 儲存空間</strong>：Woodpecker、Pulsar、Kafka。使用零磁碟模式的 Woodpecker，我們可以移除遠端 WAL 儲存的依賴。</p></li>
</ul>
<h2 id="Recovery-Storage" class="common-anchor-header">復原儲存<button data-href="#Recovery-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Recovery Storage</strong>元件總是在對應 WAL 元件所在的串流節點上執行。</p>
<ul>
<li><p>它負責將串流資料轉換為持久化歷史資料，並儲存在物件儲存空間中。</p></li>
<li><p>它還處理串流節點上 WAL 元件的記憶體內狀態復原。</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/recovery_storage.png" alt="Recovery Storage" class="doc-image" id="recovery-storage" />
   </span> <span class="img-wrapper"> <span>復原儲存</span> </span></p>
<h2 id="Query-Delegator" class="common-anchor-header">查詢委託器<button data-href="#Query-Delegator" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Query Delegator</strong>在每個串流節點上執行，負責在單一分片上執行<strong>增量查詢</strong>。它會產生查詢計劃、將計劃轉送至相關的查詢節點，並匯總結果。</p>
<p>此外，查詢委託器負責將<strong>Delete 作業</strong>廣播給其他查詢節點。</p>
<p>查詢委託器總是與 WAL 元件共存於同一個串流節點上。但如果集合設定為多重複製，則會在其他串流節點上部署<strong>N-1 個委</strong>託器。</p>
<h2 id="WAL-Lifetime-and-Wait-for-Ready" class="common-anchor-header">WAL 壽命與等待就緒<button data-href="#WAL-Lifetime-and-Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>透過將計算節點與儲存分離，Milvus 可以輕鬆地將 WAL 從一個串流節點傳輸到另一個串流節點，達到串流服務的高可用性。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/wal_lifetime.png" alt="wal lifetime" class="doc-image" id="wal-lifetime" />
   </span> <span class="img-wrapper"> <span>WAL 壽命</span> </span></p>
<h2 id="Wait-for-Ready" class="common-anchor-header">等待就緒<button data-href="#Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>當 WAL 移動到新的串流節點時，用戶端會發現舊的串流節點拒絕了一些請求。與此同時，WAL 會在新的串流節點恢復，用戶端會等待新串流節點上的 wal 準備好提供服務。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_wait_for_ready.png" alt="wait for ready" class="doc-image" id="wait-for-ready" />
   </span> <span class="img-wrapper"> <span>等待就緒</span> </span></p>
