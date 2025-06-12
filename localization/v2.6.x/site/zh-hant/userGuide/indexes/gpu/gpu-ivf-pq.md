---
id: gpu-ivf-pq.md
title: GPU_IVF_PQ
summary: >-
  GPU_IVF_PQ 索引以 IVF_PQ 概念為基礎，結合了反向檔案聚類 (inverted file clustering) 與 Product
  Quantization (PQ)，PQ 可將高維向量分解成較小的子空間，並將其量化以進行有效率的相似性搜尋。GPU_IVF_PQ 是專為 GPU
  環境所設計，可利用平行處理來加速計算，並有效處理大規模向量資料。有關基礎概念的詳細資訊，請參閱 IVF_PQ。
---
<h1 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>GPU_IVF_PQ</strong>索引以<strong>IVF_PQ</strong>概念為基礎，結合了反向檔案聚類 (inverted file clustering) 與 Product Quantization (PQ)，PQ 可將高維向量分解成較小的子空間，並將其量化以進行有效率的相似性搜尋。GPU_IVF_PQ 是專為 GPU 環境所設計，可利用平行處理來加速計算，並有效處理大規模向量資料。有關基礎概念的詳細資訊，請參閱<a href="/docs/zh-hant/ivf-pq.md">IVF_PQ</a>。</p>
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
    </button></h2><p>要在 Milvus 的向量場上建立<code translate="no">GPU_IVF_PQ</code> 索引，請使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的其他參數。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此設定中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引類型。在本範例中，設定值為<code translate="no">GPU_IVF_PQ</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用來計算向量間距離的方法。支援的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。如需詳細資訊，請參閱<a href="/docs/zh-hant/metric.md">公制類型</a>。</p></li>
<li><p><code translate="no">params</code>:建立索引的附加設定選項。</p>
<ul>
<li><code translate="no">m</code>:將向量分割成的子向量數量。</li>
</ul>
<p>要瞭解<code translate="no">GPU_IVF_PQ</code> 索引可用的更多建立參數，請參閱<a href="/docs/zh-hant/gpu-ivf-pq.md#Index-building-params">索引建立參數</a>。</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
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
<p>要瞭解<code translate="no">GPU_IVF_PQ</code> 索引可用的更多搜尋參數，請參閱<a href="/docs/zh-hant/gpu-ivf-pq.md#Index-specific-search-params">特定</a>於索引的搜尋參數。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立參數</h3><p>下表列出了<a href="/docs/zh-hant/gpu-ivf-pq.md#Build-index">建立索引</a>時可在<code translate="no">params</code> 中設定的參數。</p>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>在建立索引時使用 k-means 演算法建立的叢集數目。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1, 65536]</p>
<p><strong>預設值</strong>：<code translate="no">128</code></p></td>
     <td><p>較大的<code translate="no">nlist</code> 值會透過建立更精細的叢集來改善回復率，但會增加索引建立時間。根據資料集大小和可用資源進行最佳化。 在大多數情況下，我們建議您設定此範圍內的值：[32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>在量化過程中，將每個高維向量分割成的子向量（用於量化）數量。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1, 65536]</p>
<p><strong>預設值</strong>：無</p></td>
     <td><p>較高的<code translate="no">m</code> 值可以提高精確度，但也會增加計算複雜度和記憶體使用量。<code translate="no">m</code> 必須是向量維度<em>(D</em>) 的除數，以確保正確的分解。一般建議的值是<em>m = D/2</em>。</p>
<p>在大多數情況下，我們建議您在這個範圍內設定一個值：[D/8, D]。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>用來以壓縮形式表示每個子向量中心點索引的位元數。每個編碼本將包含 $2^{textit{nbits}}$ 的中心點。例如，如果<code translate="no">nbits</code> 設定為 8，則每個子向量將由 8 位元的 centroid 索引表示。如此一來，該子向量的編碼簿中就有 2^8$ (256) 個可能的中心點。</p></td>
     <td><p><strong>類型</strong>：整數<strong>範圍</strong>：[1, 64]</p>
<p><strong>預設值</strong>：<code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> 較高的值允許較大的編碼簿，可能會導致原始向量的表示更精確。在大多數情況下，我們建議您設定此範圍內的值：[1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>決定是否在 GPU 記憶體中快取原始資料集。可能的值：</p>
<ul>
<li><p><code translate="no">"true"</code>:快取原始資料集，藉由精煉搜尋結果來提高召回率。</p></li>
<li><p><code translate="no">"false"</code>:不快取原始資料集以節省 GPU 記憶體。</p></li>
</ul></td>
     <td><p><strong>類型</strong>：字串<strong>範圍</strong>：[<code translate="no">"true"</code>,<code translate="no">"false"</code>]</p>
<p><strong>預設值</strong>：<code translate="no">"false"</code></p></td>
     <td><p>將其設定為<code translate="no">"true"</code> ，可透過精煉搜尋結果提高召回率，但會使用更多 GPU 記憶體。設定為<code translate="no">"false"</code> 則可節省 GPU 記憶體。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定於索引的搜尋參數</h3><p>下表列出<a href="/docs/zh-hant/gpu-ivf-pq.md#Search-on-index">在索引上搜尋時</a>，可在<code translate="no">search_params.params</code> 中設定的參數。</p>
<table>
   <tr>
     <th></th>
     <th><p>參數</p></th>
     <th><p>說明</p></th>
     <th><p>值範圍</p></th>
     <th><p>調整建議</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>搜尋候選人的叢集數。</p></td>
     <td><p><strong>類型</strong>： 整數整數<strong>範圍</strong>：[1、<em>nlist］</em></p>
<p><strong>預設值</strong>：<code translate="no">8</code></p></td>
     <td><p>較高的值允許搜尋更多的叢集，藉由擴大搜尋範圍來改善召回率，但代價是增加查詢延遲。請將<code translate="no">nprobe</code> 與<code translate="no">nlist</code> 成比例設定，以平衡速度與精確度。</p>
<p>在大多數情況下，我們建議您設定此範圍內的值：[1, nlist]。</p></td>
   </tr>
</table>
