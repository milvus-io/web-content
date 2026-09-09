---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---

# Release Notes

Find out what's new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. We suggest that you regularly visit this page to learn about updates.

## v3.0.1

Release date: September 9, 2026

| Milvus Version | Python SDK Version | Node.js SDK Version | Java SDK Version | Go SDK Version |
| -------------- | ------------------ | ------------------- | ---------------- | -------------- |
| 3.0.1          | 3.0.1              | 3.0.5               | 3.0.9            | 3.0.1          |

We are excited to announce the release of Milvus v3.0.1! This release adds REST v2 snapshot management, expanded reranking capabilities, and TEXT field support in the Go client and RESTful API, alongside performance improvements and fixes for Storage V3, data consistency, and security.

### Features improvements

- Added REST v2 APIs for collection-scoped native snapshot management and asynchronous restoration ([#52118](https://github.com/milvus-io/milvus/pull/52118), [#52172](https://github.com/milvus-io/milvus/pull/52172))
- Added a configurable result-count threshold to control Take output path selection for search and query operations ([#52437](https://github.com/milvus-io/milvus/pull/52437))
- Added TEXT field support to the Go client and RESTful API ([#52450](https://github.com/milvus-io/milvus/pull/52450))
- Added configurable initial and maximum read IOPS rates for External Tables ([#52503](https://github.com/milvus-io/milvus/pull/52503))
- Added an opt-in setting for external collection refresh jobs to wait until all segments are indexed before reporting completion, without delaying data publication ([#52712](https://github.com/milvus-io/milvus/pull/52712))
- Added L1 reranking support to search function chains ([#52745](https://github.com/milvus-io/milvus/pull/52745))
- Added weighted RRF reranking with optional per-ANN-request weights across FunctionScore, REST, legacy hybrid search, and the Go client ([#52891](https://github.com/milvus-io/milvus/pull/52891), [#52926](https://github.com/milvus-io/milvus/pull/52926))

### Stability improvements

- Improved memory safety in geometry RTree indexes and caches, and handling of unparseable WKB and empty-geometry queries ([#51312](https://github.com/milvus-io/milvus/pull/51312))
- Improved memory management by restoring process-wide transient-memory budgeting and correcting memory estimates for concurrent Storage V2/V3 field loading and scalar V3 index loading ([#51405](https://github.com/milvus-io/milvus/pull/51405))
- Reduced download bottlenecks and memory usage during external-collection index builds by parallelizing reads and streaming raw vector data to disk ([#51651](https://github.com/milvus-io/milvus/pull/51651))
- Improved Woodpecker throughput for small-batch, high-concurrency workloads by batching client appends and exposing synchronization settings ([#51810](https://github.com/milvus-io/milvus/pull/51810))
- Improved record-reader ownership and lifetime consistency, empty-blob handling, and read-error reporting across storage and compaction paths ([#51891](https://github.com/milvus-io/milvus/pull/51891))
- Improved grouping hash-probe efficiency with a four-way interleaved pipeline and safeguards for collisions and rehash boundaries ([#51977](https://github.com/milvus-io/milvus/pull/51977))
- Reduced insert processing overhead by skipping WAL insert-body parsing for collections without BM25 or MinHash output fields ([#51986](https://github.com/milvus-io/milvus/pull/51986))
- Improved storage failure reporting and retry handling by preserving transient and permanent error classifications across execution layers ([#51990](https://github.com/milvus-io/milvus/pull/51990))
- Improved spatial query performance by enabling GIS coarse/refine splitting and same-column predicate fusion by default ([#52008](https://github.com/milvus-io/milvus/pull/52008))
- Improved text-indexing and JSON-shredding task scheduling with shared backlog-based admission control and alternating submission priority ([#52010](https://github.com/milvus-io/milvus/pull/52010))
- Added mmap support for sealed segment offset mappings, with dedicated loading options and disk resource accounting ([#52035](https://github.com/milvus-io/milvus/pull/52035))
- Optimized Storage V2 data loading by running per-column chunk memory estimation on demand ([#52037](https://github.com/milvus-io/milvus/pull/52037))
- Added server-side AutoIndex support for indexes bound to new function output fields, allowing add_function_field requests to omit index parameters or specify AUTOINDEX ([#52109](https://github.com/milvus-io/milvus/pull/52109))
- Reduced QueryNode distribution report payloads through incremental reporting with full-report fallback, and reduced memory allocations during metrics collection ([#52111](https://github.com/milvus-io/milvus/pull/52111), [#52119](https://github.com/milvus-io/milvus/pull/52119))
- Improved password hashing strength by increasing the bcrypt cost from 4 to 10, with credential rotation required to upgrade existing hashes ([#52145](https://github.com/milvus-io/milvus/pull/52145))
- Reduced redundant decoding during Parquet imports by reading only the required leaf columns for struct array subfields ([#52224](https://github.com/milvus-io/milvus/pull/52224))
- Improved force-merge grouping with multi-round size-based planning and deprecated the legacy planning threshold setting ([#52242](https://github.com/milvus-io/milvus/pull/52242))
- Upgraded cgosymbolizer to prevent Milvus processes running as PID 1 from hanging after native faults ([#52299](https://github.com/milvus-io/milvus/pull/52299))
- Improved row-count validation for semantic highlighting inputs ([#52409](https://github.com/milvus-io/milvus/pull/52409))
- Improved import retry control with configurable backoff for write retries ([#52414](https://github.com/milvus-io/milvus/pull/52414), [#52415](https://github.com/milvus-io/milvus/pull/52415), [#52427](https://github.com/milvus-io/milvus/pull/52427))
- Improved analysis task lifecycle management by reclaiming stale statistics versions and persisting terminal states ([#52416](https://github.com/milvus-io/milvus/pull/52416), [#52417](https://github.com/milvus-io/milvus/pull/52417))
- Improved segment lifecycle coordination by waiting for segment release after lock timeouts ([#52422](https://github.com/milvus-io/milvus/pull/52422))
- Improved storage sorting for data compaction with a k-way merge ([#52429](https://github.com/milvus-io/milvus/pull/52429))
- Reduced nullable-field validity buffer expansion by preserving packed masks across chunk access, expression evaluation, and JSON statistics ([#52451](https://github.com/milvus-io/milvus/pull/52451))
- Improved protection of sensitive credentials, API keys, RBAC password hashes, and external collection source details by preventing their exposure in logs or error messages ([#52487](https://github.com/milvus-io/milvus/pull/52487), [#52664](https://github.com/milvus-io/milvus/pull/52664), [#52710](https://github.com/milvus-io/milvus/pull/52710))
- Improved partial-update concurrency control with optimistic CAS validation and safe retries for eligible conflicts ([#52495](https://github.com/milvus-io/milvus/pull/52495))
- Improved growing segment read snapshot stability and schema snapshot lifetime management ([#52572](https://github.com/milvus-io/milvus/pull/52572))
- Reduced redundant scans of authorization metadata during backups ([#52612](https://github.com/milvus-io/milvus/pull/52612))
- Improved nullable vector ID mapping by moving it into the index layer, unifying logical ID handling and supporting mmap-backed mappings for sealed indexes ([#52657](https://github.com/milvus-io/milvus/pull/52657))
- Improved synchronization between Sonic JIT compilation and Go plugin loading in CPU and GPU builds ([#52738](https://github.com/milvus-io/milvus/pull/52738))
- Improved Proxy write-path channel resolution through the metadata cache, eliminating redundant coordinator RPCs and improving error classification ([#52739](https://github.com/milvus-io/milvus/pull/52739))
- Reduced recall calculation time from approximately 3.08 seconds to 18.5 milliseconds at topk=100000 in the reported benchmark ([#52763](https://github.com/milvus-io/milvus/pull/52763))
- Optimized nullable-field filtering by reusing validity bitmaps, reducing redundant null-offset storage, and accelerating bitset copies ([#52801](https://github.com/milvus-io/milvus/pull/52801), [#52823](https://github.com/milvus-io/milvus/pull/52823), [#52825](https://github.com/milvus-io/milvus/pull/52825))
- Improved hybrid scalar indexes on nested struct subfields by using STL_SORT when distinct element counts reach the bitmap cardinality limit ([#52849](https://github.com/milvus-io/milvus/pull/52849))
- Improved the efficiency of segment ID filtering in the metadata cache ([#52855](https://github.com/milvus-io/milvus/pull/52855))
- Reduced memory allocations in hash helper functions ([#52857](https://github.com/milvus-io/milvus/pull/52857))
- Optimized sorting of merged rerank results by eliminating per-comparison map lookups ([#52885](https://github.com/milvus-io/milvus/pull/52885))
- Improved memory safety when handling JSON default values and non-NUL-terminated string views ([#52906](https://github.com/milvus-io/milvus/pull/52906))
- Improved C++ build times with scoped unity compilation, improved compiler caching, and reduced redundant compilation work ([#52995](https://github.com/milvus-io/milvus/pull/52995))
- Improved filesystem metrics coverage and freshness by collecting metrics from cached filesystems at scrape time while preserving existing metric names and labels ([#53026](https://github.com/milvus-io/milvus/pull/53026))
- Added a refreshable growingBuildThreadRate setting to configure threads per growing segment interim index build while retaining the single-threaded default ([#53033](https://github.com/milvus-io/milvus/pull/53033))
- Added mmap field-data writeback support to 3.0 through a backport, with the disabled-by-default queryNode.mmap.writeback option ([#53079](https://github.com/milvus-io/milvus/pull/53079))

### Bug fixes

- Fixed incorrect results and inconsistent predicate validation in JSON, ARRAY, and TIMESTAMPTZ queries, including mixed-type predicates, large-number comparisons, and filtering across multiple batches ([#51775](https://github.com/milvus-io/milvus/pull/51775))
- Fixed inconsistent refreshed data during parallel external collection refreshes when a segment's source files spanned multiple tasks ([#51893](https://github.com/milvus-io/milvus/pull/51893))
- Fixed MATCH expressions accepting predicates that did not operate at the element level ([#51940](https://github.com/milvus-io/milvus/pull/51940))
- Fixed searches with no matches failing with an unsupported ID type error ([#51999](https://github.com/milvus-io/milvus/pull/51999))
- Fixed standalone Milvus hanging during shutdown by adding a configurable migration timeout with a 10-second default ([#52027](https://github.com/milvus-io/milvus/pull/52027))
- Fixed external-table embedding requests using the wrong cluster identity when DataNode workers were shared across serving clusters ([#52042](https://github.com/milvus-io/milvus/pull/52042))
- Fixed an issue that prevented updating integration_id and model_deployment_id for TextEmbedding functions ([#52081](https://github.com/milvus-io/milvus/pull/52081))
- Fixed HTTP JSON responses omitting the explicit ok=false status for failed backfill segments ([#52082](https://github.com/milvus-io/milvus/pull/52082))
- Fixed MinIO object uploads failing with HTTP 400 XAmzContentChecksumMismatch when retried after transport or low-speed timeouts ([#52128](https://github.com/milvus-io/milvus/pull/52128), [#52194](https://github.com/milvus-io/milvus/pull/52194))
- Fixed segment balancing between QueryNodes stalling when Streaming Service was enabled ([#52147](https://github.com/milvus-io/milvus/pull/52147), [#52169](https://github.com/milvus-io/milvus/pull/52169))
- Fixed silent data loss during mix compaction when retained records could not be rebuilt ([#52200](https://github.com/milvus-io/milvus/pull/52200))
- Fixed snapshot restores losing collection settings and unexpectedly defaulting to Strong consistency ([#52206](https://github.com/milvus-io/milvus/pull/52206))
- Fixed streaming deletes missing newly loaded sealed segments, allowing deleted data to remain queryable ([#52218](https://github.com/milvus-io/milvus/pull/52218))
- Fixed nested indexes not being built correctly for empty data ([#52247](https://github.com/milvus-io/milvus/pull/52247))
- Fixed deadlocks when switching to the streaming service that left operations waiting indefinitely ([#52292](https://github.com/milvus-io/milvus/pull/52292))
- Fixed incorrect geometry default values during compaction and record rebuilds, and incorrect null markings for default-filled geometry values in Parquet imports ([#52350](https://github.com/milvus-io/milvus/pull/52350))
- Fixed valid V3 segments being rejected during compaction and recovery after a DataCoord restart ([#52383](https://github.com/milvus-io/milvus/pull/52383), [#52389](https://github.com/milvus-io/milvus/pull/52389), [#52390](https://github.com/milvus-io/milvus/pull/52390), [#52391](https://github.com/milvus-io/milvus/pull/52391), [#52392](https://github.com/milvus-io/milvus/pull/52392), [#52393](https://github.com/milvus-io/milvus/pull/52393))
- Fixed segment loading failures with a missing version metadata error when using hybrid scalar indexes on VARCHAR array sub-fields in structs ([#52385](https://github.com/milvus-io/milvus/pull/52385))
- Fixed external columns failing to refresh when an updated manifest was reopened ([#52397](https://github.com/milvus-io/milvus/pull/52397))
- Fixed incorrect timezone handling in searches with time-dependent conditions ([#52407](https://github.com/milvus-io/milvus/pull/52407))
- Fixed incorrect handling of ArrayOfVector inputs in search requests ([#52408](https://github.com/milvus-io/milvus/pull/52408))
- Fixed inserts failing to reject rows exceeding the supported size limit ([#52426](https://github.com/milvus-io/milvus/pull/52426))
- Fixed interim indexes ignoring the configured target index version ([#52449](https://github.com/milvus-io/milvus/pull/52449))
- Fixed queries using order_by failing to return dense vector output fields ([#52504](https://github.com/milvus-io/milvus/pull/52504), [#52606](https://github.com/milvus-io/milvus/pull/52606))
- Fixed revoked privileges remaining effective after being removed from a privilege group ([#52554](https://github.com/milvus-io/milvus/pull/52554))
- Fixed incorrect binlog file counts and storage format labels for Storage V3 segments after DataCoord restarts ([#52571](https://github.com/milvus-io/milvus/pull/52571), [#52578](https://github.com/milvus-io/milvus/pull/52578))
- Fixed external snapshot restores stalling due to unreliable worker version checks or repeatedly retrying unsupported workers until timeout ([#52639](https://github.com/milvus-io/milvus/pull/52639))
- Fixed segment loading failures for HYBRID indexes on struct-array subfields with legacy STLSORT files from 3.0.0, without requiring reindexing ([#52643](https://github.com/milvus-io/milvus/pull/52643))
- Fixed crashes when processing zero-length Arrow C Data buffers ([#52652](https://github.com/milvus-io/milvus/pull/52652))
- Fixed incorrect failure handling when loading or reopening Storage V3 segments after manifest errors, preserving existing segment state for safe retries ([#52678](https://github.com/milvus-io/milvus/pull/52678))
- Fixed query failures when ARRAY element filters encountered full batches of NULL or empty arrays before later elements ([#52720](https://github.com/milvus-io/milvus/pull/52720))
- Fixed backfill jobs committing stale embeddings after the collection schema changed ([#52789](https://github.com/milvus-io/milvus/pull/52789))
- Fixed absent fields in Storage V3 records being returned as NULL instead of their declared default values ([#52790](https://github.com/milvus-io/milvus/pull/52790), [#52807](https://github.com/milvus-io/milvus/pull/52807), [#52888](https://github.com/milvus-io/milvus/pull/52888))
- Fixed server-side copy failures that prevented Storage V3 snapshot restores on GCS with IAM/OAuth credentials, including copies of objects larger than 5 GiB ([#52792](https://github.com/milvus-io/milvus/pull/52792))
- Fixed unauthenticated access through streaming gRPC calls on the external proxy port ([#52854](https://github.com/milvus-io/milvus/pull/52854))
- Fixed data losing its original commit timestamps after clustering compaction ([#52859](https://github.com/milvus-io/milvus/pull/52859))
- Fixed streaming node crashes caused by repeated flush failures after adding a TEXT field to collections with existing Storage V2 segments ([#52897](https://github.com/milvus-io/milvus/pull/52897))
- Fixed expired rows in Storage V3 segments failing to trigger TTL-field-based compaction and remaining stored until another compaction condition was met ([#52931](https://github.com/milvus-io/milvus/pull/52931))
- Fixed inconsistent auto-generated primary keys between source and target collections during CDC-replicated imports ([#52941](https://github.com/milvus-io/milvus/pull/52941))
- Fixed concurrent writes being lost during WAL backend migration ([#52947](https://github.com/milvus-io/milvus/pull/52947), [#52951](https://github.com/milvus-io/milvus/pull/52951), [#52955](https://github.com/milvus-io/milvus/pull/52955))
- Fixed rebuilt or compacted nested HYBRID indexes with high-cardinality data becoming unreadable after rollback to an older version ([#52959](https://github.com/milvus-io/milvus/pull/52959))
- Fixed handling of null elements in external dense vector rows by accepting all-null nullable rows and adding configurable handling of partially null rows ([#52968](https://github.com/milvus-io/milvus/pull/52968))
- Fixed incorrect V3 segment row counts and repeated sort compaction failures following streaming node failover ([#52970](https://github.com/milvus-io/milvus/pull/52970))
- Fixed queries combining range conditions with OR omitting records at an inclusive lower bound ([#52998](https://github.com/milvus-io/milvus/pull/52998))
- Fixed searches by primary key failing to preserve the requested ID order ([#52999](https://github.com/milvus-io/milvus/pull/52999))
- Fixed an issue where adding a TEXT field after enabling Storage V3 prevented existing Storage V2 growing segments from loading, disrupting flush, sort, and index operations ([#53002](https://github.com/milvus-io/milvus/pull/53002))
- Fixed snapshots including uncommitted Storage V3 segments, causing restores to report success while restored segments could not be loaded ([#53022](https://github.com/milvus-io/milvus/pull/53022), [#53039](https://github.com/milvus-io/milvus/pull/53039))
- Fixed Storage V3 text indexes failing to load when their files were stored in nested task or version directories ([#53062](https://github.com/milvus-io/milvus/pull/53062))

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

#### Function Chain reranking

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
