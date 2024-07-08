---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---
# Release Notes

Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.4.0 in this section. We suggest that you regularly visit this page to learn about updates.

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
