---
id: overview.md
title: 什麼是 Milvus
related_key: Milvus Overview
summary: >-
  Milvus
  是一種高效能、高度可擴充的向量資料庫，可在從筆記型電腦到大型分散式系統等各種環境中有效率地執行。它既可以開放原始碼軟體的形式提供，也可以雲端服務的形式提供。
---
<h1 id="What-is-Milvus" class="common-anchor-header">Milvus 是什麼？<button data-href="#What-is-Milvus" class="anchor-icon" translate="no">
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
    background: url('https://milvus.io/docs/v2.5.x/assets/hearing.png') no-repeat center center;
    background-size: contain;
    cursor: pointer;
    margin-left: 4px;
  " onclick="document.getElementById('milvus-audio').play()"></span>
</span></span>是鷹科(Accipaitridae)Milvus屬的猛禽，以飛行速度快、視力敏銳、適應力強而聞名。</p>
<style>
  audio::-webkit-media-controls { display: none !important; }</style>
<p>Zilliz 採用 Milvus 作為其開放原始碼的高效能、高擴充性向量資料庫的名稱，可在從筆記型電腦到大型分散式系統等各種環境中有效率地執行。它同時以開源軟體和雲端服務的形式提供。</p>
<p>Milvus 由 Zilliz 開發，並很快捐贈給 Linux 基金會下的 LF AI &amp; Data 基金會，目前已成為全球領先的開源向量資料庫專案之一。它以 Apache 2.0 授權釋出，大部分的貢獻者都是來自高效能運算 (HPC) 社群的專家，專精於建立大型系統和優化硬體感知程式碼。核心貢獻者包括來自 Zilliz、ARM、NVIDIA、AMD、Intel、Meta、IBM、Salesforce、阿里巴巴和微軟的專業人士。</p>
<p>有趣的是，Zilliz 的每個開放原始碼專案都以鳥的名字來命名，這種命名方式象徵著自由、前瞻性以及技術的敏捷演進。</p>
<h2 id="Unstructured-Data-Embeddings-and-Milvus" class="common-anchor-header">非結構化資料、嵌入與 Milvus<button data-href="#Unstructured-Data-Embeddings-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>非結構化資料，例如文字、圖片和音訊，格式各異，並帶有豐富的基本語意，因此分析起來相當具有挑戰性。為了管理這種複雜性，我們使用 embeddings 將非結構化資料轉換成可捕捉其基本特徵的數值向量。這些向量隨後會儲存在向量資料庫中，以實現快速、可擴展的搜尋和分析。</p>
<p>Milvus 提供強大的資料建模功能，讓您能夠將非結構化資料或多模式資料組織成結構化的集合。它支援各種不同屬性建模的資料類型，包括常見的數值和字元類型、各種向量類型、陣列、集合和 JSON，讓您省去維護多個資料庫系統的麻煩。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/unstructured-data-embedding-and-milvus.png" alt="Untructured data, embeddings, and Milvus" class="doc-image" id="untructured-data,-embeddings,-and-milvus" />
   </span> <span class="img-wrapper"> <span>非結構化資料、嵌入與 Milvus</span> </span></p>
<p>Milvus 提供三種部署模式，涵蓋廣泛的資料規模 - 從 Jupyter Notebooks 中的本機原型，到管理數百億向量的大型 Kubernetes 集群：</p>
<ul>
<li>Milvus Lite 是一個 Python 函式庫，可輕鬆整合至您的應用程式。Milvus Lite 是 Milvus 的輕量版，非常適合在 Jupyter Notebooks 中快速建立原型，或在資源有限的邊緣裝置上執行。<a href="/docs/zh-hant/milvus_lite.md">瞭解更多資訊</a>。</li>
<li>Milvus Standalone 是單機伺服器部署，所有元件都綁定在單一 Docker 映像檔中，方便部署。<a href="/docs/zh-hant/install_standalone-docker.md">進一步瞭解</a>。</li>
<li>Milvus Distributed 可部署在 Kubernetes 集群上，其雲端原生架構專為十億級或更大規模的情境所設計。此架構可確保關鍵元件的備援。<a href="/docs/zh-hant/install_cluster-milvusoperator.md">進一步瞭解</a>。</li>
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
    </button></h2><p>Milvus 從一開始就被設計成高效率的向量資料庫系統。在大多數情況下，Milvus 的效能比其他向量資料庫高出 2 至 5 倍 (請參閱 VectorDBBench 結果)。這種高效能是幾個關鍵設計決策的結果：</p>
<p><strong>硬體感知最佳化</strong>：為了讓 Milvus 適用於各種硬體環境，我們特別針對許多硬體架構和平台優化了其效能，包括 AVX512、SIMD、GPU 和 NVMe SSD。</p>
<p><strong>進階搜尋演算法</strong>：Milvus 支援廣泛的記憶體內與磁碟上索引/搜尋演算法，包括 IVF、HNSW、DiskANN 等，這些演算法都經過深度最佳化。與 FAISS 和 HNSWLib 等熱門實作相比，Milvus 的效能提升了 30%-70%。</p>
<p><strong>C++ 搜尋引擎</strong>：向量資料庫超過 80% 的效能取決於其搜尋引擎。由於 C++ 語言的高效能、低階最佳化和有效率的資源管理，Milvus 使用 C++ 來處理這個關鍵元件。最重要的是，Milvus 整合了許多硬體感知的程式碼最佳化，從匯編等級向量化到多執行緒平行化和排程，以充分發揮硬體能力。</p>
<p><strong>面向列</strong>：Milvus 是一個面向列的向量資料庫系統。其主要優勢來自資料存取模式。在執行查詢時，面向列的資料庫只讀取查詢所涉及的特定欄位，而不是整行，這大大減少了存取的資料量。此外，針對以列為基礎的資料進行的作業可以輕鬆地向量化，讓作業可以一次套用整個列，進一步提升效能。</p>
<h2 id="What-Makes-Milvus-so-Scalable" class="common-anchor-header">是什麼讓 Milvus 具備如此高的可擴展性？<button data-href="#What-Makes-Milvus-so-Scalable" class="anchor-icon" translate="no">
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
    </button></h2><p>2022 年，Milvus 支援十億級向量；2023 年，Milvus 以一致的穩定性擴充至百億級向量，為超過 300 家主要企業的大型應用程式提供支援，包括 Salesforce、PayPal、Shopee、Airbnb、eBay、NVIDIA、IBM、AT&amp;T、LINE、ROBLOX、Inflection 等。</p>
<p>Milvus 的雲原生與高度解耦的系統架構，可確保系統能隨著資料成長而持續擴充：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/highly-decoupled-architecture.png" alt="Highly decoupled system architecture of Milvus" class="doc-image" id="highly-decoupled-system-architecture-of-milvus" />
   </span> <span class="img-wrapper"> <span>Milvus 高度解耦的系統架構</span> </span></p>
<p>Milvus 本身是完全無狀態的，因此可借助 Kubernetes 或公有雲輕鬆擴展。此外，Milvus 各個元件都有很好的解耦功能，其中最重要的三項任務 - 搜尋、資料插入和索引/壓縮 - 都被設計成容易並行化的流程，並將複雜的邏輯分離出來。這可確保相對應的查詢節點、資料節點和索引節點都能獨立擴充，以最佳化效能和成本效益。</p>
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
    </button></h2><p>Milvus 支援多種類型的搜尋功能，以滿足不同用例的需求：</p>
<ul>
<li><a href="/docs/zh-hant/single-vector-search.md#Basic-search">ANN 搜尋</a>：找出最接近您查詢向量的前 K 個向量。</li>
<li><a href="/docs/zh-hant/single-vector-search.md#Filtered-search">過濾搜尋</a>：在指定過濾條件下執行 ANN 搜尋。</li>
<li><a href="/docs/zh-hant/single-vector-search.md#Range-search">範圍搜尋</a>：尋找距離您的查詢向量指定半徑範圍內的向量。</li>
<li><a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a>：根據多向量領域進行 ANN 搜尋。</li>
<li><a href="/docs/zh-hant/full-text-search.md">全文搜尋</a>：根據 BM25 進行全文搜尋。</li>
<li><a href="/docs/zh-hant/weighted-ranker.md">重新排序</a>：根據附加條件或輔助演算法調整搜尋結果的順序，精煉最初的 ANN 搜尋結果。</li>
<li><a href="/docs/zh-hant/get-and-scalar-query.md#Get-Entities-by-ID">擷取</a>：依據主鍵擷取資料。</li>
<li><a href="/docs/zh-hant/get-and-scalar-query.md#Use-Basic-Operators">查詢</a>：使用特定的表達方式擷取資料。</li>
</ul>
<h2 id="Comprehensive-Feature-Set" class="common-anchor-header">全面的功能集<button data-href="#Comprehensive-Feature-Set" class="anchor-icon" translate="no">
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
    </button></h2><p>除了上述的關鍵搜尋功能外，Milvus 還提供了一系列圍繞 ANN 搜尋實施的功能，以便您能充分利用其功能。</p>
<h3 id="API-and-SDK" class="common-anchor-header">API 與 SDK</h3><ul>
<li><a href="https://milvus.io/api-reference/restful/v2.4.x/About.md">RESTful API</a>(官方)</li>
<li><a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">PyMilvus</a>(Python SDK) (官方)</li>
<li><a href="https://milvus.io/api-reference/go/v2.4.x/About.md">Go SDK</a>(官方)</li>
<li><a href="https://milvus.io/api-reference/java/v2.4.x/About.md">Java SDK</a>(官方)</li>
<li><a href="https://milvus.io/api-reference/node/v2.4.x/About.md">Node.js</a>(JavaScript) SDK (官方)</li>
<li><a href="https://milvus.io/api-reference/csharp/v2.2.x/About.md">C#</a>(微軟提供)</li>
</ul>
<h3 id="Advanced-Data-Types" class="common-anchor-header">進階資料類型</h3><p>除了原始資料類型外，Milvus 還支援各種進階資料類型及其各自適用的距離度量。</p>
<ul>
<li><a href="/docs/zh-hant/sparse_vector.md">稀疏向量</a></li>
<li><a href="/docs/zh-hant/index-vector-fields.md">二進位向量</a></li>
<li><a href="/docs/zh-hant/use-json-fields.md">JSON 支援</a></li>
<li><a href="/docs/zh-hant/array_data_type.md">陣列支援</a></li>
<li><a href="/docs/zh-hant/metric.md">距離指標</a></li>
</ul>
<h3 id="Acceleration" class="common-anchor-header">加速</h3><ul>
<li><p>搜尋演算法 Milvus 支援一組可調整的索引和搜尋演算法。如需詳細資訊，請參閱「<a href="/docs/zh-hant/index.md">記憶體內索引</a>」、<a href="/docs/zh-hant/disk_index.md">「磁碟上索引</a>」和「<a href="/docs/zh-hant/gpu_index.md">GPU 索引</a>」。</p></li>
<li><p>分區和分區鍵值 分區是 Milvus 資料集中的子分區。您可以選擇標量欄位作為分割鍵，以獲得更好的搜尋效能。如需詳細資訊，請參閱<a href="/docs/zh-hant/manage-partitions.md">管理分割區和</a> <a href="/docs/zh-hant/use-partition-key.md">使用分割區金鑰</a>。</p></li>
<li><p>可調整的一致性模型 一致性可確保每個 Milvus 節點或副本在特定時間寫入或讀取資料時，擁有相同的資料視圖。在 Milvus 中執行 ANN 搜尋時，您可以輕鬆調整一致性層級。如需詳細資訊，請參閱<a href="/docs/zh-hant/consistency.md">一致性</a>。</p></li>
<li><p>高通量資料匯入 要匯入大量資料到 Milvus，而不是一個接一個地插入，請考慮使用我們的高通量資料匯入工具。詳情請參閱<a href="/docs/zh-hant/prepare-source-data.md">準備來源資料</a>和<a href="/docs/zh-hant/import-data.md">匯入資料</a>。</p></li>
<li><p>多租用支援 Milvus 實現了許多面向多租用場景的功能，包括分區鑰匙、集群鑰匙等。詳情請參閱<a href="/docs/zh-hant/multi_tenancy.md">多租戶策略</a>。</p></li>
</ul>
<h3 id="Security-and-Authorization" class="common-anchor-header">安全性與授權</h3><ul>
<li><p>可調整的一致性模型 一致性確保每個 Milvus 節點或副本在特定時間寫入或讀取資料時，擁有相同的資料視圖。在 Milvus 中執行 ANN 搜尋時，您可以輕鬆調整一致性層級。如需詳細資訊，請參閱<a href="/docs/zh-hant/consistency.md">一致性</a>。</p></li>
<li><p>資料隔離及資源控制 對於多租戶情境，資料隔離是基本的安全需求。Milvus 實現了多種功能來解決您的安全問題。如需詳細資訊，請參閱<a href="/docs/zh-hant/resource_group.md">管理資源</a> <a href="/docs/zh-hant/clustering-compaction.md">群組</a>與<a href="/docs/zh-hant/clustering-compaction.md">群集壓縮</a>。</p></li>
</ul>
<h3 id="AI-Integrations" class="common-anchor-header">AI 整合</h3><ul>
<li><p>嵌入式模型整合 嵌入式模型將非結構化資料轉換成高維資料空間中的數值表示，以便您可以將它們儲存在 Milvus 中。目前 Python SDK PyMilvus 整合了多種嵌入模型，讓您可以快速將資料準備成向量嵌入。如需詳細資訊，請參閱<a href="/docs/zh-hant/embeddings.md">嵌入概述</a>。</p></li>
<li><p>重排模型 (Reranking Model Integrations) 在資訊檢索與生成式人工智慧領域中，重排器 (reranker) 是優化初始搜尋結果順序的重要工具。PyMilvus 也整合了幾個 reranking 模型來優化從初始搜尋返回結果的順序。詳情請參閱<a href="/docs/zh-hant/rerankers-overview.md">Rerankers 總覽</a>。</p></li>
<li><p>LangChain 與其他 AI 工具整合 在 GenAI 時代，LangChain 等工具獲得許多應用程式開發人員的關注。作為核心元件，Milvus 通常在這些工具中扮演向量儲存的角色。要了解如何將 Milvus 整合到您最喜愛的 AI 工具中，請參考我們的<a href="/docs/zh-hant/integrate_with_openai.md">整合</a>與<a href="/docs/zh-hant/build-rag-with-milvus.md">教學</a>。</p></li>
</ul>
<h3 id="Tools-and-Ecosystem" class="common-anchor-header">工具與生態系統</h3><ul>
<li><p>Attu Attu 是一個多合一的直覺式圖形使用者介面，可協助您管理 Milvus 及其儲存的資料。如需詳細資訊，請參閱<a href="https://github.com/zilliztech/attu">Attu</a>資源庫。</p></li>
<li><p>Birdwatcher Birdwatcher 是 Milvus 的調試工具。使用它連線到 etcd，您可以檢查 Milvus 系統的狀態或即時設定。如需詳細資訊，請參閱<a href="/docs/zh-hant/birdwatcher_overview.md">BirdWatcher</a>。</p></li>
<li><p>Promethus &amp; Grafana 整合 Prometheus 是 Kubernetes 的開放原始碼系統監控與警示工具套件。Grafana 是可與所有資料來源連接的開放原始碼視覺化堆疊。您可以使用 Promethus &amp; Grafana 作為監控服務提供者，以視覺化方式監控 Milvus 分散式的效能。詳情請參閱<a href="/docs/zh-hant/monitor.md">部署監控服務</a>。</p></li>
<li><p>Milvus 備份 Milvus 備份是一個允許使用者備份和還原 Milvus 資料的工具。它同時提供 CLI 和 API，以適合不同的應用情境。詳情請參閱<a href="/docs/zh-hant/milvus_backup_overview.md">Milvus 備份</a>。</p></li>
<li><p>Milvus Capture Data Change (CDC) Milvus-CDC 可以捕捉和同步 Milvus 實例中的增量數據，並通過源實例和目標實例之間的無縫傳輸來確保業務數據的可靠性，從而實現簡便的增量備份和災難恢復。詳情請參閱<a href="/docs/zh-hant/milvus-cdc-overview.md">Milvus CDC</a>。</p></li>
<li><p>Milvus Connectors Milvus 已經規劃了一套連接器，讓您可以無縫整合 Milvus 與第三方工具，例如 Apache Spark。目前，您可以使用我們的 Spark Connector 將 Milvus 資料饋送至 Apache Spark 進行機器學習處理。如需詳細資訊，請參閱<a href="/docs/zh-hant/integrate_with_spark.md">Spark-Milvus Connector</a>。</p></li>
<li><p>Vector Transmission Services (VTS) Milvus 提供了一套工具，讓您可以在 Milvus 實例和一堆資料來源之間傳輸資料，包括 Zilliz 集群、Elasticsearch、Postgres (PgVector) 和另一個 Milvus 實例。如需詳細資訊，請參閱<a href="https://github.com/zilliztech/vts">VTS</a>。</p></li>
</ul>
