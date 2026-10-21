---
id: roadmap.md
title: Milvus Roadmap
related_key: Milvus roadmap
summary: Explore the Milvus roadmap for search, analytics, schema evolution, lake integration, and performance across the 3.0 and 3.1 releases.
---

# Milvus Roadmap

Milvus 3.0 brings together multi-vector retrieval, SQL-style querying, flexible schemas, and access to data in lake storage. The next stages build on that foundation with richer queries, broader data models, and improvements to performance and scale. This roadmap outlines those priorities for open-source Milvus.

Milvus 3.0 is generally available starting with **v3.0.1**. The released capabilities below were introduced in **v3.0.0**; preview features and opt-in capabilities are identified where they appear. The **3.0.x** series extends these capabilities, while **3.1 targets December 2026**. Planned features and target dates may change as development progresses.

## Search and retrieval

The retrieval roadmap focuses on combining more relevance signals within Milvus, from text matching and multi-vector representations to reranking and search-result facets.

**Available in 3.0**

- **Multi-vector retrieval:** StructArray search supports Muvera and Lemur, with `element_filter` for element-level filtering. Match policies include `MATCH_ANY`, `MATCH_ALL`, `MATCH_LEAST`, `MATCH_MOST`, and `MATCH_EXACT`.
- **Text matching and similarity:** Custom dictionaries and synonyms adapt text retrieval to application needs. Regex filtering supports pattern matching, and MinHash supports near-duplicate detection.
- **Reranking and inference:** Milvus 3.0 introduces an initial set of Function Chain reranking capabilities, along with the Hugging Face Inference Provider. The remaining Function Chain capabilities are planned for 3.0.x.
- **Search aggregation:** Search aggregation provides facets over search results.

**Planned for 3.0.x**

The 3.0.x series is planned to add fuzzy matching and global statistics, and complete Function Chain support.

**Planned for 3.1**

Plans include Grep-based retrieval, tighter integration of approximate nearest neighbor (ANN) search and filtering through ANN-filter fusion, and improvements to sparse retrieval.

## Analytics and SQL-style querying

Milvus is extending its query engine so applications can sort and aggregate data alongside retrieval. The next stage adds joins, materialized views, and custom computation.

**Available in 3.0**

Query and search support sorting with `ORDER BY`. Query Aggregation adds `GROUP BY` for computing grouped statistics.

**Planned for 3.1**

- **Richer queries:** Introduce joins, starting with semi-joins, and Materialized View Collections.
- **Data updates and integrity:** Support in-place updates and primary-key deduplication during ingestion.
- **Query iteration and JSON semantics:** Add a stateful query iterator, JSON `GROUP BY`, and SQL / JSON NULL semantics.
- **Custom computation:** Support Python user-defined functions (UDFs).

## Flexible schema and data types

Schema work focuses on evolving existing collections and representing a wider range of data. It covers field changes, multi-vector structures, long text, and entity expiration.

**Available in 3.0**

- **Online schema changes:** Existing collections support online field addition, including vector and `Array<Struct>` fields. Dropping fields is available in **preview** and may have limitations.
- **Backfill for existing data:** External backfill uses the Spark Connector. Internal backfill attaches a BM25 or MinHash function to a collection and computes its output over existing data.
- **Text and multi-vector data:** The `TEXT` type stores long text, while StructArray supports late-interaction retrieval through `MAX_SIM`. `TEXT` requires opt-in Storage V3.
- **NULL values and expiration:** Vector fields accept NULL values, and entity-level time to live (TTL) controls expiration.

**Planned for 3.0.x**

Planned schema enhancements expand StructArray support for types, NULL values, and field addition and removal. They also add molecular formula support and `IS NULL` / `IS NOT NULL` filters for vector fields.

**Planned for 3.1**

The next data-model extensions include nested JSON and Struct, composite primary keys, collections without vector fields, and sparse vectors in StructList.

## Lake integration and data versioning

Milvus is developing closer integration with lake storage and batch processing. External collections provide access to data where it resides, while snapshots provide a foundation for data versioning.

**Available in 3.0**

- **External data access:** External Collection supports Lance, Parquet, and Iceberg data.
- **Snapshots and batch integration:** Snapshot captures a version of collection data, and the Spark Connector supports batch workflows.
- **Storage foundation:** Storage V3 (Loon) provides opt-in Vortex and Lance support. It is disabled by default and is enabled through `common.storage.useLoonFFI`. Both Snapshot and `TEXT` depend on it.

**Planned for 3.0.x**

Planned enhancements allow a Milvus collection snapshot to serve as an external collection. External-table support also expands to JSON shredding, function-field addition, and field removal.

**Planned for 3.1**

Plans include S3-based sparse and scalar indexes, along with deletion through import.

## Performance, indexing, and scale

The performance roadmap covers retrieval indexes, query execution, and cluster growth. It also addresses recovery and queries that must read data from object storage.

**Available in 3.0**

- **Sparse indexing:** The sparse index overhaul introduces SINDI.
- **Index choice:** The `FAISS` passthrough index accepts Faiss index-factory strings, with options including SVS, Panorama, PQ, IVFPQ, and ScaNN. DiskANN indexing is also available for embedding lists (EmbList).
- **Compaction:** Force Merge provides explicit control over segment merging.

**Planned for 3.1**

- **Storage-aware queries:** Add predicate pushdown for Vortex, including page-level pruning and skip indexes.
- **Cluster growth and tenancy:** Support shard splitting, custom sharding keys, and multi-tenancy optimizations.
- **Query execution and indexing:** Develop QueryView, improve support for wide collections, stream result reduction, and support multiple indexes.
- **Write reliability:** Support idempotent writes.
- **Object-storage caching:** Use Talon as an S3 cache to improve failure recovery and cold-query performance.

## Beyond 3.1

Longer-term work includes time-travel and snapshot rollback. Their scope and release timing remain to be confirmed.

## Help shape the roadmap

Share the workloads, limitations, and feature requests that matter to your applications in [GitHub Discussions](https://github.com/milvus-io/milvus/discussions). Report bugs through [GitHub Issues](https://github.com/milvus-io/milvus/issues).

To contribute code or documentation, start with the [Contributor's Guide](https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md).
