---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  HNSW_PRQ 结合了分层可导航小世界（HNSW）图与产品残差量化（PRQ）技术，提供了一种先进的向量索引方法，可让您精细调整索引大小与准确度之间的权衡。
  PRQ 通过引入残差量化（RQ）步骤来捕获更多信息，从而超越了传统的产物量化（PQ），与纯 PQ
  方法相比，可实现更高的精度或更紧凑的索引。然而，这些额外步骤可能会导致索引构建和搜索过程中的计算开销增加。
---
<h1 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ<button data-href="#HNSWPRQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PRQ</strong>结合了分层可导航小世界（HNSW）图与产品残差量化（PRQ）技术，提供了一种先进的向量索引方法，可让您精细调整索引大小与准确性之间的权衡。 PRQ 通过引入残差量化（RQ）步骤来捕获更多信息，从而超越了传统的产物量化（PQ），与纯 PQ 方法相比，可实现更高的精度或更紧凑的索引。然而，这些额外步骤可能会导致索引构建和搜索过程中的计算开销增加。</p>
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
    </button></h2><p>HNSW_PRQ 结合了两种索引技术：用于快速图导航的<strong>HSNW</strong>，以及用于高效向量压缩的<strong>PRQ</strong>。</p>
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
    </button></h3><p>HNSW 构建了一个多层图，其中每个节点对应数据集中的一个向量。在此图中，节点基于其相似度相互连接，从而能够快速遍历数据空间。其分层结构使搜索算法能够缩小候选邻居的范围，从而在高维空间中显著加速搜索过程。</p>
<p>更多信息，请参阅<a href="/docs/zh/hnsw.md">HNSW</a>。</p>
<h3 id="PRQ" class="common-anchor-header">PRQ<button data-href="#PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PRQ 是一种多阶段向量压缩方法，结合了两种互补技术：PQ 和 RQ。通过先将高维向量拆分为较小的子向量（通过 PQ），然后对剩余差异进行量化（通过 RQ），PRQ 实现了对原始数据的紧凑且精确的表示。</p>
<p>下图展示了其工作原理。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" /> 
   <span>Hnsw Prq</span>
  
 </span></p>
<ol>
<li><p><strong>乘积量化（PQ）</strong></p>
<p>在此阶段，原始向量被划分为较小的子向量，每个子向量都被映射到学习所得码本中距离其最近的质心。这种映射显著缩减了数据规模，但由于每个子向量仅由单个质心近似，因此会引入一些舍入误差。更多详情请参阅<a href="/docs/zh/ivf-pq.md#PQ">IVF_PQ</a>。</p></li>
<li><p><strong>残差量化（RQ）</strong></p>
<p>在 PQ 阶段之后，RQ 会使用额外的码本对残差（即原始向量与其基于 PQ 的近似值之间的差值）进行量化。由于该残差通常要小得多，因此可以在不大幅增加存储空间的情况下对其进行更精确的编码。</p>
<p>参数<code translate="no">nrq</code> 决定该残差被迭代量化的次数，从而允许您在压缩效率与精度之间进行精细调整。</p></li>
<li><p><strong>最终压缩表示</strong></p>
<p>一旦 RQ 完成对残差的量化，PQ 和 RQ 生成的整数码将合并为一个压缩索引。通过捕捉仅靠 PQ 可能遗漏的精细细节，RQ 在不显著增加存储空间的情况下提升了精度。PQ 与 RQ 之间的这种协同作用正是 PRQ 的核心所在。</p></li>
</ol>
<h3 id="HNSW-+-PRQ" class="common-anchor-header">HNSW + PRQ<button data-href="#HNSW-+-PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>通过将 HNSW 与 PRQ 结合<strong>，HNSW_PRQ</strong>既保留了 HNSW 基于图的快速搜索特性，又利用了 PRQ 的多阶段压缩优势。其工作流程如下：</p>
<ol>
<li><p><strong>数据压缩：</strong>每个向量首先通过 PQ 转换为粗略表示，然后通过 RQ 对残差进行量化以进一步细化。最终得到一组代表每个向量的紧凑编码。</p></li>
<li><p><strong>图构建：</strong>压缩后的向量（包括 PQ 和 RQ 编码）构成了构建 HNSW 图的基础。由于数据以紧凑形式存储，该图所需的内存更少，且在图中导航的速度也得到了提升。</p></li>
<li><p><strong>候选项检索：</strong>在搜索过程中，HNSW利用压缩表示遍历图并检索出一组候选项。这极大地减少了需要考虑的向量数量。</p></li>
<li><p><strong>（可选）结果精化：</strong>可基于以下参数对初始候选结果进行精化，以提高准确性：</p>
<ul>
<li><p><code translate="no">refine</code>: 控制是否启用此精炼步骤。当设置为<code translate="no">true</code> 时，系统将使用更高精度或未压缩的表示形式重新计算距离。</p></li>
<li><p><code translate="no">refine_type</code>: 指定精炼过程中使用的数据精度级别（例如，SQ6、SQ8、BF16）。选择更高精度的选项（如<code translate="no">FP32</code> ）可获得更准确的结果，但需要更多内存。该精度必须比原始压缩数据集的精度高<code translate="no">sq_type</code> 。</p></li>
<li><p><code translate="no">refine_k</code>: 作为放大因子。例如，如果您的前<em>k 项</em>为 100，且<code translate="no">refine_k</code> 为 2，系统将对前 200 个候选项进行重新排序并返回最佳的 100 个，从而提高整体准确率。</p></li>
</ul></li>
</ol>
<p>有关参数和有效值的完整列表，请参阅<a href="/docs/zh/hnsw-prq.md#Index-params">“索引参数</a>”。</p>
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
    </button></h2><p>要在 Milvus 中针对向量字段构建<code translate="no">HNSW_PRQ</code> 索引，请使用<code translate="no">add_index()</code> 方法，并指定<code translate="no">index_type</code> 、<code translate="no">metric_type</code> 以及索引的其他参数。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PRQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;nrq&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中：</p>
<ul>
<li><p><code translate="no">index_type</code>: 要构建的索引类型。在此示例中，将值设置为<code translate="no">HNSW_PQ</code> 。</p></li>
<li><p><code translate="no">metric_type</code>: 用于计算向量之间距离的方法。支持的值包括<code translate="no">COSINE</code> 、<code translate="no">L2</code> 和<code translate="no">IP</code> 。有关详细信息，请参阅《<a href="/docs/zh/metric.md">度量类型</a>》。</p></li>
<li><p><code translate="no">params</code>: 用于构建索引的其他配置选项。详情请参阅<a href="/docs/zh/hnsw-prq.md#Index-building-params">“索引构建参数</a>”。</p></li>
</ul>
<p>配置好索引参数后，您可以直接使用<code translate="no">create_index()</code> 方法创建索引，或在<code translate="no">create_collection</code> 方法中传入索引参数。详情请参阅<a href="/docs/zh/create-collection.md">“创建Collection”</a>。</p>
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
<li><code translate="no">params</code>：针对索引搜索的附加配置选项。详情请参阅《<a href="/docs/zh/hnsw-prq.md#Index-specific-search-params">索引特定搜索参数</a>》。</li>
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
    </button></h3><p>下表列出了在<code translate="no">params</code> 中<a href="/docs/zh/hnsw-prq.md#Build-index">构建索引</a>时可配置的参数。</p>
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
     <td><p>图中每个节点可拥有的最大连接数（或边数），包括出边和入边。
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
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>量化过程中，将每个高维向量划分为若干子向量（用于量化）的数量。</p></td>
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
 每个码本将包含<sup>2n 位</sup>聚类中心。例如，如果将<code translate="no">nbits</code> 设置为 8，则每个子向量将由一个 8 位的聚类中心索引表示。这意味着该子向量在码本中可能有<sup>2⁸</sup>（即 256）个聚类中心。</p></td>
     <td><p><strong>类型</strong>：整数
<strong>范围</strong>：[1, 24]</p>
<p><strong>默认值</strong>：<code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> 值越高，编码本就越大，这可能导致对原始向量的表示更加精确。但这也意味着需要使用更多位来存储每个索引，从而导致压缩率降低。
在大多数情况下，我们建议您将该值设置在 [1, 16] 范围内。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>控制 RQ 阶段中使用的残差子量化器数量。更多的子量化器可能实现更高的压缩率，但也可能导致更多的信息丢失。</p></td>
     <td><p><strong>类型</strong>：整数
<strong>范围</strong>：[1, 16]</p>
<p><strong>默认值</strong>：<code translate="no">2</code></p></td>
     <td><p>较高的<code translate="no">nrq</code> 值允许进行更多的残差子量化步骤，这可能导致对原始向量的重建更加精确。然而，这也意味着需要存储和计算更多的子量化器，从而导致索引大小增大以及计算开销增加。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>一个布尔标志，用于控制搜索过程中是否应用精化步骤。精化涉及通过计算查询向量与候选向量之间的精确距离，对初始结果进行重新排序。</p></td>
     <td><p><strong>类型</strong>：布尔型
<strong>范围</strong>：[<code translate="no">true</code>,<code translate="no">false</code>]</p>
<p><strong>默认值</strong>：<code translate="no">false</code></p></td>
     <td><p>若高精度至关重要且可容忍搜索速度略有下降，请设置为<code translate="no">true</code> 。若速度是首要考虑因素且可接受精度上的轻微妥协，请使用<code translate="no">false</code> 。</p></td>
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
<h3 id="Index-specific-search-params" class="common-anchor-header">索引特定的搜索参数<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>下表列出了在<code translate="no">search_params.params</code> 中<a href="/docs/zh/hnsw-prq.md#Search-on-index">对索引进行搜索</a>时可配置的参数。</p>
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
当实现高召回率至关重要，且搜索速度不是主要考虑因素时，可考虑增加<code translate="no">ef</code> 值。</p>
<p>若需优先保证搜索速度，特别是当允许精度略有降低时，请考虑降低<code translate="no">ef</code> 。</p>
<p>在大多数情况下，建议您将该值设置在 [K, 10K] 范围内。</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>该放大因子控制在精化（重新排序）阶段，相对于请求的前 K 个结果，将额外检查多少个候选项。</p></td>
     <td><p><strong>类型</strong>：浮点数
<strong>范围</strong>：[1,<em>float_max</em>)</p>
<p><strong>默认值</strong>：1</p></td>
     <td><p><code translate="no">refine_k</code> 的值越高，召回率和准确率就越高，但搜索时间和资源消耗也会随之增加。值为 1 表示优化过程仅考虑最初的前 K 个结果。</p></td>
   </tr>
</table>
