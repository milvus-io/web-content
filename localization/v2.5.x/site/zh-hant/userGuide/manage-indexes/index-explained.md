---
id: index-explained.md
title: 索引說明
summary: >-
  索引是建立在資料之上的額外結構。其內部結構取決於所使用的近似近鄰搜尋演算法。索引可加快搜尋速度，但會在搜尋過程中產生額外的預處理時間、空間和
  RAM。此外，使用索引通常會降低召回率（雖然影響微乎其微，但仍很重要）。因此，本文將解釋如何將使用索引的成本最小化，同時將效益最大化。
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
    </button></h1><p>索引是建立在資料之上的額外結構。其內部結構取決於所使用的近似近鄰搜尋演算法。索引可加快搜尋速度，但會在搜尋過程中產生額外的預處理時間、空間和 RAM。此外，使用索引通常會降低召回率（雖然影響微乎其微，但仍然很重要）。因此，本文將解釋如何將使用索引的成本最小化，同時將效益最大化。</p>
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
    </button></h2><p>在 Milvus 中，索引是特定於欄位的，適用的索引類型根據目標欄位的資料類型而有所不同。作為一個專業的向量資料庫，Milvus 著重於提高向量搜索和標量篩選的性能，這也是它提供各種索引類型的原因。</p>
<p>下表列出欄位資料類型與適用索引類型之間的對應關係。</p>
<table>
   <tr>
     <th><p>欄位資料類型</p></th>
     <th><p>適用的索引類型</p></th>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT_VECTOR</p></li><li><p>FLOAT16_VECTOR</p></li><li><p>bfloat16_vector</p></li></ul></td>
     <td><ul><li><p>平面</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>HNSW</p></li><li><p>DISKANN</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BINARY_VECTOR</p></td>
     <td><ul><li>BIN_FLAT</li><li>BIN_IVF_FLAT</li></ul></td>
   </tr>
   <tr>
     <td><p>稀疏浮點向量</p></td>
     <td><p>稀疏倒數索引</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>INVERTED (建議使用)</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li>BITMAP (建議)</li><li>反轉</li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li>反轉</li><li>STL_SORT</li></ul></td>
   </tr>
   <tr>
     <td><ul><li>FLOAT</li><li>DOUBLE</li></ul></td>
     <td><p>反轉</p></td>
   </tr>
   <tr>
     <td><p>ARRAY<sup>(BOOL、INT8/16/32/64 及 VARCHAR 類型的元素)</sup></p></td>
     <td><p>BITMAP (建議使用)</p></td>
   </tr>
   <tr>
     <td><p>ARRAY<sup> （BOOL、INT8/16/32/64、FLOAT、DOUBLE 和 VARCHAR 類型的元素）</sup></p></td>
     <td><p>反轉</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>反轉</p></td>
   </tr>
</table>
<p>本文著重於如何選擇適當的向量索引。對於標量欄位，您總是可以使用建議的索引類型。</p>
<p>為向量搜尋選擇適當的索引類型，可以顯著影響效能和資源使用。為向量欄位選擇索引類型時，必須考慮各種因素，包括底層資料結構、記憶體使用量和效能需求。</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">向量索引解剖圖<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>如下圖所示，Milvus 的索引類型包含三個核心元件，<strong>即資料結構</strong>、<strong>量化</strong>和<strong>精煉器</strong>。量化和精煉器是可選的，但由於有顯著的收益-好於成本-平衡，因此被廣泛使用。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/vector-index-anatomy.png" alt="vector-index-anatomy" class="doc-image" id="vector-index-anatomy" />
   </span> <span class="img-wrapper"> <span>向量索引解剖</span> </span></p>
<p>在建立索引時，Milvus 會結合所選的資料結構和量化方法，以決定最佳的<strong>擴充率</strong>。在查詢時，系統會擷取<code translate="no">topK × expansion rate</code> 候選向量，應用精煉器以更高的精確度重新計算距離，最後再傳回最精確的<code translate="no">topK</code> 結果。這種混合方法將資源密集的精煉限制在經過篩選的候選向量子集中，從而在速度和精確度之間取得平衡。</p>
<h3 id="Data-structure" class="common-anchor-header">資料結構</h3><p>資料結構形成索引的基礎層。常見的類型包括</p>
<ul>
<li><p><strong>反向檔案 (IVF)</strong></p>
<p>IVF 系列索引類型允許 Milvus 透過以中心點為基礎的分割，將向量聚類為桶。通常可以安全地假設，如果桶的中心點接近查詢向量，則桶中的所有向量都可能接近查詢向量。基於這個前提，Milvus 只會掃描中心點接近查詢向量的資料桶中的向量內嵌，而不是檢查整個資料集。此策略可降低計算成本，同時維持可接受的精確度。</p>
<p>這種索引資料結構非常適合需要快速吞吐量的大型資料集。</p></li>
<li><p><strong>圖形結構</strong></p>
<p>向量搜尋的圖表式資料結構，例如 Hierarchical Navigable Small World<a href="https://arxiv.org/abs/1603.09320">(HNSW</a>)，會建構一個分層圖表，其中每個向量都會連接到其最近的鄰居。查詢會瀏覽這個階層結構，從粗略的上層開始，並透過下層切換，從而實現高效率的對數時間搜尋複雜性。</p>
<p>這種索引資料結構在高維空間和要求低延遲查詢的場合中表現優異。</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">量化</h3><p>量化可透過更粗略的表示方式，減少記憶體佔用量和計算成本：</p>
<ul>
<li><p><strong>Scalar Quantization</strong>(例如<strong>SQ8</strong>) 可讓 Milvus 將每個向量維度壓縮為單一位元組 (8-bit)，相較於 32 位元浮點運算可減少 75% 的記憶體使用量，同時保留合理的精確度。</p></li>
<li><p><strong>Product Quantization</strong><strong>(PQ</strong>) 可讓 Milvus 將向量分割成子向量，並使用基於編碼簿的聚類技術進行編碼。這可達到更高的壓縮率 (例如 4-32 倍)，但代價是記憶力略有降低，因此適用於記憶體有限的環境。</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">精煉</h3><p>量化本身就是有損失的。為了維持召回率，量化會持續產生比所需更多的 Top-K 候選結果，讓精煉器能使用更高的精確度，從這些候選結果中進一步選出 Top-K 結果，進而提升召回率。</p>
<p>例如，FP32 精煉器會使用 FP32 精度而非量化值來重新計算距離，從而對量化返回的候選搜尋結果進行操作。</p>
<p>這對於需要在搜尋效率和精確度之間取捨的應用程式來說非常重要，例如語意搜尋或推薦系統，在這些應用程式中，微小的距離差異會顯著影響結果品質。</p>
<h3 id="Summary" class="common-anchor-header">總結</h3><p>這種分層架構 - 透過資料結構進行粗略篩選、透過量化進行有效計算，以及透過精細化進行精確度調整 - 可讓 Milvus 自適應地最佳化精確度與效能之間的權衡。</p>
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
    </button></h2><p>評估效能時，平衡<strong>建立時間</strong>、<strong>每秒查詢</strong> <strong>率</strong> <strong>(QPS)</strong> 和<strong>召回率</strong>是非常重要的。一般規則如下：</p>
<ul>
<li><p>就<strong>QPS</strong> 而言，<strong>基於圖表的索引類型</strong>通常優於<strong>IVF 變體</strong>。</p></li>
<li><p><strong>IVF 變體</strong>尤其適用於<strong>topK 較大（例如超過 2,000 個）的</strong>情境。</p></li>
<li><p>與<strong>SQ</strong><strong>相比，PQ</strong>通常在相似的壓縮率下提供更好的召回率，雖然後者提供更快的效能。</p></li>
<li><p>將硬碟機用於部分索引 (如<strong>DiskANN</strong>)，有助於管理大型資料集，但也會引入潛在的 IOPS 瓶頸。</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">容量</h3><p>容量通常涉及資料大小與可用 RAM 之間的關係。在處理容量時，請考慮以下情況：</p>
<ul>
<li><p>如果您四分之一的原始資料適合放入記憶體，請考慮使用 DiskANN 以獲得穩定的延遲。</p></li>
<li><p>如果您所有的原始資料都適合放入記憶體，請考慮基於記憶體的索引類型和 mmap。</p></li>
<li><p>您可以使用量化應用的索引類型和 mmap，以精確度換取最大容量。</p></li>
</ul>
<div class="alert note">
<p>mmap 並不總是解決方案。當您的大部分資料都在磁碟上時，DiskANN 可以提供更好的延遲。</p>
</div>
<h3 id="Recall" class="common-anchor-header">召回率</h3><p>召回率通常涉及篩選比率，也就是在搜尋之前篩選出來的資料。在處理召回率時，請考慮以下幾點：</p>
<ul>
<li><p>如果篩選比率小於 85%，則基於圖表的索引類型會比 IVF 變體優勝。</p></li>
<li><p>如果篩選比率在 85% 到 95% 之間，則使用 IVF 變異類型。</p></li>
<li><p>如果篩選比率超過 98%，請使用 Brute-Force (FLAT)，以獲得最精確的搜尋結果。</p></li>
</ul>
<div class="alert note">
<p>上述項目不一定正確。建議您使用不同的索引類型調整召回，以確定哪一種索引類型有效。</p>
</div>
<h3 id="Performance" class="common-anchor-header">效能</h3><p>搜尋的效能通常涉及 top-K，它是指搜尋回傳的記錄數量。在處理效能時，請考慮以下幾點：</p>
<ul>
<li><p>對於 top-K 數量較小 (例如 2,000)、召回率要求較高的搜尋，以圖為基礎的索引類型會比 IVF 變異優勝。</p></li>
<li><p>對於 top-K 較大（與向量嵌入的總數相比）的搜尋，IVF 變體是比基於圖的索引類型更好的選擇。</p></li>
<li><p>對於具有中等大小 top-K 和高過濾率的搜尋，IVF 變異是更好的選擇。</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">決策矩陣：選擇最適當的索引類型</h3><p>下表為決策矩陣，供您在選擇適當索引類型時參考。</p>
<table>
   <tr>
     <th><p>場景</p></th>
     <th><p>推薦索引</p></th>
     <th><p>注意事項</p></th>
   </tr>
   <tr>
     <td><p>原始資料適合存放在記憶體中</p></td>
     <td><p>HNSW、IVF + 精煉</p></td>
     <td><p>使用 HNSW 進行低<code translate="no">k</code>/ 高回復。</p></td>
   </tr>
   <tr>
     <td><p>原始資料在磁碟、SSD 上</p></td>
     <td><p>DiskANN</p></td>
     <td><p>最適合對延遲敏感的查詢。</p></td>
   </tr>
   <tr>
     <td><p>原始資料在磁碟上，有限的 RAM</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>平衡記憶體與磁碟存取。</p></td>
   </tr>
   <tr>
     <td><p>高過濾率 (&gt;95%)</p></td>
     <td><p>強力 (FLAT)</p></td>
     <td><p>避免微小候選集的索引開銷。</p></td>
   </tr>
   <tr>
     <td><p>大型<code translate="no">k</code> (≥數據集的 1%)</p></td>
     <td><p>IVF</p></td>
     <td><p>叢集剪枝可減少計算。</p></td>
   </tr>
   <tr>
     <td><p>極高的召回率 (&gt;99%)</p></td>
     <td><p>蠻力 (FLAT) + GPU</p></td>
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
<p>本節重點在於計算特定索引類型的記憶體消耗，並包含許多技術細節。如果本節與您的興趣不符，您可以放心跳過。</p>
</div>
<p>索引的記憶體消耗量受其資料結構、透過量化的壓縮率，以及使用中的精煉器所影響。一般來說，基於圖表的索引通常會因為圖表結構（例如<strong>HNSW</strong>）而佔用較多記憶體，這通常意味著每個向量的空間開銷較大。相較之下，IVF 及其變體則更節省記憶體，因為適用的每向量空間開銷較少。然而，<strong>DiskANN</strong>等先進技術允許索引的一部分（例如圖形或精煉器）駐留在磁碟上，以減少記憶體負載，同時維持效能。</p>
<p>具體來說，索引的記憶體使用量可以如下計算：</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">IVF 索引記憶體使用量</h3><p>IVF 索引透過將資料分割成群組，在記憶體效率與搜尋效能之間取得平衡。以下是使用 IVF 變異索引的 100 萬個 128 維向量所使用的記憶體明細。</p>
<ol>
<li><p><strong>計算中心點所使用的記憶體。</strong></p>
<p>IVF 系列索引類型使 Milvus 能夠使用基於中心點的分割將向量聚類為桶。每個中心點都包含在原始向量嵌入的索引中。當您將向量分成 2,000 個群集時，記憶體使用量可按以下方式計算：</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>計算群集分派所使用的記憶體。</strong></p>
<p>每個向量嵌入都會指派給一個叢集，並以整數 ID 儲存。對於 2,000 個簇，2 字節的整數就足夠了。記憶體使用量的計算方式如下：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>計算量化所造成的壓縮。</strong></p>
<p>IVF 變數通常使用 PQ 和 SQ8，記憶體使用量可按以下方式估算：</p>
<ul>
<li><p>使用具有 8 個子量化器的 PQ</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用 SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>下表列出了不同配置下的估計記憶體使用量：</p>
<p><table>
<tr>
<th><p>配置</p></th>
<th><p>記憶體估算</p></th>
<th><p>總記憶體</p></th>
</tr>
<tr>
<td><p>IVF-PQ (無精煉)</p></td>
<td><p>1.0 MB + 2.0 MB + 8.0 MB</p></td>
<td><p>11.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ + 10% 原始精煉</p></td>
<td><p>1.0 MB + 2.0 MB + 8.0 MB + 51.2 MB</p></td>
<td><p>62.2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8 (無精煉)</p></td>
<td><p>1.0 MB + 2.0 MB + 128 MB</p></td>
<td><p>131.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT (完整原始向量)</p></td>
<td><p>1.0 MB + 2.0 MB + 512 MB</p></td>
<td><p>515.0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>計算精煉開銷。</strong></p>
<p>IVF 變數通常會搭配精煉器來重新排序候選項。對於擷取前 10 個結果且擴充率為 5 的搜尋，精煉開銷可估算如下：</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">圖形索引記憶體使用量</h3><p>像 HNSW 這種以圖表為基礎的索引類型需要大量記憶體來儲存圖表結構和原始向量內嵌。以下是使用 HNSW 索引類型索引 100 萬個 128 維向量所消耗記憶體的詳細明細。</p>
<ol>
<li><p><strong>計算圖形結構使用的記憶體。</strong></p>
<p>HNSW 中的每個向量都會維持與鄰近向量的連線。在圖表度（每個節點的邊緣）為 32 的情況下，所消耗的記憶體可按以下方式計算：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>計算原始向量嵌入所使用的記憶體。</strong></p>
<p>儲存未壓縮的 FP32 向量所消耗的記憶體可計算如下：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>當您使用 HNSW 為 100 萬個 128 維向量嵌入建立索引時，使用的總記憶體為<strong>128 MB (圖形) + 512 MB (向量) = 640 MB</strong>。</p></li>
<li><p><strong>計算量化所造成的壓縮。</strong></p>
<p>量化可減少向量大小。例如，使用具有 8 個子量化器的 PQ（每個向量 8 位元組）會導致大幅壓縮。經壓縮的向量嵌入所消耗的記憶體可以如下計算：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>與原始向量嵌入相比，這可達到 64 倍的壓縮率，而<strong>HNSWPQ</strong>索引類型使用的總記憶體為<strong>128 MB (圖形) + 8 MB (壓縮向量) = 136 MB</strong>。</p></li>
<li><p><strong>計算精煉開銷。</strong></p>
<p>精煉（例如使用原始向量重新排序）會暫時將高精度資料載入記憶體。對於擷取前 10 個結果且擴充率為 5 的搜尋，精煉開銷可估算如下：</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">其他注意事項</h3><p>IVF 和基於圖的索引會透過量化來最佳化記憶體的使用，而記憶體映射檔案 (mmap) 和 DiskANN 則會處理資料集超出可用隨機存取記憶體 (RAM) 的情況。</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN 是基於 Vamana 圖形的索引，可連結資料點，以便在搜尋過程中有效導航，同時應用 PQ 來縮小向量的大小，並快速計算向量之間的近似距離。</p>
<p>Vamana 圖形儲存在磁碟上，這使得 DiskANN 可以處理大型資料集，否則記憶體就無法容納這些資料集。這對十億點的資料集特別有用。</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">記憶體映射檔案 (mmap)</h4><p>記憶體映射 (Mmap) 可直接存取磁碟上的大型檔案，讓 Milvus 在記憶體和硬碟中同時儲存索引和資料。此方法可根據存取頻率減少 I/O 呼叫的開銷，有助於最佳化 I/O 作業，從而擴大資料集的儲存容量，且不會顯著影響搜尋效能。</p>
<p>具體來說，您可以設定 Milvus 對某些欄位的原始資料進行記憶體映射，而不是將其完全載入記憶體。如此一來，您就可以直接取得欄位的記憶體存取權，而不必擔心記憶體問題，並擴大資料集的容量。</p>
