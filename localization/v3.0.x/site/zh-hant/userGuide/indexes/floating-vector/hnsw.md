---
id: hnsw.md
title: HNSW
summary: HNSW 索引是一種基於圖的索引演算法，可以提高搜尋高維浮動向量時的效能。它具有優異的搜尋準確性和低延遲，但需要較高的記憶體開銷來維持其階層圖結構。
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
    </button></h1><p><strong>HNSW</strong>索引是一種<strong>基於圖的</strong>索引演算法，可以提高搜尋高維浮動向量時的效能。它具有<strong>優異的</strong>搜尋準確性和<strong>低延遲</strong>，但需要<strong>較高的</strong>記憶體開銷來維持其階層圖結構。</p>
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
    </button></h2><p>Hierarchical Navigable Small World (HNSW) 演算法會建立多層圖形，有點像是有不同縮放程度的地圖。<strong>底層</strong>包含所有資料點，<strong>上層則</strong>由從底層取樣的資料點子集組成。</p>
<p>在這個層級架構中，每層都包含代表資料點的節點，這些節點由表示其接近程度的邊連接。上層提供長距離跳躍以快速接近目標，而下層則可進行細粒度搜尋以獲得最精確的結果。</p>
<p>以下是它的運作方式：</p>
<ol>
<li><p><strong>入口點</strong>：搜尋始於頂層的固定入口點，也就是圖形中的預定節點。</p></li>
<li><p><strong>貪婪搜尋</strong>：演算法貪婪地移動到目前層的最近鄰居，直到無法再接近查詢向量為止。上層發揮導航作用，扮演粗略過濾器的角色，為下層的精細搜尋找出潛在入口點。</p></li>
<li><p><strong>層級下降</strong>：一旦當前層達到<strong>局部最小值</strong>，演算法就會跳到下層，使用預先建立的連線，並重複貪婪搜尋。</p></li>
<li><p><strong>最終</strong> <strong>精煉</strong>：此過程會持續到達最底層為止，在最底層會有最後的精煉步驟找出最近的鄰居。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" />
   </span> <span class="img-wrapper"> <span>HNSW</span> </span></p>
<p>HNSW 的效能取決於幾個控制圖形結構和搜尋行為的關鍵參數。這些參數包括</p>
<ul>
<li><p><code translate="no">M</code>:每個節點在階層結構的每一層圖中所能擁有的最大邊緣或連線數。<code translate="no">M</code> 越高，圖形就越密集，並且會增加回復率和精確度，因為搜尋有更多路徑可以探索，這也會消耗更多的記憶體，並且會因為額外的連線而減慢插入時間。如上圖所示，<strong>M = 5</strong>表示 HNSW 圖中的每個節點最多與其他 5 個節點直接連接。這創造了一個中度密集的圖結構，其中節點有多條路徑可以到達其他節點。</p></li>
<li><p><code translate="no">efConstruction</code>:索引建構時所考慮的候選數。較高的<code translate="no">efConstruction</code> 通常會產生品質較佳的圖形，但需要較多時間來建立。</p></li>
<li><p><code translate="no">ef</code>:搜尋過程中評估的鄰居數量。增加<code translate="no">ef</code> 可提高找到最近鄰居的可能性，但會減慢搜尋過程。</p></li>
</ul>
<p>有關如何調整這些設定以符合您需求的詳細資訊，請參閱<a href="/docs/zh-hant/hnsw.md#Index-params">索引參數</a>。</p>
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
    </button></h2><p>要在 Milvus 的向量場上建立<code translate="no">HNSW</code> 索引，請使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的附加參數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

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
<button class="copy-code-btn"></button></code></pre>
<p>在此設定中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引類型。在本範例中，設定值為<code translate="no">HNSW</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用來計算向量間距離的方法。支援的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/metric.md">公制類型</a>。</p></li>
<li><p><code translate="no">params</code>:建立索引的附加設定選項。</p>
<ul>
<li><p><code translate="no">M</code>:每個節點可以連線的最大鄰居數量。</p></li>
<li><p><code translate="no">efConstruction</code>:索引建構期間考慮連接的候選鄰居數量。</p></li>
</ul>
<p>若要瞭解<code translate="no">HNSW</code> 索引可用的更多建置參數，請參閱<a href="/docs/zh-hant/hnsw.md#Index-building-params">索引建置參數</a>。</p></li>
</ul>
<p>索引參數設定完成後，您可以直接使用<code translate="no">create_index()</code> 方法或在<code translate="no">create_collection</code> 方法中傳入索引參數來建立索引。如需詳細資訊，請參閱<a href="/docs/zh-hant/create-collection.md">建立集合</a>。</p>
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
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><p><code translate="no">params</code>:在索引上搜尋的其他設定選項。</p>
<ul>
<li><code translate="no">ef</code>:搜尋時要考慮的鄰居數。</li>
</ul>
<p>若要瞭解<code translate="no">HNSW</code> 索引可用的更多搜尋參數，請參閱<a href="/docs/zh-hant/hnsw.md#Index-specific-search-params">特定</a>於索引的搜尋參數。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立參數</h3><p>下表列出了<a href="/docs/zh-hant/hnsw.md#Build-index">建立索引</a>時可在<code translate="no">params</code> 中設定的參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>每個節點在圖表中可擁有的最大連線（或邊緣）數量，包括傳出和傳入的邊緣。此參數直接影響索引建構和搜尋。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[2, 2048]</p><p><strong>預設值</strong>：<code translate="no">30</code> (每個節點最多可有 30 條出站邊和 30 條入站邊)</p></td>
     <td><p>較大的<code translate="no">M</code> 通常會帶來<strong>較高的精確度</strong>，但會<strong>增加記憶體開銷</strong>，<strong>並減慢索引建立和搜尋的速度</strong>。對於高維度的資料集或高召回率非常重要時，請考慮增加<code translate="no">M</code> 。</p><p>如果記憶體佔用量和搜尋速度是主要考量，則考慮降低<code translate="no">M</code> 。</p><p>在大多數情況下，我們建議您在此範圍內設定一個值：[5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>索引建構期間考慮連接的候選鄰居數量。每個新元素都會評估更多的候選鄰居，但實際建立的最大連線數仍受限於<code translate="no">M</code> 。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1，<em>int_max］</em></p><p><strong>預設值</strong>：<code translate="no">360</code></p></td>
     <td><p>較高的<code translate="no">efConstruction</code> 通常會產生<strong>更精確的索引</strong>，因為會探索更多的潛在連線。不過，這也會導致建立<strong>索引的時間變長，並增加</strong>建構時的<strong>記憶體使用量</strong>。考慮增加<code translate="no">efConstruction</code> 以提高精確度，尤其是在索引時間不太重要的情況下。</p><p>在資源有限的情況下，可考慮降低<code translate="no">efConstruction</code> ，以加快索引建置速度。</p><p>在大多數情況下，我們建議您設定此範圍內的值：[50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定於索引的搜尋參數</h3><p>下表列出<a href="/docs/zh-hant/hnsw.md#Search-on-index">在索引上搜尋時</a>，可在<code translate="no">search_params.params</code> 中設定的參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>控制最近鄰檢索時的搜尋範圍。它決定有多少節點會被造訪並評估為潛在的最近鄰居。  此參數僅影響搜尋過程，且僅適用於圖的底層。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1、<em>int_max］</em></p><p><strong>預設值</strong>:<em>limit</em>(要回傳的 TopK 最近鄰居)</p></td>
     <td><p>較大的<code translate="no">ef</code> 通常會導致<strong>較高的搜尋準確度</strong>，因為會考慮更多的潛在鄰居。不過，這也會<strong>增加搜尋時間</strong>。當達到高召回率是關鍵，而搜尋速度較不重要時，請考慮增加<code translate="no">ef</code> 。</p><p>考慮降低<code translate="no">ef</code> 以優先加快搜尋速度，尤其是在可以接受稍微降低精確度的情況下。</p><p>在大多數情況下，我們建議您設定此範圍內的值：[K, 10K]。</p></td>
   </tr>
</table>
