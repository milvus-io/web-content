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
    </button></h1><p>Milvus 建立在流行的向量檢索函式庫之上，包括 Faiss、HNSW、DiskANN、SCANN 等，專為包含數百萬、數十億甚至數萬億向量的密集向量資料集的相似性檢索而設計。在繼續之前，請先熟悉嵌入檢索的<a href="/docs/zh-hant/v2.5.x/glossary.md">基本原則</a>。</p>
<p>Milvus 還支援資料分片、串流資料擷取、動態模式、結合向量與標量資料的搜尋、多向量與混合搜尋、稀疏向量以及許多其他進階功能。此平台可依需求提供效能，並可進行最佳化，以符合任何嵌入式檢索情境。我們建議使用 Kubernetes 部署 Milvus，以獲得最佳可用性與彈性。</p>
<p>Milvus 採用共享儲存架構，其運算節點具備儲存與運算分解及水平擴充能力。依據資料平面與控制平面分離的原則，Milvus 包含<a href="/docs/zh-hant/v2.5.x/four_layers.md">四個層級</a>：存取層、協調器服務、工作節點與儲存。這些層級在擴充或災難復原時是相互獨立的。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus_architecture.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>架構圖</span> </span></p>
<p>根據此圖，介面可分為以下幾類：</p>
<ul>
<li><strong>DDL / DCL：</strong>createCollection / createPartition / dropCollection / dropPartition / hasCollection / hasPartition</li>
<li><strong>DML / Produce:</strong>insert / delete / upsert</li>
<li><strong>DQL:</strong>搜尋 / 查詢</li>
</ul>
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
<li>了解更多關於 Milvus 的<a href="/docs/zh-hant/v2.5.x/four_layers.md">計算/存儲分解</a></li>
<li>了解 Milvus 的<a href="/docs/zh-hant/v2.5.x/main_components.md">主要元件</a>。</li>
</ul>
