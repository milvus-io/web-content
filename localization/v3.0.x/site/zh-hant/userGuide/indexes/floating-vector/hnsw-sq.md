---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ 結合了「階層式可導航小世界」（HNSW）圖與「標量量化」（SQ），形成一種先進的向量索引方法，可實現可控的大小與精確度之間的權衡。 與標準
  HNSW 相比，此索引類型在維持高查詢處理速度的同時，僅會使索引建置時間略微增加。
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
    </button></h1><p><strong>HNSW_SQ</strong>結合了「階層式可導航小世界」（HNSW）圖與「標量量化」（SQ），形成一種先進的向量索引方法，可提供可控的大小與精確度之間的權衡。 與標準<a href="/docs/zh-hant/hnsw.md">HNSW</a> 相比，此索引類型在維持高查詢處理速度的同時，索引建置時間僅略有增加。</p>
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
    </button></h2><p>HNSW_SQ 結合了兩種索引技術：用於快速圖基導航的<strong>HNSW</strong>，以及用於高效向量壓縮的<strong>SQ</strong>。</p>
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
    </button></h3><p>HNSW 會建構一個多層圖，其中每個節點對應資料集中的向量。在此圖中，節點根據其相似度相互連接，從而能夠快速遍歷資料空間。其階層結構使搜尋演算法能夠縮小候選鄰居的範圍，顯著加速高維空間中的搜尋過程。</p>
<p>如需更多資訊，請參閱<a href="/docs/zh-hant/hnsw.md">HNSW</a>。</p>
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
    </button></h3><p>SQ 是一種透過使用較少位元來表示向量，從而實現向量壓縮的方法。例如：</p>
<ul>
<li><p><strong>SQ8</strong>使用 8 位元，將數值映射至 256 個等級。如需更多資訊，請參閱<a href="/docs/zh-hant/ivf-sq8.md#SQ8">IVF_SQ8</a>。</p></li>
<li><p><strong>SQ6</strong>使用 6 位元來表示每個浮點數值，從而產生 64 個離散級別。</p></li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" /> 
   <span>Hnsw Sq</span>
  
 </span></p>
<p>這種精確度的降低，在保留資料基本結構的同時，能顯著減少記憶體佔用並加快運算速度。</p>
<h3 id="SQ4U" class="common-anchor-header">SQ4U<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#SQ4U" class="anchor-icon" translate="no">
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
    </button></h3><p>針對需要極高查詢速度和最低記憶體使用量的情境，Milvus 推出了<code translate="no">SQ4U</code> ，這是一種 4 位元均勻標量量化。這是一種激進的標量量化形式，將每個維度的浮點數壓縮為<strong>4 位元</strong>無符號整數。</p>
<p>SQ4U 中的「U」代表「均勻」（Uniform）。與通常會針對每個維度分別計算最小值和最大值（稱為「按維度量化」）的非均勻標量量化不同，SQ4U 採用「<strong>全局均勻量化</strong>」策略：</p>
<ol>
<li><p><strong>全局統計</strong>：系統會計算<strong>單一的</strong>最小值<code translate="no">vmin</code> 以及<strong>單一的</strong>值範圍<code translate="no">vdiff</code> ，該範圍適用於向量（或整個向量區段）的<strong>所有維度</strong>。</p></li>
<li><p><strong>均勻映射</strong>：將全局值範圍劃分為 16 個等間隔區段。向量中的每個浮點數，無論屬於哪一維度，皆會透過這些共用參數映射為 4 位元整數（0–15）。</p></li>
</ol>
<p><strong>效能優勢：</strong></p>
<ul>
<li><p><strong>8 倍壓縮比：</strong>相較於 `<code translate="no">FP32</code> ` 可縮小 8 倍，相較於 `<code translate="no">SQ8</code>` 可縮小 2 倍，顯著降低記憶體頻寬壓力——這通常是向量搜尋中的瓶頸。</p></li>
<li><p><strong>SIMD 優化：</strong>緊湊的結構使現代 CPU（AVX2/AVX-512）能在每個時脈週期內處理更多維度。關鍵在於，透過使用全域參數，可免除在距離計算過程中載入不同比例/偏移量的需求，從而使指令管線保持完全飽和。</p></li>
<li><p><strong>快取效率：</strong>向量尺寸較小意味著更多資料能容納於 CPU 快取中，從而降低因記憶體存取所造成的延遲。</p></li>
</ul>
<div class="alert note">
<p>由於採用全域參數共享機制，SQ4U 在正規化資料或各維度值分佈一致的資料集上表現最佳。</p>
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
    </button></h3><p>HNSW_SQ 結合了 HNSW 與 SQ 的優勢，以實現高效的近似最近鄰搜尋。其運作流程如下：</p>
<ol>
<li><p><strong>資料壓縮：</strong>SQ 採用<code translate="no">sq_type</code> （例如 SQ6 或 SQ8）對向量進行壓縮，從而降低記憶體使用量。此壓縮雖可能降低精確度，但能讓系統處理更大的資料集。</p></li>
<li><p><strong>圖構建：</strong>利用壓縮後的向量建構 HNSW 圖。由於資料經過壓縮，生成的圖體積較小，搜尋速度也更快。</p></li>
<li><p><strong>候選節點檢索：</strong>當提供查詢向量時，演算法會利用壓縮後的資料，從 HNSW 圖中快速識別出一組候選鄰居。</p></li>
<li><p><strong>（可選）結果精細化：</strong>可根據以下參數對初始候選結果進行精細化處理，以提升準確性：</p>
<ul>
<li><p><code translate="no">refine</code>：控制此精細化步驟是否啟用。當設定為<code translate="no">true</code> 時，系統會使用更高精度或未壓縮的表示形式重新計算距離。</p></li>
<li><p><code translate="no">refine_type</code>：指定精細化過程中使用的資料精度等級（例如：SQ6、SQ8、BF16）。選擇較高的精度（例如<code translate="no">FP32</code> ）可產生更精確的結果，但會消耗更多記憶體。此精度必須高於原始壓縮資料集的精度，且需符合<code translate="no">sq_type</code> 的設定。</p></li>
<li><p><code translate="no">refine_k</code>: 作為放大係數。例如，若您的前<em>k 項</em>為 100，且<code translate="no">refine_k</code> 為 2，系統將重新對前 200 個候選項進行排序，並返回最佳的 100 個，從而提升整體準確度。</p></li>
</ul></li>
</ol>
<p>有關參數及有效值的完整清單，請參閱「<a href="/docs/zh-hant/hnsw-sq.md#Index-params">索引參數</a>」。</p>
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
    </button></h2><p>若要在 Milvus 中針對向量場建立<code translate="no">HNSW_SQ</code> 索引，請使用<code translate="no">add_index()</code> 方法，並指定<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 以及索引的其他參數。</p>
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
<p>在此設定中：</p>
<ul>
<li><p><code translate="no">index_type</code>: 要建立的索引類型。在此範例中，將值設定為 `<code translate="no">HNSW_SQ</code>`。</p></li>
<li><p><code translate="no">metric_type</code>: 用於計算向量之間距離的方法。支援的值包括<code translate="no">COSINE</code> 、<code translate="no">L2</code> 以及<code translate="no">IP</code> 。詳細資訊請參閱「<a href="/docs/zh-hant/metric.md">度量類型</a>」。</p></li>
<li><p><code translate="no">params</code>: 建立索引的額外設定選項。詳細資訊請參閱「<a href="/docs/zh-hant/hnsw-sq.md#Index-building-params">索引建立參數</a>」。</p></li>
</ul>
<p>配置完索引參數後，您可以直接使用<code translate="no">create_index()</code> 方法，或透過<code translate="no">create_collection</code> 方法傳入索引參數來建立索引。詳情請參閱「<a href="/docs/zh-hant/create-collection.md">建立集合</a>」。</p>
<h2 id="Search-on-index" class="common-anchor-header">在索引上進行搜尋<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>建立索引並插入實體後，即可對該索引執行相似度搜尋。</p>
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
<p>在此配置中：</p>
<ul>
<li><code translate="no">params</code>：針對索引搜尋的額外設定選項。詳細資訊請參閱「<a href="/docs/zh-hant/hnsw-sq.md#Index-specific-search-params">索引專用搜尋參數</a>」。</li>
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
    </button></h2><p>本節概述用於建立索引及在索引上執行搜尋的參數。</p>
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
    </button></h3><p>下表列出了在<code translate="no">params</code> 中<a href="/docs/zh-hant/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">建立索引</a>時可設定的參數。</p>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調校建議</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>圖中每個節點可擁有的最大連接數（或邊數），包含出邊與入邊。</p><p>此參數會直接影響索引建構與搜尋。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍</strong>：[2, 2048]</p><p><strong>預設值</strong>：<code translate="no">30</code> （每個節點最多 30 條出邊和 30 條入邊）</p></td>
     <td><p>較大的<code translate="no">M</code> 通常會<strong>提高準確度</strong>，但<strong>會增加記憶體開銷</strong>，<strong>並減慢索引建立和搜尋的速度</strong>。</p><p>對於高維度資料集，或當高召回率至關重要時，請考慮增加<code translate="no">M</code> 。</p><p>當記憶體使用量和搜尋速度是主要考量時，請考慮降低<code translate="no">M</code> 。</p><p>在大多數情況下，我們建議您將數值設定在此範圍內：[5, 100]。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>在建立索引時，用於連接的候選鄰居數量。</p><p>對於每個新元素，系統會評估較大的候選鄰居集合，但實際建立的最大連接數仍受<code translate="no">M</code> 的限制。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍</strong>：[1,<em>int_max</em>]</p><p><strong>預設值</strong>：<code translate="no">360</code></p></td>
     <td><p>較高的 `<code translate="no">efConstruction</code> ` 通常會產生<strong>更精確的索引</strong>，因為會探索更多潛在的連結。然而，這也會導致<strong>建立索引時所需的時間更長，且記憶體使用量增加</strong>。</p><p>若需提升準確度，建議提高 `<code translate="no">efConstruction</code> ` 參數值，特別是在索引建立時間並非關鍵考量的情境下。</p><p>若資源限制是考量因素，請考慮降低 `<code translate="no">efConstruction</code> ` 以加快索引建置速度。</p><p>在大多數情況下，我們建議您將數值設定在此範圍內：[50, 500]。</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>指定用於壓縮向量的標量量化方法。每個選項在壓縮率與精確度之間提供不同的平衡：</p><ul><li><p><code translate="no">SQ4U</code>：使用 4 位元均勻量化來編碼向量。此模式提供最高的速度與壓縮率。</p></li><li><p><code translate="no">SQ6</code>: 使用 6 位元整數對向量進行編碼。</p></li><li><p><code translate="no">SQ8</code>: 使用 8 位元整數對向量進行編碼。</p></li><li><p><code translate="no">BF16</code>: 使用 Bfloat16 格式。</p></li><li><p><code translate="no">FP16</code>: 使用標準的 16 位元浮點數格式。</p></li></ul></td>
     <td><p><strong>類型</strong>：字串</p><p><strong>範圍</strong>：[<code translate="no">SQ4U</code>,<code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code> ]</p><p><strong>預設值</strong>：<code translate="no">SQ8</code></p></td>
     <td><p><code translate="no">sq_type</code> 的選擇取決於特定應用程式的需求。若追求最高速度與記憶體效率，應選擇<code translate="no">SQ4U</code> 。若追求性能與效率的平衡，<code translate="no">SQ6</code> 或<code translate="no">SQ8</code> 可能較為合適。另一方面，若精確度至關重要，則建議選用<code translate="no">BF16</code> 或<code translate="no">FP16</code> 。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>一個布林標誌，用於控制搜尋過程中是否套用精細化步驟。精細化涉及透過計算查詢向量與候選向量之間的精確距離，來重新排序初始結果。</p></td>
     <td><p><strong>類型</strong>：布林值</p><p><strong>範圍</strong>：[<code translate="no">true</code>,<code translate="no">false</code>]</p><p><strong>預設值</strong>：<code translate="no">false</code></p></td>
     <td><p>若需高精度且可容忍搜尋速度稍慢，請設定為<code translate="no">true</code> 。若優先考量速度且可接受精度稍有妥協，請使用<code translate="no">false</code> 。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>決定用於精細化排序之資料的精確度。</p><p>此精度必須高於壓縮向量的精度（由<code translate="no">sq_type</code> 設定），這將同時影響重新排序向量的準確性及其記憶體佔用量。</p></td>
     <td><p><strong>類型</strong>：字串</p><p><strong>範圍</strong>：[<code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code>,<code translate="no">FP32</code> ]</p><p><strong>預設值</strong>：無</p></td>
     <td><p>若需最高精度（但會消耗較多記憶體），請使用<code translate="no">FP32</code> ；若需更佳的壓縮效果，請使用<code translate="no">SQ6</code> 或<code translate="no">SQ8</code> 。<code translate="no">BF16</code> 和<code translate="no">FP16</code> 則提供兼顧兩者的平衡選擇。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">索引專用的搜尋參數<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出了在<code translate="no">search_params.params</code> <a href="/docs/zh-hant/hnsw-sq.md#Search-on-index">中針對索引進行搜尋</a>時可設定的參數。若未指定某些參數，伺服器設定可覆寫其預設值。</p>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>數值範圍</p></th>
     <th><p>調校建議</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>控制最近鄰檢索過程中的搜尋範圍。此參數決定將造訪並評估多少個節點作為潛在的最近鄰。 </p><p>此參數僅影響搜尋過程，且僅適用於圖的底層。</p></td>
     <td><p><strong>類型</strong>：整數</p><p><strong>範圍</strong>：[1,<em>int_max</em>]</p><p><strong>預設值</strong>：對於一般 kNN 搜尋為<code translate="no">max(limit, 16)</code> ；對於範圍搜尋為<code translate="no">512</code> 。</p><p>對於一般 kNN 搜尋，顯式的<code translate="no">ef</code> 必須大於或等於<code translate="no">limit</code> （要回傳的最近鄰數量）。</p></td>
     <td><p>較大的<code translate="no">ef</code> 通常會因納入更多潛在鄰居而<strong>提高搜尋準確度</strong>。然而，這也會<strong>增加搜尋時間</strong>。</p><p>當實現高召回率至關重要，而搜尋速度並非首要考量時，可考慮增加<code translate="no">ef</code> 的數值。</p><p>若需優先確保搜尋速度，特別是當搜尋準確度可接受輕微下降時，請考慮降低<code translate="no">ef</code> 的數值。</p><p>在大多數情況下，我們建議您將數值設定在此範圍內：[K, 10K]。</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>此為放大係數，用於控制在精細化階段中，相對於所請求的前 K 項結果，將檢查多少額外的候選結果。</p></td>
     <td><p><strong>類型</strong>：浮點數</p><p><strong>範圍</strong>：[1,<em>float_max</em>)</p><p><strong>預設值</strong>：1</p></td>
     <td><p><code translate="no">refine_k</code> 的數值越高，雖可提升召回率與準確度，但也會增加搜尋時間及資源消耗。數值為 1 時，表示精細化過程僅考慮最初的前 K 個結果。</p></td>
   </tr>
</table>
