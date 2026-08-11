---
id: index-explained.md
title: 索引說明
summary: >-
  索引是一種建構在資料之上的附加結構。其內部結構取決於所使用的近似最近鄰搜尋演算法。索引能加快搜尋速度，但在搜尋過程中會消耗額外的預處理時間、空間及記憶體。此外，使用索引通常會降低召回率（儘管影響微乎其微，但仍值得關注）。
  因此，本文將說明如何在使用索引時，將成本降至最低，同時將效益最大化。
---
<h1 id="Index-Explained" class="common-anchor-header">索引說明<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>索引是一種建構於資料之上的附加結構。其內部結構取決於所使用的近似最近鄰搜尋演算法。索引能加快搜尋速度，但在搜尋過程中會產生額外的預處理時間、空間及記憶體消耗。此外，使用索引通常會降低召回率（儘管影響微乎其微，但仍值得關注）。 因此，本文將說明如何在使用索引時，將成本降至最低，同時將效益最大化。</p>
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
    </button></h2><p>在 Milvus 中，索引是針對特定欄位建立的，且可適用的索引類型會根據目標欄位的資料類型而有所不同。作為專業的向量資料庫，Milvus 致力於同時提升向量搜尋與標量篩選的效能，因此提供了多種索引類型。</p>
<p>下表列出了欄位資料類型與適用索引類型之間的對應關係。</p>
<table>
   <tr>
     <th><p>欄位資料類型</p></th>
     <th><p>適用索引類型</p></th>
   </tr>
   <tr>
     <td><p>FLOAT_VECTOR</p></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>FAISS</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VECTOR</p></li><li><p>INT8_VECTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><p>二進位向量</p></td>
     <td><ul><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>MINHASH_LSH</p></li><li><p>FAISS</p></li></ul></td>
   </tr>
   <tr>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
     <td><p>SPARSE_INVERTED_INDEX</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>倒排索引 (建議)</p></li><li><p>位圖</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li><p>位圖 (建議)</p></li><li><p>反轉</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li><p>反轉</p></li><li><p>STL_SORT</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>浮點數</p></li><li><p>DOUBLE</p></li></ul></td>
     <td><p>反轉</p></td>
   </tr>
   <tr>
     <td><p>陣列<sup>（包含 BOOL、INT8/16/32/64 及 VARCHAR 類型的元素）</sup></p></td>
     <td><p>位圖 (建議)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY<sup>（元素類型為 BOOL、INT8/16/32/64、FLOAT、DOUBLE 及 VARCHAR）</sup></p></td>
     <td><p>反向</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>反轉索引</p></td>
   </tr>
</table>
<p>本文著重於如何選擇合適的向量索引。對於標量欄位，您始終可以使用推薦的索引類型。</p>
<p>為向量搜尋選擇合適的索引類型，將對效能與資源使用量產生顯著影響。在為向量欄位選擇索引類型時，必須綜合考量多項因素，包括底層資料結構、記憶體使用量以及效能需求。</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">向量索引的結構<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>如下圖所示，Milvus 中的索引類型由三個核心組件構成，分別是<strong>資料結構</strong>、<strong>量化與精細化器</strong>。量化和精細化器雖屬可選，但因其能實現「效益大於成本」的顯著平衡，故被廣泛採用。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" /> 
   <span>向量索引的結構</span>
  
 </span></p>
<p>在建立索引時，Milvus 會結合所選的資料結構與量化方法，以確定最佳的<strong>擴展率</strong>。在查詢時，系統會檢索<code translate="no">topK × expansion rate</code> 候選向量，應用精細化器以更高精度重新計算距離，並最終返回最精確的<code translate="no">topK</code> 結果。這種混合方法透過將資源密集型的精細化處理限制在經過篩選的候選子集上，從而平衡了速度與精確度。</p>
<h3 id="Data-structure" class="common-anchor-header">資料結構<button data-href="#Data-structure" class="anchor-icon" translate="no">
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
    </button></h3><p>資料結構構成索引的基礎層。常見類型包括：</p>
<ul>
<li><p><strong>反向檔案 (IVF)</strong></p>
<p>IVF 系列索引類型允許 Milvus 透過基於聚類中心的區分，將向量叢集至各個桶中。一般而言，若某個桶的聚類中心接近查詢向量，則可合理假設該桶中的所有向量皆可能接近查詢向量。 基於此前提，Milvus 僅掃描那些中心點靠近查詢向量的桶中的向量嵌入，而非檢查整個資料集。此策略在維持可接受精確度的同時，降低了運算成本。</p>
<p>此類索引資料結構非常適合需要快速吞吐量的大規模資料集。</p></li>
<li><p><strong>基於圖的結構</strong></p>
<p>用於向量搜尋的圖式資料結構（例如階層式可導航小世界模型<a href="https://arxiv.org/abs/1603.09320">，HNSW</a>）會建構一個分層圖，其中每個向量皆與其最近鄰相連。查詢會沿著此階層結構進行導航，從較粗糙的上層開始，並逐步切換至較低層，從而實現高效的對數時間搜尋複雜度。</p>
<p>此類索引資料結構在高維度空間及需要低延遲查詢的場景中表現尤為出色。</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">量化<button data-href="#Quantization" class="anchor-icon" translate="no">
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
    </button></h3><p>量化技術透過較粗略的表示方式，可降低記憶體佔用量與運算成本：</p>
<ul>
<li><p><strong>標量量化</strong>（例如<strong>SQ8</strong>）使 Milvus 能將每個向量維度壓縮為單一位元組（8 位元），與 32 位元浮點數相比，在維持合理精確度的同時，將記憶體使用量減少 75%。</p></li>
<li><p><strong>產品量化</strong>（<strong>PQ</strong>）使 Milvus 能將向量拆分為子向量，並透過基於編碼本的聚類進行編碼。此方法可實現更高的壓縮比（例如 4 至 32 倍），代價是召回率略微降低，因此適用於記憶體受限的環境。</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">精選器<button data-href="#Refiner" class="anchor-icon" translate="no">
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
    </button></h3><p>量化本質上具有損耗。為了維持召回率，量化過程會持續產生比實際所需更多的前 K 名候選結果，讓精細化器能利用更高精度從這些候選結果中進一步篩選前 K 名結果，從而提升召回率。</p>
<p>舉例來說，FP32 精細化器會針對量化過程所返回的搜尋結果候選項進行處理，透過使用 FP32 精度重新計算距離，而非直接採用量化後的數值。</p>
<p>這對於需要在搜尋效率與精度之間取得平衡的應用至關重要，例如語義搜尋或推薦系統，在這些系統中，微小的距離變化會顯著影響結果品質。</p>
<h3 id="Summary" class="common-anchor-header">總結<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h3><p>這種分層架構——透過資料結構進行粗略過濾、透過量化實現高效運算，以及透過精細化調整精確度——使 Milvus 能夠自適應地優化準確度與效能之間的權衡。</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">效能權衡<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>在評估效能時，必須平衡<strong>建置時間</strong>、<strong>每秒查詢次數 (QPS)</strong> 以及<strong>召回率</strong>。一般規則如下：</p>
<ul>
<li><p><strong>基於圖的索引類型</strong>在<strong>QPS</strong> 方面通常優於<strong>IVF 變體</strong>。</p></li>
<li><p><strong>IVF 變體</strong>特別適用於<strong>topK 數值較大的</strong>情境<strong>（例如超過 2,000）</strong>。</p></li>
<li><p>相較於<strong>SQ，PQ</strong> 在相似的壓縮率下通常能提供更高的召回率，儘管後者的執行效能較快。</p></li>
<li><p>將索引的一部分儲存於硬碟（如<strong>DiskANN</strong> 所示）有助於管理大型資料集，但同時也會引入潛在的 IOPS 瓶頸。</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">容量<button data-href="#Capacity" class="anchor-icon" translate="no">
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
    </button></h3><p>容量通常涉及資料大小與可用 RAM 之間的關係。在處理容量時，請考慮以下事項：</p>
<ul>
<li><p>若原始資料的四分之一能容納於記憶體中，建議採用 DiskANN 以確保延遲穩定。</p></li>
<li><p>若所有原始資料皆可容納於記憶體中，請考慮基於記憶體的索引類型及 mmap。</p></li>
<li><p>您可以使用已套用量化處理的索引類型和 mmap，以犧牲部分精確度來換取最大容量。</p></li>
</ul>
<div class="alert note">
<p>mmap 並非總是最佳解決方案。當大部分資料位於磁碟上時，DiskANN 能提供更佳的延遲表現。</p>
</div>
<h3 id="Recall" class="common-anchor-header">召回率<button data-href="#Recall" class="anchor-icon" translate="no">
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
    </button></h3><p>召回率通常涉及過濾比，即在搜尋前被過濾掉的資料比例。在處理召回率時，請考慮以下事項：</p>
<ul>
<li><p>若過濾比率低於 85%，基於圖的索引類型表現優於 IVF 變體。</p></li>
<li><p>若過濾比率介於 85% 至 95% 之間，請使用 IVF 變體。</p></li>
<li><p>若過濾率超過 98%，請使用 Brute-Force (FLAT) 以獲得最精確的搜尋結果。</p></li>
</ul>
<div class="alert note">
<p>上述準則未必總是正確。建議您透過不同索引類型來調整召回率，以確定哪種索引類型最為有效。</p>
</div>
<h3 id="Performance" class="common-anchor-header">效能<button data-href="#Performance" class="anchor-icon" translate="no">
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
    </button></h3><p>搜尋的效能通常涉及「前 K 項」（top-K），即搜尋所返回的記錄數量。在考量效能時，請注意以下事項：</p>
<ul>
<li><p>對於需要高召回率且 top-K 較小（例如 2,000）的搜尋，基於圖的索引類型表現優於 IVF 變體。</p></li>
<li><p>對於 top-K 數值較大（相較於向量嵌入的總數）的搜尋，IVF 變體比基於圖的索引類型更為合適。</p></li>
<li><p>對於 top-K 數值中等且篩選比率較高的搜尋，IVF 變體是較佳的選擇。</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">決策矩陣：選擇最合適的索引類型<button data-href="#Decision-Matrix-Choosing-the-most-appropriate-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>下表為決策矩陣，供您在選擇合適索引類型時參考。</p>
<table>
   <tr>
     <th><p>情境</p></th>
     <th><p>建議的索引類型</p></th>
     <th><p>備註</p></th>
   </tr>
   <tr>
     <td><p>原始資料可容納於記憶體中</p></td>
     <td><p>HNSW、IVF + 精細化</p></td>
     <td><p>若需低<code translate="no">k</code> ／高召回率，請使用 HNSW。</p></td>
   </tr>
   <tr>
     <td><p>原始資料儲存於磁碟（SSD）</p></td>
     <td><p>DiskANN</p></td>
     <td><p>最適合對延遲敏感的查詢。</p></td>
   </tr>
   <tr>
     <td><p>原始資料儲存於磁碟，RAM 容量有限</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>平衡記憶體與磁碟存取。</p></td>
   </tr>
   <tr>
     <td><p>高過濾率（&gt;95%）</p></td>
     <td><p>暴力搜尋 (FLAT)</p></td>
     <td><p>可避免在候選集極小的情況下產生索引開銷。</p></td>
   </tr>
   <tr>
     <td><p>大型<code translate="no">k</code> （佔資料集的≥1%）</p></td>
     <td><p>IVF</p></td>
     <td><p>叢集修剪可減少運算量。</p></td>
   </tr>
   <tr>
     <td><p>極高的召回率（&gt;99%）</p></td>
     <td><p>暴力搜尋 (FLAT) + GPU</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">記憶體使用量估算<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>本節重點探討特定索引類型的記憶體消耗計算，並包含許多技術細節。若此內容不符合您的興趣，可放心跳過本節。</p>
</div>
<p>索引的記憶體消耗取決於其資料結構、透過量化所達成的壓縮率，以及所使用的精細化器。一般而言，基於圖的索引（例如<strong>HNSW</strong>）通常會因圖的結構而佔用較多的記憶體，這通常意味著每向量空間會產生顯著的開銷。 相較之下，IVF 及其變體因每向量空間的開銷較少，因此在記憶體效率上更為優異。然而，像<strong>DiskANN</strong>這樣的高階技術，可讓索引的部分元件（例如圖結構或精細化器）存放於磁碟上，在維持效能的同時降低記憶體負載。</p>
<p>具體而言，索引的記憶體使用量可按以下方式計算：</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">IVF 索引的記憶體使用量<button data-href="#IVF-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>IVF 索引透過將資料劃分為簇，在記憶體效率與搜尋效能之間取得平衡。以下是使用 IVF 變體建立索引的 100 萬個 128 維向量所佔用記憶體的明細。</p>
<ol>
<li><p><strong>計算聚類中心所佔用的記憶體。</strong></p>
<p>IVF 系列索引類型使 Milvus 能透過基於聚類中心的分區，將向量聚類至不同桶中。每個聚類中心均以原始向量嵌入形式包含在索引中。當您將向量劃分為 2,000 個聚類時，記憶體使用量可按以下方式計算：</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>計算叢集分配所佔用的記憶體。</strong></p>
<p>每個向量嵌入都會被指派至一個叢集，並以整數 ID 形式儲存。對於 2,000 個叢集，2 位元組的整數即已足夠。記憶體使用量可依下列方式計算：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>計算量化所造成的壓縮效果。</strong></p>
<p>IVF 變體通常使用 PQ 和 SQ8，其記憶體使用量可估算如下：</p>
<ul>
<li><p>使用 8 個子量化器的 PQ</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用 SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>下表列出不同配置下的預估記憶體使用量：</p>
<p><table>
<tr>
<th><p>配置</p></th>
<th><p>記憶體估算值</p></th>
<th><p>總記憶體</p></th>
</tr>
<tr>
<td><p>IVF-PQ（無細化）</p></td>
<td><p>1.0 MB + 2.0 MB + 8.0 MB</p></td>
<td><p>11.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ + 10% 原始細化</p></td>
<td><p>1.0 MB + 2.0 MB + 8.0 MB + 51.2 MB</p></td>
<td><p>62.2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8（未進行細化）</p></td>
<td><p>1.0 MB + 2.0 MB + 128 MB</p></td>
<td><p>131.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT（完整原始向量）</p></td>
<td><p>1.0 MB + 2.0 MB + 512 MB</p></td>
<td><p>515.0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>計算精細化開銷。</strong></p>
<p>IVF 變體通常會搭配精細化演算法來重新排序候選項。對於以擴展率 5 檢索前 10 項結果的搜尋，其精細化開銷可估算如下：</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">基於圖的索引記憶體使用量<button data-href="#Graph-based-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>類似 HNSW 的圖式索引類型需要大量記憶體來儲存圖結構與原始向量嵌入。以下是使用 HNSW 索引類型對 100 萬個 128 維向量進行索引時，所消耗記憶體的詳細明細。</p>
<ol>
<li><p><strong>計算圖結構所佔用的記憶體。</strong></p>
<p>HNSW 中的每個向量都會與其鄰居保持連結。若圖的度（每個節點的邊數）為 32，則所消耗的記憶體可按以下方式計算：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>計算原始向量嵌入所佔用的記憶體。</strong></p>
<p>儲存未壓縮的 FP32 向量所消耗的記憶體可按以下方式計算：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>當您使用 HNSW 為 100 萬個 128 維向量嵌入建立索引時，總記憶體使用量將為<strong>128 MB（圖）+ 512 MB（向量）= 640 MB</strong>。</p></li>
<li><p><strong>計算量化所造成的壓縮效果。</strong></p>
<p>量化可縮小向量大小。例如，使用 8 個子量化器（每個向量 8 位元組）的 PQ，可實現大幅壓縮。壓縮後向量嵌入所消耗的記憶體可按以下方式計算：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>相較於原始向量嵌入，此方法可實現 64 倍的壓縮率，而<strong>HNSWPQ</strong>索引類型所使用的總記憶體為<strong>128 MB（圖）＋ 8 MB（壓縮向量）＝ 136 MB</strong>。</p></li>
<li><p><strong>計算精細化開銷。</strong></p>
<p>精細化操作（例如使用原始向量進行重新排序）會將高精度資料暫時載入記憶體中。對於以擴展率 5 檢索前 10 項結果的搜尋，其精細化開銷可估算如下：</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">其他考量因素<button data-href="#Other-considerations" class="anchor-icon" translate="no">
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
    </button></h3><p>雖然 IVF 和基於圖的索引會透過量化來優化記憶體使用，但記憶體映射檔案 (mmap) 和 DiskANN 則針對資料集超過可用隨機存取記憶體 (RAM) 的情境提供解決方案。</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN 是一種基於 Vamana 圖的索引，它透過連接資料點以實現搜尋過程中的高效導航，同時應用 PQ 來縮小向量大小，並能快速計算向量之間的近似距離。</p>
<p>Vamana 圖儲存在磁碟上，這使得 DiskANN 能夠處理那些若非如此便過大而無法容納於記憶體中的龐大資料集。這對於擁有數十億個資料點的資料集特別有用。</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">記憶體映射檔案 (mmap)</h4><p>記憶體映射（Mmap）可直接存取磁碟上的大型檔案，讓 Milvus 能同時將索引與資料儲存於記憶體及硬碟中。此方法能根據存取頻率降低 I/O 呼叫的開銷，從而優化 I/O 操作，在不會顯著影響搜尋效能的前提下，擴展集合的儲存容量。</p>
<p>具體而言，您可以配置 Milvus 將特定欄位的原始資料進行記憶體映射，而非將其完全載入記憶體中。如此一來，您既能直接透過記憶體存取這些欄位，無需擔心記憶體問題，又能擴展集合的儲存容量。</p>
