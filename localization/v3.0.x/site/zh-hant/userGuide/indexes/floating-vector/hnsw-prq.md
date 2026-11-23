---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  HNSW_PRQ
  結合了「階層式可導航小世界」（HNSW）圖與「產品殘差量化」（PRQ），提供了一種先進的向量索引方法，讓您能夠精細調整索引大小與準確度之間的權衡。 PRQ
  透過引入殘差量化（RQ）步驟來擷取更多資訊，超越了傳統的產品量化（PQ），相較於純粹基於 PQ
  的方法，能實現更高的準確度或更緊湊的索引。然而，這些額外的步驟可能會導致在建立索引和搜尋過程中產生更高的運算開銷。
---
<h1 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ<button data-href="#HNSWPRQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PRQ</strong>結合了「階層式可導航小世界」（HNSW）圖與「產品殘差量化」（PRQ）技術，提供一種先進的向量索引方法，讓您能夠精細調整索引大小與精確度之間的權衡。 PRQ 透過引入殘差量化（RQ）步驟來擷取更多資訊，超越了傳統的產品量化（PQ），相較於純粹基於 PQ 的方法，能實現更高的準確度或更緊湊的索引。然而，這些額外的步驟可能會導致在建立索引和搜尋過程中產生更高的運算開銷。</p>
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
    </button></h2><p>HNSW_PRQ 結合了兩種索引技術：用於快速圖基導航的<strong>HSNW</strong>，以及用於高效向量壓縮的<strong>PRQ</strong>。</p>
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
    </button></h3><p>HNSW 構建了一個多層圖，其中每個節點對應資料集中的向量。在此圖中，節點根據其相似度相互連接，從而能夠快速遍歷資料空間。其分層結構使搜尋演算法能夠縮小候選鄰居的範圍，顯著加速高維空間中的搜尋過程。</p>
<p>如需更多資訊，請參閱<a href="/docs/zh-hant/hnsw.md">HNSW</a>。</p>
<h3 id="PRQ" class="common-anchor-header">PRQ<button data-href="#PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PRQ 是一種多階段向量壓縮方法，結合了兩種互補技術：PQ 與 RQ。透過先將高維向量拆分為較小的子向量（透過 PQ），再對剩餘的差異進行量化（透過 RQ），PRQ 得以對原始資料進行緊湊且精確的表示。</p>
<p>下圖展示了其運作原理。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" /> 
   <span>Hnsw Prq</span>
  
 </span></p>
<ol>
<li><p><strong>產品量化 (PQ)</strong></p>
<p>在此階段，原始向量會被劃分為較小的子向量，而每個子向量都會被映射到學習所得編碼本中距離其最近的質心。這種映射能顯著減少資料大小，但由於每個子向量僅由單一質心近似，因此會引入一些舍入誤差。更多詳情請參閱<a href="/docs/zh-hant/ivf-pq.md#PQ">IVF_PQ</a>。</p></li>
<li><p><strong>殘差量化（RQ）</strong></p>
<p>經過 PQ 階段後，RQ 會利用額外的編碼本對殘差（即原始向量與其基於 PQ 的近似值之間的差異）進行量化。由於此殘差通常小得多，因此可以在不大幅增加儲存空間的情況下，更精確地對其進行編碼。</p>
<p>參數 `<code translate="no">nrq</code> ` 決定此殘差需進行多少次迭代量化，讓您能夠微調壓縮效率與精確度之間的平衡。</p></li>
<li><p><strong>最終壓縮表示</strong></p>
<p>當 RQ 完成殘差的量化後，PQ 與 RQ 產生的整數碼將合併為單一壓縮索引。透過捕捉單靠 PQ 可能遺漏的精細細節，RQ 能在不顯著增加儲存空間的情況下提升精確度。這種 PQ 與 RQ 之間的協同作用，正是 PRQ 的核心特徵。</p></li>
</ol>
<h3 id="HNSW-+-PRQ" class="common-anchor-header">HNSW + PRQ<button data-href="#HNSW-+-PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>透過將 HNSW 與 PRQ<strong>結合，HNSW_PRQ</strong>既保留了 HNSW 基於圖的快速搜尋能力，同時也利用了 PRQ 的多階段壓縮優勢。其工作流程如下：</p>
<ol>
<li><p><strong>資料壓縮：</strong>每個向量首先透過 PQ 轉換為粗略表示，接著透過 RQ 對殘差進行量化以進一步精細化。結果是一組代表每個向量的緊湊編碼。</p></li>
<li><p><strong>圖構建：</strong>壓縮後的向量（包含 PQ 與 RQ 編碼）構成建構 HNSW 圖的基礎。由於資料以緊湊形式儲存，該圖所需的記憶體較少，且在圖中導航的速度也隨之提升。</p></li>
<li><p><strong>候選結果檢索：</strong>在搜尋過程中，HNSW 會利用壓縮表示法遍歷圖，並檢索出一組候選結果。這大幅減少了需要納入考量的向量數量。</p></li>
<li><p><strong>（可選）結果精細化：</strong>可根據以下參數對初始候選結果進行精細化處理，以提升準確性：</p>
<ul>
<li><p><code translate="no">refine</code>：控制此精細化步驟是否啟用。當設定為<code translate="no">true</code> 時，系統將使用更高精度或未壓縮的表示形式重新計算距離。</p></li>
<li><p><code translate="no">refine_type</code>: 指定精細化過程中使用的資料精確度等級（例如：SQ6、SQ8、BF16）。選擇較高的精確度（例如<code translate="no">FP32</code> ）可產生更精確的結果，但會消耗更多記憶體。此精確度必須比原始壓縮資料集的精度高出<code translate="no">sq_type</code> 倍。</p></li>
<li><p><code translate="no">refine_k</code>: 作為放大係數。例如，若您的前<em>k 項</em>為 100，且<code translate="no">refine_k</code> 為 2，系統將重新對前 200 個候選項進行排序，並返回最佳的 100 個，從而提升整體準確度。</p></li>
</ul></li>
</ol>
<p>有關參數及有效值的完整清單，請參閱「<a href="/docs/zh-hant/hnsw-prq.md#Index-params">索引參數</a>」。</p>
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
    </button></h2><p>若要在 Milvus 中針對向量場建立<code translate="no">HNSW_PRQ</code> 索引，請使用<code translate="no">add_index()</code> 方法，並指定<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 以及索引的其他參數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PRQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;nrq&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此設定中：</p>
<ul>
<li><p><code translate="no">index_type</code>: 要建立的索引類型。在此範例中，將值設定為 `<code translate="no">HNSW_PQ</code>`。</p></li>
<li><p><code translate="no">metric_type</code>: 用於計算向量之間距離的方法。支援的值包括<code translate="no">COSINE</code> 、<code translate="no">L2</code> 及<code translate="no">IP</code> 。詳細資訊請參閱「<a href="/docs/zh-hant/metric.md">度量類型</a>」。</p></li>
<li><p><code translate="no">params</code>: 建立索引的額外設定選項。詳細資訊請參閱「<a href="/docs/zh-hant/hnsw-prq.md#Index-building-params">索引建立參數</a>」。</p></li>
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
<li><code translate="no">params</code>：針對索引搜尋的額外設定選項。詳細資訊請參閱「<a href="/docs/zh-hant/hnsw-prq.md#Index-specific-search-params">索引專用搜尋參數</a>」。</li>
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
    </button></h3><p>下表列出了在<code translate="no">params</code> 中<a href="/docs/zh-hant/hnsw-prq.md#Build-index">建立索引</a>時可設定的參數。</p>
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
     <td><p>圖中每個節點可擁有的最大連接數（或邊數），包含出邊與入邊。
此參數會直接影響索引建構與搜尋。</p></td>
     <td><p><strong>類型</strong>：整數
<strong>範圍</strong>：[2, 2048]</p>
<p><strong>預設值</strong>：<code translate="no">30</code> （每個節點最多 30 條出邊與 30 條入邊）</p></td>
     <td><p>較大的<code translate="no">M</code> 通常能<strong>提高準確度</strong>，但<strong>會增加記憶體開銷</strong>，並<strong>減慢索引建構與搜尋的速度</strong>。
 對於高維度資料集，或當高召回率至關重要時，請考慮增加<code translate="no">M</code> 。</p>
<p>若記憶體使用量與搜尋速度是首要考量，請考慮降低<code translate="no">M</code> 的值。</p>
<p>在大多數情況下，我們建議您將數值設定在此範圍內：[5, 100]。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>在建立索引時，用於評估連接的候選鄰居數量。
 雖然每個新元素都會評估較大的候選鄰居池，但實際建立的連接最大數量仍受<code translate="no">M</code> 的限制。</p></td>
     <td><p><strong>類型</strong>：整數
<strong>範圍</strong>：[5,<em>100</em>]</p>
<p><strong>預設值</strong>：<code translate="no">360</code></p></td>
     <td><p>較高的 `<code translate="no">efConstruction</code> ` 通常會產生<strong>更精確的索引，</strong>因為會探索更多潛在的連結。然而，這也會導致<strong>建立索引的時間更長，並增加</strong>建立過程中的<strong>記憶體使用量</strong>。
若要提升精確度，請考慮增加 `<code translate="no">efConstruction</code> `，特別是在索引時間並非關鍵考量的情境下。</p>
<p>若資源限制是考量因素，請考慮降低 `<code translate="no">efConstruction</code> ` 值以加快索引建置速度。</p>
<p>在大多數情況下，我們建議您將數值設定在此範圍內：[50, 500]。</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>在量化過程中，將每個高維向量劃分為若干子向量（用於量化）的數量。</p></td>
     <td><p><strong>類型</strong>：整數
<strong>範圍</strong>：[1, 65536]</p>
<p><strong>預設值</strong>：無</p></td>
     <td><p>較高的<code translate="no">m</code> 值可提高精度，但也會增加運算複雜度與記憶體使用量。
為確保能正確分解，<code translate="no">m</code> 必須是向量維度 (<em>D</em>) 的因數。一般建議的值為<em>m = D/2</em>。</p>
<p>在大多數情況下，我們建議您將值設定在此範圍內：[D/8, D]。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>用於在壓縮形式中表示每個子向量質心索引的位元數。此數值直接決定每個編碼本的大小。
 每個編碼本將包含<sup>2n 位元的</sup>質心。例如，若將<code translate="no">nbits</code> 設為 8，則每個子向量將由一個 8 位元的質心索引來表示。這使得該子向量的編碼本中可能包含<sup>2⁸</sup>（256）個質心。</p></td>
     <td><p><strong>類型</strong>：整數
<strong>範圍</strong>：[1, 24]</p>
<p><strong>預設值</strong>：<code translate="no">8</code></p></td>
     <td><p>較高的<code translate="no">nbits</code> 值可容納更大的編碼本，可能使原始向量的表示更為精確。然而，這也意味著需使用更多位元來儲存每個索引，導致壓縮率降低。
在大多數情況下，我們建議您將值設定在此範圍內：[1, 16]。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>控制 RQ 階段中使用的殘差子量化器數量。較多的子量化器雖可能實現更高的壓縮率，但也可能導致更多資訊損失。</p></td>
     <td><p><strong>類型</strong>：整數
<strong>範圍</strong>：[1, 16]</p>
<p><strong>預設值</strong>：<code translate="no">2</code></p></td>
     <td><p>較高的「<code translate="no">nrq</code> 」值可進行額外的殘差子量化步驟，這可能使原始向量的重建更為精確。然而，這也意味著需要儲存和計算更多的子量化器，導致索引大小增加及運算開銷增大。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>一個布林標誌，用於控制搜尋過程中是否套用精細化步驟。精細化涉及透過計算查詢向量與候選向量之間的精確距離，來重新排序初始結果。</p></td>
     <td><p><strong>類型</strong>：布林值
<strong>範圍</strong>：[<code translate="no">true</code>,<code translate="no">false</code>]</p>
<p><strong>預設值</strong>：<code translate="no">false</code></p></td>
     <td><p>若高精度至關重要且可容忍搜尋速度略微變慢，請設定為<code translate="no">true</code> 。若速度為優先考量且可接受精度上的輕微妥協，請使用<code translate="no">false</code> 。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>決定在精細化過程中所使用資料的精確度。
此精確度必須高於壓縮向量的精確度（由<code translate="no">m</code> 和<code translate="no">nbits</code> 參數設定）。</p></td>
     <td><p><strong>類型</strong>：字串
<strong>範圍</strong>：[<code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code>,<code translate="no">FP32</code> ]</p>
<p><strong>預設值</strong>：無</p></td>
     <td><p>若需最高精確度（但會消耗較多記憶體），請使用<code translate="no">FP32</code> ；若需更佳的壓縮效果，請使用<code translate="no">SQ6</code> 或<code translate="no">SQ8</code> 。<code translate="no">BF16</code> 和<code translate="no">FP16</code> 則提供折衷的選擇。</p></td>
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
    </button></h3><p>下表列出了在<code translate="no">search_params.params</code> 中<a href="/docs/zh-hant/hnsw-prq.md#Search-on-index">針對索引進行搜尋</a>時可設定的參數。</p>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>數值範圍</p></th>
     <th><p>調優建議</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>控制最近鄰檢索過程中的搜尋範圍。此參數決定將造訪並評估多少個節點作為潛在的最近鄰。
此參數僅影響搜尋過程，且僅適用於圖的底層。</p></td>
     <td><p><strong>類型</strong>：整數
<strong>範圍</strong>：[1,<em>int_max</em>]</p>
<p><strong>預設值</strong>：<em>limit</em>（要回傳的前 K 個最近鄰）</p></td>
     <td><p>較大的 `<code translate="no">ef</code> ` 通常會因納入更多潛在鄰居而<strong>提高搜尋準確度</strong>。然而，這也會<strong>增加搜尋時間</strong>。
當達成高召回率至關重要，且搜尋速度並非首要考量時，可考慮增加 `<code translate="no">ef</code> `。</p>
<p>若需優先確保搜尋速度，特別是當可接受精確度略微降低時，請考慮降低<code translate="no">ef</code> 的數值。</p>
<p>在大多數情況下，我們建議您將數值設定在此範圍內：[K, 10K]。</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>此為放大係數，用於控制在精細化（重新排序）階段中，相對於請求的前 K 個結果，會額外檢視多少候選結果。</p></td>
     <td><p><strong>類型</strong>：浮點數
<strong>範圍</strong>：[1,<em>float_max</em>)</p>
<p><strong>預設值</strong>：1</p></td>
     <td><p><code translate="no">refine_k</code> 的數值越高，雖然可以提高召回率和準確度，但也會增加搜尋時間和資源消耗。數值為 1 表示精細化過程僅考慮最初的前 K 個結果。</p></td>
   </tr>
</table>
