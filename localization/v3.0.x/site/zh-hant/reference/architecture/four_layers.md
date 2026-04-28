---
id: four_layers.md
summary: Milvus 中的儲存/計算分解結構。
title: 儲存/計算分解
---
<h1 id="StorageComputing-Disaggregation" class="common-anchor-header">儲存/計算分解<button data-href="#StorageComputing-Disaggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>依據資料平面與控制平面分解的原則，Milvus 包含四個層級，在可擴充性及災難復原方面相互獨立。</p>
<h2 id="Access-layer" class="common-anchor-header">存取層<button data-href="#Access-layer" class="anchor-icon" translate="no">
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
    </button></h2><p>存取層由一組無狀態代理所組成，是系統的前端層，也是使用者的終點。它驗證用戶端的請求，並減少返回的結果：</p>
<ul>
<li>代理本身是無狀態的。它使用負載平衡元件（如 Nginx、Kubernetes Ingress、NodePort 和 LVS）提供統一的服務位址。</li>
<li>由於 Milvus 採用大規模平行處理 (MPP) 架構，因此 Proxy 會先將中間結果聚合並進行後處理，再將最終結果傳回給用戶端。</li>
</ul>
<h2 id="Coordinator" class="common-anchor-header">協調器<button data-href="#Coordinator" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>協調器</strong>是 Milvus 的大腦。在任何時候，整個群集都會有一位 Coordinator 在運作，負責維護群集拓樸、排程所有任務類型，並確保群集層級的一致性。</p>
<p>以下是一些由<strong>Coordinator</strong> 處理的任務：</p>
<ul>
<li><strong>DDL/DCL/TSO 管理</strong>：處理資料定義語言 (DDL) 和資料控制語言 (DCL) 請求，例如建立或刪除集合、分割或索引，以及管理時間戳記 Oracle (TSO) 和時間記號發佈。</li>
<li><strong>串流服務管理</strong>：將 Write-Ahead Log (WAL) 與串流節點綁定，並提供串流服務的服務發現。</li>
<li><strong>查詢管理</strong>：管理查詢節點的拓樸結構和負載平衡，並提供和管理服務查詢檢視，以引導查詢路由。</li>
<li><strong>歷史資料管理</strong>：將壓縮和建立索引等離線工作分派給資料節點，並管理區段的拓樸結構和資料檢視。</li>
</ul>
<h2 id="Worker-nodes" class="common-anchor-header">工作節點<button data-href="#Worker-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>手腳。工作節點是遵循協調器指示的啞巴執行器。由於儲存與計算分離，工作節點是無狀態的，當部署在 Kubernetes 上時，可促進系統擴充與災難復原。Worker 節點有三種類型：</p>
<h3 id="Streaming-node" class="common-anchor-header">串流節點</h3><p>Streaming Node 充當 shard 級的「迷你大腦」，提供 shard 級的一致性保證，並根據底層 WAL 儲存進行故障復原。同時，Streaming Node 也負責成長資料查詢和產生查詢計畫。此外，它還處理將成長中的資料轉換為封存（歷史）資料。</p>
<h3 id="Query-node" class="common-anchor-header">查詢節點</h3><p>查詢節點從物件儲存區載入歷史資料，並提供歷史資料查詢。</p>
<h3 id="Data-node" class="common-anchor-header">資料節點</h3><p>資料節點負責離線處理歷史資料，例如壓縮和建立索引。</p>
<h2 id="Storage" class="common-anchor-header">儲存空間<button data-href="#Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>儲存是系統的骨幹，負責資料的持久性。它包括元儲存、日誌經紀人和物件儲存。</p>
<h3 id="Meta-storage" class="common-anchor-header">元儲存</h3><p>元存儲儲存了元資料的快照，例如收集模式和訊息消耗檢查點。儲存元資料需要極高的可用性、強大的一致性和交易支援，因此 Milvus 選擇 etcd 作為元儲存。Milvus 也使用 etcd 進行服務註冊和健康檢查。</p>
<h3 id="Object-storage" class="common-anchor-header">物件儲存</h3><p>物件儲存存放日誌的快照檔案、標量與向量資料的索引檔案，以及中間查詢結果。Milvus 使用 MinIO 作為物件儲存，並可隨時部署在 AWS S3 和 Azure Blob 這兩種全球最流行、最具成本效益的儲存服務上。然而，物件儲存有很高的存取延遲，並且會依據查詢次數收費。為了提升效能並降低成本，Milvus 計劃在記憶體或 SSD 為基礎的快取記憶體池上實施冷熱資料分離。</p>
<h3 id="WAL-storage" class="common-anchor-header">WAL 儲存</h3><p>Write-Ahead Log (WAL) 儲存是分散式系統中資料耐久性與一致性的基礎。在提交任何變更之前，首先會將其記錄在日誌中，以確保在發生故障時，可以準確地恢復到之前的位置。</p>
<p>常見的 WAL 實作包括 Kafka、Pulsar 和 Woodpecker。與傳統基於磁碟的解決方案不同，Woodpecker 採用雲原生、零磁碟設計，直接寫入物件儲存。這種方法可以毫不費力地根據您的需求進行擴展，並透過消除管理本機磁碟的開銷來簡化作業。</p>
<p>透過提前記錄每次寫入作業，WAL 層可保證可靠的全系統復原與一致性機制 - 無論您的分散式環境有多複雜。</p>
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
<li>閱讀「<a href="/docs/zh-hant/main_components.md">主要元件</a>」，瞭解 Milvus 架構的更多詳細資訊。</li>
</ul>
