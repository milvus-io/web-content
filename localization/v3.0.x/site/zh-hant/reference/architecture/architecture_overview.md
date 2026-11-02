---
id: architecture_overview.md
summary: Milvus 提供了一個專為相似性搜尋與人工智慧所打造的快速、可靠且穩定的向量資料庫。
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
    </button></h1><p>Milvus<strong>是一款開源</strong>、<strong>雲原生的向量</strong>資料庫，專為在龐大的向量資料集上進行高效能相似度搜尋而設計。它基於 Faiss、HNSW、DiskANN 和 SCANN 等熱門向量搜尋函式庫建構而成，能為 AI 應用程式及非結構化資料檢索情境提供強大支援。 在繼續之前，請先熟悉嵌入式檢索<a href="/docs/zh-hant/glossary.md">的基本原理</a>。</p>
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
    </button></h2><p>下圖展示 Milvus 的高階架構，呈現其模組化、可擴展且雲原生的設計，並具備完全分離的儲存層與運算層。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" /> 
   <span>架構圖</span>
  
 </span></p>
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
    </button></h2><p>Milvus 遵循資料平面與控制平面解耦的原則，由四個主要層級組成，這些層級在可擴展性與災難復原方面彼此獨立。 此共享儲存架構透過完全解耦的儲存層與運算層，不僅能實現運算節點的水平擴展，同時將 Woodpecker 作為零磁碟 WAL 層，從而提升彈性並降低營運開銷。</p>
<p>透過將流式處理分離至「流式處理節點」，並將批次處理分離至「查詢節點」與「資料節點」，Milvus 不僅能實現高效能，同時也能滿足即時處理的需求。</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">詳細的層級架構<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">第 1 層：存取層<button data-href="#Layer-1-Access-Layer" class="anchor-icon" translate="no">
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
    </button></h3><p>存取層由一組無狀態代理組成，是系統的前端層，也是用戶的終端點。它負責驗證客戶端請求並篩選回傳的結果：</p>
<ul>
<li>代理本身是無狀態的。它透過 Nginx、Kubernetes Ingress、NodePort 和 LVS 等負載平衡組件，提供統一的服務位址。</li>
<li>由於 Milvus 採用大規模並行處理（MPP）架構，代理會先彙總並後處理中間結果，再將最終結果傳回給客戶端。</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">第 2 層：協調器<button data-href="#Layer-2-Coordinator" class="anchor-icon" translate="no">
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
    </button></h3><p>協調器是 Milvus 的「大腦」。在任何時刻，整個叢集中僅有一台協調器處於活躍狀態，負責維護叢集拓撲、調度所有任務類型，並確保叢集層級的一致性。</p>
<p>以下是<strong>協調器</strong>處理的部分任務：</p>
<ul>
<li><strong>DDL/DCL/TSO 管理</strong>：處理資料定義語言（DDL）和資料控制語言（DCL）請求，例如建立或刪除集合、分區或索引，以及管理 Oracle 時間戳記（TSO）和時間計時器的發放。</li>
<li><strong>串流服務管理</strong>：將預寫日誌（WAL）與串流節點綁定，並為串流服務提供服務發現功能。</li>
<li><strong>查詢管理</strong>：管理查詢節點的拓撲結構與負載平衡，並提供及管理服務查詢檢視，以引導查詢路由。</li>
<li><strong>歷史資料管理</strong>：將緊湊化和建立索引等離線任務分發至資料節點，並管理區段和資料檢視的拓撲結構。</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">第 3 層：工作節點<button data-href="#Layer-3-Worker-Nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>系統的「手臂與雙腿」。工作節點是遵循協調器指令的「啞執行器」。由於儲存與運算的分離，工作節點具有無狀態特性，且當部署於 Kubernetes 時，可促進系統的水平擴展與災難復原。工作節點分為三種類型：</p>
<h3 id="Streaming-node" class="common-anchor-header">串流節點<button data-href="#Streaming-node" class="anchor-icon" translate="no">
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
    </button></h3><p>串流節點作為分片層級的「迷你大腦」，基於底層的 WAL 儲存，提供分片層級的一致性保證與故障恢復。同時，串流節點也負責處理增長中的資料查詢並生成查詢計畫。此外，它還負責將增長中的資料轉換為封存（歷史）資料。</p>
<h3 id="Query-node" class="common-anchor-header">查詢節點<button data-href="#Query-node" class="anchor-icon" translate="no">
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
    </button></h3><p>查詢節點從物件儲存中載入歷史資料，並提供歷史資料查詢功能。</p>
<h3 id="Data-node" class="common-anchor-header">資料節點<button data-href="#Data-node" class="anchor-icon" translate="no">
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
    </button></h3><p>資料節點負責歷史資料的離線處理，例如資料壓縮與索引建置。</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">第 4 層：儲存<button data-href="#Layer-4-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>儲存層是系統的骨幹，負責資料的持久化。它由元資料儲存、日誌中介和物件儲存組成。</p>
<h3 id="Meta-storage" class="common-anchor-header">元數據儲存<button data-href="#Meta-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>元數據儲存負責儲存元數據的快照，例如集合模式和訊息消耗檢查點。儲存元數據需要極高的可用性、強一致性以及對事務的支持，因此 Milvus 選擇 etcd 作為元數據儲存。Milvus 亦使用 etcd 進行服務註冊與健康檢查。</p>
<h3 id="Object-storage" class="common-anchor-header">物件儲存<button data-href="#Object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>物件儲存負責將資料與索引檔案持久化。Milvus 支援 MinIO、AWS S3 及 Azure Blob Storage 等物件儲存後端。查詢節點（QueryNodes）會快取處理查詢所需的数据與索引。</p>
<p>透過 Milvus 2.6.4 及後續版本所提供的<a href="/docs/zh-hant/tiered-storage-overview.md">分層儲存功能</a>，查詢節點可先載入區段元資料，並在需要時才擷取欄位資料或索引，而非在初始化時一次性載入所有內容。遠端物件儲存仍是持久化來源；清除本地快取項目並不會刪除儲存的資料。 存取未快取的資料會增加儲存 I/O，並可能提高查詢延遲。對於對延遲敏感的欄位或索引，請使用<a href="/docs/zh-hant/warm-up.md">「預熱 (Warm Up)」</a>功能，並在選擇載入策略前，評估「冷查詢」以及「溫快取」的延遲。</p>
<h3 id="WAL-storage" class="common-anchor-header">WAL 儲存<button data-href="#WAL-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>預寫日誌 (WAL) 儲存是分散式系統中資料持久性與一致性的基礎。任何變更在提交之前，都會先記錄在日誌中——確保在發生故障時，能夠精確地從中斷處恢復。</p>
<p>常見的 WAL 實作包括 Kafka、Pulsar 和 Woodpecker。與傳統的磁碟型解決方案不同，Woodpecker 採用雲原生、零磁碟的設計，可直接寫入物件儲存。此方法能輕鬆配合您的需求進行擴展，並透過消除管理本地磁碟的開銷來簡化運作。</p>
<p>透過預先記錄每項寫入操作，WAL 層能確保具備可靠且涵蓋整個系統的復原與一致性機制——無論您的分散式環境變得多麼複雜。</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">資料流與 API 類別<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 的 API 依其功能進行分類，並遵循架構中的特定路徑：</p>
<table>
<thead>
<tr><th>API 類別</th><th>操作</th><th>範例 API</th><th>架構流程</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>模式與存取控制</td><td><code translate="no">createCollection</code>、<code translate="no">dropCollection</code> 、<code translate="no">hasCollection</code> 、<code translate="no">createPartition</code></td><td>存取層 → 協調器</td></tr>
<tr><td><strong>DML</strong></td><td>資料操作</td><td><code translate="no">insert</code>,<code translate="no">delete</code>,<code translate="no">upsert</code></td><td>存取層 → 串流工作節點</td></tr>
<tr><td><strong>DQL</strong></td><td>資料查詢</td><td><code translate="no">search</code>,<code translate="no">query</code></td><td>存取層 → 批次處理節點（查詢節點）</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">資料流範例：搜尋操作<button data-href="#Example-Data-Flow-Search-Operation" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>客戶端透過 SDK/RESTful API 傳送搜尋請求</li>
<li>負載平衡器將請求路由至存取層中可用的代理伺服器</li>
<li>代理伺服器使用路由快取來確定目標節點；僅當快取不可用時才會聯繫協調器</li>
<li>代理將請求轉發至適當的串流節點，這些節點隨後會與查詢節點協調進行封裝資料搜尋，同時在本地執行增長型資料搜尋</li>
<li>查詢節點會根據需要從物件儲存中載入封裝區段，並執行區段層級的搜尋</li>
<li>搜尋結果會經過多層次篩選：查詢節點會跨多個區段篩選結果，串流節點會篩選來自查詢節點的結果，而代理伺服器則會在將結果回傳給客戶端前，先篩選來自所有串流節點的結果</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">資料流程範例：資料插入<button data-href="#Example-Data-Flow-Data-Insertion" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>客戶端發送包含向量資料的插入請求</li>
<li>存取層驗證請求並將其轉發至串流節點</li>
<li>串流節點將操作記錄至 WAL 儲存區以確保持久性</li>
<li>資料會即時處理，並可供查詢使用</li>
<li>當分段達到容量上限時，串流節點會觸發轉換為封存分段</li>
<li>資料節點負責執行壓縮，並在封存區段上建立索引，將結果儲存至物件儲存</li>
<li>查詢節點載入新建立的索引，並替換對應的持續增長的資料</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">下一步<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>探索<a href="/docs/zh-hant/main_components.md">主要組件</a>以了解詳細的實作細節</li>
<li>瞭解<a href="/docs/zh-hant/data_processing.md">資料處理</a>工作流程與優化策略</li>
<li>了解 Milvus<a href="/docs/zh-hant/tune_consistency.md">中的一致性模型</a>與交易保證</li>
</ul>
