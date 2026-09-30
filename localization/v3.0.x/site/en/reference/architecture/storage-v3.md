---
id: storage-v3.md
title: Storage V3
summary: >-
  Learn which Milvus 3.0 features require Storage V3, how to enable it, and
  which compatibility limits apply.
beta: Milvus 3.0.x
---
<h1 id="Storage-V3" class="common-anchor-header">Storage V3<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Storage-V3" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>AI datasets often evolve after a collection is created. As models and workflows change, teams may need to add text, generate new vector fields for existing entities, or use data stored outside Milvus. Supporting these workflows requires a storage model that can evolve with the dataset.</p>
<p>Storage V3 provides this model in Milvus 3.0. It uses a versioned storage layout to incorporate data added or rewritten over time, while applications continue to access collections through the same Milvus APIs.</p>
<p>Storage V3 is disabled by default. After <code translate="no">common.storage.useLoonFFI</code> takes effect, new writes and compaction output use Storage V3. Existing data remains in its current layout until eligible data is rewritten by background compaction. Milvus can read both layouts during this transition. Enable Storage V3 to use features that depend on it, rather than as a general performance optimization.</p>
<h2 id="Data-formats-in-Storage-V3" class="common-anchor-header">Data formats in Storage V3<button data-href="#Data-formats-in-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Storage V3 uses manifests to describe collection data independently of the underlying data format. This lets the same storage layer work with both data managed by Milvus and data that remains in an external system.</p>
<h3 id="Managed-collection-file-formats" class="common-anchor-header">Managed collection file formats<button data-href="#Managed-collection-file-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>For managed collections, <code translate="no">dataNode.storage.format</code> selects the file format for new Storage V3 data. The setting supports the following values:</p>
<table>
<thead>
<tr><th>Format</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>The default, widely adopted columnar file format with broad ecosystem compatibility and mature tooling. Parquet organizes data into row groups and supports per-column encoding and compression, allowing Milvus to read only the required columns and efficiently process large sequential scans.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>An optional, next-generation columnar file format built around extensible, composable encodings and rich statistics. In Milvus, Vortex supports column projection, range reads, and random-access reads. These capabilities can reduce unnecessary data reads for suitable workloads.</td></tr>
</tbody>
</table>
<p>Changing <code translate="no">dataNode.storage.format</code> affects new Storage V3 writes. Existing files keep their current format until compaction rewrites the corresponding segments. Most deployments should keep the default <code translate="no">parquet</code> format unless representative benchmarks show that <code translate="no">vortex</code> better suits their data and access patterns.</p>
<h3 id="External-collections-and-supported-source-formats" class="common-anchor-header">External collections and supported source formats<button data-href="#External-collections-and-supported-source-formats" class="anchor-icon" translate="no">
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
    </button></h3><p>External collections allow Milvus to use data stored in external files or tables. Storage V3 supports the following external source formats:</p>
<table>
<thead>
<tr><th>Format</th><th>Category</th><th>Expected source</th><th>Storage V3 support</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">parquet</code></td><td>File format</td><td>A directory or object-storage prefix containing Parquet files.</td><td>Discovers the files, reads their metadata and row groups, and records them in a Storage V3 manifest.</td></tr>
<tr><td><code translate="no">vortex</code></td><td>File format</td><td>A directory or object-storage prefix containing Vortex files.</td><td>Discovers the files and uses Vortex layout and statistics for projection, range reads, and random-access reads.</td></tr>
<tr><td><code translate="no">lance-table</code></td><td>Table format</td><td>A Lance dataset directory.</td><td>Reads the dataset metadata and maps its fragments into a Storage V3 manifest.</td></tr>
<tr><td><code translate="no">iceberg-table</code></td><td>Table format</td><td>An Iceberg metadata JSON file and snapshot ID.</td><td>Resolves the specified snapshot, plans its data files, and preserves position-delete metadata. Equality deletes are not supported and must be converted to position deletes before the external collection is refreshed.</td></tr>
</tbody>
</table>
<p>External sources are read-only. Storage V3 creates and refreshes its own manifest without modifying or copying the source data. Milvus can then build indexes and run searches and queries over the data through an external collection.</p>
<h4 id="Cloud-storage-and-cross-account-authentication" class="common-anchor-header">Cloud storage and cross-account authentication</h4><p>The following table describes only how an external collection accesses source data stored in another cloud account. It does not describe the object storage used for Milvus-managed data.</p>
<table>
<thead>
<tr><th>Cloud storage</th><th>Supported external formats</th><th>Cross-account authentication for external collections</th></tr>
</thead>
<tbody>
<tr><td>Amazon S3</td><td>All four formats listed above.</td><td>Specify the customer-owned IAM role ARN. Storage V3 uses AWS STS <code translate="no">AssumeRole</code> to obtain temporary credentials and refreshes them as needed. You can also provide an external ID when required by the role’s trust policy.</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>All four formats listed above.</td><td>Specify the target service account. Storage V3 impersonates that service account, uses its short-lived OAuth access tokens to access the source bucket, and refreshes the tokens before they expire.</td></tr>
<tr><td>Azure Blob Storage</td><td><code translate="no">parquet</code>, <code translate="no">vortex</code>, and <code translate="no">lance-table</code>. <code translate="no">iceberg-table</code> is not supported.</td><td>Milvus requests short-lived SAS credentials through the <code translate="no">milvus-tools</code> private gRPC service. Storage V3 uses the SAS credentials to access the source container, and the credentials are renewed before they expire.</td></tr>
<tr><td>Azure Data Lake Storage Gen2 (ADLS Gen2)</td><td>All four formats listed above.</td><td>Milvus requests short-lived SAS credentials through the <code translate="no">milvus-tools</code> private gRPC service. Storage V3 uses the SAS credentials to access the source container, and the credentials are renewed before they expire.</td></tr>
<tr><td>Alibaba Cloud Object Storage Service (OSS)</td><td>All four formats listed above.</td><td>Specify the customer-owned RAM role ARN. Storage V3 assumes the role using the runtime’s workload identity or ECS RAM role, then uses temporary credentials to access the source bucket.</td></tr>
</tbody>
</table>
<p>For external collection configuration and usage instructions, see <a href="/docs/create-an-external-collection.md">Create an External Collection</a>.</p>
<h2 id="Features-that-require-Storage-V3" class="common-anchor-header">Features that require Storage V3<button data-href="#Features-that-require-Storage-V3" class="anchor-icon" translate="no">
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
<tr><th>Feature</th><th>Description</th><th>Required configuration</th></tr>
</thead>
<tbody>
<tr><td>Vortex file format</td><td>Write new managed-collection data in the Vortex file format.</td><td><ul><li><a href="/docs/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><code translate="no">dataNode.storage.format=vortex</code></li></ul></td></tr>
<tr><td><a href="/docs/text.md"><code translate="no">TEXT</code> field</a></td><td>Store long source text, such as passages, documents, tickets, or logs, without setting a fixed maximum length in the collection schema.</td><td><a href="/docs/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
<tr><td><a href="/docs/add-fields-to-an-existing-collection.md">Function-generated vector fields</a></td><td>Add a BM25 or MinHash Function to an existing collection so Milvus generates a new vector field from an existing <code translate="no">VARCHAR</code> field. Milvus backfills the generated values for existing entities asynchronously through background compaction.</td><td><ul><li><a href="/docs/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></li><li><a href="/docs/configure_datacoord.md#dataCoordcompactionbumpSchemaVersionenabled"><code translate="no">dataCoord.compaction.bumpSchemaVersion.enabled</code></a><code translate="no">=true</code></li><li><a href="/docs/configure_datacoord.md#dataCoordcompactionstorageVersionenabled"><code translate="no">dataCoord.compaction.storageVersion.enabled</code></a><code translate="no">=true</code></li></ul></td></tr>
<tr><td><a href="/docs/create-an-external-collection.md">External collections</a></td><td>Query data stored outside Milvus without copying it into a managed collection. Refresh the external collection when the source data changes. To expose additional source fields, see <a href="/docs/alter-external-collection-schema.md">Alter External Collection Schema</a>.</td><td><a href="/docs/configure_common.md#commonstorageuseLoonFFI"><code translate="no">common.storage.useLoonFFI</code></a><code translate="no">=true</code></td></tr>
</tbody>
</table>
<h2 id="Before-you-enable-Storage-V3" class="common-anchor-header">Before you enable Storage V3<button data-href="#Before-you-enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><div class="alert warning">
<p>Once Milvus writes data in Storage V3, downgrading to a Milvus version that cannot read Storage V3 is not supported. Disabling Storage V3 later does not immediately convert all existing Storage V3 data or restore compatibility with the older version.</p>
</div>
<p>Before enabling Storage V3, consider the following data behavior:</p>
<ul>
<li>Because <code translate="no">dataCoord.compaction.storageVersion.enabled</code> is enabled by default, eligible existing data can transition to Storage V3 gradually through background compaction.</li>
<li>Disabling Storage V3 changes the target storage version for future writes and eligible compaction output. It does not synchronously convert all existing Storage V3 data or make a version downgrade safe.</li>
</ul>
<h2 id="Enable-Storage-V3" class="common-anchor-header">Enable Storage V3<button data-href="#Enable-Storage-V3" class="anchor-icon" translate="no">
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
    </button></h2><p>Set <code translate="no">common.storage.useLoonFFI</code> to <code translate="no">true</code> in your Milvus configuration:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">common:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">useLoonFFI:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus treats this setting as refreshable. Apply the change through the configuration-update workflow supported by your deployment. Editing a static configuration file alone does not guarantee that the running deployment has received the new value.</p>
<p>If you plan to add a Function and its generated vector field to an existing collection, also enable the two compaction settings required for existing-data backfill:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">dataCoord:</span>
  <span class="hljs-attr">compaction:</span>
    <span class="hljs-attr">bumpSchemaVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">storageVersion:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>The Function output for existing entities is generated asynchronously through background compaction. A successful schema update does not indicate that backfill has completed for every existing entity.</p>
<h2 id="Related-documentation" class="common-anchor-header">Related documentation<button data-href="#Related-documentation" class="anchor-icon" translate="no">
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
<li><a href="/docs/text.md">Text Field</a></li>
<li><a href="/docs/add-fields-to-an-existing-collection.md">Alter Collection Schema</a></li>
<li><a href="/docs/create-an-external-collection.md">Create an External Collection</a></li>
<li><a href="/docs/install-overview.md">Overview of Milvus Deployment Options</a></li>
<li><a href="/docs/upgrade_milvus_standalone-helm.md">Upgrade Milvus Standalone with Helm Chart</a></li>
<li><a href="/docs/upgrade_milvus_cluster-helm.md">Upgrade Milvus Cluster with Helm Chart</a></li>
<li><a href="/docs/configure_common.md">common-related Configurations</a></li>
<li><a href="/docs/configure_datacoord.md">dataCoord-related Configurations</a></li>
<li><a href="https://milvus.io/blog/why-we-built-loon-a-storage-engine-for-ai-data-that-never-stops-changing.md">Why We Built Loon: a Storage Engine for AI Data That Never Stops Changing</a> — Engineering background on the design motivations behind Storage V3.</li>
</ul>
