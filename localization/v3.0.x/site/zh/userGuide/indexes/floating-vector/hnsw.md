---
id: hnsw.md
title: HNSW
summary: HNSW 索引是一种基于图的索引算法，可在搜索高维浮点向量时提升性能。它不仅具有出色的搜索精度和低延迟，但为了维护其分层图结构，需要较高的内存开销。
---
<h1 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW</strong>索引是一种<strong>基于图的</strong>索引算法，可在搜索高维浮点向量时提升性能。它不仅具备<strong>出色的</strong>搜索精度和<strong>低延迟</strong>，但为了维护其分层图结构，需要<strong>较高的</strong>内存开销。</p>
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
    </button></h2><p>分层可导航小世界（HNSW）算法构建了一个多层图结构，类似于具有不同缩放级别的地图。<strong>底层</strong>包含所有数据点，<strong>而上层</strong>则由从底层采样得到的数据点子集组成。</p>
<p>在此分层结构中，每一层都包含代表数据点的节点，这些节点通过表示其距离的边相互连接。上层可实现长距离跳转，以便快速接近目标；而下层则支持精细搜索，以获得最准确的结果。</p>
<p>其工作原理如下：</p>
<ol>
<li><p><strong>入口点</strong>：搜索从顶层的固定入口点开始，该点是图中预先确定的节点。</p></li>
<li><p><strong>贪婪搜索</strong>：算法在当前层贪婪地向最近邻节点移动，直到无法再更接近查询向量为止。上层起导航作用，作为粗略过滤器，用于定位下层精细搜索的潜在入口点。</p></li>
<li><p><strong>层级下降</strong>：当在当前层达到<strong>局部极小值</strong>时，算法会通过预先建立的连接跳转至下层，并重复贪婪搜索。</p></li>
<li><p><strong>最终</strong> <strong>优化</strong>：该过程持续进行直至到达底层，此时通过最终优化步骤确定最近邻节点。</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" /> 
   <span>HNSW</span>
  
 </span></p>
<p>HNSW 的性能取决于几个关键参数，这些参数同时控制着图的结构和搜索行为。其中包括：</p>
<ul>
<li><p><code translate="no">M</code>：在层次结构的每一层中，每个节点在图中可拥有的边或连接的最大数量。<code translate="no">M</code> 值越高，图的密度越大，由于搜索可探索的路径更多，召回率和准确率随之提高，但额外的连接也会消耗更多内存并延长插入时间。 如上图所示<strong>，M = 5</strong>表示 HNSW 图中的每个节点最多可与其他 5 个其他节点直接相连。这形成了一种中等密度的图结构，节点之间存在多条路径可相互连接。</p></li>
<li><p><code translate="no">efConstruction</code>: 索引构建过程中考虑的候选节点数量。较高的<code translate="no">efConstruction</code> 通常能生成质量更高的图，但构建所需时间更长。</p></li>
<li><p><code translate="no">ef</code>：搜索过程中评估的邻居数量。增加<code translate="no">ef</code> 可提高找到最近邻居的概率，但会减慢搜索过程。</p></li>
</ul>
<p>有关如何根据需求调整这些设置的详细信息，请参阅<a href="/docs/zh/hnsw.md#Index-params">“索引参数”</a>。</p>
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
    </button></h2><p>本示例使用名为<code translate="no">client</code> 的已连接客户端，以及名为<code translate="no">your_collection_name</code> 的现有 Collection。该 Collection 包含一个名为<code translate="no">your_vector_field_name</code> 的五维向量字段。</p>
<p>使用<code translate="no">add_index()</code> 定义索引参数，然后使用<code translate="no">create_index()</code> 构建索引。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
    } <span class="hljs-comment"># Index building params</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中：</p>
<ul>
<li><p><code translate="no">index_type</code>: 要构建的索引类型。在此示例中，将值设置为<code translate="no">HNSW</code> 。</p></li>
<li><p><code translate="no">metric_type</code>: 用于计算向量之间距离的方法。支持的值包括<code translate="no">COSINE</code> 、<code translate="no">L2</code> 和<code translate="no">IP</code> 。详情请参阅<a href="/docs/zh/metric.md">“度量类型”</a>。</p></li>
<li><p><code translate="no">params</code>: 构建索引的其他配置选项。</p>
<ul>
<li><p><code translate="no">M</code>: 每个节点可连接的邻居最大数量。</p></li>
<li><p><code translate="no">efConstruction</code>: 在索引构建过程中，用于连接考虑的候选邻居数量。</p></li>
</ul>
<p>该示例将<code translate="no">M=64</code> 和<code translate="no">efConstruction=100</code> 设置为调优覆盖值。有关默认值和有效范围，请参阅<a href="/docs/zh/hnsw.md#Index-building-params">“索引构建参数”</a>。</p></li>
</ul>
<p>若要同时创建Collection及其索引，请将索引参数传递给<code translate="no">create_collection()</code> 。有关详细信息，请参阅<a href="/docs/zh/create-collection.md">“创建Collection”</a>。</p>
<h2 id="Search-on-index" class="common-anchor-header">基于索引进行搜索<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>构建索引并插入实体后，加载Collection并对其向量字段进行搜索。对于普通的kNN搜索，请将<code translate="no">ef</code> 设置为不小于<code translate="no">limit</code> 。</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

client.load_collection(collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>)

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中：</p>
<ul>
<li><p><code translate="no">params</code>：针对索引搜索的附加配置选项。</p>
<ul>
<li><code translate="no">ef</code>: 搜索时考虑的邻居数量。</li>
</ul>
<p>要了解<code translate="no">HNSW</code> 索引可用的更多搜索参数，请参阅<a href="/docs/zh/hnsw.md#Index-specific-search-params">“索引特定搜索参数</a>”。</p></li>
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
    </button></h2><p>下表列出了索引构建和搜索的参数。对于您未指定的参数，服务器设置可以覆盖其默认值。</p>
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
    </button></h3><p>下表列出了在<code translate="no">params</code> 中<a href="/docs/zh/hnsw.md#Build-index">构建索引</a>时可配置的参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
     <th><p>值范围</p></th>
     <th><p>调优建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>每个节点在图中可拥有的最大连接数（或边数），包括出边和入边。该参数直接影响索引构建和搜索。</p></td>
     <td><p><strong>类型</strong>：整数<strong>范围</strong>：[2, 2048]</p><p><strong>默认值</strong>：<code translate="no">30</code> （每个节点最多 30 条出边和 30 条入边）</p></td>
     <td><p>较大的<code translate="no">M</code> 通常能<strong>提高准确率</strong>，但<strong>会增加内存开销</strong>，并<strong>减慢索引构建和搜索的速度</strong>。对于高维数据集，或者当高召回率至关重要时，请考虑增加<code translate="no">M</code> 。</p><p>当内存使用和搜索速度是主要关注点时，请考虑降低<code translate="no">M</code> 。</p><p>在大多数情况下，建议将该值设置在 [5, 100] 范围内。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>在构建索引时，用于连接的候选邻居数量。对于每个新元素，系统会评估更大的候选邻居池，但实际建立的连接最大数量仍受<code translate="no">M</code> 的限制。</p></td>
     <td><p><strong>类型</strong>：整数<strong>范围</strong>：[1,<em>int_max</em>]</p><p><strong>默认值</strong>：<code translate="no">360</code></p></td>
     <td><p>较高的<code translate="no">efConstruction</code> 通常会生成<strong>更精确的索引，</strong>因为会探索更多的潜在连接。但这也会导致<strong>索引构建时间延长，并增加</strong>构建过程中的<strong>内存占用</strong>。若需提高精度，建议增加<code translate="no">efConstruction</code> ，特别是在索引时间不是关键因素的情况下。</p><p>当资源受限时，请考虑降低<code translate="no">efConstruction</code> 以加快索引构建速度。</p><p>在大多数情况下，建议您将该值设置在 [50, 500] 范围内。</p></td>
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
    </button></h3><p>下表列出了在<code translate="no">search_params.params</code> 中<a href="/docs/zh/hnsw.md#Search-on-index">针对该索引进行搜索</a>时可配置的参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>描述</p></th>
     <th><p>值范围</p></th>
     <th><p>调优建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>控制最近邻检索过程中的搜索范围。它决定了将访问并评估多少个节点作为潜在的最近邻。该参数仅影响搜索过程，且仅适用于图的最底层。</p></td>
     <td><p><strong>类型</strong>：整数<strong>范围</strong>：[1,<em>int_max</em>]</p><p><strong>默认值</strong>：普通 kNN 搜索时为<code translate="no">max(limit, 16)</code> ；范围搜索时为<code translate="no">512</code> 。</p><p>对于普通kNN搜索，显式指定的<code translate="no">ef</code> 必须大于或等于<code translate="no">limit</code> （即要返回的最近邻节点数）。</p></td>
     <td><p>较大的<code translate="no">ef</code> 通常会<strong>提高搜索准确率</strong>，因为会考虑更多的潜在邻居。但是，这也会<strong>增加搜索时间</strong>。当实现高召回率至关重要，而搜索速度不是主要考虑因素时，请考虑增加<code translate="no">ef</code> 。</p><p>若需优先保证搜索速度，特别是当允许精度略有降低时，请考虑降低<code translate="no">ef</code> 。</p><p>在大多数情况下，我们建议您将该值设置在 [K, 10K] 范围内。</p></td>
   </tr>
</table>
