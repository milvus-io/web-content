---
id: index-explained.md
title: 索引详解
summary: >-
  索引是在数据之上构建的附加结构。其内部结构取决于所使用的近似最近邻搜索算法。索引可以加快搜索速度，但在搜索过程中会消耗额外的预处理时间、空间和内存。此外，使用索引通常会降低召回率（尽管影响微乎其微，但仍然值得关注）。
  因此，本文将阐述如何在使用索引时将成本降至最低，同时将效益最大化。
---
<h1 id="Index-Explained" class="common-anchor-header">索引详解<button data-href="#Index-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>索引是在数据之上构建的附加结构。其内部结构取决于所使用的近似最近邻搜索算法。索引可以加快搜索速度，但在搜索过程中会消耗额外的预处理时间、空间和内存。此外，使用索引通常会降低召回率（尽管影响微乎其微，但仍然值得注意）。 因此，本文将阐述如何在使用索引时将成本降至最低，同时将效益最大化。</p>
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
    </button></h2><p>在 Milvus 中，索引是针对特定字段的，且适用的索引类型会根据目标字段的数据类型而有所不同。作为专业的向量数据库，Milvus 致力于同时提升向量搜索和标量过滤的性能，因此提供了多种索引类型。</p>
<p>下表列出了字段数据类型与适用索引类型之间的映射关系。</p>
<table>
   <tr>
     <th><p>字段数据类型</p></th>
     <th><p>适用的索引类型</p></th>
   </tr>
   <tr>
     <td><p>FLOAT_VECTOR</p></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>FAISS</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT16_VECTOR</p></li><li><p>BFLOAT16_VECTOR</p></li><li><p>INT8_VECTOR</p></li></ul></td>
     <td><ul><li><p>FLAT</p></li><li><p>IVF_FLAT</p></li><li><p>IVF_SQ8</p></li><li><p>IVF_PQ</p></li><li><p>IVF_RABITQ</p></li><li><p>HNSW</p></li><li><p>HNSW_SQ</p></li><li><p>HNSW_PQ</p></li><li><p>HNSW_PRQ</p></li><li><p>DISKANN</p></li><li><p>SCANN</p></li><li><p>AISAQ</p></li><li><p>GPU_CAGRA</p></li><li><p>GPU_IVF_FLAT</p></li><li><p>GPU_IVF_PQ</p></li><li><p>GPU_BRUTE_FORCE</p></li></ul></td>
   </tr>
   <tr>
     <td><p>二进制向量</p></td>
     <td><ul><li><p>BIN_FLAT</p></li><li><p>BIN_IVF_FLAT</p></li><li><p>MINHASH_LSH</p></li><li><p>FAISS</p></li></ul></td>
   </tr>
   <tr>
     <td><p>SPARSE_FLOAT_VECTOR</p></td>
     <td><p>SPARSE_INVERTED_INDEX</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR</p></td>
     <td><ul><li><p>倒排索引（推荐）</p></li><li><p>BITMAP</p></li><li><p>Trie</p></li></ul></td>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><ul><li><p>位图（推荐）</p></li><li><p>反转</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>INT8</p></li><li><p>INT16</p></li><li><p>INT32</p></li><li><p>INT64</p></li></ul></td>
     <td><ul><li><p>INVERTED</p></li><li><p>STL_SORT</p></li></ul></td>
   </tr>
   <tr>
     <td><ul><li><p>FLOAT</p></li><li><p>DOUBLE</p></li></ul></td>
     <td><p>INVERTED</p></td>
   </tr>
   <tr>
     <td><p>数组<sup>（包含 BOOL、INT8/16/32/64 以及 VARCHAR 类型的元素）</sup></p></td>
     <td><p>BITMAP（推荐）</p></td>
   </tr>
   <tr>
     <td><p>数组<sup>（元素类型为 BOOL、INT8/16/32/64、FLOAT、DOUBLE 和 VARCHAR）</sup></p></td>
     <td><p>倒置</p></td>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>INVERTED</p></td>
   </tr>
</table>
<p>本文重点介绍如何选择合适的向量索引。对于标量字段，您始终可以使用推荐的索引类型。</p>
<p>为向量搜索选择合适的索引类型会显著影响性能和资源使用情况。在为向量字段选择索引类型时，必须综合考虑多种因素，包括底层数据结构、内存占用以及性能要求。</p>
<h2 id="Vector-Index-anatomy" class="common-anchor-header">向量索引的构成<button data-href="#Vector-Index-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>如下图所示，Milvus 中的索引类型由三个核心组件构成，即<strong>数据结构</strong>、<strong>量化和</strong> <strong>精化器</strong>。量化和精化器虽为可选组件，但由于其收益远大于成本，因此被广泛采用。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/vector-index-anatomy.png" alt="Vector Index Anatomy" class="doc-image" id="vector-index-anatomy" /> 
   <span>向量索引的构成</span>
  
 </span></p>
<p>在创建索引时，Milvus会结合所选的数据结构和量化方法来确定最佳<strong>扩展率</strong>。在查询时，系统会检索<code translate="no">topK × expansion rate</code> 个候选向量，应用精化器以更高精度重新计算距离，最终返回最准确的<code translate="no">topK</code> 结果。这种混合方法通过将资源密集型的精化操作限制在经过筛选的候选子集上，从而在速度和精度之间实现了平衡。</p>
<h3 id="Data-structure" class="common-anchor-header">数据结构<button data-href="#Data-structure" class="anchor-icon" translate="no">
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
    </button></h3><p>数据结构构成了索引的基础层。常见类型包括：</p>
<ul>
<li><p><strong>倒排文件 (IVF)</strong></p>
<p>IVF系列索引类型允许Milvus通过基于质心的分区将向量聚类到桶中。通常可以安全地假设：如果某个桶的质心接近查询向量，则该桶中的所有向量很可能都接近查询向量。 基于这一前提，Milvus 仅扫描那些中心点靠近查询向量的桶中的向量 Embeddings，而非遍历整个数据集。该策略在保持可接受精度的同时，降低了计算成本。</p>
<p>此类索引数据结构非常适合需要快速吞吐量的大规模数据集。</p></li>
<li><p><strong>基于图的结构</strong></p>
<p>基于图的向量搜索数据结构（如分层可导航小世界模型<a href="https://arxiv.org/abs/1603.09320">HNSW</a>）构建了一个分层图，其中每个向量与其最近邻相连。查询会从粗粒度的上层开始，逐步向下层推进，从而实现高效的对数时间搜索复杂度。</p>
<p>此类索引数据结构在高维空间以及需要低延迟查询的场景中表现尤为出色。</p></li>
</ul>
<h3 id="Quantization" class="common-anchor-header">量化<button data-href="#Quantization" class="anchor-icon" translate="no">
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
    </button></h3><p>量化通过采用更粗略的表示方式来减少内存占用和计算成本：</p>
<ul>
<li><p><strong>标量量化</strong>（例如<strong>SQ8</strong>）使 Milvus 能够将每个向量维度压缩为单个字节（8 位），与 32 位浮点数相比，在保持合理精度的同时，将内存使用量减少了 75%。</p></li>
<li><p><strong>产品量化</strong>（<strong>PQ</strong>）使 Milvus 能够将向量拆分为子向量，并使用基于码本的聚类对其进行编码。这以略微降低召回率为代价，实现了更高的压缩比（例如 4-32 倍），使其适用于内存受限的环境。</p></li>
</ul>
<h3 id="Refiner" class="common-anchor-header">精炼器<button data-href="#Refiner" class="anchor-icon" translate="no">
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
    </button></h3><p>量化本质上是有损的。为了维持召回率，量化过程会持续生成超过实际需要的 Top-K 候选项，从而允许精化器使用更高精度从这些候选项中进一步筛选出 Top-K 结果，从而提高召回率。</p>
<p>例如，FP32 精炼器对量化返回的搜索结果候选项进行处理，通过使用 FP32 精度重新计算距离，而非直接使用量化值。</p>
<p>对于需要在搜索效率和精度之间进行权衡的应用程序（例如语义搜索或推荐系统）而言，这一点至关重要，因为在这些应用中，微小的距离变化会显著影响结果质量。</p>
<h3 id="Summary" class="common-anchor-header">总结<button data-href="#Summary" class="anchor-icon" translate="no">
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
    </button></h3><p>这种分层架构——通过数据结构进行粗略过滤、通过量化实现高效计算、通过精化进行精度调整——使 Milvus 能够自适应地优化准确率与性能之间的权衡。</p>
<h2 id="Performance-trade-offs" class="common-anchor-header">性能权衡<button data-href="#Performance-trade-offs" class="anchor-icon" translate="no">
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
    </button></h2><p>在评估性能时，平衡<strong>构建时间</strong>、<strong>每秒查询次数（QPS）</strong>和<strong>召回率</strong>至关重要。一般规则如下：</p>
<ul>
<li><p><strong>基于图的索引类型</strong>在<strong>QPS</strong> 方面通常优于<strong>IVF 变体</strong>。</p></li>
<li><p><strong>IVF变体</strong>特别适用于<strong>TopK较大的</strong>场景<strong>（例如超过2,000）</strong>。</p></li>
<li><p>与<strong>SQ</strong> 相比<strong>，PQ</strong>在相似的压缩率下通常能提供更高的召回率，尽管后者的性能更优。</p></li>
<li><p>将索引的一部分存储在硬盘上（如<strong>DiskANN</strong> 所示）有助于管理大型数据集，但也会引入潜在的 IOPS 瓶颈。</p></li>
</ul>
<h3 id="Capacity" class="common-anchor-header">容量<button data-href="#Capacity" class="anchor-icon" translate="no">
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
    </button></h3><p>容量通常涉及数据大小与可用 RAM 之间的关系。在处理容量问题时，请考虑以下几点：</p>
<ul>
<li><p>如果原始数据的四分之一能装入内存，建议考虑 DiskANN，因其延迟稳定。</p></li>
<li><p>如果所有原始数据都能装入内存，请考虑基于内存的索引类型和 mmap。</p></li>
<li><p>您可以使用已应用量化的索引类型和 mmap，以牺牲精度为代价来换取最大容量。</p></li>
</ul>
<div class="alert note">
<p>mmap 并非总是最佳解决方案。当大部分数据位于磁盘上时，DiskANN 能提供更优的延迟性能。</p>
</div>
<h3 id="Recall" class="common-anchor-header">召回率<button data-href="#Recall" class="anchor-icon" translate="no">
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
    </button></h3><p>召回率通常涉及过滤率，即在搜索前被过滤掉的数据。在处理召回率时，请考虑以下几点：</p>
<ul>
<li><p>如果过滤率低于 85%，基于图的索引类型优于 IVF 变体。</p></li>
<li><p>如果过滤率在 85% 到 95% 之间，请使用 IVF 变体。</p></li>
<li><p>如果过滤率超过 98%，请使用 Brute-Force (FLAT) 以获得最准确的搜索结果。</p></li>
</ul>
<div class="alert note">
<p>上述建议并非总是正确。建议您通过不同索引类型对召回率进行调优，以确定哪种索引类型效果最佳。</p>
</div>
<h3 id="Performance" class="common-anchor-header">性能<button data-href="#Performance" class="anchor-icon" translate="no">
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
    </button></h3><p>搜索性能通常涉及“前 K 项”（top-K），即搜索返回的记录数。在处理性能问题时，请考虑以下几点：</p>
<ul>
<li><p>对于需要高召回率且 top-K 较小（例如 2,000）的搜索，基于图的索引类型优于 IVF 变体。</p></li>
<li><p>对于 top-K 较大（相对于向量 Embeddings 总数）的搜索，IVF 变体比基于图的索引类型更合适。</p></li>
<li><p>对于 top-K 规模中等且过滤率较高的搜索，IVF 变体是更优的选择。</p></li>
</ul>
<h3 id="Decision-Matrix-Choosing-the-most-appropriate-index-type" class="common-anchor-header">决策矩阵：选择最合适的索引类型<button data-href="#Decision-Matrix-Choosing-the-most-appropriate-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>下表是一张决策矩阵，供您在选择合适的索引类型时参考。</p>
<table>
   <tr>
     <th><p>场景</p></th>
     <th><p>推荐索引</p></th>
     <th><p>备注</p></th>
   </tr>
   <tr>
     <td><p>原始数据可放入内存</p></td>
     <td><p>HNSW、IVF + 精化</p></td>
     <td><p>在低<code translate="no">k</code>/高召回率的情况下使用HNSW。</p></td>
   </tr>
   <tr>
     <td><p>原始数据存储在磁盘（SSD）上</p></td>
     <td><p>DiskANN</p></td>
     <td><p>最适合对延迟敏感的查询。</p></td>
   </tr>
   <tr>
     <td><p>原始数据存储在磁盘上，内存有限</p></td>
     <td><p>IVFPQ/SQ + mmap</p></td>
     <td><p>平衡内存和磁盘访问。</p></td>
   </tr>
   <tr>
     <td><p>高过滤率（&gt;95%）</p></td>
     <td><p>暴力搜索（FLAT）</p></td>
     <td><p>可避免在候选集很小的情况下产生的索引开销。</p></td>
   </tr>
   <tr>
     <td><p>大型<code translate="no">k</code> （≥数据集的1%）</p></td>
     <td><p>IVF</p></td>
     <td><p>聚类剪枝可减少计算量。</p></td>
   </tr>
   <tr>
     <td><p>极高的召回率（&gt;99%）</p></td>
     <td><p>暴力搜索（FLAT）+ GPU</p></td>
     <td><p>--</p></td>
   </tr>
</table>
<h2 id="Memory-usage-estimation" class="common-anchor-header">内存占用估算<button data-href="#Memory-usage-estimation" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert note">
<p>本节重点介绍特定索引类型的内存消耗计算，并包含大量技术细节。若您对此不感兴趣，可放心跳过本节。</p>
</div>
<p>索引的内存消耗受其数据结构、通过量化实现的压缩率以及所使用的精简器影响。一般而言，基于图的索引通常因图的结构（例如<strong>HNSW</strong>）而具有更高的内存占用，这通常意味着每向量空间会有明显的开销。 相比之下，IVF 及其变体在内存利用率方面更为高效，因为其每向量空间的开销较小。不过，诸如<strong>DiskANN</strong>之类的高级技术允许索引的部分组件（如图结构或精化器）驻留在磁盘上，从而在保持性能的同时减轻内存负担。</p>
<p>具体而言，索引的内存使用量可按以下方式计算：</p>
<h3 id="IVF-index-memory-usage" class="common-anchor-header">IVF 索引的内存占用<button data-href="#IVF-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>IVF 索引通过将数据划分为簇来平衡内存效率与搜索性能。下表详细列出了使用 IVF 变体对 100 万个 128 维向量进行索引时所占用的内存。</p>
<ol>
<li><p><strong>计算聚类中心的内存占用。</strong></p>
<p>IVF 系列索引类型使 Milvus 能够通过基于聚类中心的划分将向量聚类到桶中。每个聚类中心以原始向量嵌入的形式包含在索引中。当将向量划分为 2,000 个聚类时，内存使用量可按以下方式计算：</p>
<pre><code translate="no" class="language-plaintext">2,000 clusters × 128 dimensions × 4 bytes = 1.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>计算聚类分配所占用的内存。</strong></p>
<p>每个向量嵌入都会被分配到一个簇中，并以整数 ID 的形式存储。对于 2,000 个簇，2 字节的整数就足够了。内存使用量可按以下方式计算：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 2 bytes = 2.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>计算量化造成的压缩量。</strong></p>
<p>IVF变体通常使用PQ和SQ8，其内存占用量可按以下方式估算：</p>
<ul>
<li><p>使用具有 8 个子量化器的 PQ</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8.0 MB
<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用 SQ8</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 1 byte = 128 MB 
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>下表列出了不同配置下的估计内存占用量：</p>
<p><table>
<tr>
<th><p>配置</p></th>
<th><p>内存估算</p></th>
<th><p>总内存</p></th>
</tr>
<tr>
<td><p>IVF-PQ（无细化）</p></td>
<td><p>1.0 MB + 2.0 MB + 8.0 MB</p></td>
<td><p>11.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-PQ + 10% 原始细化</p></td>
<td><p>1.0 MB + 2.0 MB + 8.0 MB + 51.2 MB</p></td>
<td><p>62.2 MB</p></td>
</tr>
<tr>
<td><p>IVF-SQ8（无细化）</p></td>
<td><p>1.0 MB + 2.0 MB + 128 MB</p></td>
<td><p>131.0 MB</p></td>
</tr>
<tr>
<td><p>IVF-FLAT（完整的原始向量数据）</p></td>
<td><p>1.0 MB + 2.0 MB + 512 MB</p></td>
<td><p>515.0 MB</p></td>
</tr>
</table></p></li>
<li><p><strong>计算精化开销。</strong></p>
<p>IVF变体通常与精化器配合使用，以对候选项进行重新排序。对于以5为扩展率检索前10个结果的搜索，精化开销可按以下方式估算：</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Graph-based-index-memory-usage" class="common-anchor-header">基于图的索引内存占用<button data-href="#Graph-based-index-memory-usage" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW 等基于图的索引类型需要大量内存来存储图结构和原始向量 Embeddings。以下是使用 HNSW 索引类型对 100 万个 128 维向量进行索引时，内存消耗的详细分解。</p>
<ol>
<li><p><strong>计算图结构占用的内存。</strong></p>
<p>HNSW 中的每个向量都与其邻居保持连接。当图的度（每个节点的边数）为 32 时，其内存消耗可按以下方式计算：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 32 links × 4 bytes (for 32-bit integer storage) = 128 MB  
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>计算原始向量Embeddings所占用的内存。</strong></p>
<p>存储未压缩的 FP32 向量所消耗的内存可按以下方式计算：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 128 dimensions × 4 bytes = 512 MB  
<button class="copy-code-btn"></button></code></pre>
<p>当使用 HNSW 对 100 万个 128 维向量 Embeddings 进行索引时，总内存使用量为<strong>128 MB（图）+ 512 MB（向量）= 640 MB</strong>。</p></li>
<li><p><strong>计算量化带来的压缩效果。</strong></p>
<p>量化会缩小向量大小。例如，使用具有 8 个子量化器的 PQ（每个向量 8 字节）可实现大幅压缩。压缩后向量 Embeddings 所占用的内存可按以下方式计算：</p>
<pre><code translate="no" class="language-plaintext">1,000,000 vectors × 8 bytes = 8 MB
<button class="copy-code-btn"></button></code></pre>
<p>与原始向量嵌入相比，这实现了64倍的压缩率，<strong>而HNSWPQ索引</strong>类型占用的总内存<strong>为128 MB（图）+ 8 MB（压缩向量）= 136 MB</strong>。</p></li>
<li><p><strong>计算精化开销。</strong></p>
<p>细化操作（例如使用原始向量进行重新排序）会将高精度数据临时加载到内存中。对于以5为扩展率检索前10个结果的搜索，细化开销可按以下方式估算：</p>
<pre><code translate="no" class="language-plaintext">10 (topK) x 5 (expansion rate) = 50 candidates
50 candidates x 128 dimensions x 4 bytes = 25.6 KB
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Other-considerations" class="common-anchor-header">其他注意事项<button data-href="#Other-considerations" class="anchor-icon" translate="no">
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
    </button></h3><p>虽然 IVF 和基于图的索引通过量化来优化内存使用，但内存映射文件（mmap）和 DiskANN 则针对数据集超过可用随机访问内存（RAM）的情况提供了解决方案。</p>
<h4 id="DiskANN" class="common-anchor-header">DiskANN</h4><p>DiskANN 是一种基于 Vamana 图的索引，它在搜索过程中连接数据点以实现高效导航，同时应用 PQ 来缩小向量大小，并支持快速计算向量之间的近似距离。</p>
<p>Vamana 图存储在磁盘上，这使得 DiskANN 能够处理那些原本因体积过大而无法装入内存的大型数据集。这对数十亿个数据点的数据集尤为有用。</p>
<h4 id="Memory-mapped-files-mmap" class="common-anchor-header">内存映射文件（mmap）</h4><p>内存映射（Mmap）支持直接访问磁盘上的大型文件，使 Milvus 能够同时在内存和硬盘中存储索引及数据。这种方法通过根据访问频率降低 I/O 调用的开销，从而优化 I/O 操作，在不对搜索性能造成显著影响的情况下，扩展 Collections 的存储容量。</p>
<p>具体而言，您可以配置 Milvus 对特定字段中的原始数据进行内存映射，而非将其完全加载到内存中。这样，您既可以直接访问这些字段的内存，又无需担心内存问题，同时还能扩展 Collection 的容量。</p>
