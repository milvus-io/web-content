---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ 将分层可导航小世界（HNSW）图与标量量化（SQ）相结合，形成了一种先进的向量索引方法，可在大小与精度之间实现可控的权衡。 与标准 HNSW
  相比，该索引类型在保持较高查询处理速度的同时，索引构建时间略有增加。
---
<h1 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_SQ</strong>将分层可导航小世界（HNSW）图与标量量化（SQ）相结合，形成了一种先进的向量索引方法，可在大小与精度之间实现可控的权衡。 与标准<a href="/docs/zh/hnsw.md">HNSW</a> 相比，该索引类型在保持较高查询处理速度的同时，索引构建时间略有增加。</p>
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
    </button></h2><p>HNSW_SQ 结合了两种索引技术：用于快速基于图的导航的<strong>HNSW</strong>，以及用于高效向量压缩的<strong>SQ</strong>。</p>
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
    </button></h3><p>HNSW 构建了一个多层图，其中每个节点对应数据集中的一个向量。在这个图中，节点根据其相似度相互连接，从而能够快速遍历数据空间。分层结构使搜索算法能够缩小候选邻居的范围，从而显著加快高维空间中的搜索过程。</p>
<p>更多信息，请参阅<a href="/docs/zh/hnsw.md">HNSW</a>。</p>
<h3 id="SQ" class="common-anchor-header">SQ<button data-href="#SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>SQ 是一种通过使用更少的位来表示向量从而实现向量压缩的方法。例如：</p>
<ul>
<li><p><strong>SQ8</strong>使用 8 位，将值映射到 256 个级别。有关更多信息，请参阅<a href="/docs/zh/ivf-sq8.md#SQ8">IVF_SQ8</a>。</p></li>
<li><p><strong>SQ6</strong>使用 6 位来表示每个浮点数值，从而产生 64 个离散级别。</p></li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" /> 
   <span>Hnsw Sq</span>
  
 </span></p>
<p>这种精度的降低在保留数据基本结构的同时，显著减少了内存占用并加快了计算速度。</p>
<h3 id="SQ4U" class="common-anchor-header">SQ4U<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#SQ4U" class="anchor-icon" translate="no">
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
    </button></h3><p>针对需要极高查询速度和最小内存占用的场景，Milvus 推出了<code translate="no">SQ4U</code> ，这是一种 4 位均匀标量量化。这是一种激进的标量量化形式，将每个维度的浮点值压缩为<strong>4 位</strong>无符号整数。</p>
<p>SQ4U 中的“U”代表“Uniform”（均匀）。与通常为每个维度独立计算最小值和最大值（按维度量化）的非均匀标量量化不同，SQ4U 采用<strong>全局均匀量化策略</strong>：</p>
<ol>
<li><p><strong>全局统计</strong>：系统计算出<strong>一个</strong>适用于向量<strong>所有维度</strong>（或整个向量片段）的最小值<code translate="no">vmin</code> 和<strong>一个</strong>值范围<code translate="no">vdiff</code> 。</p></li>
<li><p><strong>统一映射</strong>：全局值范围被划分为 16 个等间隔区间。向量中的每个浮点数，无论属于哪个维度，都会使用这些共享参数映射为一个 4 位整数（0–15）。</p></li>
</ol>
<p><strong>性能优势：</strong></p>
<ul>
<li><p><strong>8 倍压缩比：</strong>与 `<code translate="no">FP32</code> ` 相比，文件大小减少 8 倍；与 `<code translate="no">SQ8</code>` 相比，减少 2 倍，从而显著降低了内存带宽压力——这通常是向量搜索中的瓶颈。</p></li>
<li><p><strong>SIMD 优化：</strong>紧凑的结构使现代 CPU（AVX2/AVX-512）能够在每个时钟周期内处理更多维度。关键在于，全局参数的使用消除了在距离计算过程中加载不同缩放因子/偏移量值的需要，从而保持指令流水线的完全饱和。</p></li>
<li><p><strong>缓存效率：</strong>向量尺寸越小，意味着更多数据可容纳于 CPU 缓存中，从而减少因内存访问导致的延迟。</p></li>
</ul>
<div class="alert note">
<p>由于采用了全局参数共享机制，SQ4U 在归一化数据或各维度值分布一致的数据集上表现最佳。</p>
</div>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ<button data-href="#HNSW-+-SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_SQ 结合了 HNSW 和 SQ 的优势，可实现高效的近似最近邻搜索。其工作原理如下：</p>
<ol>
<li><p><strong>数据压缩：</strong>SQ 使用<code translate="no">sq_type</code> （例如 SQ6 或 SQ8）对向量进行压缩，从而减少内存占用。这种压缩可能会降低精度，但使系统能够处理更大的数据集。</p></li>
<li><p><strong>图构建：</strong>利用压缩后的向量构建 HNSW 图。由于数据经过压缩，生成的图体积更小，搜索速度更快。</p></li>
<li><p><strong>候选结果检索：</strong>当提供查询向量时，算法会利用压缩数据从 HNSW 图中快速识别出一组候选邻居。</p></li>
<li><p><strong>（可选）结果精化：</strong>可基于以下参数对初始候选结果进行精化，以提高准确性：</p>
<ul>
<li><p><code translate="no">refine</code>: 控制是否启用此精化步骤。当设置为<code translate="no">true</code> 时，系统将使用更高精度或未压缩的表示形式重新计算距离。</p></li>
<li><p><code translate="no">refine_type</code>：指定精炼过程中使用的数据精度级别（例如，SQ6、SQ8、BF16）。选择更高精度（如<code translate="no">FP32</code> ）可获得更准确的结果，但需要更多内存。该精度必须比原始压缩数据集的精度高出<code translate="no">sq_type</code> 。</p></li>
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
    </button></h2><p>要在 Milvus 中针对向量字段构建<code translate="no">HNSW_SQ</code> 索引，请使用<code translate="no">add_index()</code> 方法，并指定<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 以及索引的其他参数。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_SQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;sq_type&quot;</span>: <span class="hljs-string">&quot;SQ6&quot;</span>, <span class="hljs-comment"># Scalar quantizer type</span>
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中：</p>
<ul>
<li><p><code translate="no">index_type</code>: 要构建的索引类型。在此示例中，将值设置为<code translate="no">HNSW_SQ</code> 。</p></li>
<li><p><code translate="no">metric_type</code>: 用于计算向量之间距离的方法。支持的值包括<code translate="no">COSINE</code> 、<code translate="no">L2</code> 和<code translate="no">IP</code> 。详情请参阅《<a href="/docs/zh/metric.md">度量类型</a>》。</p></li>
<li><p><code translate="no">params</code>: 用于构建索引的其他配置选项。详情请参阅<a href="/docs/zh/hnsw-sq.md#Index-building-params">“索引构建参数</a>”。</p></li>
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
<li><code translate="no">params</code>：针对索引搜索的附加配置选项。详情请参阅《<a href="/docs/zh/hnsw-sq.md#Index-specific-search-params">索引特定搜索参数</a>》。</li>
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
    </button></h3><p>下表列出了在<code translate="no">params</code> 中<a href="/docs/zh/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">构建索引</a>时可配置的参数。</p>
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
     <td><p>每个节点在图中可拥有的最大连接数（或边数），包括出边和入边。</p><p>此参数直接影响索引构建和搜索。</p></td>
     <td><p><strong>类型</strong>：整数</p><p><strong>范围</strong>：[2, 2048]</p><p><strong>默认值</strong>：<code translate="no">30</code> （每个节点最多 30 条出边和 30 条入边）</p></td>
     <td><p><code translate="no">M</code> 越大，通常<strong>准确率越高</strong>，但<strong>会增加内存开销</strong>，并<strong>减慢索引构建和搜索的速度</strong>。</p><p>对于高维数据集或需要高召回率的情况，请考虑增加<code translate="no">M</code> 。</p><p>当内存使用和搜索速度是主要考虑因素时，请考虑降低<code translate="no">M</code> 。</p><p>在大多数情况下，我们建议您将该值设置在此范围内：[5, 100]。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>在索引构建期间，考虑用于连接的候选邻居数量。</p><p>对于每个新元素，系统会评估更大的候选邻居池，但实际建立的连接最大数量仍受<code translate="no">M</code> 的限制。</p></td>
     <td><p><strong>类型</strong>：整数</p><p><strong>范围</strong>：[1,<em>int_max</em>]</p><p><strong>默认值</strong>：<code translate="no">360</code></p></td>
     <td><p>通常，<code translate="no">efConstruction</code> 值越高，<strong>索引的准确性就越高</strong>，因为会探索更多的潜在连接。但是，这也会导致<strong>索引构建时间延长，并增加</strong>构建过程中的<strong>内存占用</strong>。</p><p>建议提高<code translate="no">efConstruction</code> 以提升准确性，特别是在索引时间不是关键因素的场景下。</p><p>当资源受限时，可考虑降低<code translate="no">efConstruction</code> 以加快索引构建速度。</p><p>在大多数情况下，我们建议您将该值设置在 [50, 500] 范围内。</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>指定用于压缩向量的标量量化方法。每种选项在压缩率与精度之间提供了不同的平衡：</p><ul><li><p><code translate="no">SQ4U</code>：使用 4 位均匀量化对向量进行编码。此模式提供最高的速度和压缩率。</p></li><li><p><code translate="no">SQ6</code>: 使用 6 位整数对向量进行编码。</p></li><li><p><code translate="no">SQ8</code>: 使用 8 位整数对向量进行编码。</p></li><li><p><code translate="no">BF16</code>: 使用 Bfloat16 格式。</p></li><li><p><code translate="no">FP16</code>: 使用标准的 16 位浮点格式。</p></li></ul></td>
     <td><p><strong>类型</strong>：字符串</p><p><strong>范围</strong>：[<code translate="no">SQ4U</code>,<code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code> ]</p><p><strong>默认值</strong>：<code translate="no">SQ8</code></p></td>
     <td><p><code translate="no">sq_type</code> 的选择取决于具体应用的需求。若追求最高速度和内存效率，应选择<code translate="no">SQ4U</code> 。若追求性能与效率的平衡，<code translate="no">SQ6</code> 或<code translate="no">SQ8</code> 可能更为合适。另一方面，如果精度至关重要，则建议选择<code translate="no">BF16</code> 或<code translate="no">FP16</code> 。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>一个布尔标志，用于控制搜索过程中是否应用精化步骤。精化是指通过计算查询向量与候选向量之间的精确距离，对初始结果进行重新排序。</p></td>
     <td><p><strong>类型</strong>：布尔型</p><p><strong>取值范围</strong>：[<code translate="no">true</code>,<code translate="no">false</code>]</p><p><strong>默认值</strong>：<code translate="no">false</code></p></td>
     <td><p>若高精度至关重要且可容忍搜索速度略有降低，请设置为<code translate="no">true</code> 。若速度是首要考虑因素且可接受精度上的轻微妥协，请使用<code translate="no">false</code> 。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>确定用于精化处理的数据精度。</p><p>该精度必须高于压缩向量的精度（由<code translate="no">sq_type</code> 设定），这将同时影响重新排序向量的准确性及其内存占用。</p></td>
     <td><p><strong>类型</strong>：字符串</p><p><strong>范围</strong>：[<code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code>,<code translate="no">FP32</code> ]</p><p><strong>默认值</strong>：无</p></td>
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
    </button></h3><p>下表列出了在<code translate="no">search_params.params</code> 中<a href="/docs/zh/hnsw-sq.md#Search-on-index">对索引进行搜索</a>时可配置的参数。对于您未指定的参数，服务器设置可覆盖其默认值。</p>
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
     <td><p>控制最近邻检索过程中的搜索范围。它决定了将访问并评估多少个节点作为潜在的最近邻。 </p><p>此参数仅影响搜索过程，且仅适用于图的最底层。</p></td>
     <td><p><strong>类型</strong>：整数</p><p><strong>范围</strong>：[1,<em>int_max</em>]</p><p><strong>默认值</strong>：对于普通 kNN 搜索为<code translate="no">max(limit, 16)</code> ；对于范围搜索为<code translate="no">512</code> 。</p><p>对于普通 kNN 搜索，显式指定的<code translate="no">ef</code> 必须大于或等于<code translate="no">limit</code> （要返回的最近邻节点数）。</p></td>
     <td><p>更大的<code translate="no">ef</code> 通常会<strong>提高搜索准确率</strong>，因为会考虑更多的潜在邻居。但是，这也会<strong>增加搜索时间</strong>。</p><p>当实现高召回率至关重要，而搜索速度不是主要考虑因素时，可考虑增加<code translate="no">ef</code> 。</p><p>若需优先考虑更快的搜索速度，特别是当可以接受精度略有降低时，请考虑降低<code translate="no">ef</code> 。</p><p>在大多数情况下，我们建议您将该值设置在 [K, 10K] 范围内。</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>该放大系数控制在细化阶段，相对于请求的前 K 个结果，将检查多少个额外的候选项。</p></td>
     <td><p><strong>类型</strong>：浮点数</p><p><strong>范围</strong>：[1,<em>float_max</em>)</p><p><strong>默认值</strong>：1</p></td>
     <td><p><code translate="no">refine_k</code> 的数值越高，虽然可以提高召回率和准确率，但也会增加搜索时间和资源消耗。数值为 1 时，表示细化过程仅考虑最初的前 K 个结果。</p></td>
   </tr>
</table>
