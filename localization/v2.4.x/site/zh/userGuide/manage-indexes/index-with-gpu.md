---
id: index-with-gpu.md
order: 3
summary: 本指南介绍如何在 Milvus 中建立支持 GPU 的索引，以提高搜索性能。
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
    </button></h1><p>本指南概述了在 Milvus 中建立支持 GPU 的索引的步骤，这可以显著提高高吞吐量和高调用场景中的搜索性能。有关 Milvus 支持的 GPU 索引类型的详细信息，请参阅<a href="/docs/zh/v2.4.x/gpu_index.md">GPU 索引</a>。</p>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">为 GPU 内存控制配置 Milvus 设置<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 使用全局图形内存池分配 GPU 内存。</p>
<p>它支持<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus 配置文件</a>中的两个参数<code translate="no">initMemSize</code> 和<code translate="no">maxMemSize</code> 。显存池大小初始设置为<code translate="no">initMemSize</code> ，超过此限制后将自动扩展至<code translate="no">maxMemSize</code> 。</p>
<p>Milvus 启动时，默认<code translate="no">initMemSize</code> 为可用 GPU 内存的 1/2，默认<code translate="no">maxMemSize</code> 等于所有可用 GPU 内存。</p>
<p>在 Milvus 2.4.1（包括 2.4.1 版）之前，Milvus 使用统一的 GPU 内存池。对于 2.4.1 之前的版本（包括 2.4.1 版），建议将这两个值都设为 0。</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>从 Milvus 2.4.1 起，GPU 内存池仅用于搜索期间的临时 GPU 数据。因此，建议将其设置为 2048 和 4096。</p>
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
    </button></h2><p>以下示例演示了如何建立不同类型的 GPU 索引。</p>
<h3 id="Prepare-index-parameters" class="common-anchor-header">准备索引参数</h3><p>设置 GPU 索引参数时，请定义<strong>index_type</strong>、<strong>metric_type</strong> 和<strong>params</strong>：</p>
<ul>
<li><p><strong>index_type</strong><em>（字符串</em>）：用于加速向量搜索的索引类型。有效选项包括<strong>GPU_CAGRA</strong>、<strong>GPU_IVF_FLAT</strong>、<strong>GPU_IVF_PQ</strong> 和<strong>GPU_BRUTE_FORCE</strong>。</p></li>
<li><p><strong>metric_type</strong><em>（字符串</em>）：用于衡量向量相似性的度量类型。有效选项为<strong>IP</strong>和<strong>L2</strong>。</p></li>
<li><p><strong>params</strong><em>（dict</em>）：特定于索引<em>的</em>构建<strong>参数</strong>：特定于索引的构建参数。该参数的有效选项取决于索引类型。</p></li>
</ul>
<p>以下是不同索引类型的配置示例：</p>
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
<p><strong>参数</strong>的可能选项包括</p>
<ul>
<li><p><strong>intermediate_graph_degree</strong><em>(int</em>)：通过在剪枝之前确定图的度数来影响召回率和构建时间。推荐值为<strong>32</strong>或<strong>64</strong>。</p></li>
<li><p><strong>graph_degree</strong><em>（int</em>）：通过设置剪枝后图形的度数来影响搜索性能和召回率。通常，它是<strong>中间图度</strong>的一半。这两个度数之间的差值越大，构建时间就越长。它的值必须小于<strong>intermediate_graph_degree</strong> 的值。</p></li>
<li><p><strong>build_algo</strong><em>（字符串</em>）：选择剪枝前的图形生成算法。可能的选项：</p>
<ul>
<li><p><strong>IVF_PQ</strong>：提供更高的质量，但构建时间较慢。</p></li>
<li><p><strong>NN_DESCENT</strong>：提供更快的生成速度，但可能会降低召回率。</p></li>
</ul></li>
<li><p><strong>cache_dataset_on_device</strong><em>（字符串</em>，<strong>"true"</strong>|<strong>"false"）</strong>：决定是否在 GPU 内存中缓存原始数据集。将其设置为<strong>"true "</strong>可通过完善搜索结果提高召回率，而将其设置为<strong>"false "</strong>则可节省 GPU 内存。</p></li>
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
<p><strong>参数</strong>选项与<strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a></strong>和<strong><a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong> 中使用的选项相同。</p></li>
<li><p><strong>GPU_BRUTE_FORCE</strong>索引</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>: <span class="hljs-string">&#x27;GPU_BRUTE_FORCE&#x27;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>不需要额外的<strong>参数</strong>配置。</p></li>
</ul>
<h3 id="Build-index" class="common-anchor-header">构建索引</h3><p>在<strong>index_params</strong> 中配置索引参数后，调用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/create_index.md"><code translate="no">create_index()</code></a>方法来构建索引。</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get an existing collection</span>
collection = Collection(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)

collection.create_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field on which an index is built</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search" class="common-anchor-header">搜索<button data-href="#Search" class="anchor-icon" translate="no">
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
    </button></h2><p>建立 GPU 索引后，下一步是在进行搜索前准备搜索参数。</p>
<h3 id="Prepare-search-parameters" class="common-anchor-header">准备搜索参数</h3><p>以下是不同索引类型的配置示例：</p>
<ul>
<li><p><strong>GPU_BRUTE_FORCE</strong>索引</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>不需要额外的<strong>参数</strong>配置。</p></li>
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
<p>主要搜索参数包括</p>
<ul>
<li><p><strong>itopk_size</strong>：决定搜索过程中保留的中间结果的大小。较大的值可能会提高召回率，但会降低搜索性能。它至少应等于最终的 top-k<strong>（极限</strong>）值，通常是 2 的幂次（如 16、32、64、128）。</p></li>
<li><p><strong>search_width</strong>：指定搜索过程中进入 CAGRA 图的入口点数量。增加该值可以提高召回率，但可能会影响搜索性能。</p></li>
<li><p><strong>min_iterations</strong>/<strong>max</strong><strong>_</strong> <strong>iterations</strong>：这些参数控制搜索迭代过程。默认情况下，它们被设置为<strong>0</strong>，CAGRA 会根据<strong>itopk_size</strong>和<strong>search_width</strong> 自动确定迭代次数。手动调整这些值有助于平衡性能和准确性。</p></li>
<li><p><strong>team_size</strong>（<strong>团队规模</strong>）：指定用于在 GPU 上计算度量距离的 CUDA 线程数。常用值为 2 的幂次，最高为 32（例如 2、4、8、16、32）。它对搜索性能影响不大。默认值为<strong>0</strong>，Milvus 会根据向量维度自动选择<strong>team_size</strong>。</p></li>
</ul></li>
<li><p><strong>GPU_IVF_FLAT</strong>或<strong>GPU_IVF_PQ</strong>索引</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}
<button class="copy-code-btn"></button></code></pre>
<p>这两种索引类型的搜索参数与<strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a>和<a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ</a></strong> 中使用的参数类似。更多信息，请参阅<a href="https://milvus.io/docs/search.md#Prepare-search-parameters">进行向量相似性搜索</a>。</p></li>
</ul>
<h3 id="Conduct-a-search" class="common-anchor-header">进行搜索</h3><p>使用 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search.md"><code translate="no">search()</code></a>方法对 GPU 索引执行向量相似性搜索。</p>
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
    </button></h2><p>使用 GPU 索引时，请注意某些限制：</p>
<ul>
<li><p>对于<strong>GPU_IVF_FLAT</strong>，<strong>限制</strong>的最大值为 1024。</p></li>
<li><p>对于<strong>GPU_IVF_PQ</strong>和<strong>GPU_CAGRA</strong>，<strong>limit</strong>的最大值为 1024。</p></li>
<li><p>虽然<strong>GPU_BRUTE_FORCE</strong> 没有设定<strong>限制</strong>，但建议不要超过 4096，以避免潜在的性能问题。</p></li>
<li><p>目前，GPU 索引不支持 COSINE 距离。如果需要使用 COSINE 距离，应首先对数据进行归一化处理，然后使用内积（IP）距离作为替代。</p></li>
<li><p>GPU 索引不完全支持加载 OOM 保护，过多的数据可能会导致 QueryNode 崩溃。</p></li>
<li><p>GPU 索引不支持<a href="https://milvus.io/docs/single-vector-search.md#Range-search">范围</a>搜索和<a href="https://milvus.io/docs/single-vector-search.md#Grouping-searchh">分组搜索</a>等搜索功能。</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">常见问题<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>什么情况下适合使用 GPU 索引？</strong></p>
<p>GPU 索引尤其适用于需要高吞吐量或高召回率的情况。例如，在处理大批量数据时，GPU 索引的吞吐量可比 CPU 索引高出 100 倍之多。在批量较小的情况下，GPU 索引在性能上仍明显优于 CPU 索引。此外，如果需要快速插入数据，采用 GPU 可以大大加快索引的建立过程。</p></li>
<li><p><strong>CAGRA、GPU_IVF_PQ、GPU_IVF_FLAT 和 GPU_BRUTE_FORCE 等 GPU 索引最适合哪些应用场景？</strong></p>
<p>CAGRA 索引非常适合需要增强性能的应用场景，尽管代价是消耗更多内存。对于优先考虑节省内存的环境，<strong>GPU_IVF_PQ</strong>索引可以帮助最大限度地减少存储需求，不过这也会带来较高的精度损失。<strong>GPU_IVF_FLAT</strong>索引是一个平衡的选择，它在性能和内存使用之间提供了一个折中方案。最后，<strong>GPU_BRUTE_FORCE</strong>索引专为穷举搜索操作而设计，通过执行遍历搜索保证召回率为 1。</p></li>
</ul>
