---
id: data-infra-integration-overview.md
title: 数据基础设施与集成
summary: Milvus 集成的第三方基础设施概述——元数据、对象存储和消息队列。
---
<h1 id="Data-Infrastructure--Integration" class="common-anchor-header">数据基础设施与集成<button data-href="#Data-Infrastructure--Integration" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 基于开源数据基础设施构建其核心依赖项。本章介绍了您可以接入并配置的组件：</p>
<ul>
<li><strong><a href="/docs/zh/etcd.md">元数据</a></strong>— Milvus 将元数据（Collection Schema、节点状态、消耗检查点）存储在 etcd 中。</li>
<li><strong><a href="/docs/zh/object-storage.md">对象存储</a></strong>— Milvus 将索引文件和二进制日志存储在 MinIO、AWS S3 或其他兼容 S3 的云对象存储中。</li>
<li><strong><a href="/docs/zh/mqtype-overview.md">消息队列</a></strong>— Milvus 使用写前日志（WAL）：Woodpecker（默认）、Pulsar、Kafka 或 RocksMQ。</li>
</ul>
<p>默认情况下，新的 Milvus 3.x 部署将使用<strong>Woodpecker</strong>作为消息队列、<strong>etcd</strong>作为元数据存储，以及<strong>MinIO</strong>作为对象存储——无需额外的消息传递基础设施。</p>
