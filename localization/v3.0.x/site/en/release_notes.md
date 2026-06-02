---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---
<h1 id="Release-Notes" class="common-anchor-header">Release Notes<button data-href="#Release-Notes" class="anchor-icon" translate="no">
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
    </button></h1><p>Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. We suggest that you regularly visit this page to learn about updates.</p>
<h2 id="v30-beta" class="common-anchor-header">v3.0-beta<button data-href="#v30-beta" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: May 9, 2026</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th></tr>
</thead>
<tbody>
<tr><td>3.0-beta</td><td>3.0.0</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0-beta extends the Milvus vector database with new integration into the open lake ecosystem: External Collection lets Milvus query external lake tables zero-copy, and Spark can read Milvus collections directly through Snapshot. The release also brings richer retrieval, more expressive schema, deeper text search customization, finer data and model lifecycle controls, and more operator-side controls. Milvus 3.0 is the core kernel of Zilliz Lakebase, powering its unified serving, discovery, and batch.</p>
<p>Click below to join our webinar for more details about Milvus 3.0 and AMA with core maintainers:</p>
<p><a href="https://zilliz.com/event/whats-new-in-milvus-3-0-beta">
  <span class="img-wrapper">
    <img translate="no" src="https://assets.zilliz.com/webinar_3_0_4746da7c2d.png" alt="Webinar 3.0 walkthrough" class="doc-image" id="webinar-3.0-walkthrough" />
    <span>Webinar 3.0 walkthrough</span>
  </span>
</a></p>
<h3 id="Key-Features" class="common-anchor-header">Key Features<button data-href="#Key-Features" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection" class="common-anchor-header">External Collection</h4><p>In typical AI data pipelines, terabytes of embeddings and metadata already sit on object storage as Parquet, Lance, or Iceberg tables. Copying that data into Milvus doubles storage cost, adds an ETL pipeline that has to be kept in sync, and shifts data governance away from the customer.</p>
<p>External Collection removes the copy. A Milvus Collection can reference files where they already live, and Milvus manages only the schema, indexes, and query execution. An incremental refresh keeps the Collection aligned with the underlying files. Customers whose data cannot leave the lake, such as finance and healthcare teams, can run vector retrieval against that data where it sits. A single lake-resident dataset can also be served from multiple Milvus instances at once.</p>
<p>For more information, refer to <a href="/docs/create-an-external-collection.md">Create an External Collection</a>.</p>
<h4 id="Snapshot" class="common-anchor-header">Snapshot</h4><p>Serving and batch discovery often need the same Collection at the same time. A/B model evaluation, large-scale deduplication, backfill validation, and version rollback all need a stable view of the Collection while writes are still going in.</p>
<p>Snapshot creates a point-in-time, read-only view of a Collection by referencing existing segments instead of copying data, so the marginal storage cost is close to zero. Batch jobs can read from the Snapshot under MVCC-style isolation while the live Collection keeps accepting writes.</p>
<p>For more information, refer to <a href="/docs/snapshots.md">Snapshots</a>, <a href="/docs/manage-snapshots.md">Manage Snapshots</a>, and <a href="/docs/snapshot-use-cases.md">Snapshot Use Cases</a>.</p>
<h4 id="Query--Search-Order-By" class="common-anchor-header">Query / Search Order By</h4><p>Search and Query now accept multi-field ordering, with the sort pushed down into the Milvus kernel and <code translate="no">ASC</code> / <code translate="no">DESC</code> settable per field. This closes a common production gap: Top-K by distance alone often does not match the business need when the most similar item is not the cheapest, the most recent, or the most popular.</p>
<p>Applications no longer have to over-fetch results and re-sort on the client to express composite ranking.</p>
<p>For more information, refer to <a href="/docs/single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x">Sort Search Results by Scalar Fields</a> and <a href="/docs/get-and-scalar-query.md#Sort-Query-Results--Milvus-30x">Sort Query Results</a>.</p>
<h4 id="Query-Aggregation" class="common-anchor-header">Query Aggregation</h4><p>Producing tenant-distribution stats, field-completeness counts, or version-rollout progress from a Milvus Collection used to require pulling matching entities back to the client and aggregating them there. Milvus 3.0 pushes SQL-style scalar aggregation into the kernel. A query call accepts <code translate="no">group_by_fields</code> and aggregation expressions in <code translate="no">output_fields</code>, including <code translate="no">count(*)</code>, <code translate="no">count(&lt;field&gt;)</code>, <code translate="no">sum(&lt;field&gt;)</code>, <code translate="no">avg(&lt;field&gt;)</code>, <code translate="no">min(&lt;field&gt;)</code>, and <code translate="no">max(&lt;field&gt;)</code>. Aggregation is evaluated server-side after filtering.</p>
<p>For more information, refer to <a href="/docs/get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x">Aggregate Query Results</a>.</p>
<h4 id="Null-Vector" class="common-anchor-header">Null Vector</h4><p>Embeddings are often produced asynchronously, so an entity can arrive before its vector does. Multimodal data has natural gaps too, such as a video without captions or a product without an image. Earlier versions had no good answer: applications either delayed the write until the vector was ready or filled in a placeholder vector, and both choices hurt retrieval quality.</p>
<p>Milvus 3.0 supports NULL on vector fields across all six vector types. Search skips NULL vectors automatically, retrieval quality is unaffected, and NULL vectors take effectively no storage. <code translate="no">AddField</code> also extends to vector fields under this change: with <code translate="no">nullable=True</code>, an existing Collection can grow new vector fields online without a rebuild.</p>
<p>For more information, refer to <a href="/docs/nullable-and-default.md">Nullable Fields</a>.</p>
<h4 id="Custom-Dictionary--Synonym-Dictionary" class="common-anchor-header">Custom Dictionary & Synonym Dictionary</h4><p>Out-of-the-box tokenizers do not always meet production search quality requirements. Chinese, vertical domains such as medicine, law, and chemistry, and multilingual corpora can benefit substantially from custom dictionaries and synonym tables. Until now, these resources mostly lived as application-side query rewrites.</p>
<p>Milvus 3.0 adds a FileResource mechanism for registering custom tokenizer dictionaries, synonym lists, stop-word lists, and decompounder rules. Once registered, a resource can be referenced from any tokenizer or filter and takes effect on BM25, analyzers, and Text Match. Dictionaries and synonyms can now be versioned and managed centrally instead of scattered across application code.</p>
<p>For more information, refer to <a href="/docs/manage-file-resources.md">Manage File Resources</a>.</p>
<h4 id="Entity-TTL" class="common-anchor-header">Entity TTL</h4><p>Collection-level and partition-level TTL are too coarse for many lifecycle and compliance scenarios. Different tenants inside the same Collection often have different retention rules, and individual entities may need to expire on a schedule that does not match the rest of the Collection.</p>
<p>Milvus 3.0 supports per-entity TTL. Declare a <code translate="no">TIMESTAMPTZ</code> field in the schema, mark it as the TTL field through a Collection property, and Milvus reclaims expired entities automatically. This covers right-to-be-forgotten requests, expiring session data, and bounded conversation history without application-side cleanup.</p>
<p>For more information, refer to <a href="/docs/set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x">Set Entity-level TTL</a>.</p>
<h4 id="MinHash-DIDO-Doc-in-Doc-out" class="common-anchor-header">MinHash DIDO (Doc-in, Doc-out)</h4><p>Milvus 2.6 added the <code translate="no">MINHASH_LSH</code> index for set-based near-duplicate detection, but applications still had to compute MinHash signatures before writing data into Milvus.</p>
<p>Milvus 3.0 adds a server-side MinHash function. Declare a <code translate="no">VARCHAR</code> input field and a <code translate="no">BINARY_VECTOR</code> output field in the schema, attach a <code translate="no">FunctionType.MINHASH</code> function, and Milvus computes the signatures during insert, bulk insert, and search. Together with <code translate="no">MINHASH_LSH</code>, this supports deduplication workflows for large datasets, fingerprinting, and plagiarism detection inside Milvus.</p>
<p>For more information, refer to <a href="/docs/minhash-function.md">MinHash Function</a>.</p>
<h4 id="EmbList-+-DISKANN" class="common-anchor-header">EmbList + DISKANN</h4><p>The “one entity = one vector” assumption no longer fits modern retrieval. Long documents get split into many chunks, late-interaction models such as ColBERT emit one vector per token, and multimodal entities can carry several views.</p>
<p>EmbList stores a variable-length vector list per entity, with <code translate="no">DISKANN</code> as the on-disk index. The disk path keeps RAM usage under control when the corpus exceeds memory budgets. EmbList + <code translate="no">DISKANN</code> is the first variant of the broader StructList family in this RC. The rest of the family, including StructList filtering and Muvera / Lemur multi-vector acceleration, is targeted for the official 3.0 release.</p>
<p>For more information, refer to <a href="/docs/search-with-embedding-lists.md">Search with Embedding Lists</a>.</p>
<h4 id="Force-Merge" class="common-anchor-header">Force Merge</h4><p>Production workloads accumulate segment fragmentation over time, which causes query-latency jitter and inflated storage.</p>
<p>Milvus 3.0 adds the ability to trigger segment compaction explicitly during off-peak windows, in both synchronous and asynchronous modes.</p>
<p>For more information, refer to <a href="/docs/force-merge.md">Force Merge Compaction</a>.</p>
<h4 id="Storage-V3" class="common-anchor-header">Storage V3</h4><p>Milvus 3.0 introduces Storage V3, a manifest-based columnar storage engine where data and metadata live on S3-compatible object storage. Each dataset version is captured as an immutable manifest snapshot, an Avro-encoded file that records which column groups, delta logs, and statistics comprise the dataset.</p>
<p>Manifests are compact Avro files, and delta logs record entity-level deletes without rewriting data files. This keeps metadata overhead small as datasets grow. The manifest also decouples metadata tracking from the query path, allowing a Collection to manage more segments without degrading query performance.</p>
<p>Because states are stored on object storage, the dataset is self-descriptive: any reader with access to the storage path can discover and interpret it without a central catalog. This property underpins External Collection, Snapshot, and future lake integrations.</p>
