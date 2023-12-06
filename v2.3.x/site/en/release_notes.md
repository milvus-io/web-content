---
id: release_notes.md
summary: Milvus Release Notes
---
# Release Notes

Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.3.0 in this section. We suggest that you regularly visit this page to learn about updates.

## 2.3.3

Release date: Nov 10, 2023

| Milvus version | Python SDK version | Java SDK version | Go SDK version | Node.js SDK version |
|----------------|--------------------|------------------|----------------|---------------------|
| 2.3.3          | 2.3.3              | 2.3.3            | 2.3.3          | 2.3.3               |

Milvus 2.3.3 was a bugfix version that focused on minimizing business interruption during rolling upgrades to less than 30 seconds. Additionally, it aimed to enhance the performance of vector retrieval during searches. Critical bugs related to filtering on array types and the possible appearance of deleted data were addressed. Note that we also bumped Knowhere up to [2.2.2](https://github.com/zilliztech/knowhere/releases/tag/v2.2.2) in this release.

### Features

Supported pure list JSON in bulk insert ([#28126](https://github.com/milvus-io/milvus/pull/28126))

### Improvements

- Constructed a plan directly when searching with vector output ([#27963](https://github.com/milvus-io/milvus/pull/27963))
- Removed binlog/delta log from getRecoveryInfoV2 ([#27895](https://github.com/milvus-io/milvus/pull/27895)) ([#28090](https://github.com/milvus-io/milvus/pull/28090))
- Refined code for fixed-length types array ([#28109](https://github.com/milvus-io/milvus/pull/28109))
- Improved rolling upgrade unserviceable time
  - Refined stop order ([#28016](https://github.com/milvus-io/milvus/pull/28016)) ([#28089](https://github.com/milvus-io/milvus/pull/28089))
  - Set qcv2 index task priority to Low ([#28117](https://github.com/milvus-io/milvus/pull/28117)) ([#28134](https://github.com/milvus-io/milvus/pull/28134))
  - Removed retry in getShards ([#28011](https://github.com/milvus-io/milvus/pull/28011)) ([#28091](https://github.com/milvus-io/milvus/pull/28091))
  - Fixed load index for stopping node ([#28047](https://github.com/milvus-io/milvus/pull/28047)) ([#28137](https://github.com/milvus-io/milvus/pull/28137))
  - Fixed retry on offline node ([#28079](https://github.com/milvus-io/milvus/pull/28079)) ([#28139](https://github.com/milvus-io/milvus/pull/28139))
  - Fixed QueryNode panic while upgrading ([#28034](https://github.com/milvus-io/milvus/pull/28034)) ([#28114](https://github.com/milvus-io/milvus/pull/28114))
  - Fixed coordinator fast restart by deleting old session ([#28205](https://github.com/milvus-io/milvus/pull/28205))
  - Fixed check grpc error logic ([#28182](https://github.com/milvus-io/milvus/pull/28182)) ([#28218](https://github.com/milvus-io/milvus/pull/28218))
  - Delayed the cancellation of ctx when stopping the node ([#28249](https://github.com/milvus-io/milvus/pull/28249))
  - Disabled auto balance when an old node exists ([#28191](https://github.com/milvus-io/milvus/pull/28191)) ([#28224](https://github.com/milvus-io/milvus/pull/28224))
  - Fixed auto balance block channel reassign after datanode restart ([#28276](https://github.com/milvus-io/milvus/pull/28276))
  - Fixed retry when proxy stopped ([#28263](https://github.com/milvus-io/milvus/pull/28263))
- Reduced useless ObjectExists in AzureBlobManager ([#28157](https://github.com/milvus-io/milvus/pull/28157))
- Got vector concurrently ([#28119](https://github.com/milvus-io/milvus/pull/28119))
- Forced set Aliyun use_virtual_host to true for all ([#28237](https://github.com/milvus-io/milvus/pull/28237))
- Fixed delete session key with prefix causing multiple QueryNode crashes ([#28267](https://github.com/milvus-io/milvus/pull/28267))

### Bug Fixes

- Fixed script stop unable to find Milvus process ([#27958](https://github.com/milvus-io/milvus/pull/27958))
- Fixed timestamp reordering issue with delete records ([#27941](https://github.com/milvus-io/milvus/pull/27941)) ([#28113](https://github.com/milvus-io/milvus/pull/28113))
- Fixed prefix query with longer subarray potentially causing a crash ([#28112](https://github.com/milvus-io/milvus/pull/28112))
- Limited max thread num for pool ([#28018](https://github.com/milvus-io/milvus/pull/28018)) ([#28115](https://github.com/milvus-io/milvus/pull/28115))
- Fixed sync distribution with the wrong version ([#28130](https://github.com/milvus-io/milvus/pull/28130)) ([#28170](https://github.com/milvus-io/milvus/pull/28170))
- Added a custom HTTP header: Accept-Type-Allow-Int64 for JS client ([#28125](https://github.com/milvus-io/milvus/pull/28125))
- Fixed bug for constructing ArrayView with fixed-length type ([#28186](https://github.com/milvus-io/milvus/pull/28186))
- Fixed bug for setting index state when IndexNode connecting failed ([#28221](https://github.com/milvus-io/milvus/pull/28221))
- Fixed bulk insert bug that segments are compacted after import ([#28227](https://github.com/milvus-io/milvus/pull/28227))
- Fixed the target updated before version updated to cause data missing ([#28257](https://github.com/milvus-io/milvus/pull/28257))
- Handled exceptions while loading ([#28306](https://github.com/milvus-io/milvus/pull/28306))

## v2.3.2

Release date: Oct 26, 2023

| Milvus version | Python SDK version | Java SDK version | Go SDK version | Node.js SDK version |
|----------------|--------------------|------------------|----------------|---------------------|
| 2.3.2          | 2.3.2              | 2.3.2            | 2.3.2          | 2.3.3               |

We're thrilled to unveil Milvus 2.3.2, enriched with an array of novel features. Experience support for array data types, delve into intricate delete expressions, and celebrate the return of binary metric types such as SUBSTRUCTURE/SUPERSTRUCTURE. 

This release promises enhanced performance through minimized data copying during loading and better bulk insertions. Coupled with heightened error messaging and handling, you're in for a smoother experience. Notably, our commitment to rolling upgrade stability ensures minimized service disruptions during updates.

## Breaking Changes

- Discontinued TimeTravel in compactor ([#26785](https://github.com/milvus-io/milvus/pull/26785))
- Phased out mysql metastore ([#26633](https://github.com/milvus-io/milvus/pull/26633))

### New Features

- Array datatype now supported ([#26369](https://github.com/milvus-io/milvus/pull/26369))
  - Doc page: [Use Array Fields](https://milvus.io/docs/array_data_type.md)
- Introduced complex delete expressions ([#25752](https://github.com/milvus-io/milvus/pull/25752))
  - Doc page: [Delete Entities](https://milvus.io/docs/delete_data.md)  
- Reintroduced binary metric types SUBSTRUCTURE/SUPERSTRUCTURE ([#26766](https://github.com/milvus-io/milvus/pull/26766))
- Vector index mmap now available ([#26750](https://github.com/milvus-io/milvus/pull/26750))
- CDC: Added capability to replicate mq messages ([#27240](https://github.com/milvus-io/milvus/pull/27240))
- Facilitated renaming of database names within collections ([#26543](https://github.com/milvus-io/milvus/pull/26543))
- Activated bulk insert of binlog data with partition keys ([#27241](https://github.com/milvus-io/milvus/pull/27241))
- Enhanced support for multiple index engines ([#27178](https://github.com/milvus-io/milvus/pull/27178))
- Introduced chunk cache to fetch raw vectors:
  - Newly added ChunkCache facilitates vector retrieval from storage ([#26142](https://github.com/milvus-io/milvus/pull/26142))
- Implemented Tikv as a distributed meta solution:
  - Integrated Tikv ([#26246](https://github.com/milvus-io/milvus/pull/26246))
- Rolled out float16 vector support ([#25852](https://github.com/milvus-io/milvus/pull/25852))
  - Note: Index for float16 vector coming in the next version
- Restful updates:
  - Unveiled new interface for upsert ([#27787](https://github.com/milvus-io/milvus/pull/27787))
    - Doc page: [upsert](https://milvus.io/api-reference/restful/v2.3.x/Vector%20Operations/upsert.md)
  - Context enriched with grpc metadata ([#27668](https://github.com/milvus-io/milvus/pull/27668))
  - Defined component listening IP ([#27161](https://github.com/milvus-io/milvus/pull/27161))

### Performance Enhancements

- Optimized data loading by minimizing data copy operations ([#26746](https://github.com/milvus-io/milvus/pull/26746))
- Streamlined bulk inserts with batched varchar reading ([#26199](https://github.com/milvus-io/milvus/pull/26199))
- Improved handling of large structs using pointer receivers ([#26668](https://github.com/milvus-io/milvus/pull/26668))
- Removed unnecessary offset checks during data fills ([#26666](https://github.com/milvus-io/milvus/pull/26666))
- Addressed high CPU consumption linked to proto.size ([#27054](https://github.com/milvus-io/milvus/pull/27054))
- Optimized scalar column data with MADV_WILLNEED ([#27170](https://github.com/milvus-io/milvus/pull/27170))

### Additional Enhancements

- Robust rolling upgrade capabilities:
  - Significant improvement in system availability during rolling upgrades, ensuring minimal service interruptions.
- Upgraded error messaging and handling for a seamless experience.
- Optimized flushing processes:
  - Addressed issues where delete commands weren't being saved during flush operations.
  - Resolved slow flush-related issues.
  - Segregated task queues for Flush and DDL to prevent mutual blockages.
- Improved RocksMQ seek speeds ([#27646](https://github.com/milvus-io/milvus/pull/27646)) and standalone recovery times.
- Streamlined compact tasks ([#27899](https://github.com/milvus-io/milvus/pull/27899))
- Added a channel manager in DataNode ([#27308](https://github.com/milvus-io/milvus/pull/27308))
- Refined chunk management:
  - Removed MultiRemoveWithPrefix ([#26924](https://github.com/milvus-io/milvus/pull/26924))
  - Enhanced minio chunk handling ([#27510](https://github.com/milvus-io/milvus/pull/27510))
  - Simplified ChunkCache path initialization ([#27433](https://github.com/milvus-io/milvus/pull/27433))
  - Configurable read-ahead policy in ChunkCache ([#27291](https://github.com/milvus-io/milvus/pull/27291))
  - Rectified chunk manager usage issues ([#27051](https://github.com/milvus-io/milvus/pull/27051))
- Integrated grpc compression ([#27894](https://github.com/milvus-io/milvus/pull/27894))
- Decoupled client-server API interfaces ([#27186](https://github.com/milvus-io/milvus/pull/27186))
- Transitioned etcd watch-related code to event manager ([#27192](https://github.com/milvus-io/milvus/pull/27192))
- Displayed index details during GetSegmentInfo ([#26981](https://github.com/milvus-io/milvus/pull/26981))

### Bug Fixes

- Resolved concurrent string parsing expression issues ([#26721](https://github.com/milvus-io/milvus/pull/26721))
- Fixed connection issues with Kafka under SASL_SSL ([#26617](https://github.com/milvus-io/milvus/pull/26617))
- Implemented error responses for yet-to-be-implemented APIs, replacing panic reactions ([#26589](https://github.com/milvus-io/milvus/pull/26589))
- Addressed data race concerns:
  - Mitigated gRPC client data race issues ([#26574](https://github.com/milvus-io/milvus/pull/26574))
  - Rectified config data race with FileSource ([#26518](https://github.com/milvus-io/milvus/pull/26518))
- Mended partition garbage collection issues ([#27816](https://github.com/milvus-io/milvus/pull/27816)).
- Rectified SIGSEGV errors encountered when operating within gdb ([#27736](https://github.com/milvus-io/milvus/pull/27736)).
- Addressed thread safety issues in glog for standalone mode ([#27703](https://github.com/milvus-io/milvus/pull/27703)).
- Fixed instances where segments were inadvertently retained post-task cancellations ([#26685](https://github.com/milvus-io/milvus/pull/26685)).
- Resolved loading failures for collections exceeding 128 partitions ([#26763](https://github.com/milvus-io/milvus/pull/26763)).
- Ensured compatibility with scalar index types such as marisa-trie and Ascending ([#27638](https://github.com/milvus-io/milvus/pull/27638)).
- Corrected issues causing retrieval to sometimes exceed specified result limits ([#26670](https://github.com/milvus-io/milvus/pull/26670)).
- Solved startup failures in rootcoord due to role number limits ([#27361](https://github.com/milvus-io/milvus/pull/27361)).
- Patched Kafka consumer connection leaks ([#27224](https://github.com/milvus-io/milvus/pull/27224)).
- Disabled the enlarging of indices for flat structures ([#27309](https://github.com/milvus-io/milvus/pull/27309)).
- Updated garbage collector to fetch metadata post-storage listing ([#27203](https://github.com/milvus-io/milvus/pull/27203)).
- Fixed instances of datanode crashes stemming from simultaneous compaction and delete processes ([#27167](https://github.com/milvus-io/milvus/pull/27167)).
- Ironed out issues related to concurrent load logic in querynodev2 ([#26959](https://github.com/milvus-io/milvus/pull/26959)).

## v2.3.1

Release date: Sep 22, 2023

| Milvus version | Python SDK version | Java SDK version | Go SDK version | Node.js SDK version |
|----------------|--------------------|------------------|----------------|---------------------|
| 2.3.1          | 2.3.1              | 2.3.1            | 2.3.1          | 2.3.2               |

We are excited to introduce Milvus 2.3.1, a patch release that includes several enhancements and bug fixes. These improvements are designed to enhance system stability and performance.

### Features

- Restored support for SUBSTRUCTURE/SUPERSTRUCTURE binary metric types ([#26766](https://github.com/milvus-io/milvus/pull/26766)).
- Displayed index information during GetSegmentInfo ([#26981](https://github.com/milvus-io/milvus/pull/26981)).

### Performance Improvement

- Improved loading mechanism ([#26746](https://github.com/milvus-io/milvus/pull/26746)): Unnecessary data copies have been reduced, resulting in enhanced overall load performance.
- Optimized MMap performance ([#26750](https://github.com/milvus-io/milvus/pull/26750)): The efficiency and capacity of MMap have been enhanced.
- Refactored storage merge insert data ([#26839](https://github.com/milvus-io/milvus/pull/26839)): The merging process has been optimized, leading to improved data node performance.
- Enhanced VARCHAR bulk insert speed ([#26199](https://github.com/milvus-io/milvus/pull/26199)): Batch processing reads have greatly improved the speed of VARCHAR bulk inserts.
- Utilized a pointer receiver for large structures ([#26668](https://github.com/milvus-io/milvus/pull/26668)): Memory copy has been enhanced by utilizing a pointer receiver.

### Enhancements

- Enhanced error handling in QueryNode ([#26910](https://github.com/milvus-io/milvus/pull/26910), [#26940](https://github.com/milvus-io/milvus/pull/26940), [#26918](https://github.com/milvus-io/milvus/pull/26918), [#27013](https://github.com/milvus-io/milvus/pull/27013), [#26904](https://github.com/milvus-io/milvus/pull/26904), [#26521](https://github.com/milvus-io/milvus/pull/26521), [#26773](https://github.com/milvus-io/milvus/pull/26773), [#26676](https://github.com/milvus-io/milvus/pull/26676)): Error messages have been made more descriptive and informative, improving the user experience.
- Enhanced Flush All API operations ([#26802](https://github.com/milvus-io/milvus/pull/26802), [#26769](https://github.com/milvus-io/milvus/pull/26769), [#26859](https://github.com/milvus-io/milvus/pull/26859)): The Flush, FlushAll, and GetFlushAllState API operations have undergone several improvements for better data syncing with object storage.
- Improved resilience of the RPC client with retry mechanism ([#26795](https://github.com/milvus-io/milvus/pull/26795)): The RPC client now has an enhanced retry mechanism, improving its resilience.
- Removed invalid offset check during data filling ([#26666](https://github.com/milvus-io/milvus/pull/26666)).
- Delayed connection reset for `Canceled` or `DeadlineExceeded` gRPC code ([#27014](https://github.com/milvus-io/milvus/pull/27014)).
- Achieved cleaner and more efficient error code management through miscellaneous code management and control enhancements ([#26881](https://github.com/milvus-io/milvus/pull/26881), [#26725](https://github.com/milvus-io/milvus/pull/26725), [#26713](https://github.com/milvus-io/milvus/pull/26713), [#26732](https://github.com/milvus-io/milvus/pull/26732)).

### Bug Fixes

- Fixed the index task retry issue ([#26878](https://github.com/milvus-io/milvus/pull/26878)): Canceled tasks are no longer marked as failed without retrying.
- Addressed load stability issues ([#26763](https://github.com/milvus-io/milvus/pull/26763), [#26959](https://github.com/milvus-io/milvus/pull/26959), [#26931](https://github.com/milvus-io/milvus/pull/26931), [#26813](https://github.com/milvus-io/milvus/pull/26813), [#26685](https://github.com/milvus-io/milvus/pull/26685), [#26630](https://github.com/milvus-io/milvus/pull/26630), [#27027](https://github.com/milvus-io/milvus/pull/27027)): Several stability issues related to load have been resolved.
- Resolved the segment retrieval issue ([#26670](https://github.com/milvus-io/milvus/pull/26670)): Retrieving now returns the correct number of results based on the specified limit.
- Fixed memory leak when putting duplicated segments ([#26693](https://github.com/milvus-io/milvus/pull/26693)).
- Fixed the bug for concurrent parsing expressions with strings ([#26721](https://github.com/milvus-io/milvus/pull/26721)).
- Fixed the panic caused by empty traceID ([#26754](https://github.com/milvus-io/milvus/pull/26754)) ([#26808](https://github.com/milvus-io/milvus/pull/26808)).
- Fixed the issue where timeout tasks never release the queue, leading to stuck compactions ([#26593](https://github.com/milvus-io/milvus/pull/26593)).

## v2.3.0
Release date: Aug 23, 2023

| Milvus version | Python SDK version | Java SDK version | Go SDK version | Node.js SDK version |
| -------------- | ------------------ | ---------------- | -------------- | ------------------- |
| 2.3.0          | 2.3.0              | 2.3.0            | 2.3.0          | 2.3.0               |

After months of meticulous refinement, we are pleased to announce the official release of Milvus 2.3.0. This highly anticipated release contains a wealth of exciting new features and enhancements, including GPU support, improved query architecture, enhanced load balancing capabilities, integrated message queues, Arm-compatible images, improved observability, and improved O&M tools. This represents a major leap forward in the maturity, reliability and usability of the Milvus 2.x series. We cordially invite community users to be among the first to explore them and request that any feedback or issues be submitted on GitHub. Let's work together to further refine and stabilize this exceptional 2.3.0 release.

## Breaking changes

### Deprecated Time Travel Feature

Due to its inactivity and the challenges it poses to the architecture design of Milvus, the time-travel feature has been deprecated in this release.

### Discontinued CentOS Support

As CentOS 7 is about to reach its end of service (EOS) and official images based on CentOS 8 and CentOS 9 are not available, Milvus no longer supports CentOS. Instead, starting from this release, Milvus will provide images using the Amazonlinux distribution. It's worth noting that Ubuntu-based images remain the well-tested and recommended option.

### Removed Index and Metrics Algorithms

The following algorithms have been removed in this release:

- ANNOY and RHNSW for index-building of float vectors
- TANIMOTO for index-building of binary vectors
- Superstructure and Substructure metrics

These changes have been made to streamline and optimize the functionality of Milvus.

## Upgraded Architecture

### GPU Support

Milvus had GPU support in its earlier versions (v1.x), but it was temporarily unavailable when Milvus transitioned to a distributed architecture in v2.x. Thanks to the contributions of NVIDIA engineers and their implementation of the RAFT algorithm for Milvus Knowhere, GPU support is once again available in Milvus. This latest update not only brings back GPU capabilities but also incorporates cutting-edge industry algorithms. In benchmark tests, Milvus with GPU support has demonstrated impressive performance improvements, achieving a three-fold increase in query per second (QPS) and even up to a ten-fold increase for certain datasets.

### Arm64 Support

With the growing popularity of Arm CPUs among cloud providers and developers, Milvus has recognized the importance of catering to the needs of both x86 and Arm architectures. To accommodate this demand, Milvus now offers images for both platforms. Additionally, the release of Arm images aims to provide MacOS users with a seamless experience when working with Milvus on their projects.

### Refactored QueryNode

QueryNode plays a vital role in data retrieval within Milvus, making its availability, performance, and extensibility essential. However, the legacy QueryNode had several reported issues, including complex status management, duplicate message queues, unclear code structure, and unintuitive error messages. To address these concerns, we have undertaken a significant refactoring effort. This involved transforming QueryNode into a stateless component and eliminating data-deletion-related message queues. These changes aim to enhance the overall functionality and usability of QueryNode within the Milvus system.

### Merged IndexCoord and DataCoord

We have merged IndexCoord and DataCoord into a single component, simplifying the deployment of Milvus. This consolidation reduces complexity and streamlines operations. Moving forward, subsequent releases will also witness the integration of certain functions of IndexNode and DataNode to align with this unified approach. These updates ensure a more efficient and seamless experience when utilizing Milvus.

### NATS-based Message Queue (Experimental)

The stability, extensibility, and performance of the message queue are of utmost importance to Milvus, given its log-based architecture. To expedite the development of Milvus 2.x, we have introduced support for Pulsar and Kafka as the core log brokers. However, these external log brokers have their limitations. They can exhibit instability when handling multiple topics simultaneously, complexity in managing duplicate messages, and resource management challenges when there are no messages to process. Additionally, their GO SDKs may have inactive communities.

To address these issues, we have made the decision to develop our own log broker based on NATS and Bookeeper. This custom message queue is currently undergoing experimentation, and we welcome feedback and comments from the community. Our aim is to create a robust and efficient solution that addresses the unique requirements of Milvus.

## New features

### Upsert

Users now can use the upsert API in Milvus for updating or inserting data. It is important to note that the upsert API combines search, delete, and insert operations, which may result in a degradation of performance. Therefore, it is recommended to use the insert APIs for specific and definitive insertions, while reserving the upsert APIs for more ambiguous scenarios. [Click here](upsert_entities.md) to read more.

### Range Search

Users now have the option to set a distance range using arguments to retrieve specific results within that range in Milvus.

```python
// add radius and range_filter to params in search_params
search_params = {"params": {"nprobe": 10, "radius": 20, "range_filter" : 10}, "metric_type": "L2"}
res = collection.search(
    vectors, "float_vector", search_params, topK,
    "int64 > 100", output_fields=["int64", "float"]
)
```

In the above example, the returned vectors will have distances ranging from 10 to 20 regarding the query vector. It is important to note that the method of distance measurement varies depending on the chosen metric type. Therefore, it is recommended to familiarize yourself with each metric type before applying a range search. Additionally, please be aware that the maximum number of vectors returned is limited to 16384. [Click here](within_range.md) to read more.

### Count

In previous releases, users would often use the num_entities API to retrieve the total number of entities in a collection. However, it is important to note that the num_entities API only applies to entities within sealed segments. Making frequent calls to the flush API can result in the creation of numerous small segments, which can negatively impact the stability of the system and the performance of data retrieval in Milvus.

In this release, Milvus introduces the count statement as an alternative solution for users to obtain the number of entities in a collection without relying on the flush API.

Please be aware that the count statement consumes system resources, and it is advisable to avoid calling it frequently to prevent unnecessary resource consumption. [Click here](query.md#Count-entities) to read more.

### Cosine Metrics

The Cosine Metrics is widely regarded as the standard method for measuring the distance between vectors, particularly in Large Language Models (LLMs). With the release of Milvus 2.3.0, cosine metrics are now natively supported. As a result, users no longer need to quantize vectors for IP (Inner Product) metrics. [Click here](metric.md#Cosine-Similarity) to read more.

### Raw Vectors in Search Returns

Starting from Milvus 2.3.0, the capability to include raw vectors in search results is introduced for certain metrics. However, please note that including raw vectors in search results necessitates secondary searches, which can potentially impact performance. In scenarios where performance is critical, it is recommended to use indexes such as HNSW and IVF_FLAT, which inherently support the inclusion of vectors in their search results. It's important to mention that this feature currently does not apply to quantization-related indexes like IVF_PQ and IVF_SQ8. For more detailed information, please refer to [https://github.com/zilliztech/knowhere/releases](https://github.com/zilliztech/knowhere/releases).

### ScaNN 

Milvus now includes support for FAISS' FastScan, which has demonstrated a 20% performance improvement compared to HNSW and a 7-fold increase compared to IVF-FLAT in multiple benchmark tests. ScaNN, an index-building algorithm similar to IVF-PQ, offers a faster index-building process. However, it's important to note that using ScaNN may result in a potential loss of precision and therefore requires refinement using the raw vectors.

The table below presents performance comparison results obtained using [VectorDBBench](https://github.com/zilliztech/VectorDBBench). It evaluates the performance of ScaNN, HNSW, and IVF-FLAT in handling data retrieval from a 768-dimensional vector dataset sourced from Cohere. [Click here](index.md#SCANN) to read more.

| Index    | Case         | QPS | Latency (P99) s  | Recall |
|----------|--------------|-----|------------------|--------|
| ScaNN    | 99% filtered | 626 | 6.9              | 0.9532 |
|          | 1% filtered  | 750 | 6.3              | 0.9493 |
|          | 0% filtered  | 883 | 5.1              | 0.9491 |
| IVF-FLAT | 99% filtered | 722 | 6.1              | 0.9532 |
|          | 1% filtered  | 122 | 16.1             | 0.9493 |
|          | 0% filtered  | 123 | 15.4             | 0.9494 |
| HNSW     | 99% filtered | 773 | 6.6              | 1.0    |
|          | 1% filtered  | 355 | 8.1              | 0.9839 |
|          | 0% filtered  | 696 | 5.4              | 0.9528 |

### Iterator

PyMilvus now includes support for iterators, enabling users to retrieve more than 16,384 entities in a search or range search operation. The iterator functionality operates similarly to ElasticSearch's scroll API and the cursor concept in relational databases. [Click here](with_iterators.md) to read more.

### JSON_CONTAINS

Starting from Milvus 2.3.0, users can utilize the JSON_CONTAINS expressions to retrieve entities whose JSON field values contain one or a specified set of elements. This feature enhances the flexibility and capability of filtering and querying data within Milvus. [Click here](boolean.md) to read more.

### CDC support

Change Data Capture (CDC) is a widely used functionality in databases, typically employed in scenarios such as active/standby data synchronization, incremental data backup, and data migration. For more detailed information on CDC, please refer to [https://github.com/zilliztech/milvus-cdc](https://github.com/zilliztech/milvus-cdc). 


## Enhancements

### MMap for capacity increase

MMap is a Linux kernel feature that allows the mapping of disk space to memory. This feature enables loading data into the hard drive and mmap-ing it to memory, thereby increasing the single-machine data capacity with a marginal 20% performance degradation. Users who prioritize cost-efficiency are encouraged to test this enhancement and evaluate its benefits.

### Performance improvement for data filtering

In hybrid searches, Milvus performs scalar queries and vector searches sequentially. This approach often leads to a high number of entities being filtered out after the scalar queries, which can significantly degrade the performance of the built vector index. In Milvus 2.3.0, by optimizing the data filtering policies in HNSW, we have improved the scalar query performance and resolved this issue, ensuring better overall performance during hybrid searches.

### Growing index

Milvus distinguishes between indexed data and stream data, each treated differently. Indexed data benefits from the built index, which accelerates the search process. On the other hand, stream data relies on brute-force search, which can potentially lead to performance degradation. To address this issue, Milvus introduces the concept of a growing index. This growing index ensures consistent search performance for both indexed and stream data, mitigating any potential performance degradation caused by brute-force search.

### Increased resource usage in the multi-core environment

Approximate nearest search (ANN) is a computationally intensive task that heavily relies on CPU usage. In previous releases, the CPU usage in Milvus could remain below 70% even when multiple cores were available. However, in Milvus 2.3.0, this limitation has been overcome, and the system can now fully utilize all available CPU resources for improved performance during ANN computations.

## Stability

### New load balancer

Milvus 2.1.0 introduced support for multiple replicas in memory to improve QPS. However, feedback from the community highlighted issues with immediate QPS improvement, longer system recovery time after node shutdown, workload imbalance among nodes, and low CPU utilization. To tackle these issues, we redesigned the load balancing algorithm with dynamic load adjustment based on real-time load information. This enhancement enables timely detection of node status changes and workload imbalances, resulting in efficient load management.

## Operability

### Dynamic Configuration

Modifying configurations is a common operation for database maintenance and optimization. Starting from this version, Milvus supports dynamically modifying configuration parameters without the need to restart the cluster. There are two supported methods: modifying key-value pairs in etcd or directly modifying the `milvus.yaml` configuration file. It is important to note that not all configuration parameters can be modified dynamically. [Click here](dynamic_config.md) to read more.

### Tracing support

Tracing is an important means of identifying bottleneck points in a system and is crucial for optimization. Starting from version 2.3.0, Milvus supports the Opentelemetry tracing protocol. Tracing collectors that support this protocol, such as Jaeger, can be used to observe Milvus's invocation path and analyze system performance.

### Error codes

Milvus has undergone a reorganization of its error codes according to the new design of the error code reporting system. As a result of this upgrade, error messages in Milvus will be more clear and concise, providing improved clarity in error reporting.

## Tools

### Birdwatcher upgrade

Through months of development, Birdwatcher incorporates the following features:

- RESTful API for seamless integration with other diagnostic systems.
- PProf command support to facilitate integration with the go pprof tool.
- Storage analysis capabilities.
- Efficient log analysis functionality.
- Ability to view and edit Milvus configuration in etcd.

### Attu upgrade

A newly designed GUI makes Attu more user-friendly.

![Attu](../../assets/attu-snapshot.png)

