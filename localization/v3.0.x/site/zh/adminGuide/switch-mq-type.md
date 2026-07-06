---
id: switch-mq-type.md
title: 切换消息队列类型
summary: 在不造成停机的情况下，将现有 Milvus 部署的消息队列在 Woodpecker 与另一个消息队列之间进行切换。
---
<h1 id="Switch-MQ-Type" class="common-anchor-header">切换消息队列类型<button data-href="#Switch-MQ-Type" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南介绍了如何将现有 Milvus 部署的消息队列 (MQ)<strong>在 Woodpecker 与另一消息队列之间</strong>进行切换，该操作可在不影响服务的情况下在线完成。</p>
<div class="alert warning">
<p>此功能尚未发布，具体内容可能会有变动。如果您想试用该功能或有任何疑问，请联系 Milvus 支持团队。</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>“切换消息队列”功能仅在 Milvus 3.0 及更高版本中提供。</strong>使用前请将您的 Milvus 实例升级至 Milvus 3.0 或更高版本——此功能在早期版本中不可用。</li>
<li>实例运行正常。</li>
</ul>
<h2 id="Scope" class="common-anchor-header">适用范围<button data-href="#Scope" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南仅涵盖<strong>在 Woodpecker 与另一消息队列之间</strong>进行切换。Pulsar 与 Kafka 之间的直接切换不在本指南范围内。</p>
<ul>
<li><a href="/docs/zh/switch-rocksmq-woodpecker.md">在 RocksMQ 和 Woodpecker 之间切换</a>— Milvus Standalone（Docker Compose）</li>
<li><a href="/docs/zh/switch-pulsar-woodpecker.md">在 Pulsar 和 Woodpecker 之间切换</a>— Milvus 集群（Helm / Milvus Operator）</li>
<li><a href="/docs/zh/switch-kafka-woodpecker.md">在 Kafka 和 Woodpecker 之间切换</a>— Milvus 集群（Helm / Milvus Operator）</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">一般工作流<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>确保 Milvus 实例运行正常。</li>
<li>确认源 MQ 类型和目标 MQ 类型。</li>
<li>将目标MQ的访问设置映射到Milvus配置中，<strong>同时</strong>保持<code translate="no">mqType</code> 的值<strong>不变</strong>。</li>
<li>通过在 MixCoord 上调用 WAL alter API 触发切换。</li>
<li>监控日志以确认切换已完成。</li>
</ol>
<div class="alert note">
<p>切换前，请确保目标MQ中不包含与当前Milvus实例所用主题名称相同的主题。如果目标MQ曾被另一个Milvus实例使用过，这一点尤为重要，因为主题名称冲突可能会导致意外行为。</p>
</div>
<h2 id="Support-matrix" class="common-anchor-header">支持矩阵<button data-href="#Support-matrix" class="anchor-icon" translate="no">
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
<tr><th>源消息队列</th><th>目标MQ</th><th>部署</th><th>状态</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker（本地/MinIO）</td><td>独立部署（Docker Compose）</td><td><strong>支持</strong></td></tr>
<tr><td>Woodpecker（本地/MinIO）</td><td>RocksMQ</td><td>独立部署（Docker Compose）</td><td><strong>已支持</strong></td></tr>
<tr><td>Pulsar（内置/外部）</td><td>Woodpecker（MinIO）</td><td>集群（Helm / Operator）</td><td><strong>已支持</strong></td></tr>
<tr><td>Woodpecker（MinIO）</td><td>Pulsar（外部）</td><td>集群（Helm / Operator）</td><td><strong>已支持</strong></td></tr>
<tr><td>Kafka（内置/外部）</td><td>Woodpecker（MinIO）</td><td>集群（Helm / Operator）</td><td><strong>已支持</strong></td></tr>
<tr><td>Woodpecker（MinIO）</td><td>Kafka（外部）</td><td>集群（Helm / Operator）</td><td><strong>已支持</strong></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker 本地（或反之）</td><td>任意</td><td><strong>不支持</strong></td></tr>
</tbody>
</table>
<div class="alert note">
<p>请避免反复在不同MQ类型之间切换。如果确实需要切换，请确保在每次切换前清理相关数据——残留数据可能会导致意外行为。</p>
</div>
