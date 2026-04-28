---
id: aisaq.md
title: AISAQCompatible with Milvus 2.6.4+
summary: >-
  AISAQ 是一种基于磁盘的向量索引，它对 DISKANN 进行了扩展，可以处理十亿规模的数据集，而不会超出内存限制。与将压缩向量保存在内存中的
  DISKANN 不同，AISAQ 将所有数据保存在磁盘上，提供两种模式以平衡性能和存储成本。
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>AISAQ 是一种基于磁盘的向量索引，它对<a href="/docs/zh/diskann.md">DISKANN</a>进行了扩展，以最小的 DRAM 占用处理十亿规模的数据集。</p>
<p>与将压缩向量保存在内存中的 DISKANN 不同，AISAQ 采用 "近零 DRAM 架构 "设计，这意味着将所有数据结构保存在固态硬盘上。</p>
<p>AISAQ 可以使用标准服务器运行超大规模数据库，同时提供操作符来平衡性能和存储成本。</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">AISAQ 如何工作<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>上图比较了<strong>DISKANN</strong>、<strong>AISAQ-Performance</strong> 和<strong>AISAQ-Scale</strong> 的存储布局，显示了数据（原始向量、边列表和 PQ 代码）在 RAM 和磁盘之间的分布情况。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
   </span> <span class="img-wrapper"> <span>Aisaq 与 Diskann</span> </span></p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">基础：DISKANN 回顾<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>在 DISKANN 中，原始向量和边缘列表存储在磁盘上，而 PQ 压缩向量则保存在内存（DRAM）中。</p>
<p>当 DISKANN 遍历到一个节点（如<em>向量 0</em>）时：</p>
<ul>
<li><p>它会从磁盘加载原始向量<strong>（raw_vector_0</strong>）及其边缘列表<strong>（edgelist_0</strong>）。</p></li>
<li><p>边列表指出了下一步要访问的邻居（本例中为节点 2、3 和 5）。</p></li>
<li><p>原始向量用于计算与查询向量的精确距离，以进行排序。</p></li>
<li><p>内存中的 PQ 数据用于近似距离过滤，以指导下一次遍历。</p></li>
</ul>
<p>由于 PQ 数据已缓存在 DRAM 中，因此每次节点访问只需一次磁盘 I/O，从而以适度的内存使用实现了较高的查询速度。</p>
<p>有关这些组件和参数的详细说明，请参阅<a href="/docs/zh/diskann.md">DISKANN</a>。</p>
<h3 id="AISAQ-Operation-Modes" class="common-anchor-header">AISAQ 操作符<button data-href="#AISAQ-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ 提供两种操作模式，以解决两种不同的使用情况：</p>
<p>性能模式：针对需要低延迟和高吞吐量的大规模应用（如在线语义搜索）进行了优化。</p>
<p>规模模式：针对延迟限制较宽松的应用（如 RAG 和离线语义搜索）进行了优化，同时可将数据集扩展到超高规模，实现低成本高效益。</p>
<h4 id="AISAQ-performance-mode" class="common-anchor-header">AISAQ 性能模式</h4><p><strong>AISAQ-performance</strong>通过将 PQ 数据从内存移至磁盘，实现了 "近乎零 DRAM 占用"，同时通过数据主机托管和冗余保持低 IOPS。</p>
<ul>
<li><p>每个节点的原始向量、边缘列表及其邻居的 PQ 数据都一起存储在磁盘上。</p></li>
<li><p>这种布局确保了访问一个节点（如向量 0）仍然只需要一次磁盘 I/O。</p></li>
<li><p>由于 PQ 数据被冗余存储在多个节点附近，索引文件大小会显著增加，从而消耗更多磁盘空间。</p></li>
</ul>
<h4 id="AISAQ-scale-mode" class="common-anchor-header">AISAQ-scale 模式</h4><p><strong>AISAQ-scale</strong>专注于减少磁盘空间的使用，同时满足目标应用的性能要求。</p>
<p>在这种模式下</p>
<ul>
<li><p>PQ 数据单独存储在磁盘上，没有冗余。</p></li>
<li><p>这种设计最大限度地减少了索引大小，但在图形遍历过程中会导致更多的 I/O 操作符。</p></li>
<li><p>为了减少 IOPS 开销，AISAQ 引入了两种优化方法：</p>
<ul>
<li><p>重新排列算法，按优先级对 PQ 向量进行排序，以提高数据的位置性。</p></li>
<li><p>DRAM 中的 PQ 缓存（pq_read_page_cache_size），用于缓存频繁访问的 PQ 数据。</p></li>
</ul></li>
</ul>
<h2 id="Example-configuration" class="common-anchor-header">配置示例<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Controls the maximum number of connections (edges) each data point can have in the Vamana graph</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the search_list_size best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top max_degree nodes are selected to form the final edges</span>
      <span class="hljs-attr">inline_pq:</span> <span class="hljs-number">-1</span> <span class="hljs-comment"># Number of PQ vectors stored inline per Index node (read when node is accessed, to reduce IO)</span>
      <span class="hljs-attr">rearrange:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Re-arrange the PQ vectors data structure to improve data locality and reduce disk accesses during search (ignored in performance mode)</span>
      <span class="hljs-attr">num_entry_points:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate entry points to optimize search entry-point selection</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
      <span class="hljs-attr">disk_pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.25</span> <span class="hljs-comment"># Controls the size of the PQ codes of the high precision vectors stored in the index (used for re-ranking), compared to the size of the uncompressed data</span>
      <span class="hljs-attr">pq_cache_size:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># PQ vectors cache size in DRAM (bytes). The PQ vectors cache is loaded during Index load and used during search to reduce IOs (ignored in performance mode)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># Controls the amount of DRAM to be used for caching frequently accessed index nodes. This cache is loaded during index load and used during search to reduce IOs</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">search_list:</span> <span class="hljs-number">16</span> <span class="hljs-comment"># During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency</span>
      <span class="hljs-attr">beamwidth:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read the index nodes</span>
      <span class="hljs-attr">vectors_beamwidth:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read groups of neighboring PQ vectors (ignored in performance mode)</span>
      <span class="hljs-attr">pq_read_page_cache_size:</span> <span class="hljs-number">5242880</span> <span class="hljs-string">(5MiB)</span> <span class="hljs-comment"># PQ read cache size in DRAM per search thread (bytes). It caches frequently accessed data pages containing PQ vectors (ignored in performance mode and applicable only when rearrange is true). The PQ read cache memory is reused across all AISAQ segments</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-parameters" class="common-anchor-header">AISAQ 参数<button data-href="#AISAQ-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ 继承了 DISKANN 的一些参数 -<code translate="no">max_degree</code>,<code translate="no">search_list_size</code>, 和<code translate="no">pq_code_budget_gb_ratio</code> 。</p>
<h3 id="Index-building-params" class="common-anchor-header">索引建立参数<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>这些参数影响 AISAQ 索引的构建方式。调整这些参数会影响索引大小、构建时间和搜索质量。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>控制 Vamana 图形中每个数据点的最大连接（边）数。</p></td>
     <td><p><strong>类型</strong>：整数</p><p><strong>范围</strong>： [1, 512[1, 512]</p><p><strong>默认值</strong>：<code translate="no">56</code></p></td>
     <td><p>较高的值可创建更密集的图表，从而可能提高召回率（找到更多相关结果），但同时也会增加内存使用量和构建时间。在大多数情况下，我们建议您在此范围内设置值：[10, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>在索引构建过程中，该参数定义了为每个节点搜索近邻时使用的候选池大小。对于添加到图中的每个节点，算法都会维护一个 search_list_size 最佳候选节点列表。当该列表无法再改进时，就会停止搜索邻居。从这个最终候选节点库中，选出最大度数最高的节点组成最终的边。</p></td>
     <td><p><strong>类型</strong>：整数</p><p><strong>范围</strong>： [1, 512[1, 512]</p><p><strong>默认值</strong>：<code translate="no">100</code></p></td>
     <td><p>search_list_size 越大，为每个节点找到真正近邻的可能性就越大，从而可以获得更高质量的图和更好的搜索性能（召回率）。但是，这样做的代价是索引建立时间大大延长。应始终将其设置为大于或等于 max_degree 的值。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>每个索引节点内嵌存储的 PQ 向量数量（节点被访问时读取，以减少 IO）</p></td>
     <td><p><strong>类型</strong>：整数</p><p><strong>范围</strong>： [0, max_degree[0，<em>max_degree］</em></p><p><strong>默认值</strong>：<code translate="no">-1</code></p></td>
     <td><p><code translate="no">inline_pq</code> 的值越大，性能越好，但会增加磁盘空间。</p><p>设置<code translate="no">inline_pq</code>=0 可使 AISAQ 采用比例模式。</p><p>设置<code translate="no">inline_pq</code>=-1，可自动用 PQ 向量填充索引中任何未使用的空间，以进一步优化缩放模式下的 AISAQ。</p><p>对于性能模式下的 AISAQ，设置<code translate="no">inline_pq</code>=max_<em>degree</em>。</p><p><code translate="no">inline_pq</code> 在 0 和<em>max_degree</em>之间的设置可在性能和磁盘空间消耗之间实现可调节的平衡。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>重新排列 PQ 向量数据结构，以提高数据位置性并减少搜索过程中的磁盘访问（在性能模式下忽略）。</p></td>
     <td><p><strong>类型</strong>布尔</p><p><strong>范围</strong>： [true, false[真，假］</p><p><strong>默认值</strong>：<code translate="no">true</code></p></td>
     <td><p>为 "true "时，减少搜索过程中的 IO，只需少量增加内存和索引建立时间。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_entry_points</code></p></td>
     <td><p>优化搜索入口点选择的候选入口点数量。</p></td>
     <td><p><strong>类型</strong>： 整数整数</p><p><strong>范围</strong>： [0, 1000[0, 1000]</p><p><strong>默认值</strong>：<code translate="no">100</code></p></td>
     <td><p>高值可以从更近的入口点开始搜索，从而缩短搜索时间。</p><p>对于大数据段，请设置较高的值（例如，对于 10M 及以上的向量，请使用 1000 的值）。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>控制 PQ 代码（数据点的压缩表示）相对于未压缩数据的大小。</p></td>
     <td><p><strong>类型</strong>：浮点数</p><p><strong>范围</strong>：（0.0, 0.25］</p><p><strong>默认值</strong>：<code translate="no">0.125</code></p></td>
     <td><p>比率越大，搜索结果越精确，可有效存储更多原始向量信息，但会增加搜索过程中的计算复杂度。</p><p>在大多数情况下，我们建议在此范围内设置值：（0.0417, 0.25]。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disk_pq_code_budget_gb_ratio</code></p></td>
     <td><p>与未压缩数据的大小相比，控制存储在索引中（用于重新排序）的高精度向量的 PQ 代码的大小。</p></td>
     <td><p><strong>类型</strong>：浮点数</p><p><strong>范围</strong>： [0, 0.25[0, 0.25]</p><p><strong>默认值</strong>：<code translate="no">0.25</code></p></td>
     <td><p>默认值为 0.25 时，向量将被量化为原始大小的 25%（4 倍压缩），从而减少磁盘占用空间，而对精度的影响相对较小。</p><p>设置值为 0 时，将在磁盘索引中存储全精度向量，以便重新排序。数值越大，召回率越高，但会增加磁盘使用量。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>以 DRAM 为单位的 PQ 向量缓存大小（字节）。PQ 向量缓存在索引加载时加载，并在搜索时使用，以减少 IO（在性能模式下忽略）。</p></td>
     <td><p><strong>类型</strong>：整数</p><p><strong>范围</strong>： [0, 1073741824[0, 1073741824]</p><p><strong>默认值</strong>：<code translate="no">0</code></p></td>
     <td><p>更大的缓存可提高查询性能，但会增加 DRAM 的使用量。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>控制用于缓存频繁访问的索引节点的 DRAM 容量。</p><p>该缓存在索引加载期间加载，并在搜索期间使用，以减少 IO。</p></td>
     <td><p><strong>类型</strong>：浮点数</p><p><strong>范围</strong>： [0.0, 0.3[0.0, 0.3)</p><p><strong>默认值</strong>：<code translate="no">0</code></p></td>
     <td><p>较高的值会为缓存分配更多内存，减少磁盘 IO，但会消耗更多系统内存。值越小，缓存使用的内存越少，可能会增加磁盘访问的需要。</p></td>
   </tr>
</table>
<h3 id="Index-search-params" class="common-anchor-header">索引搜索参数<button data-href="#Index-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>这些参数会影响 AISAQ 执行搜索的方式。调整这些参数会影响搜索速度、延迟和资源使用。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>在搜索操作中，该参数决定算法在遍历图时所维护的候选池的大小。数值越大，找到真正近邻的几率越大（召回率更高），但也会增加搜索延迟。</p></td>
     <td><p><strong>类型</strong>： 整数整数</p><p><strong>范围</strong>[topk，int32_max］</p><p><strong>默认值</strong>：<code translate="no">16</code></p></td>
     <td><p>为了在性能和准确性之间取得良好平衡，建议将此值设置为等于或略大于要检索的结果数（top_k）。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">beamwidth</code></p></td>
     <td><p>通过确定读取索引节点的最大并行磁盘 I/O 请求数来控制搜索过程中的并行程度。</p></td>
     <td><p><strong>类型</strong>：整数</p><p><strong>范围</strong>： [1, 16[1, 16]</p><p><strong>默认值</strong>：<code translate="no">8</code></p></td>
     <td><p>数值越大，并行性越强，这可以在配备强大 CPU 和 SSD 的系统上加快搜索速度。不过，设置过高可能会导致过度的资源争用。</p><p>在大多数情况下，建议设置为 2。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectors_beamwidth</code></p></td>
     <td><p>通过确定读取相邻 PQ 向量组的最大并行磁盘 I/O 请求数，控制搜索过程中的并行程度（在性能模式下忽略）。</p></td>
     <td><p><strong>类型</strong>：整数</p><p><strong>范围</strong>： [1, 4[1，4] 必须 &lt;=<em>波束宽度</em></p><p><strong>默认值</strong>：<code translate="no">1</code></p></td>
     <td><p>数值越大，并行性越强，这可以在配备强大 CPU 和 SSD 的系统上加快搜索速度。但是，设置过高可能会导致过度的资源争用，因为每个相邻的 PQ 向量组可能最多包含 max_degree 向量。</p><p>在大多数情况下，我们建议设置为 1。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_read_page_cache_size</code></p></td>
     <td><p>每个搜索线程在 DRAM 中的 PQ 读缓存大小（字节）。它可缓存包含 PQ 向量的频繁访问数据页（在性能模式下被忽略，仅在重排为 true 时适用）。</p><p>PQ 读缓存内存在所有 AISAQ 段中重复使用。</p></td>
     <td><p><strong>类型</strong>：整数</p><p><strong>范围</strong>： [0, 33554432[0, 33554432]</p><p><strong>默认值</strong>：<code translate="no">5242880 (5MiB)</code></p></td>
     <td><p>缓存越大，查询性能越好，但会增加 DRAM 占用。</p><p>推荐值范围为：小型数据段（1 M 向量）2 MiB，中型数据段（50 M 向量）5 MiB，大型数据段（250 M 向量）10 MiB。</p></td>
   </tr>
</table>
