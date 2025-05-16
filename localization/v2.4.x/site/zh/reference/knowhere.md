---
id: knowhere.md
summary: 了解 Milvus 的 Knowhere。
title: Knowhere
---
<h1 id="Knowhere" class="common-anchor-header">Knowhere<button data-href="#Knowhere" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍 Milvus 的核心向量执行引擎 Knowhere。</p>
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
    </button></h2><p>Knowhere 是 Milvus 的核心向量执行引擎，它集成了多个向量相似性搜索库，包括<a href="https://github.com/facebookresearch/faiss">Faiss</a>、<a href="https://github.com/nmslib/hnswlib">Hnswlib</a>和<a href="https://github.com/spotify/annoy">Annoy</a>。Knowhere 的设计还支持异构计算。它可以控制在哪个硬件（CPU 或 GPU）上执行索引构建和搜索请求。这就是Knowhere名字的由来--知道在哪里执行操作符。未来的版本将支持更多类型的硬件，包括 DPU 和 TPU。</p>
<h2 id="Knowhere-in-the-Milvus-architecture" class="common-anchor-header">Milvus架构中的Knowhere<button data-href="#Knowhere-in-the-Milvus-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>下图说明了 Knowhere 在 Milvus 架构中的位置。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/knowhere_architecture.png" alt="Knowhere" class="doc-image" id="knowhere" />
   </span> <span class="img-wrapper"> <span>Knowhere</span> </span></p>
<p>最底层是系统硬件。上面是第三方索引库。在最上层，Knowhere通过CGO与索引节点和查询节点交互，CGO允许Go包调用C代码。</p>
<h2 id="Knowhere-advantages" class="common-anchor-header">Knowhere的优势<button data-href="#Knowhere-advantages" class="anchor-icon" translate="no">
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
    </button></h2><p>以下是Knowhere与Faiss相比的优势。</p>
<h4 id="Support-for-BitsetView" class="common-anchor-header">支持比特视图</h4><p>Milvus 引入了比特集机制来实现 &quot;软删除&quot;。软删除的向量仍然存在于数据库中，但在向量相似性搜索或查询时不会被计算。</p>
<p>比特集中的每个比特都对应一个索引向量。如果某个向量在比特集中被标记为 "1"，则表示该向量已被软删除，在向量搜索过程中不会涉及。比特集参数适用于 Knowhere 中所有公开的 Faiss 索引查询 API，包括 CPU 和 GPU 索引。</p>
<p>有关比特集机制的更多信息，请查看<a href="/docs/zh/v2.4.x/bitset.md">比特集</a>。</p>
<h4 id="Support-for-multiple-similarity-metrics-for-indexing-binary-vectors" class="common-anchor-header">支持二进制向量索引的多种相似性度量方法</h4><p>Knowhere支持<a href="/docs/zh/v2.4.x/metric.md#Hamming-distance">Hamming</a>、<a href="/docs/zh/v2.4.x/metric.md#Jaccard-distance">Jaccard</a>、<a href="/docs/zh/v2.4.x/metric.md#Tanimoto-distance">Tanimoto</a>、<a href="/docs/zh/v2.4.x/metric.md#Superstructure">Superstructure</a>和<a href="/docs/zh/v2.4.x/metric.md#Substructure">Substructure</a>。Jaccard和Tanimoto可用于测量两个样本集之间的相似性，而Superstructure和Substructure可用于测量化学结构的相似性。</p>
<h4 id="Support-for-AVX512-instruction-set" class="common-anchor-header">支持 AVX512 指令集</h4><p>除了Faiss已经支持的<a href="https://en.wikipedia.org/wiki/AArch64">AArch64</a>、<a href="https://en.wikipedia.org/wiki/SSE4#SSE4.2">SSE4.2</a>和<a href="https://en.wikipedia.org/wiki/Advanced_Vector_Extensions">AVX2</a>指令集外，Knowhere还支持<a href="https://en.wikipedia.org/wiki/AVX-512">AVX512</a>指令集，与AVX2指令集相比，<a href="https://en.wikipedia.org/wiki/AVX-512">AVX512</a>指令集可将<a href="https://milvus.io/blog/milvus-performance-AVX-512-vs-AVX2.md">索引构建和查询性能提高20%至30%</a>。</p>
<h4 id="Automatic-SIMD-instruction-selection" class="common-anchor-header">自动选择SIMD指令</h4><p>Knowhere支持在任何CPU处理器（本地部署和云平台）上自动调用合适的SIMD指令（如SIMD SSE、AVX、AVX2和AVX512），因此用户无需在编译时手动指定SIMD标志（如"-msse4"）。</p>
<p>Knowhere 是通过重构 Faiss 的代码库而构建的。依赖于 SIMD 加速的常用函数（如相似性计算）被分解出来。然后为每个函数实现四个版本（即 SSE、AVX、AVX2 和 AVX512），并将每个版本放入单独的源文件中。然后，使用相应的 SIMD 标志对源文件进行单独编译。因此，在运行时，Knowhere 可以根据当前的 CPU 标志自动选择最合适的 SIMD 指令，然后使用挂钩功能链接正确的函数指针。</p>
<h4 id="Other-performance-optimization" class="common-anchor-header">其他性能优化措施</h4><p>阅读《<a href="https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf">Milvus: A Purpose-Built Vector Data Management System</a>》，了解有关 Knowhere 性能优化的更多信息。</p>
<h2 id="Knowhere-code-structure" class="common-anchor-header">Knowhere 代码结构<button data-href="#Knowhere-code-structure" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 中的计算主要涉及向量和标量操作。Knowhere 只处理向量索引的操作符。</p>
<p>索引是一种独立于原始向量数据的数据结构。一般来说，建立索引需要四个步骤：创建索引、训练数据、插入数据和建立索引。在一些人工智能应用中，数据集训练与向量搜索是分离的。先对数据集的数据进行训练，然后插入到 Milvus 等向量数据库中进行相似性搜索。例如，开放数据集 sift1M 和 sift1B 区分了用于训练的数据和用于测试的数据。</p>
<p>然而，在 Knowhere 中，用于训练的数据和用于搜索的数据是相同的。Knowhere 会对一个数据<a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Segments">段</a>中的所有数据进行训练，然后插入所有训练过的数据并为它们建立索引。</p>
<h4 id="DataObj-base-class" class="common-anchor-header"><code translate="no">DataObj</code>基类</h4><p><code translate="no">DataObj</code> 是 Knowhere 中所有数据结构的基类。 是 中唯一的虚拟方法。Index 类继承自 ，其字段名为 &quot;size_&quot;。Index 类还有两个虚拟方法-- 和 。从 派生的 类是所有向量索引的虚拟基类。 提供的方法包括 , , , 和 。<code translate="no">Size()</code> <code translate="no">DataObj</code> <code translate="no">DataObj</code> <code translate="no">Serialize()</code> <code translate="no">Load()</code> <code translate="no">Index</code> <code translate="no">VecIndex</code> <code translate="no">VecIndex</code> <code translate="no">Train()</code> <code translate="no">Query()</code> <code translate="no">GetStatistics()</code> <code translate="no">ClearStatistics()</code></p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/Knowhere_base_classes.png" alt="base class" class="doc-image" id="base-class" />
   </span> <span class="img-wrapper"> <span>基类</span> </span></p>
<p>上图右侧列出了其他一些索引类型。</p>
<ul>
<li><p>Faiss 索引有两个基类：<code translate="no">FaissBaseIndex</code> 用于浮点向量上的所有索引，<code translate="no">FaissBaseBinaryIndex</code> 用于二进制向量上的所有索引。</p></li>
<li><p><code translate="no">GPUIndex</code> 是所有 Faiss GPU 索引的基类。</p></li>
<li><p><code translate="no">OffsetBaseIndex</code> 是所有自主开发索引的基类。鉴于索引文件中只存储向量 ID，128 维向量的文件大小可减少 2 个数量级。</p></li>
</ul>
<h4 id="IDMAP-brute-force-search" class="common-anchor-header"><code translate="no">IDMAP</code>强制搜索</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IDMAP.png" alt="IDMAP" class="doc-image" id="idmap" />
   </span> <span class="img-wrapper"> <span>IDMAP</span> </span></p>
<p>从技术上讲，<code translate="no">IDMAP</code> 不是索引，而是用于暴力搜索。向量插入数据库时，既不需要数据训练，也不需要建立索引。搜索将直接在插入的向量数据上进行。</p>
<p>不过，为了保持代码的一致性，<code translate="no">IDMAP</code> 也继承自<code translate="no">VecIndex</code> 类及其所有虚拟接口。<code translate="no">IDMAP</code> 的用法与其他索引相同。</p>
<h4 id="IVF-indices" class="common-anchor-header">IVF 索引</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/IVF.png" alt="IVF" class="doc-image" id="ivf" />
   </span> <span class="img-wrapper"> <span>IVF</span> </span></p>
<p>IVF（倒置文件）索引是最常用的索引。<code translate="no">IVF</code> 类衍生自<code translate="no">VecIndex</code> 和<code translate="no">FaissBaseIndex</code> ，并进一步扩展到<code translate="no">IVFSQ</code> 和<code translate="no">IVFPQ</code> 。<code translate="no">GPUIVF</code> 衍生自<code translate="no">GPUIndex</code> 和<code translate="no">IVF</code> 。然后，<code translate="no">GPUIVF</code> 进一步扩展到<code translate="no">GPUIVFSQ</code> 和<code translate="no">GPUIVFPQ</code> 。</p>
<p><code translate="no">IVFSQHybrid</code> 是一个自主开发的混合索引。粗量化器在 GPU 上执行，而桶中的搜索则在 CPU 上进行。 的召回率与 相同，但性能更好。<code translate="no">IVFSQHybrid</code> <code translate="no">GPUIVFSQ</code> </p>
<p>二进制索引的基类结构相对简单。<code translate="no">BinaryIDMAP</code> 和<code translate="no">BinaryIVF</code> 由<code translate="no">FaissBaseBinaryIndex</code> 和<code translate="no">VecIndex</code> 派生而来。</p>
<h4 id="Third-party-indices" class="common-anchor-header">第三方索引</h4><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/third_party_index.png" alt="third-party indices" class="doc-image" id="third-party-indices" />
   </span> <span class="img-wrapper"> <span>第三方指数</span> </span></p>
<p>目前，除了 Faiss 之外，只支持两种第三方索引：基于树的索引<code translate="no">Annoy</code> 和基于图的索引<code translate="no">HNSW</code> 。这两种常用的第三方指数均来自<code translate="no">VecIndex</code> 。</p>
<h2 id="Adding-indices-to-Knowhere" class="common-anchor-header">向Knowhere添加索引<button data-href="#Adding-indices-to-Knowhere" class="anchor-icon" translate="no">
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
    </button></h2><p>如果想在Knowhere中添加新的索引，首先可以参考现有的索引：</p>
<ul>
<li><p>要添加基于量化的指数，请参考<code translate="no">IVF_FLAT</code> 。</p></li>
<li><p>要添加基于图的索引，请参考<code translate="no">HNSW</code> 。</p></li>
<li><p>要添加基于树的索引，请参阅<code translate="no">Annoy</code> 。</p></li>
</ul>
<p>参考现有索引后，可以按照以下步骤向Knowhere添加新索引。</p>
<ol>
<li><p>在<code translate="no">IndexEnum</code> 中添加新索引的名称。数据类型为字符串。</p></li>
<li><p>在文件<code translate="no">ConfAdapter.cpp</code> 中为新索引添加数据验证检查。验证检查主要用于验证数据训练和查询的参数。</p></li>
<li><p>为新索引创建一个新文件。新索引的基类应包括<code translate="no">VecIndex</code> 和<code translate="no">VecIndex</code> 的必要虚拟接口。</p></li>
<li><p>在<code translate="no">VecIndexFactory::CreateVecIndex()</code> 中添加新索引的索引构建逻辑。</p></li>
<li><p>在<code translate="no">unittest</code> 目录下添加单元测试。</p></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">下一步工作<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
    </button></h2><p>在了解了 Knowhere 如何在 Milvus 中运行之后，你可能还想</p>
<ul>
<li><p>了解<a href="/docs/zh/v2.4.x/index.md">Milvus 支持的各种类型的索引</a>。</p></li>
<li><p>了解<a href="/docs/zh/v2.4.x/bitset.md">比特集机制</a>。</p></li>
<li><p>了解 Milvus<a href="/docs/zh/v2.4.x/data_processing.md">如何处理数据</a>。</p></li>
</ul>
