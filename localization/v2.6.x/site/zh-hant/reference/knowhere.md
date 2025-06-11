---
id: knowhere.md
summary: 在 Milvus 瞭解 Knowhere。
title: Knowhere
---
<h1 id="Knowhere" class="common-anchor-header">Knowhere<button data-href="#Knowhere" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題介紹 Milvus 的核心向量執行引擎 Knowhere。</p>
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
    </button></h2><p>Knowhere 是 Milvus 的核心向量執行引擎，它整合了多個向量相似性搜尋程式庫，包括<a href="https://github.com/facebookresearch/faiss">Faiss</a>、<a href="https://github.com/nmslib/hnswlib">Hnswlib</a>和<a href="https://github.com/spotify/annoy">Annoy</a>。Knowhere 的設計也支援異質運算。它可以控制在何種硬體（CPU 或 GPU）上執行索引建立和搜尋請求。這就是 Knowhere 名字的由來 - 知道在哪裡執行作業。未來的版本將支援更多的硬體類型，包括 DPU 和 TPU。</p>
<h2 id="Knowhere-in-the-Milvus-architecture" class="common-anchor-header">Knowhere 在 Milvus 架構中的位置<button data-href="#Knowhere-in-the-Milvus-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>下圖說明了 Knowhere 在 Milvus 架構中的位置。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/knowhere_architecture.png" alt="Knowhere" class="doc-image" id="knowhere" />
   </span> <span class="img-wrapper"> <span>Knowhere</span> </span></p>
<p>最底層是系統硬體。上面是第三方索引庫。在最上層，Knowhere 透過 CGO 與索引節點和查詢節點互動，CGO 允許 Go 套件呼叫 C 程式碼。</p>
<h2 id="Knowhere-advantages" class="common-anchor-header">Knowhere 的優勢<button data-href="#Knowhere-advantages" class="anchor-icon" translate="no">
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
    </button></h2><p>以下是 Knowhere 相對於 Faiss 的優勢。</p>
<h4 id="Support-for-BitsetView" class="common-anchor-header">支援 BitsetView</h4><p>Milvus 引入了一個 bitset 機制來實現 「軟刪除」。軟刪除的向量仍然存在於資料庫中，但不會在向量相似性搜索或查詢中被計算出來。</p>
<p>位元集中的每個位元對應一個索引向量。如果一個向量在 bitset 中被標記為 "1"，就表示這個向量是軟刪除的，在向量搜尋時不會涉及。bitset 參數應用於 Knowhere 中所有外露的 Faiss 索引查詢 API，包括 CPU 和 GPU 索引。</p>
<p>關於 bitset 機制的更多資訊，請參閱<a href="/docs/zh-hant/bitset.md">bitset</a>。</p>
<h4 id="Support-for-multiple-similarity-metrics-for-indexing-binary-vectors" class="common-anchor-header">索引二進位向量時支援多種相似度指標</h4><p>Knowhere 支援<a href="/docs/zh-hant/metric.md#Hamming-distance">Hamming</a>、<a href="/docs/zh-hant/metric.md#Jaccard-distance">Jaccard</a>、<a href="/docs/zh-hant/metric.md#Tanimoto-distance">Tanimoto</a>、<a href="/docs/zh-hant/metric.md#Superstructure">Superstructure</a> 和<a href="/docs/zh-hant/metric.md#Substructure">Substructure</a>。Jaccard 和 Tanimoto 可用於測量兩個樣本集之間的相似性，而 Superstructure 和 Substructure 則可用於測量化學結構的相似性。</p>
<h4 id="Support-for-AVX512-instruction-set" class="common-anchor-header">支援 AVX512 指令集</h4><p>除了 Faiss 已經支援的<a href="https://en.wikipedia.org/wiki/AArch64">AArch64</a>、<a href="https://en.wikipedia.org/wiki/SSE4#SSE4.2">SSE4.2</a>和<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions">AVX2</a> 指令集之外，Knowhere 也支援<a href="https://en.wikipedia.org/wiki/AVX-512">AVX512</a> 指令集，相較於 AVX2 指令集，<a href="https://en.wikipedia.org/wiki/AVX-512">AVX512</a> 指令集可以<a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">提高索引建立和查詢的效能 20% 到 30%</a>。</p>
<h4 id="Automatic-SIMD-instruction-selection" class="common-anchor-header">自動選擇SIMD指令</h4><p>Knowhere 支援在任何 CPU 處理器上 (包括內部平台與雲端平台) 自動調用適合的 SIMD 指令 (例如 SIMD SSE、AVX、AVX2 與 AVX512)，因此使用者不需要在編譯時手動指定 SIMD 標誌 (例如 "-msse4")。</p>
<p>Knowhere 是透過重構 Faiss 的程式碼來建立的。依賴 SIMD 加速的常見函數 (例如相似性運算) 會被分解出來。然後，每個函式都會有四個版本 (即 SSE、AVX、AVX2、AVX512) 來實作，並各自放入獨立的原始碼檔案。然後，這些原始碼檔案再以相對應的 SIMD 標誌單獨編譯。因此，在運行時，Knowhere 可以根據當前的 CPU 標誌自動選擇最適合的 SIMD 指令，然後使用掛鉤（hooking）連結正確的函式指針。</p>
<h4 id="Other-performance-optimization" class="common-anchor-header">其他效能優化</h4><p>閱讀<a href="https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf">Milvus: A Purpose-Built Vector Data Management System</a>了解更多關於 Knowhere 性能優化的資訊。</p>
<h2 id="Knowhere-code-structure" class="common-anchor-header">Knowhere 代碼結構<button data-href="#Knowhere-code-structure" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus中的計算主要涉及向量和標量操作。Knowhere 只處理向量索引的操作。</p>
<p>索引是獨立於原始向量資料的資料結構。一般而言，建立索引需要四個步驟：建立索引、訓練資料、插入資料和建立索引。在某些人工智能應用中，資料集訓練與向量搜尋是分開的。資料集的資料會先經過訓練，然後插進像 Milvus 之類的向量資料庫中進行相似性搜尋。例如，開放資料集 sift1M 和 sift1B 區分了用於訓練的資料和用於測試的資料。</p>
<p>然而，在 Knowhere 中，用於訓練的資料和用於搜尋的資料是相同的。Knowhere 訓練一個<a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Segments">區段</a>中的所有資料，然後將所有訓練過的資料插入，並為它們建立索引。</p>
<h4 id="DataObj-base-class" class="common-anchor-header"><code translate="no">DataObj</code>：基類</h4><p><code translate="no">DataObj</code> 是 Knowhere 中所有數據結構的基類。 是 中唯一的虛方法。Index 類繼承自 ，並有一個欄位名為 "size_"。Index 類也有兩個虛擬方法 - 和 。從 派生的 類是所有向量索引的虛基類。 提供的方法包括 , , , 和 。<code translate="no">Size()</code> <code translate="no">DataObj</code> <code translate="no">DataObj</code> <code translate="no">Serialize()</code> <code translate="no">Load()</code> <code translate="no">Index</code> <code translate="no">VecIndex</code> <code translate="no">VecIndex</code> <code translate="no">Train()</code> <code translate="no">Query()</code> <code translate="no">GetStatistics()</code> <code translate="no">ClearStatistics()</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/Knowhere_base_classes.png" alt="base class" class="doc-image" id="base-class" />
   </span> <span class="img-wrapper"> <span>基類</span> </span></p>
<p>上圖右側列出了一些其他的索引類型。</p>
<ul>
<li><p>Faiss 索引有兩個基類：<code translate="no">FaissBaseIndex</code> 適用於所有浮點向量上的索引，而<code translate="no">FaissBaseBinaryIndex</code> 適用於所有二進位向量上的索引。</p></li>
<li><p><code translate="no">GPUIndex</code> 是所有 Faiss GPU 索引的基類。</p></li>
<li><p><code translate="no">OffsetBaseIndex</code> 是所有自行開發索引的基類。由於只有向量 ID 會儲存在索引檔案中，因此 128 維向量的檔案大小可以減少 2 個數量級。</p></li>
</ul>
<h4 id="IDMAP-brute-force-search" class="common-anchor-header"><code translate="no">IDMAP</code>：暴力搜尋</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/IDMAP.png" alt="IDMAP" class="doc-image" id="idmap" />
   </span> <span class="img-wrapper"> <span>IDMAP</span> </span></p>
<p>嚴格來說，<code translate="no">IDMAP</code> 並非索引，而是用於強制搜尋。當向量插入資料庫時，既不需要資料訓練，也不需要建立索引。搜尋將直接在插入的向量資料上進行。</p>
<p>不過，為了保持程式碼的一致性，<code translate="no">IDMAP</code> 也繼承自<code translate="no">VecIndex</code> 類的所有虛擬介面。<code translate="no">IDMAP</code> 的用法與其他索引相同。</p>
<h4 id="IVF-indices" class="common-anchor-header">IVF 索引</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/IVF.png" alt="IVF" class="doc-image" id="ivf" />
   </span> <span class="img-wrapper"> <span>IVF</span> </span></p>
<p>IVF (倒置檔案) 索引是最常使用的。<code translate="no">IVF</code> 類派生出<code translate="no">VecIndex</code> 和<code translate="no">FaissBaseIndex</code> ，並進一步延伸至<code translate="no">IVFSQ</code> 和<code translate="no">IVFPQ</code> 。<code translate="no">GPUIVF</code> 派生出<code translate="no">GPUIndex</code> 和<code translate="no">IVF</code> 。然後<code translate="no">GPUIVF</code> 進一步延伸至<code translate="no">GPUIVFSQ</code> 和<code translate="no">GPUIVFPQ</code> 。</p>
<p><code translate="no">IVFSQHybrid</code> 是一種自行開發的混合索引。粗量化器在 GPU 上執行，而桶中的搜尋則在 CPU 上執行。 的召回率與 相同，但性能更佳。<code translate="no">IVFSQHybrid</code> <code translate="no">GPUIVFSQ</code> </p>
<p>二元索引的基類結構相對較簡單。<code translate="no">BinaryIDMAP</code> 和<code translate="no">BinaryIVF</code> 是從<code translate="no">FaissBaseBinaryIndex</code> 和<code translate="no">VecIndex</code> 衍生出來的。</p>
<h4 id="Third-party-indices" class="common-anchor-header">第三方索引</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/third_party_index.png" alt="third-party indices" class="doc-image" id="third-party-indices" />
   </span> <span class="img-wrapper"> <span>第三方指數</span> </span></p>
<p>目前，除了 Faiss 之外，只支援兩種第三方索引：樹狀索引<code translate="no">Annoy</code> ，以及圖狀索引<code translate="no">HNSW</code> 。這兩種常用的第三方指數都來自<code translate="no">VecIndex</code> 。</p>
<h2 id="Adding-indices-to-Knowhere" class="common-anchor-header">向Knowhere添加索引<button data-href="#Adding-indices-to-Knowhere" class="anchor-icon" translate="no">
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
    </button></h2><p>如果你想添加新的索引到Knowhere，首先你可以參考現有的索引：</p>
<ul>
<li><p>要添加基於量化的指數，請參考<code translate="no">IVF_FLAT</code> 。</p></li>
<li><p>要添加基於圖表的索引，請參考<code translate="no">HNSW</code> 。</p></li>
<li><p>要添加基於樹的索引，請參考<code translate="no">Annoy</code> 。</p></li>
</ul>
<p>參考現有索引後，您可以按照以下步驟在Knowhere中添加新索引。</p>
<ol>
<li><p>在<code translate="no">IndexEnum</code> 中添加新索引的名稱。資料類型為字串。</p></li>
<li><p>在文件<code translate="no">ConfAdapter.cpp</code> 中為新索引添加數據驗證檢查。驗證檢查主要是驗證數據訓練和查詢的參數。</p></li>
<li><p>為新索引建立新檔案。新索引的基類應包括<code translate="no">VecIndex</code> ，以及<code translate="no">VecIndex</code> 的必要虛擬介面。</p></li>
<li><p>在<code translate="no">VecIndexFactory::CreateVecIndex()</code> 中加入新索引的索引建立邏輯。</p></li>
<li><p>在<code translate="no">unittest</code> 目錄下加入單元測試。</p></li>
</ol>
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
    </button></h2><p>在學習了 Knowhere 如何在 Milvus 中運作之後，你可能還想</p>
<ul>
<li><p>了解<a href="/docs/zh-hant/index.md">Milvus 支援的各種索引類型</a>。</p></li>
<li><p>了解<a href="/docs/zh-hant/bitset.md">bitset 機制</a>。</p></li>
<li><p>瞭解 Milvus<a href="/docs/zh-hant/data_processing.md">如何處理資料</a>。</p></li>
</ul>
