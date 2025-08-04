---
id: streaming_service.md
title: 流媒体服务
summary: 流媒体服务是 Milvus 内部流媒体系统模块的一个概念，围绕前向写日志（WAL）构建，支持各种与流媒体相关的功能。
---
<h1 id="Streaming-Service" class="common-anchor-header">流媒体服务<button data-href="#Streaming-Service" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>流服务</strong>是 Milvus 内部流系统模块的一个概念，它围绕前向写日志（WAL）构建，以支持各种与流相关的功能。这些功能包括流式数据摄取/订阅、集群状态故障恢复、将流式数据转换为历史数据以及增长数据查询。从架构上讲，流服务由三个主要部分组成：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_distributed_arch.png" alt="Streaming Distributed Arc" class="doc-image" id="streaming-distributed-arc" />
   </span> <span class="img-wrapper"> <span>流分布式弧</span> </span></p>
<ul>
<li><p><strong>流协调器</strong>：协调器节点中的逻辑组件。它使用 Etcd 进行服务发现，以找到可用的流节点，并负责将 WAL 与相应的流节点绑定。它还负责注册服务，以公开 WAL 分布拓扑，让流客户端知道给定 WAL 的相应流节点。</p></li>
<li><p><strong>流节点集群</strong>：负责所有流处理任务（如 WAL 附加、状态恢复、数据增长查询）的流工作节点集群。</p></li>
<li><p><strong>流客户端</strong>Milvus 内部开发的客户端，封装了服务发现和就绪检查等基本功能。它用于启动消息写入和订阅等操作。</p></li>
</ul>
<h2 id="Message" class="common-anchor-header">信息<button data-href="#Message" class="anchor-icon" translate="no">
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
    </button></h2><p>流服务是一个日志驱动的流系统，因此 Milvus 中的所有写操作（如 DML 和 DDL）都被抽象为<strong>消息</strong>。</p>
<ul>
<li><p>流服务会为每个消息分配一个<strong>时间戳 Oracle（TSO）</strong>字段，表示消息在 WAL 中的顺序。消息的排序决定了 Milvus 中写入操作的顺序。这使得从日志中重建最新群集状态成为可能。</p></li>
<li><p>每个消息都属于一个特定的<strong>VChannel</strong>（虚拟通道），并在该通道内保持一定的不变属性，以确保操作的一致性。例如，在同一通道上，Insert 操作必须始终发生在 DropCollection 操作之前。</p></li>
</ul>
<p>Milvus 中的消息顺序可能类似于以下内容：</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/message_order.png" alt="Message Order" class="doc-image" id="message-order" />
   </span> <span class="img-wrapper"> <span>消息顺序</span> </span></p>
<h2 id="WAL-Component" class="common-anchor-header">WAL 组件<button data-href="#WAL-Component" class="anchor-icon" translate="no">
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
    </button></h2><p>为了支持大规模横向扩展，Milvus 的 WAL 不是一个单一的日志文件，而是多个日志的复合文件。每个日志都能独立支持多个 V 通道的流功能。在任何时候，WAL 组件都只能在<strong>一个流节点</strong>上操作，这些限制由底层 WAL 存储的围栏机制和流协调器共同保证。</p>
<p>WAL 组件的其他功能包括</p>
<ul>
<li><p><strong>分段生命周期管理</strong>：基于内存条件/段大小/段空闲时间等策略，WAL 可管理每个段的生命周期。</p></li>
<li><p><strong>基本事务支持</strong>：由于每个消息都有大小限制，因此 WAL 组件支持简单事务级，以保证在 VChannel 级别进行原子写入。</p></li>
<li><p><strong>高并发远程日志写入</strong>：Milvus 支持第三方远程消息队列作为 WAL 存储。为减少流节点和远程 WAL 存储之间的往返延迟（RTT）以提高写吞吐量，流服务支持并发日志写入。它通过 TSO 和 TSO 同步来维护消息顺序，并按 TSO 顺序读取 WAL 中的消息。</p></li>
<li><p><strong>预写缓冲区</strong>：信息写入 WAL 后，会暂时存储在预写缓冲区中。这样就能实现日志的尾部读取，而无需从远程 WAL 存储中获取报文。</p></li>
<li><p><strong>支持多个 WAL 存储</strong>：Woodpecker、Pulsar 和 Kafka。使用零磁盘模式的 Woodpecker，我们可以消除对远程 WAL 存储的依赖。</p></li>
</ul>
<h2 id="Recovery-Storage" class="common-anchor-header">恢复存储<button data-href="#Recovery-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>恢复存储</strong>组件总是运行在相应 WAL 组件所在的流节点上。</p>
<ul>
<li><p>它负责将流数据转换为持久化历史数据，并将其存储在对象存储中。</p></li>
<li><p>它还负责处理流节点上 WAL 组件的内存状态恢复。</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/recovery_storage.png" alt="Recovery Storage" class="doc-image" id="recovery-storage" />
   </span> <span class="img-wrapper"> <span>恢复存储</span> </span></p>
<h2 id="Query-Delegator" class="common-anchor-header">查询委托器<button data-href="#Query-Delegator" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>查询委托器</strong>在每个流节点上运行，负责在单个分片上执行<strong>增量查询</strong>。它生成查询计划，将其转发给相关的查询节点，并汇总查询结果。</p>
<p>此外，查询委托器还负责向其他查询节点广播<strong>删除操作</strong>。</p>
<p>查询委托器总是与 WAL 组件共存于同一个流节点上。但如果 Collections 配置了多副本，那么其他流节点上将部署<strong>N-1 个</strong>委托器。</p>
<h2 id="WAL-Lifetime-and-Wait-for-Ready" class="common-anchor-header">WAL 寿命和等待就绪<button data-href="#WAL-Lifetime-and-Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>通过将计算节点与存储分离，Milvus 可以轻松地将 WAL 从一个流节点传输到另一个流节点，实现流服务的高可用性。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/wal_lifetime.png" alt="wal lifetime" class="doc-image" id="wal-lifetime" />
   </span> <span class="img-wrapper"> <span>WAL 寿命</span> </span></p>
<h2 id="Wait-for-Ready" class="common-anchor-header">等待就绪<button data-href="#Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>当 WAL 转移到新的流节点时，客户端会发现旧的流节点拒绝了一些请求。与此同时，WAL 将在新的流节点上恢复，客户端将等待新流节点上的钱包就绪。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_wait_for_ready.png" alt="wait for ready" class="doc-image" id="wait-for-ready" />
   </span> <span class="img-wrapper"> <span>等待就绪</span> </span></p>
