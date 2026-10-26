---
id: data_processing.md
summary: 了解 Milvus 中的数据处理流程。
title: 数据处理
---
<h1 id="Data-Processing" class="common-anchor-header">数据处理<button data-href="#Data-Processing" class="anchor-icon" translate="no">
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
    </button></h1><p>本文详细介绍了 Milvus 中数据插入、索引构建和数据查询的实现。</p>
<h2 id="Data-insertion" class="common-anchor-header">数据插入<button data-href="#Data-insertion" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Milvus 中，您可以选择 Collection 使用的分片数量——每个分片映射到一个虚拟通道（<em>vchannel</em>）。如下图所示，Milvus 随后将每个<em>vchannel</em>分配给一个物理通道（<em>pchannel</em>），而每个<em>pchannel</em>又绑定到一个特定的流式处理节点。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/pvchannel_wal.png" alt="VChannel, PChannel, and Streaming Node" class="doc-image" id="vchannel,-pchannel,-and-streaming-node" /> 
   <span>VChannel、PChannel 和流式处理节点</span>
  
 </span></p>
<p>数据验证完成后，代理将根据指定的分片路由规则，将写入的消息拆分为各个分片的数据包。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" /> 
   <span>通道 1</span>
  
 </span></p>
<p>然后，一个分片（<em>vchannel</em>）的写入数据会被发送到<em>pchannel</em> 的相应流式处理节点。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" /> 
   <span>写入流程</span>
  
 </span></p>
<p>流式处理节点为每个数据包分配一个时间戳预言机 (TSO)，以建立操作的总顺序。它在将有效载荷写入底层预写日志 (WAL) 之前，会对有效载荷进行一致性检查。 一旦数据被持久化提交到 WAL，就保证不会丢失——即使发生崩溃，流式处理节点也可以重放 WAL 来完全恢复所有挂起操作。</p>
<p>与此同时，流处理节点还会异步地将已提交的 WAL 条目分割为离散的段。段有两种类型：</p>
<ul>
<li><strong>增长分段</strong>：尚未持久化到对象存储中的任何数据。</li>
<li><strong>已封装分段</strong>：所有数据均已持久化到对象存储中，已封装分段的数据不可变。</li>
</ul>
<p>增长分段向密封分段的过渡称为“刷新”。流式处理节点在摄取并写入该分段的所有可用 WAL 条目后（即底层预写日志中不再有待处理记录时）会立即触发刷新，此时该分段即被最终确定并优化为读取模式。</p>
<h2 id="Index-building" class="common-anchor-header">索引构建<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>索引构建由数据节点执行。为避免因数据更新而频繁构建索引，Milvus 中的 Collections 会被进一步划分为多个分段，每个分段都有独立的索引。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" /> 
   <span>索引构建</span>
  
 </span></p>
<p>Milvus 支持为每个向量字段、标量字段和主字段构建索引。 索引构建的输入和输出均涉及对象存储：数据节点将待索引的日志快照（位于对象存储中）加载到内存中，反序列化相应的数据和元数据以构建索引，索引构建完成后对索引进行序列化，并将其写回对象存储。</p>
<p>索引构建主要涉及向量和矩阵运算，因此属于计算和内存密集型操作。由于向量具有高维特性，无法通过传统的基于树的索引进行高效索引，但可以采用该领域更成熟的技术（如基于聚类或图的索引）来构建索引。 无论采用何种类型，针对大规模向量的索引构建都涉及大量的迭代计算，例如 K-means 算法或图遍历。</p>
<p>与标量数据的索引不同，向量索引的构建必须充分利用 SIMD（单指令多数据）加速技术。Milvus 原生支持 SIMD 指令集，例如 SSE、AVX2 和 AVX512。 鉴于向量索引构建过程存在“卡顿”现象且资源消耗巨大，从经济角度来看，弹性对 Milvus 至关重要。未来的 Milvus 版本将进一步探索异构计算和无服务器计算，以降低相关成本。</p>
<p>此外，Milvus 还支持标量过滤和主字段查询。它内置了多种索引以提升查询效率，例如布隆过滤器索引、哈希索引、基于树的索引和倒排索引，并计划引入更多外部索引，例如位图索引和粗略索引。</p>
<h2 id="Data-query" class="common-anchor-header">数据查询<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>数据查询是指在指定 Collection 中搜索与目标向量距离最近的<em>k</em>个向量，或搜索与该向量距离在指定范围内的<em>所有</em>向量的过程。查询结果将返回向量及其对应的主键和字段。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" /> 
   <span>数据查询</span>
  
 </span></p>
<p>Milvus 中的 Collection 被划分为多个分片；流式处理节点（Streaming Node）加载正在增长的分片并维护实时数据，而查询节点（Query Node）则加载已封装的分片。</p>
<p>当查询/搜索请求到达时，代理会将请求广播给负责相关分片的 所有流式节点，以进行并发搜索。</p>
<p>当查询请求到达时，代理会并行请求持有相应分片的流式处理节点执行搜索。</p>
<p>每个流式节点都会生成一个查询计划，搜索其本地增长中的数据，同时联系远程查询节点以检索历史结果，然后将这些结果聚合为一个分片结果。</p>
<p>最后，代理收集所有分片结果，将其合并为最终结果，并将其返回给客户端。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" /> 
   <span>交接</span>
  
 </span></p>
<p>当流式节点上的增长段被刷新到密封段中时——或者当数据节点完成压缩时——协调器会启动一个移交操作，将该增长数据转换为历史数据。 然后，协调器将已封装的分段均匀地分配到所有查询节点上，平衡内存使用、CPU 开销和分段数量，并释放任何冗余分段。</p>
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
<li>了解如何<a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">使用 Milvus 向量数据库进行实时查询</a>。</li>
<li>了解<a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">Milvus 中的数据插入和数据持久化</a>。</li>
<li>了解<a href="https://milvus.io/blog/deep-dive-3-data-processing.md">Milvus 中数据的处理</a>方式。</li>
</ul>
