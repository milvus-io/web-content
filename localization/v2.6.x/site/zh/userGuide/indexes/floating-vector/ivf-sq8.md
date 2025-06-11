---
id: ivf-sq8.md
title: IVF_SQ8
summary: IVF_SQ8 索引是一种基于量化的索引算法，旨在解决大规模相似性搜索难题。与穷举搜索方法相比，这种索引类型能以更小的内存占用实现更快的搜索。
---
<h1 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>IVF_SQ8</strong>索引是一种<strong>基于量化的</strong>索引算法，旨在解决大规模相似性搜索难题。与穷举搜索方法相比，这种索引类型的搜索速度更快，占用内存更少。</p>
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
    </button></h2><p>IVF_SQ8 索引基于两个关键组件：</p>
<ul>
<li><p><strong>反转文件 (IVF)：</strong>将数据组织成群，使搜索算法只关注最相关的向量子集。</p></li>
<li><p><strong>标量量化 (SQ8)：</strong>将向量压缩成更紧凑的形式，大幅减少内存使用量，同时保持足够的精度，以实现快速的相似性计算。</p></li>
</ul>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>IVF 就像在一本书中创建索引。你不用扫描每一页（或者，在我们的情况下，每一个向量），而是在索引中查找特定的关键词（簇），从而快速找到相关的页面（向量）。在我们的方案中，向量被归入簇，算法将在与查询向量接近的几个簇内进行搜索。</p>
<p>下面是其工作原理：</p>
<ol>
<li><p><strong>聚类：</strong>使用 k-means 等聚类算法，将向量数据集划分为指定数量的簇。每个聚类都有一个中心点（聚类的代表向量）。</p></li>
<li><p><strong>分配：</strong>每个向量被分配到其中心点最接近的聚类中。</p></li>
<li><p><strong>反向索引：</strong>创建一个索引，将每个聚类的中心点映射到分配给该聚类的向量列表中。</p></li>
<li><p><strong>搜索：</strong>搜索近邻时，搜索算法会将查询向量与群集中心点进行比较，并选择最有希望的群集。然后将搜索范围缩小到这些选定簇内的向量。</p></li>
</ol>
<p>要了解更多技术细节，请参阅<a href="/docs/zh/ivf-flat.md">IVF_FLAT</a>。</p>
<h3 id="SQ8" class="common-anchor-header">SQ8</h3><p>标量量化（SQ）是一种用于减少高维向量大小的技术，它将向量的值替换为更小、更紧凑的表示形式。<strong>SQ8</strong>变体使用 8 位整数代替典型的 32 位浮点数来存储向量的每个维度值。这大大减少了存储数据所需的内存量。</p>
<p>以下是 SQ8 的工作原理：</p>
<ol>
<li><p><strong>范围识别：</strong>首先，确定向量内的最小值和最大值。这个范围定义了量化的边界。</p></li>
<li><p><strong>归一化：</strong>使用公式将向量值归一化为 0 和 1 之间的范围：</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>normalized_value</mtext><mo>=</mo><mfrac><mrow><mtext>value</mtext><mo>−</mo><mtext>min</mtext></mrow><mrow><mtext>max</mtext><mo>−</mo><mtext>min</mtext></mrow></mfrac></mrow><annotation encoding="application/x-tex">\text{normalized\_value} = \frac{\text{value} - \text{min}}{\text{max} - \text{min}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord text"><span class="mord">normalized_value</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1408em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">max</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">value</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>这样可以确保所有值都在标准化范围内按比例映射，为压缩做好准备。</p></li>
<li><p><strong>8 位压缩：</strong>将规范化值乘以 255（8 位整数的最大值），然后将结果四舍五入为最接近的整数。这样就能有效地将每个值压缩为 8 位表示。</p></li>
</ol>
<p>假设维度值为 1.2，最小值为-1.7，最大值为 2.3。下图显示了如何应用 SQ8 将 float32 值转换为 int8 整数。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ivf-sq8.png" alt="Ivf Sq8" class="doc-image" id="ivf-sq8" />
   </span> <span class="img-wrapper"> <span>IVF SQ8</span> </span></p>
<h3 id="IVF-+-SQ8" class="common-anchor-header">IVF + SQ8</h3><p>IVF_SQ8 索引结合了 IVF 和 SQ8，可高效执行相似性搜索：</p>
<ol>
<li><p><strong>IVF 缩小了搜索范围</strong>：数据集被划分为若干簇，当发出查询时，IVF 首先将查询与簇中心点进行比较，然后选择最相关的簇。</p></li>
<li><p><strong>SQ8 加快了距离计算速度</strong>：在选定的簇内，SQ8 会将向量压缩成 8 位整数，从而减少内存使用量，加快距离计算速度。</p></li>
</ol>
<p>通过使用 IVF 集中搜索和 SQ8 加速计算，IVF_SQ8 实现了快速搜索时间和内存效率。</p>
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
    </button></h2><p>要在 Milvus 中的向量场上建立<code translate="no">IVF_SQ8</code> 索引，请使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的附加参数。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_SQ8&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters to create using the k-means algorithm during index building</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引类型。在本例中，将值设为<code translate="no">IVF_SQ8</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用于计算向量间距离的方法。支持的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。有关详情，请参阅<a href="/docs/zh/metric.md">公制类型</a>。</p></li>
<li><p><code translate="no">params</code>:用于建立索引的附加配置选项。</p>
<ul>
<li><code translate="no">nlist</code>:在索引构建过程中使用 k-means 算法创建的簇数。</li>
</ul>
<p>要了解<code translate="no">IVF_SQ8</code> 索引可用的更多构建<a href="/docs/zh/ivf-sq8.md#share-BwprdWFCjoMBtMxorO0cWrUPnjb">参数</a>，请参阅<a href="/docs/zh/ivf-sq8.md#share-BwprdWFCjoMBtMxorO0cWrUPnjb">索引构建参数</a>。</p></li>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Number of clusters to search for candidates</span>
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
<li><code translate="no">nprobe</code>:搜索候选对象的簇数。</li>
</ul>
<p>要了解<code translate="no">IVF_SQ8</code> 索引可用的更多搜索<a href="/docs/zh/ivf-sq8.md#share-PJhqdqNaNodKiexm6F1cD2IInbe">参数</a>，请参阅<a href="/docs/zh/ivf-sq8.md#share-PJhqdqNaNodKiexm6F1cD2IInbe">特定于索引的搜索参数</a>。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立参数</h3><p>下表列出了<a href="/docs/zh/ivf-sq8.md#share-X9Y9dTuhDohRRBxSvzBcXmIEnu4">建立索引</a>时可在<code translate="no">params</code> 中配置的参数。</p>
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
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定于索引的搜索参数</h3><p>下表列出了<a href="/docs/zh/ivf-sq8.md#share-TI73dmWBOoEnocxQ8H7clSYUnLg">在索引上搜索</a>时可在<code translate="no">search_params.params</code> 中配置的参数。</p>
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
