---
id: switch-mq-type.md
title: Switch MQ Type
summary: >-
  Switch the message queue of an existing Milvus deployment between Woodpecker
  and another message queue without downtime.
---
<h1 id="Switch-MQ-Type" class="common-anchor-header">Switch MQ Type<button data-href="#Switch-MQ-Type" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide describes how to switch the message queue (MQ) of an existing Milvus deployment <strong>between Woodpecker and another message queue</strong>, online and without downtime.</p>
<div class="alert warning">
<p>This feature is pending release and is subject to change. Please reach out to Milvus support if you want to try it out or have any questions.</p>
</div>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisites<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><strong>The Switch MQ feature is available in Milvus 3.0 and later.</strong> Upgrade your Milvus instance to Milvus 3.0 or later before using it — the feature is not available on earlier versions.</li>
<li>The instance is running properly.</li>
</ul>
<h2 id="Scope" class="common-anchor-header">Scope<button data-href="#Scope" class="anchor-icon" translate="no">
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
    </button></h2><p>This guide covers switching <strong>between Woodpecker and another message queue</strong> only. Switching directly between Pulsar and Kafka is out of scope.</p>
<ul>
<li><a href="/docs/switch-rocksmq-woodpecker.md">Switch between RocksMQ and Woodpecker</a> — Milvus Standalone (Docker Compose)</li>
<li><a href="/docs/switch-pulsar-woodpecker.md">Switch between Pulsar and Woodpecker</a> — Milvus cluster (Helm / Milvus Operator)</li>
<li><a href="/docs/switch-kafka-woodpecker.md">Switch between Kafka and Woodpecker</a> — Milvus cluster (Helm / Milvus Operator)</li>
</ul>
<h2 id="General-workflow" class="common-anchor-header">General workflow<button data-href="#General-workflow" class="anchor-icon" translate="no">
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
<li>Ensure the Milvus instance is running properly.</li>
<li>Confirm the source MQ type and the target MQ type.</li>
<li>Render the target MQ’s access settings into the Milvus configuration <strong>without</strong> changing the <code translate="no">mqType</code> value.</li>
<li>Trigger the switch by calling the WAL alter API on MixCoord.</li>
<li>Monitor the logs to confirm the switch has completed.</li>
</ol>
<div class="alert note">
<p>Before switching, ensure that the target MQ does not contain topics with the same names as those used by the current Milvus instance. This is especially important if the target MQ has been used by another Milvus instance, as conflicting topic names can lead to unexpected behavior.</p>
</div>
<h2 id="Support-matrix" class="common-anchor-header">Support matrix<button data-href="#Support-matrix" class="anchor-icon" translate="no">
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
<tr><th>Source MQ</th><th>Target MQ</th><th>Deployment</th><th>Status</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (local/MinIO)</td><td>Standalone (Docker Compose)</td><td><strong>Supported</strong></td></tr>
<tr><td>Woodpecker (local/MinIO)</td><td>RocksMQ</td><td>Standalone (Docker Compose)</td><td><strong>Supported</strong></td></tr>
<tr><td>Pulsar (builtin/external)</td><td>Woodpecker (MinIO)</td><td>Cluster (Helm / Operator)</td><td><strong>Supported</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Pulsar (external)</td><td>Cluster (Helm / Operator)</td><td><strong>Supported</strong></td></tr>
<tr><td>Kafka (builtin/external)</td><td>Woodpecker (MinIO)</td><td>Cluster (Helm / Operator)</td><td><strong>Supported</strong></td></tr>
<tr><td>Woodpecker (MinIO)</td><td>Kafka (external)</td><td>Cluster (Helm / Operator)</td><td><strong>Supported</strong></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker local (or vice versa)</td><td>any</td><td><strong>Not supported</strong></td></tr>
</tbody>
</table>
<div class="alert note">
<p>Avoid switching MQ types back and forth repeatedly. If you do need to switch, make sure to clean up the related data before each switch — residual data may cause unexpected behavior.</p>
</div>
