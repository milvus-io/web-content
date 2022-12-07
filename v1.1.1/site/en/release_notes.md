---
id: release_notes.md
---

# Release notes

## v1.1.0

**Release date**：2021-05-07

#### Compatibility

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| :------------- | :----------------- | :--------------- | :------------- |
| 1.1.0         | 1.1.0             | 1.1.1            | 1.1.0          |

#### New Features

- [#4564](https://github.com/milvus-io/milvus/issues/4564) Supports specifying partition in a `get_entity_by_id()` method call.
- [#4806](https://github.com/milvus-io/milvus/issues/4806) Supports specifying partition in a `delete_entity_by_id()` method call. 
- [#4905](https://github.com/milvus-io/milvus/issues/4905) Adds the `release_collection()` method, which unloads a specific collection from cache.

#### Improvements

- [#4756](https://github.com/milvus-io/milvus/issues/4756) Improves the performance of the `get_entity_by_id()` method call.
- [#4856](https://github.com/milvus-io/milvus/issues/4856) Upgrades hnswlib to v0.5.0.
- [#4958](https://github.com/milvus-io/milvus/issues/4958) Improves the performance of IVF index training.

#### Fixed issues

- [#4778](https://github.com/milvus-io/milvus/issues/4778) Fails to access vector index in Mishards.
- [#4797](https://github.com/milvus-io/milvus/issues/4797) The system returns false results after merging search requests with different `topK` parameters.
- [#4838](https://github.com/milvus-io/milvus/issues/4838) The server does not respond immediately to an index building request on an empty collection.
- [#4858](https://github.com/milvus-io/milvus/issues/4858) For GPU-enabled Milvus, the system crashes on a search request with a large `topK` (> 2048).
- [#4862](https://github.com/milvus-io/milvus/issues/4862) A read-only node merges segments during startup.
- [#4894](https://github.com/milvus-io/milvus/issues/4894) The capacity of a Bloom filter does not equal to the row count of the segment it belongs to.
- [#4908](https://github.com/milvus-io/milvus/issues/4908) The GPU cache is not cleaned up after a collection is dropped.
- [#4933](https://github.com/milvus-io/milvus/issues/4933) It takes a long while for the system to build index for a small segment.
- [#4952](https://github.com/milvus-io/milvus/issues/4952) Fails to set timezone as "UTC + 5:30".
- [#5008](https://github.com/milvus-io/milvus/issues/5008) The system crashes randomly during continuous, concurrent delete, insert, and search operations.
- [#5010](https://github.com/milvus-io/milvus/issues/5010) For GPU-enabled Milvus, query fails on IVF_PQ if `nbits` &ne; 8.
- [#5050](https://github.com/milvus-io/milvus/issues/5050) `get_collection_stats()` returns false index type for segments still in the process of index building.
- [#5063](https://github.com/milvus-io/milvus/issues/5063) The system crashes when an empty segment is flushed.
- [#5078](https://github.com/milvus-io/milvus/issues/5078) For GPU-enabled Milvus, the system crashes when creating an IVF index on vectors of 2048, 4096, or 8192 dimensions.

## v1.0.0

**Release date**：2021-03-09

#### Compatibility

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| :------------- | :----------------- | :--------------- | :------------- |
| 1.0.0         | 1.0.x             | 1.0.x            | 1.0.x          |

#### New Features

- Supports writing log to stdout. [#3977](https://github.com/milvus-io/milvus/issues/3977)

#### Improvements

- Reduces the package size of grpc-milvus for the C++ SDK. [#4754](https://github.com/milvus-io/milvus/issues/4754)

#### Fixed issues

- Memory leaks during indexing or querying operations. [#4749](https://github.com/milvus-io/milvus/issues/4749), [#4757](https://github.com/milvus-io/milvus/issues/4757), [#4765](https://github.com/milvus-io/milvus/issues/4765), [#4766](https://github.com/milvus-io/milvus/issues/4766)

> - For more information about the features of Milvus 1.0, go to [What's Inside Milvus 1.0?](https://milvus.io/blog/Whats-Inside-Milvus-1.0.md).
> - For more information about its roadmap, see [Milvus 1.0: The World's Most Popular Open-Source Vector Database Just Got Better](https://milvus.io/blog/milvus-1-0-the-worlds-most-popular-open-source-vector-database-just-got-better.md).

