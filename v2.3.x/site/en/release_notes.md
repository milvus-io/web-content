---
id: release_notes.md
summary: Milvus Release Notes
---
# Release Notes

Find out what’s new in Milvus! This page summarizes new features, improvements, known issues, and bug fixes in each release. You can find the release notes for each released version after v2.2.0 in this section. We suggest that you regularly visit this page to learn about updates.

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

Users now can use the upsert API in Milvus for updating or inserting data. It is important to note that the upsert API combines search, delete, and insert operations, which may result in a degradation of performance. Therefore, it is recommended to use the insert APIs for specific and definitive insertions, while reserving the upsert APIs for more ambiguous scenarios.

### Range Search

Users now have the option to set a distance range using arguments to retrieve specific results within that range in Milvus.

```python
// add radius and range_filter to params in search_params
search_params = {"params": {"nprobe": 10, "radius": 10, "range_filter" : 20}, "metric_type": "L2"}
res = collection.search(
    vectors, "float_vector", search_params, topK,
    "int64 > 100", output_fields=["int64", "float"]
)
```

In the above example, the returned vectors will have distances ranging from 10 to 20 regarding the query vector. It is important to note that the method of distance measurement varies depending on the chosen metric type. Therefore, it is recommended to familiarize yourself with each metric type before applying a range search. Additionally, please be aware that the maximum number of vectors returned is limited to 16384.

### Count

In previous releases, users would often use the num_entities API to retrieve the total number of entities in a collection. However, it is important to note that the num_entities API only applies to entities within sealed segments. Making frequent calls to the flush API can result in the creation of numerous small segments, which can negatively impact the stability of the system and the performance of data retrieval in Milvus.

In this release, Milvus introduces the count statement as an alternative solution for users to obtain the number of entities in a collection without relying on the flush API.

Please be aware that the count statement consumes system resources, and it is advisable to avoid calling it frequently to prevent unnecessary resource consumption.

### Cosine Metrics

The Cosine Metrics is widely regarded as the standard method for measuring the distance between vectors, particularly in Large Language Models (LLMs). With the release of Milvus 2.3.0, cosine metrics are now natively supported. As a result, users no longer need to quantize vectors for IP (Inner Product) metrics.

### Raw Vectors in Search Returns

Starting from Milvus 2.3.0, the capability to include raw vectors in search results is introduced for certain metrics. However, please note that including raw vectors in search results necessitates secondary searches, which can potentially impact performance. In scenarios where performance is critical, it is recommended to use indexes such as HNSW and IVF_FLAT, which inherently support the inclusion of vectors in their search results. It's important to mention that this feature currently does not apply to quantization-related indexes like IVF_PQ and IVF_SQ8. For more detailed information, please refer to [https://github.com/zilliztech/knowhere/releases](https://github.com/zilliztech/knowhere/releases).

### ScaNN 

Milvus now includes support for FAISS' FastScan, which has demonstrated a 20% performance improvement compared to HNSW and a 7-fold increase compared to IVF-FLAT in multiple benchmark tests. ScaNN, an index-building algorithm similar to IVF-PQ, offers a faster index-building process. However, it's important to note that using ScaNN may result in a potential loss of precision and therefore requires refinement using the raw vectors.

The table below presents performance comparison results obtained using [VectorDBBench](https://github.com/zilliztech/VectorDBBench). It evaluates the performance of ScaNN, HNSW, and IVF-FLAT in handling data retrieval from a 768-dimensional vector dataset sourced from Cohere.

| Index    | Case         | QPS | Latency (P99) ms | Recall |
|----------|--------------|-----|------------------|--------|
| ScaNN    | 99% filtered | 626 | 0.0069           | 0.9532 |
|          | 1% filtered  | 750 | 0.0063           | 0.9493 |
|          | 0% filtered  | 883 | 0.0051           | 0.9491 |
| IVF-FLAT | 99% filtered | 722 | 0.0061           | 0.9532 |
|          | 1% filtered  | 122 | 0.0161           | 0.9493 |
|          | 0% filtered  | 123 | 0.0154           | 0.9494 |
| HNSW     | 99% filtered | 773 | 0.0066           | 1.0    |
|          | 1% filtered  | 355 | 0.0081           | 0.9839 |
|          | 0% filtered  | 696 | 0.0054           | 0.9528 |

### Iterator

PyMilvus now includes support for iterators, enabling users to retrieve more than 16,384 entities in a search or range search operation. The iterator functionality operates similarly to ElasticSearch's scroll API and the cursor concept in relational databases.

### JSON_CONTAINS

Starting from Milvus 2.3.0, users can utilize the JSON_CONTAINS expressions to retrieve entities whose JSON field values contain one or a specified set of elements. This feature enhances the flexibility and capability of filtering and querying data within Milvus.

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

Modifying configurations is a common operation for database maintenance and optimization. Starting from this version, Milvus supports dynamically modifying configuration parameters without the need to restart the cluster. There are two supported methods: modifying key-value pairs in etcd or directly modifying the `milvus.yaml` configuration file. It is important to note that not all configuration parameters can be modified dynamically. Please refer to the Milvus documentation for more details.

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

