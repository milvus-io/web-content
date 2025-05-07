---
id: release_notes.md
summary: Milvus Release Notes
title: Release Notes
---

# Release Notes

Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.5.0 in this section. We suggest that you regularly visit this page to learn about updates.

## v2.5.11

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.11          | 2.5.8              | 2.5.8               | 2.5.8            |

We're excited to announce the release of Milvus 2.5.11! This version introduces powerful new features like the multi-analyzer capability and expanded tokenizer support (Jieba, Lindera, ICU, Language Identifier). We've also made several improvements, including dynamic segment loading thread pool updates and optimized delete filtering during binlog imports. Key bug fixes address potential segment drop issues, BM25 search failures, and JSON stats filtering errors.

We encourage you to upgrade to 2.5.11 to take advantage of these enhancements and fixes!

### Features

- Added the ability to configure multiple analyzers (tokenizers) for multi languages support and select the appropriate one based on the instruction of the input data ([#41444](https://github.com/milvus-io/milvus/pull/41444)).
- Enhanced the BM25 Analyzer functionality ([#41456](https://github.com/milvus-io/milvus/pull/41456)).
  - Introduced a `run_analyzer` API for dry runs to help analyze tokenization results. For more information, refer to [Analyzer Overview](analyzer-overview.md).
  - Tokenizers
    - Added support for customizing Jieba tokenizer parameters.
    - Added support for the Lindera tokenizer. For more information, refer to [Lindera](lindera-tokenizer.md).
    - Added support for the ICU tokenizer. For more information, refer to [ICU](icu-tokenizer.md).
    - Added a Language Identifier tokenizer for language detection.
  - Filters
    - Expanded language support for the built-in stop word filter. For more information, refer to [Stop](stop-filter.md).
    - Added a `remove_punct` filter to remove punctuation marks. For more information, refer to [Remove Punct](removepunct-filter.md).
    - Added a `regex` filter for pattern-based text filtering. For more information, refer to [Regex](regex-filter.md).
- Added support for modifying the maximum capacity of array fields ([#41406](https://github.com/milvus-io/milvus/pull/41406)).
- Added support for binary range expressions in JSON path indexes ([#41317](https://github.com/milvus-io/milvus/pull/41317)).
- Added support for infix and suffix match types in JSON stats ([#41388](https://github.com/milvus-io/milvus/pull/41388)).

### Improvements

- Enabled dynamic updates to the size of the Segment loading thread pool ([#41549](https://github.com/milvus-io/milvus/pull/41549)).
- Accelerated delete filtering during binlog import ([#41552](https://github.com/milvus-io/milvus/pull/41552)).
- Added monitoring parameters for the expression filter ratio ([#41403](https://github.com/milvus-io/milvus/pull/41403)).
- Added a configuration option to force rebuilding indexes to the latest version ([#41432](https://github.com/milvus-io/milvus/pull/41432)).
- Improved the error log message for the list policy ([#41368](https://github.com/milvus-io/milvus/pull/41368)).
- Adapted handling for hyphens in gRPC metadata headers ([#41372](https://github.com/milvus-io/milvus/pull/41372)).
- Upgraded Go version to 1.24.1 to address CVEs ([#41522](https://github.com/milvus-io/milvus/pull/41522), [#41319](https://github.com/milvus-io/milvus/pull/41319)).

### Bug fixes

- Fixed an issue where segments might not be correctly dropped when dropping a partition ([#41543](https://github.com/milvus-io/milvus/pull/41543)).
- Fixed bulk insert to use the function runner's input field list instead of the schema's field list ([#41561](https://github.com/milvus-io/milvus/pull/41561)).
- Fixed BM25 search failures occurring when `avgdl` (average document length) is NaN ([#41503](https://github.com/milvus-io/milvus/pull/41503)).
- Corrected inaccurate labels in QueryNode metrics ([#41422](https://github.com/milvus-io/milvus/pull/41422)).
- Fixed an issue where JSON stats index creation could fail if the data contained an empty map ([#41506](https://github.com/milvus-io/milvus/pull/41506)).
- Fixed the `AlterCollection` API to correctly save the modification timestamp ([#41469](https://github.com/milvus-io/milvus/pull/41469)).
- Fixed an intermittent filtering error in JSON stats under `ConjunctExpr` and improved the task slot calculation logic to accelerate JSON stats building ([#41458](https://github.com/milvus-io/milvus/pull/41458)).
- Fixed an IDF oracle leak in BM25 statistics calculation ([#41426](https://github.com/milvus-io/milvus/pull/41426)).
- Ensured pre-created topics are checked first during shard number validation ([#41421](https://github.com/milvus-io/milvus/pull/41421)).
- Fixed an erroneous deadlock report occurring in unit tests ([#41377](https://github.com/milvus-io/milvus/pull/41377)).

## v2.5.10

Release date: April 21, 2025

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.10          | 2.5.6              | 2.5.8               | 2.5.7            |

Milvus 2.5.10 delivers improved search and load performance, enhanced metrics reporting, and expanded SVE support for accelerated metric computation. This release also includes multiple bug fixes that boost stability and correctness. We encourage you to upgrade or give it a try—your feedback is invaluable in helping us make Milvus even better!

### Improvements

- Ignore reporting index metrics for non‑existent indexes ([#41296](https://github.com/milvus-io/milvus/pull/41296))
- Use scan mode for LIKE even when an inverted index exists ([#41309](https://github.com/milvus-io/milvus/pull/41309))
- Optimize performance for LIKE expressions ([#41222](https://github.com/milvus-io/milvus/pull/41222))
- Optimize index format for improved load performance ([#41041](https://github.com/milvus-io/milvus/pull/41041))
- RESTful: make the default timeout configurable ([#41225](https://github.com/milvus-io/milvus/pull/41225))
- Enable SVE support for L2 metric computation in FP16 / NY functions ([knowhere #1134](https://github.com/zilliztech/knowhere/pull/1134))

### Bug fixes

- Fix JSON index not working for string filters ([#41383](https://github.com/milvus-io/milvus/pull/41383))
- Skip dimension check for non‑vector fields in pre‑check ([#41329](https://github.com/milvus-io/milvus/pull/41329))
- Alter collection now updates the schema correctly ([#41308](https://github.com/milvus-io/milvus/pull/41308))
- Update knowhere version to fix macOS build ([#41315](https://github.com/milvus-io/milvus/pull/41315))
- Prevent panic when listing indexes before segment index initialization completes ([#41299](https://github.com/milvus-io/milvus/pull/41299))
- Resolve performance regression by changing a log level ([#41269](https://github.com/milvus-io/milvus/pull/41269))
- Close client before removing worker client ([#41254](https://github.com/milvus-io/milvus/pull/41254))

## v2.5.9

Release date: April 11, 2025

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.9          | 2.5.6              | 2.5.7               | 2.5.7            |

We’re excited to announce Milvus 2.5.9, bringing improved performance for JSON key statistics, enhanced indexing capabilities, and several critical bug fixes that bolster stability and data handling. We encourage you to upgrade or give this version a try, and as always, your feedback is greatly appreciated as we continue to refine Milvus.

### Improvements

- Support skipping score normalization for the weighted re-ranker ([#40905](https://github.com/milvus-io/milvus/pull/40905))
- Improve the performance of JSON key stats building by adding documents in batches ([#40898](https://github.com/milvus-io/milvus/pull/40898))
- Use `int32` when creating array indexes for `int8`/`int16` element types ([#41186](https://github.com/milvus-io/milvus/pull/41186))
- Align brute-force search results with JSON index behavior for the `exists` expression ([#41056](https://github.com/milvus-io/milvus/pull/41056))

### Bug fixes

- Fixed an issue causing traceID confusion if the client sent a traceID ([#41149](https://github.com/milvus-io/milvus/pull/41149))
- Fixed a potential crash due to incorrect usage of `noexcept`, leading to IO failures ([#41221](https://github.com/milvus-io/milvus/pull/41221))
- Resolved an infinite normal balance loop triggered after balance suspension ([#41196](https://github.com/milvus-io/milvus/pull/41196))
- Show collections now supports objects granted to custom privilege groups ([#41204](https://github.com/milvus-io/milvus/pull/41204))
- Fixed a failure to retrieve replicate channel positions ([#41189](https://github.com/milvus-io/milvus/pull/41189))
- Fixed a potential thread leak caused by RESTful timeouts ([#41184](https://github.com/milvus-io/milvus/pull/41184))
- Added a clear bitmap for batch skip mode ([#41165](https://github.com/milvus-io/milvus/pull/41165))
- Fixed an issue where removing an index type failed in local-mode remote storage ([#41163](https://github.com/milvus-io/milvus/pull/41163))
- Use `element_type` for array `isNull` operators ([#41158](https://github.com/milvus-io/milvus/pull/41158))
- Removed metrics reset to ensure accurate reporting ([#41081](https://github.com/milvus-io/milvus/pull/41081))
- Fixed a bug preventing `null` data from being filtered by `null` expressions ([#41135](https://github.com/milvus-io/milvus/pull/41135))
- Ignored growing segments with no start position for seal policy ([#41131](https://github.com/milvus-io/milvus/pull/41131))
- Avoided updating original search/query requests during retries ([#41127](https://github.com/milvus-io/milvus/pull/41127))
- Fixed a segmentation fault if `LoadArrowReaderFromRemote` runs in an exception path ([#41071](https://github.com/milvus-io/milvus/pull/41071))
- Addressed manual balance and balance check issues ([#41038](https://github.com/milvus-io/milvus/pull/41038))
- Validated schema is not `nil` for JSON stats with lazy `DescribeCollection` ([#41068](https://github.com/milvus-io/milvus/pull/41068))
- Fixed a cursor movement bug when comparing two columns ([#41054](https://github.com/milvus-io/milvus/pull/41054))
- Resolved a crash when inserting both `null` and non-null arrays with growing mmap open ([#41052](https://github.com/milvus-io/milvus/pull/41052))
- Fixed an arm64 compilation issue ([#41058](https://github.com/milvus-io/milvus/pull/41058))
- Added a bypass thread pool mode to avoid blocking insert/load operations by growing indexes ([#41013](https://github.com/milvus-io/milvus/pull/41013))
- Fixed JSON format errors ([#41031](https://github.com/milvus-io/milvus/pull/41031))
- Fixed a 404 error in WebUI when `http.enablepprof` is false ([#41007](https://github.com/milvus-io/milvus/pull/41007))

## v2.5.8

Release date: April 1, 2025

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.8          | 2.5.6              | 2.5.7               | 2.5.6            |

We’re excited to announce the release of Milvus 2.5.8, featuring enhancements to JSON expressions, UTF-8 validation, memory usage, and balancing logic. This version also includes multiple important bug fixes to improve concurrency and data handling. We encourage you to upgrade or give it a try, and as always, your feedback helps us continually refine Milvus!

### Features

- Support JSON `null`/`exists` expressions ([#41002](https://github.com/milvus-io/milvus/pull/41002))
- Support parsing sparse vectors from Parquet structs in bulk inserts ([#40874](https://github.com/milvus-io/milvus/pull/40874))

### Improvements

- Balance the collection with the largest row count first ([#40958](https://github.com/milvus-io/milvus/pull/40958))
- Support UTF-8 string validation during import ([#40746](https://github.com/milvus-io/milvus/pull/40746))
- Add UTF-8 validation for all VARCHAR fields ([#40993](https://github.com/milvus-io/milvus/pull/40993))
- Avoid re-query if hybrid search only requests the PK as output field ([#40906](https://github.com/milvus-io/milvus/pull/40906))
- Refine array views to optimize memory usage ([#40206](https://github.com/milvus-io/milvus/pull/40206))
- Add a trigger interval configuration for auto-balancing ([#39918](https://github.com/milvus-io/milvus/pull/39918))
- Convert multiple OR expressions to IN expression ([#40751](https://github.com/milvus-io/milvus/pull/40751))
- Support detailed manual compaction criteria ([#40924](https://github.com/milvus-io/milvus/pull/40924))
- Retain raw tokens for audit logging ([#40867](https://github.com/milvus-io/milvus/pull/40867))
- Optimize DataCoord meta mutex usage ([#40753](https://github.com/milvus-io/milvus/pull/40753))
- Introduce batch subscriptions in `MsgDispatcher` ([#40596](https://github.com/milvus-io/milvus/pull/40596))

### Bug fixes

- Fixed a crash involving nullable input and growing mmap data types ([#40980](https://github.com/milvus-io/milvus/pull/40980))
- Fixed potential data loss in delete operations caused by duplicate binlog IDs ([#40985](https://github.com/milvus-io/milvus/pull/40985)), ([#40976](https://github.com/milvus-io/milvus/pull/40976))
- Added field index locks for `GetSegmentsIndexStates` to avoid potential panic when insertion while creating collection ([#40969](https://github.com/milvus-io/milvus/pull/40969))
- Fixed concurrency issues in Rocksmq consumer registration ([#40885](https://github.com/milvus-io/milvus/pull/40885))
- Retrieve all child delta logs for segment loading ([#40957](https://github.com/milvus-io/milvus/pull/40957))
- Fixed wrong results caused by using JSON index when `iterative_filter` is specified ([#40946](https://github.com/milvus-io/milvus/pull/40946))
- Ensured higher priority for the `exists` operation ([#40865](https://github.com/milvus-io/milvus/pull/40865))
- Corrected `WithGroupSize` while reducing ([#40920](https://github.com/milvus-io/milvus/pull/40920))
- Increased the number of slots proportionally as segment size grows ([#40862](https://github.com/milvus-io/milvus/pull/40862))
- Set task queue time before enqueue ([#40853](https://github.com/milvus-io/milvus/pull/40853))
- Fixed channel imbalance on DataNodes ([#40854](https://github.com/milvus-io/milvus/pull/40854))
- Set correct default configurations for task slots ([#40821](https://github.com/milvus-io/milvus/pull/40821))
- Go SDK: Set nullable flags according to FieldSchema for row-based insert ([#40962](https://github.com/milvus-io/milvus/pull/40962))

## v2.5.7

Release date: March 21, 2025

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.7          | 2.5.6              | 2.5.6               | 2.5.6            |

We’re excited to announce the release of Milvus 2.5.7, highlighted by the newly introduced JSON Path Index feature. This allows you to build inverted indexes on dynamic or JSON columns to significantly improve query performance. Alongside this new functionality, we've made numerous enhancements and bug fixes for better reliability, more refined error handling, and improved usability. We encourage you to upgrade or try it out, and as always, your feedback is greatly appreciated as we continue to improve Milvus!

### Features

- **JSON Path Index**: To address user needs for dynamic schemas, Milvus 2.5.7 introduces the ability to build indexes on dynamic columns and JSON columns. With this feature, you can create inverted indexes for specific dynamic columns or JSON paths, effectively bypassing the slower JSON load process and greatly enhancing query performance. For more information, refer to [JSON Field](use-json-fields.md).

### Improvements

- Reorder sub-expressions for conjunct expressions ([#40186](https://github.com/milvus-io/milvus/pull/40186))
- Add more config options for `interimindex` to support refined modes ([#40429](https://github.com/milvus-io/milvus/pull/40429))
- Use correct counter metrics for overall WA calculations ([#40679](https://github.com/milvus-io/milvus/pull/40679))
- Make the segment prune config refreshable ([#40632](https://github.com/milvus-io/milvus/pull/40632))
- Add a channel seal policy based on blocking L0 ([#40535](https://github.com/milvus-io/milvus/pull/40535))
- Refine task metadata with key-level locking ([#40353](https://github.com/milvus-io/milvus/pull/40353))
- Remove unnecessary collection and partition labels from metrics ([#40593](https://github.com/milvus-io/milvus/pull/40593))
- Improve import error messages ([#40597](https://github.com/milvus-io/milvus/pull/40597))
- Avoid converting body byte slices to strings in `httpserver` ([#40414](https://github.com/milvus-io/milvus/pull/40414))
- Log the start position of delete messages ([#40678](https://github.com/milvus-io/milvus/pull/40678))
- Support retrieving segment binlogs with the new `GetSegmentsInfo` interface ([#40466](https://github.com/milvus-io/milvus/pull/40466))

### Bug fixes

- Use `newInsertDataWithFunctionOutputField` when importing binlog files ([#40742](https://github.com/milvus-io/milvus/pull/40742))
- Fixed an issue where mmap properties failed to apply when creating a collection ([#40515](https://github.com/milvus-io/milvus/pull/40515))
- Do not delete the centroids file when sampling fails; instead, wait for GC ([#40702](https://github.com/milvus-io/milvus/pull/40702))
- Fixed message loss issues during seek ([#40736](https://github.com/milvus-io/milvus/pull/40736))
- Removed lag targets after the main dispatcher ([#40717](https://github.com/milvus-io/milvus/pull/40717))
- Added clear bitmap input for every batch loop ([#40722](https://github.com/milvus-io/milvus/pull/40722))
- Protected `GetSegmentIndexes` with an RLock ([#40720](https://github.com/milvus-io/milvus/pull/40720))
- Avoided segmentation faults caused by retrieving empty vector datasets ([#40546](https://github.com/milvus-io/milvus/pull/40546))
- Fixed JSON index “not-equal” filter ([#40648](https://github.com/milvus-io/milvus/pull/40648))
- Fixed null offset loading in the inverted index ([#40524](https://github.com/milvus-io/milvus/pull/40524))
- Fixed the garbage cleanup logic of `jsonKey` stats and improved the JSON key stats filter ([#40039](https://github.com/milvus-io/milvus/pull/40039))
- Caught invalid JSON pointer errors ([#40626](https://github.com/milvus-io/milvus/pull/40626))
- RBAC star privilege now returns empty when listing policies ([#40557](https://github.com/milvus-io/milvus/pull/40557))
- Avoided panic when a field does not exist in the schema in QueryNode ([#40542](https://github.com/milvus-io/milvus/pull/40542))
- Fixed a reference collection issue for search/query ([#40550](https://github.com/milvus-io/milvus/pull/40550))
- Handled empty rows for sparse vectors ([#40586](https://github.com/milvus-io/milvus/pull/40586))
- Added a duplicated type/index parameter check when creating collections ([#40465](https://github.com/milvus-io/milvus/pull/40465))
- Moved `metaHeader` to the client to avoid data races ([#40444](https://github.com/milvus-io/milvus/pull/40444))

## v2.5.6

Release date: March 10, 2025

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.6          | 2.5.5              | 2.5.5               | 2.5.5            |

We’re excited to announce the release of Milvus 2.5.6, featuring valuable enhancements to toolchains, logging, metrics, and array handling, as well as multiple bug fixes for improved reliability and performance. This update includes refined concurrency handling, more robust compaction tasks, and other key improvements. We encourage you to upgrade or try it out, and as always, we welcome your feedback to help us continuously improve Milvus!

### Improvements

- Upgrade the Go toolchain to 1.22.7 ([#40399](https://github.com/milvus-io/milvus/pull/40399))
- Upgrade Rust version to 1.83 ([#40317](https://github.com/milvus-io/milvus/pull/40317))
- Bump Etcd version to 3.5.18 ([#40230](https://github.com/milvus-io/milvus/pull/40230))
- Only check element type for non-null arrays ([#40447](https://github.com/milvus-io/milvus/pull/40447))
- Remove debug logs in the resource group handler (v2) ([#40393](https://github.com/milvus-io/milvus/pull/40393))
- Improve logging for the gRPC resolver ([#40338](https://github.com/milvus-io/milvus/pull/40338))
- Add more metrics for asynchronous CGO components ([#40232](https://github.com/milvus-io/milvus/pull/40232))
- Clean the shard location cache after a collection is released ([#40228](https://github.com/milvus-io/milvus/pull/40228))

### Bug fixes

- Fixed array corruption caused by ignoring validity ([#40433](https://github.com/milvus-io/milvus/pull/40433))
- Fixed an issue where `null` expressions did not work for JSON fields ([#40457](https://github.com/milvus-io/milvus/pull/40457))
- Fixed an issue that stored the wrong offset when building Tantivy with a nullable field ([#40453](https://github.com/milvus-io/milvus/pull/40453))
- Skipped executing stats for zero segments ([#40449](https://github.com/milvus-io/milvus/pull/40449))
- Corrected memory size estimation for arrays ([#40377](https://github.com/milvus-io/milvus/pull/40377))
- Passed a knapsack pointer to avoid multiple compactions ([#40401](https://github.com/milvus-io/milvus/pull/40401))
- Fixed a crash issue with bulk insert ([#40304](https://github.com/milvus-io/milvus/pull/40304))
- Prevented message stream leaks by properly terminating the main dispatcher ([#40351](https://github.com/milvus-io/milvus/pull/40351))
- Fixed concurrency issues for `null` offsets ([#40363](https://github.com/milvus-io/milvus/pull/40363)), ([#40365](https://github.com/milvus-io/milvus/pull/40365))
- Fixed parsing of the `import end ts` ([#40333](https://github.com/milvus-io/milvus/pull/40333))
- Improved error handling and unit tests for the `InitMetaCache` function ([#40324](https://github.com/milvus-io/milvus/pull/40324))
- Added a duplicate parameter check for `CreateIndex` ([#40330](https://github.com/milvus-io/milvus/pull/40330))
- Resolved an issue preventing compaction tasks when size exceeded the max limit ([#40350](https://github.com/milvus-io/milvus/pull/40350))
- Fixed duplicate consumption from the stream for invisible segments ([#40318](https://github.com/milvus-io/milvus/pull/40318))
- Changed the CMake variable to switch to `knowhere-cuvs` ([#40289](https://github.com/milvus-io/milvus/pull/40289))
- Fixed an issue where dropping DB properties via RESTful failed ([#40260](https://github.com/milvus-io/milvus/pull/40260))
- Used a different message type for the `OperatePrivilegeV2` API ([#40193](https://github.com/milvus-io/milvus/pull/40193))
- Fixed a data race in the task delta cache ([#40262](https://github.com/milvus-io/milvus/pull/40262))
- Resolved a task delta cache leak caused by duplicate task IDs ([#40184](https://github.com/milvus-io/milvus/pull/40184))

## v2.5.5

Release date: February 26, 2025

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.5          | 2.5.4              | 2.5.5               | 2.5.4            |

Milvus 2.5.5 brings significant improvements in the number of collections and partitions a single cluster can support. It is now fully feasible to run Milvus with 10K collections and 100K partitions. This release also addresses several critical bugs, including missing match stats and a deadlock issue in multi-stage queries. Additionally, it includes numerous observability and security enhancements. We strongly recommend that all users running Milvus 2.5.x upgrade as soon as possible.

### Dependency Upgrade

Upgraded to ETCD 3.5.18 to fix several CVEs.

- [2.5] Updated raft to cuvs ([#39221](https://github.com/milvus-io/milvus/pull/39221))
- [2.5] Updated Knowhere version ([#39673](https://github.com/milvus-io/milvus/pull/39673), [#39574](https://github.com/milvus-io/milvus/pull/39574))

### Critical Bugs

- [2.5] Used `text_log` prefix for textmatchindex null offset file ([#39936](https://github.com/milvus-io/milvus/pull/39936))
- [2.5] Added sub-task pool for multi-stage tasks to avoid deadlock ([#40081](https://github.com/milvus-io/milvus/pull/40081))

### Bug Fixes

- [2.5] Fixed task scheduler deadlock ([#40121](https://github.com/milvus-io/milvus/pull/40121))
- [2.5] Fixed race condition that caused multiple identical indexes to be created ([#40180](https://github.com/milvus-io/milvus/pull/40180))
- [2.5] Fixed issue where collections with duplicate names could be created ([#40147](https://github.com/milvus-io/milvus/pull/40147))
- Fixed search failure of null expression ([#40128](https://github.com/milvus-io/milvus/pull/40128))
- [2.5] Fixed bug where prefix matching failed when wildcards were in the prefix ([#40021](https://github.com/milvus-io/milvus/pull/40021))
- Cancelled subcontexts cascade when HTTP request timed out ([#40060](https://github.com/milvus-io/milvus/pull/40060))
- [2.5] Fixed task delta cache leak on reduce task ([#40056](https://github.com/milvus-io/milvus/pull/40056))
- [2.5] Fixed querycoord panic in corner case ([#40058](https://github.com/milvus-io/milvus/pull/40058))
- [2.5] Enhanced isbalanced function to correctly count quote pairs ([#40002](https://github.com/milvus-io/milvus/pull/40002))
- [2.5] Fixed negative -1 executing compaction tasks ([#39955](https://github.com/milvus-io/milvus/pull/39955))
- [2.5] Fixed bug where a segment may never transfer from sealed to flushing ([#39996](https://github.com/milvus-io/milvus/pull/39996))
- Skipped creating primary key index when loading pk index ([#39922](https://github.com/milvus-io/milvus/pull/39922))
- [2.5] Skipped text index creation when segment was zero after sorting ([#39969](https://github.com/milvus-io/milvus/pull/39969))
- [2.5] Fixed failure to seek to earliest position ([#39966](https://github.com/milvus-io/milvus/pull/39966))
- Ignored growing option lost at hybridsearch ([#39900](https://github.com/milvus-io/milvus/pull/39900))
- [2.5] Fixed altercollection unable to modify consistency level ([#39902](https://github.com/milvus-io/milvus/pull/39902))
- Fixed import failure due to 0 row count ([#39904](https://github.com/milvus-io/milvus/pull/39904))
- [2.5] Fixed wrong module result for long type ([#39802](https://github.com/milvus-io/milvus/pull/39802))
- [2.5] Added and used lifetime context for compaction trigger ([#39880](https://github.com/milvus-io/milvus/pull/39880))
- [2.5] Checked collection release before target checks ([#39843](https://github.com/milvus-io/milvus/pull/39843))
- Fixed Rootcoord graceful stop failure and limited resource of CI ([#39793](https://github.com/milvus-io/milvus/pull/39793))
- [2.5] Removed load field & schema column size check ([#39834](https://github.com/milvus-io/milvus/pull/39834), [#39835](https://github.com/milvus-io/milvus/pull/39835))
- [2.5] Removed the mmap.enable param in the type param when creating index ([#39806](https://github.com/milvus-io/milvus/pull/39806))
- [2.5] Did not pass the index name when dropping properties ([#39679](https://github.com/milvus-io/milvus/pull/39679))
- [2.5] Segments returned both growing and sealed results ([#39789](https://github.com/milvus-io/milvus/pull/39789))
- [2.5] Fixed concurrent map issue ([#39776](https://github.com/milvus-io/milvus/pull/39776))
- [2.5] Resolved conflict on QC task test ([#39797](https://github.com/milvus-io/milvus/pull/39797))
- [2.5] Fixed collection load stuck if compaction or GC occurred ([#39761](https://github.com/milvus-io/milvus/pull/39761))
- [2.5] Fixed uneven distribution caused by executing task delta cache leak ([#39759](https://github.com/milvus-io/milvus/pull/39759))
- [2.5] Returned early when skipping load pk index ([#39763](https://github.com/milvus-io/milvus/pull/39763))
- [2.5] Fixed root user being able to list all collections even when `common.security.rootShouldBindRole` was set ([#39714](https://github.com/milvus-io/milvus/pull/39714))
- [2.5] Fixed flowgraph leak ([#39686](https://github.com/milvus-io/milvus/pull/39686))
- [2.5] Used param item formatter to avoid setconfig overlay ([#39636](https://github.com/milvus-io/milvus/pull/39636))
- [2.5] Metastore privilege name checked with privilege name "all" ([#39492](https://github.com/milvus-io/milvus/pull/39492))
- [2.5] Added rate limiter for RESTful v1 ([#39555](https://github.com/milvus-io/milvus/pull/39555))
- [2.5] Removed hardcoded partition number in RESTful handler ([#40113](https://github.com/milvus-io/milvus/pull/40113))

### Improvements

#### Observability

- Added monitor metric to retrieve raw data ([#40155](https://github.com/milvus-io/milvus/pull/40155))
- [2.5] Added get vector latency metric and refined request limit error message ([#40085](https://github.com/milvus-io/milvus/pull/40085))
- [2.5] Added metrics for proxy queue ([#40071](https://github.com/milvus-io/milvus/pull/40071))
- Exposed more metrics data ([#39466](https://github.com/milvus-io/milvus/pull/39466))
- [2.5] Added metrics for parse expression ([#39716](https://github.com/milvus-io/milvus/pull/39716))
- [2.5] Added DSL log field for hybridsearch ([#39598](https://github.com/milvus-io/milvus/pull/39598))
- [2.5] Skipped updating index metrics if index was dropped ([#39572](https://github.com/milvus-io/milvus/pull/39572))
- [2.5] Dumped pprof info if component stop progress timed out ([#39760](https://github.com/milvus-io/milvus/pull/39760))
- [2.5] Added management API to check querycoord balance status ([#39909](https://github.com/milvus-io/milvus/pull/39909))

#### Stats/Compaction/Index Task Scheduler Optimization

- Refined index task scheduler policy ([#40104](https://github.com/milvus-io/milvus/pull/40104))
- [2.5] Limited the speed of generating stats task ([#39645](https://github.com/milvus-io/milvus/pull/39645))
- Added configs for compaction schedule ([#39511](https://github.com/milvus-io/milvus/pull/39511))
- [2.5] Checked L0 compaction only with the same channel when stating ([#39543](https://github.com/milvus-io/milvus/pull/39543))
- [2.5] Adjusted segment loader's memory estimate for interim indexes ([#39509](https://github.com/milvus-io/milvus/pull/39509))
- [2.5] Used start pos ts for seal segment by lifetime policy ([#39994](https://github.com/milvus-io/milvus/pull/39994))
- Removed task meta when task was no longer needed ([#40146](https://github.com/milvus-io/milvus/pull/40146))
- [2.5] Accelerated listing objects during binlog import ([#40048](https://github.com/milvus-io/milvus/pull/40048))
- Supported creating collection with description ([#40028](https://github.com/milvus-io/milvus/pull/40028))
- [2.5] Exported index request timeout interval in config ([#40118](https://github.com/milvus-io/milvus/pull/40118))
- [2.5] Synced proxy.maxTaskNum default value to 1024 ([#40073](https://github.com/milvus-io/milvus/pull/40073))
- Decreased dump snapshot limit from 10w to 1w ([#40102](https://github.com/milvus-io/milvus/pull/40102))
- [2.5] Avoided string to slice bytes copy for batch pk exists ([#40097](https://github.com/milvus-io/milvus/pull/40097))
- Supported returning configurable properties when describing index ([#40043](https://github.com/milvus-io/milvus/pull/40043))
- Optimized expression performance for certain points ([#39938](https://github.com/milvus-io/milvus/pull/39938))
- [2.5] Optimized result format of getQueryNodeDistribution ([#39926](https://github.com/milvus-io/milvus/pull/39926))
- [cp25] Enabled observation of write amplification ([#39743](https://github.com/milvus-io/milvus/pull/39743))
- [2.5] Returned top-k results when searching in RESTful v2 ([#39839](https://github.com/milvus-io/milvus/pull/39839))
- [2.5][GoSDK] Added withEnableMatch syntactic sugar ([#39853](https://github.com/milvus-io/milvus/pull/39853))
- [2.5] Interim index supported different index types and more data types (FP16/BF16) ([#39180](https://github.com/milvus-io/milvus/pull/39180))
- [GoSDK][2.5] Synced GoSDK commits from master branch ([#39823](https://github.com/milvus-io/milvus/pull/39823))
- Kept consistency of memory and meta of broadcaster ([#39721](https://github.com/milvus-io/milvus/pull/39721))
- Broadcasted with event-based notification ([#39550](https://github.com/milvus-io/milvus/pull/39550))
- [2.5] Refined error message for schema & index checking ([#39565](https://github.com/milvus-io/milvus/pull/39565))
- [2.5] Reset default auto index type for scalar ([#39820](https://github.com/milvus-io/milvus/pull/39820))
- [2.5] Re-enqueued L0 compaction task when precheck failed ([#39871](https://github.com/milvus-io/milvus/pull/39871))

## v2.5.4

Release date: January 23, 2025

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.4          | 2.5.4              | 2.5.4               | 2.5.4            |

We’re excited to announce the release of Milvus 2.5.4, which introduces key performance optimizations and new features such as PartitionKey isolation, Sparse Index with DAAT MaxScore, and enhanced locking mechanisms. A standout highlight of this release is its support for 10,000 collections and 1 million partitions, marking a major milestone for multi-tenant use cases. This version also addresses multiple bugs that improve overall stability and reliability, two of the critical bugs may cause data loss. We encourage you to upgrade or try out this latest release, and we look forward to your feedback in helping us continually refine Milvus!

### Features

- Supports PartitionKey isolation to improve performance with multiple partition keys ([#39245](https://github.com/milvus-io/milvus/pull/39245)). For more information, refer to [Use Partition Key](use-partition-key.md).
- Sparse Index now supports DAAT MaxScore [knowhere/#1015](https://github.com/milvus-io/knowhere/pull/1015). For more information, refer to [Sparse Vector](sparse_vector.md).
- Adds support for `is_null` in expression ([#38931](https://github.com/milvus-io/milvus/pull/38931))
- Root privileges can be customized ([#39324](https://github.com/milvus-io/milvus/pull/39324))

### Improvements

- Support 10K collections and 1million partitions in one cluster ([#37630](https://github.com/milvus-io/milvus/pull/37630))
- Cached segments’ delta information to accelerate the Query Coordinator ([#39349](https://github.com/milvus-io/milvus/pull/39349))
- Read metadata concurrently at the collection level to speed up failure recovery ([#38900](https://github.com/milvus-io/milvus/pull/38900))
- Refined lock granularity in QueryNode ([#39282](https://github.com/milvus-io/milvus/pull/39282)), ([#38907](https://github.com/milvus-io/milvus/pull/38907))
- Unified style by using CStatus to handle NewCollection CGO calls ([#39303](https://github.com/milvus-io/milvus/pull/39303))
- Skipped generating the partition limiter if no partition is set ([#38911](https://github.com/milvus-io/milvus/pull/38911))
- Added more RESTful API support ([#38875](https://github.com/milvus-io/milvus/pull/38875)) ([#39425](https://github.com/milvus-io/milvus/pull/39425))
- Removed unnecessary Bloom Filters in QueryNode and DataNode to reduce memory usage ([#38913](https://github.com/milvus-io/milvus/pull/38913))
- Speeded up data loading by accelerating task generation, scheduling, and execution in QueryCoord ([#38905](https://github.com/milvus-io/milvus/pull/38905))
- Reduced locking in DataCoord to speed up load and insert operations ([#38904](https://github.com/milvus-io/milvus/pull/38904))
- Added primary field names in `SearchResult` and `QueryResults` ([#39222](https://github.com/milvus-io/milvus/pull/39222))
- Used both binlog size and index size as the disk quota throttling standard ([#38844](https://github.com/milvus-io/milvus/pull/38844))
- Optimized memory usage for full-text search knowhere/#1011
- Added version control for scalar indexes ([#39236](https://github.com/milvus-io/milvus/pull/39236))
- Improved the speed of fetching collection information from RootCoord by avoiding unnecessary copies ([#38902](https://github.com/milvus-io/milvus/pull/38902))

### Critial Bug fixs
- Fixed search failures for primary keys with indexes ([#39390](https://github.com/milvus-io/milvus/pull/39390))
- Fixed potential data loss issue caused by restarting MixCoord and flushing concurrently ([#39422](https://github.com/milvus-io/milvus/pull/39422))
- Fixed a delete failure triggered by improper concurrency between stats tasks and L0 compaction after MixCoord restarts ([#39460](https://github.com/milvus-io/milvus/pull/39460))
- Fixed scalar inverted index incompatibility when upgrading from 2.4 to 2.5 ([#39272](https://github.com/milvus-io/milvus/pull/39272))

### Bug fixes

- Fixed slow query issues caused by coarse lock granularity during multi-column loading ([#39255](https://github.com/milvus-io/milvus/pull/39255))
- Fixed an issue where using aliases could cause an iterator to traverse the wrong database ([#39248](https://github.com/milvus-io/milvus/pull/39248))
- Fixed a resource group update failure when altering the database ([#39356](https://github.com/milvus-io/milvus/pull/39356))
- Fixed a sporadic issue where the tantivy index could not delete index files during release ([#39434](https://github.com/milvus-io/milvus/pull/39434))
- Fixed slow indexing caused by having too many threads ([#39341](https://github.com/milvus-io/milvus/pull/39341))
- Fixed an issue preventing disk quota checks from being skipped during bulk import ([#39319](https://github.com/milvus-io/milvus/pull/39319))
- Resolved freeze issues caused by too many message queue consumers by limiting concurrency ([#38915](https://github.com/milvus-io/milvus/pull/38915))
- Fixed query timeouts caused by MixCoord restarts during large-scale compactions ([#38926](https://github.com/milvus-io/milvus/pull/38926))
- Fixed channel imbalance issues caused by node downtime ([#39200](https://github.com/milvus-io/milvus/pull/39200))
- Fixed an issue that could cause channel balance to become stuck. ([#39160](https://github.com/milvus-io/milvus/pull/39160))
- Fixed an issue where RBAC custom group privilege level checks became ineffective ([#39224](https://github.com/milvus-io/milvus/pull/39224))
- Fixed a failure to retrieve the number of rows in empty indexes ([#39210](https://github.com/milvus-io/milvus/pull/39210))
- Fixed incorrect memory estimation for small segments ([#38909](https://github.com/milvus-io/milvus/pull/38909))

## v2.5.3

Release date: January 13, 2025

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.3          | 2.5.3              | 2.5.3               | 2.5.4            |

Milvus 2.5.3 delivers critical bug fixes and performance enhancements to improve overall stability, reliability, and usability. This version refines concurrency handling, bolsters data indexing and retrieval, and updates several key components for a more robust user experience.

### Bug fixes

- Fixed an issue where using an `IN` filter on a `VARCHAR` primary key could return empty results. ([#39108](https://github.com/milvus-io/milvus/pull/39108))
- Fixed a concurrency problem between query and delete operations that could lead to incorrect results. ([#39054](https://github.com/milvus-io/milvus/pull/39054))
- Fixed a failure caused by iterative filtering when an `expr` was empty in a query request. ([#39034](https://github.com/milvus-io/milvus/pull/39034))
- Fixed an issue where a disk error during config updates led to the use of default config settings. ([#39072](https://github.com/milvus-io/milvus/pull/39072))
- Fixed a potential loss of deleted data due to clustering compaction. ([#39133](https://github.com/milvus-io/milvus/pull/39133))
- Fixed a broken text match query in growing data segments. ([#39113](https://github.com/milvus-io/milvus/pull/39113))
- Fixed retrieval failures caused by the index not containing the original data for sparse vectors. ([#39146](https://github.com/milvus-io/milvus/pull/39146))
- Fixed a possible column field race condition caused by concurrent querying and data loading. ([#39152](https://github.com/milvus-io/milvus/pull/39152))
- Fixed bulk insert failures when nullable or default_value fields were not included in the data. ([#39111](https://github.com/milvus-io/milvus/pull/39111))

### Improvements

- Added a resource group API for the RESTful interface. ([#39092](https://github.com/milvus-io/milvus/pull/39092))
- Optimized retrieve performance by leveraging bitset SIMD methods. ([#39041](https://github.com/milvus-io/milvus/pull/39041))
- Used MVCC timestamp as the guarantee timestamp when specified. ([#39019](https://github.com/milvus-io/milvus/pull/39019))
- Added missing delete metrics. ([#38747](https://github.com/milvus-io/milvus/pull/38747))
- Updated Etcd to version v3.5.16. ([#38969](https://github.com/milvus-io/milvus/pull/38969))
- Created a new Go package to manage protos.([#39128](https://github.com/milvus-io/milvus/pull/39128))

## v2.5.2

Release date: January 3, 2025

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.2          | 2.5.3              | 2.5.3               | 2.5.3            |

Milvus 2.5.2 supports modifying the maximum length for VARCHAR columns and resolves several critical issues related to concurrency, partition drops, and BM25 stats handling during import. We highly recommend upgrading to this version for improved stability and performance.

### Improvements

- Generated disk usage logs only when the specified path does not exist. ([#38822](https://github.com/milvus-io/milvus/pull/38822))
- Added a parameter for tuning the maximum VARCHAR length and restored the limit to 65,535. ([#38883](https://github.com/milvus-io/milvus/pull/38883))
- Supported parameter type conversion for expressions. ([#38782](https://github.com/milvus-io/milvus/pull/38782))

### Bug fixes

- Fixed potential deadlocks in concurrency scenarios. ([#38863](https://github.com/milvus-io/milvus/pull/38863))
- Generated the index_null_offset file only for fields that support null values. ([#38834](https://github.com/milvus-io/milvus/pull/38834))
- Fixed the retrieve plan usage after free in the reduce phase. ([#38841](https://github.com/milvus-io/milvus/pull/38841))
- Recognized expressions with capitalized AND and OR. ([#38928](https://github.com/milvus-io/milvus/pull/38928))
- Allowed successful partition drops even if loading failed. ([#38874](https://github.com/milvus-io/milvus/pull/38874))
- Fixed BM25 stats file registration issues during import. ([#38881](https://github.com/milvus-io/milvus/pull/38881))

## v2.5.1

Release date: December 26, 2024

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.1          | 2.5.2              | 2.5.2               | 2.5.2            |

Milvus 2.5.1 focuses on a series of bug fixes addressing memory loading, RBAC listings, query node balancing, and sealed segment indexing, while also improving the Web UI and interceptors. We highly recommend upgrading to 2.5.1 for enhanced stability and reliability.

### Improvement

- Update web UI collection and query pages. ([#38701](https://github.com/milvus-io/milvus/pull/38701))

### Bug fixes

- Fixed OOM issues by adding a memory factor to loading estimations. ([#38722](https://github.com/milvus-io/milvus/pull/38722))
- Fixed privilege group expansion when listing policies in RootCoord. ([#38760](https://github.com/milvus-io/milvus/pull/38760))
- Fixed issues with listing privilege groups and collections. ([#38738](https://github.com/milvus-io/milvus/pull/38738))
- Fixed the balancer to avoid repeatedly overloading the same query node. ([#38724](https://github.com/milvus-io/milvus/pull/38724))
- Fixed unexpected balance tasks triggered after QueryCoord restarts. ([#38725](https://github.com/milvus-io/milvus/pull/38725))
- Fixed load config updates not applying to loading collections. ([#38737](https://github.com/milvus-io/milvus/pull/38737))
- Fixed zero read count during data import. ([#38695](https://github.com/milvus-io/milvus/pull/38695))
- Fixed Unicode decoding for JSON keys in expressions. ([#38653](https://github.com/milvus-io/milvus/pull/38653))
- Fixed interceptor DB name for alterCollectionField in 2.5.  ([#38663](https://github.com/milvus-io/milvus/pull/38663))
- Fixed empty index parameters for sealed segments when using BM25 brute force search. ([#38752](https://github.com/milvus-io/milvus/pull/38752))


## v2.5.0

Release date: December 23, 2024

| Milvus version | Python SDK version | Node.js SDK version | Java SDK version |
|----------------|--------------------|---------------------|------------------|
| 2.5.0          | 2.5.1              | 2.5.2               | 2.5.2            |

Milvus 2.5.0 brings significant advancements to enhance usability, scalability, and performance for users dealing with vector search and large-scale data management. With this release, Milvus integrates powerful new features like term-based search, clustering compaction for optimized queries, and versatile support for sparse and dense vector search methods. Enhancements in cluster management, indexing, and data handling introduce new levels of flexibility and ease of use, making Milvus an even more robust and user-friendly vector database.

### Key Features

#### Full Text Search

Milvus 2.5 supports full text search implemented with Sparse-BM25! This feature is an important complement to Milvus's strong semantic search capabilities, especially in scenarios involving rare words or technical terms. In previous versions, Milvus supported sparse vectors to assist with keyword search scenarios. These sparse vectors were generated outside of Milvus by neural models like SPLADEv2/BGE-M3 or statistical models such as the BM25 algorithm.

Powered by [Tantivy](https://github.com/quickwit-oss/tantivy), Milvus 2.5 has built-in analyzers and sparse vector extraction, extending the API from only receiving vectors as input to directly accepting text. BM25 statistical information is updated in real time as data is inserted, enhancing usability and accuracy. Additionally, sparse vectors based on approximate nearest neighbor (ANN) algorithms offer more powerful performance than standard keyword search systems.

For details, refer to [Analyzer Overview](analyzer-overview.md) and [Full Text Search](full-text-search.md).

#### Cluster Management WebUI (Beta)

To better support massive data and rich features, Milvus's sophisticated design includes various dependencies, numerous node roles, complex data structures, and more. These aspects can pose challenges for usage and maintenance.

Milvus 2.5 introduces a built-in Cluster Management WebUI, reducing system maintenance difficulty by visualizing Milvus's complex runtime environment information. This includes details of databases and collections, segments, channels, dependencies, node health status, task information, slow queries, and more.

For details, refer to [Milvus WebUI](milvus-webui.md).

#### Text Match

Milvus 2.5 leverages analyzers and indexing from [Tantivy](https://github.com/quickwit-oss/tantivy) for text preprocessing and index building, supporting precise natural language matching of text data based on specific terms. This feature is primarily used for filtered search to satisfy specific conditions and can incorporate scalar filtering to refine query results, allowing similarity searches within vectors that meet scalar criteria.

For details, refer to [Analyzer Overview](analyzer-overview.md) and [Text Match](keyword-match.md).

#### Bitmap Index

A new scalar data index has been added to the Milvus family. The BitMap index uses an array of bits, equal in length to the number of rows, to represent the existence of values and accelerate searches.

Bitmap indexes have traditionally been effective for low-cardinality fields, which have a modest number of distinct values—for example, a column containing gender information with only two possible values: male and female.

For details, refer to [Bitmap Index](bitmap.md).

#### Nullable & Default Value

Milvus now supports setting nullable properties and default values for scalar fields other than the primary key field. For scalar fields marked as `nullable=True`, users can omit the field when inserting data; the system will treat it as a null value or default value (if set) without throwing an error.

Default values and nullable properties provide greater flexibility to Milvus. Users can utilize this feature for fields with uncertain values when creating collections. It also simplifies data migration from other database systems to Milvus, allowing for handling datasets containing null values while preserving original default value settings.

For details, refer to [Nullable & Default Value](nullable-and-default.md).

#### Faiss-based HNSW SQ/PQ/PRQ

Through close collaboration with the Faiss community, the HNSW algorithm in Faiss has seen significant improvements in both functionality and performance. For considerations of stability and maintainability, Milvus 2.5 has officially migrated its support for HNSW from hnswlib to Faiss.

Based on Faiss, Milvus 2.5 supports multiple quantization methods on HNSW to meet the needs of different scenarios: SQ (Scalar Quantizers), PQ (Product Quantizer), and PRQ (Product Residual Quantizer). SQ and PQ are more common; SQ provides good query performance and build speed, while PQ offers better recall at the same compression ratio. Many vector databases commonly use binary quantization, which is a simple form of SQ quantization.

PRQ is a fusion of PQ and AQ (Additive Quantizer). Compared to PQ, it requires longer build times to deliver better recall, especially at high compression rates, saying binary compression.

#### Clustering Compaction (Beta)

Milvus 2.5 introduces Clustering Compaction to accelerate searches and reduce costs in large collections. By specifying a scalar field as a clustering key, data is redistributed by range to optimize storage and retrieval. Acting like a global index, this feature enables Milvus to efficiently prune data during queries based on clustering metadata, enhancing search performance when scalar filters are applied.

For details, refer to [Clustering Compaction](clustering-compaction.md).

### Other Features

#### Streaming Node (Beta)

Milvus 2.5 introduces a new component called the streaming node, which provides Write-Ahead Logging (WAL) services. This enables Milvus to achieve consensus before and after reading and writing channels, unlocking new features, functionalities, and optimizations. This feature is disabled by default in Milvus 2.5 and will be officially available in version 3.0.

#### IPv6 Support

Milvus now supports IPv6, allowing for expanded network connectivity and compatibility.

#### CSV Bulk Import

In addition to JSON and Parquet formats, Milvus now supports direct bulk import of data in CSV format.

#### Expression Templates for Query Acceleration

Milvus now supports expression templates, improving expression parsing efficiency, particularly in scenarios with complex expressions.

For details, refer to [Filter Templating](filtering-templating.md).

#### GroupBy Enhancements

- **Customizable Group Size**: Added support for specifying the number of entries returned for each group.
- **Hybrid GroupBy Search**: Supports hybrid GroupBy search based on multiple vector columns.

#### Iterator Enhancements

- **MVCC Support**: Users can now use iterators without being affected by subsequent data changes like inserts and deletions, thanks to Multi-Version Concurrency Control (MVCC).
- **Persistent Cursor**: Milvus now supports a persistent cursor for QueryIterator, enabling users to resume iteration from the last position after a Milvus restart without needing to restart the entire iteration process.

### Improvements

#### Deletion Optimization

Improved the speed and reduced memory usage for large-scale deletions by optimizing lock usage and memory management.

#### Dependencies Upgrade

Upgraded to ETCD 3.5.16 and Pulsar 3.0.7 LTS, fixing existing CVEs and enhancing security. Note: The upgrade to Pulsar 3.x is not compatible with previous 2.x versions.

For users who already have a working Milvus deployment, you need to upgrade the ETCD and Pulsar components before you can use the new features and functions. For details, refer to [Upgrade Pulsar from 2.x to 3.x](upgrade-pulsar-v3.md)

#### Local Storage V2

Introduced a new local file format in Milvus 2.5, enhancing loading and query efficiency for scalar data, reducing memory overhead, and laying the groundwork for future optimizations.

#### Expression Parsing Optimization

Improved expression parsing by implementing caching for repeated expressions, upgrading ANTLR, and optimizing the performance of `NOT IN` clauses.

#### Improved DDL Concurrency Performance

Optimized the concurrency performance of Data Definition Language (DDL) operations.

#### RESTful API Feature Alignment

Aligned the functionalities of the RESTful API with other SDKs for consistency.

#### Security & Configuration Updates

Supported TLS to secure inter-node communication in more complex or enterprise environments. For details, refer to [Security Configuration](tls.md).

#### Compaction Performance Enhancements

Removed maximum segment limitations in mixed compaction and now prioritizes smaller segments first, improving efficiency and speeding up queries on large or fragmented datasets.

#### Score-Based Channel Balancing

Introduced a policy that dynamically balances loads across channels, enhancing resource utilization and overall stability in large-scale deployments.
