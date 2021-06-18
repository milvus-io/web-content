---
id: release_notes.md
title: 发版说明
sidebar_label: 发版说明
---

# 发版说明

- ## v0.9.1

  **发布时间**：2020-5-29

  #### 版本兼容

  | Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
  | :---------- | :-------------- | :------------ | :---------- |
  | 0.9.1       | 0.2.12          | 0.8.1         | 0.4.1       |

  #### 问题修复

- 多分区情况下，服务器重启后数据会被重复插入两次。[#2378](https://github.com/milvus-io/milvus/issues/2378)

- 使用 GPU IVF 索引时，如果查询次数 nq 过高，系统会报 `cudaMalloc` 错误。 [#2395](https://github.com/milvus-io/milvus/issues/2395)
- 向量删除后依然会被 GPU 加速版 Milvus 找到。 [#2450](https://github.com/milvus-io/milvus/issues/2450)

> 详见 [CHANGELOG](https://github.com/milvus-io/milvus/blob/master/CHANGELOG.md) 了解更多已修复问题。https://github.com/milvus-io/milvus/issues/2395)




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

  增加 `ANNOY` 索引类型，关于 `ANNOY` 索引的详细介绍请参考[文档](../guides/index.md)。[#261](https://github.com/milvus-io/milvus/issues/261)
  
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

  新增了 WAL 功能，可以大大提高数据操作的可靠性。你可以在 Milvus 服务端配置文件（`server_config.yaml`）中对 WAL 进行设置。[#830](https://github.com/milvus-io/milvus/issues/830)

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

  从 Milvus 0.7.0 开始，Milvus 服务端配置文件（`server_config.yaml`）版本更新为 0.2。配置文件的参数也发生了变化。

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
  - 新增了一种数组遍历方式，在 `nq` 和 `topk` 很大的情况下处理时间大大缩短。

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
