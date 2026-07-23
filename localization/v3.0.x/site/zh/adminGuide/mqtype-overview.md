---
id: mqtype-overview.md
title: 消息队列概述
summary: 概述 Milvus 支持的消息队列（mqType）选项，以及在独立部署和分布式部署中应分别使用哪一种。
---
<h1 id="Message-Queue-Overview" class="common-anchor-header">消息队列概述<button data-href="#Message-Queue-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 依赖消息队列（预写日志，WAL）来管理最近的变更日志、输出流日志，并提供日志订阅功能。在 Milvus 3.x<strong>中，Woodpecker</strong>是默认的消息队列，无需单独的消息传递基础设施。Pulsar、Kafka 和 RocksMQ 仍支持用于特定场景。</p>
<h2 id="Supported-message-queues" class="common-anchor-header">支持的消息队列<button data-href="#Supported-message-queues" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>消息队列</th><th style="text-align:center">Milvus Standalone</th><th style="text-align:center">Milvus Distributed（集群）</th><th>默认配置</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/zh/woodpecker.md">Woodpecker</a></td><td style="text-align:center">✔️（嵌入式）</td><td style="text-align:center">✔️（嵌入式或服务模式）</td><td><strong>Milvus 3.x</strong>（两种模式）</td><td>默认且推荐。基于对象存储的云原生WAL；无需外部服务。</td></tr>
<tr><td><a href="/docs/zh/mq_pulsar.md">Pulsar</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>≤ 2.5.x（集群默认）</td><td>受支持，可选外部服务或捆绑方案。</td></tr>
<tr><td><a href="/docs/zh/mq_kafka.md">Kafka</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>—</td><td>受支持。仅支持 Kafka 2.x 或 3.x。</td></tr>
<tr><td><a href="/docs/zh/mq_rocksmq.md">RocksMQ</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✖️</td><td>≤ 2.5.x（独立模式默认）</td><td><strong>仅</strong>支持<strong>独立</strong>模式。</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>每个 Milvus 实例仅使用一个消息队列。</p></li>
<li><p><strong>消息队列限制</strong>：升级至 Milvus v3.0-beta 时，必须保留当前的消息队列选择。升级过程中不支持在不同的消息队列系统之间切换。未来版本将支持更改消息队列系统。</p></li>
<li><p>若要更改正在运行的实例的消息队列，请参阅<a href="/docs/zh/switch-mq-type.md">“切换消息队列类型”</a>。“切换消息队列”功能仅在<strong>Milvus 3.0 及更高版本中</strong>提供——请先升级至 Milvus 3.0 或更高版本。</p></li>
</ul>
</div>
<h2 id="Choosing-a-message-queue" class="common-anchor-header">选择消息队列<button data-href="#Choosing-a-message-queue" class="anchor-icon" translate="no">
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
<li><strong>新部署（Milvus 3.x）：</strong>请使用<strong>Woodpecker</strong>（默认）。独立部署采用嵌入式运行；对于分布式（集群）部署，推荐的默认方案是通过 Helm 部署的专用<a href="/docs/zh/woodpecker.md#Deployment-modes">服务</a>，同时也支持嵌入式运行。</li>
<li><strong>现有 Pulsar 或 Kafka 用户：</strong>Pulsar 和 Kafka 仍受全面支持。您可以继续使用它们，或<a href="/docs/zh/switch-mq-type.md">切换至 Woodpecker</a>。</li>
<li><strong>RocksMQ：</strong>仅支持独立部署，且已被 Milvus 3.x 中的嵌入式 Woodpecker 取代。</li>
</ul>
