---
id: gpu-ivf-pq.md
title: GPU_IVF_PQ
summary: >-
  GPU_IVF_PQ 索引以 IVF_PQ
  概念为基础，将反向文件聚类与乘积量化（PQ）相结合，后者将高维向量分解为更小的子空间并对其进行量化，从而实现高效的相似性搜索。GPU_IVF_PQ 专为
  GPU 环境设计，利用并行处理加速计算并有效处理大规模向量数据。有关基础概念的更多信息，请参阅 IVF_PQ。
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
    </button></h1><p><strong>GPU_IVF_PQ</strong>索引以<strong>IVF_PQ</strong>概念为基础，将反向文件聚类与乘积量化（PQ）相结合，后者将高维向量分解为更小的子空间并对其进行量化，从而实现高效的相似性搜索。GPU_IVF_PQ 专为 GPU 环境设计，利用并行处理加速计算并有效处理大规模向量数据。有关基础概念的更多信息，请参阅<a href="/docs/zh/ivf-pq.md">IVF_PQ</a>。</p>
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
    </button></h2><p>要在 Milvus 中的向量场上建立<code translate="no">GPU_IVF_PQ</code> 索引，请使用<code translate="no">add_index()</code> 方法，为索引指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及附加参数。</p>
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
<p>在此配置中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引类型。在本例中，将值设为<code translate="no">GPU_IVF_PQ</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用于计算向量间距离的方法。支持的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。有关详细信息，请参阅<a href="/docs/zh/metric.md">公制类型</a>。</p></li>
<li><p><code translate="no">params</code>:用于建立索引的附加配置选项。</p>
<ul>
<li><code translate="no">m</code>:将向量分割成的子向量个数。</li>
</ul>
<p>要了解<code translate="no">GPU_IVF_PQ</code> 索引可用的更多构建<a href="/docs/zh/gpu-ivf-pq.md#Index-building-params">参数</a>，请参阅<a href="/docs/zh/gpu-ivf-pq.md#Index-building-params">索引构建参数</a>。</p></li>
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
<li><p><code translate="no">params</code>:在索引上搜索的其他配置选项。</p>
<ul>
<li><code translate="no">nprobe</code>:要搜索的群集数量。</li>
</ul>
<p>要了解<code translate="no">GPU_IVF_PQ</code> 索引可用的更多搜索<a href="/docs/zh/gpu-ivf-pq.md#Index-specific-search-params">参数</a>，请参阅<a href="/docs/zh/gpu-ivf-pq.md#Index-specific-search-params">特定于索引的搜索参数</a>。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立参数</h3><p>下表列出了<a href="/docs/zh/gpu-ivf-pq.md#Build-index">建立索引</a>时可在<code translate="no">params</code> 中配置的参数。</p>
<table>
   <tr>
     <th></th>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>在索引创建过程中使用 k-means 算法创建的簇数。</p></td>
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>：[1, 65536]</p>
<p><strong>默认值</strong>：<code translate="no">128</code></p></td>
     <td><p><code translate="no">nlist</code> 值越大，创建的簇越精细，召回率越高，但会增加索引构建时间。根据数据集大小和可用资源进行优化。 在大多数情况下，我们建议在此范围内设置值：[32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>在量化过程中将每个高维向量分成的子向量数（用于量化）。</p></td>
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>： [1, 65536[1, 65536]</p>
<p><strong>默认值</strong>：无</p></td>
     <td><p><code translate="no">m</code> <code translate="no">m</code> 必须是向量维数<em>(D</em>) 的除数，以确保正确分解。通常推荐的值是<em>m = D/2</em>。</p>
<p>在大多数情况下，我们建议在此范围内设置一个值：[D/8，D]。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>用于以压缩形式表示每个子向量中心点索引的比特数。它直接决定了每个编码本的大小。 每个编码本将包含 $2^{\textit{nbits}}$ 的中心点。例如，如果<code translate="no">nbits</code> 设置为 8，则每个子向量将由一个 8 位的中心点索引表示。这样，该子向量的编码本中就有 2^8$ (256) 个可能的中心点。</p></td>
     <td><p><strong>类型</strong>： 整数整数[1, 64]</p>
<p><strong>默认值</strong>：<code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> 值越大，编码本越大，可能会更精确地表示原始向量。在大多数情况下，我们建议在此范围内设置一个值：[1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>决定是否在 GPU 内存中缓存原始数据集。可能的值</p>
<ul>
<li><p><code translate="no">"true"</code>:缓存原始数据集，通过细化搜索结果提高召回率。</p></li>
<li><p><code translate="no">"false"</code>:不缓存原始数据集，以节省 GPU 内存。</p></li>
</ul></td>
     <td><p><strong>类型</strong>： 字符串字符串<strong>范围</strong>[<code translate="no">"true"</code>,<code translate="no">"false"</code>]</p>
<p><strong>默认值</strong>：<code translate="no">"false"</code></p></td>
     <td><p>将其设置为<code translate="no">"true"</code> 可通过细化搜索结果提高召回率，但会占用更多 GPU 内存。设置为<code translate="no">"false"</code> 可节省 GPU 内存。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定于索引的搜索参数</h3><p>下表列出了<a href="/docs/zh/gpu-ivf-pq.md#Search-on-index">在索引上搜索</a>时可在<code translate="no">search_params.params</code> 中配置的参数。</p>
<table>
   <tr>
     <th></th>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>搜索候选集群的集群数。</p></td>
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>[1，<em>nlist］</em></p>
<p><strong>默认值</strong>：<code translate="no">8</code></p></td>
     <td><p>较高的值允许搜索更多的簇，通过扩大搜索范围提高召回率，但代价是增加查询延迟。设置<code translate="no">nprobe</code> 与<code translate="no">nlist</code> 成比例，以平衡速度和准确性。</p>
<p>在大多数情况下，我们建议您在此范围内设置值：[1，nlist]。</p></td>
   </tr>
</table>
