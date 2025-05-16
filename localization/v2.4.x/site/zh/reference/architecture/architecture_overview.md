---
id: architecture_overview.md
summary: Milvus 提供快速、可靠、稳定的向量数据库，专为相似性搜索和人工智能而建。
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
    </button></h1><p>Milvus 构建在 Faiss、HNSW、DiskANN、SCANN 等流行的向量搜索库之上，专为在包含数百万、数十亿甚至数万亿向量的密集向量数据集上进行相似性搜索而设计。在继续之前，请先熟悉一下 Embeddings 检索的<a href="/docs/zh/v2.4.x/glossary.md">基本原理</a>。</p>
<p>Milvus 还支持数据分片、流式数据摄取、动态 Schema、结合向量和标量数据的搜索、多向量和混合搜索、稀疏向量和其他许多高级功能。该平台按需提供性能，并可进行优化，以适应任何嵌入式检索场景。我们建议使用 Kubernetes 部署 Milvus，以获得最佳的可用性和弹性。</p>
<p>Milvus 采用共享存储架构，其计算节点具有存储和计算分解及横向扩展能力。按照数据平面和控制平面分解的原则，Milvus 由<a href="/docs/zh/v2.4.x/four_layers.md">四层</a>组成：访问层、协调器服务、工作节点和存储。这些层在扩展或灾难恢复时相互独立。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/milvus_architecture.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>架构图</span> </span></p>
<p>根据该图，接口可分为以下几类：</p>
<ul>
<li><strong>DDL / DCL：</strong>createCollection / createPartition / dropCollection / dropPartition / hasCollection / hasPartition</li>
<li><strong>DML / Produce：</strong>插入 / 删除 / 上移</li>
<li><strong>DQL:</strong>搜索/查询</li>
</ul>
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
<li>了解更多有关 Milvus 中<a href="/docs/zh/v2.4.x/four_layers.md">计算/存储分解的</a>信息</li>
<li>了解 Milvus 中的<a href="/docs/zh/v2.4.x/main_components.md">主要组件</a>。</li>
</ul>
