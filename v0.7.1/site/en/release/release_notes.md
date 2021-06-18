---
id: release_notes.md
title: Release Notes
sidebar_label: Release Notes
---

# Release Notes

## v0.7.1

**Release date**：2020-3-30

**Compatibility**

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| -------------- | ------------------ | ---------------- | -------------- |
| 0.7.1          | 0.2.9              | 0.6.0            | 0.2.0          |

#### New features

- Added new distance metrics, including substructure and superstructure, for the `FLAT` index type. These metrics are used for substructure and superstructure search of chemical structures.[#1603](https://github.com/milvus-io/milvus/issues/1603).

#### Enhancements

- Improved the performance of the compact operation. [#1619](https://github.com/milvus-io/milvus/issues/1619)
- Improved search performance using CPU, especially for scenarios with multiple, concurrent connections. [#267](https://github.com/milvus-io/milvus/issues/267)
- Improved the search performance when nq is less than the number of threads in the CPU. [#1690](https://github.com/milvus-io/milvus/issues/1690)
- Milvus performs a combined search for the same search requests from multiple clients, thus significantly improving search speed. [#1728](https://github.com/milvus-io/milvus/issues/1728)
- Upgraded Mishards to 0.7.1. [#1698](https://github.com/milvus-io/milvus/issues/1698)

#### Bug fixes

Refer to [CHANGELOG](https://github.com/milvus-io/milvus/blob/master/CHANGELOG.md) for details.

## v0.7.0

**Release date**：2020-3-10

**Compatibility**

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| -------------- | ------------------ | ---------------- | -------------- |
| 0.7.0          | 0.2.8              | 0.5.0            | 0.1.0          |

#### New features

- **Vector deletion**

  Added support to delete one or multiple vectors. If you performed vector deletion on a collection, later search operations for this collection are limited to part of the index types, including FLAT, IVFLAT, IVFSQ8, etc. Milvus is planned to support other index types in the upcoming versions.[#861](https://github.com/milvus-io/milvus/pull/861)

- **Get vector by ID**

  Added support to get vector data by ID. [#861](https://github.com/milvus-io/milvus/pull/861)

- **Flush and compact**

  Added support to flushing and compaction. You can configure flushing at an interval or manual flushing to avoid data loss. If some vectors are deleted from a segment, the space taken by the deleted vectors cannot be released automatically. You can compact segments in a collection to release space. [#861](https://github.com/milvus-io/milvus/pull/861) [#1426](https://github.com/milvus-io/milvus/pull/1426)

- **Change Milvus server configurations during runtime**

  Added support to update Milvus server configurations during runtime. You can use Milvus clients to update the parameters. Changes to some parameters take effect immediately without restarting Milvus. [#665](https://github.com/milvus-io/milvus/pull/665)

- **Write-Ahead logging (WAL)**

  Added support for WAL, which significantly improves the reliability of data operations. You can configure WAL settings in the Milvus server configuration file (`server_config.yaml`). [#830](https://github.com/milvus-io/milvus/pull/830)

- **RESTful API**

  Added RESTful API. Refer to [RESTful API Readme](https://github.com/milvus-io/milvus/blob/master/core/src/server/web_impl/README.md) for more information.

- **Go SDK**

  Added Go SDK. Refer to [https://github.com/milvus-io/milvus-sdk-go](https://github.com/milvus-io/milvus-sdk-go) for more information.

- **HNSW index support**

  Added support for HNSW index type. Refer to [Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs](https://arxiv.org/abs/1603.09320) for more information about HNSW. [#853](https://github.com/milvus-io/milvus/pull/853)

- **Jaccard/Hamming/Tanimoto distance support**

  Added support for Jaccard distance, Hamming distance, and Tanimoto distance. [#823](https://github.com/milvus-io/milvus/pull/823)

- **Pushgateway support in Prometheus**

  Added support for Pushgateway in Prometheus. Pushgateway makes it possible for short-lived, batch metrics to be acquired by Prometheus. [#813](https://github.com/milvus-io/milvus/pull/813)

- **AVX 512**

  Added support for AVX 512 instruction set. Milvus theoretically supports all CPUs with AVX 512. [#1122](https://github.com/milvus-io/milvus/pull/1122)

#### Changes

- **Interface updates for index creation and vector search**

  Starting from Milvus 0.7.0, part of the Milvus client parameters for index creation and vector search use JSON strings as values.

- **Milvus server configuration file updates**

  Starting from Milvus 0.7.0, the Milvus server configuration file (`server_config.yaml`) is updated to 0.2 with parameter changes.

- **Term updates**

  Starting from Milvus 0.7.0, `Table` is named as `Collection` in Milvus.

#### Bug fixes

- Resolved the issue that duplicate IDs may be generated when inserting vector data using auto-generated IDs. [#1508](https://github.com/milvus-io/milvus/pull/1508)

---

## v0.6.0

**Release date**: 2019-12-07

**Version Compatibility**

| Milvus version | pymilvus version | Java SDK version |
| -------------- | ---------------- | ---------------- |
| 0.6.0          | 0.2.6            | 0.4.0            |

#### New features

- **CPU-only Milvus**

  Milvus v0.6.0 provides Docker images for both CPU-only and GPU support Milvus. Milvus compilation on Docker is also supported on machines with or without GPU. [#192](https://github.com/milvus-io/milvus/pull/192)

- **Table partitioning**

  Add table partitioning funtion to secure fast query performance for incremental data. Partitioning APIs are added to Python, Java and C++ SDK to support partition creation, vector insertion into a specified partition and query against a specified partition, etc. [#245](https://github.com/milvus-io/milvus/pull/245)

- **Experimental features**

  The experimental features in Milvus are still under development and subject to change. They may contain unknown errors, and are intended for testing and user feedback gathering.

  - **Mishards**

    Propose Mishards, a Milvus sharding middleware, as the distributed deployment solution. Mishards provides unlimited extension of memory and computation capacity through request forwarding, read/write splitting, horizontal scalability and dynamic extension. [#232](https://github.com/milvus-io/milvus/pull/232)

  - **New index types**

    Start supporting new experimental index types such as `SPTAG-KDT`, `SPTAG-BKT`, `RNSG` and `IVFPQ`. [SPTAG#438](https://github.com/milvus-io/milvus/pull/438) [RNSG#554](https://github.com/milvus-io/milvus/pull/554) [IVFPQ#324](https://github.com/milvus-io/milvus/pull/324)

- **Index test reports**

  Provide performance [test reports](https://github.com/milvus-io/milvus/tree/master/docs) for `IVFFLAT`, `IVFSQ8` and `IVFSQ8H` indexes.

#### Improvements

- **Milvus internal FAISS**

  In addition to original FAISS, Milvus has made deep optimizations to increase query performance and support more index types such as `IVFSQ8H`. Now this part of internal FAISS is open sourced. [#585](https://github.com/milvus-io/milvus/pull/585)

- **Multiple GPUs for index building**

  Support index building by multiple GPUs to reduce index building and overall query time. You can specify multiple GPUs for index building process through Milvus configuration parameter `build_index_resources`. [#414](https://github.com/milvus-io/milvus/pull/414)

#### Bug fixes

- Solved the issue of increased memory usage during vector queries. [#335](https://github.com/milvus-io/milvus/pull/335)

---

## v0.5.3

**Release date**: 2019-11-14

**Version Compatibility**

| Milvus version | pymilvus version | Java SDK version |
| -------------- | ---------------- | ---------------- |
| 0.5.3          | 0.2.5            | 0.3.0            |

#### Enhancements

- Double the transmission speed of search results to the client application through the following updates to gRPC:

  - Optimize messages.
  - Change the API of generated code.
  - Remove compression.

- Python SDK

  - Divide the storage of search result ids and distances into separate arrays, which reduces the API response time.
  - Add a new option to retrieve a specific target vector in search results: `id = results.id_array[i][j], distance = results.distance_array[i][j]`.
  - Add a new option for looping over arrays, which takes much less time if `nq` and `topk` is large.

    ```python
    >> for id_list, dis_list in zip(results.id_array, results.distance_array):
    >>     for id, dis in zip(id_list, dis_list):
    >>        print("id={}, distance={}".format(id, dis))
    ```

- Java SDK

  - Add keepalive and idleTimeout settings when connecting to Milvus server.
  - Now users can retrieve search result ids and distances separately through `getResultIdsList` and `getResultDistancesList` with better performance, or they can retrieve them together as a list of `QueryResult` objects through `getQueryResultsList`.

- C++ SDK

  - Now C++ SDK uses shared library.
  - Add README file.

- Enhance the search performance of `IVF_SQ8H`.

---

## v0.5.2

**Release date**: 2019-11-07

#### Bug fixes

Add a system lock to avoid the generation of files with duplicated data file names, which fixes the bug of search failure due to false deletion of files that have duplicated file names.

#### Enhancements

Add a Japanese version of README file. (from an external contributor)

---

## v0.5.1

**Release date**: 2019-11-04

#### Features

- Start supporting GPU-only mode for `IVF_SQ8` and `IVFFLAT` index types.
- Add configuration parameter `gpu_search_threshold` to control GPU-only execution trigger point.

#### Enhancements

- Reduce memory footprint of queries.
- Optimize query performance to achieve unfluctuating search speed.

---

## v0.5.0

**Release date**: 2019-10-15

#### Features

- Start supporting a new index type `IVF_SQ8H`.

- Add Java SDK.

- Add preload table into memory at Milvus startup.

---

## v0.4.0

**Release date**: 2019-09-11

#### Features

- Milvus now supports adding multiple GPU scheduler for resource management.

- Start supporting a new index type `IVF_SQ8`.

- Add new API about index creation, user-defined vector ids, and vector deletion by date range, etc.

#### Improvements

- Use gRPC as the communication facility.

---

## v0.3.1

**Release date**: 2019-08-08

#### Features

- Added a new type of index `IVFSQ` which could significantly improve the overall throughput of vector processing.
- Added a new metric of vector distance calculation `IP` (Inner Product), in addition to `L2` (Euclidean Distance).
- Added multiple parameters which optimizes index building, search precision and search speed.

#### Improvements

- When the data size is huge and cannot fit in the data file on one disk, you can add multiple secondary data storage directories on other disks.
- You can choose if to enable parallel computing of vectors by multiple threads, by configuring parameter `parallel_reduce`.
- You can designate a portion of the memory for buffer usage of data insertion, by configuring parameter `insert_buffer_size`.
- In regard to cache management, by configuring `cache_free_percent`, you can now decide, when the cache reaches its capacity, how much data should be kept instead of being erased.
- You can enable simultaneous inserting and searching of vectors by setting `insert_cache_immediately` to `True`.
- Search results are evaluated based on the distances between search results and the target vectors, rather than the score.

---

## v0.3.0

**Release date**: 2019-06-30

#### Features

- Distributed architecture based on Celery
- MinIO based storage separation solution
- You can now delete a table
- ARM64 architecture is now supported

#### Improvements

- File life cycle management
- More interface on C++/Python SDK
- Lots of update on Milvus configure
- Mem table serialization and SSTable consolidation strategy improved
- Improved the Meta management implementation
- 90%+ unit test code coverage
- CMake makefile refactoring
- Improved the time range query

---

## v0.2.1

**Release date**: 2019-06-14

#### Features

Added data loading and computation pipeline.

#### Improvements

You can now search data within a specific date range.

---

## v0.2.0

**Release date**: 2019-05-31

#### Features

- Added C++/Python SDK.
- Added monitoring items on Prometheus-based monitoring dashboard.
- Added vector indexing built on Inverted File.
- Single node Milvus realized.
