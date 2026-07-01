---
id: overview.md
title: 什麼是 Milvus
related_key: Milvus Overview
summary: Milvus 是一款高效能且高度可擴展的向量資料庫，能從筆記型電腦到大型分散式系統等各種環境中高效運作。它同時提供開源軟體與雲端服務兩種形式。
---
<h1 id="What-is-Milvus" class="common-anchor-header">什麼是 Milvus？<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><span>Milvus<span style="display: inline-block; vertical-align: middle;">
<audio id="milvus-audio" style="display: none;">
<source src="https://en-audio.howtopronounce.com/15783806805e142d8844912.mp3" type="audio/mp3" />
</audio>
<span style="
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('https://milvus.io/docs/v2.6.x/assets/hearing.png') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    margin-left: 4px;
  " onclick="document.getElementById('milvus-audio').play()"></span>
</span></span>是一種隸屬於隼科（Accipitridae）Milvus 屬的猛禽，以其飛行的速度、敏銳的視力以及非凡的適應能力而聞名。</p>
<style>
  audio::-webkit-media-controls {
    display: none !important;
  }
</style>
<p>Zilliz 將其開源、高效能且高度可擴展的向量資料庫命名為 Milvus，該資料庫能從筆記型電腦到大型分散式系統等廣泛環境中高效運作。它同時提供開源軟體與雲端服務兩種形式。</p>
<p>由 Zilliz 開發，並即將捐贈給隸屬於 Linux Foundation 的 LF AI &amp; Data Foundation，Milvus 已成為全球領先的開源向量資料庫專案之一。 該專案採用 Apache 2.0 授權條款發佈，多數貢獻者皆來自高效能運算（HPC）社群的專家，專精於建構大規模系統及優化硬體感知程式碼。核心貢獻者包括來自 Zilliz、ARM、NVIDIA、AMD、Intel、Meta、IBM、Salesforce、阿里巴巴及微軟的專業人士。</p>
<p>值得注意的是，Zilliz 的每個開源專案都以鳥類命名，這項命名慣例象徵著自由、遠見以及技術的敏捷演進。</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">非結構化資料、嵌入向量與 Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>非結構化資料（例如文字、圖像和音訊）格式多樣且蘊含豐富的底層語義，使其分析難度較高。為應對這種複雜性，會運用嵌入向量將非結構化資料轉換為能捕捉其本質特徵的數值向量。這些向量隨後儲存於向量資料庫中，從而實現快速且可擴展的搜尋與分析。</p>
<p>Milvus 提供強大的資料建模能力，讓您能將非結構化或多模態資料組織成結構化集合。它支援廣泛的資料類型以進行不同的屬性建模，包括常見的數值和字元類型、各種向量類型、陣列、集合以及 JSON，讓您無需費心維護多個資料庫系統。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" /> 
   <span>非結構化資料、嵌入向量與 Milvus</span>
  
 </span></p>
<p>Milvus 提供三種部署模式，涵蓋廣泛的資料規模——從在 Jupyter Notebooks 中的本地原型開發，到管理數百億個向量的龐大 Kubernetes 叢集：</p>
<ul>
<li>Milvus Lite 是一個可輕鬆整合至您應用程式的 Python 函式庫。作為 Milvus 的輕量級版本，它非常適合在 Jupyter Notebook 中進行快速原型開發，或在資源有限的邊緣裝置上運行。<a href="/docs/zh-hant/milvus_lite.md">了解更多</a>。</li>
<li>Milvus Standalone 是一種單機伺服器部署方案，所有元件均整合至單一 Docker 映像檔中，便於部署。<a href="/docs/zh-hant/install_standalone-docker.md">了解更多</a>。</li>
<li>Milvus Distributed 可部署於 Kubernetes 叢集，採用專為十億級甚至更大規模情境設計的雲原生架構。此架構確保關鍵元件具備冗餘性。<a href="/docs/zh-hant/install_cluster-milvusoperator.md">了解更多</a>。</li>
</ul>
<h2 id="What-Makes-Milvus-so-Fast" class="common-anchor-header">是什麼讓 Milvus 如此快速？<button data-href="#What-Makes-Milvus-so-Fast" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 從一開始便被設計為高效能的向量資料庫系統。在大多數情況下，Milvus 的效能比其他向量資料庫高出 2 至 5 倍（參見 VectorDBBench 測試結果）。這項卓越的效能源自於幾項關鍵的設計決策：</p>
<p><strong>硬體感知優化</strong>：為了讓 Milvus 能適應各種硬體環境，我們針對多種硬體架構與平台（包括 AVX512、SIMD、GPU 及 NVMe SSD）進行了專屬的效能優化。</p>
<p><strong>先進的搜尋演算法</strong>：Milvus 支援多種記憶體內與磁碟上的索引/搜尋演算法，包括 IVF、HNSW、DiskANN 等，且所有演算法均經過深度優化。相較於 FAISS 和 HNSWLib 等常見實作，Milvus 的效能提升達 30% 至 70%。</p>
<p><strong>以 C++ 開發的搜尋引擎</strong>：向量資料庫超過 80% 的效能取決於其搜尋引擎。Milvus 採用 C++ 開發此關鍵組件，因其具備高效能、低階優化及高效的資源管理能力。 最重要的是，Milvus 整合了眾多硬體感知式的程式碼優化技術，範圍涵蓋從匯編級向量化到多執行緒並行化與排程，以充分發揮硬體效能。</p>
<p><strong>欄位導向</strong>：Milvus 是一個欄位導向的向量資料庫系統。 其主要優勢源自於資料存取模式。在執行查詢時，列導向資料庫僅讀取查詢涉及的特定欄位，而非整行資料，這大大減少了存取的資料量。此外，針對列式資料的操作可輕鬆向量化，使操作能一次套用至整列資料，進一步提升效能。</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">Milvus 為何具備如此強大的可擴展性<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>2022 年，Milvus 已支援十億級向量；2023 年，其規模更擴展至數百億級，且始終保持穩定運作，為包括 Salesforce、PayPal、Shopee、Airbnb、eBay、NVIDIA、 IBM、AT&amp;T、LINE、ROBLOX、Inflection 等。</p>
<p>Milvus 的雲原生且高度解耦的系統架構，確保系統能隨著資料量增長而持續擴展：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" /> 
   <span>Milvus 高度解耦的系統架構</span>
  
 </span></p>
<p>Milvus 本身完全無狀態，因此可透過 Kubernetes 或公有雲輕鬆進行擴展。 此外，Milvus 的各組件之間解耦程度極高，其中三項最關鍵的任務——搜尋、資料插入以及索引建立／壓縮——皆被設計為易於並行化的流程，並將複雜邏輯分離出來。這確保了對應的查詢節點、資料節點和索引節點能夠獨立地進行縱向與橫向擴展，從而優化效能與成本效益。</p>
<h2 id="Types-of-Searches-Supported-by-Milvus" class="common-anchor-header">Milvus 支援的搜尋類型<button data-href="#Types-of-Searches-Supported-by-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支援多種搜尋功能，以滿足不同使用情境的需求：</p>
<ul>
<li><a href="/docs/zh-hant/single-vector-search.md#Basic-search">ANN 搜尋</a>：找出與查詢向量最接近的前 K 個向量。</li>
<li><a href="/docs/zh-hant/single-vector-search.md#Filtered-search">篩選搜尋</a>：在指定的篩選條件下執行 ANN 搜尋。</li>
<li><a href="/docs/zh-hant/single-vector-search.md#Range-search">範圍搜尋</a>：找出距離查詢向量在指定半徑範圍內的向量。</li>
<li><a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a>：基於多個向量場進行人工神經網路搜尋。</li>
<li><a href="/docs/zh-hant/full-text-search.md">全文檢索</a>：基於 BM25 演算法的全文檢索。</li>
<li><a href="/docs/zh-hant/weighted-ranker.md">重新排序</a>：根據額外條件或次要演算法調整搜尋結果的順序，以優化最初的 ANN 搜尋結果。</li>
<li><a href="/docs/zh-hant/get-and-scalar-query.md#Get-Entities-by-ID">擷取</a>：根據主鍵擷取資料。</li>
<li><a href="/docs/zh-hant/get-and-scalar-query.md#Use-Basic-Operators">查詢</a>：使用特定表達式檢索資料。</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">全面的特色功能集<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>除了上述關鍵搜尋功能外，Milvus 還提供了一套圍繞人工神經網路（ANN）搜尋所實現的功能，讓您能夠充分發揮其效能。</p>
<h3 id="API-and-SDK" class="common-anchor-header">API 與 SDK<button data-href="#API-and-SDK" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.6.x/About.md">RESTful API</a>（官方）</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.6.x/About.md">PyMilvus</a>（Python SDK）（官方）</li>
<li><a href="https://milvus.io/api-reference/go/v2.6.x/About.md">Go SDK</a>（官方）</li>
<li><a href="https://milvus.io/api-reference/java/v2.6.x/About.md">Java SDK</a>（官方）</li>
<li><a href="https://milvus.io/api-reference/node/v2.6.x/About.md">Node.js</a>(JavaScript) SDK (官方)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a>（由 Microsoft 提供）</li>
<li><a href="https://milvus.io/api-reference/cpp/v2.6.x/About.md">C++ SDK</a>（官方）</li>
<li>Rust SDK（開發中）</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">進階資料類型<button data-href="#Advanced-Data-Types" class="anchor-icon" translate="no">
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
    </button></h3><p>除了基本資料類型之外，Milvus 還支援各種進階資料類型及其各自適用的距離度量。</p>
<ul>
<li><a href="/docs/zh-hant/sparse_vector.md">稀疏向量</a></li>
<li><a href="/docs/zh-hant/index-vector-fields.md">二進位向量</a></li>
<li><a href="/docs/zh-hant/use-json-fields.md">JSON 支援</a></li>
<li><a href="/docs/zh-hant/array_data_type.md">陣列支援</a></li>
<li>文字（開發中）</li>
<li>地理位置（開發中）</li>
</ul>
<h3 id="Why-Milvus" class="common-anchor-header">為何選擇 Milvus？<button data-href="#Why-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p><strong>大規模運作下的高效能與高可用性</strong></p>
<p>Milvus 採用<a href="/docs/zh-hant/architecture_overview.md">分散式架構，</a> <a href="/docs/zh-hant/data_processing.md#Data-query">將運算</a>與<a href="/docs/zh-hant/data_processing.md#Data-insertion">儲存</a>分離。Milvus 能進行水平擴展並適應多樣化的流量模式，透過針對讀取密集型工作負載獨立增加查詢節點，以及針對寫入密集型工作負載獨立增加資料節點，從而實現最佳效能。 基於 K8s 的無狀態微服務可實現<a href="/docs/zh-hant/coordinator_ha.md#Coordinator-HA">快速</a>故障<a href="/docs/zh-hant/coordinator_ha.md#Coordinator-HA">恢復，</a>確保高可用性。透過在多個查詢節點上載入資料區段，對<a href="/docs/zh-hant/replica.md">複本</a>的支持進一步增強了容錯能力與吞吐量。請參閱<a href="https://zilliz.com/vector-database-benchmark-tool">基準測試</a>以了解效能比較。</p></li>
<li><p><strong>支援多種向量索引類型與硬體加速</strong></p>
<p>Milvus 將系統層與核心向量搜尋引擎分離，使其能支援針對不同情境進行優化的所有主要向量索引類型，包括 HNSW、IVF、FLAT（暴力搜尋）、SCANN 及 DiskANN，並包含<a href="/docs/zh-hant/index-explained.md">基於量化的變</a>體與<a href="/docs/zh-hant/mmap.md">mmap 功能</a>。 Milvus<a href="/docs/zh-hant/boolean.md">針對元資料篩選</a>和<a href="/docs/zh-hant/range-search.md">範圍搜尋</a>等進階功能，對向量搜尋進行了優化。此外，Milvus 還實現了硬體加速以提升向量搜尋效能，並支援 GPU 索引功能，例如 NVIDIA 的<a href="/docs/zh-hant/gpu-cagra.md">CAGRA</a>。</p></li>
<li><p><strong>靈活的多租戶與熱/冷儲存</strong></p>
<p>Milvus 透過在資料庫、集合、分區或分區鍵層級進行隔離，以支援<a href="/docs/zh-hant/multi_tenancy.md#Multi-tenancy-strategies">多租戶架構</a>。這些靈活的策略使單一叢集能處理數百至數百萬個租戶，同時確保最佳化的搜尋效能與彈性的存取控制。 Milvus 透過熱儲存與冷儲存機制提升成本效益。頻繁存取的熱資料可儲存於記憶體或 SSD 中以獲得更佳效能，而較少存取的冷資料則存放於速度較慢但具成本效益的儲存裝置上。此機制可在維持關鍵任務高效能的同時，顯著降低成本。</p></li>
<li><p><strong>用於全文搜尋與混合搜尋的稀疏向量</strong></p>
<p>除了透過密集向量進行語義搜尋外，Milvus 還原生支援基於 BM25<a href="/docs/zh-hant/full-text-search.md">的全文搜尋，</a>以及 SPLADE 和 BGE-M3 等學習型稀疏嵌入。使用者可將稀疏向量與密集向量儲存於同一集合中，並定義函式以重新排序來自多個搜尋請求的結果。 請參閱<a href="/docs/zh-hant/full_text_search_with_milvus.md">語義搜尋 + 全文搜尋的混合搜尋</a>範例。</p></li>
<li><p><strong>資料安全與細粒度存取控制</strong></p>
<p>Milvus 透過實施<a href="/docs/zh-hant/authenticate.md">強制性使用者驗證</a>、<a href="/docs/zh-hant/tls.md">TLS 加密</a>以及<a href="/docs/zh-hant/rbac.md">基於角色的存取控制（RBAC）</a>，確保資料安全。使用者驗證可確保僅有持有有效憑證的授權使用者才能存取資料庫，而 TLS 加密則能保障網路內所有通訊的安全。 此外，RBAC 透過根據使用者角色指派特定權限，實現細粒度的存取控制。這些功能使 Milvus 成為企業應用程式的堅實且安全的選擇，能保護敏感資料免受未經授權的存取及潛在的資料外洩。</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">AI 整合<button data-href="#AI-Integrations" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>嵌入式模型整合
嵌入式模型將非結構化資料轉換為高維度資料空間中的數值表示形式，以便您將其儲存於 Milvus 中。目前，Python SDK「PyMilvus」已整合多種嵌入式模型，讓您能快速將資料轉換為向量嵌入。詳細資訊請參閱<a href="/docs/zh-hant/embeddings.md">《嵌入式模型概覽</a>》。</p></li>
<li><p>重新排序模型整合
在資訊檢索與生成式 AI 領域中，重新排序器（reranker）是優化初始搜尋結果排序的關鍵工具。PyMilvus 亦整合了多種重新排序模型，用以優化初始搜尋所返回結果的排序。詳情請參閱《<a href="/docs/zh-hant/rerankers-overview.md">重新排序器概覽</a>》。</p></li>
<li><p>LangChain 及其他 AI 工具整合
在生成式 AI 時代，諸如 LangChain 之類的工具備受應用程式開發者矚目。作為核心組件，Milvus 通常在這些工具中擔任向量儲存庫的角色。若要了解如何將 Milvus 整合至您喜愛的 AI 工具中，請參閱我們的<a href="/docs/zh-hant/integrate_with_openai.md">「整合方案與</a> <a href="/docs/zh-hant/build-rag-with-milvus.md">教學指南</a> <a href="/docs/zh-hant/integrate_with_openai.md">」</a>。</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">工具與生態系統<button data-href="#Tools-and-Ecosystem" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Attu
Attu 是一款直觀的一體化圖形使用者介面（GUI），可協助您管理 Milvus 及其儲存的資料。詳細資訊請參閱<a href="https://github.com/zilliztech/attu">Attu</a>儲存庫。</p></li>
<li><p>Birdwatcher
Birdwatcher 是一款專為 Milvus 設計的除錯工具。透過它連線至 etcd，您可以檢查 Milvus 系統的狀態，或即時進行配置。詳情請參閱<a href="/docs/zh-hant/birdwatcher_overview.md">BirdWatcher</a>。</p></li>
<li><p>Prometheus 與 Grafana 整合
Prometheus 是一款適用於 Kubernetes 的開源系統監控與警示工具套件。Grafana 則是一套可連接所有資料來源的開源視覺化套件。您可以將 Prometheus 與 Grafana 作為監控服務提供者，以視覺化方式監控 Milvus 分散式系統的效能。詳細資訊請參閱<a href="/docs/zh-hant/monitor.md">《部署監控服務》</a>。</p></li>
<li><p>Milvus Backup
Milvus Backup 是一項讓使用者能備份與還原 Milvus 資料的工具。它同時提供 CLI 與 API，以適應不同的應用情境。詳細資訊請參閱<a href="/docs/zh-hant/milvus_backup_overview.md">Milvus Backup</a>。</p></li>
<li><p>Milvus 資料變更擷取 (CDC)
Milvus-CDC 可擷取並同步 Milvus 實例中的增量資料，透過在來源與目標實例之間無縫傳輸資料，確保業務資料的可靠性，並便於進行增量備份與災難復原。詳細資訊請參閱《<a href="/docs/zh-hant/milvus-cdc-overview.md">Milvus CDC》</a>。</p></li>
<li><p>Milvus 連接器
Milvus 已規劃了一套連接器，讓您能將 Milvus 與第三方工具（例如 Apache Spark）無縫整合。目前，您可以使用我們的 Spark 連接器，將 Milvus 資料傳送至 Apache Spark 進行機器學習處理。詳細資訊請參閱<a href="/docs/zh-hant/integrate_with_spark.md">Spark-Milvus 連接器</a>。</p></li>
<li><p>向量傳輸服務 (VTS)
Milvus 提供了一套工具，讓您能在 Milvus 實例與多種資料來源之間傳輸資料，包括 Zilliz 叢集、Elasticsearch、Postgres (PgVector) 以及另一個 Milvus 實例。詳細資訊請參閱<a href="https://github.com/zilliztech/vts">VTS</a>。</p></li>
</ul>
