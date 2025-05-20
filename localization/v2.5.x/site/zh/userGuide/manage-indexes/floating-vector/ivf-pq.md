---
id: ivf-pq.md
title: IVF_PQ
summary: >-
  IVF_PQ 索引是一种基于量化的索引算法，用于高维空间中的近似近邻搜索。虽然 IVF_PQ
  的速度不如某些基于图的方法，但它所需的内存通常要少得多，因此是大型数据集的实用选择。
---
<h1 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>IVF_PQ</strong>索引是一种<strong>基于量化的</strong>索引算法，用于高维空间中的近似近邻搜索。虽然速度不如某些基于图的方法，但<strong>IVF_PQ</strong>通常需要的内存要少得多，因此是大型数据集的实用选择。</p>
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
    </button></h2><p><strong>IVF_PQ</strong>是<strong>Inverted File with Product Quantization</strong> 的缩写，是一种结合索引和压缩的混合方法，用于高效的向量搜索和检索。它利用了两个核心组件：<strong>反转文件 (IVF)</strong>和<strong>乘积量化 (PQ</strong> <strong>)</strong>。</p>
<h3 id="IVF" class="common-anchor-header">反转文件</h3><p>IVF 就像在一本书中创建索引。你不用扫描每一页（或者，在我们的情况下，每一个向量），而是在索引中查找特定的关键词（群组），从而快速找到相关的页面（向量）。在我们的方案中，向量被归入簇，算法将在与查询向量接近的几个簇内进行搜索。</p>
<p>下面是其工作原理：</p>
<ol>
<li><p><strong>聚类：</strong>使用 k-means 等聚类算法，将向量数据集划分为指定数量的簇。每个聚类都有一个中心点（聚类的代表向量）。</p></li>
<li><p><strong>分配：</strong>每个向量被分配到其中心点最接近的聚类中。</p></li>
<li><p><strong>反向索引：</strong>创建一个索引，将每个聚类的中心点映射到分配给该聚类的向量列表中。</p></li>
<li><p><strong>搜索：</strong>搜索近邻时，搜索算法会将查询向量与群集中心点进行比较，并选择最有希望的群集。然后将搜索范围缩小到这些选定簇内的向量。</p></li>
</ol>
<p>要了解更多技术细节，请参阅<a href="/docs/zh/ivf-flat.md">IVF_FLAT</a>。</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p><strong>乘积量化（PQ）</strong>是一种针对高维向量的压缩方法，可显著降低存储需求，同时实现快速的相似性搜索操作符。</p>
<p>PQ 过程包括以下几个关键阶段：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-1.png" alt="Ivf Pq 1" class="doc-image" id="ivf-pq-1" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 1</span> </span></p>
<ol>
<li><p><strong>维度分解</strong>：该算法首先将每个高维向量分解为<code translate="no">m</code> 大小相等的子向量。这种分解将原始的 D 维空间转换为<code translate="no">m</code> 不相交的子空间，其中每个子空间包含<em>D/m</em>维。参数<code translate="no">m</code> 控制分解的粒度，并直接影响压缩比。</p></li>
<li><p><strong>子空间编码本生成</strong>：在每个子空间内，算法应用<a href="https://en.wikipedia.org/wiki/K-means_clustering">k-means 聚类</a>来学习一组代表性向量（中心点）。这些中心点集合起来就形成了该子空间的代码集。每个编码本中的中心点数量由参数<code translate="no">nbits</code> 决定，其中每个编码本包含<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span>2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits 中心点。例如，如果</span></span></span></span></span></span></span></span></span> <code translate="no">nbits = 8</code> ，每个编码本将包含 256 个中心点。每个中心点都有一个唯一的索引，索引位数为<code translate="no">nbits</code> 。</p></li>
<li><p><strong>向量</strong> <strong>量化</strong>：对于原始向量中的每个子向量，PQ 使用特定的度量类型在相应的子空间内识别其最近的中心点。这一过程可有效地将每个子向量映射到编码本中与其最接近的代表向量。PQ 不存储完整的子向量坐标，只保留匹配中心点的索引。</p></li>
<li><p><strong>压缩表示</strong>：最终的压缩表示由<code translate="no">m</code> 索引组成，每个子空间一个索引，统称为<strong>PQ 编码</strong>。这种编码方式将存储需求从<em>D × 32</em>位（假设为 32 位浮点数）减少到<em>m</em>×<em>nbits</em>位，在保留近似向量距离能力的同时实现了大幅压缩。</p></li>
</ol>
<p>有关参数调整和优化的更多详情，请参阅<a href="/docs/zh/ivf-pq.md#Index-params">索引参数</a>。</p>
<div class="alert note">
<p>考虑一个使用 32 位浮点数的<em>D = 128</em>维向量。在 PQ 参数<em>m = 64</em>（子向量）和<em>nbits = 8</em>（因此<em>k =</em> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">282^8</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span>2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> 8</span></span></span></span></span></span></span></span></span> <em>=</em>每个子空间<em> 256 个</em>中心点）的情况下，我们可以比较存储需求：</p>
<ul>
<li><p>原始向量：128 维 × 32 位 = 4,096 位</p></li>
<li><p>PQ 压缩向量：64 个子向量 × 8 位 = 512 位</p></li>
</ul>
<p>这意味着存储需求减少了 8 倍。</p>
</div>
<p><strong>使用 PQ 计算距离</strong></p>
<p>在使用查询向量进行相似性搜索时，PQ 可通过以下步骤实现高效的距离计算：</p>
<ol>
<li><p><strong>查询预处理</strong></p>
<ul>
<li><p>将查询向量分解为<code translate="no">m</code> 个子向量，与原始 PQ 分解结构相匹配。</p></li>
<li><p>对于每个查询子向量及其对应的编码本（包含<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span>2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits 中心点），计算并存储与所有中心点的距离。</span></span></span></span></span></span></span></span></span></p></li>
<li><p>这将生成<code translate="no">m</code> 查找表，其中每个表包含<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span>2<span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits 距离。</span></span></span></span></span></span></span></span></span></p></li>
</ul></li>
<li><p><strong>距离近似</strong></p>
<p>对于任何由 PQ 代码表示的数据库向量，其与查询向量的近似距离计算如下：</p>
<ul>
<li><p>对于<code translate="no">m</code> 的每个子向量，使用存储的中心点索引从相应的查找表中检索预先计算的距离。</p></li>
<li><p>将这些<code translate="no">m</code> 距离相加，得出基于特定度量类型（如欧氏距离）的近似距离。</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-2.png" alt="Ivf Pq 2" class="doc-image" id="ivf-pq-2" />
   </span> <span class="img-wrapper"> <span>IVF PQ 2</span> </span></p>
<h3 id="IVF-+-PQ" class="common-anchor-header">IVF + PQ</h3><p><strong>IVF_PQ</strong>索引结合了<strong>IVF</strong>和<strong>PQ</strong>的优势，可加快搜索速度。这一过程分为两个步骤：</p>
<ol>
<li><p><strong>利用 IVF 进行粗过滤</strong>：IVF 将向量空间划分为簇，缩小了搜索范围。该算法不评估整个数据集，而只关注与查询向量最接近的簇。</p></li>
<li><p><strong>与 PQ 进行细粒度比较</strong>：在选定的簇内，PQ 使用压缩和量化的向量表示来快速计算近似距离。</p></li>
</ol>
<p>控制<strong>IVF</strong>和 PQ 算法的参数对<strong>IVF_PQ</strong>索引的性能影响很大。调整这些参数对特定数据集和应用获得最佳结果至关重要。有关这些参数以及如何调整<a href="/docs/zh/ivf-pq.md#Index-params">参数</a>的详细信息，请参阅<a href="/docs/zh/ivf-pq.md#Index-params">索引参数</a>。</p>
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
    </button></h2><p>要在 Milvus 中的向量场上建立<code translate="no">IVF_PQ</code> 索引，请使用<code translate="no">add_index()</code> 方法，指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及索引的附加参数。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>在此配置中</p>
<ul>
<li><p><code translate="no">index_type</code>:要建立的索引类型。在本例中，将值设为<code translate="no">IVF_PQ</code> 。</p></li>
<li><p><code translate="no">metric_type</code>:用于计算向量间距离的方法。支持的值包括<code translate="no">COSINE</code>,<code translate="no">L2</code>, 和<code translate="no">IP</code> 。有关详情，请参阅<a href="/docs/zh/metric.md">公制类型</a>。</p></li>
<li><p><code translate="no">params</code>:用于建立索引的附加配置选项。</p>
<ul>
<li><code translate="no">m</code>:将向量分割成的子向量个数。</li>
</ul>
<p>要了解<code translate="no">IVF_PQ</code> 索引可用的更多构建<a href="/docs/zh/ivf-pq.md#Index-building-params">参数</a>，请参阅<a href="/docs/zh/ivf-pq.md#Index-building-params">索引构建参数</a>。</p></li>
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
<p>要了解<code translate="no">IVF_PQ</code> 索引可用的更多搜索<a href="/docs/zh/ivf-pq.md#Index-specific-search-params">参数</a>，请参阅<a href="/docs/zh/ivf-pq.md#Index-specific-search-params">特定于索引的搜索参数</a>。</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">索引建立参数</h3><p>下表列出了<a href="/docs/zh/ivf-pq.md#Build-index">建立索引</a>时可在<code translate="no">params</code> 中配置的参数。</p>
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
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>：[1, 65536]</p><p><strong>默认值</strong>：<code translate="no">128</code></p></td>
     <td><p><code translate="no">nlist</code> 值越大，创建的簇越精细，召回率越高，但会增加索引构建时间。请根据数据集大小和可用资源进行优化。大多数情况下，我们建议在此范围内设置值：[32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>在量化过程中将每个高维向量分成的子向量数（用于量化）。</p></td>
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>： [1, 65536[1, 65536]</p><p><strong>默认值</strong>：无</p></td>
     <td><p><code translate="no">m</code> <code translate="no">m</code> 必须是向量维数<em>(D</em>) 的除数，以确保正确分解。通常推荐的值是<em>m = D/2</em>。</p><p>在大多数情况下，我们建议在此范围内设置一个值：[D/8，D]。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>用于以压缩形式表示每个子向量中心点索引的比特数。它直接决定了每个编码本的大小。每个编码本将包含 $2^{textit{nbits}}$ 的中心点。例如，如果<code translate="no">nbits</code> 设置为 8，则每个子向量将由一个 8 位的中心点索引表示。这样，该子向量的编码本中就有 2^8$ (256) 个可能的中心点。</p></td>
     <td><p><strong>类型</strong>： 整数整数[1, 64]</p><p><strong>默认值</strong>：<code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> 值越大，编码本越大，可能会更精确地表示原始向量。不过，这也意味着要使用更多比特来存储每个索引，从而导致压缩率降低。在大多数情况下，我们建议在此范围内设置一个值：[1, 16].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定于索引的搜索参数</h3><p>下表列出了在<code translate="no">search_params.params</code> 中<a href="/docs/zh/ivf-pq.md#Search-on-index">搜索索引</a>时可以配置的参数。</p>
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
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>[1，<em>nlist］</em></p><p><strong>默认值</strong>：<code translate="no">8</code></p></td>
     <td><p>数值越大，搜索的簇数越多，搜索范围扩大，召回率提高，但代价是查询延迟增加。设置<code translate="no">nprobe</code> 与<code translate="no">nlist</code> 成比例，以平衡速度和准确性。</p><p>在大多数情况下，我们建议您在此范围内设置值：[1，nlist]。</p></td>
   </tr>
</table>
