---
id: hnsw-pq.md
title: HNSW_PQ
summary: >-
  HNSW_PQ 结合了分层可导航小世界（HNSW）图与产品量化（PQ）技术，形成了一种先进的向量索引方法，可在大小与精度之间实现可控的权衡。 与
  HNSW_SQ 相比，该索引类型在相同的压缩级别下可提供更高的召回率，但查询处理速度较低，且索引构建时间较长。
---
<h1 id="HNSWPQ" class="common-anchor-header">HNSW_PQ<button data-href="#HNSWPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PQ</strong>结合了分层可导航小世界（HNSW）图与产品量化（PQ）技术，形成了一种先进的向量索引方法，可在大小与精度之间实现可控的权衡。 与<a href="/docs/zh/hnsw-sq.md">HNSW_SQ</a> 相比，该索引类型在相同的压缩级别下可提供更高的召回率，但查询处理速度较低，且索引构建时间较长。</p>
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
    </button></h2><p>HNSW_PQ 结合了两种索引技术：用于快速图导航的<strong>HNSW</strong>和用于高效向量压缩的<strong>PQ</strong>。</p>
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
    </button></h3><p>HNSW 构建了一个多层图，其中每个节点对应数据集中的一个向量。在这个图中，节点根据其相似度相互连接，从而能够快速遍历数据空间。这种分层结构使搜索算法能够缩小候选邻居的范围，从而显著加快高维空间中的搜索过程。</p>
<p>更多信息，请参阅<a href="/docs/zh/hnsw.md">HNSW</a>。</p>
<h3 id="PQ" class="common-anchor-header">PQ<button data-href="#PQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PQ 是一种向量压缩技术，它将高维向量分解为较小的子向量，然后对这些子向量进行量化与压缩。该压缩技术可大幅降低内存需求，并加速距离计算。</p>
<p>更多信息，请参阅<a href="/docs/zh/ivf-pq.md#PQ">IVF_PQ</a>。</p>
<h3 id="HNSW-+-PQ" class="common-anchor-header">HNSW + PQ<button data-href="#HNSW-+-PQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_PQ 结合了 HNSW 和 PQ 的优势，可实现高效的近似最近邻搜索。它利用 PQ 对数据进行压缩（从而减少内存占用），然后基于这些压缩后的向量构建 HNSW 图，以实现快速的候选结果检索。 在搜索过程中，该算法可选择性地使用更高精度的数据来优化候选结果，从而提高准确性。具体工作流程如下：</p>
<ol>
<li><p><strong>数据压缩</strong>：PQ 将每个向量拆分为多个子向量，并利用由参数（如<code translate="no">m</code> （子向量数量）和<code translate="no">nbits</code> （每个子向量的位数））控制的质心码本对其进行量化。</p></li>
<li><p><strong>图构建</strong>：随后利用压缩后的向量构建 HNSW 图。由于向量以压缩形式存储，生成的图通常体积更小、占用内存更少，且遍历速度更快——这显著加快了候选项检索步骤。</p></li>
<li><p><strong>候选项检索</strong>：执行查询时，算法利用 HNSW 图中的压缩数据，高效地识别出一组候选邻居。这种基于图的查找方式极大地减少了需要考虑的向量数量，与暴力搜索相比，显著降低了查询延迟。</p></li>
<li><p><strong>（可选）结果精炼</strong>：为了提高准确性，可以基于以下参数对初始候选结果进行精炼：</p>
<ul>
<li><p><code translate="no">refine</code>: 控制是否启用此精炼步骤。当设置为<code translate="no">true</code> 时，系统将使用更高精度或未压缩的表示形式重新计算距离。</p></li>
<li><p><code translate="no">refine_type</code>: 指定精简过程中使用的数据精度级别（例如，SQ6、SQ8、BF16）。选择更高精度（如<code translate="no">FP32</code> ）可获得更准确的结果，但需要更多内存。该精度必须比原始压缩数据集的精度高出<code translate="no">sq_type</code> 。</p></li>
<li><p><code translate="no">refine_k</code>: 作为放大因子。例如，如果您的前<em>k 项</em>为 100，且<code translate="no">refine_k</code> 为 2，系统将对前 200 个候选项进行重新排序并返回最佳的 100 个，从而提高整体准确率。</p></li>
</ul></li>
</ol>
<p>有关参数和有效值的完整列表，请参阅<a href="/docs/zh/hnsw-sq.md#Index-params">“索引参数</a>”。</p>
<h2 id="Build-index" class="common-anchor-header">构建索引<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>要在 Milvus 中针对向量字段构建<code translate="no">HNSW_PQ</code> 索引，请使用<code translate="no">add_index()</code> 方法，并指定<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 以及索引的其他参数。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中：</p>
<ul>
<li><p><code translate="no">index_type</code>: 要构建的索引类型。在此示例中，将值设置为<code translate="no">HNSW_PQ</code> 。</p></li>
<li><p><code translate="no">metric_type</code>: 用于计算向量之间距离的方法。支持的值包括<code translate="no">COSINE</code> 、<code translate="no">L2</code> 和<code translate="no">IP</code> 。有关详细信息，请参阅《<a href="/docs/zh/metric.md">度量类型</a>》。</p></li>
<li><p><code translate="no">params</code>: 用于构建索引的其他配置选项。详情请参阅<a href="/docs/zh/hnsw-pq.md#Index-building-params">“索引构建参数</a>”。</p></li>
</ul>
<p>配置好索引参数后，您可以直接使用<code translate="no">create_index()</code> 方法，或在<code translate="no">create_collection</code> 方法中传入索引参数来创建索引。详情请参阅<a href="/docs/zh/create-collection.md">“创建Collection”</a>。</p>
<h2 id="Search-on-index" class="common-anchor-header">在索引上进行搜索<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>索引构建完成且实体插入后，即可对索引执行相似度搜索。</p>
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
<li><code translate="no">params</code>：针对索引搜索的附加配置选项。详情请参阅《<a href="/docs/zh/hnsw-pq.md#Index-specific-search-params">索引特定搜索参数</a>》。</li>
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
    </button></h2><p>本节概述了用于构建索引和在索引上执行搜索的参数。</p>
<h3 id="Index-building-params" class="common-anchor-header">索引构建参数<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出了在<code translate="no">params</code> 中<a href="/docs/zh/hnsw-pq.md#Build-index">构建索引</a>时可配置的参数。</p>
<table>
   <tr>
     <th></th>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
     <th><p>值范围</p></th>
     <th><p>调优建议</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>每个节点在图中可拥有的最大连接数（或边数），包括出边和入边。
 该参数直接影响索引构建和搜索。</p></td>
     <td><p><strong>类型</strong>：整数
<strong>范围</strong>：[2, 2048]</p>
<p><strong>默认值</strong>：<code translate="no">30</code> （每个节点最多 30 条出边和 30 条入边）</p></td>
     <td><p>较大的<code translate="no">M</code> 通常能<strong>提高准确率</strong>，但<strong>会增加内存开销</strong>，并<strong>减慢索引构建和搜索的速度</strong>。
对于高维数据集，或者当高召回率至关重要时，请考虑增加<code translate="no">M</code> 。</p>
<p>当内存使用和搜索速度是主要考虑因素时，请考虑降低<code translate="no">M</code> 。</p>
<p>在大多数情况下，我们建议您将该值设置在 [5, 100] 范围内。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>在构建索引时，用于连接的候选邻居数量。
对于每个新元素，系统会评估更大的候选邻居池，但实际建立的连接最大数量仍受<code translate="no">M</code> 的限制。</p></td>
     <td><p><strong>类型</strong>：整数
<strong>范围</strong>：[1,<em>int_max</em>]</p>
<p><strong>默认值</strong>：<code translate="no">360</code></p></td>
     <td><p>较高的<code translate="no">efConstruction</code> 通常会生成<strong>更精确的索引，</strong>因为会探索更多的潜在连接。但这也会导致<strong>索引构建时间延长，并增加</strong>构建过程中的<strong>内存占用</strong>。
 建议提高<code translate="no">efConstruction</code> 以提升精度，特别是在索引构建时间不是关键因素的情况下。</p>
<p>当资源受限时，可考虑降低<code translate="no">efConstruction</code> 以加快索引构建速度。</p>
<p>在大多数情况下，建议将该值设置在 [50, 500] 范围内。</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>在量化过程中，将每个高维向量划分为若干子向量（用于量化）的数量。</p></td>
     <td><p><strong>类型</strong>：整数
<strong>范围</strong>：[1, 65536]</p>
<p><strong>默认值</strong>：无</p></td>
     <td><p>较高的<code translate="no">m</code> 值可以提高精度，但也会增加计算复杂度和内存占用。
为确保正确分解，<code translate="no">m</code> 必须是向量维度 (<em>D</em>) 的因数。通常推荐的值为<em>m = D/2</em>。</p>
<p>在大多数情况下，建议将该值设置在 [D/8, D] 范围内。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>用于在压缩形式中表示每个子向量质心索引的位数。它直接决定了每个码本的大小。
 每个码本将包含<sup>2n 位</sup>聚类中心。例如，若将<code translate="no">nbits</code> 设为 8，则每个子向量将由一个 8 位的聚类中心索引表示。这意味着该子向量的码本中可能包含<sup>2⁸</sup>（即 256）个聚类中心。</p></td>
     <td><p><strong>类型</strong>：整数
<strong>范围</strong>：[1, 24]</p>
<p><strong>默认值</strong>：<code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> 值越大，编码本的规模就越大，这可能导致对原始向量的表示更加精确。但这也意味着需要使用更多的位来存储每个索引，从而导致压缩率降低。
在大多数情况下，我们建议您将该值设置在此范围内：[1, 16]。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>一个布尔标志，用于控制搜索过程中是否应用精化步骤。精化是指通过计算查询向量与候选向量之间的精确距离，对初始结果进行重新排序。</p></td>
     <td><p><strong>类型</strong>：布尔型
<strong>范围</strong>：[<code translate="no">true</code>,<code translate="no">false</code>]</p>
<p><strong>默认值</strong>：<code translate="no">false</code></p></td>
     <td><p>若高精度至关重要且可容忍搜索速度略有降低，请设置为<code translate="no">true</code> 。若速度是首要考虑因素且可接受精度上的轻微妥协，请使用<code translate="no">false</code> 。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>确定在精化过程中所用数据的精度。
该精度必须高于压缩向量的精度（由<code translate="no">m</code> 和<code translate="no">nbits</code> 参数设定）。</p></td>
     <td><p><strong>类型</strong>：字符串
<strong>取值范围</strong>：[<code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code>,<code translate="no">FP32</code> ]</p>
<p><strong>默认值</strong>：无</p></td>
     <td><p>若需最高精度（但会消耗更多内存），请使用<code translate="no">FP32</code> ；若需更好的压缩效果，请使用<code translate="no">SQ6</code> 或<code translate="no">SQ8</code> 。<code translate="no">BF16</code> 和<code translate="no">FP16</code> 则提供了折中方案。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">索引特定搜索参数<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出了在<code translate="no">search_params.params</code> 中<a href="/docs/zh/hnsw-pq.md#Search-on-index">对索引进行搜索</a>时可配置的参数。</p>
<table>
   <tr>
     <th></th>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
     <th><p>值范围</p></th>
     <th><p>调优建议</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>控制最近邻检索过程中的搜索范围。它决定了将访问并评估多少个节点作为潜在的最近邻。
 该参数仅影响搜索过程，且仅适用于图的最底层。</p></td>
     <td><p><strong>类型</strong>：整数
<strong>范围</strong>：[1,<em>int_max</em>]</p>
<p><strong>默认值</strong>：<em>limit</em>（要返回的前K个最近邻）</p></td>
     <td><p>通常，更大的<code translate="no">ef</code> 值会带来<strong>更高的搜索准确率</strong>，因为会考虑更多的潜在邻居。但这也会<strong>增加搜索时间</strong>。
当实现高召回率至关重要，且搜索速度不是主要考虑因素时，建议增加<code translate="no">ef</code> 值。</p>
<p>若需优先保证搜索速度，特别是当允许精度略有降低时，请考虑降低<code translate="no">ef</code> 。</p>
<p>在大多数情况下，建议将该值设置在 [K, 10K] 范围内。</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>该放大因子控制在细化（重新排序）阶段，相对于请求的前 K 个结果，将额外检查多少个候选项。</p></td>
     <td><p><strong>类型</strong>：浮点数
<strong>范围</strong>：[1,<em>float_max</em>)</p>
<p><strong>默认值</strong>：1</p></td>
     <td><p><code translate="no">refine_k</code> 的值越大，召回率和准确率越高，但搜索时间和资源消耗也会增加。值为 1 表示细化过程仅考虑最初的前 K 个结果。</p></td>
   </tr>
</table>
