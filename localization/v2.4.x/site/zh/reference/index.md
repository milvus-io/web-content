---
id: index.md
related_key: index
summary: Milvus 的索引机制。
title: 内存索引
---
<h1 id="In-memory-Index" class="common-anchor-header">内存索引<button data-href="#In-memory-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题列出了 Milvus 支持的各种类型的内存索引，每种索引最适合的场景，以及用户可以配置的参数，以实现更好的搜索性能。有关磁盘索引，请参阅<strong><a href="/docs/zh/v2.4.x/disk_index.md">磁盘索引</a></strong>。</p>
<p>索引是有效组织数据的过程，它通过显著加速大型数据集上耗时的查询，在提高相似性搜索的实用性方面发挥着重要作用。</p>
<p>为了提高查询性能，可以为每个向量场<a href="/docs/zh/v2.4.x/index-vector-fields.md">指定一种索引类型</a>。</p>
<div class="alert note">
目前，一个向量场只支持一种索引类型。切换索引类型时，Milvus 会自动删除旧索引。</div>
<h2 id="ANNS-vector-indexes" class="common-anchor-header">ANNS 向量索引<button data-href="#ANNS-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支持的大多数向量索引类型都使用近似近邻检索（ANNS）算法。与通常非常耗时的精确检索相比，ANNS 的核心理念不再局限于返回最精确的结果，而是只搜索目标的近邻。ANNS 通过在可接受的范围内牺牲精确度来提高检索效率。</p>
<p>根据实现方法，ANNS 向量索引可分为四种类型：基于树、基于图、基于哈希和基于量化。</p>
<h2 id="Indexes-supported-in-Milvus" class="common-anchor-header">Milvus 支持的索引<button data-href="#Indexes-supported-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 支持多种索引类型，这些类型按其处理的向量嵌入类型分为：<strong>浮点嵌入</strong>（也称浮点向量或密集向量）、<strong>二进制嵌入</strong>（也称二进制向量）和<strong>稀疏嵌入</strong>（也称稀疏向量）。</p>
<div class="filter">
 <a href="#floating">浮点嵌入</a> <a href="#binary">二进制嵌入</a> <a href="#sparse">稀疏嵌入</a></div>
<div class="filter-floating">
<h3 id="Indexes-for-floating-point-embeddings" class="common-anchor-header">浮点嵌入的索引</h3><p>对于 128 维浮点嵌入（向量），其占用的存储空间为 128 * float 的大小 = 512 字节。而用于浮点嵌入的<a href="/docs/zh/v2.4.x/metric.md">距离度量</a>是欧氏距离（<code translate="no">L2</code> ）和内积（<code translate="no">IP</code> ）。</p>
<p>这些类型的索引包括<code translate="no">FLAT</code>,<code translate="no">IVF_FLAT</code>,<code translate="no">IVF_PQ</code>,<code translate="no">IVF_SQ8</code>,<code translate="no">HNSW</code> 和<code translate="no">SCANN</code> ，用于基于 CPU 的 ANN 搜索。</p>
</div>
<div class="filter-binary">
<h3 id="Indexes-for-binary-embeddings" class="common-anchor-header">二进制嵌入的索引</h3><p>对于 128 维的二进制嵌入，其占用的存储空间为 128 / 8 = 16 字节。而用于二进制嵌入的距离度量是<code translate="no">JACCARD</code> 和<code translate="no">HAMMING</code> 。</p>
<p>这类索引包括<code translate="no">BIN_FLAT</code> 和<code translate="no">BIN_IVF_FLAT</code> 。</p>
</div>
<div class="filter-sparse">
<h3 id="Indexes-for-sparse-embeddings" class="common-anchor-header">稀疏嵌入的索引</h3><p>稀疏嵌入支持的距离度量只有<code translate="no">IP</code> 。</p>
<p>索引类型包括<code translate="no">SPARSE_INVERTED_INDEX</code> 和<code translate="no">SPARSE_WAND</code> 。</p>
</div>
<div class="filter-floating table-wrapper">
<table id="floating">
<thead>
  <tr>
    <th>支持的索引</th>
    <th>分类</th>
    <th>场景</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>平面</td>
    <td>不适用</td>
    <td>
      <ul>
        <li>数据集相对较小</li>
        <li>需要 100% 的召回率</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_FLAT</td>
    <td>基于量化的索引</td>
    <td>
      <ul>
        <li>高速查询</li>
        <li>要求尽可能高的召回率</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_SQ8</td>
    <td>基于量化的索引</td>
    <td>
      <ul>
        <li>高速查询</li>
        <li>内存资源有限</li>
        <li>可接受召回率略有下降</li>
      </ul>
    </td>
  </tr>  
  <tr>
    <td>IVF_PQ</td>
    <td>基于量化的索引</td>
    <td>
      <ul>
        <li>极高速查询</li>
        <li>内存资源有限</li>
        <li>可接受召回率大幅降低</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW</td>
    <td>基于图形的索引</td>
    <td>
      <ul>
        <li>极高速查询</li>
        <li>要求尽可能高的召回率</li>
        <li>内存资源大</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SCANN</td>
    <td>基于量化的索引</td>
    <td>
      <ul>
        <li>极高速查询</li>
        <li>要求尽可能高的召回率</li>
        <li>内存资源大</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper">
<table id="binary">
<thead>
  <tr>
    <th>支持的索引</th>
    <th>分类</th>
    <th>场景</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>BIN_FLAT</td>
    <td>基于量化的索引</td>
    <td><ul>
      <li>取决于相对较小的数据集。</li>
      <li>要求完全准确。</li>
      <li>无需压缩。</li>
      <li>保证精确的搜索结果。</li>
    </ul></td>
  </tr>
  <tr>
    <td>BIN_IVF_FLAT</td>
    <td>基于量化的索引</td>
    <td><ul>
      <li>高速查询</li>
      <li>要求尽可能高的召回率</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper">
<table id="sparse">
<thead>
  <tr>
    <th>支持的索引</th>
    <th>分类</th>
    <th>方案</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>稀疏反转索引</td>
    <td>倒置索引</td>
    <td><ul>
      <li>取决于相对较小的数据集。</li>
      <li>要求 100%的召回率。</li>
    </ul></td>
  </tr>
  <tr>
    <td>稀疏反向索引</td>
    <td>反向索引</td>
    <td><ul>
      <li><a href="https://dl.acm.org/doi/10.1145/956863.956944">弱 AND</a>算法加速</li>
      <li>在牺牲少量召回率的同时，速度也有明显提高。</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-floating">
<h3 id="FLAT" class="common-anchor-header">平面</h3><p>对于要求完美准确性并依赖相对较小（百万量级）数据集的向量相似性搜索应用，FLAT 索引是一个不错的选择。FLAT 不压缩向量，是唯一能保证精确搜索结果的索引。FLAT 的结果还可以作为其他召回率低于 100% 的索引所产生结果的比较点。</p>
<p>FLAT 的精确度很高，因为它采用的是穷举搜索方法，这意味着每次查询都要将目标输入与数据集中的每一组向量进行比较。这使得 FLAT 成为我们列表中速度最慢的索引，而且不适合查询海量向量数据。在 Milvus 中，FLAT 索引不需要任何参数，使用它也不需要数据训练。</p>
<ul>
<li><p>搜索参数</p>
<table>
<thead>
<tr><th>参数</th><th>描述</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[可选] 选择的距离度量。</td><td>请参阅<a href="/docs/zh/v2.4.x/metric.md">支持的度量</a>。</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFFLAT" class="common-anchor-header">IVF_FLAT</h3><p>IVF_FLAT 将向量数据划分为<code translate="no">nlist</code> 个聚类单元，然后比较目标输入向量与每个聚类中心之间的距离。根据系统设置查询的簇数 (<code translate="no">nprobe</code>)，相似性搜索结果仅根据目标输入与最相似簇中向量的比较结果返回--大大缩短了查询时间。</p>
<p>通过调整<code translate="no">nprobe</code> ，可以在特定情况下找到准确性和速度之间的理想平衡。<a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">IVF_FLAT 性能测试</a>的结果表明，随着目标输入向量数 (<code translate="no">nq</code>) 和搜索簇数 (<code translate="no">nprobe</code>) 的增加，查询时间也会急剧增加。</p>
<p>IVF_FLAT 是最基本的 IVF 索引，每个单元中存储的编码数据与原始数据一致。</p>
<ul>
<li><p>索引构建参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>群组单位数</td><td>[1, 65536]</td><td>128</td></tr>
</tbody>
</table>
</li>
<li><p>搜索参数</p>
<ul>
<li><p>普通搜索</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>要查询的单位数</td><td>[1，nlist］</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>范围搜索</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>未返回任何搜索结果的桶的最大数量。<br/>这是一个范围搜索参数，当连续空桶的数量达到指定值时，将终止搜索过程。<br/>增加该值可以提高召回率，但代价是增加搜索时间。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFSQ8" class="common-anchor-header">IVF_SQ8</h3><p>IVF_FLAT 不进行任何压缩，因此它生成的索引文件大小与原始的非索引向量数据大致相同。例如，如果原始的 1B SIFT 数据集为 476 GB，那么其 IVF_FLAT 索引文件就会稍小一些（~470 GB）。将所有索引文件加载到内存中将消耗 470 GB 的存储空间。</p>
<p>当磁盘、CPU 或 GPU 内存资源有限时，IVF_SQ8 是比 IVF_FLAT 更好的选择。这种索引类型可以通过执行标量量化（SQ）将每个 FLOAT（4 字节）转换为 UINT8（1 字节）。这样可以减少 70-75% 的磁盘、CPU 和 GPU 内存消耗。对于 1B SIFT 数据集，IVF_SQ8 索引文件仅需 140 GB 的存储空间。</p>
<ul>
<li><p>索引构建参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>集群单位数</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>搜索参数</p>
<ul>
<li><p>普通搜索</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>要查询的单位数</td><td>[1，nlist］</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>范围搜索</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>未返回任何搜索结果的桶的最大数量。<br/>这是一个范围搜索参数，当连续空桶的数量达到指定值时，将终止搜索过程。<br/>增加该值可以提高召回率，但代价是增加搜索时间。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFPQ" class="common-anchor-header">IVF_PQ</h3><p><code translate="no">PQ</code> (乘积量化）将原始高维向量空间均匀分解为 低维向量空间的笛卡尔乘积，然后对分解后的低维向量空间进行量化。乘积量化不需要计算目标向量与所有单元中心的距离，而是能够计算目标向量与每个低维空间聚类中心的距离，大大降低了算法的时间复杂度和空间复杂度。<code translate="no">m</code> </p>
<p>IVF_PQ 先进行 IVF 索引聚类，然后再对向量的乘积进行量化。其索引文件比 IVF_SQ8 更小，但在搜索向量时也会造成精度损失。</p>
<div class="alert note">
<p>索引建立参数和搜索参数随 Milvus Distributed 分布而异。请先选择 Milvus Distributed。</p>
</div>
<ul>
<li><p>索引建立参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>群组单位数</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">m</code></td><td>乘积量化因子数</td><td><code translate="no">dim mod m == 0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[可选项] 每个低维向量的存储位数。</td><td>[1，64] （默认为 8）</td></tr>
</tbody>
</table>
</li>
<li><p>搜索参数</p>
<ul>
<li><p>普通搜索</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>要查询的单位数</td><td>[1，nlist］</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>范围搜索</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>未返回任何搜索结果的桶的最大数量。<br/>这是一个范围搜索参数，当连续空桶的数量达到指定值时，将终止搜索过程。<br/>增加该值可以提高召回率，但代价是增加搜索时间。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="SCANN" class="common-anchor-header">SCANN</h3><p>ScaNN（可扩展近邻）在向量聚类和乘积量化方面与 IVF_PQ 相似。它们的不同之处在于乘积量化的实现细节和使用 SIMD（单指令/多数据）进行高效计算。</p>
<ul>
<li><p>索引构建参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>集群单位数</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">with_raw_data</code></td><td>是否在索引中包含原始数据</td><td><code translate="no">True</code> 或 。默认为 。<code translate="no">False</code> <code translate="no">True</code></td></tr>
</tbody>
</table>
  <div class="alert note">
<p>与 IVF_PQ 不同，默认值适用于<code translate="no">m</code> 和<code translate="no">nbits</code> ，以优化性能。</p>
  </div>
</li>
<li><p>搜索参数</p>
<ul>
<li><p>常用搜索</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>要查询的单位数</td><td>[1，nlist］</td><td></td></tr>
<tr><td><code translate="no">reorder_k</code></td><td>要查询的候选单位数量</td><td>[<code translate="no">top_k</code>, ∞]</td><td><code translate="no">top_k</code></td></tr>
</tbody>
</table>
</li>
<li><p>范围搜索</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>未返回任何搜索结果的桶的最大数量。<br/>这是一个范围搜索参数，当连续空桶的数量达到指定值时，将终止搜索过程。<br/>增加该值可以提高召回率，但代价是增加搜索时间。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW（分层导航小世界图）是一种基于图的索引算法。它根据一定的规则为图像建立多层导航结构。在这种结构中，上层较为稀疏，节点之间的距离较远；下层较为密集，节点之间的距离较近。搜索从最上层开始，在这一层找到离目标最近的节点，然后进入下一层开始新的搜索。经过多次迭代后，就能快速接近目标位置。</p>
<p>为了提高性能，HNSW 将图的每一层上节点的最大度数限制为<code translate="no">M</code> 。此外，您还可以使用<code translate="no">efConstruction</code> （建立索引时）或<code translate="no">ef</code> （搜索目标时）来指定搜索范围。</p>
<ul>
<li><p>索引建立参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M 定义图中传出连接的最大数量。M 越大，在固定 ef/efConstruction 条件下的精确度/运行时间越长。</td><td>[2, 2048]</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction控制索引搜索速度/构建速度的权衡。增加 efConstruction 参数可能会提高索引质量，但也会延长索引编制时间。</td><td>[1，int_max］</td></tr>
</tbody>
</table>
</li>
<li><p>搜索参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>控制查询时间/准确度权衡的参数。<code translate="no">ef</code> 越高，搜索越准确，但速度越慢。</td><td>[<code translate="no">top_k</code>, int_max]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<div class="filter-binary">
<h3 id="BINFLAT" class="common-anchor-header">BIN_FLAT</h3><p>该索引与 FLAT 完全相同，但只能用于二进制 Embeddings。</p>
<p>对于需要完美精确度且依赖于相对较小（百万级别）数据集的向量相似性搜索应用，BIN_FLAT 索引是一个不错的选择。BIN_FLAT 不压缩向量，是唯一能保证精确搜索结果的索引。BIN_FLAT 的结果还可以作为其他召回率低于 100% 的索引所产生结果的比较点。</p>
<p>BIN_FLAT 之所以准确，是因为它采用了穷举搜索方法，这意味着每次查询都要将目标输入与数据集中的向量进行比较。这使得 BIN_FLAT 成为我们列表中速度最慢的索引，不适合查询海量向量数据。Milvus 中的 BIN_FLAT 索引没有参数，使用它不需要数据训练或额外存储。</p>
<ul>
<li><p>搜索参数</p>
<table>
<thead>
<tr><th>参数</th><th>描述</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[可选] 选择的距离度量。</td><td>请参阅<a href="/docs/zh/v2.4.x/metric.md">支持的度量</a>。</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="BINIVFFLAT" class="common-anchor-header">BIN_IVF_FLAT</h3><p>该指标与 IVF_FLAT 完全相同，只是只能用于二进制嵌入。</p>
<p>BIN_IVF_FLAT 将向量数据划分为<code translate="no">nlist</code> 个聚类单元，然后比较目标输入向量与每个聚类中心之间的距离。根据系统设置查询的簇数（<code translate="no">nprobe</code> ），相似性搜索结果仅根据目标输入与最相似簇中向量的比较结果返回--大大缩短了查询时间。</p>
<p>通过调整<code translate="no">nprobe</code> ，可以在特定情况下找到准确性和速度之间的理想平衡。随着目标输入向量数 (<code translate="no">nq</code>) 和要搜索的聚类数 (<code translate="no">nprobe</code>) 的增加，查询时间也会急剧增加。</p>
<p>BIN_IVF_FLAT 是最基本的 BIN_IVF 索引，每个单元存储的编码数据与原始数据一致。</p>
<ul>
<li><p>索引建立参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>簇单元数</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>搜索参数</p>
<ul>
<li><p>普通搜索</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>要查询的单位数</td><td>[1，nlist］</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>范围搜索</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th><th>默认值</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>未返回任何搜索结果的桶的最大数量。<br/>这是一个范围搜索参数，当连续空桶的数量达到指定值时，将终止搜索过程。<br/>增加该值可以提高召回率，但代价是增加搜索时间。</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
</div>
<div class="filter-sparse">
<h3 id="SPARSEINVERTEDINDEX" class="common-anchor-header">稀疏反转索引</h3><p>每个维度都会维护一个在该维度上具有非零值的向量列表。在搜索过程中，Milvus 会遍历查询向量的每个维度，并为在这些维度上具有非零值的向量计算分数。</p>
<ul>
<li><p>索引构建参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_build</code></td><td>在索引建立过程中排除的小向量值的比例。该选项允许对索引建立过程进行微调，通过在建立索引时忽略小值来权衡效率和准确性。</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
<li><p>搜索参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>在搜索过程中排除的小向量值的比例。该选项可通过指定忽略查询向量中最小值的比例，对搜索过程进行微调。它有助于平衡搜索精度和性能。<code translate="no">drop_ratio_search</code> 的值越小，这些小值对最终得分的贡献就越小。通过忽略一些小值，可以提高搜索性能，同时将对精确度的影响降到最低。</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="SPARSEWAND" class="common-anchor-header">弧度</h3><p>该索引与<code translate="no">SPARSE_INVERTED_INDEX</code> 有相似之处，但它利用<a href="https://dl.acm.org/doi/10.1145/956863.956944">弱-AND</a>算法进一步减少了搜索过程中完整 IP 距离评估的次数。</p>
<p>根据我们的测试，<code translate="no">SPARSE_WAND</code> 在速度上通常优于其他方法。不过，随着向量密度的增加，其性能会迅速下降。为了解决这个问题，引入非零<code translate="no">drop_ratio_search</code> 可以显著提高性能，同时只造成极小的精度损失。更多信息，请参阅<a href="/docs/zh/v2.4.x/sparse_vector.md">稀疏向量</a>。</p>
<ul>
<li><p>索引建立参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_build</code></td><td>在索引建立过程中排除小向量值的比例。该选项允许对索引建立过程进行微调，通过在建立索引时忽略小值来权衡效率和准确性。</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
<li><p>搜索参数</p>
<table>
<thead>
<tr><th>参数</th><th>说明</th><th>范围</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>在搜索过程中排除的小向量值的比例。该选项可通过指定忽略查询向量中最小值的比例，对搜索过程进行微调。它有助于平衡搜索精度和性能。<code translate="no">drop_ratio_search</code> 的值越小，这些小值对最终得分的贡献就越小。通过忽略一些小值，可以提高搜索性能，同时将对精确度的影响降到最低。</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<h2 id="FAQ" class="common-anchor-header">常见问题<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">FLAT 索引和 IVF_FLAT 索引有什么区别？</font></summary></p>
<p>IVF_FLAT 索引将向量空间划分为<code translate="no">nlist</code> 个簇。如果保持<code translate="no">nlist</code> 的默认值为 16384，Milvus 会比较目标向量与所有 16384 个簇的中心点之间的距离，得到<code translate="no">nprobe</code> 最近的簇。然后，Milvus 再比较目标向量与所选簇中向量之间的距离，得到最近的向量。与 IVF_FLAT 不同，FLAT 直接比较目标向量与每一个向量之间的距离。</p>
<p>
因此，当向量总数约等于<code translate="no">nlist</code> 时，IVF_FLAT 和 FLAT 所需的计算方式和搜索性能差别不大。但当向量数增长到<code translate="no">nlist</code> 的 2 倍、3 倍或 n 倍时，IVF_FLAT 索引开始显示出越来越大的优势。</p>
<p>
更多信息，请参阅<a href="https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212">如何在 Milvus 中选择索引</a>。</p>
</details>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>进一步了解 Milvus 支持的<a href="/docs/zh/v2.4.x/metric.md">相似度指标</a>。</li>
</ul>
