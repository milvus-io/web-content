---
id: hnsw.md
title: HNSW
summary: HNSW 索引是一种基于图的索引算法，可以提高搜索高维浮动向量时的性能。它具有出色的搜索精度和较低的延迟，但需要较高的内存开销来维护其分层图结构。
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
    </button></h1><p><strong>HNSW</strong>索引是一种<strong>基于图的</strong>索引算法，可以提高搜索高维浮动向量时的性能。它具有<strong>出色的</strong>搜索精度和<strong>低</strong>延迟，但需要<strong>较高的</strong>内存开销来维护其分层图结构。</p>
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
    </button></h2><p>分层导航小世界（HNSW）算法构建了一个多层图，有点像不同缩放级别的地图。<strong>底层</strong>包含所有数据点，而<strong>上层</strong>则由从底层采样的数据点子集组成。</p>
<p>在这种层次结构中，每一层都包含代表数据点的节点，节点之间由表示其接近程度的边连接。上层提供远距离跳转，以快速接近目标，而下层则进行细粒度搜索，以获得最准确的结果。</p>
<p>下面是它的工作原理：</p>
<ol>
<li><p><strong>入口点</strong>：搜索从顶层的一个固定入口点开始，该入口点是图中的一个预定节点。</p></li>
<li><p><strong>贪婪搜索</strong>：算法贪婪地移动到当前层的最近邻居，直到无法再接近查询向量为止。上层起到导航作用，作为粗过滤器，为下层的精细搜索找到潜在的入口点。</p></li>
<li><p><strong>层层下降</strong>：一旦当前层达到<strong>局部最小值</strong>，算法就会利用预先建立的连接跳转到下层，并重复贪婪搜索。</p></li>
<li><p><strong>最后</strong> <strong>细化</strong>：这一过程一直持续到最底层，在最底层进行最后的细化步骤，找出最近的邻居。</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/HNSW.png" alt="HNSW" class="doc-image" id="hnsw" />
   </span> <span class="img-wrapper"> <span>HNSW</span> </span></p>
<p>HNSW 的性能取决于控制图结构和搜索行为的几个关键参数。这些参数包括</p>
<ul>
<li><p><code translate="no">M</code>:图中每个节点在层次结构的每个层级所能拥有的最大边数或连接数。<code translate="no">M</code> 越高，图的密度就越大，搜索结果的召回率和准确率也就越高，因为有更多的路径可以探索，但同时也会消耗更多内存，并由于连接数的增加而减慢插入时间。如上图所示，<strong>M = 5</strong>表示 HNSW 图中的每个节点最多与 5 个其他节点直接相连。这就形成了一个中等密度的图结构，节点有多条路径到达其他节点。</p></li>
<li><p><code translate="no">efConstruction</code>:索引构建过程中考虑的候选节点数量。<code translate="no">efConstruction</code> 越高，图的质量越好，但需要更多时间来构建。</p></li>
<li><p><code translate="no">ef</code>:搜索过程中评估的邻居数量。增加<code translate="no">ef</code> 可以提高找到最近邻居的可能性，但会减慢搜索过程。</p></li>
</ul>
<p>有关如何根据需要调整这些设置的详情，请参阅<a href="/docs/zh/hnsw.md#Index-params">索引参数</a>。</p>
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
    </button></h2><p>要在 Milvus 中的向量场上建立<code translate="no">HNSW</code> 索引，请使用<code translate="no">add_index()</code> 方法，为索引指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及附加参数。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

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
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引类型。在本例中，将值设为<code translate="no">HNSW</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用于计算向量间距离的方法。支持的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。有关详情，请参阅<a href="/docs/zh/metric.md">公制类型</a>。</p></li>
<li><p><code translate="no">params</code>:用于建立索引的附加配置选项。</p>
<ul>
<li><p><code translate="no">M</code>:每个节点可连接的最大邻居数量。</p></li>
<li><p><code translate="no">efConstruction</code>:索引构建过程中考虑连接的候选邻居数量。</p></li>
</ul>
<p>要了解<code translate="no">HNSW</code> 索引可用的更多构建<a href="/docs/zh/hnsw.md#Index-building-params">参数</a>，请参阅<a href="/docs/zh/hnsw.md#Index-building-params">索引构建参数</a>。</p></li>
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
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><p><code translate="no">params</code>:在索引上搜索的其他配置选项。</p>
<ul>
<li><code translate="no">ef</code>:搜索时要考虑的邻居数量。</li>
</ul>
<p>要了解<code translate="no">HNSW</code> 索引可用的更多搜索<a href="/docs/zh/hnsw.md#Index-specific-search-params">参数</a>，请参阅<a href="/docs/zh/hnsw.md#Index-specific-search-params">特定于索引的搜索参数</a>。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立参数</h3><p>下表列出了<a href="/docs/zh/hnsw.md#Build-index">建立索引</a>时可在<code translate="no">params</code> 中配置的参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>图中每个节点可拥有的最大连接数（或边），包括出边和入边。该参数直接影响索引构建和搜索。</p></td>
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>：[2, 2048]</p><p><strong>默认值</strong>：<code translate="no">30</code> （每个节点最多有 30 条出边和 30 条入边）</p></td>
     <td><p>较大的<code translate="no">M</code> 通常会<strong>提高准确率</strong>，但会<strong>增加内存开销</strong>，并<strong>减慢索引构建和搜索速度</strong>。对于高维度数据集或高召回率至关重要时，可考虑提高<code translate="no">M</code> 。</p><p>当内存使用和搜索速度是首要考虑因素时，可考虑降低<code translate="no">M</code> 。</p><p>在大多数情况下，我们建议您在此范围内设置一个值：[5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>索引构建过程中考虑连接的候选邻居数量。每个新元素都会评估一个更大的候选池，但实际建立的最大连接数仍受<code translate="no">M</code> 限制。</p></td>
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>：[1，<em>int_max］</em></p><p><strong>默认值</strong>：<code translate="no">360</code></p></td>
     <td><p><code translate="no">efConstruction</code> 越高，<strong>索引</strong>越<strong>准确</strong>，因为会探索更多潜在连接。不过，这也会导致建立<strong>索引的时间延长和内存使用量增加</strong>。考虑增加<code translate="no">efConstruction</code> 以提高准确性，尤其是在索引时间不太重要的情况下。</p><p>在资源紧张的情况下，可考虑降低<code translate="no">efConstruction</code> ，以加快索引构建速度。</p><p>在大多数情况下，我们建议在此范围内设置一个值：[50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定于索引的搜索参数</h3><p>下表列出了<a href="/docs/zh/hnsw.md#Search-on-index">在索引上搜索</a>时可在<code translate="no">search_params.params</code> 中配置的参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>控制近邻检索时的搜索范围。它决定访问多少节点并将其评估为潜在近邻。  该参数只影响搜索过程，并且只适用于图形的底层。</p></td>
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>：[1，<em>int_max］</em></p><p><strong>默认值</strong>：<em>limit</em>（返回的前 K 个近邻）</p></td>
     <td><p><code translate="no">ef</code> 越大，通常<strong>搜索精度越高</strong>，因为会考虑更多的潜在近邻。不过，这也会<strong>增加搜索时间</strong>。如果实现高召回率至关重要，而搜索速度则不那么重要，则可考虑提高<code translate="no">ef</code> 。</p><p>考虑降低<code translate="no">ef</code> 以优先提高搜索速度，尤其是在可以接受稍微降低准确率的情况下。</p><p>在大多数情况下，我们建议您在此范围内设置一个值：[K，10K]。</p></td>
   </tr>
</table>
