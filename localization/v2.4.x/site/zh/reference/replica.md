---
id: replica.md
summary: 了解 Milvus 中的内存复制。
title: 内存内复制
---
<h1 id="In-Memory-Replica" class="common-anchor-header">内存内复制<button data-href="#In-Memory-Replica" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍 Milvus 中的内存中复制（replication）机制，该机制可在工作内存中实现多个网段复制，以提高性能和可用性。</p>
<p>有关如何配置内存中复制的信息，请参阅<a href="/docs/zh/v2.4.x/configure_querynode.md#queryNodereplicas">查询节点相关配置</a>。</p>
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_availability.jpg" alt="Replica_Availiability" class="doc-image" id="replica_availiability" />
   </span> <span class="img-wrapper"> <span>副本可用性</span> </span></p>
<p>利用内存中副本，Milvus 可以在多个查询节点上加载相同的数据段。如果一个查询节点出现故障或忙于处理当前的搜索请求，当另一个查询节点到达时，系统可将新请求发送到拥有相同段复制的空闲查询节点。</p>
<h3 id="Performance" class="common-anchor-header">性能</h3><p>内存中复制允许您利用额外的 CPU 和内存资源。如果你的数据集相对较小，但又想利用额外的硬件资源提高读取吞吐量，这将非常有用。整体 QPS（每秒查询次数）和吞吐量都能显著提高。</p>
<h3 id="Availability" class="common-anchor-header">可用性</h3><p>内存复制有助于 Milvus 在查询节点崩溃时更快地恢复。当一个查询节点发生故障时，无需在另一个查询节点上重新加载数据段。相反，搜索请求可以立即重新发送到新的查询节点，而无需再次重新加载数据。通过同时维护多个数据段副本，系统在面对故障转移时更具弹性。</p>
<h2 id="Key-Concepts" class="common-anchor-header">关键概念<button data-href="#Key-Concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>内存复制以复制组的形式组织。每个副本组都包含<a href="https://milvus.io/docs/v2.1.x/glossary.md#Sharding">分片</a>副本。每个分片副本都有一个流副本和一个历史副本，分别对应于分片（即 DML 通道）中不断增长和封存的<a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">分段</a>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_group.png" alt="An illustration of how in-memory replica works" class="doc-image" id="an-illustration-of-how-in-memory-replica-works" />
   </span> <span class="img-wrapper"> <span>内存复制工作原理示例</span> </span></p>
<h3 id="Replica-group" class="common-anchor-header">副本组</h3><p>副本组由多个<a href="https://milvus.io/docs/v2.1.x/four_layers.md#Query-node">查询节点</a>组成，负责处理历史数据和副本。</p>
<h3 id="Shard-replica" class="common-anchor-header">分片副本</h3><p>分片副本由流式副本和历史副本组成，二者属于同一个<a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Shard">分片</a>。副本组中碎片副本的数量由指定 Collections 中碎片的数量决定。</p>
<h3 id="Streaming-replica" class="common-anchor-header">流副本</h3><p>流副本包含来自同一 DML 通道的所有<a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">增长分段</a>。从技术上讲，流副本只能由一个副本中的一个查询节点提供服务。</p>
<h3 id="Historical-replica" class="common-anchor-header">历史副本</h3><p>历史副本包含来自同一 DML 通道的所有密封数据段。一个历史副本的密封分段可分布在同一副本组内的多个查询节点上。</p>
<h3 id="Shard-leader" class="common-anchor-header">分片组长</h3><p>分片组长是为分片副本中的流副本提供服务的查询节点。</p>
<h2 id="Design-Details" class="common-anchor-header">设计细节<button data-href="#Design-Details" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Balance" class="common-anchor-header">平衡</h3><p>需要加载的新片段将分配给多个不同的查询节点。一旦至少一个副本加载成功，就可以处理搜索请求。</p>
<h3 id="Search" class="common-anchor-header">搜索</h3><h4 id="Cache" class="common-anchor-header">缓存</h4><p>代理会维护一个将数据段映射到查询节点的缓存，并定期更新。当代理收到请求时，Milvus 会从缓存中获取所有需要搜索的封存段，并尝试将它们平均分配给查询节点。</p>
<p>对于不断增长的网段，代理也会维护一个从通道到查询节点的缓存，并将请求发送到相应的查询节点。</p>
<h4 id="Failover" class="common-anchor-header">故障转移</h4><p>代理上的缓存并不总是最新的。当请求到来时，某些片段或通道可能已被转移到其他查询节点。在这种情况下，代理将收到错误响应，更新缓存并尝试将其分配给另一个查询节点。</p>
<p>如果代理在更新缓存后仍无法找到某个片段，该片段将被忽略。如果数据段已被压缩，就会出现这种情况。</p>
<p>如果缓存不准确，代理可能会漏掉一些数据段。具有 DML 通道（不断增长的数据段）的查询节点会返回搜索响应以及可靠数据段的列表，代理可与之比较并更新缓存。</p>
<h3 id="Enhancement" class="common-anchor-header">改进</h3><p>代理无法将搜索请求完全平等地分配给查询节点，查询节点可能拥有不同的资源来满足搜索请求。为避免资源的长尾分布，代理会将其他查询节点上的活动分段分配给同样拥有这些分段的空闲查询节点。</p>
