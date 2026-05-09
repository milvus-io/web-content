---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---

# Release Notes

Find out what's new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. We suggest that you regularly visit this page to learn about updates.

## v3.0-beta

Release date: May 9, 2026

| Milvus Version | Python SDK Version | Node.js SDK Version |
| -------------- | ------------------ | ------------------- |
| 3.0-beta       | 3.0.0              | 3.0.0               |

Milvus v3.0-beta starts Milvus's shift from a vector database to a semantic-native lake engine. The Milvus kernel can now operate directly on data in open lake formats, and core Milvus capabilities have been extended across retrieval, schema, lifecycle, language, and operations.

External Collection and Snapshot are the headline additions on the lake side. The same kernel also powers Zilliz Lakebase, a semantic-native data platform built on Milvus 3.0.

### Key Features

#### External Collection

In typical AI data pipelines, terabytes of embeddings and metadata already sit on object storage as Parquet, Lance, or Iceberg tables. Copying that data into Milvus doubles storage cost, adds an ETL pipeline that has to be kept in sync, and shifts data governance away from the customer.

External Collection removes the copy. A Milvus Collection can reference files where they already live, and Milvus manages only the schema, indexes, and query execution. An incremental refresh keeps the Collection aligned with the underlying files. Customers whose data cannot leave the lake, such as finance and healthcare teams, can run vector retrieval against that data where it sits. A single lake-resident dataset can also be served from multiple Milvus instances at once.

For more information, refer to [Create an External Collection](create-an-external-collection.md).

#### Snapshot

Serving and batch discovery often need the same Collection at the same time. A/B model evaluation, large-scale deduplication, backfill validation, and version rollback all need a stable view of the Collection while writes are still going in.

Snapshot creates a point-in-time, read-only view of a Collection by referencing existing segments instead of copying data, so the marginal storage cost is close to zero. Batch jobs can read from the Snapshot under MVCC-style isolation while the live Collection keeps accepting writes.

For more information, refer to [Snapshots](snapshots.md), [Manage Snapshots](manage-snapshots.md), and [Snapshot Use Cases](snapshot-use-cases.md).

#### External Backfill

Upgrading an embedding model, such as moving from v1 embeddings to v2 embeddings on an existing Collection, used to mean rebuilding from scratch. That forced either service downtime or dual-write logic on the application side.

Milvus 3.0 supports the upgrade as a hot workflow. You can add a new vector field with `AddCollectionField`, use Snapshot to freeze a consistent starting point, run the embedding job offline against the Snapshot, and write the values back through normal ingestion paths. After the new field is indexed online, the application can switch over with no downtime.

#### Query / Search Order By

Search and Query now accept multi-field ordering, with the sort pushed down into the Milvus kernel and `ASC` / `DESC` settable per field. This closes a common production gap: Top-K by distance alone often does not match the business need when the most similar item is not the cheapest, the most recent, or the most popular.

Applications no longer have to over-fetch results and re-sort on the client to express composite ranking.

For more information, refer to [Sort Search Results by Scalar Fields](single-vector-search.md#Sort-Search-Results-by-Scalar-Fields--Milvus-30x) and [Sort Query Results](get-and-scalar-query.md#Sort-Query-Results--Milvus-30x).

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
