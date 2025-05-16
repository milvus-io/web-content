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
<li>由於 Milvus 採用大規模平行處理 (MPP) 架構，因此代理會先將中間結果聚合並進行後處理，再將最終結果傳回給用戶端。</li>
</ul>
<h2 id="Coordinator-service" class="common-anchor-header">協調器服務<button data-href="#Coordinator-service" class="anchor-icon" translate="no">
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
    </button></h2><p>協調器服務會指派任務給工作節點，並扮演系統大腦的角色。它負責的任務包括群集拓樸管理、負載平衡、時間戳記產生、資料宣告和資料管理。</p>
<p>有三種協調器類型：根協調器 (root coordinator)、資料協調器 (data coordinator) 和查詢協調器 (query coordinator)。</p>
<h3 id="Root-coordinator-root-coord" class="common-anchor-header">根協調器 (root coordinator)</h3><p>根協調器處理資料定義語言 (DDL) 和資料控制語言 (DCL) 請求，例如建立或刪除集合、分割或索引，以及管理 TSO（時戳 Oracle）和時間記錄發行。</p>
<h3 id="Query-coordinator-query-coord" class="common-anchor-header">查詢協調員 (query coordinator)</h3><p>查詢協調員管理查詢節點的拓樸和負載平衡，以及從成長中的區段到封閉區段的交接。</p>
<h3 id="Data-coordinator-data-coord" class="common-anchor-header">資料協調器 (資料協調器)</h3><p>資料協調器管理資料節點和索引節點的拓樸結構、維護元資料、觸發刷新、壓縮和索引建立以及其他背景資料作業。</p>
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
    </button></h2><p>工作節點是「啞的」執行器，會遵循協調器服務的指示，並執行來自代理的資料處理語言 (DML) 指令。由於儲存與計算的分離，工作節點是無狀態的，當部署在 Kubernetes 上時，可促進系統擴充與災難復原。Worker 節點有三種類型：</p>
<h3 id="Query-node" class="common-anchor-header">查詢節點</h3><p>查詢節點擷取增量日誌資料，並透過訂閱日誌經紀人將其轉換為成長中的區段，從物件儲存載入歷史資料，並在向量與標量資料之間執行混合搜尋。</p>
<h3 id="Data-node" class="common-anchor-header">資料節點</h3><p>資料節點透過訂閱日誌中介擷取增量日誌資料、處理突變請求、將日誌資料打包成日誌快照並儲存在物件儲存空間。</p>
<h3 id="Index-node" class="common-anchor-header">索引節點</h3><p>索引節點建立索引。它們不需要駐留在記憶體中，並且可以使用無伺服器框架實作。</p>
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
    </button></h2><p>儲存是系統的骨骼，負責資料的持久化。它包括元儲存、日誌中介和物件儲存。</p>
<h3 id="Meta-storage" class="common-anchor-header">元儲存</h3><p>元存儲會儲存元資料的快照，例如集合模式和訊息消耗檢查點。儲存元資料需要極高的可用性、強大的一致性和交易支援，因此 Milvus 選擇 etcd 來達到此目的。Milvus 也使用 etcd 進行服務註冊和健康檢查。</p>
<h3 id="Object-storage" class="common-anchor-header">物件儲存</h3><p>物件儲存可儲存日誌快照檔案、標量與向量資料的索引檔案，以及中間查詢結果。Milvus 使用 MinIO 作為物件儲存，並可隨時部署在 AWS S3 和 Azure Blob 這兩種全球最流行、最具成本效益的儲存服務上。然而，物件儲存的存取延遲很高，而且會依據查詢次數收費。為了提升效能並降低成本，Milvus 計劃在記憶體或 SSD 型快取記憶體池上實施冷熱資料分離。</p>
<h3 id="Log-broker" class="common-anchor-header">日誌中介</h3><p>日誌經紀人是一個支援播放的 pub-sub 系統。它負責串流資料的持久化和事件通知。當工作節點從系統故障中復原時，它也會確保增量資料的完整性。Milvus Distributed 使用 Pulsar 作為日誌代理，而 Milvus Standalone 則使用 RocksDB。日誌代理可以很容易地以 Kafka 等串流資料儲存平台取代。</p>
<p>Milvus 遵循「日誌即資料」的原則，因此 Milvus 不會維護實體資料表，而是透過日誌持久化和快照日誌來保證資料的可靠性。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/log_mechanism.png" alt="Log_mechanism" class="doc-image" id="log_mechanism" />
   </span> <span class="img-wrapper"> <span>日誌機制</span> </span></p>
<p>日誌中介是 Milvus 的骨幹。由於其天生的 pub-sub 機制，它負責資料的持久性和讀寫分解。上圖顯示了該機制的簡化描述，系統分為兩個角色，日誌經紀人（負責維護日誌順序）和日誌訂閱者。前者記錄所有改變收集狀態的作業；後者訂閱日誌序列以更新本機資料，並以唯讀副本的形式提供服務。pub-sub 機制也為系統在變更資料擷取 (CDC) 和全球分散部署方面的擴充能力預留了空間。</p>
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
<li>請閱讀「<a href="/docs/zh-hant/v2.4.x/main_components.md">主要元件</a>」以瞭解更多有關 Milvus 架構的詳細資訊。</li>
</ul>
