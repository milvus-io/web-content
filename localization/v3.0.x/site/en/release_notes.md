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
<h2 id="v300" class="common-anchor-header">v3.0.0<button data-href="#v300" class="anchor-icon" translate="no">
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
    </button></h2><p>Release date: July 29, 2026</p>
<table>
<thead>
<tr><th>Milvus Version</th><th>Python SDK Version</th><th>Node.js SDK Version</th><th>Java SDK Version</th><th>Go SDK Version</th></tr>
</thead>
<tbody>
<tr><td>3.0.0</td><td>3.0.1</td><td>3.0.3</td><td>3.0.5</td><td>3.0.0</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 is officially released! Building on the lake-native architecture introduced in <a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a>, this release completes what the beta started: External Collection covers more lakehouse workflows; schema supports online add / backfill / drop; the sparse index is rebuilt around SINDI; StructArray and faceted search round out the retrieval engine; FAISS passthrough, and TEXT extend index and modality choices; and Woodpecker runs as a standalone service.</p>
<p>If you are new to the 3.0 line, the Core 3.0 features recall section below summarizes the capabilities introduced in 3.0-beta; the <a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta release notes</a> have the full write-ups.</p>
<h3 id="Whats-new-in-300-since-30-beta" class="common-anchor-header">What’s new in 3.0.0 (since 3.0-beta)<button data-href="#Whats-new-in-300-since-30-beta" class="anchor-icon" translate="no">
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
    </button></h3><h4 id="External-Collection-more-complete-lakehouse-workflows" class="common-anchor-header">External Collection: more complete lakehouse workflows</h4><p>3.0-beta introduced External Collection: reference lake files in place, build indexes, and search them without copying data into Milvus. This release extends it toward complete lakehouse retrieval workflows. External fields can now feed function output fields such as BM25 sparse vectors, MinHash signatures, and text embeddings, so text and model-derived retrieval fields are built inside Milvus without copying the source table. Refresh also supports additive schema evolution: when the external table gains new columns, Milvus patches the affected segments instead of rebuilding the collection.</p>
<p>This release also adds a <code translate="no">milvus-table</code> external format that treats Milvus Snapshot metadata and Storage V3 manifests as an external source, so a collection snapshot can itself be served as an external table — batch and serving systems get a shared, manifest-backed view of the same data.</p>
<p>For more information, refer to <a href="https://milvus.io/docs/v3.0.x/create-an-external-collection.md">Create an External Collection</a> and <a href="https://milvus.io/docs/v3.0.x/snapshots.md">Snapshots</a>.</p>
<h4 id="Flexible-schema-add-backfill-and-drop-columns-online" class="common-anchor-header">Flexible schema: add, backfill, and drop columns online</h4><p>Schemas do not stay static in production — embedding models get replaced, features iterate, fields get deprecated — and these used to mean full-collection rebuilds with downtime or double-writes. 3.0.0 closes the loop: columns can be added, filled, and dropped while serving continues.</p>
<p>Backfill works in both directions. External backfill handles values computed outside Milvus: add a column, snapshot the collection as a consistent starting point, run the job offline, write the values back, and Milvus indexes the new column incrementally — an embedding-model upgrade across hundreds of millions of rows becomes a hot path with no downtime. Inner backfill covers kernel-derived values: attach a BM25 or MinHash function to an existing collection and its output field is computed over existing data automatically.</p>
<p>For more information, refer to <a href="https://milvus.io/docs/v3.0.x/add-fields-to-an-existing-collection.md">Add Fields to an Existing Collection</a>.</p>
<h4 id="Sparse-index-overhaul-SINDI-Block-Max-WAND-and-Block-Max-MaxScore" class="common-anchor-header">Sparse index overhaul: SINDI, Block-Max WAND, and Block-Max MaxScore</h4><p>Milvus 3.0 upgrades the sparse vector index across the board. It introduces new search algorithms — <a href="https://arxiv.org/abs/2509.08395">SINDI</a>, Block-Max WAND, and Block-Max MaxScore — along with inverted-list compression, configurable quantization, and per-workload search-algorithm selection. mmap loading, serialization, and BM25 scoring are also optimized, cutting index storage and loading overhead for large-scale sparse vector and full-text search. In internal benchmarks, the compressed BM25 index is roughly 3x smaller than the 2.6 sparse index at comparable recall, and SINDI reaches up to about 10x the QPS of MaxScore on learned sparse embeddings. Once the new index version is enabled (see Compatibility and behavior notes), SINDI is the default for sparse IP search, and MaxScore is the default for BM25.</p>
<h4 id="StructArray-coverage" class="common-anchor-header">StructArray coverage</h4><p>StructArray now supports null values, bitmap indexes, dynamic field addition on live collections, and partial update of struct fields through upsert, with REST and bulk-import coverage to match.</p>
<p>Element-level search adds hybrid search across vector sub-fields with configurable per-entity collapse (max / sum / avg / top-k variants), plus range search and group-by within it. Nested filtering covers <code translate="no">element_filter</code> predicates, the <code translate="no">MATCH_ANY</code> / <code translate="no">MATCH_ALL</code> / <code translate="no">MATCH_LEAST</code> / <code translate="no">MATCH_MOST</code> / <code translate="no">MATCH_EXACT</code> quantifiers, positional sub-field access such as <code translate="no">tags[0][name]</code>, and <code translate="no">array_length()</code> on the struct column.</p>
<p>For more information, refer to <a href="https://milvus.io/docs/v3.0.x/array-of-structs.md">StructArray</a> and <a href="https://milvus.io/docs/v3.0.x/struct-array-operators.md">StructArray Operators</a>.</p>
<h4 id="Search-Aggregation-and-faceted-search" class="common-anchor-header">Search Aggregation and faceted search</h4><p>Query Aggregation from the beta computes exact statistics over filtered data; 3.0.0 adds faceting on the search path. Specify a facet field at search time and Milvus returns the top facet values, each represented by its best-matching member in ANN ranking and annotated with aggregates such as COUNT and AVG — the faceted-search sidebar (brand, price range, attributes) in one request, instead of over-fetching and counting client-side.</p>
<h3 id="Function-Chain-reranking" class="common-anchor-header">Function Chain reranking<button data-href="#Function-Chain-reranking" class="anchor-icon" translate="no">
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
    </button></h3><p>Reranking is now composable through the Function Chain API, which executes an ordered, typed pipeline as part of a single search request. A chain can combine early L0 rescoring on QueryNode with L2 post-reduction reranking on Proxy, supporting score transformation and combination, model-based reranking, sorting, and candidate trimming without client-side orchestration. This release also adds native XGBoost scoring for L0 reranking using UBJ models registered as FileResources, along with Hugging Face Inference Providers for server-managed text embedding and sentence-similarity reranking.</p>
<h4 id="TEXT-long-text-fields" class="common-anchor-header">TEXT long-text fields</h4><p>TEXT fields make long text first-class, with storage-side length limits removed: they support <code translate="no">text_match</code>, <code translate="no">phrase_match</code>, and BM25. Values under 64 KB stay inline; larger values go to partition-level LOB files in Vortex format, with the column storing only <code translate="no">(file_id, offset)</code> references. LOB files are shared across segments, so compaction moves references instead of rewriting text. For RAG this means retrieving vectors and source text from the same store in one IO — no external blob store to operate.</p>
<h4 id="FAISS-index-passthrough" class="common-anchor-header">FAISS index passthrough</h4><p>A new <code translate="no">FAISS</code> index type accepts arbitrary Faiss index-factory strings through the <code translate="no">faiss_index_name</code> parameter — <code translate="no">IVF64,Flat</code>, <code translate="no">HNSW16,Flat</code>, <code translate="no">OPQ16,IVF64,PQ16x4</code> — with search parameters passed through, so Faiss recipes reproduce directly on Milvus.</p>
<h4 id="Vortex-and-Lance-format-support" class="common-anchor-header">Vortex and Lance format support</h4><p>The storage layer gains two open columnar formats: Vortex as the next-generation internal format — adaptive encodings (dictionary, RLE, bit-packing, float-specific compression), zero-copy decompression, optimized for mixed vector + scalar workloads — and Lance alongside Parquet for open-ecosystem interchange. Vortex is set to become the default internal format, with filter pushdown and a local variant on the roadmap.</p>
<h4 id="Woodpecker-standalone-deployment" class="common-anchor-header">Woodpecker standalone deployment</h4><p>Woodpecker, the WAL at the core of the streaming write path, can now be deployed as an independent service instead of embedded in other nodes — independent scaling, fault isolation, and observability, like any other microservice. This matters most for large clusters and high-write workloads.</p>
<h3 id="Core-30-features-recall" class="common-anchor-header">Core 3.0 features recall<button data-href="#Core-30-features-recall" class="anchor-icon" translate="no">
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
    </button></h3><p>The features below were introduced in <a href="https://milvus.io/docs/release_notes.md#v30-beta">3.0-beta</a> and are part of 3.0.0; see the beta notes for the full write-ups.</p>
<ul>
<li><strong>External Collection</strong> — query lakehouse data (Parquet, Lance, Iceberg, Vortex) in place: zero-copy, read-only, synced through incremental refresh.</li>
<li><strong>Snapshot</strong> — point-in-time read-only collection views by segment reference, with near-zero marginal storage.</li>
<li><strong>Storage V3 (Loon)</strong> — manifest-based columnar storage on object storage; the foundation for Snapshot and External Collection.</li>
<li><strong>Query / Search ORDER BY</strong> — server-side multi-field sorting with per-field ASC / DESC.</li>
<li><strong>Query Aggregation</strong> — COUNT / SUM / AVG / MIN / MAX with group-by, evaluated server-side.</li>
<li><strong>EmbList + DiskANN</strong> — on-disk multi-vector indexing for StructArray embedding lists, with acceleration paths such as Muvera and Lemur.</li>
<li><strong>MinHash function (doc-in, doc-out)</strong> — server-side MinHash signatures plus <code translate="no">MINHASH_LSH</code> for near-duplicate detection.</li>
<li><strong>Nullable vectors</strong> — NULL on all six vector types; search skips NULL rows, and AddField extends to vector fields.</li>
<li><strong>Entity TTL</strong> — per-row expiration driven by a TIMESTAMPTZ field.</li>
<li><strong>FileResource</strong> — cluster-managed dictionaries, synonym lists, and stop-word lists for analyzers, BM25, and Text Match.</li>
<li><strong>Force Merge</strong> — operator-triggered segment compaction, in synchronous or asynchronous mode.</li>
</ul>
<h3 id="Compatibility-and-behavior-notes" class="common-anchor-header">Compatibility and behavior notes<button data-href="#Compatibility-and-behavior-notes" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>Storage V3 (Loon) is disabled by default.</strong> Features that depend on it — such as Snapshot and TEXT fields — require enabling it manually via <code translate="no">common.storage.useLoonFFI</code>. Storage V3 will be enabled by default in a later release.</li>
<li><strong>2.6 → 3.0 compatibility and rollback are guaranteed</strong> — a 3.0 deployment can be rolled back to 2.6. However, once you enable or use features that change the serialized data format (for example Storage V3), rollback is no longer possible.</li>
<li><strong>New index versions are opt-in for now.</strong> Newly introduced index algorithms require manually raising the target index version (<code translate="no">dataCoord.targetVecIndexVersion</code> to 10, <code translate="no">dataCoord.targetScalarIndexVersion</code> to 4) before they take effect; a later release will enable them by default.</li>
<li><strong>GPU images move to CUDA 12.9</strong> and no longer preserve Ubuntu 20.04 GPU compatibility.</li>
</ul>
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
<p>Watch the video below to learn more about Milvus 3.0 and AMA with core maintainers:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
