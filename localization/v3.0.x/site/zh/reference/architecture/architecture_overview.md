---
id: architecture_overview.md
summary: Milvus 提供了一个专为相似性搜索和人工智能而构建的快速、可靠且稳定的向量数据库。
title: Milvus 架构概述
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Milvus 架构概述<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 是一款<strong>开源的</strong>、<strong>云原生向量</strong>数据库，专为在海量向量数据集上进行高性能相似度搜索而设计。它基于 Faiss、HNSW、DiskANN 和 SCANN 等流行的向量搜索库构建，可为人工智能应用和非结构化数据检索场景提供支持。 在继续阅读之前，请先了解Embeddings检索<a href="/docs/zh/glossary.md">的基本原理</a>。</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">架构图<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>下图展示了 Milvus 的高层次架构，突显了其模块化、可扩展且云原生的设计，其中存储层与计算层完全解耦。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" /> 
   <span>架构图</span>
  
 </span></p>
<h2 id="Architectural-Principles" class="common-anchor-header">架构原则<button data-href="#Architectural-Principles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus遵循数据平面与控制平面解耦的原则，由四个主要层组成，这些层在可扩展性和灾难恢复方面相互独立。 这种存储层和计算层完全解耦的共享存储架构，既支持计算节点的水平扩展，又将 Woodpecker 作为零磁盘 WAL 层进行部署，从而提高了弹性并降低了运维开销。</p>
<p>通过将流处理划分为流处理节点（Streaming Node），将批处理划分为查询节点（Query Node）和数据节点（Data Node），Milvus 在实现高性能的同时，也满足了实时处理的要求。</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">详细的分层架构<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">第 1 层：访问层<button data-href="#Layer-1-Access-Layer" class="anchor-icon" translate="no">
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
    </button></h3><p>访问层由一组无状态代理组成，是系统的前端层，也是用户的端点。它负责验证客户端请求并缩减返回的结果：</p>
<ul>
<li>代理本身是无状态的。它通过 Nginx、Kubernetes Ingress、NodePort 和 LVS 等负载均衡组件提供统一的服务地址。</li>
<li>由于 Milvus 采用大规模并行处理（MPP）架构，代理会在将最终结果返回给客户端之前，对中间结果进行聚合和后处理。</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">第 2 层：协调器<button data-href="#Layer-2-Coordinator" class="anchor-icon" translate="no">
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
    </button></h3><p>协调器是 Milvus 的“大脑”。在任何时刻，整个集群中仅有一个协调器处于活动状态，负责维护集群拓扑、调度所有类型的任务，并确保集群级的一致性。</p>
<p>以下是<strong>协调器</strong>处理的部分任务：</p>
<ul>
<li><strong>DDL/DCL/TSO 管理</strong>：处理数据定义语言（DDL）和数据控制语言（DCL）请求，例如创建或删除 Collection、分区或索引，以及管理 Oracle 时间戳（TSO）和时间计时器的发放。</li>
<li><strong>流式服务管理</strong>：将预写日志（WAL）与流式节点绑定，并为流式服务提供服务发现功能。</li>
<li><strong>查询管理</strong>：管理查询节点的拓扑结构和负载均衡，并提供及管理用于引导查询路由的查询视图。</li>
<li><strong>历史数据管理</strong>：将压缩和索引构建等离线任务分发到数据节点，并管理分段和数据视图的拓扑结构。</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">第 3 层：工作节点<button data-href="#Layer-3-Worker-Nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>这是系统的“手脚”。工作节点是遵循协调器指令的“哑”执行器。得益于存储与计算的分离，工作节点是无状态的，当部署在 Kubernetes 上时，可促进系统的横向扩展和灾难恢复。工作节点有三种类型：</p>
<h3 id="Streaming-node" class="common-anchor-header">流式处理节点<button data-href="#Streaming-node" class="anchor-icon" translate="no">
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
    </button></h3><p>流式节点作为分片级别的“微型大脑”，基于底层的WAL存储提供分片级的一致性保证和故障恢复。同时，流式节点还负责对增长中的数据进行查询并生成查询计划。此外，它还负责将增长中的数据转换为封装（历史）数据。</p>
<h3 id="Query-node" class="common-anchor-header">查询节点<button data-href="#Query-node" class="anchor-icon" translate="no">
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
    </button></h3><p>查询节点从对象存储中加载历史数据，并提供历史数据查询功能。</p>
<h3 id="Data-node" class="common-anchor-header">数据节点<button data-href="#Data-node" class="anchor-icon" translate="no">
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
    </button></h3><p>数据节点负责历史数据的离线处理，例如数据压缩和索引构建。</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">第 4 层：存储<button data-href="#Layer-4-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>存储是系统的基石，负责数据的持久化。它由元数据存储、日志代理和对象存储组成。</p>
<h3 id="Meta-storage" class="common-anchor-header">元数据存储<button data-href="#Meta-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>元数据存储用于存储元数据的快照，例如Collection Schema和消息消费检查点。元数据存储需要极高的可用性、强一致性以及对事务的支持，因此Milvus选择了etcd作为元数据存储。Milvus还使用etcd进行服务注册和健康检查。</p>
<h3 id="Object-storage" class="common-anchor-header">对象存储<button data-href="#Object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>对象存储用于持久化数据和索引文件。Milvus 支持 MinIO、AWS S3 和 Azure Blob Storage 等对象存储后端。查询节点（QueryNodes）会缓存处理查询所需的数据和索引。</p>
<p>借助 Milvus 2.6.4 及更高版本中提供的<a href="/docs/zh/tiered-storage-overview.md">分层存储功能</a>，查询节点可以先加载分段元数据，然后按需获取字段数据或索引，而无需在初始化时加载所有内容。远程对象存储仍是持久化数据源；清除本地缓存条目不会删除存储的数据。 访问未缓存的数据会增加存储 I/O，并可能导致查询延迟增加。对于对延迟敏感的字段或索引，请使用<a href="/docs/zh/warm-up.md">预热功能</a>，并在选择加载策略前评估冷查询以及温缓存的延迟。</p>
<h3 id="WAL-storage" class="common-anchor-header">WAL 存储<button data-href="#WAL-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>预写日志（WAL）存储是分布式系统中数据持久性和一致性的基础。在任何更改提交之前，都会先记录在日志中——这确保了在发生故障时，系统能够精确地从中断处恢复。</p>
<p>常见的 WAL 实现包括 Kafka、Pulsar 和 Woodpecker。与传统的基于磁盘的解决方案不同，Woodpecker 采用云原生、零磁盘设计，可直接写入对象存储。这种方法能根据您的需求轻松扩展，并通过消除管理本地磁盘的开销来简化操作。</p>
<p>通过预先记录每次写入操作，WAL 层确保了可靠的全系统级恢复和一致性机制——无论您的分布式环境变得多么复杂。</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">数据流与 API 分类<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 的 API 按功能分类，并遵循架构中的特定路径：</p>
<table>
<thead>
<tr><th>API 类别</th><th>操作</th><th>示例 API</th><th>架构流程</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>Schema与访问控制</td><td><code translate="no">createCollection</code>,<code translate="no">dropCollection</code>,<code translate="no">hasCollection</code>,<code translate="no">createPartition</code></td><td>访问层 → 协调器</td></tr>
<tr><td><strong>DML</strong></td><td>数据操作</td><td><code translate="no">insert</code>,<code translate="no">delete</code>,<code translate="no">upsert</code></td><td>访问层 → 流处理工作节点</td></tr>
<tr><td><strong>DQL</strong></td><td>数据查询</td><td><code translate="no">search</code>,<code translate="no">query</code></td><td>访问层 → 批处理工作节点（查询节点）</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">数据流示例：搜索操作<button data-href="#Example-Data-Flow-Search-Operation" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>客户端通过 SDK/RESTful API 发送搜索请求</li>
<li>负载均衡器将请求路由至接入层中可用的代理</li>
<li>代理使用路由缓存确定目标节点；仅当缓存不可用时才联系协调器</li>
<li>代理将请求转发至相应的流处理节点，这些节点在本地执行增长型数据搜索的同时，与查询节点协同进行密封数据搜索</li>
<li>查询节点根据需要从对象存储中加载密封分段，并执行分段级搜索</li>
<li>搜索结果经过多级缩减：查询节点对多个分段的结果进行缩减，流式处理节点对来自查询节点的结果进行缩减，代理在将结果返回给客户端之前对来自所有流式处理节点的结果进行缩减</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">数据流示例：数据插入<button data-href="#Example-Data-Flow-Data-Insertion" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li>客户端发送包含向量数据的插入请求</li>
<li>访问层验证请求并将其转发至流式处理节点</li>
<li>流式处理节点将操作记录到 WAL 存储中以确保数据持久性</li>
<li>数据被实时处理并可供查询</li>
<li>当分段达到容量上限时，流式处理节点会触发将其转换为密封分段</li>
<li>数据节点处理数据压缩，并在已封装分段上构建索引，将结果存储在对象存储中</li>
<li>查询节点加载新构建的索引，并替换相应的增长数据</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">下一步<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>探索<a href="/docs/zh/main_components.md">主要组件</a>以了解详细的实现细节</li>
<li>了解<a href="/docs/zh/data_processing.md">数据处理</a>工作流和优化策略</li>
<li>了解 Milvus<a href="/docs/zh/tune_consistency.md">中的一致性模型</a>和事务保证</li>
</ul>
