---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ 将层次导航小世界（HNSW）图与标量量化（SQ）相结合，创建了一种先进的向量索引方法，提供了可控的大小与精度权衡。与标准 HNSW
  相比，这种索引类型在保持较高查询处理速度的同时，索引构建时间略有增加。
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
    </button></h1><p><strong>HNSW_SQ</strong>将层次导航小世界（HNSW）图与标量量化（SQ）相结合，创建了一种先进的向量索引方法，提供了可控的大小与精度权衡。与标准<a href="/docs/zh/hnsw.md">HNSW</a> 相比，这种索引类型保持了较高的查询处理速度，同时索引构建时间略有增加。</p>
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
    </button></h2><p>HNSW_SQ 结合了两种索引技术：<strong>HNSW</strong>用于基于图的快速导航，<strong>SQ</strong>用于高效的向量压缩。</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW 构建了一个多层图，其中每个节点都对应数据集中的一个向量。在这个图中，节点根据其相似性进行连接，从而实现数据空间的快速遍历。分层结构允许搜索算法缩小候选邻域的范围，从而大大加快了高维空间的搜索过程。</p>
<p>更多信息，请参阅<a href="/docs/zh/hnsw.md">HNSW</a>。</p>
<h3 id="SQ" class="common-anchor-header">SQ</h3><p>SQ 是一种用较少比特表示向量的压缩方法。例如</p>
<ul>
<li><p><strong>SQ8</strong>使用 8 位，将数值映射为 256 个级别。  更多信息，请参阅<a href="/docs/zh/ivf-sq8.md#SQ8">IVF_SQ8</a>。</p></li>
<li><p><strong>SQ6</strong>使用 6 位来表示每个浮点数值，从而产生 64 个离散级。</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" />
   </span> <span class="img-wrapper"> <span>Hnsw Sq</span> </span></p>
<p>SQ6 使用 6 位来表示每个浮点数值，从而产生 64 个离散级。这种精度的降低极大地减少了内存占用，加快了计算速度，同时保留了数据的基本结构。</p>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ</h3><p>HNSW_SQ 结合了 HNSW 和 SQ 的优势，实现了高效的近似近邻搜索。以下是该过程的工作原理：</p>
<ol>
<li><p><strong>数据压缩：</strong>SQ 使用<code translate="no">sq_type</code> （例如 SQ6 或 SQ8）对向量进行压缩，从而减少内存使用量。这种压缩可能会降低精度，但却能让系统处理更大的数据集。</p></li>
<li><p><strong>图形构建：</strong>压缩向量用于构建 HNSW 图形。由于数据经过压缩，生成的图更小，搜索速度更快。</p></li>
<li><p><strong>候选检索：</strong>当提供查询向量时，算法会使用压缩数据从 HNSW 图中快速识别出候选邻域池。</p></li>
<li><p><strong>(可选）结果完善：</strong>可根据以下参数对初始候选结果进行改进，以提高准确性：</p>
<ul>
<li><p><code translate="no">refine</code>:控制是否激活该细化步骤。当设置为<code translate="no">true</code> 时，系统会使用更高精度或未压缩的表示法重新计算距离。</p></li>
<li><p><code translate="no">refine_type</code>:指定细化过程中使用的数据精度级别（如 SQ6、SQ8、BF16）。选择更高精度的数据，如<code translate="no">FP32</code> ，可以得到更精确的结果，但需要更多内存。这必须比原始压缩数据集的精度高<code translate="no">sq_type</code> 。</p></li>
<li><p><code translate="no">refine_k</code>:放大系数。例如，如果您的前<em>k</em>值是 100，而<code translate="no">refine_k</code> 是 2，系统就会对前 200 个候选项重新排序，并返回最好的 100 个，从而提高整体准确性。</p></li>
</ul></li>
</ol>
<p>有关参数和有效值的完整列表，请参阅<a href="/docs/zh/hnsw-sq.md#Index-params">索引参数</a>。</p>
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
    </button></h2><p>要在 Milvus 中的向量场上建立<code translate="no">HNSW_SQ</code> 索引，请使用<code translate="no">add_index()</code> 方法，为索引指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及附加参数。</p>
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
<p>在此配置中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引类型。在本例中，将值设为<code translate="no">HNSW_SQ</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用于计算向量间距离的方法。支持的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。有关详细信息，请参阅<a href="/docs/zh/metric.md">公制类型</a>。</p></li>
<li><p><code translate="no">params</code>:用于构建索引的附加配置选项。详情请参阅<a href="/docs/zh/hnsw-sq.md#Index-building-params">索引构建参数</a>。</p></li>
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
<li><code translate="no">params</code>:在索引上搜索的其他配置选项。有关详情，请参阅<a href="/docs/zh/hnsw-sq.md#Index-specific-search-params">特定于索引的搜索参数</a>。</li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立参数</h3><p>下表列出了<a href="/docs/zh/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">建立索引</a>时可在<code translate="no">params</code> 中配置的参数。</p>
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
     <td><p>图中每个节点可拥有的最大连接数（或边），包括出站边和入站边。 该参数直接影响索引构建和搜索。</p></td>
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
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>指定用于压缩向量的标量量化方法。每个选项都在压缩和准确性之间提供了不同的平衡：</p>
<ul>
<li><p><code translate="no">SQ6</code>:使用 6 位整数编码向量。</p></li>
<li><p><code translate="no">SQ8</code>:使用 8 位整数编码向量。</p></li>
<li><p><code translate="no">BF16</code>:使用 Bfloat16 格式。</p></li>
<li><p><code translate="no">FP16</code>:使用标准的 16 位浮点格式。</p></li>
</ul></td>
     <td><p><strong>类型</strong>： 字符串字符串<strong>范围</strong>：[<code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code> ]</p>
<p><strong>默认值</strong>：<code translate="no">SQ8</code></p></td>
     <td><p><code translate="no">sq_type</code> 的选择取决于具体应用的需求。如果内存效率是首要考虑因素，<code translate="no">SQ6</code> 或<code translate="no">SQ8</code> 可能比较合适。另一方面，如果精度是最重要的，<code translate="no">BF16</code> 或<code translate="no">FP16</code> 可能是首选。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>布尔标志，用于控制搜索过程中是否应用细化步骤。细化是指通过计算查询向量与候选向量之间的精确距离，对初始结果进行重新排序。</p></td>
     <td><p><strong>类型</strong>：布尔布尔<strong>范围</strong>：[<code translate="no">true</code>,<code translate="no">false</code>]</p>
<p><strong>默认值</strong>：<code translate="no">false</code></p></td>
     <td><p>如果需要高精确度，并且可以忍受稍慢的搜索时间，则设置为<code translate="no">true</code> 。如果速度是首要考虑因素，并且可以接受在精确度上稍有妥协，则使用<code translate="no">false</code> 。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>确定用于细化的数据的精度。 该精度必须高于压缩向量的精度（由<code translate="no">sq_type</code> 设置），这会影响重新排序向量的精度及其内存占用。</p></td>
     <td><p><strong>类型</strong>： 字符串字符串<strong>范围</strong>：[<code translate="no">SQ6</code>,<code translate="no">SQ8</code>,<code translate="no">BF16</code>,<code translate="no">FP16</code>,<code translate="no">FP32</code> ]</p>
<p><strong>默认值</strong>：无</p></td>
     <td><p><code translate="no">FP32</code> <code translate="no">SQ6</code><code translate="no">SQ8</code> <code translate="no">BF16</code> 和 提供了一个平衡的替代方案。<code translate="no">FP16</code> </p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定于索引的搜索参数</h3><p>下表列出了<a href="/docs/zh/hnsw-sq.md#share-DeFldzMQQoc2W4x2YiIcYUbqnne">在索引上搜索</a>时可在<code translate="no">search_params.params</code> 中配置的参数。</p>
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
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>放大系数，用于控制相对于请求的前 K 个结果，在细化阶段检查多少额外的候选结果。</p></td>
     <td><p><strong>类型</strong>：浮动<strong>范围</strong>：[1,<em>float_max</em>)</p>
<p><strong>默认值</strong>：1</p></td>
     <td><p><code translate="no">refine_k</code> 的较高值可以提高召回率和准确率，但也会增加搜索时间和资源占用。值为 1 意味着细化过程只考虑最初的前 K 个结果。</p></td>
   </tr>
</table>
