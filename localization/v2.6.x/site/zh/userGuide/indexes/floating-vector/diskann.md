---
id: diskann.md
title: DISKANN
summary: >-
  在大规模场景中，数据集可能包括数十亿甚至数万亿个向量，标准的内存索引方法（如 HNSW、IVF_FLAT）往往因内存限制而跟不上步伐。DISKANN
  提供了一种基于磁盘的方法，可以在数据集大小超过可用 RAM 时保持较高的搜索精度和速度，从而应对这些挑战。
---
<h1 id="DISKANN" class="common-anchor-header">DISKANN<button data-href="#DISKANN" class="anchor-icon" translate="no">
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
    </button></h1><p>在大规模场景中，数据集可能包括数十亿甚至数万亿向量，标准的内存索引方法（如<a href="/docs/zh/v2.6.x/hnsw.md">HNSW</a>、<a href="/docs/zh/v2.6.x/ivf-flat.md">IVF_FLAT</a>）往往会因内存限制而跟不上步伐。<strong>DISKANN</strong>提供了一种基于磁盘的方法，可以在数据集大小超过可用 RAM 时保持较高的搜索精度和速度，从而应对这些挑战。</p>
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
    </button></h2><p><strong>DISKANN</strong>结合了高效向量搜索的两项关键技术：</p>
<ul>
<li><p><strong>Vamana 图形</strong>- 一种<strong>基于磁盘的</strong> <strong>图形</strong>索引，可将数据点（或向量）连接起来，以便在搜索过程中高效导航。</p></li>
<li><p><strong>乘积量化 (PQ)</strong>- 一种<strong>内存</strong>压缩方法，可减小向量的大小，从而快速计算向量之间的近似距离。</p></li>
</ul>
<h3 id="Index-construction" class="common-anchor-header">索引构建</h3><h4 id="Vamana-graph" class="common-anchor-header">瓦马纳图</h4><p>Vamana 图是 DISKANN 基于磁盘策略的核心。它可以处理非常大的数据集，因为在构建过程中或之后，它不需要完全驻留在内存中。</p>
<p>下图显示了 Vamana 图的构建过程。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann.png" alt="Diskann" class="doc-image" id="diskann" />
   </span> <span class="img-wrapper"> <span>Diskann</span> </span></p>
<ol>
<li><p><strong>初始随机连接：</strong>每个数据点（向量）在图中表示为一个节点。这些节点最初是随机连接的，形成一个密集的网络。通常情况下，一个节点开始时会有大约 500 条边（或连接），以实现广泛的连接。</p></li>
<li><p><strong>细化以提高效率：</strong>初始随机图需要经过优化过程，以提高搜索效率。这包括两个关键步骤：</p>
<ul>
<li><p><strong>修剪多余的边：</strong>算法根据节点之间的距离丢弃不必要的连接。这一步优先处理质量较高的边。</p>
<p><code translate="no">max_degree</code> 参数限制了每个节点的最大边数。<code translate="no">max_degree</code> 越高，图的密度越大，有可能找到更多相关的邻居（召回率更高），但也会增加内存使用量和搜索时间。</p></li>
<li><p><strong>添加战略捷径：</strong>Vamana 引入了长距离边，将向量空间中相距甚远的数据点连接起来。这些捷径允许搜索在图中快速跳转，绕过中间节点，大大加快了导航速度。</p>
<p><code translate="no">search_list_size</code> 参数决定了图细化过程的广度。较高的<code translate="no">search_list_size</code> 可以在构建过程中扩展对邻接节点的搜索，从而提高最终准确性，但会增加索引构建时间。</p></li>
</ul></li>
</ol>
<p>要了解有关参数调整的更多信息，请参阅<a href="/docs/zh/v2.6.x/diskann.md#diskann-params">DISKANN params</a>。</p>
<h4 id="PQ" class="common-anchor-header">PQ</h4><p>DISKANN 使用<strong>PQ</strong>将高维向量压缩成较小的表示<strong>（PQ 代码</strong>），并将其存储在内存中，以便快速计算近似距离。</p>
<p><code translate="no">pq_code_budget_gb_ratio</code> 参数用于管理存储这些 PQ 代码的内存占用。它表示向量的总大小（千兆字节）与分配用于存储 PQ 代码的空间之间的比率。您可以通过以下公式计算实际的 PQ 代码预算（以千兆字节为单位）：</p>
<pre><code translate="no" class="language-plaintext">PQ Code Budget (GB) = vec_field_size_gb * pq_code_budget_gb_ratio
<button class="copy-code-btn"></button></code></pre>
<p>其中</p>
<ul>
<li><p><code translate="no">vec_field_size_gb</code> 是向量的总大小（千兆字节）。</p></li>
<li><p><code translate="no">pq_code_budget_gb_ratio</code> 是用户定义的比率，表示为 PQ 代码保留的总数据大小的一部分。该参数允许在搜索精度和内存资源之间进行权衡。有关参数调整的更多信息，请参阅<a href="/docs/zh/v2.6.x/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN configs</a>。</p></li>
</ul>
<p>有关底层 PQ 方法的技术细节，请参阅<a href="/docs/zh/v2.6.x/ivf-pq.md#share-MA6SdYG0io3EASxoSpyc7JW3nvc">IVF_PQ</a>。</p>
<h3 id="Search-process" class="common-anchor-header">搜索过程</h3><p>索引（磁盘上的 Vamana 图和内存中的 PQ 代码）建立后，DISKANN 将按以下方式执行 ANN 搜索：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann-2.png" alt="Diskann 2" class="doc-image" id="diskann-2" />
   </span> <span class="img-wrapper"> <span>Diskann 2</span> </span></p>
<ol>
<li><p><strong>查询和入口点：</strong>提供一个查询向量以定位其最近的邻居。DISKANN 从 Vamana 图中选定的入口点开始，通常是数据集全球中心点附近的一个节点。全局中心点代表所有向量的平均值，这有助于最小化图中的遍历距离，从而找到所需的邻居。</p></li>
<li><p><strong>邻居探索：</strong>该算法从当前节点的边缘收集潜在的候选邻居（图中红色圆圈），利用内存中的 PQ 代码来近似这些候选邻居与查询向量之间的距离。这些潜在的候选邻居是通过 Vamana 图中的边直接连接到所选入口点的节点。</p></li>
<li><p><strong>选择节点进行精确距离计算：</strong>从近似结果中，选择最有希望的邻居（图中绿色圆圈）子集，使用它们未经压缩的原始向量进行精确距离评估。这需要从磁盘中读取数据，非常耗时。DISKANN 使用两个参数来控制精确度和速度之间的微妙平衡：</p>
<ul>
<li><p><code translate="no">beam_width_ratio</code>:一个控制搜索广度的比率，它决定了有多少候选邻域会被并行选择以探索其邻域。<code translate="no">beam_width_ratio</code> 越大，搜索范围越广，可能带来更高的精度，但也会增加计算成本和磁盘 I/O。波束宽度或选择的节点数由公式确定：<code translate="no">Beam width = Number of CPU cores * beam_width_ratio</code>.</p></li>
<li><p><code translate="no">search_cache_budget_gb_ratio</code>:为缓存频繁访问的磁盘数据而分配的内存比例。这种缓存有助于最大限度地减少磁盘 I/O，使重复搜索更快，因为数据已经在内存中。</p></li>
</ul>
<p>要了解有关参数调整的更多信息，请参阅<a href="/docs/zh/v2.6.x/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN configs</a>。</p></li>
<li><p><strong>迭代探索：</strong>搜索会迭代完善候选集，反复执行近似评估（使用 PQ），然后进行精确检查（使用磁盘中的原始向量），直到找到足够数量的邻域。</p></li>
</ol>
<h2 id="Enable-DISKANN-in-Milvus" class="common-anchor-header">在 Milvus 中启用 DISKANN<button data-href="#Enable-DISKANN-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>默认情况下，Milvus 会禁用<strong>DISKANN</strong>，以优先提高内存中索引的速度，以适应 RAM 中的数据集。不过，如果你正在处理海量数据集，或想利用<strong>DISKANN</strong> 的可扩展性和固态硬盘优化，你可以轻松启用它。</p>
<p>下面介绍如何在 Milvus 中启用 DISKANN：</p>
<ol>
<li><p><strong>更新 Milvus 配置文件</strong></p>
<ol>
<li><p>找到 Milvus 配置文件<strong>。</strong>(有关查找该文件的详细信息，请参阅 Milvus 配置文档）。</p></li>
<li><p>找到<code translate="no">queryNode.enableDisk</code> 参数，并将其值设为<code translate="no">true</code> ：</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">queryNode:</span>
     <span class="hljs-attr">enableDisk:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Enables query nodes to load and search using the on-disk index</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol></li>
<li><p><strong>为 DISKANN 优化存储</strong></p></li>
</ol>
<p>为确保 DISKANN 的最佳性能，建议将 Milvus 数据存储在快速 NVMe SSD 上。下面介绍如何在 Milvus 单机和集群部署中做到这一点：</p>
<ul>
<li><p><strong>Milvus 单机版</strong></p>
<ul>
<li><p>将 Milvus 数据目录挂载到 Milvus 容器内的 NVMe 固态硬盘上。你可以在<code translate="no">docker-compose.yml</code> 文件中或使用其他容器管理工具这样做。</p></li>
<li><p>例如，如果您的 NVMe SSD 挂载在<code translate="no">/mnt/nvme</code> 上，您可以像这样更新<code translate="no">docker-compose.yml</code> 的<code translate="no">volumes</code>部分：</p></li>
</ul>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/mnt/nvme/volumes/milvus:/var/lib/milvus</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Milvus 群集</strong></p>
<ul>
<li><p>在 QueryNode 和 IndexNode 容器中将 Milvus 数据目录挂载到 NVMe SSD 上。您可以通过容器协调设置来实现这一点。</p></li>
<li><p>通过将数据挂载到两种节点类型中的 NVMe SSD 上，可以确保搜索和索引操作的快速读写速度。</p></li>
</ul></li>
</ul>
<p>完成这些更改后，重启 Milvus 实例，使设置生效。现在，Milvus 将利用 DISKANN 处理大型数据集的能力，提供高效和可扩展的向量搜索。</p>
<h2 id="Configure-DISKANN" class="common-anchor-header">配置 DISKANN<button data-href="#Configure-DISKANN" class="anchor-icon" translate="no">
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
    </button></h2><p>DISKANN 参数可通过两种主要方法配置：</p>
<ul>
<li><p><strong>Milvus 配置文件：</strong>通过 Milvus 配置文件调整 DISKANN 参数。这种方法适用于为 Milvus 实例设置一般配置选项。</p></li>
<li><p><strong>Milvus SDK：</strong>在索引创建或搜索操作过程中，使用 Milvus SDK 微调 DISKANN 参数。这样就可以根据具体使用情况进行更精细的控制和动态参数调整。</p></li>
</ul>
<div class="alert note">
<p>SDK 所做的配置会覆盖配置文件中定义的任何设置，从而为特定应用和数据集提供灵活性和控制。</p>
</div>
<h3 id="Milvus-configuration-file" class="common-anchor-header">Milvus 配置文件</h3><p>以下是如何在<code translate="no">milvus.yaml</code> 文件中设置 DISKANN 参数的示例：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># When enable this configuration, the index parameters defined following will be automatically populated as index parameters, without requiring user input.</span>
  <span class="hljs-attr">DISKANN:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0.1</span> <span class="hljs-comment"># Ratio of cached node numbers to raw data</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="SDK-configuration" class="common-anchor-header">SDK 配置</h3><p>以下是如何使用 Milvus SDK 设置 DISKANN 参数的示例。</p>
<h4 id="Build" class="common-anchor-header">构建</h4><p>要在 Milvus 中建立一个向量场的<code translate="no">DISKANN</code> 索引，请使用<code translate="no">add_index()</code> 方法，为索引指定<code translate="no">index_type</code>,<code translate="no">metric_type</code>, 以及附加参数。</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;DISKANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;max_degree&quot;</span>: <span class="hljs-number">56</span>, <span class="hljs-comment"># Maximum number of connections (edges) each data point can have</span>
        <span class="hljs-string">&quot;search_list_size&quot;</span>: <span class="hljs-number">100</span>,
        <span class="hljs-string">&quot;search_cache_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.10</span>, <span class="hljs-comment"># Amount of memory allocated for caching frequently accessed parts of the graph</span>
        <span class="hljs-string">&quot;pq_code_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>配置好索引参数后，可直接使用<code translate="no">create_index()</code> 方法或在<code translate="no">create_collection</code> 方法中传递索引参数来创建索引。有关详情，请参阅<a href="/docs/zh/v2.6.x/create-collection.md">创建 Collections</a>。</p>
<h4 id="Search" class="common-anchor-header">搜索</h4><p>建立索引并插入实体后，就可以在索引上执行相似性搜索。</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;beam_width_ratio&quot;</span>: <span class="hljs-number">4.0</span>, <span class="hljs-comment"># degree of parallelism during search by determining the maximum number of parallel disk I/O requests relative to the number of available CPU cores.</span>
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
<h2 id="DISKANN-params" class="common-anchor-header">DISKANN 参数<button data-href="#DISKANN-params" class="anchor-icon" translate="no">
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
    </button></h2><p>通过微调 DISKANN 的参数，您可以根据特定的数据集和搜索工作量调整其行为，在速度、准确性和内存使用之间取得适当的平衡。</p>
<h3 id="Index-building-params" class="common-anchor-header">索引构建参数</h3><p>这些参数会影响 DISKANN 索引的构建方式。调整这些参数会影响索引大小、构建时间和搜索质量。</p>
<table>
   <tr>
     <th></th>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p>连接数</p></td>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>控制每个数据点在 Vamana 图表中的最大连接（边）数。</p></td>
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>：[1, 512]</p>
<p><strong>默认值</strong>：<code translate="no">56</code></p></td>
     <td><p>较高的值可创建更密集的图形，可能会提高召回率（找到更多相关结果），但也会增加内存使用量和构建时间。 
 在大多数情况下，我们建议您在此范围内设置值：[10, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>确定图形构建过程中考虑的每个数据点的候选相邻点数量。</p></td>
     <td><p><strong>类型</strong>： 整数整数<strong>范围</strong>：[1，<em>int_max］</em></p>
<p><strong>默认值</strong>：<code translate="no">100</code></p></td>
     <td><p>较大的值会导致更全面的图形，可能会提高搜索质量，但也会增加构建时间。 
 在大多数情况下，我们建议您在此范围内设置值：[K，10K]。</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>控制为缓存索引构建过程中频繁访问的图形部分而分配的内存量。</p></td>
     <td><p><strong>类型</strong>：浮点<strong>范围</strong>：[0.0, 0.3)</p>
<p><strong>默认值</strong>：<code translate="no">0.10</code></p></td>
     <td><p>较高的值会分配更多内存用于缓存，从而显著减少磁盘 I/O，但会消耗更多系统内存。在大多数情况下，我们建议在此范围内设置值：[0.0, 0.3).</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>控制 PQ 代码（数据点的压缩表示）相对于未压缩数据的大小。</p></td>
     <td><p><strong>类型</strong>：浮点<strong>范围</strong>：（0.0, 0.25］</p>
<p><strong>默认值</strong>：<code translate="no">0.125</code></p></td>
     <td><p>比率越高，搜索结果越精确，因为 PQ 代码分配的内存比例越大，有效存储的原始向量信息越多。然而，这需要更多内存，限制了处理大型数据集的能力。 较低的比率可减少内存使用量，但可能会牺牲精确度，因为较小的 PQ 代码保留的信息较少。这种方法适用于内存受限的情况，有可能实现对大型数据集的索引。</p>
<p>在大多数情况下，我们建议在此范围内设置一个值：（0.0625, 0.25］</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">特定于索引的搜索参数</h3><p>这些参数会影响 DISKANN 执行搜索的方式。调整这些参数会影响搜索速度、延迟和资源使用。</p>
<table>
   <tr>
     <th></th>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p>并行</p></td>
     <td><p><code translate="no">beam_width_ratio</code></p></td>
     <td><p>通过确定相对于可用 CPU 内核数的最大并行磁盘 I/O 请求数，控制搜索过程中的并行程度。</p></td>
     <td><p><strong>类型</strong>：浮点<strong>范围</strong>：[1，max(128 / CPU 核数，16)</p>
<p><strong>默认值</strong>：<code translate="no">4.0</code></p></td>
     <td><p>数值越大，并行性越高，这可以加快拥有强大 CPU 和 SSD 的系统的搜索速度。在大多数情况下，我们建议在此范围内设置值：[1.0, 4.0].</p></td>
   </tr>
</table>
