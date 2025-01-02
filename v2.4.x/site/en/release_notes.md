---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---
# Release Notes

Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.4.0 in this section. We suggest that you regularly visit this page to learn about updates.

## v2.4.20

Release Date: Janurary 2, 2025

| Milvus version | Python SDK version | Java SDK version | Node.js SDK version |
|----------------|--------------------|------------------|---------------------|
| 2.4.20         | 2.4.13             | 2.4.10           | 2.4.10              |

Milvus 2.4.20 addresses several critical issues, including fixing mmap for sparse index, resolving the failure to parse the correct database name when altering collection fields, and preventing deadlocks in multiple compaction tasks within the scheduler. Additionally, this version introduces an enhancement that allows adjustment of the system limit for maximum varchar length through a configuration item in the YAML file. We highly recommend upgrading to this version for improved stability and reliability.

### Improvements

- Added param for tuning max varchar length ([#38890](https://github.com/milvus-io/milvus/pull/38890))

### Bug fixes

- Enabled mmap for sparse index ([#38849](https://github.com/milvus-io/milvus/pull/38849))
- Fixed altercollectionfield interceptor dbname ([#38664](https://github.com/milvus-io/milvus/pull/38664))
- Released compaction task lock when return function ([#38857](https://github.com/milvus-io/milvus/pull/38857))
- Retrieve plan on heap was used after free when reduce ([#38842](https://github.com/milvus-io/milvus/pull/38842))

## v2.4.19

Release Date: December 26, 2024

| Milvus version | Python SDK version | Java SDK version | Node.js SDK version |
|----------------|--------------------|------------------|---------------------|
| 2.4.19         | 2.4.13              | 2.4.9            | 2.4.9               |

Milvus 2.4.19 focuses on fixing issues in RBAC, Balancer, and loading processes, while also introducing several performance enhancements in areas such as PartitionKey Deletion and hybrid searching. We highly recommend upgrading to this version for increased stability and reliability.

### Improvements

- Expression templates are introduced to accelerate hybrid searches. ([#38624](https://github.com/milvus-io/milvus/pull/38624))
- Additional metrics are provided for improved deletion monitoring. ([#38746](https://github.com/milvus-io/milvus/pull/38746))
- L0 file generation is restricted to specific partition for partitionKey deletion to reduce amplification. ([#38232](https://github.com/milvus-io/milvus/pull/38232))

### Bug fixes

- Fixed OOM issues by adding a memory factor to loading estimations. ([#38721](https://github.com/milvus-io/milvus/pull/38721))
- Fixed privilege group expansion when listing policies in RootCoord. ([#38759](https://github.com/milvus-io/milvus/pull/38759))
- Fixed access log retention, skipping empty log rotation. ([#38661](https://github.com/milvus-io/milvus/pull/38661))
- Fixed the balancer to avoid repeatedly overloading the same query node. ([#38720](https://github.com/milvus-io/milvus/pull/38720))
- Fixed issues with listing privilege groups and collections. ([#38698](https://github.com/milvus-io/milvus/pull/38698))
- Fixed load config updates not applying to loading collections. ([#38596](https://github.com/milvus-io/milvus/pull/38596))
- Fixed unexpected balance tasks triggered after QueryCoord restarts. ([#38714](https://github.com/milvus-io/milvus/pull/38714))
- Fixed zero read count during data import. ([#38696](https://github.com/milvus-io/milvus/pull/38696))
- Fixed Unicode decoding for JSON keys in expressions. ([#38652](https://github.com/milvus-io/milvus/pull/38652))

## v2.4.18

Release Date: December 20, 2024

| Milvus version | Python SDK version | Java SDK version | Node.js SDK version |
|----------------|--------------------|------------------|---------------------|
| 2.4.18         | 2.4.11              | 2.4.9            | 2.4.9               |

Milvus 2.4.18 introduces customizable privilege groups and an enhanced Grant/Revoke API, significantly streamlining permission management. This version also brings a suite of built-in privilege groups for common operational scenarios, as well as a host of performance and stability improvements—ranging from CPU optimization to faster collection loading and more efficient indexing. In addition, critical bug fixes ensure a more resilient system, addressing issues like crash scenarios and synchronization failures. We recommend you upgrade to 2.4.18 to take advantage of these key enhancements and improved overall reliability.

### Features

RBAC Enhancements:

- Introduces customizable privilege groups, allowing users to create, drop, list, and dynamically manage privileges (add/remove) within their defined groups.
- Includes a suite of built-in privilege groups for common operational scenarios:
  - Cluster-Level: *ClusterReadOnly*, *ClusterReadWrite*, *ClusterAdmin*
  - Database-Level: *DatabaseReadOnly*, *DatabaseReadWrite*, *DatabaseAdmin*
  - Collection-Level: *CollectionReadOnly*, *CollectionReadWrite*, *CollectionAdmin*
- Provides a new version of the Grant/Revoke API, enabling the use of these new interfaces without the need to specify an `ObjectType`.

### Improvements

- Allow hyphens in partition names ([#38474](https://github.com/milvus-io/milvus/pull/38474))
- Optimize CPU usage for health check requests ([#35595](https://github.com/milvus-io/milvus/pull/35595))
- Support templates for expressions in RESTful APIs ([#38161](https://github.com/milvus-io/milvus/pull/38161))
- Remove the limit on the number of load tasks per round ([#38497](https://github.com/milvus-io/milvus/pull/38497))
- `alterindex` & `altercollection` now support modifying properties ([#38361](https://github.com/milvus-io/milvus/pull/38361) [#38111](https://github.com/milvus-io/milvus/pull/38111) [#38421](https://github.com/milvus-io/milvus/pull/38421))
- `alterdatabase` supports deleting properties ([#38450](https://github.com/milvus-io/milvus/pull/38450))
- Add detailed replica counts for resource groups ([#38315](https://github.com/milvus-io/milvus/pull/38315))
- Support score-based balancing for channel policies  ([#38378](https://github.com/milvus-io/milvus/pull/38378))
- Add metrics to count the number of non-zero values/tokens in sparse searches ([#38328](https://github.com/milvus-io/milvus/pull/38328))
- Remove the RPC layer of the coordinator when running in standalone or mixed mode ([#38207](https://github.com/milvus-io/milvus/pull/38207))
- Add mmap file usage metrics ([#38211](https://github.com/milvus-io/milvus/pull/38211))
- Support database requests in RESTful API ([#38188](https://github.com/milvus-io/milvus/pull/38188))
- Enable rate limiting for RESTful V1 ([#38190](https://github.com/milvus-io/milvus/pull/38190))
- Add collection ID to search request count metrics ([#38144](https://github.com/milvus-io/milvus/pull/38144))
- Refine clustering compaction logs ([#38102](https://github.com/milvus-io/milvus/pull/38102))
- Accelerate the collection loading process ([#37841](https://github.com/milvus-io/milvus/pull/37841))
- Improve compaction performance by removing ParamTable lookups ([#37882](https://github.com/milvus-io/milvus/pull/37882))
- Support retrying searches when topk is reduced and results are insufficient ([#37093](https://github.com/milvus-io/milvus/pull/37093))
- Update Knowhere version ([#38277](https://github.com/milvus-io/milvus/pull/38277))
  - Optimize sparse index and get ~10% performance improvement

### Bug fixes

- Fixed a crash caused by growing-groupby ([#38553](https://github.com/milvus-io/milvus/pull/38553))
- Fixed an issue where the `SyncSegments` RPC would always fail ([#38032](https://github.com/milvus-io/milvus/pull/38032))
- Fixed an issue where sync tasks remained running after the DataNode had stopped ([#38441](https://github.com/milvus-io/milvus/pull/38441))
- Fixed inaccurate general counts ([#38525](https://github.com/milvus-io/milvus/pull/38525))
- Escaped prefixes before conducting searches in inverted indexes  ([#38425](https://github.com/milvus-io/milvus/pull/38425))
- Fixed an issue where roles could be dropped even though grants still existed ([#38369](https://github.com/milvus-io/milvus/pull/38369))
- Fixed empty import task results ([#38317](https://github.com/milvus-io/milvus/pull/38317))
- Fixed a DataNode issue where progress could stall at the writer buffer memory check ([#38287](https://github.com/milvus-io/milvus/pull/38287))
- Fixed an issue that prevented the permission grant on the `manualcompact` API ([#38168](https://github.com/milvus-io/milvus/pull/38168))
- Fixed inaccurate partition count metrics ([#38073](https://github.com/milvus-io/milvus/pull/38073))
- Accelerated flushing speed by optimizing lock usage ([#37897](https://github.com/milvus-io/milvus/pull/37897))
- Handled errors gracefully when the compaction queue is full ([#37990](https://github.com/milvus-io/milvus/pull/37990))
- Optimized loading speed by separating the pool for target observation and collection loading ([#37735](https://github.com/milvus-io/milvus/pull/37735))
- Fixed a crash caused by retrieving varchar data from a memory-mapped growing segment ([#37995](https://github.com/milvus-io/milvus/pull/37995))
- Fixed an issue where channels could be accidentally released after balancing ([#37940](https://github.com/milvus-io/milvus/pull/37940))

## v2.4.17

Release Date: November 22, 2024

| Milvus version | Python SDK version | Java SDK version | Node.js SDK version |
|----------------|--------------------|------------------|---------------------|
| 2.4.17         | 2.4.9              | 2.4.8            | 2.4.9               |

Milvus 2.4.17 was a minor release aimed at critical stability enhancements. This version addressed various bugs and implemented performance optimizations to bolster system reliability.

### Improvements

- Enhanced: [2.4] Prevented the generation of "null" search parameters ([#37811](https://github.com/milvus-io/milvus/pull/37811)).
- Enhanced: [2.4] Removed unnecessary segment clone updates in distribution ([#37797](https://github.com/milvus-io/milvus/pull/37797)) ([#37833](https://github.com/milvus-io/milvus/pull/37833)).
- Enhanced: [2.4] Provided secondary index criteria for filtering `leaderview` ([#37777](https://github.com/milvus-io/milvus/pull/37777)) ([#37802](https://github.com/milvus-io/milvus/pull/37802)).
- Used batch processing to speed up listing collections from meta kv ([#37752](https://github.com/milvus-io/milvus/pull/37752)).
- Removed collection queryable checks from health checks ([#37731](https://github.com/milvus-io/milvus/pull/37731)).
- [2.4] Removed segment-level tags from monitoring metrics ([#37737](https://github.com/milvus-io/milvus/pull/37737)).
- [2.4] Removed unnecessary cloning in `setstate` ([#37736](https://github.com/milvus-io/milvus/pull/37736)).
- Added search parameters to search requests in RESTful API ([#37673](https://github.com/milvus-io/milvus/pull/37673)).
- Made Milvus images with AddressSanitizer (ASAN) available ([#37682](https://github.com/milvus-io/milvus/pull/37682)).
- [cp24] Tidied compaction logs ([#37647](https://github.com/milvus-io/milvus/pull/37647)).
- [2.4] Invalidated the collection cache when releasing collections ([#37628](https://github.com/milvus-io/milvus/pull/37628)).
- [2.4] Added CGO call metrics for load/write APIs ([#37627](https://github.com/milvus-io/milvus/pull/37627)).
- Enabled node assignment policies in resource groups ([#37588](https://github.com/milvus-io/milvus/pull/37588)).
- Optimized `describe collection` and index operations ([#37605](https://github.com/milvus-io/milvus/pull/37605)).
- [2.4] Handled legacy proxy load fields requests ([#37569](https://github.com/milvus-io/milvus/pull/37569)).
- [2.4] Added context tracing for query coordination queryable checks ([#37534](https://github.com/milvus-io/milvus/pull/37534)).
- [2.4] Improved root coordination task scheduling policies ([#37523](https://github.com/milvus-io/milvus/pull/37523)).
- Refactored `createindex` in the RESTful API ([#37237](https://github.com/milvus-io/milvus/pull/37237)).
- [2.4] Used cancel labels for context-canceled storage operations ([#37491](https://github.com/milvus-io/milvus/pull/37491)).
- [2.4] Updated the template expression proto to improve transmission efficiency ([#37485](https://github.com/milvus-io/milvus/pull/37485)).

### Bug fixes

- Supported `upsert` with autoid=true in the RESTful API and fixed associated bugs ([#37766](https://github.com/milvus-io/milvus/pull/37766)).
- Ensured L0 segments were loaded to workers during channel balancing ([#37758](https://github.com/milvus-io/milvus/pull/37758)).
- Fixed delegator stuck in unserviceable status ([#37702](https://github.com/milvus-io/milvus/pull/37702)).
- [2.4] Stored default values when `errkeynotfound` was returned ([#37705](https://github.com/milvus-io/milvus/pull/37705)).
- [cp24] Changed memory check from write lock to read lock ([#37526](https://github.com/milvus-io/milvus/pull/37526)).
- Ensured `getshardleaders` retried only on retriable errors ([#37687](https://github.com/milvus-io/milvus/pull/37687)).
- [cp24] Corrected varchar primary key size calculations ([#37619](https://github.com/milvus-io/milvus/pull/37619)).
- Fixed channel balancing that could get stuck when increasing replica numbers ([#37642](https://github.com/milvus-io/milvus/pull/37642)).
- Addressed issues where searches returned fewer results after query node recovery ([#37610](https://github.com/milvus-io/milvus/pull/37610)).
- [2.4] Fixed bugs retrieving data from the wrong field for L0 segments ([#37599](https://github.com/milvus-io/milvus/pull/37599)).
- Recovered loading collection's `updateTS` after query coordination restarts ([#37580](https://github.com/milvus-io/milvus/pull/37580)).
- [2.4] Added IP address validation to `paramtable` ([#37500](https://github.com/milvus-io/milvus/pull/37500)).
- Fixed search/query failures caused by segments not being loaded ([#37544](https://github.com/milvus-io/milvus/pull/37544)).
- Resolved watch channel issues due to timer reset misuse ([#37542](https://github.com/milvus-io/milvus/pull/37542)).
- Fixed subscription leaks ([#37541](https://github.com/milvus-io/milvus/pull/37541)).
- Resolved issues with excessively growing segments ([#37540](https://github.com/milvus-io/milvus/pull/37540)).
- [cp24] Corrected dropped segment metrics ([#37471](https://github.com/milvus-io/milvus/pull/37471)).
- Fixed repeated error codes in Milvus and Segcore ([#37449](https://github.com/milvus-io/milvus/pull/37449)).
- [cp24] Separated L0 and mixed trigger intervals ([#37319](https://github.com/milvus-io/milvus/pull/37319)).

## v2.4.15

Release Date: November 5, 2024

| Milvus version | Python SDK version | Java SDK version | Node.js SDK version |
|----------------|--------------------|------------------|---------------------|
| 2.4.15         | 2.4.9              | 2.4.8            | 2.4.9               |

Milvus 2.4.15 was a critical bug-fix release focused on enhancing system stability, performance, and compatibility. This version addressed a major deadlock issue that could occur during QueryNode crashes and introduced compatibility updates for the backup tool with the database feature. Additionally, Milvus 2.4.15 improved delete performance and stability through significant optimizations in L0 handling. **Upgrading to v2.4.15 was strongly recommended** to benefit from these critical enhancements.

### Critical bug fixes

- Resolved a deadlock issue if the QueryNode crashed during shard client initialization ([#37354](https://github.com/milvus-io/milvus/pull/37354)).
- Reverted the enhancement to support databases for bulk insert ([#37421](https://github.com/milvus-io/milvus/pull/37421)).

### Bug fixes

- Fixed a bug where certain expressions did not correctly parse values ([#37342](https://github.com/milvus-io/milvus/pull/37342)).
- Enhanced the Proxy to retry getting the shard leader on unloaded collections ([#37326](https://github.com/milvus-io/milvus/pull/37326)).
- Corrected an issue where the L0 row count metrics value was always empty ([#37307](https://github.com/milvus-io/milvus/pull/37307)).
- Skipped marking compaction timeout for mixed and L0 compaction scenarios ([#37194](https://github.com/milvus-io/milvus/pull/37194)).
- Rectified the containment logic of OffsetOrderedArray ([#37309](https://github.com/milvus-io/milvus/pull/37309)).
- Added a check for resources when loading delta logs ([#37263](https://github.com/milvus-io/milvus/pull/37263)).

### Improvements

- Moved L0 logic outside of the delta lock for better performance ([#37340](https://github.com/milvus-io/milvus/pull/37340)).
- Released compacted growing segments if present in the dropped list ([#37266](https://github.com/milvus-io/milvus/pull/37266)).
- Introduced middleware to monitor RESTful V2 input/output RPC stats ([#37224](https://github.com/milvus-io/milvus/pull/37224), [#37440](https://github.com/milvus-io/milvus/pull/37440)).

## v2.4.14

Release Date: October 31, 2024

| Milvus version | Python SDK version | Java SDK version | Node.js SDK version |
|----------------|--------------------|------------------|---------------------|
| 2.4.14         | 2.4.9              | 2.4.7            | 2.4.9               |

Milvus 2.4.14 addresses a critical issue from version 2.4.13 that could cause collection information to be lost after `snapshotKV` garbage collection. It also fixed a couple of resource leaks. Additionally, this release includes numerous enhancements focused on improving stability in large-scale delete operations and compaction performance.

### Features

- Supported memory mode chunk cache ([#35836](https://github.com/milvus-io/milvus/pull/35836))
- Supported db for bulkinsert ([#37017](https://github.com/milvus-io/milvus/pull/37017))

### Improvements

- Delete/Compaction Optimization
  - Enabled parallel execution of l0 compactions ([#36985](https://github.com/milvus-io/milvus/pull/36985))
  - Batched forward delete when using direct forward ([#37107](https://github.com/milvus-io/milvus/pull/37107))
  - Skipped loading delta data in delegater when using remoteload ([#37112](https://github.com/milvus-io/milvus/pull/37112))
  - Directly forwarded delta excluding l0 segments ([#36914](https://github.com/milvus-io/milvus/pull/36914))
  - Added prioritization of compaction tasks in DataCoord ([#36979](https://github.com/milvus-io/milvus/pull/36979))
  - Tracked complex delete rates ([#36958](https://github.com/milvus-io/milvus/pull/36958))
- Refactored CreateCollection in RESTFul API ([#36885](https://github.com/milvus-io/milvus/pull/36885))
- Fused multiple 'and' and 'or' operations into a single op ([#36973](https://github.com/milvus-io/milvus/pull/36973))
- Made skip load work for all branches ([#37161](https://github.com/milvus-io/milvus/pull/37161))
- Upgraded Minio dependency to support EKS Pod Identities ([#37089](https://github.com/milvus-io/milvus/pull/37089))
- Tidied import options ([#37078](https://github.com/milvus-io/milvus/pull/37078))
- Limited maximum number of import jobs ([#36892](https://github.com/milvus-io/milvus/pull/36892))
- Preallocated data slice to avoid re-allocating memory ([#37044](https://github.com/milvus-io/milvus/pull/37044))
- Prevented DataNode from loading the bf ([#37027](https://github.com/milvus-io/milvus/pull/37027))
- Avoided limiting ddl operations repeatedly ([#37011](https://github.com/milvus-io/milvus/pull/37011))
- Made the configuration item `datanode.import.maxconcurrenttasknum` dynamically adjustable ([#37103](https://github.com/milvus-io/milvus/pull/37103))
- Used `queryNode.mmap.growingMmapEnabled` to control the behavior of interim index ([#36391](https://github.com/milvus-io/milvus/pull/36391))
- Populated the `Level` and `StartPosition` fields in segmentLoadInfo of growing segment ([#36911](https://github.com/milvus-io/milvus/pull/36911))
- Forced to stop buffer messages when receiving the drop collection message ([#36917](https://github.com/milvus-io/milvus/pull/36917))
- Added metrics for querynode delete buffer info ([#37097](https://github.com/milvus-io/milvus/pull/37097))
- Added collection name label for some metric ([#37159](https://github.com/milvus-io/milvus/pull/37159))
- Used middleware to observe RESTful v2 in/out rpc stats ([#37224](https://github.com/milvus-io/milvus/pull/37224))
- Changed GPU default memory pool size ([#36969](https://github.com/milvus-io/milvus/pull/36969))
- Updated Knowhere version to 2.3.12 ([#37132](https://github.com/milvus-io/milvus/pull/37132))
- Allowed deleting data when disk quota exhausted ([#37139](https://github.com/milvus-io/milvus/pull/37139))

### Bug fixes

- Fixed collection info that could not be recovered from metakv after restart if all snapshots were garbage collected ([#36950](https://github.com/milvus-io/milvus/pull/36950))
- Corrected the rpc error code to avoid invalid retry in client ([#37025](https://github.com/milvus-io/milvus/pull/37025))
- Ignored db not found error in quota center ([#36850](https://github.com/milvus-io/milvus/pull/36850))
- Fixed goroutine leakage in QueryNode by using singleton delete pool ([#37225](https://github.com/milvus-io/milvus/pull/37225))
- Fixed collection leak in querynode ([#37079](https://github.com/milvus-io/milvus/pull/37079))
- Fixed leakage of clustering compaction task ([#36803](https://github.com/milvus-io/milvus/pull/36803))
- Prohibited renaming a collection that had an alias ([#37208](https://github.com/milvus-io/milvus/pull/37208))
- Made sure alias was cached ([#36808](https://github.com/milvus-io/milvus/pull/36808))
- Search/query could have failed during updating delegator cache ([#37174](https://github.com/milvus-io/milvus/pull/37174))
- Excluded l0 compaction when clustering was executing ([#37142](https://github.com/milvus-io/milvus/pull/37142))
- Referenced collection meta when loading l0 segment meta only ([#37179](https://github.com/milvus-io/milvus/pull/37179))
- Delegator might have become unserviceable after querycoord restart ([#37100](https://github.com/milvus-io/milvus/pull/37100))
- Dynamic release partition might have failed search/query ([#37099](https://github.com/milvus-io/milvus/pull/37099))
- Rectified delete buffer row count quota value ([#37068](https://github.com/milvus-io/milvus/pull/37068))
- Passed full field list when partial load enabled ([#37063](https://github.com/milvus-io/milvus/pull/37063))
- Query node panic occurred during sending rpc to worker ([#36988](https://github.com/milvus-io/milvus/pull/36988))
- Datacoord got stuck at stopping progress ([#36961](https://github.com/milvus-io/milvus/pull/36961))
- Fixed the out-of-bounds access in the growing segment when raw data was replaced by interim index ([#36938](https://github.com/milvus-io/milvus/pull/36938))
- Rootcoord got stuck at graceful stop progress ([#36881](https://github.com/milvus-io/milvus/pull/36881))

## v2.4.13-hotfix

Release Date: October 17, 2024

| Milvus version | Python SDK version | Java SDK version | Node.js SDK version |
|----------------|--------------------|------------------|---------------------|
| 2.4.13-hotfix  | 2.4.8              | 2.4.5            | 2.4.9               |

Milvus v2.4.13-hotfix addresses a critical issue specific to v2.4.13, where Milvus may fail to retrieve collection information after a restart if all MetaKV snapshots were garbage-collected ([#36933](https://github.com/milvus-io/milvus/pull/36933)). **Users currently running v2.4.13 are advised to upgrade to v2.4.13-hotfix at the earliest opportunity to avoid potential disruptions**.

### Critical fixes

- Load original key if timestamp is MaxTimestamp ([#36935](https://github.com/milvus-io/milvus/pull/36935))

## [Deprecated] v2.4.13

Release Date: October 12, 2024

| Milvus version | Python SDK version | Java SDK version | Node.js SDK version |
|----------------|--------------------|------------------|---------------------|
| 2.4.13         | 2.4.8              | 2.4.5            | 2.4.9               |

Milvus 2.4.13 introduces dynamic replica load, allowing users to adjust the number of collection replicas without needing to release and reload the collection. This version also addresses several critical bugs related to bulk importing, expression parsing, load balancing, and failure recovery. Additionally, significant improvements have been made to MMAP resource usage and import performance, enhancing overall system efficiency. We highly recommend upgrading to this release for better performance and stability.

### Features

- Dynamic replica adjustment for loaded collections ([#36417](https://github.com/milvus-io/milvus/pull/36417))
- Sparse vector MMAP in growing segment types ([#36565](https://github.com/milvus-io/milvus/pull/36565))

### Bug fixes

- Fixed a flush performance issue ([#36741](https://github.com/milvus-io/milvus/pull/36741))
- Fixed a bug with JSON expressions in "[]" ([#36722](https://github.com/milvus-io/milvus/pull/36722))
- Removed neighbors if compact target is unindexed ([#36694](https://github.com/milvus-io/milvus/pull/36694))
- Improved performance for Rocksmq when channel is full ([#36618](https://github.com/milvus-io/milvus/pull/36618))
- Fixed an issue where errors during unpinning were not deferred ([#36665](https://github.com/milvus-io/milvus/pull/36665))
- Resolved a memory leak for imported segments in the segment manager ([#36631](https://github.com/milvus-io/milvus/pull/36631))
- Skipped unnecessary health checks for query nodes in the proxy ([#36553](https://github.com/milvus-io/milvus/pull/36553))
- Fixed an overflow issue with term expressions ([#36534](https://github.com/milvus-io/milvus/pull/36534))
- Recorded node ID before assigning tasks to prevent task misallocation ([#36493](https://github.com/milvus-io/milvus/pull/36493))
- Resolved data race issues in clustering compaction ([#36499](https://github.com/milvus-io/milvus/pull/36499))
- Added a check for string array max length after type matching ([#36497](https://github.com/milvus-io/milvus/pull/36497))
- Addressed race conditions in mix or standalone mode ([#36459](https://github.com/milvus-io/milvus/pull/36459))
- Fixed segment imbalance after repeated load and release operations ([#36543](https://github.com/milvus-io/milvus/pull/36543))
- Corrected a corner case where segments couldn't be moved from a stopping node ([#36475](https://github.com/milvus-io/milvus/pull/36475))
- Updated segment info properly even if some segments were missing ([#36729](https://github.com/milvus-io/milvus/pull/36729))
- Prevented etcd transactions from exceeding the max limit in snapshot KV ([#36773](https://github.com/milvus-io/milvus/pull/36773))

### Improvements

- Enhanced MMAP resource estimation:
  - Improved MMAP-related code in column.h ([#36521](https://github.com/milvus-io/milvus/pull/36521))
  - Refined resource estimation when loading collections ([#36728](https://github.com/milvus-io/milvus/pull/36728))
- Performance Enhancements:
  - Improved expression parsing efficiency by converting Unicode to ASCII ([#36676](https://github.com/milvus-io/milvus/pull/36676))
  - Enabled parallel production of messages for multiple topics ([#36462](https://github.com/milvus-io/milvus/pull/36462))
  - Reduced CPU overhead when calculating index file size ([#36580](https://github.com/milvus-io/milvus/pull/36580))
  - Retrieved message type from header to minimize unmarshalling ([#36454](https://github.com/milvus-io/milvus/pull/36454))
  - Optimized workload-based replica selection policy ([#36384](https://github.com/milvus-io/milvus/pull/36384))
- Split delete task messages to fit within max message size limits ([#36574](https://github.com/milvus-io/milvus/pull/36574))
- Added new RESTful URL to describe import jobs ([#36754](https://github.com/milvus-io/milvus/pull/36754))
- Optimized import scheduling and added a time cost metric ([#36684](https://github.com/milvus-io/milvus/pull/36684))
- Added balance report log for query coordinator balancer ([#36749](https://github.com/milvus-io/milvus/pull/36749))
- Switched to using common GC configuration ([#36670](https://github.com/milvus-io/milvus/pull/36670))
- Added streaming forward policy switch for delegator ([#36712](https://github.com/milvus-io/milvus/pull/36712))
- Enabled manual compaction for collections without indexes ([#36581](https://github.com/milvus-io/milvus/pull/36581))
- Enabled load balancing on query nodes with varying memory capacities ([#36625](https://github.com/milvus-io/milvus/pull/36625))
- Unified case for inbound labels using metrics.label ([#36616](https://github.com/milvus-io/milvus/pull/36616))
- Made transfer channel/segment operations idempotent ([#36552](https://github.com/milvus-io/milvus/pull/36552))
- Added metrics to monitor import throughput and imported row count ([#36588](https://github.com/milvus-io/milvus/pull/36588))
- Prevented creation of multiple timer objects in targets ([#36573](https://github.com/milvus-io/milvus/pull/36573))
- Updated expression version and formatted HTTP response for expressions ([#36467](https://github.com/milvus-io/milvus/pull/36467))
- Enhanced garbage collection in snapshot KV ([#36793](https://github.com/milvus-io/milvus/pull/36793))
- Added support to execute methods with context parameters ([#36798](https://github.com/milvus-io/milvus/pull/36798))

## v2.4.12

Release Date: September 26, 2024

| Milvus version | Python SDK version | Java SDK version | Node.js SDK version |
|----------------|--------------------|------------------|---------------------|
| 2.4.12         | 2.4.7              | 2.4.4            | 2.4.9               |

Milvus 2.4.12 introduces significant enhancements and critical bug fixes. This release addresses data duplication issues and improves failure recovery speed, particularly when handling large numbers of deletions. However, a known issue persists where failure recovery can be slow when deleting massive amounts of data. We are actively working on resolving this issue.

### Improvements

- Implemented graceful stop for flowgraph manager ([#36358](https://github.com/milvus-io/milvus/pull/36358))
- Disabled index checks for non-loaded vector fields ([#36280](https://github.com/milvus-io/milvus/pull/36280))
- Filtered out non-hit delete records during delta loading ([#36272](https://github.com/milvus-io/milvus/pull/36272))
- Improved error handling for std::stoi exceptions ([#36296](https://github.com/milvus-io/milvus/pull/36296))
- Disallowed keywords as field names or dynamic field names ([#36108](https://github.com/milvus-io/milvus/pull/36108))
- Added metrics for delete entries in L0 segments ([#36227](https://github.com/milvus-io/milvus/pull/36227))
- Implemented L0 forward policy to support remote loading ([#36208](https://github.com/milvus-io/milvus/pull/36208))
- Added ANN field loading check in proxy ([#36194](https://github.com/milvus-io/milvus/pull/36194))
- Enabled empty sparse row support ([#36061](https://github.com/milvus-io/milvus/pull/36061))
- Fixed a security vulnerability ([#36156](https://github.com/milvus-io/milvus/pull/36156))
- Implemented stats handler for request/response size metrics ([#36118](https://github.com/milvus-io/milvus/pull/36118))
- Corrected size estimation for encoded array data ([#36379](https://github.com/milvus-io/milvus/pull/36379))

### Bug fixes

- Resolved metric type errors for collections with two vector fields ([#36473](https://github.com/milvus-io/milvus/pull/36473))
- Fixed long buffering issues causing message queue reception failures ([#36425](https://github.com/milvus-io/milvus/pull/36425))
- Implemented proper compact-to-segments return after split support ([#36429](https://github.com/milvus-io/milvus/pull/36429))
- Resolved data race issues with node ID check goroutine ([#36377](https://github.com/milvus-io/milvus/pull/36377))
- Removed element type check ([#36324](https://github.com/milvus-io/milvus/pull/36324))
- Fixed concurrent access issues for growing and sealed segments ([#36288](https://github.com/milvus-io/milvus/pull/36288))
- Implemented future stateful lock ([#36333](https://github.com/milvus-io/milvus/pull/36333))
- Corrected offset usage in HybridSearch ([#36287](https://github.com/milvus-io/milvus/pull/36287), [#36253](https://github.com/milvus-io/milvus/pull/36253))
- Resolved dirty segment/channel leaks on QueryNode ([#36259](https://github.com/milvus-io/milvus/pull/36259))
- Fixed primary key duplication handling ([#36274](https://github.com/milvus-io/milvus/pull/36274))
- Enforced metric type setting in search requests ([#36279](https://github.com/milvus-io/milvus/pull/36279))
- Fixed stored_index_files_size metric clearing issue ([#36161](https://github.com/milvus-io/milvus/pull/36161))
- Corrected readwrite privilege group behavior for global API access ([#36145](https://github.com/milvus-io/milvus/pull/36145))

## v2.4.11

Release Date: September 11, 2024

| Milvus version | Python SDK version | Java SDK version | Node.js SDK version |
|----------------|--------------------|------------------|---------------------|
| 2.4.11         | 2.4.6              | 2.4.3            | 2.4.8               |


Milvus 2.4.11 is a bug-fix release that addresses multiple critical issues related to the MARISA trie index, compaction, and loading operations. This release introduces new features to view expressions and improve delete stability. We recommend all users of the 2.4.x series to upgrade to this version to benefit from these improvements and fixes.

### Features

- Added static view for expressions in 2.4 ([#35954](https://github.com/milvus-io/milvus/pull/35954))
- Implemented delete buffer related quota logic ([#35997](https://github.com/milvus-io/milvus/pull/35997))

### Bug fixes

- Resolved Trie index range operation issue for GreaterThan and GreaterThanEqual comparisons ([#36126](https://github.com/milvus-io/milvus/pull/36126))
- Corrected `marisa_label_order` usage in Trie index construction ([#36060](https://github.com/milvus-io/milvus/pull/36060))
- Enhanced value checking for `trie.predictive_search` ([#35999](https://github.com/milvus-io/milvus/pull/35999))
- Enabled Binary arithmetic expression support on inverted index ([#36097](https://github.com/milvus-io/milvus/pull/36097))
- Fixed segment fault caused by Skipindex ([#35908](https://github.com/milvus-io/milvus/pull/35908))
- Resolved memory leak in proxy meta cache ([#36076](https://github.com/milvus-io/milvus/pull/36076))
- Renamed mmap file path to prevent directory conflicts ([#35975](https://github.com/milvus-io/milvus/pull/35975))
- Improved logging and cleanup for failed/timeout tasks in mix compaction ([#35967](https://github.com/milvus-io/milvus/pull/35967))
- Addressed logic deadlock during high memory usage by delegator ([#36066](https://github.com/milvus-io/milvus/pull/36066))
- Implemented empty segment creation when compaction deletes all inserts ([#36045](https://github.com/milvus-io/milvus/pull/36045))
- Corrected load field list population from old version load info in 2.4 ([#36018](https://github.com/milvus-io/milvus/pull/36018))
- Fixed tracing config update logic in 2.4 ([#35998](https://github.com/milvus-io/milvus/pull/35998))
- Resolved search/query request failures during dynamic partition release ([#36019](https://github.com/milvus-io/milvus/pull/36019))
- Prevented override of fallback parameters ([#36006](https://github.com/milvus-io/milvus/pull/36006))
- Ensured proper registration of privilege groups for validation ([#35938](https://github.com/milvus-io/milvus/pull/35938))
- Prevented mistaken cleanup of db limiter nodes ([#35992](https://github.com/milvus-io/milvus/pull/35992))
- Addressed issue with replicas not participating in queries after failure recovery ([#35925](https://github.com/milvus-io/milvus/pull/35925))
- Resolved data race in clustering compaction writer ([#35958](https://github.com/milvus-io/milvus/pull/35958))
- Fixed variable reference after move operation ([#35904](https://github.com/milvus-io/milvus/pull/35904))
- Implemented clustering key skip load behavior check ([#35899](https://github.com/milvus-io/milvus/pull/35899))
- Ensured single startup of querycoord observers in 2.4 ([#35817](https://github.com/milvus-io/milvus/pull/35817))

### Improvements

- Upgraded Milvus & proto version to 2.4.11 ([#36069](https://github.com/milvus-io/milvus/pull/36069))
- Addressed memory leak in unit tests and enable use_asan option for unittest builds ([#35857](https://github.com/milvus-io/milvus/pull/35857))
- Adjusted l0segmentsrowcount limits to more appropriate values ([#36015](https://github.com/milvus-io/milvus/pull/36015))
- Modified deltalog memory estimation factor to one ([#36035](https://github.com/milvus-io/milvus/pull/36035))
- Implemented slicesetequal for load field list comparisons ([#36062](https://github.com/milvus-io/milvus/pull/36062))
- Reduced log frequency for delete operations ([#35981](https://github.com/milvus-io/milvus/pull/35981))
- Upgraded etcd version to 3.5.14 ([#35977](https://github.com/milvus-io/milvus/pull/35977))
- Optimized mmap-rss reduction after warmup ([#35965](https://github.com/milvus-io/milvus/pull/35965))
- Removed cooling off period in rate limiter for read requests ([#35936](https://github.com/milvus-io/milvus/pull/35936))
- Enhanced load field checking for previously loaded collections ([#35910](https://github.com/milvus-io/milvus/pull/35910))
- Added support for dropping roles related to privilege lists in 2.4 ([#35863](https://github.com/milvus-io/milvus/pull/35863))
- Implemented depguard rules to prohibit deprecated proto library usage ([#35818](https://github.com/milvus-io/milvus/pull/35818))

### Others

- Updated Knowhere version ([#36067](https://github.com/milvus-io/milvus/pull/36067))

## v2.4.10

Release Date: August 30, 2024

| Milvus version | Python SDK version | Java SDK version | Node.js SDK version |
|----------------|--------------------|------------------|---------------------|
| 2.4.10         | 2.4.6              | 2.4.3            | 2.4.6               |

Milvus 2.4.10 introduces significant improvements in functionality and stability. Key features include support for upsert operations on AutoID-enabled collections, partial collection loading capabilities, and various memory-mapped (MMAP) configurations to optimize memory usage. This release also addresses several bugs causing panics, core dumps, and resource leaks. We recommend upgrading to take full advantage of these improvements.

### Features

- **Upsert with Auto ID**: Support for upsert operations with automatic ID generation ([#34633](https://github.com/milvus-io/milvus/pull/34633))
- **Field Partial Load Collection** [Beta Preview]: Allows loading specific fields of a collection ([#35696](https://github.com/milvus-io/milvus/pull/35696))
- **RBAC Enhancements**:
  - Added RBAC message support for Change Data Capture (CDC) ([#35562](https://github.com/milvus-io/milvus/pull/35562))
  - Introduced readonly/readwrite/admin privilege groups to simplify RBAC grant process ([#35543](https://github.com/milvus-io/milvus/pull/35543))
  - New API for backing up and restoring RBAC configurations ([#35513](https://github.com/milvus-io/milvus/pull/35513))
  - Refresh proxy cache after restoring RBAC metadata ([#35636](https://github.com/milvus-io/milvus/pull/35636))
- **Improved MMAP Configuration**: More general configuration options to control MMAP behavior ([#35609](https://github.com/milvus-io/milvus/pull/35609))
- **Database Access Restrictions**: New properties to restrict read access to databases ([#35754](https://github.com/milvus-io/milvus/pull/35754))

### Bug fixes

- Fixed Arrow Go client don't return error issue ([#35820](https://github.com/milvus-io/milvus/pull/35820))
- Corrected inaccurate rate limiting ([#35700](https://github.com/milvus-io/milvus/pull/35700))
- Resolved proxy panic after import-related API failures ([#35559](https://github.com/milvus-io/milvus/pull/35559))
- Fixed potential mistaken deletions during GC channel checkpoints ([#35708](https://github.com/milvus-io/milvus/pull/35708))
- Addressed panic due to empty candidate import segments ([#35674](https://github.com/milvus-io/milvus/pull/35674))
- Corrected mmap memory deallocation ([#35726](https://github.com/milvus-io/milvus/pull/35726))
- Ensured proper channel watching for upgrades from 2.2 to 2.4 ([#35695](https://github.com/milvus-io/milvus/pull/35695))
- Fixed DataNode unwatching channel release function ([#35657](https://github.com/milvus-io/milvus/pull/35657))
- Corrected partition count in RootCoord metadata ([#35601](https://github.com/milvus-io/milvus/pull/35601))
- Resolved issues with dynamic config updates for certain parameters ([#35637](https://github.com/milvus-io/milvus/pull/35637))

### Improvements

#### Performance

- Optimized retrieval on dynamic fields ([#35602](https://github.com/milvus-io/milvus/pull/35602))
- Improved bitset performance for AVX512 ([#35480](https://github.com/milvus-io/milvus/pull/35480))
- Re-read value after `once` initialization for better efficiency ([#35643](https://github.com/milvus-io/milvus/pull/35643))

#### Rolling upgrade improvements

- Marked query node as read-only after suspended ([#35586](https://github.com/milvus-io/milvus/pull/35586))
- Prevented coexistence of old coordinator with new node/proxy ([#35760](https://github.com/milvus-io/milvus/pull/35760))

#### Others

- Optimized Milvus core building process ([#35660](https://github.com/milvus-io/milvus/pull/35660))
- Updated to protobuf-go v2 ([#35555](https://github.com/milvus-io/milvus/pull/35555))
- Enhanced tracing with hex string encoding for traceid and spanid ([#35568](https://github.com/milvus-io/milvus/pull/35568))
- Added hit segment number metrics for query hook ([#35619](https://github.com/milvus-io/milvus/pull/35619))
- Improved compatibility with old SDK for configure load param feature ([#35573](https://github.com/milvus-io/milvus/pull/35573))
- Added support for HTTP v1/v2 throttling ([#35504](https://github.com/milvus-io/milvus/pull/35504))
- Fixed index memory estimation ([#35670](https://github.com/milvus-io/milvus/pull/35670))
- Ability to write multiple segments in mix compactor to avoid large segment generation ([#35648](https://github.com/milvus-io/milvus/pull/35648))

## v2.4.9

Release Date: August 20, 2024

| Milvus version | Python SDK version | Java SDK version    | Node.js SDK version |
|----------------|--------------------| --------------------| --------------------|
| 2.4.9          | 2.4.5              | 2.4.3               | 2.4.4               |

Milvus v2.4.9 addresses a critical issue which could return results less than limit (topk) in some corner cases and includes several key improvements to enhance the performance and usability of the platform.

### Critical fixes

- Excluded l0 segment from readable snapshot ([#35510](https://github.com/milvus-io/milvus/pull/35510)).


### Improvements

- Removed duplicated schema helper creation in the proxy ([#35502](https://github.com/milvus-io/milvus/pull/35502)).
- Added support for compiling Milvus on Ubuntu 20.04 ([#35457](https://github.com/milvus-io/milvus/pull/35457)).
- Optimized the use of locks and avoided double flush clustering buffer writer ([#35490](https://github.com/milvus-io/milvus/pull/35490)).
- Removed the invalid log ([#35473](https://github.com/milvus-io/milvus/pull/35473)).
- Added a clustering compaction user guide doc ([#35428](https://github.com/milvus-io/milvus/pull/35428)).
- Added support for dynamic fields in the schema helper ([#35469](https://github.com/milvus-io/milvus/pull/35469)).
- Added the msgchannel section in the generated YAML ([#35466](https://github.com/milvus-io/milvus/pull/35466)).


## v2.4.8

Release Date: August 14, 2024

| Milvus version | Python SDK version | Java SDK version    | Node.js SDK version |
|----------------|--------------------| --------------------| --------------------|
| 2.4.8          | 2.4.5              | 2.4.3               | 2.4.4               |

Milvus 2.4.8 introduced several significant improvements to the system's performance and stability. The most notable feature was the implementation of clustering compaction, a mechanism that enhances search and query efficiency by redistributing data in large collections based on a designated clustering key, reducing the amount of data scanned. Compaction was also decoupled from the shard DataNode, allowing any DataNode to perform compaction independently, which improved fault tolerance, stability, performance, and scalability. Additionally, the interface between the Go and C++ components was refactored to use asynchronous CGO calls, addressing issues like session timeouts, while several other performance optimizations were made based on profiling. The application dependencies were also updated to address known security vulnerabilities. Moreover, this release also includes numerous performance optimizations and critical bug fixes.

### Features

- Implemented clustering compaction, allowing data to be redistributed based on a designated clustering key to enhance query efficiency ([#34326](https://github.com/milvus-io/milvus/pull/34326)), ([#34363](https://github.com/milvus-io/milvus/pull/34363)).

### Improvements

- Implemented asynchronous search and retrieval capabilities in CGO. ([#34200](https://github.com/milvus-io/milvus/pull/34200))
- Separated the compaction process from the Shard DataNode to improve system modularity. ([#34157](https://github.com/milvus-io/milvus/pull/34157))
- Added support for client pooling in QueryNode within the proxy/delegator to enhance performance. ([#35195](https://github.com/milvus-io/milvus/pull/35195))
- Integrated Sonic to minimize CPU overhead during JSON marshaling and unmarshaling in Gin and RestfulV1 handlers. ([#35018](https://github.com/milvus-io/milvus/pull/35018))
- Introduced an in-memory cache to optimize authentication result retrieval. ([#35272](https://github.com/milvus-io/milvus/pull/35272))
- Modified the default metric type for autoindex. [[#34277](https://github.com/milvus-io/milvus/pull/34277), [#34479](https://github.com/milvus-io/milvus/pull/34479)]
- Refactored the runtime memory format for variable columns, leading to reduced memory usage. [[#34367](https://github.com/milvus-io/milvus/pull/34367), [#35012](https://github.com/milvus-io/milvus/pull/35012), [#35041](https://github.com/milvus-io/milvus/pull/35041)]
- Refactored compaction processes to enable persistent data storage. ([#34268](https://github.com/milvus-io/milvus/pull/34268))
- Enabled memory-mapped file support for growing segments, improving memory management. ([#34110](https://github.com/milvus-io/milvus/pull/34110))
- Improved access logs by adding RESTful API support, logging consistency levels, and distinguishing between system and user errors. [[#34295](https://github.com/milvus-io/milvus/pull/34295), [#34352](https://github.com/milvus-io/milvus/pull/34352), [#34396](https://github.com/milvus-io/milvus/pull/34396)]
- Utilized the new `range_search_k` parameter in Knowhere to speed up range searches. ([#34709](https://github.com/milvus-io/milvus/pull/34709))
- Applied blocked Bloom filters to enhance the speed of filter construction and querying. [[#34377](https://github.com/milvus-io/milvus/pull/34377), [#34922](https://github.com/milvus-io/milvus/pull/34922)]
- Memory Usage Improvements: 
  - Pre-allocated space for DataNode insert buffers. ([#34205](https://github.com/milvus-io/milvus/pull/34205))
  - Pre-allocated `FieldData` for Reduce operations. ([#34254](https://github.com/milvus-io/milvus/pull/34254))
  - Released records in delete codec to prevent memory leaks. ([#34506](https://github.com/milvus-io/milvus/pull/34506))
  - Controlled concurrency level of the disk file manager during file loading. ([#35282](https://github.com/milvus-io/milvus/pull/35282))
  - Optimized Go runtime garbage collection logic for timely memory release. ([#34950](https://github.com/milvus-io/milvus/pull/34950))
  - Implemented a new seal policy for growing segments. ([#34779](https://github.com/milvus-io/milvus/pull/34779))
- DataCoord Enhancements: 
  - Reduced CPU usage. [[#34231](https://github.com/milvus-io/milvus/pull/34231), [#34309](https://github.com/milvus-io/milvus/pull/34309)]
  - Implemented faster garbage collection exit logic. ([#35051](https://github.com/milvus-io/milvus/pull/35051))
  - Improved worker node scheduling algorithms. ([#34382](https://github.com/milvus-io/milvus/pull/34382))
  - Enhanced segment size control algorithm specifically for import operations. ([#35149](https://github.com/milvus-io/milvus/pull/35149))
- Load Balancing Algorithm Improvements: 
  - Reduced the memory overload factor on the delegator. ([#35164](https://github.com/milvus-io/milvus/pull/35164))
  - Allocated fixed memory size for the delegator. ([#34600](https://github.com/milvus-io/milvus/pull/34600))
  - Avoided excessive allocation of segments and channels for new query nodes. ([#34245](https://github.com/milvus-io/milvus/pull/34245))
  - Reduced the number of tasks per scheduling cycle by Query Coordinator while increasing scheduling frequency. ([#34987](https://github.com/milvus-io/milvus/pull/34987))
  - Enhanced channel balancing algorithm on the DataNode. ([#35033](https://github.com/milvus-io/milvus/pull/35033))
- Expanded System Metrics: Added new metrics across various components to monitor specific aspects including:
  - Force-deny-writing state. ([#34989](https://github.com/milvus-io/milvus/pull/34989))
  - Queue latency. ([#34788](https://github.com/milvus-io/milvus/pull/34788))
  - Disk quota. ([#35306](https://github.com/milvus-io/milvus/pull/35306))
  - Task execution time. ([#35141](https://github.com/milvus-io/milvus/pull/35141))
  - Binlog size. ([#35235](https://github.com/milvus-io/milvus/pull/35235))
  - Insert rate. ([#35188](https://github.com/milvus-io/milvus/pull/35188))
  - Memory high water level. ([#35188](https://github.com/milvus-io/milvus/pull/35188))
  - RESTful API metrics. ([#35083](https://github.com/milvus-io/milvus/pull/35083))
  - Search latency. ([#34783](https://github.com/milvus-io/milvus/pull/34783))

### Changes

- For open-source users, this version changes the metric types in AutoIndex for `FloatVector` and `BinaryVector` to `Cosine` and `Hamming`, respectively.

- **Fixed Third-Party Dependency Versions**: 
  - This release introduces fixed versions for certain third-party dependency libraries, significantly enhancing Milvus's software supply chain management. 
  - By isolating the project from upstream changes, it safeguards daily builds from potential disruptions. 
  - The update ensures stability by exclusively hosting validated C++ third-party packages on JFrog Cloud and utilizing Conan Recipe Revisions (RREV). 
  - This approach mitigates the risk of breaking changes from updates in ConanCenter.
  - Developers using Ubuntu 22.04 will benefit immediately from these changes. However, developers on other operating systems may need to upgrade their `glibc` version to avoid compatibility issues.

### Critical bug fixes

- Fixed an issue where deletion data was lost due to segments being omitted during L0 compaction. [[#33980](https://github.com/milvus-io/milvus/pull/33980), [#34363](https://github.com/milvus-io/milvus/pull/34363)]
- Rectified a problem where delete messages failed to be forwarded due to incorrect data scope handling. ([#35313](https://github.com/milvus-io/milvus/pull/35313))
- Resolved a SIGBUS exception that occurred due to incorrect usage of `mmap`. [[#34455](https://github.com/milvus-io/milvus/pull/34455), [#34530](https://github.com/milvus-io/milvus/pull/34530)]
- Fixed crashes caused by illegal search expressions. ([#35307](https://github.com/milvus-io/milvus/pull/35307))
- Corrected an issue where DataNode watch failed due to an incorrect timeout setting in the watch context. ([#35017](https://github.com/milvus-io/milvus/pull/35017))

### Bug fixes

- Addressed security vulnerabilities by upgrading certain dependencies. [[#33927](https://github.com/milvus-io/milvus/pull/33927), [#34693](https://github.com/milvus-io/milvus/pull/34693)]
- Fixed a parsing error triggered by excessively long expressions. ([#34957](https://github.com/milvus-io/milvus/pull/34957))
- Resolved a memory leak that occurred during query plan parsing. ([#34932](https://github.com/milvus-io/milvus/pull/34932))
- Fixed an issue where dynamic log level modifications were not taking effect. ([#34777](https://github.com/milvus-io/milvus/pull/34777))
- Resolved an issue where group by queries on growing data failed due to uninitialized segment offsets. ([#34750](https://github.com/milvus-io/milvus/pull/34750))
- Corrected the setting of search parameters when using the Knowhere iterator. ([#34732](https://github.com/milvus-io/milvus/pull/34732))
- Revised the logic for checking the status of the partition load. ([#34305](https://github.com/milvus-io/milvus/pull/34305))
- Fixed an issue where privilege cache updates failed due to unhandled request errors. ([#34697](https://github.com/milvus-io/milvus/pull/34697))
- Resolved a failure in loaded collection recovery after QueryCoord restarted. ([#35211](https://github.com/milvus-io/milvus/pull/35211))
- Fixed an issue of load idempotence by removing unnecessary index parameter validation. ([#35179](https://github.com/milvus-io/milvus/pull/35179))
- Ensured `compressBinlog` is executed to allow `reloadFromKV` to properly fill binlog's `logID` after DataCoord restarts. ([#34062](https://github.com/milvus-io/milvus/pull/34062))
- Fixed an issue where collection metadata was not removed after garbage collection in DataCoord. ([#34884](https://github.com/milvus-io/milvus/pull/34884))
- Resolved a memory leak in SegmentManager within DataCoord by removing flushed segments generated through imports. ([#34651](https://github.com/milvus-io/milvus/pull/34651))
- Fixed a panic issue when compaction was disabled and a collection was dropped. ([#34206](https://github.com/milvus-io/milvus/pull/34206))
- Fixed an out-of-memory issue in DataNode by enhancing the memory usage estimation algorithm. ([#34203](https://github.com/milvus-io/milvus/pull/34203))
- Prevented burst memory usage when multiple vector retrieval requests hit a cache miss by implementing singleflight for chunk cache. ([#34283](https://github.com/milvus-io/milvus/pull/34283))
- Captured `ErrKeyNotFound` during CAS (Compare and Swap) operations in the configuration. ([#34489](https://github.com/milvus-io/milvus/pull/34489))
- Fixed an issue where configuration updates failed due to mistakenly using the formatted value in a CAS operation. ([#34373](https://github.com/milvus-io/milvus/pull/34373))

### Miscellaneous

- Added support for the OTLP HTTP exporter, enhancing observability and monitoring capabilities. [[#35073](https://github.com/milvus-io/milvus/pull/35073), [#35299](https://github.com/milvus-io/milvus/pull/35299)]
- Enhanced database functionality by introducing properties such as "max collections" and "disk quota," which can now be dynamically modified. [[#34511](https://github.com/milvus-io/milvus/pull/34511), [#34386](https://github.com/milvus-io/milvus/pull/34386)]
- Added tracing capabilities for L0 compaction processes within DataNode to improve diagnostics and monitoring. ([#33898](https://github.com/milvus-io/milvus/pull/33898))
- Introduced quota configuration for the number of L0 segment entries per collection, enabling better control over deletion rates by applying backpressure. ([#34837](https://github.com/milvus-io/milvus/pull/34837))
- Extended the rate-limiting mechanism for insert operations to also cover upsert operations, ensuring consistent performance under high load. ([#34616](https://github.com/milvus-io/milvus/pull/34616))
- Implemented a dynamic CGO pool for proxy CGO calls, optimizing resource usage and performance. ([#34842](https://github.com/milvus-io/milvus/pull/34842))
- Enabled the DiskAnn compile option for Ubuntu, Rocky, and Amazon operating systems, improving compatibility and performance on these platforms. ([#34244](https://github.com/milvus-io/milvus/pull/34244))
- Upgraded Conan to version 1.64.1, ensuring compatibility with the latest features and improvements. ([#35216](https://github.com/milvus-io/milvus/pull/35216))
- Updated Knowhere to version 2.3.7, bringing in performance enhancements and new features. ([#34709](https://github.com/milvus-io/milvus/pull/34709))
- Fixed the revision of specific third-party packages to ensure consistent builds and reduce the risk of unexpected changes. ([#35316](https://github.com/milvus-io/milvus/pull/35316))

## v2.4.6

Release date: July 16, 2024

| Milvus version | Python SDK version | Java SDK version    | Node.js SDK version |
|----------------|--------------------| --------------------| --------------------|
| 2.4.6          | 2.4.4              | 2.4.2               | 2.4.4               |

Milvus v2.4.6 is a bug-fix release that addresses critical issues such as panics, memory leaks, and data loss during deletions. It also introduces several optimizations, including enhancements to monitoring metrics, upgrading the Go version to 1.21, and improving the user experience for RESTful count(*) queries.

### Improvements

- Enhanced the user-friendliness of RESTful API queries ([#34444](https://github.com/milvus-io/milvus/pull/34444)).
- Upgraded the Go version from 1.20 to 1.21 ([#33940](https://github.com/milvus-io/milvus/pull/33940)).
- Optimized the histogram metric bucket for finer granularity in bucketing ([#34592](https://github.com/milvus-io/milvus/pull/34592)).
- Upgraded Pulsar dependency version from 2.8.2 to 2.9.5. It's recommended to upgrade Pulsar to 2.9.5 since Milvus 2.4.6.

### Bug fixes

- Fixed an issue where the GetReplicas API returned a nil status ([#34019](https://github.com/milvus-io/milvus/pull/34019)).
- Corrected a problem where queries could return deleted records ([#34502](https://github.com/milvus-io/milvus/pull/34502)).
- Resolved an issue where IndexNode would get stuck during stopping due to incorrect lifetime control ([#34559](https://github.com/milvus-io/milvus/pull/34559)).
- Fixed a memory leak of primary key oracle objects when a worker is offline ([#34020](https://github.com/milvus-io/milvus/pull/34020)).
- Corrected ChannelManagerImplV2 to notify the correct Node, addressing parameter capture issues in loop closure ([#34004](https://github.com/milvus-io/milvus/pull/34004)).
- Fixed a read-write data race in ImportTask segmentsInfo by implementing a deep copy ([#34126](https://github.com/milvus-io/milvus/pull/34126)).
- Corrected version information for the "legacyVersionWithoutRPCWatch" configuration option to prevent errors during rolling upgrades ([#34185](https://github.com/milvus-io/milvus/pull/34185)).
- Fixed the metric for the number of partitions loaded ([#34195](https://github.com/milvus-io/milvus/pull/34195)).
- Passed the `otlpSecure` config when setting up segcore tracing ([#34210](https://github.com/milvus-io/milvus/pull/34210)).
- Fixed an issue where DataCoord's properties were overwritten by mistake ([#34240](https://github.com/milvus-io/milvus/pull/34240)).
- Resolved a data loss issue caused by erroneously merging two newly created message streams ([#34563](https://github.com/milvus-io/milvus/pull/34563)).
- Fixed a panic caused by msgstream trying to consume an invalid pchannel ([#34230](https://github.com/milvus-io/milvus/pull/34230)).
- Addressed an issue where imports could generate orphaned files ([#34071](https://github.com/milvus-io/milvus/pull/34071)).
- Fixed incomplete query results due to duplicate primary keys in a segment ([#34302](https://github.com/milvus-io/milvus/pull/34302)).
- Resolved an issue of missing sealed segments in L0 compaction ([#34566](https://github.com/milvus-io/milvus/pull/34566)).
- Fixed the problem of dirty data in the channel-cp meta generated after garbage collection ([#34609](https://github.com/milvus-io/milvus/pull/34609)).
- Corrected the metrics where database_num was 0 after restarting RootCoord ([#34010](https://github.com/milvus-io/milvus/pull/34010)).
- Fixed a memory leak in SegmentManager in DataCoord by removing flushed segments generated through import ([#34652](https://github.com/milvus-io/milvus/pull/34652)).
- Ensured compressBinlog to fill binlogs' logID after DataCoord restarts, ensuring proper reload from KV ([#34064](https://github.com/milvus-io/milvus/pull/34064)).

## v2.4.5

Release date: June 18, 2024

| Milvus version | Python SDK version | Java SDK version    | Node.js SDK version |
|----------------|--------------------| --------------------| --------------------|
| 2.4.5          | 2.4.4              | 2.4.1               | 2.4.3               |

The release of Milvus 2.4.5 introduces several improvements and bug fixes to enhance performance, stability, and functionality. Milvus 2.4.5 simplifies sparse, float16, and bfloat16 vector search with auto-indexing, speeds up searches, deletions, and compactions with Bloom filter optimizations, and tackles data management through faster loading times and import L0 segment support. It also introduces the sparse HNSW index for efficient high-dimensional sparse data search, enhances the RESTful API with sparse float vector support, and fixes critical bugs for better stability.

### New Features

- Added rbac support to describe/alter database api ([#33804](https://github.com/milvus-io/milvus/pull/33804))
- Supported building the HNSW index for sparse vectors ([#33653](https://github.com/milvus-io/milvus/pull/33653), [#33662](https://github.com/milvus-io/milvus/pull/33662))
- Supported building the Disk index for binary vector ([#33575](https://github.com/milvus-io/milvus/pull/33575))
- Supported sparse vector type on RESTful v2 ([#33555](https://github.com/milvus-io/milvus/pull/33555))
- Add /management/stop RESTful api to stop a component ([#33799](https://github.com/milvus-io/milvus/pull/33799))

### Improvements

- Set maxPartitionNum default value to 1024 ([#33950](https://github.com/milvus-io/milvus/pull/33950))
- Enabled to Force reset connection for unavailable error ([#33910](https://github.com/milvus-io/milvus/pull/33910))
- Enabled flush rate limiter of collection level ([#33864](https://github.com/milvus-io/milvus/pull/33864))
- Executed bloom filter apply in parallel to speed up segment predict ([#33793](https://github.com/milvus-io/milvus/pull/33793))
- Used fastjson lib for unmarshal delete log to speed up json.Unmarshal([#33802](https://github.com/milvus-io/milvus/pull/33802))
- Used BatchPkExist to reduce bloom filter func call cost ([#33752](https://github.com/milvus-io/milvus/pull/33752))
- Speeded up the loading of small collections ([#33746](https://github.com/milvus-io/milvus/pull/33746))
- Supported import delete data to L0 segment  ([#33712](https://github.com/milvus-io/milvus/pull/33712))
- Skipped mark compaction tasks to be timeouted to aviod executing the same task over and over again ([#33833](https://github.com/milvus-io/milvus/pull/33833))
- Handled float16 and bfloat16 vectors as same as BinaryVector in numpy bulk insert  ([#33788](https://github.com/milvus-io/milvus/pull/33788))
- Added the includeCurrentMsg flag for the seek method ([#33743](https://github.com/milvus-io/milvus/pull/33743))
- Added mergeInterval, targetBufSize, maxTolerantLagof msgdispatcher to configs ([#33680](https://github.com/milvus-io/milvus/pull/33680))
- Improved GetVectorByID of sparse vector ([#33652](https://github.com/milvus-io/milvus/pull/33652))
- Removed StringPrimarykey to reduce unnecessary copy and function call cost  ([#33649](https://github.com/milvus-io/milvus/pull/33649))
- Added autoindex mapping for binary/sparse data type ([#33625](https://github.com/milvus-io/milvus/pull/33625))
- Optimized some cache to reduce memory usage ([#33560](https://github.com/milvus-io/milvus/pull/33560))
- Abstracted execute interface for import/preimport task  ([#33607](https://github.com/milvus-io/milvus/pull/33607))
- Used map pk to timestamp in buffer insert to reduce bf causes ([#33582](https://github.com/milvus-io/milvus/pull/33582))
- Avoided redundant meta operations of import  ([#33519](https://github.com/milvus-io/milvus/pull/33519))
- Improve logs by logging better disk quota info,  adding UseDefaultConsistency flag, removing unnecessary logs ([#33597](https://github.com/milvus-io/milvus/pull/33597), [#33644](https://github.com/milvus-io/milvus/pull/33644), [#33670](https://github.com/milvus-io/milvus/pull/33670))

### Bug fixes

- Fixed a bug that queryHook unable to recognize vector type ([#33911](https://github.com/milvus-io/milvus/pull/33911))
- Prevented use captured iteration variable partitionID ([#33970](https://github.com/milvus-io/milvus/pull/33970))
- Fixed a bug that may cause Milvus to be unable to create AutoIndex on binary and sparse vectors ([#33867](https://github.com/milvus-io/milvus/pull/33867))
- Fixed a bug that may cause indexnode to retry creating index on invalid index params of all vectors（[#33878](https://github.com/milvus-io/milvus/pull/33878))
- Fixed the bug that when loads and releases happen concurrently may crash the Server([#33699](https://github.com/milvus-io/milvus/pull/33699))
- Improved cache consistency for configuration values ([#33797](https://github.com/milvus-io/milvus/pull/33797))
- Prevented possible data loss during deletion ([#33821](https://github.com/milvus-io/milvus/pull/33821))
- Ensured the DroppedAt field (likely deletion timestamp) is set after dropping collections([#33767](https://github.com/milvus-io/milvus/pull/33767))
- Fixed an issue that might have caused Milvus to handle binary vector data sizes incorrectly([#33751](https://github.com/milvus-io/milvus/pull/33751))
- Prevented sensitive Kafka credentials from being logged in plain text.([#33694](https://github.com/milvus-io/milvus/pull/33694), [#33747](https://github.com/milvus-io/milvus/pull/33747))
- Ensured Milvus can correctly import data with multiple vector fields.([#33724](https://github.com/milvus-io/milvus/pull/33724))
- Enhanced import reliability by checking if an import job exists before starting. ([#33673](https://github.com/milvus-io/milvus/pull/33673))
- Improved handling of the sparse HNSW index (internal functionality) ([#33714](https://github.com/milvus-io/milvus/pull/33714))
- Cleaned vector memory to avoid memory leak([#33708](https://github.com/milvus-io/milvus/pull/33708))
- Ensured smoother asynchronous warmup by fixing a state lock issue.([#33687](https://github.com/milvus-io/milvus/pull/33687))
- Addressed a bug that might have caused missing results in query iterators. ([#33506](https://github.com/milvus-io/milvus/pull/33506))
- Fixed a bug that might cause import segment size is uneven  ([#33634](https://github.com/milvus-io/milvus/pull/33634))
- Fixed incorrect data size handling for bf16, fp16, and binary vector types ([#33488](https://github.com/milvus-io/milvus/pull/33488))
- Improved stability by addressing potential issues with the L0 compactor([#33564](https://github.com/milvus-io/milvus/pull/33564))
- Ensured dynamic configuration updates are reflected correctly in the cache. ([#33590](https://github.com/milvus-io/milvus/pull/33590))
- Improved the accuracy of the RootCoordQuotaStates metric  ([#33601](https://github.com/milvus-io/milvus/pull/33601))
- Ensured accurate reporting of the number of loaded entities in metric([#33522](https://github.com/milvus-io/milvus/pull/33522))
- Provided more complete information in exception logs.  ([#33396](https://github.com/milvus-io/milvus/pull/33396))
- Optimized query pipeline by removing unnecessary group checker ([#33485](https://github.com/milvus-io/milvus/pull/33485))
- Used the local storage path for a more accurate disk capacity check on the index node. ([#33505](https://github.com/milvus-io/milvus/pull/33505))
- Corrected hasMoreResult may return false when hit number larger than limit ([#33642](https://github.com/milvus-io/milvus/pull/33642))
- Delayed load bf in delegator to prevent bfs been loaded over and over again when worker has no more memory ([#33650](https://github.com/milvus-io/milvus/pull/33650))- Fixed a bug that queryHook unable to recognize vector type ([#33911](https://github.com/milvus-io/milvus/pull/33911))
- Prevented use captured iteration variable partitionID ([#33970](https://github.com/milvus-io/milvus/pull/33970))
- Fixed a bug that may cause Milvus to be unable to create AutoIndex on binary and sparse vectors ([#33867](https://github.com/milvus-io/milvus/pull/33867))
- Fixed a bug that may cause indexnode to retry creating index on invalid index params of all vectors（[#33878](https://github.com/milvus-io/milvus/pull/33878))
- Fixed the bug that when loads and releases happen concurrently may crash the Server([#33699](https://github.com/milvus-io/milvus/pull/33699))
- Improved cache consistency for configuration values ([#33797](https://github.com/milvus-io/milvus/pull/33797))
- Prevented possible data loss during deletion ([#33821](https://github.com/milvus-io/milvus/pull/33821))
- Ensured the DroppedAt field (likely deletion timestamp) is set after dropping collections([#33767](https://github.com/milvus-io/milvus/pull/33767))
- Fixed an issue that might have caused Milvus to handle binary vector data sizes incorrectly([#33751](https://github.com/milvus-io/milvus/pull/33751))
- Prevented sensitive Kafka credentials from being logged in plain text.([#33694](https://github.com/milvus-io/milvus/pull/33694), [#33747](https://github.com/milvus-io/milvus/pull/33747))
- Ensured Milvus can correctly import data with multiple vector fields.([#33724](https://github.com/milvus-io/milvus/pull/33724))
- Enhanced import reliability by checking if an import job exists before starting. ([#33673](https://github.com/milvus-io/milvus/pull/33673))
- Improved handling of the sparse HNSW index (internal functionality) ([#33714](https://github.com/milvus-io/milvus/pull/33714))
- Cleaned vector memory to avoid memory leak([#33708](https://github.com/milvus-io/milvus/pull/33708))
- Ensured smoother asynchronous warmup by fixing a state lock issue.([#33687](https://github.com/milvus-io/milvus/pull/33687))
- Addressed a bug that might have caused missing results in query iterators. ([#33506](https://github.com/milvus-io/milvus/pull/33506))
- Fixed a bug that might cause import segment size is uneven  ([#33634](https://github.com/milvus-io/milvus/pull/33634))
- Fixed incorrect data size handling for bf16, fp16, and binary vector types ([#33488](https://github.com/milvus-io/milvus/pull/33488))
- Improved stability by addressing potential issues with the L0 compactor([#33564](https://github.com/milvus-io/milvus/pull/33564))
- Ensured dynamic configuration updates are reflected correctly in the cache. ([#33590](https://github.com/milvus-io/milvus/pull/33590))
- Improved the accuracy of the RootCoordQuotaStates metric  ([#33601](https://github.com/milvus-io/milvus/pull/33601))
- Ensured accurate reporting of the number of loaded entities in metric([#33522](https://github.com/milvus-io/milvus/pull/33522))
- Provided more complete information in exception logs.  ([#33396](https://github.com/milvus-io/milvus/pull/33396))
- Optimized query pipeline by removing unnecessary group checker ([#33485](https://github.com/milvus-io/milvus/pull/33485))
- Used the local storage path for a more accurate disk capacity check on the index node. ([#33505](https://github.com/milvus-io/milvus/pull/33505))
- Corrected hasMoreResult may return false when hit number larger than limit ([#33642](https://github.com/milvus-io/milvus/pull/33642))
- Delayed load bf in delegator to prevent bfs been loaded over and over again when worker has no more memory ([#33650](https://github.com/milvus-io/milvus/pull/33650))

## v2.4.4

Release date: May 31, 2024

| Milvus version | Python SDK version | Java SDK version    | Node.js SDK version |
|----------------|--------------------| --------------------| --------------------|
| 2.4.4          | 2.4.3              | 2.4.1               | 2.4.2               |

Milvus v2.4.4 includes several critical bug fixes and improvements aimed at enhancing performance and stability. Notably, we've **resolved a critical issue where bulk insert statistics logs were incorrectly garbage collected**, potentially affecting data integrity. **We strongly recommend all v2.4 users upgrade to this version to benefit from these fixes.**

**If you are using bulk insert, upgrade to v2.4.4 at the earliest opportunity for data integrity.**

### Critical bug fixes

- Filled stats log ID and validated its correctness ([#33478](https://github.com/milvus-io/milvus/pull/33478))

### Improvements

- Upgraded bitset for ARM SVE ([#33440](https://github.com/milvus-io/milvus/pull/33440))
- Enabled Milvus compilation with GCC-13 ([#33441](https://github.com/milvus-io/milvus/pull/33441))

### Bug fixes

- Displayed empty collections when all privilege is granted ([#33454](https://github.com/milvus-io/milvus/pull/33454))
- Ensured CMake downloads and installs for the current platform, not just x86_64 ([#33439](https://github.com/milvus-io/milvus/pull/33439))

## v2.4.3

Release date: May 29, 2024

| Milvus version | Python SDK version | Java SDK version    | Node.js SDK version |
|----------------|--------------------| --------------------| --------------------|
| 2.4.3          | 2.4.3              | 2.4.1               | 2.4.2               |

Milvus version 2.4.3 introduced a host of features, improvements, and bug fixes to elevate performance and reliability. Notable enhancements included support for sparse float vector bulk insert and optimized bloom filter acceleration. Improvements covered various areas, from dynamic configuration updates to memory usage optimization. Bug fixes addressed critical issues like panic scenarios and ensured smoother system operations. This release underscored Milvus's ongoing commitment to enhancing functionality, optimizing performance, and delivering a robust user experience.

### Features

- Supported sparse float vector bulk insert for binlog/json/parquet ([#32649](https://github.com/milvus-io/milvus/pull/32649))

### Improvements

- Implemented Datacoord/node watch channel based on RPC ([#32036](https://github.com/milvus-io/milvus/pull/32036))
- Optimized bloom filter to accelerate delete filtering ([#32642](https://github.com/milvus-io/milvus/pull/32642), [#33329](https://github.com/milvus-io/milvus/pull/33329), [#33284](https://github.com/milvus-io/milvus/pull/33284))
- Loaded raw data via mmap if scalar index did not have raw data ([#33317](https://github.com/milvus-io/milvus/pull/33317))
- Synced milvus config to milvus.yaml ([#33322](https://github.com/milvus-io/milvus/pull/33322), [#32920](https://github.com/milvus-io/milvus/pull/32920), [#32857](https://github.com/milvus-io/milvus/pull/32857), [#32946](https://github.com/milvus-io/milvus/pull/32946))
- Updated knowhere version ([#33310](https://github.com/milvus-io/milvus/pull/33310), [#32931](https://github.com/milvus-io/milvus/pull/32931), [#33043](https://github.com/milvus-io/milvus/pull/33043))
- Enabled dynamic updating of balancer policy in QueryCoord ([#33272](https://github.com/milvus-io/milvus/pull/33272))
- Used a pre-built logger in the write buffer to minimize logger allocation ([#33304](https://github.com/milvus-io/milvus/pull/33304))
- Improved parameter checking ([#32777](https://github.com/milvus-io/milvus/pull/32777), [#33271](https://github.com/milvus-io/milvus/pull/33271), [#33218](https://github.com/milvus-io/milvus/pull/33218))
- Added a parameter to ignore incorrect message IDs in the checkpoint ([#33249](https://github.com/milvus-io/milvus/pull/33249))
- Added config to control initialization failure handling for plugins ([#32680](https://github.com/milvus-io/milvus/pull/32680))
- Added score compute consistency config for knowhere ([#32997](https://github.com/milvus-io/milvus/pull/32997))
- Introduced a configuration option to control the initialization of public role permissions ([#33174](https://github.com/milvus-io/milvus/pull/33174))
- Optimized memory usage when reading fields ([#33196](https://github.com/milvus-io/milvus/pull/33196))
- Refined implementation of Channel Manager v2 ([#33172](https://github.com/milvus-io/milvus/pull/33172), [#33121](https://github.com/milvus-io/milvus/pull/33121), [#33014](https://github.com/milvus-io/milvus/pull/33014))
- Added feature to track the size of data in memory for binlog ([#33025](https://github.com/milvus-io/milvus/pull/33025))
- Added metrics for segment index files size ([#32979](https://github.com/milvus-io/milvus/pull/32979), [#33305](https://github.com/milvus-io/milvus/pull/33305))
- Replaced Delete with DeletePartialMatch to remove metrics ([#33029](https://github.com/milvus-io/milvus/pull/33029))
- Got related data size according to segment type ([#33017](https://github.com/milvus-io/milvus/pull/33017))
- Cleaned channel node info in meta store ([#32988](https://github.com/milvus-io/milvus/pull/32988))
- Removed rootcoord from datanode broker ([#32818](https://github.com/milvus-io/milvus/pull/32818))
- Enabled batch uploading ([#32788](https://github.com/milvus-io/milvus/pull/32788))
- Changed default partition number to 16 when using partition key ([#32950](https://github.com/milvus-io/milvus/pull/32950))
- Improved reduce performance on very large top-k queries ([#32871](https://github.com/milvus-io/milvus/pull/32871))
- Utilized TestLocations ability to accelerate write & compaction ([#32948](https://github.com/milvus-io/milvus/pull/32948))
- Optimized plan parser pool to avoid unnecessary recycling ([#32869](https://github.com/milvus-io/milvus/pull/32869))
- Improved load speed ([#32898](https://github.com/milvus-io/milvus/pull/32898))
- Used collection default consistency level for restv2 ([#32956](https://github.com/milvus-io/milvus/pull/32956))
- Added cost response for the rest API ([#32620](https://github.com/milvus-io/milvus/pull/32620))
- Enabled channel exclusive balance policy ([#32911](https://github.com/milvus-io/milvus/pull/32911))
- Exposed describedatabase API in proxy ([#32732](https://github.com/milvus-io/milvus/pull/32732))
- Utilized coll2replica mapping when getting RG by collection ([#32892](https://github.com/milvus-io/milvus/pull/32892))
- Added more tracing for search & query ([#32734](https://github.com/milvus-io/milvus/pull/32734))
- Supported dynamic config for opentelemetry trace ([#32169](https://github.com/milvus-io/milvus/pull/32169))
- Avoided iteration over channel results when updating leaderview ([#32887](https://github.com/milvus-io/milvus/pull/32887))
- Optimized vector offsets handling for parquet ([#32822](https://github.com/milvus-io/milvus/pull/32822))
- Improved datacoord segment filtering with collection ([#32831](https://github.com/milvus-io/milvus/pull/32831))
- Adjusted log level and frequency ([#33042](https://github.com/milvus-io/milvus/pull/33042), [#32838](https://github.com/milvus-io/milvus/pull/32838), [#33337](https://github.com/milvus-io/milvus/pull/33337))
- Enabled stopping balance after balance had been suspended ([#32812](https://github.com/milvus-io/milvus/pull/32812))
- Updated shard leader cache when leader location changed ([#32470](https://github.com/milvus-io/milvus/pull/32470))
- Removed deprecated API and field ([#32808](https://github.com/milvus-io/milvus/pull/32808), [#32704](https://github.com/milvus-io/milvus/pull/32704))
- Added metautil.channel to convert string compare to int ([#32749](https://github.com/milvus-io/milvus/pull/32749))
- Added type info for payload writer error message and log when querynode found new collection ([#32522](https://github.com/milvus-io/milvus/pull/32522))
- Checked partition number when creating collection with partition key ([#32670](https://github.com/milvus-io/milvus/pull/32670))
- Removed legacy l0 segment if watch failed ([#32725](https://github.com/milvus-io/milvus/pull/32725))
- Improved printing type of request ([#33319](https://github.com/milvus-io/milvus/pull/33319))
- Checked array field data was nil before getting the type ([#33311](https://github.com/milvus-io/milvus/pull/33311))
- Returned error when startup Delete/AddNode node operation failed ([#33258](https://github.com/milvus-io/milvus/pull/33258))
- Allowed datanode's server ID to be updated ([#31597](https://github.com/milvus-io/milvus/pull/31597))
- Unified querynode metrics cleanup in collection release ([#32805](https://github.com/milvus-io/milvus/pull/32805))
- Fixed scalar auto index config incorrect version ([#32795](https://github.com/milvus-io/milvus/pull/32795))
- Refined index param check for create/alter index ([#32712](https://github.com/milvus-io/milvus/pull/32712))
- Removed redundant replica recovery ([#32985](https://github.com/milvus-io/milvus/pull/32985))
- Enabled channel meta table to write more than 200k segments ([#33300](https://github.com/milvus-io/milvus/pull/33300))

### Bug fixes

- Fixed panic when the database didn't exist in the rate limit interceptor ([#33308](https://github.com/milvus-io/milvus/pull/33308))
- Fixed quotacenter metrics collection failure due to incorrect parameters ([#33399](https://github.com/milvus-io/milvus/pull/33399))
- Fixed panic if processactivestandby returned an error ([#33372](https://github.com/milvus-io/milvus/pull/33372))
- Fixed search result truncation in restful v2 when nq > 1 ([#33363](https://github.com/milvus-io/milvus/pull/33363))
- Added database name field for role operations in restful v2 ([#33291](https://github.com/milvus-io/milvus/pull/33291))
- Fixed global rate limit not working ([#33336](https://github.com/milvus-io/milvus/pull/33336))
- Fixed panic caused by failure of building index ([#33314](https://github.com/milvus-io/milvus/pull/33314))
- Added validation for sparse vector in segcore to ensure legality ([#33312](https://github.com/milvus-io/milvus/pull/33312))
- Removed task from syncmgr after task completion ([#33303](https://github.com/milvus-io/milvus/pull/33303))
- Fixed partition key filtering failure during data import ([#33277](https://github.com/milvus-io/milvus/pull/33277))
- Fixed inability to generate traceID when using noop exporter ([#33208](https://github.com/milvus-io/milvus/pull/33208))
- Improved query results retrieval ([#33179](https://github.com/milvus-io/milvus/pull/33179))
- Marked channel checkpoint dropped to prevent checkpoint lag metrics leakage ([#33201](https://github.com/milvus-io/milvus/pull/33201))
- Fixed query node getting stuck during stopping progress ([#33154](https://github.com/milvus-io/milvus/pull/33154))
- Fixed missing segments in flush response ([#33061](https://github.com/milvus-io/milvus/pull/33061))
- Made submit operation idempotent ([#33053](https://github.com/milvus-io/milvus/pull/33053))
- Allocated new slice for each batch in streaming reader ([#33360](https://github.com/milvus-io/milvus/pull/33360))
- Cleaned offline node from resource group after QueryCoord restart ([#33233](https://github.com/milvus-io/milvus/pull/33233))
- Removed l0 compactor in completedCompactor ([#33216](https://github.com/milvus-io/milvus/pull/33216))
- Reset quota value when initializing the limiter ([#33152](https://github.com/milvus-io/milvus/pull/33152))
- Fixed issue where etcd limit was exceeded ([#33041](https://github.com/milvus-io/milvus/pull/33041))
- Resolved etcd transaction limit exceedance due to too many fields ([#33040](https://github.com/milvus-io/milvus/pull/33040))
- Removed RLock re-entry in GetNumRowsOfPartition ([#33045](https://github.com/milvus-io/milvus/pull/33045))
- Started LeaderCacheObserver before SyncAll ([#33035](https://github.com/milvus-io/milvus/pull/33035))
- Enabled balancing of released standby channel ([#32986](https://github.com/milvus-io/milvus/pull/32986))
- Initialized access logger before server initialization ([#32976](https://github.com/milvus-io/milvus/pull/32976))
- Made compactor capable of clearing empty segments ([#32821](https://github.com/milvus-io/milvus/pull/32821))
- Filled deltalog entry number and time range in l0 compactions ([#33004](https://github.com/milvus-io/milvus/pull/33004))
- Fixed proxy crash due to shard leader cache data race ([#32971](https://github.com/milvus-io/milvus/pull/32971))
- Corrected time unit for load index metric ([#32935](https://github.com/milvus-io/milvus/pull/32935))
- Fixed issue where segment on stopping query node couldn't be released successfully ([#32929](https://github.com/milvus-io/milvus/pull/32929))
- Fixed index resource estimation ([#32842](https://github.com/milvus-io/milvus/pull/32842))
- Set channel checkpoint to delta position ([#32878](https://github.com/milvus-io/milvus/pull/32878))
- Made syncmgr lock key before returning future ([#32865](https://github.com/milvus-io/milvus/pull/32865))
- Ensured inverted index had only one segment ([#32858](https://github.com/milvus-io/milvus/pull/32858))
- Fixed compaction trigger choosing two identical segments ([#32800](https://github.com/milvus-io/milvus/pull/32800))
- Fixed issue where partition name could not be specified in binlog import ([#32730](https://github.com/milvus-io/milvus/pull/32730), [#33027](https://github.com/milvus-io/milvus/pull/33027))
- Made dynamic column optional in parquet import ([#32738](https://github.com/milvus-io/milvus/pull/32738))
- Skipped checking auto ID when inserting data ([#32775](https://github.com/milvus-io/milvus/pull/32775))
- Validated number of rows for insert field data with schema ([#32770](https://github.com/milvus-io/milvus/pull/32770))
- Added Wrapper and Keepalive for CTraceContext IDs ([#32746](https://github.com/milvus-io/milvus/pull/32746))
- Fixed issue where database name was not found in the datacoord meta object ([#33412](https://github.com/milvus-io/milvus/pull/33412))
- Synchronized dropped segment for dropped partition ([#33332](https://github.com/milvus-io/milvus/pull/33332))
- Fixed quotaCenter metrics collection failure due to incorrect parameters ([#33399](https://github.com/milvus-io/milvus/pull/33399))

## v2.4.1

Release date: May 6, 2024

| Milvus version | Python SDK version | Java SDK version    | Node.js SDK version |
|----------------|--------------------| --------------------| --------------------|
| 2.4.1          | 2.4.1              | 2.4.0               | 2.4.2               |

Milvus version 2.4.1 brings numerous improvements and bug fixes that aim to enhance the software's performance, observability, and stability. These improvements include a declarative resource group API, enhanced bulk insert functionality that supports Float16/BFloat16 vector data types, a refined garbage collection (GC) mechanism that reduces list operations for object storage, and other changes related to performance optimizations. Additionally, bug fixes address issues such as compilation errors, failed fuzzy matches on newline characters, incorrect parameter datatypes for RESTful interfaces, and BulkInsert raising errors on numpy files when dynamic fields are enabled.

### Breaking changes

- Discontinued support for delete with an empty filter expression. ([#32472](https://github.com/milvus-io/milvus/pull/32472))

### Features

- Added support for Float16/BFloat16 vector data types in bulk insert ([#32157](https://github.com/milvus-io/milvus/pull/32157))
- Enhanced sparse float vector to support brute force iterator search and range search ([#32635](https://github.com/milvus-io/milvus/pull/32635))

### Improvements

- Added declarative resource group api ([#31930](https://github.com/milvus-io/milvus/pull/31930), [#32297](https://github.com/milvus-io/milvus/pull/32297), [#32536](https://github.com/milvus-io/milvus/pull/32536), [#32666](https://github.com/milvus-io/milvus/pull/32666))
- Rewrote the collection observer in QueryCoord to make it task-driven ([#32441](https://github.com/milvus-io/milvus/pull/32441))
- Refactored the data structure used in the SyncManager of DataNode to reduce memory usage and prevent errors ([#32673](https://github.com/milvus-io/milvus/pull/32673))
- Revised the implementation of garbage collection to minimize list operations associated with object storage ([#31740](https://github.com/milvus-io/milvus/pull/31740))
- Reduced the cpu usage when collection number is high ([#32245](https://github.com/milvus-io/milvus/pull/32245))
- Enhanced the management of milvus.yaml by automatically generating relevant configuration items in the milvus.yaml file through code ([#31832](https://github.com/milvus-io/milvus/pull/31832), [#32357](https://github.com/milvus-io/milvus/pull/32357))
- Enhanced the performance of the Query by retrieving the data after performing local reduction ([#32346](https://github.com/milvus-io/milvus/pull/32346))
- Added WithBlock option for etcd client creation ([#32641](https://github.com/milvus-io/milvus/pull/32641))
- Used client_request_id specified by the client as the TraceID if client provided ([#32264](https://github.com/milvus-io/milvus/pull/32264))
- Added db label to the metrics for the delete and bulk insert operations ([#32611](https://github.com/milvus-io/milvus/pull/32611))
- Added logic to skip the verification through configuration for AutoID and PartitionKey columns ([#32592](https://github.com/milvus-io/milvus/pull/32592))
- Refined errors related to authentication ([#32253](https://github.com/milvus-io/milvus/pull/32253))
- Refined error logs for AllocSegmentID in DataCoord ([#32351](https://github.com/milvus-io/milvus/pull/32351), [#32335](https://github.com/milvus-io/milvus/pull/32335))
- Removed duplicate metrics ([#32380](https://github.com/milvus-io/milvus/pull/32380), [#32308](https://github.com/milvus-io/milvus/pull/32308)) and cleaned up unused metrics ([#32404](https://github.com/milvus-io/milvus/pull/32404), [#32515](https://github.com/milvus-io/milvus/pull/32515))
- Added configuration option to control whether to enforce the activation of the partitionKey feature ([#32433](https://github.com/milvus-io/milvus/pull/32433))
- Added configuration option to control the maximum amount of data that can be inserted in a single request ([#32433](https://github.com/milvus-io/milvus/pull/32433))
- Parallelize the applyDelete operation at the segment level to accelerate the processing of Delete messages by the Delegator ([#32291](https://github.com/milvus-io/milvus/pull/32291))
- Used index ([#32232](https://github.com/milvus-io/milvus/pull/32232), [#32505](https://github.com/milvus-io/milvus/pull/32505), [#32533](https://github.com/milvus-io/milvus/pull/32533), [#32595](https://github.com/milvus-io/milvus/pull/32595)) and add cache ([#32580](https://github.com/milvus-io/milvus/pull/32580)) to accelerate frequent filtering operations in QueryCoord.
- Rewrote the data structure ([#32273](https://github.com/milvus-io/milvus/pull/32273)) and refactored code ([#32389](https://github.com/milvus-io/milvus/pull/32389)) to accelerate common operations in DataCoord.
- Removed openblas from conan ([#32002](https://github.com/milvus-io/milvus/pull/32002))

### Bug fixes

- Fixed build milvus in rockylinux8 ([#32619](https://github.com/milvus-io/milvus/pull/32619))
- Fixed compilation errors for SVE on ARM ([#32463](https://github.com/milvus-io/milvus/pull/32463), [#32270](https://github.com/milvus-io/milvus/pull/32270))
- Fixed the crash issue on ARM-based GPU images ([#31980](https://github.com/milvus-io/milvus/pull/31980))
- Fixed regex query can't handle text with newline ([#32569](https://github.com/milvus-io/milvus/pull/32569))
- Fixed search get empty result caused by GetShardLeaders return empty node list ([#32685](https://github.com/milvus-io/milvus/pull/32685))
- Fixed BulkInsert raised error when encountering dynamic fields in numpy files ([#32596](https://github.com/milvus-io/milvus/pull/32596))
- Fixed bugs related to the RESTFulV2 interface, including an important fix that allows numeric parameters in requests to accept numerical input instead of string type ([#32485](https://github.com/milvus-io/milvus/pull/32485), [#32355](https://github.com/milvus-io/milvus/pull/32355))
- Fixed memory leak in proxy by removing watching config event in rate limiter ([#32313](https://github.com/milvus-io/milvus/pull/32313))
- Fixed the issue where the rate limiter incorrectly reports that the partition cannot be found when partitionName is not specified ([#32647](https://github.com/milvus-io/milvus/pull/32647))
- Added detection between the cases of Collection being in the recovery state and not being loaded in the error type. ([#32447](https://github.com/milvus-io/milvus/pull/32447))
- Corrected the negative queryable num entities metric ([#32361](https://github.com/milvus-io/milvus/pull/32361))


## v2.4.0

Release date: April 17, 2024

| Milvus version | Python SDK version | Node.js SDK version |
|----------------|--------------------| --------------------|
| 2.4.0          | 2.4.0              | 2.4.0               |

We are excited to announce the official launch of Milvus 2.4.- Building upon the solid foundation of the 2.4.0-rc.1 release, we have focused on addressing critical bugs reported by our users, while preserving the existing functionality. In addition, Milvus 2.4.0 introduces a range of optimizations aimed at enhancing system performance, improving observability through the incorporation of various metrics, and streamlining the codebase for increased simplicity.

### Improvements

- Support for MinIO TLS connections ([#31396](https://github.com/milvus-io/milvus/pull/31396), [#31618](https://github.com/milvus-io/milvus/pull/31618))
- AutoIndex support for scalar fields ([#31593](https://github.com/milvus-io/milvus/pull/31593))
- Hybrid search refactoring for consistent execution paths with regular search ([#31742](https://github.com/milvus-io/milvus/pull/31742), [#32178](https://github.com/milvus-io/milvus/pull/32178))
- Accelerated filtering through bitset and bitset_view refactoring ([#31592](https://github.com/milvus-io/milvus/pull/31592), [#31754](https://github.com/milvus-io/milvus/pull/31754), [#32139](https://github.com/milvus-io/milvus/pull/32139))
- Import tasks now support waiting for data index completion ([#31733](https://github.com/milvus-io/milvus/pull/31733))
- Enhanced Import compatibility ([#32121](https://github.com/milvus-io/milvus/pull/32121)), task scheduling ([#31475](https://github.com/milvus-io/milvus/pull/31475)), and limits on imported file size and number ([#31542](https://github.com/milvus-io/milvus/pull/31542))
- Code simplification efforts including interface standardization for type checking ([#31945](https://github.com/milvus-io/milvus/pull/31945), [#31857](https://github.com/milvus-io/milvus/pull/31857)), removal of deprecated code and metrics ([#32079](https://github.com/milvus-io/milvus/pull/32079), [#32134](https://github.com/milvus-io/milvus/pull/32134), [#31535](https://github.com/milvus-io/milvus/pull/31535), [#32211](https://github.com/milvus-io/milvus/pull/32211), [#31935](https://github.com/milvus-io/milvus/pull/31935)), and normalization of constant names ([#31515](https://github.com/milvus-io/milvus/pull/31515))
- New metrics for QueryCoord current target channel check point lag latency ([#31420](https://github.com/milvus-io/milvus/pull/31420))
- New db label for common metrics ([#32024](https://github.com/milvus-io/milvus/pull/32024))
- New metrics regarding the count of deleted, indexed, and loaded entities, with the inclusion of labels such as collectionName and dbName ([#31861](https://github.com/milvus-io/milvus/pull/31861))
- Error handling improvements for mismatched vector types ([#31766](https://github.com/milvus-io/milvus/pull/31766))
- Support for throwing errors instead of crashing when index cannot be built ([#31845](https://github.com/milvus-io/milvus/pull/31845))
- Support for invalidating the database meta cache when dropping databases ([#32092](https://github.com/milvus-io/milvus/pull/32092))
- Interface refactoring for channel distribution ([#31814](https://github.com/milvus-io/milvus/pull/31814)) and leader view management ([#32127](https://github.com/milvus-io/milvus/pull/32127))
- Refactor channel dist manager interface ([#31814](https://github.com/milvus-io/milvus/pull/31814)) and Refactor leader view manager interface ([#32127](https://github.com/milvus-io/milvus/pull/32127))
- Batch processing ([#31632](https://github.com/milvus-io/milvus/pull/31632)), adding mapping information ([#32234](https://github.com/milvus-io/milvus/pull/32234), [#32249](https://github.com/milvus-io/milvus/pull/32249)), and avoiding usage of lock ([#31787](https://github.com/milvus-io/milvus/pull/31787)) to accelerate frequently invoked operations

### Breaking Changes

- Discontinued grouping search on binary vectors ([#31735](https://github.com/milvus-io/milvus/pull/31735))
- Discontinued grouping search with hybrid search ([#31812](https://github.com/milvus-io/milvus/pull/31812))
- Discontinued HNSW index on binary vectors ([#31883](https://github.com/milvus-io/milvus/pull/31883))

### Bug Fixes

- Enhanced data type and value checks for queries and insertions to prevent crashes ([#31478](https://github.com/milvus-io/milvus/pull/31478), [#31653](https://github.com/milvus-io/milvus/pull/31653), [#31698](https://github.com/milvus-io/milvus/pull/31698), [#31842](https://github.com/milvus-io/milvus/pull/31842), [#32042](https://github.com/milvus-io/milvus/pull/32042), [#32251](https://github.com/milvus-io/milvus/pull/32251), [#32204](https://github.com/milvus-io/milvus/pull/32204))
- RESTful API bug fixes ([#32160](https://github.com/milvus-io/milvus/pull/32160))
- Improved prediction of inverted index resource usage ([#31641](https://github.com/milvus-io/milvus/pull/31641))
- Resolution of connection issues with etcd when authorization is enabled ([#31668](https://github.com/milvus-io/milvus/pull/31668))
- Security update for nats server ([#32023](https://github.com/milvus-io/milvus/pull/32023))
- Stored inverted index files into a local storage path of QueryNode instead of /tmp ([#32210](https://github.com/milvus-io/milvus/pull/32210))
- Addressed datacoord memory leaks for collectionInfo ([#32243](https://github.com/milvus-io/milvus/pull/32243))
- Fixes for fp16/bf16 related bugs potentially causing system panic ([#31677](https://github.com/milvus-io/milvus/pull/31677), [#31841](https://github.com/milvus-io/milvus/pull/31841), [#32196](https://github.com/milvus-io/milvus/pull/32196))
- Resolved issues with grouping search returning insufficient results ([#32151](https://github.com/milvus-io/milvus/pull/32151))
- Adjustment of search with iterators to handle offsets in the Reduce step more effectively and ensure adequate results with "reduceStopForBest" enabled ([#32088](https://github.com/milvus-io/milvus/pull/32088))

## v2.4.0-rc.1
Release date: March 20, 2024

| Milvus version | Python SDK version |
|----------------|--------------------|
| 2.4.0-rc.1     | 2.4.0              |

This release introduces several scenario-based features:

- **New GPU Index - CAGRA**: Thanks to NVIDIA's contribution, this new GPU index offers a 10x performance boost, especially for batch searches. For details, refer to [GPU Index](gpu_index.md).

- **Multi-vector** and **Hybrid Search**: This feature enables storing vector embeddings from multiple models and conducting hybrid searches. For details, refer to [Hybrid Search](multi-vector-search.md).

- **Sparse Vectors**: Ideal for keyword interpretation and analysis, sparse vectors are now supported for processing in your collection. For details, refer to [Sparse Vectors](sparse_vector.md).

- **Grouping Search**: Categorical aggregation enhances document-level recall for Retrieval-Augmented Generation (RAG) applications. For details, refer to [Grouping Search](https://milvus.io/docs/single-vector-search.md#Grouping-search).

- **Inverted Index** and **Fuzzy Matching**: These capabilities improve keyword retrieval for scalar fields. For details, refer to [Index Scalar Fields](index-scalar-fields.md) and [Filtered Search](single-vector-search.md#filtered-search).

### New Features

#### GPU Index - CAGRA

We would like to express our sincere gratitude to the NVIDIA team for their invaluable contribution to CAGRA, a state-of-the-art (SoTA) GPU-based graph index that can be used online. 

Unlike previous GPU indices, CAGRA demonstrates overwhelming superiority even in small batch queries, an area where CPU indices traditionally excel. In addition, CAGRA's performance in large batch queries and index construction speed, domains where GPU indices already shine, is truly unparalleled.

Example code can be found in [example_gpu_cagra.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/example_gpu_cagra.py).

#### Sparse Vector (Beta)

In this release, we are introducing a new type of vector field called sparse vector. Sparse vectors are different from their dense counterparts as they tend to have several magnitude higher number of dimensions with only a handful being non-zero. This feature offers better interpretability due to its term-based nature and can be more effective in certain domains. Learned sparse models such as SPLADEv2/BGE-M3 have proven to be very useful for common first-stage ranking tasks. The main use case for this new feature in Milvus is to allow efficient approximate semantic nearest neighbor search over sparse vectors generated by neural models such as SPLADEv2/BGE-M3 and statistics models such as the BM25 algorithm. Milvus now supports effective and high-performance storage, indexing, and searching (MIPS, Maximum Inner Product Search) of sparse vectors.

Example code can be found in [hello_sparse.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/hello_sparse.py).

#### Multi Embedding &  Hybrid Search

Multi-vector support is the cornerstone for applications that require multi-model data processing or a mix of dense and sparse vectors. With multi-vector support, now you can:

- Store vector embeddings generated for unstructured text, image, or audio samples from multiple models.
- Conduct ANN searches that include multiple vectors of each entity.
- Customize search strategies by assigning weights to different embedding models.
- Experiment with various embedding models to find the optimal model combination.

Multi-vector support allows storing, indexing, and applying reranking strategies to multiple vector fields of different types, such as FLOAT_VECTOR and SPARSE_FLOAT_VECTOR, in a collection. Currently, two reranking strategies are available: **Reciprocal Rank Fusion (RRF)** and **Average Weighted Scoring**. Both strategies combine the search results from different vector fields into a unified result set. The first strategy prioritizes the entities that consistently appear in the search results of different vector fields, while the other strategy assigns weights to the search results of each vector field to determine their importance in the final result set.

Example code can be found in [hybrid_search.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/hybrid_search.py).

#### Inverted Index and Fuzzy Match

In previous releases of Milvus, memory-based binary search indexes and Marisa Trie indexes were used for scalar field indexing. However, these methods were memory-intensive. The latest release of Milvus now employs the Tantivy-based inverted index, which can be applied to all numeric and string data types. This new index dramatically improves scalar query performance, reducing the query of keywords in strings by ten times. In addition, The inverted index consumes less memory, thanks to additional optimizations in data compression and Memory-mapped storage (MMap) mechanism of the internal indexing structure.

This release also supports fuzzy matches in scalar filtering using prefixes, infixes, and suffixes.

Example code can be found in [inverted_index_example.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/inverted_index_example.py) and [fuzzy_match.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/fuzzy_match.py).

#### Grouping Search

You can now aggregate the search results by the values in a specific scalar field. This helps RAG applications to implement document-level recall. Consider a collection of documents, each document splits into various passages. Each passage is represented by one vector embedding and belongs to one document. To find the most relevant documents instead of scattering passages, you can include the group_by_field argument in the search() operation to group results by the document ID.

Example code can be found in [example_group_by.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/example_group_by.py).

#### Float16 and BFloat- Vector DataType

Machine learning and neural networks often use half-precision data types, such as Float16 and BFloat- While these data types can improve query efficiency and reduce memory usage, they come with a tradeoff of reduced accuracy. With this release, Milvus now supports these data types for vector fields.

Example code can be found in [float16_example.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/float16_example.py) and [bfloat16_example.py](https://github.com/milvus-io/pymilvus/blob/2.4/examples/bfloat16_example.py).

### Upgraded Architecture

#### L0 Segment

This release includes a new segment called L0 Segment, designed to record deleted data. This segment periodically compacts stored deleted records and splits them into sealed segments, reducing the number of data flushes required for small deletions and leaving a small storage footprint. With this mechanism, Milvus completely separates data compactions from data flushes, enhancing the performance of delete and upsert operations.

#### Refactored BulkInsert

This release also introduces improved bulk-insert logic. This allows you to import multiple files in a single bulk-insert request. With the refactored version, both the performance and stability of bulk insert have seen significant improvements. The user experience has also been enhanced, such as fine-tuned rate limiting and more user-friendly error messages. In addition, you can easily access the bulk-insert endpoints through Milvus' RESTful API.

#### Memory-mapped Storage

Milvus uses memory-mapped storage (MMap) to optimize its memory usage. Instead of loading file content directly into memory, this mechanism maps the file content into memory. This approach comes with a tradeoff of performance degradation.  By enabling MMap for an HNSW-indexed collection on a host with 2 CPUs and 8 GB RAM, you can load 4x more data with less than 10% performance degradation.

In addition, this release also allows dynamic and fine-grained control over MMap without the need to restart Milvus.

For details, refer to [MMap Storage](mmap.md).

### Others

#### Milvus-CDC

Milvus-CDC is an easy-to-use companion tool to capture and synchronize incremental data between Milvus instances, allowing for easy incremental backup and disaster recovery. In this release, Milvus-CDC has improved stability, and its Change Data Capture (CDC) functionality now becomes generally available.

To learn more about Milvus-CDC, refer to [GitHub repository](https://github.com/zilliztech/milvus-cdc) and [Milvus-CDC Overview](milvus-cdc-overview.md).

#### Refined MilvusClient Interfaces

MilvusClient is an easy-to-use alternative to the ORM module. It adopts a purely functional approach to simplify interactions with the server. Instead of maintaining a connection pool, each MilvusClient establishes a gRPC connection to the server. 
The MilvusClient module has implemented most of the functionalities of the ORM module.
To learn more about the MilvusClient module, visit [pymilvus](https://github.com/milvus-io/pymilvus) and the [reference documents](/api-reference/pymilvus/v2.4.x/About.md).
