---
id: four_layers.md
summary: Milvus 的存储/计算分解结构。
title: 存储/计算分解
---
<h1 id="StorageComputing-Disaggregation" class="common-anchor-header">存储/计算分解<button data-href="#StorageComputing-Disaggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>按照数据平面和控制平面分解的原则，Milvus 包括四个层，在可扩展性和灾难恢复方面相互独立。</p>
<h2 id="Access-layer" class="common-anchor-header">接入层<button data-href="#Access-layer" class="anchor-icon" translate="no">
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
    </button></h2><p>访问层由一组无状态代理组成，是系统的前端层，也是用户的终端。它验证客户端请求并减少返回结果：</p>
<ul>
<li>代理本身是无状态的。它使用 Nginx、Kubernetes Ingress、NodePort 和 LVS 等负载均衡组件提供统一的服务地址。</li>
<li>由于 Milvus 采用的是大规模并行处理（MPP）架构，代理会对中间结果进行聚合和后处理，然后再将最终结果返回给客户端。</li>
</ul>
<h2 id="Coordinator-service" class="common-anchor-header">协调服务<button data-href="#Coordinator-service" class="anchor-icon" translate="no">
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
    </button></h2><p>协调器服务将任务分配给工作节点，起到系统大脑的作用。它承担的任务包括集群拓扑管理、负载平衡、时间戳生成、数据声明和数据管理。</p>
<p>协调器有三种类型：根协调器（root coordinator）、数据协调器（data coordinator）和查询协调器（query coordinator）。</p>
<h3 id="Root-coordinator-root-coord" class="common-anchor-header">根协调器（root coordinator）</h3><p>Root 协调员处理数据定义语言（DDL）和数据控制语言（DCL）请求，如创建或删除 Collections、分区或索引，以及管理 TSO（时间戳 Oracle）和时间刻度签发。</p>
<h3 id="Query-coordinator-query-coord" class="common-anchor-header">查询协调器（查询协调器）</h3><p>Query 协调员负责管理查询节点的拓扑结构和负载平衡，以及从增长网段到封存网段的切换。</p>
<h3 id="Data-coordinator-data-coord" class="common-anchor-header">数据协调器（数据协调器）</h3><p>数据协调器管理数据节点和索引节点的拓扑结构，维护元数据，并触发刷新、压缩和索引构建以及其他后台数据操作。</p>
<h2 id="Worker-nodes" class="common-anchor-header">工作节点<button data-href="#Worker-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>手臂和腿。工作节点是哑执行器，它们遵从协调器服务的指令，执行来自代理的数据操作语言（DML）命令。由于存储和计算分离，工作节点是无状态的，部署在 Kubernetes 上时可促进系统扩展和灾难恢复。工作节点有三种类型：</p>
<h3 id="Query-node" class="common-anchor-header">查询节点</h3><p>查询节点通过订阅日志代理检索增量日志数据并将其转化为不断增长的片段，从对象存储中加载历史数据，并在向量和标量数据之间运行混合搜索。</p>
<h3 id="Data-node" class="common-anchor-header">数据节点</h3><p>数据节点通过订阅日志代理检索增量日志数据，处理突变请求，将日志数据打包成日志快照并存储在对象存储中。</p>
<h3 id="Index-node" class="common-anchor-header">索引节点</h3><p>索引节点构建索引。  索引节点不需要常驻内存，可以使用无服务器框架来实现。</p>
<h2 id="Storage" class="common-anchor-header">存储<button data-href="#Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>存储是系统的骨骼，负责数据持久性。它包括元存储、日志代理和对象存储。</p>
<h3 id="Meta-storage" class="common-anchor-header">元存储</h3><p>元存储存储元数据的快照，如 Collections Schema 和消息消耗检查点。元数据的存储要求极高的可用性、强一致性和事务支持，因此 Milvus 选择 etcd 作为元存储。Milvus 还使用 etcd 进行服务注册和健康检查。</p>
<h3 id="Object-storage" class="common-anchor-header">对象存储</h3><p>对象存储用于存储日志快照文件、标量和向量数据的索引文件以及中间查询结果。Milvus 使用 MinIO 作为对象存储，可随时部署在 AWS S3 和 Azure Blob 这两个全球最流行、最具成本效益的存储服务上。然而，对象存储的访问延迟较高，并按查询次数收费。为了提高性能并降低成本，Milvus 计划在基于内存或固态硬盘的缓存池上实现冷热数据分离。</p>
<h3 id="WAL-storage" class="common-anchor-header">WAL 存储</h3><p>先写日志（WAL）存储是分布式系统中数据持久性和一致性的基础。在提交任何更改之前，首先要将其记录在日志中，以确保在发生故障时，可以准确恢复到之前的位置。</p>
<p>常见的 WAL 实现包括 Kafka、Pulsar 和 Woodpecker。与传统的基于磁盘的解决方案不同，Woodpecker 采用云原生的零磁盘设计，直接写入对象存储。这种方法可以毫不费力地根据您的需求进行扩展，并通过消除管理本地磁盘的开销来简化操作符。</p>
<p>通过提前记录每次写入操作，WAL 层保证了可靠的全系统恢复和一致性机制--无论您的分布式环境发展得多么复杂。</p>
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
<li>阅读 "<a href="/docs/zh/main_components.md">主要组件</a>"，了解有关 Milvus 架构的更多详情。</li>
</ul>
