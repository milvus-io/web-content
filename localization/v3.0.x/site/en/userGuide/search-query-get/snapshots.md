---
id: snapshots.md
title: Snapshots
summary: >-
  Use snapshots to capture point-in-time collection states for rollback,
  versioning, and testing.
beta: Milvus 3.0.x
---
<h1 id="Snapshots" class="common-anchor-header">Snapshots<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Snapshots" class="anchor-icon" translate="no">
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
    </button></h1><p>A snapshot is a point-in-time image of a Milvus collection, ideal for quick rollbacks, versioning, and testing. It captures the collection’s state at a specific timestamp and stores only metadata and manifest files, such as the schema, indexes, and vector data files (binlogs), for efficient storage and restoration.</p>
<div class="alert note">
<p>Snapshots are quick, point-in-time images of data, suitable for fast rollbacks or testing (<strong>days to weeks</strong>). At the same time, backups are independent, complete copies stored separately for long-term disaster recovery (<strong>weeks to years</strong>) and for better protection against total storage failure.</p>
<p>To create backups, refer to <a href="/docs/milvus_backup_overview.md">Milvus Backup</a>.</p>
</div>
<h2 id="Snapshot-anatomy" class="common-anchor-header">Snapshot anatomy<button data-href="#Snapshot-anatomy" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus implements a manifest-based snapshot architecture for efficient point-in-time capture, storage, and restoration of data without duplicating the actual vector data. The architecture separates metadata management from physical data storage, enabling lightweight snapshots that reference existing segment files in object storage.</p>
<p>When you create a snapshot for a collection, Milvus collects the following:</p>
<ul>
<li><p><strong>Snapshot metadata</strong></p>
<p>It provides basic information for creating the snapshot, including the snapshot name and description, the target collection ID, and the time point at which the snapshot is created.</p></li>
<li><p><strong>Collection description</strong></p>
<p>It contains the description of the target collection, including its schema definition, partition information, and properties.</p></li>
<li><p><strong>Index information</strong></p>
<p>It stores the index metadata and the paths to index files.</p></li>
<li><p><strong>Segment data</strong></p>
<p>It captures the vector data files (binlogs), deletion logs (deltalogs), and index files.</p></li>
</ul>
<p>Among the above information, Milvus generates an Apache Avro manifest file for each segment and stores the snapshot metadata, collection description, index information, and the paths to the manifest files in a JSON file. The following diagram illustrates the snapshot folder structure.</p>
<pre><code translate="no" class="language-text">snapshots/{collection_id}/
├── metadata/
│   └── {snapshot_id}.json         # Snapshot metadata (JSON format)
│
└── manifests/
    └── {snapshot_id}/             # Directory for each snapshot
        ├── {segment_id_1}.avro    # Individual segment manifest (Avro format)
        ├── {segment_id_2}.avro
        └── ...
<button class="copy-code-btn"></button></code></pre>
<p>Creating a snapshot usually takes milliseconds, and restoring it takes seconds to minutes, depending on the data volume.</p>
<h2 id="Storage-impacts-and-considerations" class="common-anchor-header">Storage impacts and considerations<button data-href="#Storage-impacts-and-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Once Milvus references a segment or index file in a snapshot, it does not garbage-collect those files unless you drop the snapshot. Snapshots consume storage proportional to the size of the target collections, and object storage costs apply to snapshot retention. In extreme cases, a single snapshot can even double your object storage costs. You are advised to</p>
<ul>
<li>Remove old snapshots regularly to save storage.</li>
<li>Use descriptive names and descriptions for future reference.</li>
<li>Always verify snapshot creation and restoration results.</li>
<li>Track snapshot creation timestamps, storage usage, and restoration job IDs for monitoring and troubleshooting.</li>
</ul>
<h2 id="Limits-and-restrictions" class="common-anchor-header">Limits and restrictions<button data-href="#Limits-and-restrictions" class="anchor-icon" translate="no">
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
<li>Snapshots become immutable after creation.</li>
<li>You can restore a snapshot only to a new collection within the same cluster as the original.</li>
<li>Restored collections retain the same schema, number of shards, and partition count.</li>
<li>Restored historical data may conflict with TTL policies. You are advised to disable TTL or adjust TTL settings before creating snapshots.</li>
</ul>
<h2 id="Further-readings" class="common-anchor-header">Further readings<button data-href="#Further-readings" class="anchor-icon" translate="no">
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
<li><a href="/docs/manage-snapshots.md">Manage Snapshots</a> — create, list, restore, and delete snapshots.</li>
<li><a href="/docs/snapshot-use-cases.md">Snapshot Use Cases</a> — common patterns and workflows.</li>
<li><a href="/docs/milvus_backup_overview.md">Milvus Backup</a> — long-term backup and restore across clusters.</li>
</ul>
