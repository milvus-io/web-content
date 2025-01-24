---
id: ivf-flat.md
order: 1
summary: 本文將介紹 Milvus 中的 IVF_FLAT 索引。
title: IVF_FLAT
---
<h1 id="IVFFLAT" class="common-anchor-header">IVF_FLAT<button data-href="#IVFFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>IVF_FLAT</strong>索引是一種可以提高浮點向量搜尋效能的索引演算法。</p>
<p>此索引類型適用於需要快速查詢回應和高準確度的大型資料集，尤其是當聚類資料集可縮小搜尋空間，且有足夠記憶體儲存聚類資料時。</p>
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
    </button></h2><p>詞彙<strong>IVF_FLAT</strong>代表<strong>Inverted File Flat</strong>，它概括了其索引和搜尋浮點向量的雙層方法：</p>
<ul>
<li><strong>Inverted File (IVF)：</strong>指使用<a href="https://en.wikipedia.org/wiki/K-means_clustering">k-means 聚類將</a>向量空間<a href="https://en.wikipedia.org/wiki/K-means_clustering">聚類</a>為可管理的區域。每個簇都有一個<strong>中心點</strong>，作為簇內向量的參考點。</li>
<li><strong>Flat (扁平)：</strong>表示在每個叢集內，向量都以原始形式 (扁平結構) 儲存，不做任何壓縮或量化，以進行精確的距離計算。</li>
</ul>
<p>下圖顯示其運作方式：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-1.png" alt="ivf-flat-1.png" class="doc-image" id="ivf-flat-1.png" />
   </span> <span class="img-wrapper"> <span>ivf-flat-1.png</span> </span></p>
<p>這種索引方法可以加快搜尋過程，但也有潛在的缺點：找到的最接近查詢嵌入的候選嵌入可能不是確切的最近嵌入。如果與查詢嵌入區最近的嵌入區所處的叢集與根據最近中心點選擇的叢集不同，就可能發生這種情況（請參閱下面的可視化圖）。</p>
<p>為了解決這個問題，<strong>IVF_FLAT</strong>提供了兩個我們可以調整的超參數：</p>
<ul>
<li><code translate="no">nlist</code>:指定使用 k-means 演算法建立的分割數目。</li>
<li><code translate="no">nprobe</code>:指定在搜尋候選人時要考慮的分區數目。</li>
</ul>
<p>現在，如果我們將<code translate="no">nprobe</code> 設成 3，而不是 1，就會得到以下結果：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-2.png" alt="ivf-flat-2.png" class="doc-image" id="ivf-flat-2.png" />
   </span> <span class="img-wrapper"> <span>ivf-flat-2.png</span> </span></p>
<p>透過增加<code translate="no">nprobe</code> 的值，您可以在搜尋中包含更多的分割區，這有助於確保不會遺漏與查詢最接近的嵌入，即使它位於不同的分割區中。不過，這樣做的代價是增加搜尋時間，因為需要評估更多的候選項目。有關索引參數調整的詳細資訊，請參閱<a href="#index-params">索引參數</a>。</p>
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
    </button></h2><p>要在 Milvus 的向量場上建立<code translate="no">IVF_FLAT</code> 索引，請使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的附加參數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters for the index</span>
    } <span class="hljs-comment"># Index building params</span>
)

<button class="copy-code-btn"></button></code></pre>
<p>在此設定中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引類型。在本範例中，設定值為<code translate="no">IVF_FLAT</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用來計算向量間距離的方法。支援的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/metric.md">公制類型</a>。</p></li>
<li><p><code translate="no">params</code>:建立索引的附加設定選項。</p>
<ul>
<li><code translate="no">nlist</code>:分割資料集的叢集數。</li>
</ul>
<p>要瞭解<code translate="no">IVF_FLAT</code> 索引可用的更多建立參數，請參閱<a href="#Index-building-params">索引建立參數</a>。</p></li>
</ul>
<p>一旦配置好索引參數，您就可以直接使用<code translate="no">create_index()</code> 方法或在<code translate="no">create_collection</code> 方法中傳入索引參數來建立索引。如需詳細資訊，請參閱<a href="/docs/zh-hant/create-collection.md">建立集合</a>。</p>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: 10, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  <span class="hljs-comment"># Query vector</span>
    <span class="hljs-built_in">limit</span>=3,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)

<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><p><code translate="no">params</code>:在索引上搜尋的其他設定選項。</p>
<ul>
<li><code translate="no">nprobe</code>:要搜尋的群集數量。</li>
</ul>
<p>要瞭解<code translate="no">IVF_FLAT</code> 索引可用的更多搜尋參數，請參閱<a href="#index-specific-search-params">特定</a>於索引的搜尋參數。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立參數</h3><p>下表列出了<a href="#Build-index">建立索引</a>時可在<code translate="no">params</code> 中設定的參數。</p>
<table>
<thead>
<tr><th><strong>參數</strong></th><th><strong>說明</strong></th><th><strong>值範圍</strong></th><th><strong>調整建議</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>在建立索引時，使用 k-means 演算法建立的叢集數量。每個叢集由一個中心點代表，儲存向量清單。增加此參數可減少每個叢集中的向量數量，建立更小、更集中的分割。</td><td><strong>類型</strong>：整數<br><strong>範圍：</strong>[1, 65536]<br><strong>預設值</strong>：<code translate="no">128</code></td><td>較大的<code translate="no">nlist</code> 值會透過建立更精細的叢集來改善召回率，但會增加索引建立時間。根據資料集大小和可用資源進行最佳化。在大多數情況下，我們建議您設定此範圍內的值：[32, 4096].</td></tr>
</tbody>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定於索引的搜尋參數</h3><p>下表列出<a href="#Search-on-index">在索引上搜尋時</a>，可在<code translate="no">search_params.params</code> 中設定的參數。</p>
<table>
<thead>
<tr><th><strong>參數</strong></th><th><strong>說明</strong></th><th><strong>值範圍</strong></th><th><strong>調整建議</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>搜尋候選資料的叢集數。較高的值允許搜尋更多的叢集，藉由擴大搜尋範圍來改善召回率，但代價是增加查詢延遲。</td><td><strong>類型</strong>：整數<br><strong>範圍：</strong>[1,<em>nlist］</em><br><strong>預設值</strong>：<code translate="no">8</code></td><td>增加此值可提高召回率，但可能會減慢搜尋速度。請依<code translate="no">nlist</code> 的比例設定<code translate="no">nprobe</code> ，以平衡速度與精確度。<br>在大多數情況下，我們建議您設定此範圍內的值：[1, nlist]。</td></tr>
</tbody>
</table>
