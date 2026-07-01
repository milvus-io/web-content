---
id: mqtype-overview.md
title: Message Queue Overview
summary: >-
  Overview of the message queue (mqType) options Milvus supports, and which one
  to use for standalone vs. distributed deployments.
---
<h1 id="Message-Queue-Overview" class="common-anchor-header">Message Queue Overview<button data-href="#Message-Queue-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus relies on a message queue (write-ahead log, WAL) to manage logs of recent changes, output stream logs, and provide log subscriptions. In Milvus 3.x, <strong>Woodpecker</strong> is the default message queue and requires no separate messaging infrastructure. Pulsar, Kafka, and RocksMQ remain supported for specific scenarios.</p>
<h2 id="Supported-message-queues" class="common-anchor-header">Supported message queues<button data-href="#Supported-message-queues" class="anchor-icon" translate="no">
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
<tr><th>Message queue</th><th style="text-align:center">Milvus Standalone</th><th style="text-align:center">Milvus Distributed (cluster)</th><th>Default in</th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/woodpecker.md">Woodpecker</a></td><td style="text-align:center">✔️ (embedded)</td><td style="text-align:center">✔️ (embedded or service)</td><td><strong>Milvus 3.x</strong> (both modes)</td><td>Default and recommended. Cloud-native WAL on object storage; no external service required.</td></tr>
<tr><td><a href="/docs/mq_pulsar.md">Pulsar</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>≤ 2.5.x (cluster default)</td><td>Supported, external or bundled.</td></tr>
<tr><td><a href="/docs/mq_kafka.md">Kafka</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✔️</td><td>—</td><td>Supported. Only Kafka 2.x or 3.x.</td></tr>
<tr><td><a href="/docs/mq_rocksmq.md">RocksMQ</a></td><td style="text-align:center">✔️</td><td style="text-align:center">✖️</td><td>≤ 2.5.x (standalone default)</td><td>Supported for <strong>standalone only</strong>.</td></tr>
</tbody>
</table>
<div class="alert note">
<ul>
<li><p>Each Milvus instance uses exactly one message queue.</p></li>
<li><p><strong>Message Queue limitations</strong>: When upgrading to Milvus v3.0-beta, you must maintain your current message queue choice. Switching between different message queue systems during the upgrade is not supported. Support for changing message queue systems will be available in future versions.</p></li>
<li><p>To change the message queue of a running instance, see <a href="/docs/switch-mq-type.md">Switch MQ Type</a>. The Switch MQ feature is available in <strong>Milvus 3.0 and later</strong> — upgrade to Milvus 3.0 or later first.</p></li>
</ul>
</div>
<h2 id="Choosing-a-message-queue" class="common-anchor-header">Choosing a message queue<button data-href="#Choosing-a-message-queue" class="anchor-icon" translate="no">
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
<li><strong>New deployments (Milvus 3.x):</strong> use <strong>Woodpecker</strong> (the default). Standalone runs it embedded; for distributed (cluster), the recommended default is a dedicated <a href="/docs/woodpecker.md#Deployment-modes">service</a> deployed with Helm, and embedded is also supported.</li>
<li><strong>Existing Pulsar or Kafka users:</strong> Pulsar and Kafka remain fully supported. Keep them, or <a href="/docs/switch-mq-type.md">switch to Woodpecker</a>.</li>
<li><strong>RocksMQ:</strong> standalone only, and superseded by embedded Woodpecker in Milvus 3.x.</li>
</ul>
