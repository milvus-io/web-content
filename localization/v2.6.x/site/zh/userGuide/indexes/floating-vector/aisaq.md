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
    </button></h1><p>AISAQ 是一种基于磁盘的向量索引，它对<a href="/docs/zh/diskann.md">DISKANN</a>进行了扩展，可在不超出内存限制的情况下处理十亿规模的数据集。与将压缩向量保存在内存中的 DISKANN 不同，AISAQ 将所有数据保存在磁盘上，提供两种模式以平衡性能和存储成本。</p>
<p>当你的向量数据集过大，无法在内存中轻松容纳时，或者当你需要通过降低内存需求来换取一些查询性能，从而优化基础架构成本时，请使用 AISAQ。</p>
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
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
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
<h3 id="AISAQ-modes" class="common-anchor-header">AISAQ 模式<button data-href="#AISAQ-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ 提供两种基于磁盘的存储策略。主要区别在于如何存储 PQ 压缩数据。</p>
<h4 id="AISAQ-performance" class="common-anchor-header">AISAQ-performance</h4><p><strong>AISAQ-performance</strong>通过将 PQ 数据从内存移至磁盘，实现完全基于磁盘的存储，同时通过数据主机托管和冗余保持低 IOPS。</p>
<p>在这种模式下</p>
<ul>
<li><p>每个节点的原始向量、边缘列表及其邻居的 PQ 数据都一起存储在磁盘上。</p></li>
<li><p>这种布局可确保访问一个节点（如<em>向量 0</em>）仍然只需要一次磁盘 I/O。</p></li>
<li><p>不过，由于 PQ 数据被冗余地存储在多个节点附近，索引文件大小会显著增加，从而消耗更多磁盘空间。</p></li>
</ul>
<h4 id="AISAQ-scale" class="common-anchor-header">AISAQ-scale</h4><p><strong>AISAQ-scale</strong>专注于<em>减少磁盘空间的使用</em>，同时将所有数据保留在磁盘上。</p>
<p>在这种模式下</p>
<ul>
<li><p>PQ 数据单独存储在磁盘上，没有冗余。</p></li>
<li><p>这种设计最大限度地减小了索引大小，但在图形遍历过程中会导致更多的 I/O 操作符。</p></li>
<li><p>为了减少 IOPS 开销，AISAQ 引入了两种优化方法：</p>
<ul>
<li><p>重新排列策略，按优先级对 PQ 向量进行排序，以提高数据的位置性。</p></li>
<li><p>DRAM 中的 PQ 缓存（pq_cache_size），用于缓存频繁访问的 PQ 数据。</p></li>
</ul></li>
</ul>
<p>因此，与 DISKANN 或 AISAQ-Performance 相比，AISAQ-scale 的存储效率更高，但性能更低。</p>
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
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-specific-parameters" class="common-anchor-header">AISAQ 特有参数<button data-href="#AISAQ-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ 继承了 DISKANN 的许多参数。为避免冗余，下面只详细介绍 AISAQ 特有的参数。有关<code translate="no">max_degree</code>,<code translate="no">pq_code_budget_gb_ratio</code>,<code translate="no">search_list_size</code>, 和<code translate="no">beam_width_ratio</code> 等共享参数的说明，请参阅<a href="/docs/zh/diskann.md#DISKANN-params">DISKANN</a>。</p>
<table>
   <tr>
     <th><p>参数</p></th>
     <th><p>说明</p></th>
     <th><p>数值范围</p></th>
     <th><p>调整建议</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>每个节点内联存储的 PQ 向量数量。决定存储布局（性能模式与规模模式）。</p></td>
     <td><p><strong>类型</strong>：整数</p><p><strong>范围</strong>： [0, max_degree[0，<em>max_degree］</em></p><p><strong>默认值</strong>：<code translate="no">-1</code></p></td>
     <td><p><code translate="no">inline_pq</code> 越接近<em>max_degree</em>，性能往往越好，但索引文件大小会显著增加。</p><p>当<code translate="no">inline_pq</code> 接近 0 时，性能会下降，索引大小会变得与 DISKANN 类似。</p><p><strong>注意</strong>：这在很大程度上取决于磁盘性能。如果磁盘性能较差，不建议启用此选项，因为有限的磁盘带宽可能会成为瓶颈并降低整体性能。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>启用按优先级排序的 PQ 向量，以改善 I/O 本地性。</p></td>
     <td><p><strong>类型</strong>：布尔布尔</p><p><strong>范围</strong>： [true, false[true, false］</p><p><strong>默认值</strong>：<code translate="no">false</code></p></td>
     <td><p>减少查询 I/O，但增加索引建立时间。</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>以 DRAM 为单位的 PQ 缓存大小（字节）。</p></td>
     <td><p><strong>类型</strong>： 整数整数</p><p><strong>范围</strong>： [0, 1&lt;&lt;30[0, 1&lt;&lt;30]</p><p><strong>默认值</strong>：<code translate="no">0</code></p></td>
     <td><p>缓存越大，查询性能越高，但会增加 DRAM 的使用量。</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">注意事项<button data-href="#Considerations" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p>磁盘性能很重要。AISAQ 严重依赖 SSD IOPS；存储不佳会降低 QPS。</p></li>
<li><p>AISAQ 性能模式 ≈ DISKANN 延迟，但可能需要多几倍的磁盘空间。</p></li>
<li><p>AISAQ 规模模式适合 QPS 不那么重要的离线搜索或数据存档工作负载。</p></li>
</ul>
