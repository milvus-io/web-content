---
id: ivf-flat.md
order: 1
summary: 本文将介绍 Milvus 中的 IVF_FLAT 索引。
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
    </button></h1><p><strong>IVF_FLAT</strong>索引是一种可以提高浮点向量搜索性能的索引算法。</p>
<p>这种索引类型非常适合需要快速查询响应和高精确度的大规模数据集，尤其是在对数据集进行聚类可以减少搜索空间，并且有足够内存存储聚类数据的情况下。</p>
<h2 id="Overview" class="common-anchor-header">概览<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>术语<strong>IVF_FLAT</strong>代表<strong>反转文件扁平</strong>，概括了其索引和搜索浮点向量的双层方法：</p>
<ul>
<li><strong>反转文件 (IVF)：</strong>指使用<a href="https://en.wikipedia.org/wiki/K-means_clustering">K 均值</a>聚类将向量空间<a href="https://en.wikipedia.org/wiki/K-means_clustering">聚类</a>为可管理的区域。每个聚类都有一个<strong>中心点</strong>，作为内部向量的参考点。</li>
<li><strong>扁平：</strong>表示在每个聚类中，向量以原始形式（扁平结构）存储，不做任何压缩或量化，以便进行精确的距离计算。</li>
</ul>
<p>下图显示了其工作原理：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-1.png" alt="ivf-flat-1.png" class="doc-image" id="ivf-flat-1.png" />
   </span> <span class="img-wrapper"> <span>ivf-flat-1.png</span> </span></p>
<p>这种索引方法可以加快搜索过程，但也有潜在的缺点：找到的与查询嵌入式最近的候选嵌入式可能并不是最近的嵌入式。如果与查询嵌入点最近的嵌入点所在的聚类与根据最近中心点选择的聚类不同，就会出现这种情况（见下面的可视化图示）。</p>
<p>为了解决这个问题，<strong>IVF_FLAT</strong>提供了两个超参数供我们调整：</p>
<ul>
<li><code translate="no">nlist</code>:指定使用 k-means 算法创建的分区数量。</li>
<li><code translate="no">nprobe</code>:指定在搜索候选对象时要考虑的分区数量。</li>
</ul>
<p>现在，如果我们将<code translate="no">nprobe</code> 设置为 3，而不是 1，就会得到如下结果：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-2.png" alt="ivf-flat-2.png" class="doc-image" id="ivf-flat-2.png" />
   </span> <span class="img-wrapper"> <span>ivf-flat-2.png</span> </span></p>
<p>通过增加<code translate="no">nprobe</code> 值，可以在搜索中包含更多分区，这有助于确保不会错过与查询最接近的嵌入，即使它位于不同的分区中。不过，这样做的代价是增加搜索时间，因为需要评估更多候选项。有关索引参数调整的更多信息，请参阅<a href="#index-params">索引参数</a>。</p>
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
    </button></h2><p>要在 Milvus 中的向量场上建立<code translate="no">IVF_FLAT</code> 索引，请使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的附加参数。</p>
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
<p>在此配置中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引类型。在本例中，将值设为<code translate="no">IVF_FLAT</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用于计算向量间距离的方法。支持的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。有关详细信息，请参阅<a href="/docs/zh/metric.md">公制类型</a>。</p></li>
<li><p><code translate="no">params</code>:用于建立索引的附加配置选项。</p>
<ul>
<li><code translate="no">nlist</code>:划分数据集的簇数。</li>
</ul>
<p>要了解<code translate="no">IVF_FLAT</code> 索引可用的更多构建<a href="#Index-building-params">参数</a>，请参阅<a href="#Index-building-params">索引构建参数</a>。</p></li>
</ul>
<p>配置好索引参数后，可直接使用<code translate="no">create_index()</code> 方法或在<code translate="no">create_collection</code> 方法中传递索引参数来创建索引。有关详情，请参阅<a href="/docs/zh/create-collection.md">创建 Collections</a>。</p>
<h2 id="Search-on-index" class="common-anchor-header">在索引上搜索<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>建立索引并插入实体后，就可以在索引上执行相似性搜索。</p>
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
<li><p><code translate="no">params</code>:在索引上搜索的其他配置选项。</p>
<ul>
<li><code translate="no">nprobe</code>:要搜索的群集数量。</li>
</ul>
<p>要了解<code translate="no">IVF_FLAT</code> 索引可用的更多搜索<a href="#index-specific-search-params">参数</a>，请参阅<a href="#index-specific-search-params">特定于索引的搜索参数</a>。</p></li>
</ul>
<h2 id="Index-params" class="common-anchor-header">索引参数<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>本节概述了用于建立索引和在索引上执行搜索的参数。</p>
<h3 id="Index-building-params" class="common-anchor-header">索引建立参数</h3><p>下表列出了<a href="#Build-index">建立索引</a>时可在<code translate="no">params</code> 中配置的参数。</p>
<table>
<thead>
<tr><th><strong>参数</strong></th><th><strong>说明</strong></th><th><strong>值范围</strong></th><th><strong>调整建议</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>在索引构建过程中使用 K-means 算法创建的簇数。每个簇由一个中心点表示，存储一个向量列表。增加该参数可减少每个簇中的向量数量，从而创建更小、更集中的分区。</td><td><strong>类型</strong>： 整数整数<br><strong>范围</strong>： [1, 65536[1, 65536]<br><strong>默认值</strong>：<code translate="no">128</code></td><td><code translate="no">nlist</code> 值越大，创建的聚类越精细，召回率越高，但会增加索引构建时间。根据数据集大小和可用资源进行优化。在大多数情况下，我们建议在此范围内设置值：[32, 4096].</td></tr>
</tbody>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定于索引的搜索参数</h3><p>下表列出了<a href="#Search-on-index">在索引上搜索</a>时可在<code translate="no">search_params.params</code> 中配置的参数。</p>
<table>
<thead>
<tr><th><strong>参数</strong></th><th><strong>说明</strong></th><th><strong>值范围</strong></th><th><strong>调整建议</strong></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>搜索候选集群的集群数。数值越大，搜索的集群数越多，通过扩大搜索范围提高召回率，但代价是查询延迟增加。</td><td><strong>类型</strong>：整数<br><strong>范围</strong>： [1, nlist[1，<em>nlist］</em><br><strong>默认值</strong>：<code translate="no">8</code></td><td>增加该值可提高召回率，但可能会减慢搜索速度。设置<code translate="no">nprobe</code> 与<code translate="no">nlist</code> 成比例，以平衡速度和准确性。<br>在大多数情况下，我们建议您在此范围内设置一个值：[1，nlist]。</td></tr>
</tbody>
</table>
