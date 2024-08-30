---
id: data_processing.md
summary: 了解 Milvus 的数据处理程序。
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
    </button></h1><p>本文详细介绍了 Milvus 中数据插入、索引建立和数据查询的实现。</p>
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
    </button></h2><p>在 Milvus 中，您可以为每个集合指定若干分片，每个分片对应一个虚拟通道<em>（vchannel</em>）。如下图所示，Milvus 会为日志代理中的每个 v 通道分配一个物理通道<em>（pchannel</em>）。任何传入的插入/删除请求都会根据主键的哈希值路由到分片。</p>
<p>由于 Milvus 没有复杂的事务，因此 DML 请求的验证工作转交给了代理。代理会向 TSO（Timestamp Oracle）请求每个插入/删除请求的时间戳，TSO 是与根协调器共用的计时模块。由于旧的时间戳会被新的时间戳覆盖，因此时间戳可用于确定正在处理的数据请求的顺序。代理从数据协调器分批检索信息，包括实体的分段和主键，以提高总体吞吐量，避免中央节点负担过重。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/channels_1.jpg" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>通道 1</span> </span></p>
<p>DML（数据操作语言）操作和 DDL（数据定义语言）操作都会写入日志序列，但由于 DDL 操作出现的频率较低，因此只分配一个通道。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/channels_2.jpg" alt="Channels 2" class="doc-image" id="channels-2" />
   </span> <span class="img-wrapper"> <span>通道 2</span> </span></p>
<p><em>V 通道</em>保存在底层日志代理节点中。每个通道在物理上不可分割，可用于任何一个节点，但只能用于一个节点。当数据摄取率达到瓶颈时，要考虑两个问题：日志代理节点是否超载并需要扩展，以及是否有足够的分片来确保每个节点的负载平衡。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/write_log_sequence.jpg" alt="Write log sequence" class="doc-image" id="write-log-sequence" />
   </span> <span class="img-wrapper"> <span>写日志顺序</span> </span></p>
<p>上图封装了写入日志序列过程中涉及的四个组件：代理、日志代理、数据节点和对象存储。该流程涉及四项任务：验证 DML 请求、发布-订阅日志序列、从流日志转换为日志快照，以及持久化日志快照。这四项任务相互解耦，以确保每项任务都由相应的节点类型处理。同一类型的节点是平等的，可以灵活、独立地扩展，以适应各种数据负载，尤其是海量、高波动的流数据。</p>
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
    </button></h2><p>索引建立由索引节点执行。为了避免频繁为数据更新建立索引，Milvus 将一个集合进一步划分为多个分段，每个分段都有自己的索引。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/index_building.jpg" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>建立索引</span> </span></p>
<p>Milvus 支持为每个向量场、标量场和主场建立索引。索引构建的输入和输出都与对象存储有关：索引节点将需要索引的日志快照从段（位于对象存储中）加载到内存，反序列化相应的数据和元数据以建立索引，索引建立完成后序列化索引，并将其写回对象存储。</p>
<p>索引构建主要涉及向量和矩阵操作，因此是计算和内存密集型操作。向量因其高维特性，无法用传统的树形索引高效地建立索引，但可以用这方面比较成熟的技术建立索引，如基于集群或图形的索引。无论其类型如何，建立索引都涉及大规模向量的大量迭代计算，如 Kmeans 或图遍历。</p>
<p>与标量数据的索引不同，建立向量索引必须充分利用 SIMD（单指令、多数据）加速。Milvus 本身支持 SIMD 指令集，如 SSE、AVX2 和 AVX512。鉴于向量索引构建的 "打嗝 "和资源密集性质，从经济角度看，弹性对 Milvus 至关重要。未来的 Milvus 版本将进一步探索异构计算和无服务器计算，以降低相关成本。</p>
<p>此外，Milvus 还支持标量过滤和主字段查询。为了提高查询效率，Milvus 还内置了布鲁姆过滤索引、哈希索引、树型索引和反转索引等索引，并计划引入更多外部索引，如位图索引和粗糙索引。</p>
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
    </button></h2><p>数据查询指的是在指定的集合中搜索与目标向量最近的<em>k 个</em>向量或与向量在指定距离范围内的<em>所有</em>向量<em>的</em>过程。向量会连同其相应的主键和字段一起返回。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>数据查询</span> </span></p>
<p>Milvus 中的集合分为多个部分，查询节点按部分加载索引。当搜索请求到达时，它会广播给所有查询节点进行并发搜索。然后，每个节点修剪本地段，搜索符合条件的向量，并还原和返回搜索结果。</p>
<p>在数据查询中，查询节点是相互独立的。每个节点只负责两项任务：根据查询协调器的指令加载或释放段；在本地段内进行搜索。代理负责减少每个查询节点的搜索结果，并将最终结果返回给客户端。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/handoff.jpg" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>分段</span> </span></p>
<p>分段有两种，一种是增长分段（用于增量数据），另一种是封存分段（用于历史数据）。查询节点向 vchannel 订阅最新更新（增量数据），作为增长段。当增长数据段达到预定义的阈值时，数据协调器会将其封存，并开始建立索引。然后，查询协调器启动<em>移交</em>操作，将增量数据转为历史数据。查询协调器将根据内存使用情况、CPU 开销和段落数量，在所有查询节点之间平均分配封存的段落。</p>
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
<li>了解<a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">Milvus 中的数据插入和数据持久性</a>。</li>
<li>了解<a href="https://milvus.io/blog/deep-dive-3-data-processing.md">Milvus</a> 如何<a href="https://milvus.io/blog/deep-dive-3-data-processing.md">处理数据</a>。</li>
</ul>
