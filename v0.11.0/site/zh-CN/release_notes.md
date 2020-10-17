---
id: release_notes.md
---

# 发版说明

## v0.11.0

**发布时间**：2020-10-16

#### 版本兼容

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| :------------- | :----------------- | :--------------- | :------------- |
| 0.11.0     | 0.3.0     | 0.9.0       | 即将推出      |

#### 升级必看

1. 调整了 partition tag 的支持字符集：
   
   - 不支持使用英文字母、数字、"_"、"$" 以外的字符命名 partition tag。
   - partition tag 的首字母不支持使用英文字母或下划线以外的字符。

2. 服务端配置文件结构调整

   - **server_config.yaml**  更名为 **milvus.yaml**，
   - 配置参数兼容 `a.b.c: value` 的展平格式。

3. 调整了二值型向量支持索引名称：

   - `IVF_FLAT` 变更为 `BIN_IVF_FLAT`，
   - `FLAT`变更为 `BIN_FLAT`。

4. 移除原有的 `CreateCollection()` 方法。

   新增的 `CreateCollection()` 方法删除了原有的 `index_file_size` 参数，新增 `segment_row_limit` 参数用于设置单个数据段文件大小的上限和下限。单个数据段文件的值域范围为 [ 1 &times; `segment_row_limit`, 2 &times; `segment_row_limit`)。

5. 移除原有的 `Search()` 方法。

   新增的 `Search()` 方法新增 `MetricType` 参数用于指定距离计算方式。

6. 移除原有的 `GetIndexInfo()` 方法。

   改用 `GetCollectionInfo()` 获取相关数据。

7. v0.11.0 Milvus 暂不支持 Mishards 分布式方案。

8. Python SDK 和 Java SDK 会在操作失败时抛出异常。
9. RESTful API 支持分页读取实体。
   
   详见 `collections/{collection_name}/entities (GET)`。


#### 新增功能

1. 标量字段过滤

支持在插入向量数据时携带与该向量相关的标量数据。

支持在查询时利用标量数据过滤查询结果：

- 标量数据支持 TermQuery 和 RangeQuery 两种匹配模式。后者支持以下四种运算符：
   - 大于：`gt`
   - 大于等于：`gte`
   - 小于：`lt`
   - 小于等于：`lte`
- 在标量匹配和向量查询之间支持 `MUST`, `MUST_NOT` 和 `SHOULD` 三种逻辑组合， 
- 支持在查询结果中返回结果向量相关的标量字段。

支持在标量数据上创建索引加速结构化数据的过滤。

2. 支持在查询时指定距离计算方式

   - 如果查询时指定的 `MetricType` 与建索引时设置的 `MetricType` 一致，Milvus 使用索引查询；
   - 如果指定的 `MetricType` 与建索引时设置的 `MetricType` 不一致，Milvus 会进行暴搜。

#### 主要改进

1. 升级第三方依赖 oatpp

升级第三方依赖 oatpp 至更为稳定的 v1.1.0 版本。

2. 重写 SQLite 后端操作

移除第三方依赖 sqlite_orm。

3. 重组 WAL 目录结构

新版 WAL 的目录结构按照 collection 存储相关数据。

4. 元数据快照

支持基于元数据快照的搜索： 进行数据插入、删除操作后 Milvus 会自动为元数据产生包含版本信息的快照并缓存至内存中，查询请求可以使用缓存的对应版本中进行。


5. 分离索引和原始数据

IVF_FLAT 和 HNSW 两种索引的 **index_file** 文件不再包含原始向量数据，改用向量的偏移量以减小硬盘占用。



#### API 变更



<div class="filter">
<a href="#RESTful">RESTful</a> <a href="#Python">Python</a> <a href="#Java">Java</a> <a href="#CPP">C++</a>
</div>

<div class="filter-RESTful" markdown="block">

##### 新增 API

- `collections/{collection_name}/entities (PUT)`
- `collections/{collection_name}/entities (POST)`
- `collections/{collection_name}/entities (DELETE)`
- `collections/{collection_name}/entities (GET)`：支持分页读取实体。
- `collections/{collection_name}/entities (OPTIONS)`
- `/status (GET)`：支持获取服务端启动时间 uptime 等信息。

##### 删除 API

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

##### 新增 API

- `set_config`
- `get_config`


##### 删除 API

- `get_index_info`

</div>

<div class="filter-Java" markdown="block">

##### 删除 API

- `getIndexInfo`

</div>

<div class="filter-CPP" markdown="block">

##### 删除 API

- `GetIndexInfo`

</div>

## v0.10.3

**发布时间**：2020-9-21

#### 版本兼容

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| :------------- | :----------------- | :--------------- | :------------- |
| 0.10.3     | 0.2.14     | 0.8.4       | 0.4.4      |

#### 主要改进


- 若用户使用 FLAT 索引，支持在查询时指定 `metric_type`。[#3213](https://github.com/milvus-io/milvus/issues/3213)
- 增加了 IVF_PQ 索引的建索引参数 `m` 的有效值：能被向量维度 `dim` 整除的 `m` 值均为有效值。[#3254](https://github.com/milvus-io/milvus/issues/3254)
- 将倒排文件（IVF）类索引的查询参数 `nprobe` 的有效范围增加至 [1, 16384]。[#3606](https://github.com/milvus-io/milvus/issues/3606)
- 将查询语句中 `top_k` 的有效范围增加至 [1, 16384]。[#3639](https://github.com/milvus-io/milvus/issues/3639)
- 优化了内存释放策略以避免内存过度使用。[#3536](https://github.com/milvus-io/milvus/issues/3536)

#### 问题修复


- 修复了在多 GPU 设备上采用 IVF_SQ8H 索引时若 GPU 缓存设置过小， Milvus 会崩溃的问题。[#3742](https://github.com/milvus-io/milvus/issues/3742)
- 修复了在采用 IVF_SQ8H 索引时，Milvus 退出时报的一个 CUDA 错误。[#3760](https://github.com/milvus-io/milvus/issues/3760)

> 详见 [CHANGELOG](https://github.com/milvus-io/milvus/blob/0.10.3/CHANGELOG.md) 了解更多已修复问题。

## v0.10.2

**发布时间**：2020-8-15

#### 版本兼容

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| :------------- | :----------------- | :--------------- | :------------- |
| 0.10.2     | 0.2.14     | 0.8.4       | 0.4.4      |


#### 主要改进


- 提升了大 `nq` 和大 `nprobe` 情况下的搜索性能。[#2653](https://github.com/milvus-io/milvus/issues/2653)


#### 问题修复

- 修复了缓存中索引占用大小计算不准确的问题。[#2890](https://github.com/milvus-io/milvus/issues/2890)
- 修复了 IVF_PQ 索引中 IP 距离结果归并不正确的问题。[#2952](https://github.com/milvus-io/milvus/issues/2952)
- 修复了多 GPU 场景下，如果 `cache.cache_size` 设置小于单个索引文件大小，搜索时会造成系统崩溃的问题。[#3012](https://github.com/milvus-io/milvus/issues/3012)
- 修复了在 Mishards 中插入数据至多个分区，IP 距离结果归并不正确的问题。[#3133](https://github.com/milvus-io/milvus/issues/3133)

> 详见 [CHANGELOG](https://github.com/milvus-io/milvus/blob/0.10.2/CHANGELOG.md) 了解更多已修复问题。



## v0.10.1

**发布时间**：2020-7-20

#### 版本兼容

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| :------------- | :----------------- | :--------------- | :------------- |
| 0.10.1          | 0.2.14             | 0.8.3            | 0.4.3          |

#### 问题修复

- 修复了一个查询结果与查询行数不匹配的问题。[#2578](https://github.com/milvus-io/milvus/issues/2578)
- 修复了一个 GPU 上 IVF_PQ 索引无法支持 IP 的问题。[#2585](https://github.com/milvus-io/milvus/issues/2585)
- 修复了一些老的 CPU 上运行时出现 illegal instruction 的问题。[#2598](https://github.com/milvus-io/milvus/issues/2598)
- 调整了 HNSW 参数范围。[#2637](https://github.com/milvus-io/milvus/issues/2637)
- 修复了一个构建索引可能会导致 Milvus 进程崩溃退出的问题。[#2642](https://github.com/milvus-io/milvus/issues/2642)
- 修复了一个 ANNOY 索引默认参数与文档不对应的问题。[#2649](https://github.com/milvus-io/milvus/issues/2649)
- 修复了一个压力测试下出现的 Milvus 无响应的问题。[#2692](https://github.com/milvus-io/milvus/issues/2692)
- 修复了一个 HTTP 接口返回向量精度错误的问题。[#2752](https://github.com/milvus-io/milvus/issues/2752)
- 修复了一个 GPU 版本中 `nprobe` 上限错误的问题。[#2767](https://github.com/milvus-io/milvus/issues/2767)
- 修复了一个构建索引后可能会导致集合中向量条数变化的问题。[#2768](https://github.com/milvus-io/milvus/issues/2768)


> 详见 [CHANGELOG](https://github.com/milvus-io/milvus/blob/0.10.1/CHANGELOG.md) 了解更多已修复问题。

## v0.10.0

**发布时间**：2020-6-15

#### 版本兼容

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| :------------- | :----------------- | :--------------- | :------------- |
| 0.10.0          | 0.2.13             | 0.8.2            | 0.4.2          |

#### 兼容性改动

- 更新了 Milvus 配置文件。[#2510](https://github.com/milvus-io/milvus/issues/2510)

#### 主要改进

- 优化了系统在存在多个小分段情况下的索引创建时间。 [#2373](https://github.com/milvus-io/milvus/issues/2373)
- 将 FAISS 升级至 1.6.3。 [#2381](https://github.com/milvus-io/milvus/issues/2381)
- 降低了系统在存在大量分区时删除集合需要的时间。[#2394](https://github.com/milvus-io/milvus/issues/2394)
- 在 GPU 版 Milvus 上优化了 k-selection 算法的实现。[#2466](https://github.com/milvus-io/milvus/issues/2466)

#### 问题修复

- 修复了一个搜索性能降低的问题。[#2429](https://github.com/milvus-io/milvus/issues/2429)

> 详见 [CHANGELOG](https://github.com/milvus-io/milvus/blob/0.10.0/CHANGELOG.md) 了解更多已修复问题。


## v0.9.1

**发布时间**：2020-5-29

#### 版本兼容

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| :---------- | :-------------- | :------------ | :---------- |
| 0.9.1       | 0.2.12          | 0.8.1         | 0.4.1       |

#### 问题修复

- 多分区情况下，服务器重启后数据会被重复插入两次。[#2378](https://github.com/milvus-io/milvus/issues/2378)

- 使用 GPU IVF 索引时，如果查询次数 nq 过高，系统会报 `cudaMalloc` 错误。 [#2395](https://github.com/milvus-io/milvus/issues/2395)
- 向量删除后依然会被 GPU 加速版 Milvus 找到。 [#2450](https://github.com/milvus-io/milvus/issues/2450)

> 详见 [CHANGELOG](https://github.com/milvus-io/milvus/blob/master/CHANGELOG.md) 了解更多已修复问题。




## v0.9.0

**发布时间**：2020-5-15

#### 版本兼容

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| -------------- | ------------------ | ---------------- | -------------- |
| 0.9.0          | 0.2.11             | 0.8.0            | 0.4.0          |

#### 新增功能


- 支持在 Milvus 启动时检查 CPU 指令集、GPU 驱动版本 和 CUDA 版本。 [#2054](https://github.com/milvus-io/milvus/issues/2054) [#2111](https://github.com/milvus-io/milvus/issues/2111)
- 避免多个 Milvus 实例同时操作同一 Milvus 数据。 [#2059](https://github.com/milvus-io/milvus/issues/2059)
- 支持日志文件轮转。 [#2206](https://github.com/milvus-io/milvus/issues/2206)
- 处理搜索请求时暂停创建索引。[#2283](https://github.com/milvus-io/milvus/issues/2283)

#### 主要改进

- 重构了日志输出。 [#221](https://github.com/milvus-io/milvus/issues/221)
- 升级了 OpenBLAS 版本以提高 Milvus 性能。 [#1796](https://github.com/milvus-io/milvus/issues/1796)
- 统一了 FAISS、NSG、HNSW 和 ANNOY 的向量距离计算方法。[#1965](https://github.com/milvus-io/milvus/issues/1965)
- 支持 SSE4.2 指令集。 [#2039](https://github.com/milvus-io/milvus/issues/2039)
- 重构了配置文件。 [#2149](https://github.com/milvus-io/milvus/issues/2149) [#2167](https://github.com/milvus-io/milvus/issues/2167)
- 采用了 Elkan K-means 算法提高 IVF 索引性能。 [#2178](https://github.com/milvus-io/milvus/issues/2178)

#### 问题修复

> 详见 [CHANGELOG](https://github.com/milvus-io/milvus/blob/master/CHANGELOG.md) 了解更多已修复问题。

#### API 变更

##### 新增方法



| C++            | Python          | Java           | Go             |
| -------------- | --------------- | -------------- | -------------- |
| `HasPartition` | `has_partition` | `hasPartition` | `HasPartition` |

##### 变更方法



|                     | C++                  | Python                | Java                 | Go                   |
| ------------------- | -------------------- | --------------------- | -------------------- | -------------------- |
| v0.9.0 之前版本 | `DescribeCollection` | `describe_collection` | `describeCollection` | `DescribeCollection` |
| v0.9.0              | `GetCollectionInfo`  | `get_collection_info` | `getCollectionInfo`  | `GetCollectionInfo`  |



|                     | C++               | Python             | Java                    | Go                |
| ------------------- | ----------------- | ------------------ | ----------------------- | ----------------- |
| v0.9.0 之前版本 | `CountCollection` | `count_collection` | `getCollectionRowCount` | `CountCollection` |
| v0.9.0              | `CountEntities`   | `count_entities`   | `countEntities`         | `CountEntities`   |





|                     | C++               | Python             | Java              | Go                |
| ------------------- | ----------------- | ------------------ | ----------------- | ----------------- |
| v0.9.0 之前版本 | `ShowCollections` | `show_collections` | `showCollections` | `ShowCollections` |
| v0.9.0              | `ListCollections` | `list_collections` | `listCollections` | `ListCollections` |





|                     | C++                  | Python                 | Java                 | Go                   |
| ------------------- | -------------------- | ---------------------- | -------------------- | -------------------- |
| v0.9.0 之前版本 | `ShowCollectionInfo` | `collection_info`      | `showCollectionInfo` | `ShowCollectionInfo` |
| v0.9.0              | `GetCollectionStats` | `get_collection_stats` | `getCollectionStats` | `GetCollectionStats` |





|                     | C++             | Python           | Java            | Go              |
| ------------------- | --------------- | ---------------- | --------------- | --------------- |
| v0.9.0 之前版本 | `DescribeIndex` | `describe_index` | `describeIndex` | `DescribeIndex` |
| v0.9.0              | `GetIndexInfo`  | `get_index_info` | `getIndexInfo`  | `GetIndexInfo`  |





|                     | C++              | Python            | Java             | Go               |
| ------------------- | ---------------- | ----------------- | ---------------- | ---------------- |
| v0.9.0 之前版本 | `ShowPartitions` | `show_partitions` | `showPartitions` | `ShowPartitions` |
| v0.9.0              | `ListPartitions` | `list_partitions` | `listPartitions` | `ListPartitions` |



|                     | C++               | Python               | Java              | Go               |
| ------------------- | ----------------- | -------------------- | ----------------- | ---------------- |
| v0.9.0 之前版本 | `GetEntitiesByID` | `get_vectors_by_ids` | `getVectorsByIds` | `GetVectorsByID` |
| v0.9.0              | `GetEntityByID`   | `get_entity_by_id`   | `getEntityByID`   | `GetEntityByID`  |





|                     | C++               | Python               | Java              | Go                |
| ------------------- | ----------------- | -------------------- | ----------------- | ----------------- |
| v0.9.0 之前版本 | `GetIDsInSegment` | `get_vector_ids`     | `getVectorIds`    | `GetEntityIDs`    |
| v0.9.0              | `ListIDInSegment` | `list_id_in_segment` | `listIDInSegment` | `ListIDInSegment` |



|                     | C++   | Python              | Java            | Go    |
| ------------------- | ----- | ------------------- | --------------- | ----- |
| v0.9.0 之前版本 | *N/A* | `search_in_files`   | `searchInFiles` | *N/A* |
| v0.9.0              | *N/A* | `search_in_segment` | *DELETED*       | *N/A* |





|                     | C++                | Python                | Java               | Go                 |
| ------------------- | ------------------ | --------------------- | ------------------ | ------------------ |
| v0.9.0 之前版本 | `DeleteByID`       | `delete_by_id`        | `deleteByIds`      | `DeleteByID`       |
| v0.9.0              | `DeleteEntityByID` | `delete_entity_by_id` | `deleteEntityByID` | `DeleteEntityByID` |





|                     | C++                 | Python               | Java                | Go                  |
| ------------------- | ------------------- | -------------------- | ------------------- | ------------------- |
| v0.9.0 之前版本 | `PreloadCollection` | `preload_collection` | `preloadCollection` | `PreloadCollection` |
| v0.9.0              | `LoadCollection`    | `load_collection`    | `loadCollection`    | `LoadCollection`    |





|                     | C++                           | Python      | Java                     | Go          |
| ------------------- | ----------------------------- | ----------- | ------------------------ | ----------- |
| v0.9.0 之前版本 | `FlushCollection` 和 `Flush` | `flush`     | `flush` 和 `flushAsync` | `Flush`     |
| v0.9.0              | `Flush`                       | *不变* | *不变*              | *不变* |





|                     | C++                               | Python      | Java                         | Go          |
| ------------------- | --------------------------------- | ----------- | ---------------------------- | ----------- |
| v0.9.0 之前版本 | `CompactCollection` 和 `Compact` | `compact`   | `compact` 和 `compactAsync` | `Compact`   |
| v0.9.0              | `Compact`                         | *不变* | *不变*              | *不变* |





|                     | C++         | Python    | Java        | Go          |
| ------------------- | ----------- | --------- | ----------- | ----------- |
| v0.9.0 之前版本 | `Connect`   | `connect` | `connect`   | `Connect`   |
| v0.9.0              | *不变* | *删除* | *不变* | *不变* |





|                     | C++         | Python      | Java          | Go            |
| ------------------- | ----------- | ----------- | ------------- | ------------- |
| v0.9.0 之前版本 | `Connected` | `connected` | `isConnected` | `IsConnected` |
| v0.9.0              | *不变* | *删除* | *不变* | *不变* |





|                     | C++          | Python       | Java         | Go           |
| ------------------- | ------------ | ------------ | ------------ | ------------ |
| v0.9.0 之前版本 | `Disconnect` | `disconnect` | `disconnect` | `Disconnect` |
| v0.9.0              | *不变* | *删除*    | *不变* | *不变* |







## v0.8.0

**发布时间**：2020-4-15

**版本兼容**

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| ----------- | --------------- | ------------- | ----------- |
| 0.8.0       | 0.2.10          | 0.7.0         | 0.3.0       |

#### 新增功能

- **ANNOY 索引的支持**

  增加 `ANNOY` 索引类型，关于 `ANNOY` 索引的详细介绍请参考[文档](index.md)。[#261](https://github.com/milvus-io/milvus/issues/261)
  
- **向量删除**

  新增下列索引类型支持删除操作。[#1655](https://github.com/milvus-io/milvus/issues/1655) [#1660](https://github.com/milvus-io/milvus/issues/1660) [#1661](https://github.com/milvus-io/milvus/issues/1661) [#1849](https://github.com/milvus-io/milvus/issues/1849)
  
  包括：Flat/IVFlat/IVFPQ/IVFSQ8/IVFSQ8H/NSG/HNSW/ANNOY

#### 主要改进

- 在 http 模块支持超集/子集距离。[#1784](https://github.com/milvus-io/milvus/issues/1784)

#### Bug 修复

- 限制 partition 数目上限为4096。[#1276](https://github.com/milvus-io/milvus/issues/1276)
- 禁止创建 `_default` partition。[#1762](https://github.com/milvus-io/milvus/issues/1762)
- 解决多客户端并发时系统崩溃的问题。[#1789](https://github.com/milvus-io/milvus/issues/1789)
- 解决读取 >2GB 原始数据文件时部分数据丢失的问题。[#1883](https://github.com/milvus-io/milvus/issues/1883)

## v0.7.1

**发布时间**：2020-3-30

**版本兼容**

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| ----------- | --------------- | ------------- | ----------- |
| 0.7.1       | 0.2.9           | 0.6.0         | 0.2.0       |

#### 新增功能

- 针对 `FLAT` 索引类型，新增子结构（substructure）和超结构（superstructure）距离计算方式。这两种距离计算方式常用于化学分子式的子结构和超结构搜索 [#1603](https://github.com/milvus-io/milvus/issues/1603)。

#### 主要改进

- 改善了 Compact 操作的性能。[#1619](https://github.com/milvus-io/milvus/issues/1619)
- 改善了 Milvus 使用 CPU 进行查询的性能，特别是提高了在多连接并发场景下的查询性能。[#267](https://github.com/milvus-io/milvus/issues/267)
- 改善了 nq 小于 CPU 线程数时 Milvus 的搜索性能。[#1690](https://github.com/milvus-io/milvus/issues/1690)
- 对于多个客户端的相同查询请求，Milvus 会将进行合并查询，从而显著提高查询速度。[#1728](https://github.com/milvus-io/milvus/issues/1728)
- Mishards 同步升级到 0.7.1。[#1698](https://github.com/milvus-io/milvus/issues/1698)

#### Bug 修复

- 详情请参考 [CHANGELOG](https://github.com/milvus-io/milvus/blob/master/CHANGELOG.md)。

---

## v0.7.0

**发布时间**：2020-3-10

**版本兼容**

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| ----------- | --------------- | ------------- | ----------- |
| 0.7.0       | 0.2.8           | 0.5.0         | 0.1.0       |

#### 新增功能

- **向量删除**

  新增了对单条或多条向量的删除功能。如果你对一个集合进行了向量删除操作，后续对这个集合的搜索操作仅支持一部分索引类型，包括在 CPU 上运行的 Flat、IVFlat、IVFSQ8 等。Milvus 的后续版本将为其他索引类型提供支持。[#861](https://github.com/milvus-io/milvus/issues/861)

- **向量读取**

  新增了通过向量 ID 读取对应的向量值的功能。[#861](https://github.com/milvus-io/milvus/issues/861)

- **数据落盘与压缩**

  新增了数据落盘与压缩功能。你可以设置定时落盘或者手动落盘，从而避免数据丢失。如果一个段中的向量数据被删除，被删除的向量数据占据的空间并不会自动释放。你可以对集合中的段进行压缩操作以释放多余空间。[#861](https://github.com/milvus-io/milvus/issues/861) [#1426](https://github.com/milvus-io/milvus/pull/1426)

- **运行时更改 Milvus 服务端参数**

  新增了运行时更改 Milvus 服务端参数的功能。你可以通过 Milvus 客户端对 Milvus 服务端参数进行更改，部分参数更改后可即时生效，无需重启 Milvus。[#665](https://github.com/milvus-io/milvus/issues/665)

- **预写式日志(Write-Ahead Logging, WAL)**

  新增了 WAL 功能，可以大大提高数据操作的可靠性。你可以在 Milvus 服务端配置文件（`milvus.yaml`）中对 WAL 进行设置。[#830](https://github.com/milvus-io/milvus/issues/830)

- **RESTful API**

  新增了 RESTful API。详细信息请参考 [RESTful API Readme](https://github.com/milvus-io/milvus/blob/master/core/src/server/web_impl/README.md)。

- **Go SDK**

  新增了 Go SDK，详细信息请参考 [https://github.com/milvus-io/milvus-sdk-go](https://github.com/milvus-io/milvus-sdk-go)。

- **HNSW 索引的支持**

  新增了对 HNSW 索引类型的支持。关于 HNSW 的详细介绍请参考[向量索引算法 HNSW 和 NSG 的比较](https://milvus.io/cn/blogs/2020-01-16-hnsw-nsg-comparison.md)。[#853](https://github.com/milvus-io/milvus/issues/853)

- **Jaccard/Hamming/Tanimoto 距离的支持**

  新增了对 Jaccard、Hamming、Tanimoto 距离的支持。[#823](https://github.com/milvus-io/milvus/issues/823)

- **Prometheus 中 Pushgateway 的支持**

  新增了在 Prometheus 中 Pushgateway 的支持。Pushgateway 使生命周期短、批量的 metric 能够被 Prometheus 提取。[#813](https://github.com/milvus-io/milvus/issues/813)

- **AVX 512 指令集的支持**

  新增了对 AVX 512 指令集的支持。Milvus 理论上可支持所有包含 AVX 512 指令集的 CPU。[#1122](https://github.com/milvus-io/milvus/issues/1122)

#### 变更说明

- **创建索引与搜索的接口更新**

  从 Milvus 0.7.0 开始，所有客户端创建索引与搜索的接口中的部分参数使用 JSON 字符串进行传值。

- **Milvus 服务端配置文件更新**

  从 Milvus 0.7.0 开始，Milvus 服务端配置文件（`milvus.yaml`）版本更新为 0.2。配置文件的参数也发生了变化。

- **术语更新**

  从 0.7.0 开始，Milvus 的 Table（表） 正式改名为 Collection（集合）。

#### Bug 修复

- 解决了插入向量时使用自动生成的 ID 时可能产生重复 ID 的问题。[#1508](https://github.com/milvus-io/milvus/pull/1508)

---

## v0.6.0

**发布时间**：2019-12-07

**版本兼容**

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 |
| ----------- | --------------- | ------------- |
| 0.6.0       | 0.2.6           | 0.4.0         |

#### 新增功能

- **仅支持 CPU 的 Milvus**

  Milvus v0.6.0 提供了仅支持 CPU 和支持 GPU 两个版本的 Milvus。同时支持在纯 CPU 和 GPU 环境下在 Docker 容器中编译 Milvus。[#192](https://github.com/milvus-io/milvus/pull/192)

- **分区表**

  新增了分区表功能以确保增量数据的高性能查询。Python，Java 和 C++ SDK 中增加了表分区相关接口，支持创建/删除分区表，向量插入指定分区表，以及指定分区表的查询等。[#245](https://github.com/milvus-io/milvus/pull/245)

- **实验功能**

  Milvus 的实验功能仍在持续开发和更新中，可能包含未知的错误。这些功能主要用于测试和用户反馈收集。

  - **Mishards**

    推出 Milvus 集群分片中间件 Mishards 作为分布式部署方案之一。Mishards 内部处理请求转发、读写分离、水平扩展、动态扩容，为用户提供内存和算力可以无限扩容的 Milvus 集群实例。[#232](https://github.com/milvus-io/milvus/pull/232/files)

  - **新的索引类型**

    支持新的索引类型如 `SPTAG-KDT`，`SPTAG-BKT`，`RNSG` 和 `IVFPQ`。Milvus 集成了微软的 SPTAG 算法库，进而支持 `SPTAG-KDT` 和 `SPTAG-BKT` 两种索引类型。`RNSG` 是 Milvus 在 NSG 基础上做了优化之后自研的一种索引方式。`IVFPQ` 是倒排索引基础上进一步利用笛卡儿积对每个倒排文件中的向量进行编码的索引方式。[SPTAG#438](https://github.com/milvus-io/milvus/pull/438) [RNSG#554](https://github.com/milvus-io/milvus/pull/554) [IVFPQ#324](https://github.com/milvus-io/milvus/pull/324)

- **Milvus 性能测试报告**

  提供了针对 `IVFFLAT`, `IVFSQ8` 和 `IVFSQ8H` 等索引类型的[性能测试报告](https://github.com/milvus-io/milvus/tree/master/docs)。

#### 主要改进

- **Milvus 优化过的 FAISS**

  在原有 FAISS 的基础上， Milvus 做了一些深层代码的优化以获得更优的查询性能和支持更多类型的索引类型，比如 `IVFSQ8H`。现在，我们将这部分针对 FAISS 进行优化的代码开源了。[#585](https://github.com/milvus-io/milvus/pull/585)

- **多张 GPU 创建索引**

  支持使用多张 GPU 来创建索引以减少创建索引和整体查询的时间。你可以通过对 Milvus 配置文件中的参数 `build_index_resources` 来指定用于创建索引的 GPU 卡。[#414](https://github.com/milvus-io/milvus/pull/414)

#### Bug 修复

- 进一步解决了随查询次数增加，内存占用持续增加的问题。[#335](https://github.com/milvus-io/milvus/pull/335)

---

## v0.5.3

**发布时间**：2019-11-14

**版本兼容**

| Milvus 版本 | pymilvus 版本 | Java SDK 版本 |
| ----------- | ------------- | ------------- |
| 0.5.3       | 0.2.5         | 0.3.0         |

#### 主要改进

- Milvus server 到客户端的结果集数据传输性能增强了至少一倍，主要通过对 gRPC 的以下更新来实现：

  - 优化了 messages；
  - 更改了生成代码的 API 接口；
  - 删除了 compression。

- Python SDK

  - 不同的数组分开存储搜索结果的 ids 和 distances 以减少接口读取结果集的响应时间。
  - 新增了一种新的获取结果集里面某个目标向量的方式：`id = results.id_array[i][j], distance = results.distance_array[i][j]`
  - 新增了一种数组遍历方式，在 `nq` 和 `top_k` 很大的情况下处理时间大大缩短。

    ```python
    >> for id_list, dis_list in zip(results.id_array, results.distance_array):
    >>     for id, dis in zip(id_list, dis_list):
    >>        print("id={}, distance={}".format(id, dis))
    ```

- Java SDK

  - 在连接到 Milvus server 时，增加了 keepalive 和 idleTimeout 等设置选项。
  - 用户现在可以通过 `getResultIdsList` 和 `getResultDistancesList` 分别获取搜索结果的 ids 和 distances，分别获取性能更优。也能通过 `getQueryResultsList` 获取同时包含 ids 和 distances 的对象 `QueryResult`。

- C++ SDK

  - 将其更改为动态库。
  - 新增了 README 文件。

- 提升了 `IVF_SQ8H` 的搜索性能。

---

## v0.5.2

**发布时间**：2019-11-07

#### Bug 修复

新增了文件名检查的系统锁，避免生成重复的数据文件名。解决了由于重复文件名而误删文件导致的搜索失败问题。

#### 主要改进

新增了日语版的 README 文件。（来自外部贡献者）

---

## v0.5.1

**发布时间**：2019-11-04

#### 新增功能

- `IVF_SQ8` 和 `IVFFLAT` 索引类型支持纯 GPU 模式。
- 新增配置参数 `gpu_search_threshold`，允许设置纯 GPU 模式的触发阈值。

#### 主要改进

- 解决了随着搜索次数增加，内存占用过大的问题。
- 优化了搜索性能，解决了随着搜索次数增加，速度减慢的问题。

---

## v0.5.0

**发布时间**：2019-10-21

#### 新增功能

- 支持全新的 `IVF_SQ8H` 混合计算索引。

- 新增 Java SDK。

- 系统启动可以设置预加载向量数据，免去首次查询时的加载时间。

---

## v0.4.0

**发布时间**：2019-09-11

#### 新增功能

- Milvus 现在支持添加多个 GPU 协调分配资源。

- 支持新的索引类型 `IVF_SQ8`。

- 新增了“创建索引”，“用户自定义向量 id”，和“按日期范围删除向量”等 API 接口。

#### 主要改进

- 使用了 gRPC 作为远程通信系统。

---

## v0.3.1

**发布时间**：2019-08-08

#### 新增功能

- 增加了一种新的向量索引方式“IVFSQ"，在保证精度的同时，大幅度缩减索引文件的大小。
- 关于向量距离计算方法，在“欧几里得距离”的基础上，新增了“内积”。
- 增加了多个参数以调整索引的建立，以及搜索的精度和速度。

#### 主要改进

- 当磁盘空间不足时，可通过参数“db_slave_path"添加多个二级数据存储文件路径。
- 通过参数"parallel_reduce"启用多线程向量归并。
- 通过参数”insert_buffer_size"，你可以指定内存中的一部分作为数据插入的缓冲区。
- 当缓存已满时，通过参数“cache_free_percent"来设置有多少数据将被保留。
- 通过参数”insert_cache_immediately"来启用一边插一边查的功能。
- 将原先以分数来评价搜索结果，改成对应的向量距离评价搜索结果。

---

## v0.3.0

**发布时间**：2019-06-30

#### 新增功能

- 增加基于 Celery 的水平扩展方案。
- 增加了删除 Table 的功能。
- 支持 ARM64 架构。

#### 主要改进

- 更新了 C++ 和 Python 的 SDK。
- 增加了获得 Table 行数的接口。
- 增加了查询匹配度作为返回结果。
- 改善了查询的性能。
- 新增了更多的监控指标。

---

## v0.2.1

**发布时间**：2019-06-14

#### 新增功能

增加了数据加载和计算的流水线。

#### 主要改进

支持基于时间范围的查询。

---

## v0.2.0

**发布时间**：2019-05-31

#### 新增功能

- 添加基于 C++ 和 Python 的 SDK。
- 增加基于 Prometheus 的监控指标。
- 增加基于 Inverted File Index 的向量索引。
- 实现单节点的 Milvus。
