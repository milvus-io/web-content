---
id: manage_dependencies.md
title: Manage Dependencies
summary: ''
---
<h1 id="Manage-Dependencies" class="common-anchor-header">Manage Dependencies<button data-href="#Manage-Dependencies" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus leverages third-party dependencies for object, meta, and message storage. There are two major ways to configure third-party dependencies.</p>
<ul>
<li>Object storage: Milvus supports using either MinIO or S3 for object storage.
<ul>
<li><a href="/docs/v2.3.x/deploy_s3.md">Configure object storage with Docker Compose/Helm</a></li>
<li><a href="/docs/v2.3.x/object_storage_operator.md">Configure object storage with Milvus Operator</a></li>
</ul></li>
<li>Meta storage: Milvus uses etcd for meta storage.
<ul>
<li><a href="/docs/v2.3.x/deploy_etcd.md">Configure meta storage with Docker Compose/Helm</a></li>
<li><a href="/docs/v2.3.x/meta_storage_operator.md">Configure meta storage with Milvus Operator</a></li>
</ul></li>
<li>Message storage: Milvus supports using Pulsar, Kafka, or RocksMQ for meta storage.
<ul>
<li><a href="/docs/v2.3.x/deploy_pulsar.md">Configure message storage with Docker Compose/Helm</a></li>
<li><a href="/docs/v2.3.x/message_storage_operator.md">Configure message storage with Milvus Operator</a></li>
</ul></li>
</ul>
