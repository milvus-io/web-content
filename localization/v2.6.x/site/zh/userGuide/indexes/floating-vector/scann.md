---
id: scann.md
title: SCANN
summary: >-
  Milvus 中的 SCANN 索引由谷歌的 ScaNN
  库提供支持，旨在解决向量相似性搜索的扩展难题，在速度和准确性之间取得平衡，即使在传统上会给大多数搜索算法带来挑战的大型数据集上也是如此。
---
<h1 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h1><p>在谷歌<a href="https://github.com/google-research/google-research/blob/master/scann%2FREADME.md">ScaNN</a>库的支持下，Milvus 中的<code translate="no">SCANN</code> 索引旨在应对向量相似性搜索的扩展挑战，在速度和准确性之间取得平衡，即使是在传统上会给大多数搜索算法带来挑战的大型数据集上也是如此。</p>
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
    </button></h2><p>ScaNN 是为解决向量搜索中最大的挑战之一而设计的：即使数据集越来越大、越来越复杂，也能在高维空间中高效地找到最相关的向量。它的架构将向量搜索过程分解为不同的阶段：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scann.png" alt="Scann" class="doc-image" id="scann" />
   </span> <span class="img-wrapper"> <span>扫描</span> </span></p>
<ol>
<li><p><strong>分区</strong>：将数据集划分为簇。这种方法只关注相关数据子集，而不是扫描整个数据集，从而缩小了搜索空间，节省了时间和处理资源。ScaNN 通常使用<a href="https://zilliz.com/blog/k-means-clustering">k-means</a> 等聚类算法来识别聚类，从而更高效地执行相似性搜索。</p></li>
<li><p><strong>量化</strong>：ScaNN 在分区后采用一种称为<a href="https://arxiv.org/abs/1908.10396">各向异性向量量化的量化</a>过程。传统的量化侧重于最小化原始向量和压缩向量之间的整体距离，这对于<a href="https://papers.nips.cc/paper/5329-asymmetric-lsh-alsh-for-sublinear-time-maximum-inner-product-search-mips.pdf">最大内积搜索（MIPS）</a>等任务来说并不理想，因为在这类任务中，相似性是由向量的内积而非直接距离决定的。各向异性量化则优先保留向量之间的平行分量，或对计算精确内积最重要的部分。通过这种方法，ScaNN 可以仔细地将压缩向量与查询对齐，从而保持较高的 MIPS 精度，实现更快、更精确的相似性搜索。</p></li>
<li><p><strong>重新排序</strong>重新排序阶段是最后一步，ScaNN 在此阶段对分区和量化阶段的搜索结果进行微调。这种重新排序会对排名靠前的候选向量进行精确的内积计算，确保最终结果高度准确。重新排序在高速推荐引擎或图像搜索应用中至关重要，在这些应用中，最初的过滤和聚类是粗略的一层，而最后阶段则确保只向用户返回最相关的结果。</p></li>
</ol>
<p><code translate="no">SCANN</code> 的性能由两个关键参数控制，您可以对速度和准确性之间的平衡进行微调：</p>
<ul>
<li><p><code translate="no">with_raw_data</code>:控制原始向量数据是否与量化表示同时存储。启用该参数可提高重新排序时的准确性，但会增加存储需求。</p></li>
<li><p><code translate="no">reorder_k</code>:确定在重新排序的最后阶段对多少候选对象进行细化。数值越大，准确率越高，但搜索延迟也会增加。</p></li>
</ul>
<p>有关针对特定用例优化这些参数的详细指导，请参阅<a href="/docs/zh/scann.md#Index-params">索引参数</a>。</p>
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
    </button></h2><p>要在 Milvus 中的向量场上建立<code translate="no">SCANN</code> 索引，请使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的附加参数。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;SCANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span></span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to hold raw data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引类型。在本例中，将值设为<code translate="no">SCANN</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用于计算向量间距离的方法。支持的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。有关详情，请参阅<a href="/docs/zh/metric.md">公制类型</a>。</p></li>
<li><p><code translate="no">params</code>:用于建立索引的附加配置选项。</p>
<ul>
<li><code translate="no">with_raw_data</code>:是否在存储量化表示的同时存储原始向量数据。</li>
</ul>
<p>要了解<code translate="no">SCANN</code> 索引可用的更多构建<a href="/docs/zh/scann.md#Index-building-params">参数</a>，请参阅<a href="/docs/zh/scann.md#Index-building-params">索引构建参数</a>。</p></li>
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
        <span class="hljs-string">&quot;reorder_k&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of candidates to refine</span>
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
<li><code translate="no">reorder_k</code>:在重新排序阶段要细化的候选实体数量。</li>
</ul>
<p>要了解<code translate="no">SCANN</code> 索引可用的更多搜索<a href="/docs/zh/scann.md#Index-specific-search-params">参数</a>，请参阅<a href="/docs/zh/scann.md#Index-specific-search-params">特定于索引的搜索参数</a>。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立参数</h3><p>下表列出了<a href="/docs/zh/scann.md#Build-index">建立索引</a>时可在<code translate="no">params</code> 中配置的参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>是否在存储量化表示的同时存储原始向量数据。启用后，可以在重新排序阶段使用原始向量而不是量化近似值来进行更精确的相似性计算。</p></td>
     <td><p><strong>类型</strong>：布尔布尔<strong>范围</strong> <code translate="no">true</code>,<code translate="no">false</code></p>
<p><strong>默认值</strong>：<code translate="no">true</code></p></td>
     <td><p>设置为<code translate="no">true</code> 以获得<strong>更高的搜索精度</strong>，并且存储空间不是主要考虑因素。原始向量数据可在重新排序时进行更精确的相似性计算。 设置为<code translate="no">false</code> 可<strong>减少存储开销</strong>和内存使用，尤其是对于大型数据集。不过，由于重新排序阶段将使用量化向量，这可能会导致搜索精度略微降低。</p>
<p><strong>建议</strong>使用：对于准确性要求较高的生产应用，请使用<code translate="no">true</code> 。</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定索引搜索参数</h3><p>下表列出了<a href="/docs/zh/scann.md#Search-on-index">在索引上搜索</a>时可在<code translate="no">search_params.params</code> 中配置的参数。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reorder_k</code></p></td>
     <td><p>控制在重新排序阶段精炼的候选向量数量。该参数决定了使用更精确的相似性计算方法重新评估初始分区和量化阶段的前几名候选向量的数量。</p></td>
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>：[1，<em>int_max］</em></p>
<p><strong>默认值</strong>：无</p></td>
     <td><p><code translate="no">reorder_k</code> 越大，<strong>搜索准确率</strong>越高，因为在最后细化阶段会考虑更多候选项。如果实现高召回率至关重要，而<strong>搜索</strong>速度则不那么重要，则可以考虑增加<code translate="no">reorder_k</code> 。一个好的起点是 2-5 倍于所需的<code translate="no">limit</code> （返回的前 K 个结果）。</p>
<p>考虑降低<code translate="no">reorder_k</code> 以优先加快搜索速度，尤其是在可以接受准确率略有下降的情况下。</p>
<p>在大多数情况下，我们建议您在此范围内设置一个值：[<em>limit</em>,<em>limit</em>* 5]。</p></td>
   </tr>
</table>
