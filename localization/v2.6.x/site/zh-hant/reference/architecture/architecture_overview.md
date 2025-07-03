---
id: architecture_overview.md
summary: Milvus 提供快速、可靠、穩定的向量資料庫，專為相似性搜尋和人工智慧而建立。
title: Milvus 架構概述
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Milvus 架構概述<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 是一個<strong>開放源碼</strong>、<strong>雲原生</strong>向量資料庫，專為在大量向量資料集上進行高效能相似性搜尋而設計。它建構在流行的向量搜尋程式庫（包括 Faiss、HNSW、DiskANN 和 SCANN）之上，可增強人工智能應用程式和非結構化資料檢索情境的能力。在繼續之前，請先熟悉嵌入式檢索的<a href="/docs/zh-hant/glossary.md">基本原理</a>。</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">架構圖<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>下圖說明 Milvus 的高階架構，展示其模組、可擴充及雲原生的設計，以及完全分解的儲存層與運算層。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>架構圖</span> </span></p>
<h2 id="Architectural-Principles" class="common-anchor-header">架構原則<button data-href="#Architectural-Principles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 遵循資料平面與控制平面分解的原則，包含四個主要層級，在可擴充性及災難復原方面相互獨立。這種共用儲存架構具有完全分解的儲存層和運算層，可實現運算節點的水平擴充，同時將 Woodpecker 實作為零磁碟 WAL 層，以增加彈性並降低作業開銷。</p>
<p>透過將串流處理分離為串流節點 (Streaming Node)，以及將批處理分離為查詢節點 (Query Node) 和資料節點 (Data Node)，Milvus 可在滿足即時處理需求的同時達到高效能。</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">詳細的層架構<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">第 1 層：存取層</h3><p>存取層由一組無狀態代理組成，是系統的前端層，也是使用者的端點。它會驗證用戶端的要求，並減少傳回的結果：</p>
<ul>
<li>代理本身是無狀態的。它使用負載平衡元件（如 Nginx、Kubernetes Ingress、NodePort 和 LVS）提供統一的服務位址。</li>
<li>由於 Milvus 採用大規模平行處理 (MPP) 架構，因此代理會先將中間結果聚合並進行後處理，再將最終結果回傳給用戶端。</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">第二層：協調器</h3><p>協調器是 Milvus 的大腦。在任何時候，整個群集都會有一位 Coordinator 正處於活動狀態，負責維護群集拓樸、排程所有任務類型，並確保群集層級的一致性。</p>
<p>以下是一些由<strong>Coordinator</strong> 處理的任務：</p>
<ul>
<li><strong>DDL/DCL/TSO 管理</strong>：處理資料定義語言 (DDL) 和資料控制語言 (DCL) 請求，例如建立或刪除集合、分割或索引，以及管理時間戳 Oracle (TSO) 和時間刻度發佈。</li>
<li><strong>串流服務管理</strong>：將 Write-Ahead Log (WAL) 與串流節點綁定，並提供串流服務的服務發現。</li>
<li><strong>查詢管理</strong>：管理查詢節點的拓樸結構和負載平衡，並提供和管理服務查詢檢視，以引導查詢路由。</li>
<li><strong>歷史資料管理</strong>：將離線工作（例如壓縮和建立索引）分派給資料節點，並管理區段的拓樸結構和資料檢視。</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">第 3 層：工作節點</h3><p>手腳。工作節點是遵循協調器指示的啞巴執行器。由於儲存與計算的分離，工作節點是無狀態的，當部署在 Kubernetes 上時，可促進系統擴充與災難復原。Worker 節點有三種類型：</p>
<h3 id="Streaming-node" class="common-anchor-header">串流節點</h3><p>Streaming Node 作為 shard 層級的「小腦」，提供 shard 層級的一致性保證和基於底層 WAL 儲存的故障復原。同時，Streaming Node 也負責成長中的資料查詢和產生查詢計畫。此外，它還處理將成長中的資料轉換為封存（歷史）資料。</p>
<h3 id="Query-node" class="common-anchor-header">查詢節點</h3><p>查詢節點從物件儲存載入歷史資料，並提供歷史資料查詢。</p>
<h3 id="Data-node" class="common-anchor-header">資料節點</h3><p>資料節點負責離線處理歷史資料，例如壓縮和建立索引。</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">第四層：儲存</h3><p>儲存是系統的骨骼，負責資料的持久性。它包括元儲存、日誌中介和物件儲存。</p>
<h3 id="Meta-storage" class="common-anchor-header">元儲存</h3><p>元存儲儲存了元資料的快照，例如集合模式和訊息消耗檢查點。儲存元資料需要極高的可用性、強大的一致性和交易支援，因此 Milvus 選擇 etcd 作為元儲存。Milvus 也使用 etcd 進行服務註冊和健康檢查。</p>
<h3 id="Object-storage" class="common-anchor-header">物件儲存</h3><p>物件儲存存放日誌的快照檔案、標量與向量資料的索引檔案，以及中間查詢結果。Milvus 使用 MinIO 作為物件儲存，並可隨時部署在 AWS S3 和 Azure Blob 這兩種全球最流行、最具成本效益的儲存服務上。然而，物件儲存有很高的存取延遲，並且會依據查詢次數收費。為了提升效能並降低成本，Milvus 計劃在記憶體或 SSD 為基礎的快取記憶體池上實施冷熱資料分離。</p>
<h3 id="WAL-storage" class="common-anchor-header">WAL 儲存</h3><p>Write-Ahead Log (WAL) 儲存是分散式系統中資料耐久性與一致性的基礎。在提交任何變更之前，首先會將其記錄在日誌中，以確保在發生故障時，可以準確地恢復到之前的位置。</p>
<p>常見的 WAL 實作包括 Kafka、Pulsar 和 Woodpecker。與傳統基於磁碟的解決方案不同，Woodpecker 採用雲原生、零磁碟設計，直接寫入物件儲存。這種方法可以毫不費力地根據您的需求進行擴展，並透過消除管理本機磁碟的開銷來簡化作業。</p>
<p>透過提前記錄每次寫入作業，WAL 層可保證可靠的全系統復原與一致性機制 - 無論您的分散式環境如何複雜。</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">資料流程與 API 分類<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus API 依其功能分類，並遵循架構的特定路徑：</p>
<table>
<thead>
<tr><th>API 類別</th><th>操作</th><th>示例 API</th><th>架構流程</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>模式與存取控制</td><td><code translate="no">createCollection</code>,<code translate="no">dropCollection</code>,<code translate="no">hasCollection</code> 、<code translate="no">createPartition</code></td><td>存取層 → 協調器</td></tr>
<tr><td><strong>DML</strong></td><td>資料處理</td><td><code translate="no">insert</code>,<code translate="no">delete</code> 、<code translate="no">upsert</code></td><td>存取層 → 串流工作節點</td></tr>
<tr><td><strong>資料查詢</strong></td><td>資料查詢</td><td><code translate="no">search</code>,<code translate="no">query</code></td><td>存取層 → 批次工作節點 (查詢節點)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">資料流程範例：搜尋作業</h3><ol>
<li>用戶端透過 SDK/RESTful API 發送搜尋請求</li>
<li>負載平衡器將請求路由至存取層中可用的代理伺服器</li>
<li>代理使用路由快取記憶體決定目標節點；只有在快取記憶體不可用時才聯絡協調器</li>
<li>代理將請求轉發至適當的串流節點，然後與查詢節點協調進行密封資料搜尋，同時在本機執行成長中的資料搜尋</li>
<li>查詢節點依需要從物件儲存載入封存區段，並執行區段層級搜尋</li>
<li>搜尋結果進行多層次還原：查詢節點還原多個區段的結果，串流節點還原查詢節點的結果，代理還原所有串流節點的結果，然後再返回用戶端</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">資料流程範例：資料插入</h3><ol>
<li>用戶端傳送包含向量資料的插入請求</li>
<li>存取層驗證並轉發請求給串流節點</li>
<li>流節點將作業記錄到 WAL 儲存區以獲得持久性</li>
<li>即時處理資料，並提供給查詢使用</li>
<li>當區段達到容量時，串流節點會觸發轉換為密封區段</li>
<li>資料節點處理壓縮，並在密封區段之上建立索引，將結果儲存於物件儲存空間中</li>
<li>查詢節點載入新建立的索引，並取代相對應的成長中資料</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">下一步內容<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>探索<a href="/docs/zh-hant/main_components.md">主要元件</a>，瞭解詳細的實作細節</li>
<li>瞭解<a href="/docs/zh-hant/data_processing.md">資料處理</a>工作流程與最佳化策略</li>
<li>瞭解 Milvus 的<a href="/docs/zh-hant/consistency.md">一致性模型</a>和交易保證</li>
</ul>
