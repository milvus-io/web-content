---
id: data-infra-integration-overview.md
title: Data Infrastructure
summary: >-
  Overview of the metadata storage, object storage, and message queues that
  Milvus uses.
---
<h1 id="Data-Infrastructure" class="common-anchor-header">Data Infrastructure<button data-href="#Data-Infrastructure" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus relies on metadata storage, object storage, and a message queue for its core data infrastructure. This chapter covers the components you can configure:</p>
<ul>
<li><strong><a href="/docs/etcd.md">Metadata</a></strong> — Milvus stores metadata (collection schemas, node status, consumption checkpoints) in etcd.</li>
<li><strong><a href="/docs/object-storage.md">Object Storage</a></strong> — Milvus stores index files and binary logs in MinIO, AWS S3, or other S3-compatible / cloud object storage.</li>
<li><strong><a href="/docs/mqtype-overview.md">Message Queue</a></strong> — Milvus uses a write-ahead log (WAL): Woodpecker (default), Pulsar, Kafka, or RocksMQ.</li>
</ul>
<p>By default, a new Milvus 3.x deployment runs with <strong>Woodpecker</strong> as the message queue, <strong>etcd</strong> for metadata, and <strong>MinIO</strong> for object storage — no extra messaging infrastructure required.</p>
