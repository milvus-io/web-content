---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---

# Release Notes

Find out what's new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. We suggest that you regularly visit this page to learn about updates.

## v3.0.0

Release date: July 29, 2026

| Milvus Version | Python SDK Version | Node.js SDK Version | Java SDK Version | Go SDK Version |
| -------------- | ------------------ | ------------------- | ---------------- | -------------- |
| 3.0.0          | 3.0.1              | 3.0.3               | 3.0.5            | 3.0.0          |

Milvus 3.0.0 is officially released! Building on the lake-native architecture introduced in [3.0-beta](https://milvus.io/docs/release_notes.md#v30-beta), this release completes what the beta started: External Collection covers more lakehouse workflows; schema supports online add / backfill / drop; the sparse index is rebuilt around SINDI; StructArray and faceted search round out the retrieval engine; FAISS passthrough, and TEXT extend index and modality choices; and Woodpecker runs as a standalone service.

Watch the video below to learn more about Milvus 3.0 and AMA with core maintainers: 

<iframe width="560" height="315" src="https://www.youtube.com/embed/SAm4YfrO1ok?si=87HTPnuH_xJtZda0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

If you are new to the 3.0 line, the Core 3.0 features recall section below summarizes the capabilities introduced in 3.0-beta; the [3.0-beta release notes](https://milvus.io/docs/release_notes.md#v30-beta) have the full write-ups.

### What's new in 3.0.0 (since 3.0-beta)

#### External Collection: more complete lakehouse workflows

3.0-beta introduced External Collection: reference lake files in place, build indexes, and search them without copying data into Milvus. This release extends it toward complete lakehouse retrieval workflows. External fields can now feed function output fields such as BM25 sparse vectors, MinHash signatures, and text embeddings, so text and model-derived retrieval fields are built inside Milvus without copying the source table. Refresh also supports additive schema evolution: when the external table gains new columns, Milvus patches the affected segments instead of rebuilding the collection.

This release also adds a `milvus-table` external format that treats Milvus Snapshot metadata and Storage V3 manifests as an external source, so a collection snapshot can itself be served as an external table — batch and serving systems get a shared, manifest-backed view of the same data.

For more information, refer to [Create an External Collection](create-an-external-collection.md) and [Snapshots](snapshots.md).

#### Flexible schema: add, backfill, and drop columns online

Schemas do not stay static in production — embedding models get replaced, features iterate, fields get deprecated — and these used to mean full-collection rebuilds with downtime or double-writes. 3.0.0 closes the loop: columns can be added, filled, and dropped while serving continues.

Backfill works in both directions. External backfill handles values computed outside Milvus: add a column, snapshot the collection as a consistent starting point, run the job offline, write the values back, and Milvus indexes the new column incrementally — an embedding-model upgrade across hundreds of millions of rows becomes a hot path with no downtime. Inner backfill covers kernel-derived values: attach a BM25 or MinHash function to an existing collection and its output field is computed over existing data automatically.

For more information, refer to [Add Fields to an Existing Collection](add-fields-to-an-existing-collection.md).

#### Sparse index overhaul: SINDI, Block-Max WAND, and Block-Max MaxScore

Milvus 3.0 upgrades the sparse vector index across the board. It introduces new search algorithms — [SINDI](https://arxiv.org/abs/2509.08395), Block-Max WAND, and Block-Max MaxScore — along with inverted-list compression, configurable quantization, and per-workload search-algorithm selection. mmap loading, serialization, and BM25 scoring are also optimized, cutting index storage and loading overhead for large-scale sparse vector and full-text search. In internal benchmarks, the compressed BM25 index is roughly 3x smaller than the 2.6 sparse index at comparable recall, and SINDI reaches up to about 10x the QPS of MaxScore on learned sparse embeddings. Once the new index version is enabled (see Compatibility and behavior notes), SINDI is the default for sparse IP search, and MaxScore is the default for BM25.

#### StructArray coverage

StructArray now supports null values, bitmap indexes, dynamic field addition on live collections, and partial update of struct fields through upsert, with REST and bulk-import coverage to match.

Element-level search adds hybrid search across vector sub-fields with configurable per-entity collapse (max / sum / avg / top-k variants), plus range search and group-by within it. Nested filtering covers `element_filter` predicates, the `MATCH_ANY` / `MATCH_ALL` / `MATCH_LEAST` / `MATCH_MOST` / `MATCH_EXACT` quantifiers, positional sub-field access such as `tags[0][name]`, and `array_length()` on the struct column.

For more information, refer to [StructArray](array-of-structs.md) and [StructArray Operators](struct-array-operators.md).

#### Search Aggregation and faceted search

Query Aggregation from the beta computes exact statistics over filtered data; 3.0.0 adds faceting on the search path. Specify a facet field at search time and Milvus returns the top facet values, each represented by its best-matching member in ANN ranking and annotated with aggregates such as COUNT and AVG — the faceted-search sidebar (brand, price range, attributes) in one request, instead of over-fetching and counting client-side.

### Function Chain reranking

Reranking is now composable through the Function Chain API, which executes an ordered, typed pipeline as part of a single search request. A chain can combine early L0 rescoring on QueryNode with L2 post-reduction reranking on Proxy, supporting score transformation and combination, model-based reranking, sorting, and candidate trimming without client-side orchestration. This release also adds native XGBoost scoring for L0 reranking using UBJ models registered as FileResources, along with Hugging Face Inference Providers for server-managed text embedding and sentence-similarity reranking.

#### TEXT long-text fields

TEXT fields make long text first-class, with storage-side length limits removed: they support `text_match`, `phrase_match`, and BM25. Values under 64 KB stay inline; larger values go to partition-level LOB files in Vortex format, with the column storing only `(file_id, offset)` references. LOB files are shared across segments, so compaction moves references instead of rewriting text. For RAG this means retrieving vectors and source text from the same store in one IO — no external blob store to operate.

#### FAISS index passthrough

A new `FAISS` index type accepts arbitrary Faiss index-factory strings through the `faiss_index_name` parameter — `IVF64,Flat`, `HNSW16,Flat`, `OPQ16,IVF64,PQ16x4` — with search parameters passed through, so Faiss recipes reproduce directly on Milvus.

#### Vortex and Lance format support

The storage layer gains two open columnar formats: Vortex as the next-generation internal format — adaptive encodings (dictionary, RLE, bit-packing, float-specific compression), zero-copy decompression, optimized for mixed vector + scalar workloads — and Lance alongside Parquet for open-ecosystem interchange. Vortex is set to become the default internal format, with filter pushdown and a local variant on the roadmap.

#### Woodpecker standalone deployment

Woodpecker, the WAL at the core of the streaming write path, can now be deployed as an independent service instead of embedded in other nodes — independent scaling, fault isolation, and observability, like any other microservice. This matters most for large clusters and high-write workloads.

### Core 3.0 features recall

The features below were introduced in [3.0-beta](https://milvus.io/docs/release_notes.md#v30-beta) and are part of 3.0.0; see the beta notes for the full write-ups.

- **External Collection** — query lakehouse data (Parquet, Lance, Iceberg, Vortex) in place: zero-copy, read-only, synced through incremental refresh.
- **Snapshot** — point-in-time read-only collection views by segment reference, with near-zero marginal storage.
- **Storage V3 (Loon)** — manifest-based columnar storage on object storage; the foundation for Snapshot and External Collection.
- **Query / Search ORDER BY** — server-side multi-field sorting with per-field ASC / DESC.
- **Query Aggregation** — COUNT / SUM / AVG / MIN / MAX with group-by, evaluated server-side.
- **EmbList + DiskANN** — on-disk multi-vector indexing for StructArray embedding lists, with acceleration paths such as Muvera and Lemur.
- **MinHash function (doc-in, doc-out)** — server-side MinHash signatures plus `MINHASH_LSH` for near-duplicate detection.
- **Nullable vectors** — NULL on all six vector types; search skips NULL rows, and AddField extends to vector fields.
- **Entity TTL** — per-row expiration driven by a TIMESTAMPTZ field.
- **FileResource** — cluster-managed dictionaries, synonym lists, and stop-word lists for analyzers, BM25, and Text Match.
- **Force Merge** — operator-triggered segment compaction, in synchronous or asynchronous mode.

### Compatibility and behavior notes

- **Storage V3 (Loon) is disabled by default.** Features that depend on it — such as Snapshot and TEXT fields — require enabling it manually via `common.storage.useLoonFFI`. Storage V3 will be enabled by default in a later release.
- **2.6 → 3.0 compatibility and rollback are guaranteed** — a 3.0 deployment can be rolled back to 2.6. However, once you enable or use features that change the serialized data format (for example Storage V3), rollback is no longer possible.
- **New index versions are opt-in for now.** Newly introduced index algorithms require manually raising the target index version (`dataCoord.targetVecIndexVersion` to 10, `dataCoord.targetScalarIndexVersion` to 4) before they take effect; a later release will enable them by default.
- **GPU images move to CUDA 12.9** and no longer preserve Ubuntu 20.04 GPU compatibility.

## v3.0-beta

Release date: May 9, 2026

| Milvus Version | Python SDK Version | Node.js SDK Version |
| -------------- | ------------------ | ------------------- |
| 3.0-beta       | 3.0.0              | 3.0.0               |

Milvus 3.0-beta extends the Milvus vector database with new integration into the open lake ecosystem: External Collection lets Milvus query external lake tables zero-copy, and Spark can read Milvus collections directly through Snapshot. The release also brings richer retrieval, more expressive schema, deeper text search customization, finer data and model lifecycle controls, and more operator-side controls. Milvus 3.0 is the core kernel of Zilliz Lakebase, powering its unified serving, discovery, and batch.


### Key Features

#### External Collection

In typical AI data pipelines, terabytes of embeddings and metadata already sit on object storage as Parquet, Lance, or Iceberg tables. Copying that data into Milvus doubles storage cost, adds an ETL pipeline that has to be kept in sync, and shifts data governance away from the customer.

External Collection removes the copy. A Milvus Collection can reference files where they already live, and Milvus manages only the schema, indexes, and query execution. An incremental refresh keeps the Collection aligned with the underlying files. Customers whose data cannot leave the lake, such as finance and healthcare teams, can run vector retrieval against that data where it sits. A single lake-resident dataset can also be served from multiple Milvus instances at once.

For more information, refer to [Create an External Collection](create-an-external-collection.md).

#### Snapshot

Serving and batch discovery often need the same Collection at the same time. A/B model evaluation, large-scale deduplication, backfill validation, and version rollback all need a stable view of the Collection while writes are still going in.

Snapshot creates a point-in-time, read-only view of a Collection by referencing existing segments instead of copying data, so the marginal storage cost is close to zero. Batch jobs can read from the Snapshot under MVCC-style isolation while the live Collection keeps accepting writes.

For more information, refer to [Snapshots](snapshots.md), [Manage Snapshots](manage-snapshots.md), and [Snapshot Use Cases](snapshot-use-cases.md).

#### Query / Search Order By

Search and Query now accept multi-field ordering, with the sort pushed down into the Milvus kernel and `ASC` / `DESC` settable per field. This closes a common production gap: Top-K by distance alone often does not match the business need when the most similar item is not the cheapest, the most recent, or the most popular.

Applications no longer have to over-fetch results and re-sort on the client to express composite ranking.

For more information, refer to [Sort Search Results by Scalar Fields](single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x) and [Sort Query Results](get-and-scalar-query.md#Sort-Query-Results--Milvus-30x).

#### Query Aggregation

Producing tenant-distribution stats, field-completeness counts, or version-rollout progress from a Milvus Collection used to require pulling matching entities back to the client and aggregating them there. Milvus 3.0 pushes SQL-style scalar aggregation into the kernel. A query call accepts `group_by_fields` and aggregation expressions in `output_fields`, including `count(*)`, `count(<field>)`, `sum(<field>)`, `avg(<field>)`, `min(<field>)`, and `max(<field>)`. Aggregation is evaluated server-side after filtering.

For more information, refer to [Aggregate Query Results](get-and-scalar-query.md#Aggregate-Query-Results--Milvus-30x).

#### Null Vector

Embeddings are often produced asynchronously, so an entity can arrive before its vector does. Multimodal data has natural gaps too, such as a video without captions or a product without an image. Earlier versions had no good answer: applications either delayed the write until the vector was ready or filled in a placeholder vector, and both choices hurt retrieval quality.

Milvus 3.0 supports NULL on vector fields across all six vector types. Search skips NULL vectors automatically, retrieval quality is unaffected, and NULL vectors take effectively no storage. `AddField` also extends to vector fields under this change: with `nullable=True`, an existing Collection can grow new vector fields online without a rebuild.

For more information, refer to [Nullable Fields](nullable-and-default.md).

#### Custom Dictionary & Synonym Dictionary

Out-of-the-box tokenizers do not always meet production search quality requirements. Chinese, vertical domains such as medicine, law, and chemistry, and multilingual corpora can benefit substantially from custom dictionaries and synonym tables. Until now, these resources mostly lived as application-side query rewrites.

Milvus 3.0 adds a FileResource mechanism for registering custom tokenizer dictionaries, synonym lists, stop-word lists, and decompounder rules. Once registered, a resource can be referenced from any tokenizer or filter and takes effect on BM25, analyzers, and Text Match. Dictionaries and synonyms can now be versioned and managed centrally instead of scattered across application code.

For more information, refer to [Manage File Resources](manage-file-resources.md).

#### Entity TTL

Collection-level and partition-level TTL are too coarse for many lifecycle and compliance scenarios. Different tenants inside the same Collection often have different retention rules, and individual entities may need to expire on a schedule that does not match the rest of the Collection.

Milvus 3.0 supports per-entity TTL. Declare a `TIMESTAMPTZ` field in the schema, mark it as the TTL field through a Collection property, and Milvus reclaims expired entities automatically. This covers right-to-be-forgotten requests, expiring session data, and bounded conversation history without application-side cleanup.

For more information, refer to [Set Entity-level TTL](set-collection-ttl.md#Set-entity-level-TTL--Milvus-30x).

#### MinHash DIDO (Doc-in, Doc-out)

Milvus 2.6 added the `MINHASH_LSH` index for set-based near-duplicate detection, but applications still had to compute MinHash signatures before writing data into Milvus.

Milvus 3.0 adds a server-side MinHash function. Declare a `VARCHAR` input field and a `BINARY_VECTOR` output field in the schema, attach a `FunctionType.MINHASH` function, and Milvus computes the signatures during insert, bulk insert, and search. Together with `MINHASH_LSH`, this supports deduplication workflows for large datasets, fingerprinting, and plagiarism detection inside Milvus.

For more information, refer to [MinHash Function](minhash-function.md).

#### EmbList + DISKANN

The "one entity = one vector" assumption no longer fits modern retrieval. Long documents get split into many chunks, late-interaction models such as ColBERT emit one vector per token, and multimodal entities can carry several views.

EmbList stores a variable-length vector list per entity, with `DISKANN` as the on-disk index. The disk path keeps RAM usage under control when the corpus exceeds memory budgets. EmbList + `DISKANN` is the first variant of the broader StructList family in this RC. The rest of the family, including StructList filtering and Muvera / Lemur multi-vector acceleration, is targeted for the official 3.0 release.

For more information, refer to [Search with Embedding Lists](search-with-embedding-lists.md).

#### Force Merge

Production workloads accumulate segment fragmentation over time, which causes query-latency jitter and inflated storage.

Milvus 3.0 adds the ability to trigger segment compaction explicitly during off-peak windows, in both synchronous and asynchronous modes.

For more information, refer to [Force Merge Compaction](force-merge.md).

#### Storage V3

Milvus 3.0 introduces Storage V3, a manifest-based columnar storage engine where data and metadata live on S3-compatible object storage. Each dataset version is captured as an immutable manifest snapshot, an Avro-encoded file that records which column groups, delta logs, and statistics comprise the dataset.

Manifests are compact Avro files, and delta logs record entity-level deletes without rewriting data files. This keeps metadata overhead small as datasets grow. The manifest also decouples metadata tracking from the query path, allowing a Collection to manage more segments without degrading query performance.

Because states are stored on object storage, the dataset is self-descriptive: any reader with access to the storage path can discover and interpret it without a central catalog. This property underpins External Collection, Snapshot, and future lake integrations.
