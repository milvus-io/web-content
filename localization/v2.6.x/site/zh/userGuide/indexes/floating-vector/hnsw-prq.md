---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  HNSW_PRQ 利用分层可导航小世界（HNSW）图和残差产品量化（PRQ），提供了一种先进的向量索引方法，可让您在索引大小和准确性之间进行微调。PRQ
  超越了传统的乘积量化 (PQ)，引入了残差量化 (RQ) 步骤来捕捉更多信息，与纯粹基于 PQ 的方法相比，PRQ
  可实现更高的精度或更紧凑的索引。不过，额外的步骤会导致索引构建和搜索过程中的计算开销增加。
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
    </button></h1><p><strong>HNSW_PRQ</strong>利用分层可导航小世界（HNSW）图和残差产品量化（PRQ），提供了一种先进的向量索引方法，使您可以在索引大小和准确性之间进行微调。PRQ 超越了传统的乘积量化 (PQ)，引入了残差量化 (RQ) 步骤来捕捉更多信息，与纯粹基于 PQ 的方法相比，PRQ 可实现更高的精度或更紧凑的索引。不过，额外的步骤会导致索引构建和搜索过程中的计算开销增加。</p>
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
    </button></h2><p>HNSW_PRQ 结合了两种索引技术：<strong>HSNW</strong>用于基于图的快速导航，<strong>PRQ</strong>用于高效的向量压缩。</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW 构建了一个多层图，其中每个节点都对应数据集中的一个向量。在该图中，节点根据其相似性进行连接，从而实现在数据空间中的快速遍历。分层结构允许搜索算法缩小候选邻域的范围，从而大大加快了高维空间的搜索过程。</p>
<p>更多信息，请参阅<a href="/docs/zh/hnsw.md">HNSW</a>。</p>
<h3 id="PRQ" class="common-anchor-header">PRQ</h3><p>PRQ 是一种多阶段向量压缩方法，结合了两种互补技术：PQ 和 RQ。PRQ 首先将高维向量分割成较小的子向量（通过 PQ），然后对剩余的差值进行量化（通过 RQ），从而实现对原始数据紧凑而精确的表示。</p>
<p>下图显示了其工作原理。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" />
   </span> <span class="img-wrapper"> <span>Hnsw Prq</span> </span></p>
<ol>
<li><p><strong>乘积量化 (PQ)</strong></p>
<p>在这一阶段，原始向量被划分为更小的子向量，每个子向量都被映射到学习的编码本中与其最近的中心点。这种映射大大减少了数据量，但会带来一些舍入误差，因为每个子向量都是由一个中心点近似而成的。更多详情，请参阅<a href="/docs/zh/ivf-pq.md#PQ">IVF_PQ</a>。</p></li>
<li><p><strong>残差量化（RQ）</strong></p>
<p>在 PQ 阶段之后，RQ 使用额外的编码本量化残差--原始向量与其基于 PQ 的近似值之间的差值。由于残差通常要小得多，因此可以在不增加大量存储空间的情况下对其进行更精确的编码。</p>
<p>参数<code translate="no">nrq</code> 决定了残差被迭代量化的次数，让你可以微调压缩效率和精确度之间的平衡。</p></li>
<li><p><strong>最终压缩表示</strong></p>
<p>RQ 完成对残差的量化后，PQ 和 RQ 的整数代码将合并为一个压缩索引。通过捕捉 PQ 可能忽略的精细细节，RQ 在不显著增加存储空间的情况下提高了精确度。PQ 和 RQ 之间的协同作用正是 PRQ 的定义。</p></li>
</ol>
<h3 id="HNSW-+-PRQ" class="common-anchor-header">HNSW + PRQ</h3><p>通过将 HNSW 与 PRQ 相结合，<strong>HNSW_PRQ</strong>保留了 HNSW 基于图形的快速搜索，同时利用了 PRQ 的多级压缩优势。工作流程如下</p>
<ol>
<li><p><strong>数据压缩：</strong>每个向量首先通过 PQ 转换为粗略表示，然后通过 RQ 对残差进行量化以进一步细化。最后得到一组表示每个向量的紧凑代码。</p></li>
<li><p><strong>图形构建：</strong>压缩向量（包括 PQ 和 RQ 编码）是构建 HNSW 图表的基础。由于数据是以压缩的形式存储的，因此图所需内存更少，导航速度也更快。</p></li>
<li><p><strong>候选检索：</strong>在搜索过程中，HNSW 使用压缩表示法遍历图并检索候选库。这大大减少了需要考虑的向量数量。</p></li>
<li><p><strong>(可选）结果完善：</strong>可根据以下参数对初始候选结果进行改进，以提高准确性：</p>
<ul>
<li><p><code translate="no">refine</code>:控制是否激活该细化步骤。当设置为<code translate="no">true</code> 时，系统会使用更高精度或非压缩表示法重新计算距离。</p></li>
<li><p><code translate="no">refine_type</code>:指定细化过程中使用的数据精度级别（如 SQ6、SQ8、BF16）。选择更高精度的数据，如<code translate="no">FP32</code> ，可以得到更精确的结果，但需要更多内存。这必须比原始压缩数据集的精度高<code translate="no">sq_type</code> 。</p></li>
<li><p><code translate="no">refine_k</code>:放大系数。例如，如果您的前<em>k</em>值是 100，而<code translate="no">refine_k</code> 是 2，系统就会对前 200 个候选项重新排序，并返回最好的 100 个，从而提高整体准确性。</p></li>
</ul></li>
</ol>
<p>有关参数和有效值的完整列表，请参阅<a href="/docs/zh/hnsw-prq.md#Index-params">索引参数</a>。</p>
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
    </button></h2><p>要在 Milvus 中的向量场上建立<code translate="no">HNSW_PRQ</code> 索引，请使用<code translate="no">add_index()</code> 方法，为索引指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及附加参数。</p>
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
<p>在此配置中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引类型。在本例中，将值设为<code translate="no">HNSW_PQ</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用于计算向量间距离的方法。支持的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。有关详情，请参阅<a href="/docs/zh/metric.md">公制类型</a>。</p></li>
<li><p><code translate="no">params</code>:用于构建索引的附加配置选项。详情请参阅<a href="/docs/zh/hnsw-prq.md#Index-building-params">索引构建参数</a>。</p></li>
</ul>
<p>配置好索引参数后，可直接使用<code translate="no">create_index()</code> 方法或在<code translate="no">create_collection</code> 方法中传递索引参数来创建索引。详情请参阅<a href="/docs/zh/create-collection.md">创建 Collections</a>。</p>
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
<p>在此配置中</p>
<ul>
<li><code translate="no">params</code>:在索引上搜索的其他配置选项。有关详情，请参阅<a href="/docs/zh/hnsw-prq.md#Index-specific-search-params">特定于索引的搜索参数</a>。</li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立参数</h3><p>下表列出了<a href="/docs/zh/hnsw-prq.md#Build-index">建立索引</a>时可在<code translate="no">params</code> 中配置的参数。</p>
<table>
   <tr>
     <th></th>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>图中每个节点可拥有的最大连接数（或边），包括传出边和传入边。 该参数直接影响索引构建和搜索。</p></td>
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>：[2, 2048]</p>
<p><strong>默认值</strong>：<code translate="no">30</code> （每个节点最多有 30 条出边和 30 条入边）</p></td>
     <td><p>较大的<code translate="no">M</code> 通常会<strong>提高准确率</strong>，但会<strong>增加内存开销</strong>，并<strong>减慢索引构建和搜索速度</strong>。对于高维度数据集或高召回率至关重要时，可考虑增加<code translate="no">M</code> 。</p>
<p>当内存使用和搜索速度是首要考虑因素时，可考虑降低<code translate="no">M</code> 。</p>
<p>在大多数情况下，我们建议您在此范围内设置一个值：[5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>索引构建过程中考虑连接的候选邻居数量。 每个新元素都会评估更多的候选邻居，但实际建立的最大连接数仍受<code translate="no">M</code> 限制。</p></td>
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>：[1，<em>int_max］</em></p>
<p><strong>默认值</strong>：<code translate="no">360</code></p></td>
     <td><p><code translate="no">efConstruction</code> 越高，<strong>索引</strong>越<strong>准确</strong>，因为会探索更多潜在连接。考虑增加<code translate="no">efConstruction</code> 以提高准确性<strong>，</strong>尤其是在索引时间不太重要的情况下。</p>
<p>在资源紧张的情况下，可考虑降低<code translate="no">efConstruction</code> ，以加快索引构建速度。</p>
<p>在大多数情况下，我们建议在此范围内设置一个值：[50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>在量化过程中将每个高维向量分成的子向量数（用于量化）。</p></td>
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>： [1, 65536[1, 65536]</p>
<p><strong>默认值</strong>：无无</p></td>
     <td><p><code translate="no">m</code> <code translate="no">m</code> 必须是向量维数<em>(D</em>) 的除数，以确保正确分解。通常推荐的值是<em>m = D/2</em>。</p>
<p>在大多数情况下，我们建议在此范围内设置一个值：[D/8，D]。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>用于以压缩形式表示每个子向量中心点索引的比特数。每个编码本将包含 $2^{\textit{nbits}}$ 的中心点。例如，如果<code translate="no">nbits</code> 设置为 8，则每个子向量将由一个 8 位的中心点索引表示。这样，该子向量的编码本中就有 2^8$ (256) 个可能的中心点。</p></td>
     <td><p><strong>类型</strong>： 整数整数[1, 64]</p>
<p><strong>默认值</strong>：<code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> 值越大，编码本越大，可能会更精确地表示原始向量。在大多数情况下，我们建议在此范围内设置一个值：[1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>控制在 RQ 阶段使用多少个剩余子量化器。更多的子量化器有可能实现更高的压缩率，但也可能带来更多的信息损失。</p></td>
     <td><p><strong>类型</strong>： 整数整数[1, 16]</p>
<p><strong>默认值</strong>：<code translate="no">2</code></p></td>
     <td><p><code translate="no">nrq</code> 值越大，允许的剩余子量化步骤就越多，有可能带来更精确的原始向量重建。不过，这也意味着要存储和计算更多的子量化器，从而导致索引大小增大和计算开销增大。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>布尔标志，用于控制是否在搜索过程中应用细化步骤。细化包括通过计算查询向量与候选向量之间的精确距离，对初始结果进行重新排序。</p></td>
     <td><p><strong>类型</strong>：布尔布尔<strong>范围</strong>：[<code translate="no">true</code>,<code translate="no">false</code>]</p>
<p><strong>默认值</strong>：<code translate="no">false</code></p></td>
     <td><p>如果需要高精确度，并且可以忍受稍慢的搜索时间，则设置为<code translate="no">true</code> 。如果速度是首要考虑因素，并且可以接受在精确度上略有妥协，则使用<code translate="no">false</code> 。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>确定细化过程中使用的数据精度。 该精度必须高于压缩向量的精度（由<code translate="no">m</code> 和<code translate="no">nbits</code> 参数设置）。</p></td>
     <td><p><strong>类型</strong>： 字符串字符串<strong>范围</strong>：[<code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code>,<code translate="no">FP32</code> ]</p>
<p><strong>默认值</strong>：无</p></td>
     <td><p>使用<code translate="no">FP32</code> 可获得最高精度，但内存成本较高；使用<code translate="no">SQ6</code>/<code translate="no">SQ8</code> 可获得更好的压缩效果。<code translate="no">BF16</code> 和<code translate="no">FP16</code> 提供了一个平衡的替代方案。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定于索引的搜索参数</h3><p>下表列出了<a href="/docs/zh/hnsw-prq.md#Search-on-index">在索引上搜索</a>时可在<code translate="no">search_params.params</code> 中配置的参数。</p>
<table>
   <tr>
     <th></th>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>控制近邻检索时的搜索范围。它决定访问多少节点并将其评估为潜在近邻。 
 该参数只影响搜索过程，并且只适用于图形的底层。</p></td>
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>：[1，<em>int_max］</em></p>
<p><strong>默认值</strong>：<em>limit</em>（返回的前 K 个近邻）</p></td>
     <td><p><code translate="no">ef</code> 越大，通常<strong>搜索精度越高</strong>，因为会考虑更多的潜在近邻。当实现高召回率至关重要，而<strong>搜索</strong>速度则不那么重要时，可考虑增加<code translate="no">ef</code> 。</p>
<p>考虑降低<code translate="no">ef</code> 以优先提高搜索速度，尤其是在可以接受稍微降低准确率的情况下。</p>
<p>在大多数情况下，我们建议您在此范围内设置一个值：[K，10K]。</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>放大系数，用于控制相对于请求的前 K 个结果，在细化（重新排序）阶段检查多少额外的候选结果。</p></td>
     <td><p><strong>类型</strong>： 浮动浮动<strong>范围</strong>：[1,<em>float_max</em>)</p>
<p><strong>默认值</strong>：1</p></td>
     <td><p><code translate="no">refine_k</code> 的值越大，召回率和准确率越高，但也会增加搜索时间和资源占用。值为 1 意味着细化过程只考虑最初的前 K 个结果。</p></td>
   </tr>
</table>
