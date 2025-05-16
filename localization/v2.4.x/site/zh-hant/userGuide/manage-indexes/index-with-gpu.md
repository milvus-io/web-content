---
id: index-with-gpu.md
order: 3
summary: 本指南說明如何在 Milvus 中建立支援 GPU 的索引，以提升搜尋效能。
title: 使用 GPU 建立索引
---
<h1 id="Index-with-GPU" class="common-anchor-header">使用 GPU 建立索引<button data-href="#Index-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南概述了在 Milvus 中使用 GPU 支援建立索引的步驟，這可以顯著改善高吞吐量和高召回情境下的搜尋效能。有關 Milvus 支援的 GPU 索引類型的詳細資訊，請參閱<a href="/docs/zh-hant/v2.4.x/gpu_index.md">GPU 索引</a>。</p>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">為 GPU 記憶體控制配置 Milvus 設定<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 使用全局繪圖記憶體池來分配 GPU 記憶體。</p>
<p>它在<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus 配置檔中</a>支援兩個參數<code translate="no">initMemSize</code> 和<code translate="no">maxMemSize</code> 。記憶體池大 小初始設定為<code translate="no">initMemSize</code> ，超過此限制後會自動擴充至<code translate="no">maxMemSize</code> 。</p>
<p>當 Milvus 啟動時，預設的<code translate="no">initMemSize</code> 是可用 GPU 記憶體的 1/2，而預設的<code translate="no">maxMemSize</code> 是等於所有可用的 GPU 記憶體。</p>
<p>在 Milvus 2.4.1 之前（包括 2.4.1 版），Milvus 使用統一的 GPU 記憶池。對於 2.4.1 之前的版本 (包括 2.4.1 版)，建議將這兩個值都設定為 0。</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>從 Milvus 2.4.1 起，GPU 記憶體池僅在搜尋時用於臨時 GPU 資料。因此，建議將其設定為 2048 和 4096。</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-an-index" class="common-anchor-header">建立索引<button data-href="#Build-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>以下範例說明如何建立不同類型的 GPU 索引。</p>
<h3 id="Prepare-index-parameters" class="common-anchor-header">準備索引參數</h3><p>設定 GPU 索引參數時，請定義<strong>index_type</strong>、<strong>metric_type</strong> 和<strong>params</strong>：</p>
<ul>
<li><p><strong>index_type</strong><em>(字串</em>)：用於加速向量搜尋的索引類型。有效的選項包括<strong>GPU_CAGRA</strong>、<strong>GPU_IVF_FLAT</strong>、<strong>GPU_IVF_PQ</strong> 及<strong>GPU_BRUTE_FORCE</strong>。</p></li>
<li><p><strong>metric_type</strong><em>(字串</em>)：用來衡量向量相似性的度量類型。有效的選項是<strong>IP</strong>和<strong>L2</strong>。</p></li>
<li><p><strong>params</strong><em>(dict</em>)：特定於索引的建立參數。此參數的有效選項取決於索引類型。</p></li>
</ul>
<p>以下是不同索引類型的配置範例：</p>
<ul>
<li><p><strong>GPU_CAGRA</strong>索引</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_CAGRA&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&#x27;intermediate_graph_degree&#x27;</span>: <span class="hljs-number">64</span>,
        <span class="hljs-string">&#x27;graph_degree&#x27;</span>: <span class="hljs-number">32</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>params</strong>的可能選項包括</p>
<ul>
<li><p><strong>intermediate_graph_degree</strong><em>(int</em>)：透過在剪枝之前確定圖形的程度來影響召回率和建立時間。建議值為<strong>32</strong>或<strong>64</strong>。</p></li>
<li><p><strong>graph_degree</strong><em>(int</em>)：透過設定剪枝後的圖形程度來影響搜尋效能和召回率。通常，它是<strong>intermediate_graph_degree 的</strong>一半。這兩個程度之間的差異越大，建立時間就越長。它的值必須小於<strong>intermediate_graph_degree</strong> 的值。</p></li>
<li><p><strong>build_algo</strong><em>(字串</em>)：選擇剪枝前的圖形生成演算法。可能的選項：</p>
<ul>
<li><p><strong>IVF_PQ</strong>: 提供較高的品質，但建立時間較慢。</p></li>
<li><p><strong>NN_DESCENT</strong>：提供較快的建立速度，但召回率可能較低。</p></li>
</ul></li>
<li><p><strong>cache_dataset_on_device</strong><em>(string</em>,<strong>"true" |</strong> <strong>"false")</strong>：決定是否在 GPU 記憶體中快取原始資料集。將此設定為<strong>"true 「</strong>可以精煉搜尋結果，從而提高召回率，而設定為<strong>」false</strong> <strong>"</strong>則可節省 GPU 記憶體。</p></li>
</ul></li>
<li><p><strong>GPU_IVF_FLAT</strong>或<strong>GPU_IVF_PQ</strong>索引</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Or GPU_IVF_PQ</span>
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>params</strong>選項與<strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a></strong>和<strong><a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong> 所使用的相同。</p></li>
<li><p><strong>GPU_BRUTE_FORCE</strong>索引</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>: <span class="hljs-string">&#x27;GPU_BRUTE_FORCE&#x27;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>不需要額外的<strong>params</strong>設定。</p></li>
</ul>
<h3 id="Build-index" class="common-anchor-header">建立索引</h3><p>在<strong>index_params</strong> 中設定索引參數後，呼叫 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/create_index.md"><code translate="no">create_index()</code></a>方法來建立索引。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get an existing collection</span>
collection = Collection(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)

collection.create_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field on which an index is built</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search" class="common-anchor-header">搜尋<button data-href="#Search" class="anchor-icon" translate="no">
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
    </button></h2><p>建立 GPU 索引後，下一步就是在進行搜尋前準備搜尋參數。</p>
<h3 id="Prepare-search-parameters" class="common-anchor-header">準備搜尋參數</h3><p>以下是不同索引類型的配置範例：</p>
<ul>
<li><p><strong>GPU_BRUTE_FORCE</strong>索引</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>不需要額外的<strong>參數</strong>配置。</p></li>
<li><p><strong>GPU_CAGRA</strong>索引</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;min_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;max_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;team_size&quot;</span>: <span class="hljs-number">0</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>主要搜尋參數包括</p>
<ul>
<li><p><strong>itopk_size</strong>：決定搜尋過程中保留的中間結果大小。較大的值可能會提高召回率，但卻會犧牲搜尋效能。它應該至少等於最終 top-k<strong>(限制</strong>) 值，通常是 2 的幂次 (例如 16、32、64、128)。</p></li>
<li><p><strong>search_width</strong>：指定搜尋期間進入 CAGRA 圖形的入口點數量。增加此值可提高召回率，但可能會影響搜尋效能。</p></li>
<li><p><strong>min_iterations</strong>/<strong>max</strong><strong>_</strong> <strong>iterations</strong>：這些參數控制搜尋的迭代程序。預設值為<strong>0</strong>，CAGRA 會根據<strong>itopk_size</strong>和<strong>search_width</strong> 自動決定迭代次數。手動調整這些值有助於平衡效能與精確度。</p></li>
<li><p><strong>team_size</strong>：指定用於計算 GPU 公制距離的 CUDA 線程數目。常見的值是 2 的幂數，最高為 32 (例如 2、4、8、16、32)。它對搜尋效能影響不大。預設值是<strong>0</strong>，Milvus 會根據向量的維度自動選擇<strong>team_size</strong>。</p></li>
</ul></li>
<li><p><strong>GPU_IVF_FLAT</strong>或<strong>GPU_IVF_PQ</strong>索引</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}
<button class="copy-code-btn"></button></code></pre>
<p>這兩種索引類型的搜尋參數與<strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a>和<a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong> 所使用的相似。如需詳細資訊，請參閱<a href="https://milvus.io/docs/search.md#Prepare-search-parameters">進行向量相似性搜尋</a>。</p></li>
</ul>
<h3 id="Conduct-a-search" class="common-anchor-header">進行搜尋</h3><p>使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search.md"><code translate="no">search()</code></a>方法在 GPU 索引上執行向量相似性搜尋。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load data into memory</span>
collection.load()

collection.search(
    data=[[query_vector]], <span class="hljs-comment"># Your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field</span>
    param=search_params,
    limit=<span class="hljs-number">100</span> <span class="hljs-comment"># Number of the results to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">限制<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 GPU 索引時，請注意某些限制：</p>
<ul>
<li><p>對於<strong>GPU_IVF_FLAT</strong>，<strong>limit</strong>的最大值為 1024。</p></li>
<li><p>對於<strong>GPU_IVF_PQ</strong>和<strong>GPU_CAGRA</strong>，<strong>limit</strong>的最大值為 1024。</p></li>
<li><p>雖然<strong>GPU_BRUTE_FORCE</strong> 沒有設定<strong>限制</strong>，但建議不要超過 4096，以避免潛在的效能問題。</p></li>
<li><p>目前，GPU 索引不支援 COSINE 距離。如果需要 COSINE 距離，應該先將資料規格化，然後再使用內積 (IP) 距離來替代。</p></li>
<li><p>不完全支援 GPU 索引的載入 OOM 保護，太多資料可能會導致 QueryNode 當機。</p></li>
<li><p>GPU 索引不支援<a href="https://milvus.io/docs/single-vector-search.md#Range-search">範圍</a>搜尋及<a href="https://milvus.io/docs/single-vector-search.md#Grouping-searchh">群組搜尋等</a>搜尋功能。</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">常見問題<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>何時適合使用 GPU 索引？</strong></p>
<p>GPU 索引特別適用於需要高吞吐量或高召回率的情況。例如，在處理大量批次時，GPU 索引的吞吐量可比 CPU 索引高出 100 倍之多。在批次較小的情況下，GPU 索引在效能上仍遠遠優於 CPU 索引。此外，如果需要快速插入資料，整合 GPU 可大幅加快建立索引的過程。</p></li>
<li><p><strong>GPU 索引（如 CAGRA、GPU_IVF_PQ、GPU_IVF_FLAT 和 GPU_BRUTE_FORCE）最適合哪些應用場合？</strong></p>
<p>CAGRA 索引非常適合需要增強效能的應用環境，儘管其代價是消耗更多的記憶體。對於以節省記憶體為優先考量的環境，<strong>GPU_IVF_PQ</strong>索引可幫助將儲存需求降至最低，儘管這會帶來較高的精確度損失。<strong>GPU_IVF_FLAT</strong>索引是一個平衡的選擇，提供效能與記憶體使用量之間的折衷方案。最後，<strong>GPU_BRUTE_FORCE</strong>索引專為窮盡搜尋作業而設計，透過執行遍歷搜尋來保證召回率為 1。</p></li>
</ul>
