---
id: release_notes.md
title: Release Notes
sidebar_label: Release Notes
---

# Release notes

## v0.11.0

**Release note**：2020-10-16

#### Compatibility

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| :------------- | :----------------- | :--------------- | :------------- |
| 0.11.0     | 0.3.0     | 0.9.0       | Coming soon.      |

#### Compatibility changes

1. Updates the supported character set for naming a partition tag:
   
   - The supported character set for a partition tag must be within the range of all English letters, "_", and "$". 
   - The initial of a partition tag must be an English letter or an underscore. 

2. Restructures the server configuration file. 

   - Renames **server_config.yaml**  to **milvus.yaml**.
   - Compatible with the flattened setting format `a.b.c: value`.

3. Renames the indexes supporting binary embeddings:
   - Changes `IVF_FLAT` to `BIN_IVF_FLAT`.
   - Changes `FLAT` to `BIN_FLAT`.

4. Removes the `CreateCollection()` method.

   The new `CreateCollection()` method removes the original `index_file_size` parameter and adds the `segment_row_limit` parameter for setting the upper and lower limits of a segment. The row number of a segment is eventually [ 1 &times; `segment_row_limit`, 2 &times; `segment_row_limit`). 

5. Removes the `Search()` method. 

   The new `Search()` method adds the `MetricType` parameter for specifying the distance metric type.

6. Removes the `GetIndexInfo()` method.

   Uses `GetCollectionInfo()` instead to retrieve the corresponding information. 

7. v0.11.0 Milvus does not support the Mishards clustering solution. 

8. For Python and Java platforms, the SDK throws an exception when an operation fails. 
9. [RESTful] Supports retrieving entities by offset and page size. 
   
   See `collections/{collection_name}/entities (GET)` for more information.


#### New features

1. Scalar field filtering

As of this release, an embedding insert operation can carry scalar fields. 

You can use scalar field filtering in an embedding search. 

- Supports TermQuery and RangeQuery match patterns for scalar filtering. The latter supports the following four operators: 
   - Greater than: `gt`
   - Greater than or equal to: `gte`
   - Less than: `lt`
   - Less than or equal to: `lte`
- Supports `MUST`, `MUST_NOT`, and `SHOULD` operations between the vector field and scalar fields. 
- Supports returning scalar fields related to the search result. 

Supports creating index for scalar fields to speed up searches for structured data. 

2. Supports specifying `MetricType` in an embedding search.

   - If the `MetricType` specified in an embedding search equals the `MetricType` specified when creating an index, Milvus uses the index for the search; 
   - Otherwise, Milvus resorts to brute-force search. 

#### Improvements

1. Upgrades oatpp.

Upgrades the third-party dependency **oatpp** to v1.1.0, a more stable version. 

2. Rewrites SQLite-related codes.

Removes the third-party dependency **sqlite_orm**. 

3. Reorganizes the WAL directory.

As of this release, the WAL directory is organized by collection name. 

4. Metadata Snapshot

Supports Metadata-snapshot-based embedding search. 

When an insert or delete operation completes, Milvus creates a versioned Metadata snapshot and stores it in the memory so that an incoming search operation can use the corresponding Metadata snapshot. 


5. Separates raw data from index. 

For IVF_FLAT and HNSW, **index\_file** no longer holds raw data and uses offsets of the embeddings instead to avoid overuse of the disk.  



#### API changes



<div class="filter">
<a href="#RESTful">RESTful</a> <a href="#Python">Python</a> <a href="#Java">Java</a> <a href="#CPP">C++</a>
</div>

<div class="filter-RESTful" markdown="block">

##### Added methods

- `collections/{collection_name}/entities (PUT)`
- `collections/{collection_name}/entities (POST)`
- `collections/{collection_name}/entities (DELETE)`
- `collections/{collection_name}/entities (GET)`: Supports retrieving entities by offset and page size. 
- `collections/{collection_name}/entities (OPTIONS)`
- `/status (GET)`: Supports retrieving information such as server uptime. 

##### Deleted methods

- `/config/advanced (GET)`
- `/config/advanced (PUT)`
- `/config/advanced (OPTIONS)`
- `config/gpu_resources (GET)`
- `config/gpu_resources (PUT)`
- `config/gpu_resources (OPTIONS)`
- `collections/{collection_name}/segments (GET)`
- `collections/{collection_name}/segments/{segment_name}/vectors (GET)`
- `collections/{collection_name}/vectors (PUT)`
- `collections/{collection_name}/vectors (POST)`
- `collections/{collection_name}/vectors (GET)`
- `collections/{collection_name}/vectors (OPTIONS)`

</div>


<div class="filter-Python" markdown="block">

##### Added methods

- `set_config`
- `get_config`

##### Deleted method

- `get_index_info`

</div>

<div class="filter-Java" markdown="block">

##### Deleted method

- `getIndexInfo`

</div>

<div class="filter-CPP" markdown="block">

##### Deleted method

- `GetIndexInfo`

</div>

## v0.10.3

**Release date**：2020-9-21

#### Compatibility

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| :------------- | :----------------- | :--------------- | :------------- |
| 0.10.3     | 0.2.14     | 0.8.4       | 0.4.4      |

#### Improvements


- Allows the user to specify `metric_type` when searching in a collection with FLAT index. [#3213](https://github.com/milvus-io/milvus/issues/3213)
- Adds more valid values to the indexing parameter `m` of IVF_PQ: An `m` is valid so long as it can be divided by `dim`, which represents the number of vector dimensions. [#3254](https://github.com/milvus-io/milvus/issues/3254)
- Expands the range of `nprobe` to [1, 16384] for all IVF indexes. [#3606](https://github.com/milvus-io/milvus/issues/3606)
- Expands the range of `top_k` in an embeddings search to [1, 16384]. [#3639](https://github.com/milvus-io/milvus/issues/3639)
- Optimizes the memory release strategy to avoid memory overuse. [#3536](https://github.com/milvus-io/milvus/issues/3536)

#### Fixed issues


- Milvus running on multiple GPU devices and using IVF_SQ8H crashes if GPU cache is set too low. [#3742](https://github.com/milvus-io/milvus/issues/3742)
- Milvus reports a CUDA error when quitting, if the index is IVF_SQ8H. [#3760](https://github.com/milvus-io/milvus/issues/3760)

> See [CHANGELOG](https://github.com/milvus-io/milvus/blob/0.10.3/CHANGELOG.md) for more information.

## v0.10.2

**Release date**：2020-8-15

#### Compatibility

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| :------------- | :----------------- | :--------------- | :------------- |
| 0.10.2     | 0.2.14     | 0.8.4       | 0.4.4      |


#### Improvements


- Improved IVF search performance when both `nq` and `nprobe` are large. [#2653](https://github.com/milvus-io/milvus/issues/2653)


#### Fixed issues

- Inaccurate calculation of the memory allocated for index files. [#2890](https://github.com/milvus-io/milvus/issues/2890)
- Search result sets based on IVF_PQ index with IP metric are incorrectly merged in situations where multiple segments are produced for the inserted data. [#2952](https://github.com/milvus-io/milvus/issues/2952)
- The server crashes if you set `cache.cache_size` smaller than the size of an index file in a multi-GPU scenario. [#3012](https://github.com/milvus-io/milvus/issues/3012)
- Search result sets based on IP metric are incorrectly merged, if you insert vectors to multiple partitions in Mishards. [#3133](https://github.com/milvus-io/milvus/issues/3133)

> See [CHANGELOG](https://github.com/milvus-io/milvus/blob/0.10.2/CHANGELOG.md) for more information.


## v0.10.1

**Release date**：2020-7-20

#### Compatibility

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| :------------- | :----------------- | :--------------- | :------------- |
| 0.10.1          | 0.2.14             | 0.8.3            | 0.4.3          |

#### Fixed issues

- Occasionally, the result count does not match the query count. [#2578](https://github.com/milvus-io/milvus/issues/2578)
- IVF_PQ does not support IP on GPU-enabled Milvus. [#2585](https://github.com/milvus-io/milvus/issues/2585)
- Milvus reports "illegal instruction" when running on some legacy CPUs. [#2598](https://github.com/milvus-io/milvus/issues/2598)
- Updated the range of HNSW settings. [#2637](https://github.com/milvus-io/milvus/issues/2637)
- Milvus processes crash when building an index. [#2642](https://github.com/milvus-io/milvus/issues/2642)
- The default ANNOY settings do not match the settings specified in the document. [#2649](https://github.com/milvus-io/milvus/issues/2649)
- Milvus does not respond under a stress test. [#2692](https://github.com/milvus-io/milvus/issues/2692)
- The precision of the returned vectors is incorrect in an HTTP interface. [#2752](https://github.com/milvus-io/milvus/issues/2752)
- The upper limit of `nprobe` is incorrect on the GPU-enabled Milvus. [#2767](https://github.com/milvus-io/milvus/issues/2767)
- The number of the vectors changes occasionally after building an index. [#2768](https://github.com/milvus-io/milvus/issues/2768)

> See [CHANGELOG](https://github.com/milvus-io/milvus/blob/0.10.1/CHANGELOG.md) for more information.

## v0.10.0

**Release date**：2020-6-15

#### Compatibility

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| :------------- | :----------------- | :--------------- | :------------- |
| 0.10.0          | 0.2.13             | 0.8.2            | 0.4.2          |

#### Compatibility changes

- Updates the Milvus configuration file. [#2510](https://github.com/milvus-io/milvus/issues/2510)

#### Improvements

- Optimizes the index building performance when many small segments exist. [#2373](https://github.com/milvus-io/milvus/issues/2373)
- FAISS is upgraded to 1.6.3. [#2381](https://github.com/milvus-io/milvus/issues/2381)
- Optimizes dropping collection performance when too many partitions exist. [#2394](https://github.com/milvus-io/milvus/issues/2394)
- Optimizes the implementation of k-selection algorithm for GPU-enabled Milvus. [#2466](https://github.com/milvus-io/milvus/issues/2466)

#### Fixed issues

- The search performance degrades on Milvus 0.9.1. [#2429](https://github.com/milvus-io/milvus/issues/2429)

> See [CHANGELOG](https://github.com/milvus-io/milvus/blob/0.10.0/CHANGELOG.md) for more information.

## v0.9.1

**Release date**：2020-5-29

#### Compatibility

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| :------------- | :----------------- | :--------------- | :------------- |
| 0.9.1          | 0.2.12             | 0.8.1            | 0.4.1          |

#### Fixed issues

- In a multi-partition situation, data is inserted twice after the server reboots. [#2378](https://github.com/milvus-io/milvus/issues/2378)
- A `cudaMalloc` failure occurs with GPU IVF index when nq (number of queries) is high. [#2395](https://github.com/milvus-io/milvus/issues/2395). 
- Deleted vectors are still found in GPU-enabled Milvus. [#2450](https://github.com/milvus-io/milvus/issues/2450)

> See [CHANGELOG](https://github.com/milvus-io/milvus/blob/0.9.1/CHANGELOG.md) for more information.

## v0.9.0

**Release date**：2020-5-15

#### Compatibility

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| -------------- | ------------------ | ---------------- | -------------- |
| 0.9.0          | 0.2.11             | 0.8.0            | 0.4.0          |

#### New features


- Checks the CPU instruction set, GPU driver version, and CUDA version, when Milvus starts up. [#2054](https://github.com/milvus-io/milvus/issues/2054) [#2111](https://github.com/milvus-io/milvus/issues/2111)
- Prevents multiple Milvus instances from accessing the same Milvus database at the same time. [#2059](https://github.com/milvus-io/milvus/issues/2059)
- Supports log file rotating. [#2206](https://github.com/milvus-io/milvus/issues/2206)
- Suspends index building when a search request comes in. [#2283](https://github.com/milvus-io/milvus/issues/2283)

#### Improvements

- Refactors log output. [#221](https://github.com/milvus-io/milvus/issues/221)
- Upgrades OpenBLAS to improve Milvus' performance. [#1796](https://github.com/milvus-io/milvus/issues/1796)
- Unifies the vector distance calculation algorithms among FAISS, NSG, HNSW, and ANNOY. [#1965](https://github.com/milvus-io/milvus/issues/1965)
- Supports SSE4.2 instruction set. [#2039](https://github.com/milvus-io/milvus/issues/2039)
- Refactors the configuration files. [#2149](https://github.com/milvus-io/milvus/issues/2149) [#2167](https://github.com/milvus-io/milvus/issues/2167)
- Uses Elkan K-means algorithm to improve the IVF index performance. [#2178](https://github.com/milvus-io/milvus/issues/2178)

#### Fixed issues

> See [CHANGELOG](https://github.com/milvus-io/milvus/blob/master/CHANGELOG.md) for more information.

#### API changes

##### Added methods



| C++            | Python             | Java                 | Go |
| -------------- | ------------------ | -------------------- | ------------------------ |
| `HasPartition`   |`has_partition`|`hasPartition`|`HasPartition`|

##### Changed methods



|               | C++            | Python             | Java                 | Go |
| -------------- | -------------- | ------------------ | -------------------- | ------------------------ |
| Earlier than v0.9.0 | `DescribeCollection` |`describe_collection`|`describeCollection`|`DescribeCollection`|
| v0.9.0 | `GetCollectionInfo` |`get_collection_info`|`getCollectionInfo`|`GetCollectionInfo`|



|                     | C++               | Python             | Java                    | Go                |
| ------------------- | ----------------- | ------------------ | ----------------------- | ----------------- |
| Earlier than v0.9.0 | `CountCollection` | `count_collection` | `getCollectionRowCount` | `CountCollection` |
| v0.9.0              | `CountEntities`   | `count_entities`   | `countEntities`         | `CountEntities`   |





|                     | C++               | Python             | Java              | Go                |
| ------------------- | ----------------- | ------------------ | ----------------- | ----------------- |
| Earlier than v0.9.0 | `ShowCollections` | `show_collections` | `showCollections` | `ShowCollections` |
| v0.9.0              | `ListCollections` | `list_collections` | `listCollections` | `ListCollections` |





|                     | C++                  | Python                 | Java                 | Go                   |
| ------------------- | -------------------- | ---------------------- | -------------------- | -------------------- |
| Earlier than v0.9.0 | `ShowCollectionInfo` | `collection_info`      | `showCollectionInfo` | `ShowCollectionInfo` |
| v0.9.0              | `GetCollectionStats` | `get_collection_stats` | `getCollectionStats` | `GetCollectionStats` |





|                     | C++             | Python           | Java            | Go              |
| ------------------- | --------------- | ---------------- | --------------- | --------------- |
| Earlier than v0.9.0 | `DescribeIndex` | `describe_index` | `describeIndex` | `DescribeIndex` |
| v0.9.0              | `GetIndexInfo`  | `get_index_info` | `getIndexInfo`  | `GetIndexInfo`  |





|                     | C++              | Python            | Java             | Go               |
| ------------------- | ---------------- | ----------------- | ---------------- | ---------------- |
| Earlier than v0.9.0 | `ShowPartitions` | `show_partitions` | `showPartitions` | `ShowPartitions` |
| v0.9.0              | `ListPartitions` | `list_partitions` | `listPartitions` | `ListPartitions` |



|                     | C++               | Python               | Java              | Go               |
| ------------------- | ----------------- | -------------------- | ----------------- | ---------------- |
| Earlier than v0.9.0 | `GetEntitiesByID` | `get_vectors_by_ids` | `getVectorsByIds` | `GetVectorsByID` |
| v0.9.0              | `GetEntityByID`   | `get_entity_by_id`   | `getEntityByID`   | `GetEntityByID`  |





|                     | C++               | Python               | Java              | Go                |
| ------------------- | ----------------- | -------------------- | ----------------- | ----------------- |
| Earlier than v0.9.0 | `GetIDsInSegment` | `get_vector_ids`     | `getVectorIds`    | `GetEntityIDs`    |
| v0.9.0              | `ListIDInSegment` | `list_id_in_segment` | `listIDInSegment` | `ListIDInSegment` |



|                     | C++   | Python              | Java            | Go    |
| ------------------- | ----- | ------------------- | --------------- | ----- |
| Earlier than v0.9.0 | *N/A* | `search_in_files`   | `searchInFiles` | *N/A* |
| v0.9.0              | *N/A* | `search_in_segment` | *DELETED*       | *N/A* |





|                     | C++                | Python                | Java               | Go                 |
| ------------------- | ------------------ | --------------------- | ------------------ | ------------------ |
| Earlier than v0.9.0 | `DeleteByID`       | `delete_by_id`        | `deleteByIds`      | `DeleteByID`       |
| v0.9.0              | `DeleteEntityByID` | `delete_entity_by_id` | `deleteEntityByID` | `DeleteEntityByID` |





|                     | C++                 | Python               | Java                | Go                  |
| ------------------- | ------------------- | -------------------- | ------------------- | ------------------- |
| Earlier than v0.9.0 | `PreloadCollection` | `preload_collection` | `preloadCollection` | `PreloadCollection` |
| v0.9.0              | `LoadCollection`    | `load_collection`    | `loadCollection`    | `LoadCollection`    |





|                     | C++                           | Python      | Java                     | Go          |
| ------------------- | ----------------------------- | ----------- | ------------------------ | ----------- |
| Earlier than v0.9.0 | `FlushCollection` and `Flush` | `flush`     | `flush` and `flushAsync` | `Flush`     |
| v0.9.0              | `Flush`                       | *UNCHANGED* | *UNCHANGED*              | *UNCHANGED* |





|                     | C++                               | Python      | Java                         | Go          |
| ------------------- | --------------------------------- | ----------- | ---------------------------- | ----------- |
| Earlier than v0.9.0 | `CompactCollection` and `Compact` | `compact`   | `compact` and `compactAsync` | `Compact`   |
| v0.9.0              | `Compact`                         | *UNCHANGED* | *UNCHANGED*                  | *UNCHANGED* |





|                     | C++         | Python    | Java        | Go          |
| ------------------- | ----------- | --------- | ----------- | ----------- |
| Earlier than v0.9.0 | `Connect`   | `connect` | `connect`   | `Connect`   |
| v0.9.0              | *UNCHANGED* | *DELETED* | *UNCHANGED* | *UNCHANGED* |





|                     | C++         | Python      | Java          | Go            |
| ------------------- | ----------- | ----------- | ------------- | ------------- |
| Earlier than v0.9.0 | `Connected` | `connected` | `isConnected` | `IsConnected` |
| v0.9.0              | *UNCHANGED* | *DELETED*   | *UNCHANGED*   | *UNCHANGED*   |





|                     | C++          | Python       | Java         | Go           |
| ------------------- | ------------ | ------------ | ------------ | ------------ |
| Earlier than v0.9.0 | `Disconnect` | `disconnect` | `disconnect` | `Disconnect` |
| v0.9.0              | *UNCHANGED*  | *DELETED*    | *UNCHANGED*  | *UNCHANGED*  |












## v0.8.0

**Release date**：2020-4-15

**Compatibility**

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| -------------- | ------------------ | ---------------- | -------------- |
| 0.8.0          | 0.2.10             | 0.7.0            | 0.3.0          |

#### New features

- **ANNOY index support**

  Added support for ANNOY index type. See [our documentation](index.md) for more information. [#261](https://github.com/milvus-io/milvus/issues/261)

- **Vector deletion**

  Added support to delete one or multiple vectors for more index types. [#1655](https://github.com/milvus-io/milvus/issues/1655) [#1660](https://github.com/milvus-io/milvus/issues/1660) [#1661](https://github.com/milvus-io/milvus/issues/1661) [#1849](https://github.com/milvus-io/milvus/issues/1849)
  
  Including: Flat/IVFlat/IVFPQ/IVFSQ8/IVFSQ8H/NSG/HNSW/ANNOY

#### Improvements

- Added new metric SuperStructure and SubStructure in HTTP module. [#1784](https://github.com/milvus-io/milvus/issues/1784)

#### Fixed issues

- Limited the maximum number of partitions to 4096. [#1276](https://github.com/milvus-io/milvus/issues/1276)
- Forbidden to create partition with name `_default`. [#1762](https://github.com/milvus-io/milvus/issues/1762)
- Resolved the issue that concurrent operations from multiple clients cause system crash. [#1789](https://github.com/milvus-io/milvus/issues/1789)
- Resolved the issue that some raw vectors are missed when the raw data file size is larger than 2GB. [#1883](https://github.com/milvus-io/milvus/issues/1883)

## v0.7.1

**Release date**：2020-3-30

**Compatibility**

| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| -------------- | ------------------ | ---------------- | -------------- |
| 0.7.1          | 0.2.9              | 0.6.0            | 0.2.0          |

#### New features

- Added new distance metrics, including substructure and superstructure, for the `FLAT` index type. These metrics are used for substructure and superstructure search of chemical structures.[#1603](https://github.com/milvus-io/milvus/issues/1603).

#### Improvements

- Improved the performance of the compact operation. [#1619](https://github.com/milvus-io/milvus/issues/1619)
- Improved search performance using CPU, especially for scenarios with multiple, concurrent connections. [#267](https://github.com/milvus-io/milvus/issues/267)
- Improved the search performance when nq is less than the number of threads in the CPU. [#1690](https://github.com/milvus-io/milvus/issues/1690)
- Milvus performs a combined search for the same search requests from multiple clients, thus significantly improving search speed. [#1728](https://github.com/milvus-io/milvus/issues/1728)
- Upgraded Mishards to 0.7.1. [#1698](https://github.com/milvus-io/milvus/issues/1698)

#### Fixed issues

Refer to [CHANGELOG](https://github.com/milvus-io/milvus/blob/master/CHANGELOG.md) for details.

---

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

  Added support for WAL, which significantly improves the reliability of data operations. You can configure WAL settings in the Milvus server configuration file (`milvus.yaml`). [#830](https://github.com/milvus-io/milvus/pull/830)

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

  Starting from Milvus 0.7.0, the Milvus server configuration file (`milvus.yaml`) is updated to 0.2 with parameter changes.

- **Term updates**

  As of Milvus 0.7.0, `Table` is named as `Collection` in Milvus.

#### Fixed issues

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

#### Fixed issues

- Solved the issue of increased memory usage during vector queries. [#335](https://github.com/milvus-io/milvus/pull/335)

---

## v0.5.3

**Release date**: 2019-11-14

**Version Compatibility**

| Milvus version | pymilvus version | Java SDK version |
| -------------- | ---------------- | ---------------- |
| 0.5.3          | 0.2.5            | 0.3.0            |

#### Improvements

- Double the transmission speed of search results to the client application through the following updates to gRPC:

  - Optimize messages.
  - Change the API of generated code.
  - Remove compression.

- Python SDK

  - Divide the storage of search result ids and distances into separate arrays, which reduces the API response time.
  - Add a new option to retrieve a specific target vector in search results: `id = results.id_array[i][j], distance = results.distance_array[i][j]`.
  - Add a new option for looping over arrays, which takes much less time if `nq` and `top_k` is large.

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

#### Fixed issues

Add a system lock to avoid the generation of files with duplicated data file names, which fixes the bug of search failure due to false deletion of files that have duplicated file names.

#### Improvements

Add a Japanese version of README file. (from an external contributor)

---

## v0.5.1

**Release date**: 2019-11-04

#### Features

- Start supporting GPU-only mode for `IVF_SQ8` and `IVFFLAT` index types.
- Add configuration parameter `gpu_search_threshold` to control GPU-only execution trigger point.

#### Improvements

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
