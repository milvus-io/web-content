---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ 結合了 Hierarchical Navigable Small World (HNSW) 圖形與 Scalar Quantization
  (SQ)，創造了一種先進的向量索引方法，提供可控制的大小與精確度權衡。與標準 HNSW 相比，此索引類型在維持高查詢處理速度的同時，略微增加了索引建置時間。
---
<h1 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_SQ</strong>結合了 Hierarchical Navigable Small World (HNSW) 圖形與 Scalar Quantization (SQ)，創造了一種先進的向量索引方法，提供可控制的大小與精確度權衡。與標準<a href="/docs/zh-hant/hnsw.md">HNSW</a> 相比，此索引類型在索引建置時間略有增加的同時，仍能維持較高的查詢處理速度。</p>
<h2 id="Overview" class="common-anchor-header">概觀<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>HNSW_SQ 結合了兩種索引技術：<strong>HNSW</strong>用於基於圖表的快速導覽，而<strong>SQ</strong>則用於有效率的向量壓縮。</p>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW 會建構一個多層圖表，其中每個節點對應資料集中的向量。在這個圖形中，節點是根據其相似性連接起來的，因此可以快速遍歷資料空間。層級結構可讓搜尋演算法縮小候選鄰近點的範圍，大幅加速高維空間的搜尋過程。</p>
<p>如需詳細資訊，請參閱<a href="/docs/zh-hant/hnsw.md">HNSW</a>。</p>
<h3 id="SQ" class="common-anchor-header">SQ<button data-href="#SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>SQ 是一種壓縮向量的方法，用較少的位元來表示向量。舉例來說：</p>
<ul>
<li><p><strong>SQ8</strong>使用 8 位元，將值映射成 256 層。  如需詳細資訊，請參閱<a href="/docs/zh-hant/ivf-sq8.md#SQ8">IVF_SQ8</a>。</p></li>
<li><p><strong>SQ6</strong>使用 6 位元來表示每個浮點值，因此有 64 個離散的層級。</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" />
   </span> <span class="img-wrapper"> <span>Hnsw Sq</span> </span></p>
<p>這種精確度的降低大幅減少了記憶體佔用量，並加快了計算速度，同時保留了資料的基本結構。</p>
<h3 id="SQ4U--Milvus-268+" class="common-anchor-header">SQ4U<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#SQ4U--Milvus-268+" class="anchor-icon" translate="no">
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
    </button></h3><p>針對要求極高查詢速度和最小記憶體使用量的情況，Milvus 推出<code translate="no">SQ4U</code>, 4 位元統一標量量化。這是一種進取的標量量化形式，可將每個維度的浮點值壓縮為<strong>4 位元</strong>無符號整數。</p>
<p>SQ4U 中的 "U" 代表 Uniform。非統一標量量化通常會獨立計算每個維度的最小值和最大值（Per-Dimension Quantization），與此不同，SQ4U 強制執行<strong>全局統一量化</strong>策略：</p>
<ol>
<li><p><strong>全局統計</strong>：系統<strong>計算單一</strong>最小值<code translate="no">vmin</code> 和<strong>單一值</strong>範圍<code translate="no">vdiff</code> ，適用於向量的<strong>所有維度</strong>（或整個向量段）。</p></li>
<li><p><strong>統一映射</strong>：全域值範圍分為 16 個相等的區間。向量中的每個浮點值，不論其屬於哪個維度，都會使用這些共用參數映射為 4 位元整數 (0-15)。</p></li>
</ol>
<p><strong>效能優勢：</strong></p>
<ul>
<li><p><strong>8 倍壓縮比：</strong>與<code translate="no">FP32</code> 相比，可縮小 8 倍，與<code translate="no">SQ8</code> 相比，可縮小 2 倍，大幅降低記憶體頻寬壓力 - 這通常是向量搜尋的瓶頸。</p></li>
<li><p><strong>SIMD 最佳化：</strong>精簡的結構允許現代 CPU (AVX2/AVX-512) 在每個週期處理更多維度。最重要的是，全局參數的使用消除了在計算距離期間載入不同標度/偏移值的需要，使指令流水線保持完全飽和。</p></li>
<li><p><strong>快取記憶體效率：</strong>較小的向量尺寸意味著 CPU 快取記憶體可容納更多資料，減少存取記憶體所造成的延遲。</p></li>
</ul>
<div class="alert note">
<p>由於全局參數共享，SQ4U 在規範化資料或各維值分佈一致的資料集上表現最佳。</p>
</div>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ<button data-href="#HNSW-+-SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_SQ 結合了 HNSW 和 SQ 的優點，以實現高效的近似近鄰搜尋。以下是這個過程的運作方式：</p>
<ol>
<li><p><strong>資料壓縮：</strong>SQ 會使用<code translate="no">sq_type</code> (例如 SQ6 或 SQ8) 來壓縮向量，以減少記憶體使用量。這種壓縮可能會降低精確度，但卻能讓系統處理更大的資料集。</p></li>
<li><p><strong>圖形建構：</strong>壓縮向量用於建立 HNSW 圖形。由於資料已壓縮，因此產生的圖形較小，搜尋速度也較快。</p></li>
<li><p><strong>候選檢索：</strong>當提供查詢向量時，演算法會使用壓縮資料，從 HNSW 圖中快速找出候選鄰居。</p></li>
<li><p><strong>(可選）結果精進：</strong>初始候選結果可以根據下列參數進行精煉，以獲得更高的精確度：</p>
<ul>
<li><p><code translate="no">refine</code>:控制是否啟動此精煉步驟。當設定為<code translate="no">true</code> 時，系統會使用更高精度或未壓縮的表示來重新計算距離。</p></li>
<li><p><code translate="no">refine_type</code>:指定精煉過程中使用的資料精確度等級（例如 SQ6、SQ8、BF16）。更高精度的選擇，例如<code translate="no">FP32</code> ，可以產生更精確的結果，但需要更多的記憶體。這必須比原始壓縮資料集的精確度高出<code translate="no">sq_type</code> 。</p></li>
<li><p><code translate="no">refine_k</code>:作為放大係數。舉例來說，如果您的 top<em>k</em>是 100，而<code translate="no">refine_k</code> 是 2，系統會重新排序前 200 名候選人，並傳回最佳的 100 名，以提高整體精確度。</p></li>
</ul></li>
</ol>
<p>如需參數及有效值的完整清單，請參閱<a href="/docs/zh-hant/hnsw-sq.md#Index-params">索引參數</a>。</p>
<h2 id="Build-index" class="common-anchor-header">建立索引<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>要在 Milvus 的向量場上建立<code translate="no">HNSW_SQ</code> 索引，請使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的附加參數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_SQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;sq_type&quot;</span>: <span class="hljs-string">&quot;SQ6&quot;</span>, <span class="hljs-comment"># Scalar quantizer type</span>
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此設定中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引類型。在本範例中，設定值為<code translate="no">HNSW_SQ</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用來計算向量間距離的方法。支援的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/metric.md">公制類型</a>。</p></li>
<li><p><code translate="no">params</code>:建立索引的附加設定選項。詳情請參閱<a href="/docs/zh-hant/hnsw-sq.md#Index-building-params">索引建立參數</a>。</p></li>
</ul>
<p>索引參數配置完成後，您可以直接使用<code translate="no">create_index()</code> 方法或在<code translate="no">create_collection</code> 方法中傳入索引參數來建立索引。如需詳細資訊，請參閱<a href="/docs/zh-hant/create-collection.md">建立集合</a>。</p>
<h2 id="Search-on-index" class="common-anchor-header">在索引上搜尋<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>索引建立且實體插入後，您就可以在索引上執行相似性搜尋。</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><code translate="no">params</code>:在索引上搜索的附加配置选项。詳情請參閱<a href="/docs/zh-hant/hnsw-sq.md#Index-specific-search-params">特定於索引的搜尋參數</a>。</li>
</ul>
<h2 id="Index-params" class="common-anchor-header">索引參數<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>本節概述用於建立索引和在索引上執行搜尋的參數。</p>
<h3 id="Index-building-params" class="common-anchor-header">索引建立參數<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出了<a href="/docs/zh-hant/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">建立索引</a>時可以在<code translate="no">params</code> 中設定的參數。</p>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>每個節點在圖表中可擁有的最大連線（或邊緣）數量，包括傳出和傳入的邊緣。</p><p>此參數會直接影響索引建構和搜尋。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍：</strong>[2, 2048]</p><p><strong>預設值</strong>：<code translate="no">30</code> (每個節點最多 30 條出邊和 30 條入邊)</p></td>
     <td><p>較大的<code translate="no">M</code> 通常會帶來<strong>較高的精確度</strong>，但會<strong>增加記憶體開銷</strong>，<strong>並減慢索引建立和搜尋的速度</strong>。</p><p>對於高維度的資料集或高召回率非常重要時，請考慮增加<code translate="no">M</code> 。</p><p>如果記憶體佔用量和搜尋速度是主要考量，則考慮降低<code translate="no">M</code> 。</p><p>在大多數情況下，我們建議您在此範圍內設定一個值：[5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>索引建構期間考慮連接的候選鄰居數量。</p><p>每個新元素都會評估更多的候選鄰居，但實際建立的最大連線數仍受限於<code translate="no">M</code> 。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍：</strong>[1，<em>int_max］</em></p><p><strong>預設值</strong>：<code translate="no">360</code></p></td>
     <td><p>較高的<code translate="no">efConstruction</code> 通常會產生<strong>更精確的索引</strong>，因為會探索更多的潛在連線。不過，這也會導致建立<strong>索引的時間變長，並增加</strong>建構過程中的<strong>記憶體使用量</strong>。</p><p>考慮增加<code translate="no">efConstruction</code> 以提高精確度，尤其是在索引時間不太重要的情況下。</p><p>在資源有限的情況下，可考慮降低<code translate="no">efConstruction</code> ，以加快索引建置速度。</p><p>在大多數情況下，我們建議您設定此範圍內的值：[50, 500].</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>指定壓縮向量的標量量化方法。每個選項都在壓縮和精確度之間提供不同的平衡：</p><ul><li><p><code translate="no">SQ4U</code>:使用 4 位元統一量化來編碼向量。此模式提供最高的速度和壓縮率。</p></li><li><p><code translate="no">SQ6</code>:使用 6 位元整數編碼向量。</p></li><li><p><code translate="no">SQ8</code>:使用 8 位整數編碼向量。</p></li><li><p><code translate="no">BF16</code>:使用 Bfloat16 格式。</p></li><li><p><code translate="no">FP16</code>:使用標準 16 位元浮點格式。</p></li></ul></td>
     <td><p><strong>類型</strong>：字串</p><p><strong>範圍：</strong>[<code translate="no">SQ4U</code>,<code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code> ]</p><p><strong>預設值</strong>：<code translate="no">SQ8</code></p></td>
     <td><p><code translate="no">sq_type</code> 的選擇取決於特定應用程式的需求。選擇<code translate="no">SQ4U</code> 是為了獲得最高的速度和記憶體效率。<code translate="no">SQ6</code> 或<code translate="no">SQ8</code> 也許適合用於平衡效能。另一方面，如果精確度是最重要的，<code translate="no">BF16</code> 或<code translate="no">FP16</code> 可能是首選。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>一個布林標誌，用來控制是否在搜尋過程中應用精煉步驟。精煉包括透過計算查詢向量與候選項之間的精確距離，重新排列初始結果。</p></td>
     <td><p><strong>類型</strong>：布林</p><p><strong>範圍：</strong>[<code translate="no">true</code>,<code translate="no">false</code>]</p><p><strong>預設值</strong>：<code translate="no">false</code></p></td>
     <td><p>如果高準確度是必要的，而且您可以容忍稍慢的搜尋時間，請設定為<code translate="no">true</code> 。如果速度是優先考量，且可以接受精確度的輕微折衷，則使用<code translate="no">false</code> 。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>決定用於精煉的資料精確度。</p><p>此精確度必須高於壓縮向量的精確度 (由<code translate="no">sq_type</code> 設定)，這會影響重新排序向量的精確度及其記憶體佔用量。</p></td>
     <td><p><strong>類型</strong>：字串</p><p><strong>範圍</strong>:[<code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code>,<code translate="no">FP32</code> ]。</p><p><strong>預設值</strong>：無</p></td>
     <td><p>使用<code translate="no">FP32</code> 可在較高記憶體成本下獲得最高精確度，使用<code translate="no">SQ6</code>/<code translate="no">SQ8</code> 則可獲得更好的壓縮效果。<code translate="no">BF16</code> 和<code translate="no">FP16</code> 提供了一個平衡的替代方案。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定於索引的搜尋參數<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出<a href="/docs/zh-hant/hnsw-sq.md#share-DeFldzMQQoc2W4x2YiIcYUbqnne">在索引上搜尋時</a>，可在<code translate="no">search_params.params</code> 中設定的參數。</p>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>控制最近鄰檢索時的搜尋範圍。它決定要造訪多少節點，並將其評估為潛在最近鄰居。 </p><p>此參數只會影響搜尋過程，並只適用於圖形的底層。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍：</strong>[1、<em>int_max］</em></p><p><strong>預設值</strong>:<em>limit</em>(要回傳的 TopK 最近鄰居)</p></td>
     <td><p>較大的<code translate="no">ef</code> 通常會導致<strong>較高的搜尋準確度</strong>，因為會考慮更多的潛在鄰居。不過，這也會<strong>增加搜尋時間</strong>。</p><p>當達到高召回率是關鍵，而搜尋速度較不重要時，請考慮增加<code translate="no">ef</code> 。</p><p>考慮降低<code translate="no">ef</code> 以優先加快搜尋速度，尤其是在可以接受稍微降低精確度的情況下。</p><p>在大多數情況下，我們建議您設定此範圍內的值：[K, 10K]。</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>放大係數，用來控制在精細化階段中，相對於要求的前 K 個結果，有多少額外的候選人會被檢驗。</p></td>
     <td><p><strong>類型</strong>：浮動</p><p><strong>範圍：</strong>[1,<em>float_max</em>)</p><p><strong>預設值</strong>: 1</p></td>
     <td><p><code translate="no">refine_k</code> 的較高值可以提高召回率和精確度，但也會增加搜尋時間和資源使用。值為 1 表示精煉過程只考慮初始的前 K 個結果。</p></td>
   </tr>
</table>
