---
id: hnsw.md
title: HNSW
summary: HNSW 索引是一種基於圖的索引演算法，能在搜尋高維度浮點向量時提升效能。它不僅具備卓越的搜尋準確度與低延遲，但為了維持其層級圖結構，需要較高的記憶體開銷。
---
<h1 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW</strong>索引是一種<strong>基於圖的</strong>索引演算法，可在搜尋高維度浮點向量時提升效能。它不僅具備<strong>卓越的</strong>搜尋準確度與<strong>低延遲</strong>，但為了維持其階層式圖結構，需要<strong>較高的</strong>記憶體開銷。</p>
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
    </button></h2><p>分層可導航小世界（HNSW）演算法會建構一個多層次圖，類似於具有不同縮放層級的地圖。<strong>最底層</strong>包含所有資料點，<strong>而上層</strong>則由從底層採樣而來的資料點子集組成。</p>
<p>在此層級結構中，每一層都包含代表資料點的節點，並透過表示其距離遠近的邊相互連接。較高層級可提供長距離跳躍以快速接近目標，而較低層級則能進行細粒度的搜尋以獲得最精確的結果。</p>
<p>其運作方式如下：</p>
<ol>
<li><p><strong>起點</strong>：搜尋從頂層的固定起點開始，該起點是圖中預先指定的節點。</p></li>
<li><p><strong>貪婪搜尋</strong>：演算法會貪婪地移動至當前層級中最鄰近的節點，直到無法再更接近查詢向量為止。上層主要負責導航功能，作為粗略篩選機制，用以定位下層精細搜尋的潛在起點。</p></li>
<li><p><strong>層級下降</strong>：當在當前層級達到<strong>局部極小值</strong>時，演算法會透過預先建立的連結跳轉至較低層級，並重複貪婪搜尋。</p></li>
<li><p><strong>最終精細化</strong>：此過程持續進行直至抵達最底層，此時透過最終精細化步驟來識別最近鄰。</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" /> 
   <span>HNSW</span>
  
 </span></p>
<p>HNSW 的效能取決於幾個關鍵參數，這些參數同時控制圖的結構與搜尋行為。其中包括：</p>
<ul>
<li><p><code translate="no">M</code>：在層級結構的每個層級中，圖中每個節點所能擁有的邊或連結的最大數量。較高的<code translate="no">M</code> 會導致圖更為密集，並因搜尋可探索的路徑更多而提高召回率與準確度；但由於額外的連結，也會消耗更多記憶體並延長插入時間。 如上圖<strong>所示，M = 5</strong>表示 HNSW 圖中每個節點最多可直接連接 5 個其他節點。這形成了一種中等密度的圖結構，節點之間有多條路徑可相互連通。</p></li>
<li><p><code translate="no">efConstruction</code>: 建立索引時所考慮的候選節點數量。較高的「<code translate="no">efConstruction</code> 」通常能產生品質較佳的圖，但需要更長的時間來建構。</p></li>
<li><p><code translate="no">ef</code>：搜尋過程中評估的鄰居數量。增加<code translate="no">ef</code> 可提高找到最近鄰居的機率，但會減慢搜尋過程。</p></li>
</ul>
<p>有關如何根據需求調整這些設定的詳細資訊，請參閱「<a href="/docs/zh-hant/hnsw.md#Index-params">索引參數</a>」。</p>
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
    </button></h2><p>此範例使用名為<code translate="no">client</code> 的已連線客戶端，以及名為<code translate="no">your_collection_name</code> 的現有集合。該集合包含一個名為<code translate="no">your_vector_field_name</code> 的五維向量場。</p>
<p>先使用<code translate="no">add_index()</code> 定義索引參數，然後使用<code translate="no">create_index()</code> 建立索引。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
    } <span class="hljs-comment"># Index building params</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中：</p>
<ul>
<li><p><code translate="no">index_type</code>：要建立的索引類型。在此範例中，將值設定為<code translate="no">HNSW</code> 。</p></li>
<li><p><code translate="no">metric_type</code>: 用於計算向量之間距離的方法。支援的值包括<code translate="no">COSINE</code> 、<code translate="no">L2</code> 以及<code translate="no">IP</code> 。詳細資訊請參閱「<a href="/docs/zh-hant/metric.md">度量類型</a>」。</p></li>
<li><p><code translate="no">params</code>: 建立索引的額外設定選項。</p>
<ul>
<li><p><code translate="no">M</code>: 每個節點可連接的鄰居最大數量。</p></li>
<li><p><code translate="no">efConstruction</code>: 在索引建構過程中，用於評估連線的候選鄰居數量。</p></li>
</ul>
<p>此範例將 `<code translate="no">M=64</code> ` 和 `<code translate="no">efConstruction=100</code> ` 設定為調校覆寫值。有關預設值和允許的範圍，請參閱「<a href="/docs/zh-hant/hnsw.md#Index-building-params">索引建置參數</a>」。</p></li>
</ul>
<p>若要同時建立集合及其索引，請將索引參數傳遞給<code translate="no">create_collection()</code> 。詳細資訊請參閱「<a href="/docs/zh-hant/create-collection.md">建立集合</a>」。</p>
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
    </button></h2><p>建立索引並插入實體後，請載入集合並搜尋其向量欄位。對於一般的 kNN 搜尋，請將 `<code translate="no">ef</code> ` 設定為至少 `<code translate="no">limit</code>`。</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

client.load_collection(collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>)

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此設定中：</p>
<ul>
<li><p><code translate="no">params</code>：針對索引搜尋的額外設定選項。</p>
<ul>
<li><code translate="no">ef</code>: 搜尋時考慮的鄰居數量。</li>
</ul>
<p>如需瞭解<code translate="no">HNSW</code> 索引可用的更多搜尋參數，請參閱《<a href="/docs/zh-hant/hnsw.md#Index-specific-search-params">索引專用搜尋參數》</a>。</p></li>
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
    </button></h2><p>下表列出了索引建立與搜尋的相關參數。若未指定某些參數，伺服器設定可覆寫其預設值。</p>
<h3 id="Index-building-params" class="common-anchor-header">建立索引參數<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出了在<code translate="no">params</code> 中<a href="/docs/zh-hant/hnsw.md#Build-index">建立索引</a>時可配置的參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>數值範圍</p></th>
     <th><p>調校建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>每個節點在圖中可擁有的最大連接數（或邊數），包含出邊與入邊。此參數會直接影響索引建構與搜尋。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[2, 2048]</p><p><strong>預設值</strong>：<code translate="no">30</code> （每個節點最多 30 條出邊和 30 條入邊）</p></td>
     <td><p>較大的<code translate="no">M</code> 通常能<strong>提升準確度</strong>，但<strong>會增加記憶體開銷</strong>，<strong>並減緩索引建置與搜尋速度</strong>。若資料集維度較高，或當高召回率至關重要時，請考慮增加<code translate="no">M</code> 。</p><p>若記憶體使用量與搜尋速度是首要考量，請考慮降低<code translate="no">M</code> 的值。</p><p>在大多數情況下，我們建議您將數值設定在此範圍內：[5, 100]。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>在建立索引時，用於評估連接的候選鄰居數量。對於每個新元素，系統會評估較大的候選鄰居池，但實際建立的連接最大數量仍受<code translate="no">M</code> 限制。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1,<em>int_max</em>]</p><p><strong>預設值</strong>：<code translate="no">360</code></p></td>
     <td><p>較高的 `<code translate="no">efConstruction</code> ` 通常會產生<strong>更精確的索引，</strong>因為會探索更多潛在的連結。然而，這也會導致<strong>建立索引的時間更長，且</strong>在建立過程中<strong>增加記憶體使用量</strong>。若需提升精確度，請考慮增加 `<code translate="no">efConstruction</code> `，特別是在索引時間並非關鍵考量的情境下。</p><p>若資源限制是考量因素，請考慮降低<code translate="no">efConstruction</code> 以加快索引建構速度。</p><p>在大多數情況下，我們建議您將數值設定在此範圍內：[50, 500]。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">索引專屬搜尋參數<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出了<a href="/docs/zh-hant/hnsw.md#Search-on-index">在索引上進行搜尋</a>時，可於<code translate="no">search_params.params</code> 中設定的參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調校建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>控制最近鄰檢索過程中的搜尋範圍。此參數決定將造訪並評估多少個節點作為潛在的最近鄰。此參數僅影響搜尋過程，且僅適用於圖的底層。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1,<em>int_max</em>]</p><p><strong>預設值</strong>：<code translate="no">max(limit, 16)</code> （適用於一般 kNN 搜尋）；<code translate="no">512</code> （適用於範圍搜尋）。</p><p>對於一般 kNN 搜尋，顯式設定的<code translate="no">ef</code> 必須大於或等於<code translate="no">limit</code> （即要回傳的最近鄰節點數）。</p></td>
     <td><p>較大的<code translate="no">ef</code> 通常會因納入更多潛在鄰居而<strong>提高搜尋準確度</strong>。然而，這也會<strong>增加搜尋時間</strong>。當達成高召回率至關重要，且搜尋速度並非首要考量時，建議考慮增加<code translate="no">ef</code> 。</p><p>若需優先確保搜尋速度，特別是當搜尋精度稍有下降尚可接受時，請考慮降低<code translate="no">ef</code> 的數值。</p><p>在大多數情況下，我們建議您將數值設定在此範圍內：[K, 10K]。</p></td>
   </tr>
</table>
