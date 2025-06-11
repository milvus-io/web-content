---
id: gpu-ivf-flat.md
title: GPU_IVF_FLAT
summary: >-
  GPU_IVF_FLAT 索引是 IVF_FLAT 索引的 GPU 加速版本，專為 GPU 環境設計。它將向量資料分割成 nlist
  叢集單位，並透過首先比較目標查詢向量與每個叢集的中心點來計算相似度。透過調整 nprobe
  參數，只有最有希望的叢集才會被搜尋，這可以減少查詢時間，同時維持精確度與速度之間的平衡。有關基礎概念的詳細資訊，請參閱 IVF_FLAT。
---
<h1 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>GPU_IVF_FLAT</strong>索引是 IVF_FLAT 索引的 GPU 加速版本，專為 GPU 環境設計。它將向量資料分割成<code translate="no">nlist</code> 叢集單位，並透過首先比較目標查詢向量與每個叢集的中心點來計算相似度。透過調整<code translate="no">nprobe</code> 參數，只有最有希望的叢集才會被搜尋，這可以減少查詢時間，同時維持精確度與速度之間的平衡。有關基礎概念的詳細資訊，請參閱<a href="/docs/zh-hant/ivf-flat.md">IVF_FLAT</a>。</p>
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
    </button></h2><p>要在 Milvus 中建立向量場的<code translate="no">GPU_IVF_FLAT</code> 索引，請使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的附加參數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>, <span class="hljs-comment"># Number of clusters for the index</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此設定中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引類型。在本範例中，設定值為<code translate="no">GPU_IVF_FLAT</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用於計算向量間距離的方法。詳情請參閱<a href="/docs/zh-hant/metric.md">公制類型</a>。</p></li>
<li><p><code translate="no">params</code>:建立索引的附加設定選項。</p>
<ul>
<li><code translate="no">nlist</code>:分割資料集的叢集數。</li>
</ul>
<p>要瞭解<code translate="no">GPU_IVF_FLAT</code> 索引可用的更多建立參數，請參閱<a href="/docs/zh-hant/gpu-ivf-flat.md#Index-building-params">索引建立參數</a>。</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><p><code translate="no">params</code>:在索引上搜尋的其他設定選項。</p>
<ul>
<li><code translate="no">nprobe</code>:要搜尋的群集數量。</li>
</ul>
<p>要瞭解<code translate="no">GPU_IVF_FLAT</code> 索引可用的更多搜尋參數，請參閱<a href="/docs/zh-hant/gpu-ivf-flat.md#Index-specific-search-params">特定</a>於索引的搜尋參數。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立參數</h3><p>下表列出了<a href="/docs/zh-hant/gpu-ivf-flat.md#Build-index">建立索引</a>時可在<code translate="no">params</code> 中設定的參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>在建立索引時，使用 k-means 演算法建立的叢集數目。 每個叢集由一個中心點代表，儲存向量清單。增加此參數可減少每個叢集中的向量數量，從而建立更小、更集中的分割。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1, 65536]</p>
<p><strong>預設值</strong>：<code translate="no">128</code></p></td>
     <td><p>較大的<code translate="no">nlist</code> 值會透過建立更精細的叢集來改善召回率，但會增加索引建立時間。根據資料集大小和可用資源進行最佳化。 在大多數情況下，我們建議您設定此範圍內的值：[32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定於索引的搜尋參數</h3><p>下表列出<a href="/docs/zh-hant/gpu-ivf-flat.md#Search-on-index">在索引上搜尋時</a>，可在<code translate="no">search_params.params</code> 中設定的參數。</p>
<table>
   <tr>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>搜尋候選資料的叢集數。 較高的值允許搜尋更多的叢集，藉由擴大搜尋範圍來改善召回率，但代價是增加查詢延遲。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1,<em>nlist］</em></p>
<p><strong>預設值</strong>：<code translate="no">8</code></p></td>
     <td><p>增加此值可提高召回率，但可能會減慢搜尋速度。請依<code translate="no">nlist</code> 的比例設定<code translate="no">nprobe</code> ，以平衡速度與精確度。</p>
<p>在大多數情況下，我們建議您設定此範圍內的值：[1, nlist]。</p></td>
   </tr>
</table>
