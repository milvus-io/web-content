---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---

# Release Notes

Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.6.0 in this section. We suggest that you regularly visit this page to learn about updates.

## v2.6.4

Release date: October 21, 2025

| Milvus Version | Python SDK Version | Node.js SDK Version | Java SDK Version | Go SDK Version |
|:-------------- |:------------------|:--------------------|:-----------------|:---------------|
| 2.6.4          | 2.6.2             | 2.6.1               | 2.6.6            | 2.6.1          |

We are excited to announce the release of Milvus 2.6.4, featuring a range of powerful new capabilities, performance enhancements, and essential bug fixes. This update introduces important features such as Struct in ARRAY for advanced data modeling. Additionally, we have enabled JSON Shredding by default, further improving query performance and efficiency. Several critical bugs have also been addressed to ensure greater stability and reliability. With this release, Milvus continues to provide a more robust and efficient experience for all users. Below are the key highlights of this release.

### Features

- Struct in ARRAY:  Milvus introduced the new data type, Struct, allowing users to organize and manage multiple related fields within a single entity. Currently, Struct can only be used as an element under DataType.ARRAY, enabling features like Array of Vector, where each row contains multiple vectors, opening up new possibilities for complex data modeling and search. ([#42148](https://github.com/milvus-io/milvus/pull/42148))
- Supported Qwen GTE-rerank-v2 model in DashScope ([#44660](https://github.com/milvus-io/milvus/pull/44660))

### Improvements

- **Upgraded Go version to 1.24.6** with image builder ([#44763](https://github.com/milvus-io/milvus/pull/44763))
- Enabled default JSON Shredding ([#44811](https://github.com/milvus-io/milvus/pull/44811))
- Added disk quota for loaded binlog size to prevent query node load failures ([#44932](https://github.com/milvus-io/milvus/pull/44932))
- Enabled mmap support for struct array in MemVectorIndex ([#44832](https://github.com/milvus-io/milvus/pull/44832))
- Added caching layer management for TextMatchIndex ([#44768](https://github.com/milvus-io/milvus/pull/44768))
- Optimized bitmap reverse lookup performance  ([#44838](https://github.com/milvus-io/milvus/pull/44838))
- Updated Knowhere version ([#44707](https://github.com/milvus-io/milvus/pull/44707) [#44765](https://github.com/milvus-io/milvus/pull/44765))
- Removed logical usage checks during segment loading ([#44770](https://github.com/milvus-io/milvus/pull/44770))
- Added access log field for template value length information ([#44783](https://github.com/milvus-io/milvus/pull/44783))
- Allowed overwriting current index type during index build ([#44754](https://github.com/milvus-io/milvus/pull/44754))
- Added load parameters for vector index ([#44749](https://github.com/milvus-io/milvus/pull/44749))
- Unified compaction executor task state management ([#44722](https://github.com/milvus-io/milvus/pull/44722))
- Added refined logs for task scheduler in QueryCoord ([#44725](https://github.com/milvus-io/milvus/pull/44725))
- Ensured accesslog.$consistency_level represents actual value used  ([#44711](https://github.com/milvus-io/milvus/pull/44711))
- Removed redundant channel manager from datacoord ([#44679](https://github.com/milvus-io/milvus/pull/44679))

### Bug fixes

- Removed GCC from build Dockerfile to fix CVE ([#44882](https://github.com/milvus-io/milvus/pull/44882))
- Ensured deterministic search result ordering when scores are equal ([#44884](https://github.com/milvus-io/milvus/pull/44884))
- Reranked before requery if reranker didn't use field data ([#44943](https://github.com/milvus-io/milvus/pull/44943))
- Ensured promise fulfillment when CreateArrowFileSystem throws an exception ([#44976](https://github.com/milvus-io/milvus/pull/44976))
- Fixed missing disk encryption config ([#44839](https://github.com/milvus-io/milvus/pull/44839))
- Fixed deactivate balance checker causing balance stop issue ([#44836](https://github.com/milvus-io/milvus/pull/44836))
- Fixed issue where "not equal" doesn't include "none"  ([#44960](https://github.com/milvus-io/milvus/pull/44960))
- Supported JSON default value in CreateArrowScalarFromDefaultValue ([#44952](https://github.com/milvus-io/milvus/pull/44952))
- Used short debug string to avoid newlines in debug logs ([#44929](https://github.com/milvus-io/milvus/pull/44929))
- Fixed exists expression for JSON flat index ([#44951](https://github.com/milvus-io/milvus/pull/44951))
- Unified JSON exists path semantics ([#44926](https://github.com/milvus-io/milvus/pull/44926))
- Fixed panic caused by empty internal insert message ([#44906](https://github.com/milvus-io/milvus/pull/44906))
- Updated AI/SAQ parameters ([#44862](https://github.com/milvus-io/milvus/pull/44862))
- Removed limit on deduplication when autoindex is disabled ([#44824](https://github.com/milvus-io/milvus/pull/44824))
- Avoided concurrent reset/add operations on DataCoord metrics ([#44815](https://github.com/milvus-io/milvus/pull/44815))
- Fixed bug in JSON_contains(path, int) ([#44818](https://github.com/milvus-io/milvus/pull/44818))
- Avoided eviction in caching layer during JSON handling ([#44813](https://github.com/milvus-io/milvus/pull/44813))
- Fixed wrong results from the exp filter when skipped ([#44779](https://github.com/milvus-io/milvus/pull/44779))
- Checked if query node is SQN with label and streaming node list ([#44793](https://github.com/milvus-io/milvus/pull/44793))
- Fixed BM25 with boost returning unordered results ([#44759](https://github.com/milvus-io/milvus/pull/44759))
- Fixed bulk import with auto ID ([#44694](https://github.com/milvus-io/milvus/pull/44694))
- Passed file system via FileManagerContext when loading index ([#44734](https://github.com/milvus-io/milvus/pull/44734))
- Used "eventually" and fixed task ID appearing in both executing and completed states ([#44715](https://github.com/milvus-io/milvus/pull/44715))
- Removed incorrect start time tick to avoid filtering DMLs with timeticks less than it ([#44692](https://github.com/milvus-io/milvus/pull/44692))
- Made AWS credential provider a singleton ([#44705](https://github.com/milvus-io/milvus/pull/44705))
- Disabled shredding for JSON path containing digits ([#44808](https://github.com/milvus-io/milvus/pull/44808))
- Fixed valid unit test for TestUnaryRangeJsonNullable ([#44990](https://github.com/milvus-io/milvus/pull/44990))
- Fixed unit tests and removed file system fallback logic ([#44686](https://github.com/milvus-io/milvus/pull/44686))

## v2.6.3

Release date: October 11, 2025

| Milvus Version | Python SDK Version | Node.js SDK Version | Java SDK Version | Go SDK Version |
|:-------------- |:------------------|:--------------------|:-----------------|:---------------|
| 2.6.3          | 2.6.2             | 2.6.1               | 2.6.5            | 2.6.1          |

We are pleased to announce the release of Milvus 2.6.3, which introduces a variety of exciting new features, improvements, and critical bug fixes. This version enhances system performance, expands functionality, and fixes key issues, providing a more stable experience for all users. Below are the highlights of this release:

### New Features

- Primary Key with AutoID Enabled: Users can now write the primary key field when `autoid` is enabled. ([#44424](https://github.com/milvus-io/milvus/pull/44424) [#44530](https://github.com/milvus-io/milvus/pull/44530))
- Manual Compaction for L0 Segments: Added support for manually compacting L0 segments. ([#44440](https://github.com/milvus-io/milvus/pull/44440))
- Cluster ID Encoding in AutoID: Auto-generated IDs will now include the cluster ID. ([#44471](https://github.com/milvus-io/milvus/pull/44471))
- gRPC Tokenizer Support: Integration of gRPC tokenizer for enhanced query flexibility. ([#41994](https://github.com/milvus-io/milvus/pull/41994))

### Improvements

- Refined the balance checker by implementing a priority queue, improving task distribution. ([#43992](https://github.com/milvus-io/milvus/pull/43992))
- Preloaded BM25 stats for sealed segments and optimized serialization. ([#44279](https://github.com/milvus-io/milvus/pull/44279))
- Nullable fields can now be used as input for BM25 functions. ([#44586](https://github.com/milvus-io/milvus/pull/44586))
- Added support for Azure Blob Storage in Woodpecker. ([#44592](https://github.com/milvus-io/milvus/pull/44592))
- Purged small files right after Woodpecker segment compaction. ([#44473](https://github.com/milvus-io/milvus/pull/44473))
- Enabled random score functionality for boosting queries. ([#44214](https://github.com/milvus-io/milvus/pull/44214))
- New configuration options for the `int8` vector type in autoindexing. ([#44554](https://github.com/milvus-io/milvus/pull/44554))
- Added parameter items to control hybrid search requery policy. ([#44466](https://github.com/milvus-io/milvus/pull/44466))
- Added support for controlling the insertion of function output fields. ([#44162](https://github.com/milvus-io/milvus/pull/44162))
- The decay function now supports configurable score merging for better performance. ([#44066](https://github.com/milvus-io/milvus/pull/44066))
- Improved the performance of binary search on strings. ([#44469](https://github.com/milvus-io/milvus/pull/44469))
- Introduced support for sparse filters in queries.  ([#44347](https://github.com/milvus-io/milvus/pull/44347))
- Various updates to enhance tiered index functionality. ([#44433](https://github.com/milvus-io/milvus/pull/44433))
- Added storage resource usage tracking for scalar and vector searches. ([#44414](https://github.com/milvus-io/milvus/pull/44414) [#44308](https://github.com/milvus-io/milvus/pull/44308))
- Add storage usage for delete/upsert/restful ([#44512](https://github.com/milvus-io/milvus/pull/44512))
- Enabled granular flush targets for `flushall` operations. ([#44234](https://github.com/milvus-io/milvus/pull/44234))
- Datanodes will now use a non-singleton file system for better resource management. ([#44418](https://github.com/milvus-io/milvus/pull/44418))
- Added configuration options for batch processing in metadata.  ([#44645](https://github.com/milvus-io/milvus/pull/44645))
- Error messages now include the database name for better clarity. ([#44618](https://github.com/milvus-io/milvus/pull/44618))
- Moved tracer test to the `milvus-common` repository for better modularization. ([#44605](https://github.com/milvus-io/milvus/pull/44605))
- Moved C API unit test files aside to `src` directory for better organization. ([#44458](https://github.com/milvus-io/milvus/pull/44458))
- Go SDK now allows users to insert primary key data if `autoid` is enabled. ([#44561](https://github.com/milvus-io/milvus/pull/44561))

### Bug fixes

- Resolved CVE-2020-25576 and WS-2023-0223 vulnerabilities. ([#44163](https://github.com/milvus-io/milvus/pull/44163))
- Fixed an issue where logical resources were used for metrics in the quota center on streaming nodes. ([#44613](https://github.com/milvus-io/milvus/pull/44613))
- Set `mixcoord` in `activatefunc` when enabling standby. ([#44621](https://github.com/milvus-io/milvus/pull/44621))
- Removed redundant initialization of storage V2 components. [#44597](https://github.com/milvus-io/milvus/pull/44597))
- Fixed compaction task blocking due to executor loop exit. ([#44543](https://github.com/milvus-io/milvus/pull/44543))
- Refunded loaded resource usage in the `insert/deleterecord` destructor. ([#44555](https://github.com/milvus-io/milvus/pull/44555))
- Fixed an issue where the replicator could not stop and enhanced the replicate config validator. ([#44531](https://github.com/milvus-io/milvus/pull/44531))
- Set `mmap_file_raii_` to `nullptr` when mmap is disabled. ([#44516](https://github.com/milvus-io/milvus/pull/44516))
- Made `diskfilemanager` use the file system from the context. ([#44535](https://github.com/milvus-io/milvus/pull/44535))
- Forced virtual host for OSS and COS in storage V2. ([#44484](https://github.com/milvus-io/milvus/pull/44484))
- Set `report_value` default value when `extrainfo` is not `nil` for compatibility. ([#44529](https://github.com/milvus-io/milvus/pull/44529))
- Cleaned up collection metrics after dropping collections in rootcoord. ([#44511](https://github.com/milvus-io/milvus/pull/44511))
- Fixed segment loading failure due to duplicate field `mmap.enable` properties. ([#44465](https://github.com/milvus-io/milvus/pull/44465))
- Fixed load config parsing errors for dynamic replicas. ([#44430](https://github.com/milvus-io/milvus/pull/44430))
- Handled row-to-column input for dynamic columns in Go SDK. ([#44626](https://github.com/milvus-io/milvus/pull/44626))

## v2.6.2

Release date: September 19, 2025

| Milvus Version | Python SDK Version | Node.js SDK Version | Java SDK Version | Go SDK Version |
|:-------------- |:------------------|:--------------------|:-----------------|:---------------|
| 2.6.2          | 2.6.2             | 2.6.0               | 2.6.4            | 2.6.1          |

We’re excited to announce the release of Milvus 2.6.2! This update introduces powerful new features, significant performance enhancements, and critical fixes that make the system more stable and production-ready. Highlights include partial field updates with upsert, JSON Shredding to accelerate dynamic field filtering, NGram indexing for faster LIKE queries, and more flexible schema evolution on existing collections. Built on community feedback, this release delivers a stronger foundation for real-world deployments, and we encourage all users to upgrade to take advantage of these improvements.

### Features

- Added support for JSON Shredding to accelerate dynamic field filtering. For details, refer to [JSON Shredding](json-shredding.md).
- Added support for NGRAM Index to accelerate like operation. For details, refer to [NGRAM](ngram.md).
- Added support for partial field updates with upsert API. For details, refer to [Upsert Entities](upsert-entities.md).
- Added support for Boost Function. For details, refer to [Boost Ranker](boost-ranker.md).
- Added support for group by JSON fields and dynamic fields ([#43203](https://github.com/milvus-io/milvus/pull/43203))
- Added support for enabling dynamic schema on existing collections ([#44151](https://github.com/milvus-io/milvus/pull/44151))
- Added support for dropping indexes without releasing collections ([#42941](https://github.com/milvus-io/milvus/pull/42941))

### Improvements

- [StorageV2] Changed log file size to compressed size ([#44402](https://github.com/milvus-io/milvus/pull/44402))
- [StorageV2] Added child fields in load info ([#44384](https://github.com/milvus-io/milvus/pull/44384))
- [StorageV2] Added support for including partition and clustering keys in system group ([#44372](https://github.com/milvus-io/milvus/pull/44372))
- Removed timeout for compaction tasks ([#44277](https://github.com/milvus-io/milvus/pull/44277))
- [StorageV2] Enabled build with Azure ([#44177](https://github.com/milvus-io/milvus/pull/44177))
- [StorageV2] Utilized group info for estimating logic usage ([#44356](https://github.com/milvus-io/milvus/pull/44356))
- [StorageV2] Utilized group split info to estimate usage ([#44338](https://github.com/milvus-io/milvus/pull/44338))
- [StorageV2] Saved column group results in compaction ([#44327](https://github.com/milvus-io/milvus/pull/44327))
- [StorageV2] Added configurations for size-based split policy ([#44301](https://github.com/milvus-io/milvus/pull/44301))
- [StorageV2] Added support for schema-based and size-based split policy ([#44282](https://github.com/milvus-io/milvus/pull/44282))
- [StorageV2] Added configurable split policy ([#44258](https://github.com/milvus-io/milvus/pull/44258))
- [CachingLayer] Added more metrics and configurations ([#44276](https://github.com/milvus-io/milvus/pull/44276))
- Added support for waiting for all indices to be ready before loading segments ([#44313](https://github.com/milvus-io/milvus/pull/44313))
- Added internal core latency metric for rescore node ([#44010](https://github.com/milvus-io/milvus/pull/44010))
- Optimized access log format when printing KV params ([#43742](https://github.com/milvus-io/milvus/pull/43742))
- Added configuration to modify dump snapshot batch size ([#44215](https://github.com/milvus-io/milvus/pull/44215))
- Reduced compaction task cleanup interval ([#44207](https://github.com/milvus-io/milvus/pull/44207))
- Enhanced merge sort to support multiple fields ([#44191](https://github.com/milvus-io/milvus/pull/44191))([#43994](https://github.com/milvus-io/milvus/pull/43994))
- Added load resource estimation for tiered index ([#44171](https://github.com/milvus-io/milvus/pull/44171))
- Added autoindex config for deduplication case ([#44186](https://github.com/milvus-io/milvus/pull/44186))
- Added configuration to allow custom characters in names  ([#44063](https://github.com/milvus-io/milvus/pull/44063))
- Added support for cchannel for streaming service ([#44143](https://github.com/milvus-io/milvus/pull/44143))
- Added mutex and range check to guard concurrent deletions ([#44128](https://github.com/milvus-io/milvus/pull/44128))

### Bug fixes

- Aligned the behavior of exists expressions between brute force and index ([#44030](https://github.com/milvus-io/milvus/pull/44030))
- Fixed error on renaming to a dropped collection ([#44436](https://github.com/milvus-io/milvus/pull/44436))
- [StorageV2] Checked child fields length ([#44405](https://github.com/milvus-io/milvus/pull/44405))
- [StorageV2] Turned on Azure by default ([#44377](https://github.com/milvus-io/milvus/pull/44377))
- Corrected upload path of L0 compactions under pooling datanodes ([#44374](https://github.com/milvus-io/milvus/pull/44374))
- Disallowed renaming if database encryption is enabled ([#44225](https://github.com/milvus-io/milvus/pull/44225))
- Disallowed deletion of dynamicfield.enable property ([#44335](https://github.com/milvus-io/milvus/pull/44335))
- Marked tasks as failed when pre-allocated ID is invalid ([#44350](https://github.com/milvus-io/milvus/pull/44350))
- Skipped MVCC checks on PK compare expressions ([#44353](https://github.com/milvus-io/milvus/pull/44353))
- Fixed json_contains bug for stats ([#44325](https://github.com/milvus-io/milvus/pull/44325))
- Added initialization filesystem check for query node and streaming node ([#44360](https://github.com/milvus-io/milvus/pull/44360))
- Fixed empty compaction target when segment was garbage collected ([#44270](https://github.com/milvus-io/milvus/pull/44270))
- Fixed race condition when initializing timestamp index ([#44317](https://github.com/milvus-io/milvus/pull/44317))
- Checked if arraydata is nil to prevent panic ([#44332](https://github.com/milvus-io/milvus/pull/44332))
- Fixed build JSON stats bug for nested objects ([#44303](https://github.com/milvus-io/milvus/pull/44303))
- Avoided mmap rewrite by multiple JSON fields ([#44299](https://github.com/milvus-io/milvus/pull/44299))
- Unified valid data formats ([#44296](https://github.com/milvus-io/milvus/pull/44296))
- Hid credentials of embedding/reranking providers in web UI ([#44275](https://github.com/milvus-io/milvus/pull/44275))
- Corrected statslog path under pooling datanodes ([#44288](https://github.com/milvus-io/milvus/pull/44288))
- Corrected path of IDF oracle ([#44266](https://github.com/milvus-io/milvus/pull/44266))
- Used recovery snapshot checkpoint if no vchannel is recovering ([#44246](https://github.com/milvus-io/milvus/pull/44246))
- Limited column number in JSON stats ([#44233](https://github.com/milvus-io/milvus/pull/44233))
- Made load resource count n-gram index ([#44237](https://github.com/milvus-io/milvus/pull/44237))
- Deduced metric type from non-empty search results ([#44222](https://github.com/milvus-io/milvus/pull/44222))
- Fixed multi-segment write only writing one segment ([#44256](https://github.com/milvus-io/milvus/pull/44256))
- Fixed merge sort out of range ([#44230](https://github.com/milvus-io/milvus/pull/44230))
- Added UTF-8 check before executing BM25 function ([#44220](https://github.com/milvus-io/milvus/pull/44220))
- Retried old session if it exists ([#44208](https://github.com/milvus-io/milvus/pull/44208))
- Added Kafka buffer size limit to prevent datanode OOM ([#44106](https://github.com/milvus-io/milvus/pull/44106))
- Fixed panic by extending lock guarding range ([#44130](https://github.com/milvus-io/milvus/pull/44130))
- Fixed growing segments not being flushed on schema change ([#44412](https://github.com/milvus-io/milvus/pull/44412))
- [StorageV2] Handled IO errors ([#44255](https://github.com/milvus-io/milvus/pull/44255))
- Prevented panic if Tantivy index path does not exist ([#44135](https://github.com/milvus-io/milvus/pull/44135))

## v2.6.1

Release date: September 3, 2025

| Milvus Version | Python SDK Version | Node.js SDK Version | Java SDK Version | Go SDK Version |
|:-------------- |:------------------|:--------------------|:-----------------|:---------------|
| 2.6.1          | 2.6.1             | 2.6.0               | 2.6.3            | 2.6.1          |

We are excited to announce the release of Milvus 2.6.1! This version builds upon the major architectural advancements of previous releases, delivering critical enhancements focused on production stability, performance, and operational robustness. This release addresses key community feedback and strengthens the system for large-scale deployments. We strongly encourage all users to upgrade to benefit from a more stable, performant, and reliable system.

### Improvements

- Supports POSIX-compatible file systems for remote storage ([#43944](https://github.com/milvus-io/milvus/pull/43944))
- Introduces model-based rerankers ([#43270](https://github.com/milvus-io/milvus/pull/43270))
- Optimizes the performance of comparison expressions on primary key fields ([#43154](https://github.com/milvus-io/milvus/pull/43154))
- Collects doc_id from posting list directly to accelerate text match ([#43899](https://github.com/milvus-io/milvus/pull/43899))
- Optimizes query performance by converting multiple != conditions into a single NOT IN clause ([#43690](https://github.com/milvus-io/milvus/pull/43690))
- Enhances resource management for the caching layer during segment loading ([#43846](https://github.com/milvus-io/milvus/pull/43846))
- Improves memory estimation for interim indexes during data loading ([#44104](https://github.com/milvus-io/milvus/pull/44104))
- Makes the build ratio for interim indexes configurable ([#43939](https://github.com/milvus-io/milvus/pull/43939))
- Adds a configurable write rate limit to the disk writer ([#43912](https://github.com/milvus-io/milvus/pull/43912))
- SegCore parameters can now be updated dynamically without restarting the Milvus service ([#43231](https://github.com/milvus-io/milvus/pull/43231))
- Adds unified gRPC latency metrics for better observability ([#44089](https://github.com/milvus-io/milvus/pull/44089))
- Includes client request timestamps in gRPC headers to simplify debugging ([#44059](https://github.com/milvus-io/milvus/pull/44059))
- Supports trace log level for segcore ([#44003](https://github.com/milvus-io/milvus/pull/44003))
- Adds a configurable switch to adjust consistency guarantees for higher availability ([#43874](https://github.com/milvus-io/milvus/pull/43874))
- Implements a robust rewatch mechanism to handle etcd connection failures ([#43829](https://github.com/milvus-io/milvus/pull/43829))
- Improves the internal node health check logic ([#43768](https://github.com/milvus-io/milvus/pull/43768))
- Optimizes metadata access when listing collections ([#43902](https://github.com/milvus-io/milvus/pull/43902))
- Upgrades the Pulsar client to v0.15.1 official version and adds more logging ([#43913](https://github.com/milvus-io/milvus/pull/43913))
- Upgrades aws-sdk from 1.9.234 to 1.11.352 ([#43916](https://github.com/milvus-io/milvus/pull/43916))
- Supports dynamic interval updates for ticker components ([#43865](https://github.com/milvus-io/milvus/pull/43865))
- Improves auto-detection of ARM SVE instruction sets for bitset operations ([#43833](https://github.com/milvus-io/milvus/pull/43833))
- Improves the error message when a text or phrase match fails ([#43366](https://github.com/milvus-io/milvus/pull/43366))
- Improves the error message for vector dimension mismatches ([#43835](https://github.com/milvus-io/milvus/pull/43835))
- Improves error reporting for append timeouts when the object store is unavailable ([#43926](https://github.com/milvus-io/milvus/pull/43926))

### Bug fixes

- Fixes a potential Out-Of-Memory (OOM) issue during Parquet file imports ([#43756](https://github.com/milvus-io/milvus/pull/43756))
- Fixes an issue where standby nodes could not recover if their lease expired ([#44112](https://github.com/milvus-io/milvus/pull/44112))
- Handles compaction retry state correctly ([#44119](https://github.com/milvus-io/milvus/pull/44119))
- Fixes a potential deadlock between continuous read requests and index loading that could prevent index loading ([#43937](https://github.com/milvus-io/milvus/pull/43937))
- Fixes a bug that could cause data deletions to fail in high-concurrency scenarios ([#43831](https://github.com/milvus-io/milvus/pull/43831))
- Fixes a potential race condition when loading text and JSON indexes ([#43811](https://github.com/milvus-io/milvus/pull/43811))
- Fixes a node status inconsistency that could occur after a QueryCoord restart ([#43941](https://github.com/milvus-io/milvus/pull/43941))
- Ensures that a "dirty" QueryNode is properly cleaned up after a restart ([#43909](https://github.com/milvus-io/milvus/pull/43909))
- Fixes an issue where the retry state was not handled correctly for requests with non-empty payloads ([#44068](https://github.com/milvus-io/milvus/pull/44068))
- Fixes an issue where the bulk writer v2 did not use the correct bucket name ([#44083](https://github.com/milvus-io/milvus/pull/44083))
- Enhances security by hiding sensitive items from the RESTful get_configs endpoint ([#44057](https://github.com/milvus-io/milvus/pull/44057))
- Ensures that object uploads for woodpecker are idempotent during timeout retries ([#43947](https://github.com/milvus-io/milvus/pull/43947))
- Disallows importing null elements in array fields from Parquet files ([#43964](https://github.com/milvus-io/milvus/pull/43964))
- Fixes a bug where the proxy cache was not invalidated after creating a collection alias ([#43854](https://github.com/milvus-io/milvus/pull/43854))
- Improves the internal service discovery mechanism for streaming nodes ([#44033](https://github.com/milvus-io/milvus/pull/44033))
- Fixes resource group logic to correctly filter streaming nodes ([#43984](https://github.com/milvus-io/milvus/pull/43984))
- Adds the databaseName label to metrics to prevent naming conflicts in multi-database environments ([#43808](https://github.com/milvus-io/milvus/pull/43808))
- Fixes a logic error in internal task state handling ([#43777](https://github.com/milvus-io/milvus/pull/43777))
- Optimizes the initialization timing of the internal metrics to avoid potential panic ([#43773](https://github.com/milvus-io/milvus/pull/43773))
- Fixes a rare potential crash in the internal HTTP server ([#43799](https://github.com/milvus-io/milvus/pull/43799))

## v2.6.0

Release date: August 6, 2025

| Milvus Version | Python SDK Version | Node.js SDK Version | Java SDK Version | Go SDK Version |
|:-------------- |:------------------|:--------------------|:-----------------|:---------------|
| 2.6.0          | 2.6.0             | 2.6.0               | 2.6.1            | 2.6.0          |

Milvus 2.6.0 is officially released! Building upon the architectural foundation laid in [2.6.0-rc1](#v260-rc1), this production-ready version addresses numerous stability and performance issues while introducing powerful new capabilities including Storage Format V2, advanced JSON processing, and enhanced search features. With extensive bug fixes and optimizations based on community feedback during the RC phase, Milvus 2.6.0 is ready for you to explore and adopt.

<div class="alert warning">

Direct upgrade from pre-2.6.0 versions is not supported due to architectural changes. Please follow our <a href="upgrade_milvus_cluster-operator.md">upgrade guide</a>.

</div>

### What's new in 2.6.0 (since RC)

#### Optimized storage format v2

To address the challenges of mixed scalar and vector data storage, especially point lookups on unstructured data, Milvus 2.6 introduces Storage Format V2. This new adaptive columnar storage format adopts a "narrow column merging + wide column independence" layout strategy, fundamentally solving the performance bottlenecks when handling point lookups and small-batch retrievals in vector databases.

The new format now supports efficient random access without I/O amplification and achieves up to 100x performance gains compared to the vanilla Parquet format adopted previously, making it ideal for AI workloads requiring both analytical processing and precise vector retrieval. Additionally, it can reduce file count by up to 98% for typical workloads. Memory consumption for major compaction is reduced by 300%, and I/O operations are optimized by up to 80% for reads and more than 600% for writes.

#### JSON flat index (beta)

Milvus 2.6 introduces JSON Flat Index to handle highly dynamic JSON schemas. Unlike JSON Path Index which requires pre-declaring specific paths and their expected types, JSON Flat Index automatically discovers and indexes all nested structures under a given path. When indexing a JSON field, it recursively flattens the entire subtree, creating inverted index entries for every path-value pair it encounters, regardless of depth or type.
This automatic flattening makes JSON Flat Index ideal for evolving schemas where new fields appear without warning. For instance, if you index a "metadata" field, the system will automatically handle new nested fields like "metadata.version2.features.experimental" as they appear in incoming data, without requiring new index configuration.

### Core 2.6.0 features recall

<div class="alert note">

For detailed information about architecture changes and features introduced in 2.6.0-RC, see <a href="#v260-rc1">2.6.0-rc1 Release Note</a>.

</div>

#### Architecture simplification

- Streaming Node (GA) - Centralized WAL management
- Native WAL with Woodpecker - Removed Kafka/Pulsar dependency
- Unified coordinators (MixCoord); Merged IndexNode and DataNode - Reduced component complexity

#### Search & analytics

- RaBitQ 1-bit quantization with high recall
- Phrase matching
- MinHash LSH for deduplication
- Time-aware ranking functions

#### Developer experience

- Embedding functions for "data-in, data-out" workflow
- Online schema evolution
- INT8 vector support
- Enhanced tokenizers for global language support
- Cache layer with lazy loading - Process datasets larger than memory


## v2.6.0-rc1

Release date: June 18, 2025

| Milvus Version | Python SDK Version | Node.js SDK Version | Java SDK Version | Go SDK Version  |
|:--------------:|:-----------------:|:-------------------:|:----------------:|:---------------:|
|   2.6.0-rc1    |     2.6.0b0       |     2.6.0-rc1       |     2.6.0        |   2.6.0-rc.1    |

Milvus 2.6.0-rc1 introduces a simplified, cloud-native architecture designed to improve operational efficiency, resource utilization, and total cost of ownership by reducing deployment complexity. This release adds new functionalities focused on performance, search, and development. Key features include high-precision 1-bit quantization (RaBitQ) and a dynamic cache layer for performance gains, near-duplicate detection with MinHash and precise phrase matching for advanced search, and automated embedding functions with online schema modification to enhance the developer's experience.

<div class="alert note">

This is a pre-release version of Milvus 2.6.0. To try out the latest features, install this version as a fresh deployment. Upgrading from Milvus v2.5.x or earlier to 2.6.0-rc1 is not supported.

</div>

### Architecture Changes

Since 2.6, Milvus introduces significant architectural changes aimed at improving performance, scalability, and ease of use. For more information, refer to [Milvus Architecture Overview](architecture_overview.md).

#### Streaming Node (GA)

In previous versions, streaming data was written to the WAL by the Proxy, and read by the QueryNode and DataNode. This architecture made it difficult to achieve consensus on the write side, requiring complex logic on the read side. Additionally, the query delegator was located in the QueryNode, which hindered scalability. Milvus 2.5.0 introduced the Streaming Node, which becomes GA in version 2.6.0. This component is now responsible for all shard-level WAL read/write operations and also serves as the query delegator, resolving the aforementioned issues and enabling new optimizations.

**Important Upgrade Notice**: Streaming Node is a significant architectural change, so a direct upgrade to Milvus 2.6.0-rc1 from previous versions is not supported.

#### Woodpecker Native WAL

Milvus previously relied on external systems like Kafka or Pulsar for its WAL. While functional, these systems added significant operational complexity and resource overhead, particularly for small to medium-sized deployments. In Milvus 2.6, these are replaced by Woodpecker, a purpose-built, cloud-native WAL system. Woodpecker is designed for object storage, supporting both local and object storage based zero-disk modes, simplifying operations while improving performance and scalability.

#### DataNode and IndexNode Merge

In Milvus 2.6, tasks such as compaction, bulk import, statistics collection, and index building are now managed by a unified scheduler. The data persistence function previously handled by the DataNode has been moved to the Streaming Node. To simplify deployment and maintenance, the IndexNode and DataNode have been merged into a single DataNode component. This consolidated node now executes all these critical tasks, reducing operational complexity and optimizing resource utilization.

#### Coordinator Merge into MixCoord 

The previous design with separate RootCoord, QueryCoord, and DataCoord modules introduced complexity in inter-module communication. To simplify the system design, these components have been merged into a single, unified coordinator called MixCoord. This consolidation reduces the complexity of distributed programming by replacing network-based communication with internal function calls, resulting in more efficient system operation and simplified development and maintenance.

### Key Features

#### RaBitQ 1-bit Quantization

To handle large-scale datasets, 1-bit quantization is an effective technique for improving resource utilization and search performance. However, traditional methods can negatively impact recall. In collaboration with the original research authors, Milvus 2.6 introduces RaBitQ, a 1-bit quantization solution that maintains high recall accuracy while delivering the resource and performance benefits of 1-bit compression.

For more information, refer to [IVF_RABITQ](ivf-rabitq.md).

#### JSON Capability Enhancement

Milvus 2.6 enhances its support for the JSON data type with the following improvements:

- **Performance**: JSON Path Indexing is now officially supported, allowing the creation of inverted indexes on specific paths within JSON objects (e.g., `meta.user.location`). This avoids full object scans and improves the latency of queries with complex filters.
- **Functionality**: To support more complex filtering logic, this release adds support for `JSON_CONTAINS`, `JSON_EXISTS`, `IS NULL`, and `CAST` functions.
Looking ahead, our work on JSON support continues. We are excited to preview that upcoming official releases will feature even more powerful capabilities, such as **JSON shredding** and a **JSON FLAT Index**, designed to dramatically improve performance on highly nested JSON data.

#### Analyzer/Tokenizer Function Enhancement

This release significantly enhances text processing capabilities with several updates to the Analyzer and Tokenizer: 

- A new [Run Analyzer](analyzer-overview.md#Example-use) syntax is available to validate tokenizer configurations.
- The [Lindera tokenizer](lindera-tokenizer.md) is integrated for improved support of Asian languages such as Japanese and Korean.
- Row-level tokenizer selection is now supported, with the general-purpose [ICU tokenizer](icu-tokenizer.md) available as a fallback for multilingual scenarios.

#### Data-in, Data-Out with Embedding Functions 

Milvus 2.6 introduces a "Data-in, Data-Out" capability that simplifies AI application development by integrating directly with third-party embedding models (e.g., from OpenAI, AWS Bedrock, Google Vertex AI, Hugging Face). Users can now insert and query using raw text data, and Milvus will automatically call the specified model service to convert the text into vectors in real-time. This removes the need for a separate vector conversion pipeline.   

For more information, refer to [Embedding Function Overview](embedding-function-overview.md).

#### Phrase Match 

Phrase Match is a text search feature that returns results only when the exact sequence of words in a query appears consecutively and in the correct order within a document.

**Key Characteristics**:

- Order-sensitive: The words must appear in the same order as in the query.
- Consecutive match: The words must appear right next to each other, unless a slop value is used.
- Slop (optional): A tunable parameter that allows for a small number of intervening words, enabling fuzzy phrase matching.

For more information, refer to [Phrase Match](phrase-match.md).

#### MinHash LSH Index (Beta)

To address the need for data deduplication in model training, Milvus 2.6 adds support for MINHASH_LSH indexes. This feature provides a computationally efficient and scalable method for estimating Jaccard similarity between documents to identify near-duplicates. Users can generate MinHash signatures for their text documents during preprocessing and use the MINHASH_LSH index in Milvus to efficiently find similar content in large-scale datasets, improving data cleaning and model quality.   

#### Time-Aware Decay Functions

Milvus 2.6 introduces time-aware decay functions to address scenarios where information value changes over time. During result re-ranking, users can apply exponential, Gaussian, or linear decay functions based on a timestamp field to adjust a document's relevance score. This ensures that more recent content can be prioritized, which is critical for applications like news feeds, e-commerce, and an AI agent's memory.   

For more information, refer to [Decay Ranker Overview](decay-ranker-overview.md).

#### Add Field for Online Schema Evolution 

To provide greater schema flexibility, Milvus 2.6 now supports adding a new scalar field to an existing collection's schema online. This avoids the need to create a new collection and perform a disruptive data migration when application requirements change.   

For more information, refer to [Add Fields to an Existing Collection](add-fields-to-an-existing-collection.md).

#### INT8 Vector Support

In response to the growing use of quantized models that produce 8-bit integer embeddings, Milvus 2.6 adds native data type support for INT8 vectors. This allows users to ingest these vectors directly without de-quantization, saving computation, network bandwidth, and storage costs. This feature is initially supported for HNSW-family indexes.

For more information, refer to [Dense Vector](dense-vector.md).
