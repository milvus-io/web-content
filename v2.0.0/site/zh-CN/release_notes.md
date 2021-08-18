---
id: release_notes.md
title: 发版说明
---

# 发版说明

## v2.0.0-RC4

发布时间：2021-08-13

### 版本兼容

| **Milvus 版本** | **Python SDK 版本**                   | **Java SDK 版本** | **Go SDK 版本** |
| --------------- | ------------------------------------- | ----------------- | --------------- |
| 2.0.0-RC4       | 2.0.0rc4 | 即将上线          | 即将上线        |

Milvus 2.0.0-RC4 是 2.0.0 的预览版本。该版本主要修复了稳定性问题，并新增从对象存储中检索向量数据以及通过通配符匹配指定输出 field 的功能。

### 主要改进

- [#6984](https://github.com/milvus-io/milvus/issues/6984) [#6772](https://github.com/milvus-io/milvus/issues/6772) [#6704](https://github.com/milvus-io/milvus/issues/6704) [#6652](https://github.com/milvus-io/milvus/issues/6652) [#6536](https://github.com/milvus-io/milvus/issues/6536) [#6522](https://github.com/milvus-io/milvus/issues/6522) 优化单元测试。

- [#6859](https://github.com/milvus-io/milvus/pull/6861) 提升 gRPC 客户端 `MaxCallRecvMsgSize` 和 `MaxCallSendMsgSize` 的上限。

- [#6796](https://github.com/milvus-io/milvus/pull/6807) 修复 MsgStream 指数重试策略。

- [#6897](https://github.com/milvus-io/milvus/pull/6897) [#6899](https://github.com/milvus-io/milvus/pull/6899) [#6681](https://github.com/milvus-io/milvus/pull/6899) [#6766](https://github.com/milvus-io/milvus/pull/6766) [#6768](https://github.com/milvus-io/milvus/pull/6768) [#6597](https://github.com/milvus-io/milvus/pull/6597) [#6501](https://github.com/milvus-io/milvus/pull/6501) [#6477](https://github.com/milvus-io/milvus/pull/6477) [#6478](https://github.com/milvus-io/milvus/pull/6478) [#6935](https://github.com/milvus-io/milvus/pull/6935) [#6871](https://github.com/milvus-io/milvus/pull/6871) [#6671](https://github.com/milvus-io/milvus/pull/6671) [#6682](https://github.com/milvus-io/milvus/pull/6682) 优化日志系统。

- [#6440](https://github.com/milvus-io/milvus/pull/6441) 重构 segment manager。

- [#6421](https://github.com/milvus-io/milvus/pull/6449) 创建索引时将原始向量拆分为几个较小的 binlog 文件。

- [#6466](https://github.com/milvus-io/milvus/pull/6467) 区分 query 和 search 的概念和使用。

- [#6505](https://github.com/milvus-io/milvus/pull/6506) 将 RetrieveRequest 中  `output_fields` 修改为 `out_fields_id` 。

- [#6427](https://github.com/milvus-io/milvus/pull/6328) 重构 index coord 的任务分配逻辑。

- [#6529](https://github.com/milvus-io/milvus/pull/6543) [#6599](https://github.com/milvus-io/milvus/pull/6600) 重构时间戳统计的快照。

- [#6692](https://github.com/milvus-io/milvus/issues/6692) [#6343](https://github.com/milvus-io/milvus/pull/6700) 创建 collection/partition 记录时间信息。

- [#6629](https://github.com/milvus-io/milvus/pull/6663) 为 etcdKV 添加 `WatchWithVersion` 接口。

- [#6666](https://github.com/milvus-io/milvus/pull/6667) 重构 expression executor 以使用单个 bitset。

- [#6664](https://github.com/milvus-io/milvus/pull/6665) 当分配的行数超过每个 segment 的最大行数时，自动创建新 segment。

- [#6786](https://github.com/milvus-io/milvus/pull/6786) 重构 `RangeExpr` 和 `CompareExpr`.

- [#6497](https://github.com/milvus-io/milvus/pull/6503) 放宽二元向量 field 搜索时的维度下限。

### 新增功能

- [#6706](https://github.com/milvus-io/milvus/pull/6707) 支持从磁盘读取向量。

- [#6299](https://github.com/milvus-io/milvus/issues/6299) [#6598](https://github.com/milvus-io/milvus/pull/6598) 支持查询向量 field。

- [#5210](https://github.com/milvus-io/milvus/pull/6460) 扩展布尔表达式的语法。

- [#6411](https://github.com/milvus-io/milvus/pull/6510) [#6650](https://github.com/milvus-io/milvus/pull/6671) 搜索/查询输出 field 支持通配符和通配符匹配。

- [#6464](https://github.com/milvus-io/milvus/pull/6613) 添加向量 chunk manager 以支持向量文件本地存储。

- [#6701](https://github.com/milvus-io/milvus/pull/6702) 为通过 Docker Compose 部署的 Milvus 添加数据持久化支持。

- [#6767](https://github.com/milvus-io/milvus/pull/6770) 为 Milvus 添加 Grafana 仪表盘 **.json** 文件。

### 问题修复

- [#5443](https://github.com/milvus-io/milvus/pull/6976) 从 collection 中获取向量时，`CalcDistance` 返回错误的结果。

- [#7004](https://github.com/milvus-io/milvus/pull/7004) Pulsar 消费者导致 goroutine 泄漏。

- [#6946](https://github.com/milvus-io/milvus/pull/6946) 当 Flow Graph 在 `start()` 之后立即 `close()` 时，会发生数据竞争。

- [#6903](https://github.com/milvus-io/milvus/pull/6958) 在 query coord 中使用 `proto marshal` 以替代 `marshalTextString` 来避免由未知 field 名称崩溃触发的崩溃。

- [#6374](https://github.com/milvus-io/milvus/issues/6374) [#6849](https://github.com/milvus-io/milvus/pull/6908) 加载 collection 失败。

- [#6977](https://github.com/milvus-io/milvus/pull/6978) 删除 partition/collection 后，搜索返回错误限制。

- [#6515](https://github.com/milvus-io/milvus/issues/6515) [#6567](https://github.com/milvus-io/milvus/issues/6567) [#6552](https://github.com/milvus-io/milvus/issues/6552) [#6483](https://github.com/milvus-io/milvus/pull/6551) Data node BackGroundGC 不运作并导致内存泄漏。

- [#6943](https://github.com/milvus-io/milvus/pull/6944) MinIOKV `GetObject` 方法不会关闭客户端并导致每次调用产生 goroutine 泄漏。

- [#6370](https://github.com/milvus-io/milvus/pull/6935) 因加载 partition 提供的错误语义导致搜索卡住。

- [#6831](https://github.com/milvus-io/milvus/pull/6832) Data node 在元服务中崩溃。

- [#6469](https://github.com/milvus-io/milvus/pull/6905) 当限制（`topK`）大于插入 entity 的数量时，使用汉明距离搜索二进制结果错误。

- [#6693](https://github.com/milvus-io/milvus/pull/6870) 因超时引起的 segment 竞争情况。

- [#6097](https://github.com/milvus-io/milvus/pull/6351) 短时间内频繁重启 query node 后导致加载卡住。

- [#6464](https://github.com/milvus-io/milvus/pull/6465) 处理 Data sorter 边界情况。

- [#6419](https://github.com/milvus-io/milvus/pull/6439) Milvus 在插入空向量时崩溃。

- [#6477](https://github.com/milvus-io/milvus/pull/6477) 不同的组件在 MinIO 中重复创建桶。

- [#6377](https://github.com/milvus-io/milvus/pull/6377) 在部署了多个 query node 的情况下，由于从 etcd 获取的 globalSealedSegment 信息不正确导致 Milvus 集群查询结果返回不完整。

- [#6499](https://github.com/milvus-io/milvus/pull/6500) TSO 分配错误的时间戳。

- [#6501](https://github.com/milvus-io/milvus/pull/6545) Data node 崩溃后 channel 丢失。

- [#6527](https://github.com/milvus-io/milvus/pull/6568) 无法从 etcd 中删除 `watchQueryChannels` 的任务信息。

- [#6576](https://github.com/milvus-io/milvus/issues/6576) [#6526](https://github.com/milvus-io/milvus/pull/6577) 检索 entity 时会添加重复的 primary field ID。

- [#6627](https://github.com/milvus-io/milvus/issues/6627) [#6569](https://github.com/milvus-io/milvus/pull/6628) 当新记录的距离为 NaN 时，`std::sort` 无法正常过滤搜索结果。

- [#6655](https://github.com/milvus-io/milvus/pull/6656) 调用检索任务时 proxy 崩溃。

- [#6762](https://github.com/milvus-io/milvus/pull/6763) Collection/partition 的创建时间戳不正确。

- [#6644](https://github.com/milvus-io/milvus/pull/6658) Data node 自动重启失败。

- [#6641](https://github.com/milvus-io/milvus/pull/6642) 与 etcd 断开连接时无法停止 data coord。

- [#6621](https://github.com/milvus-io/milvus/pull/6621) 在插入的数据大小大于 segment 时，Milvus 抛出异常。

- [#6436](https://github.com/milvus-io/milvus/issues/6436) [#6573](https://github.com/milvus-io/milvus/issues/6573) [#6507](https://github.com/milvus-io/milvus/pull/6814) 时间同步处理不正确。

- [#6732](https://github.com/milvus-io/milvus/pull/6871) 创建 IVF-PQ 索引失败。

## v2.0.0-RC2

发布时间: 2021-07-13

### 版本兼容

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| :------------- | :----------------- | :--------------- | :------------- |
| 2.0.0-RC2         | 2.0.0rc4              | 即将上线            | 即将上线          |

Milvus 2.0.0-RC2 是 2.0.0 的预览版本。该版本修复了 RC1 版本的稳定性和性能问题，并针对节点和存储管理进行了代码重构。

### 主要改进

- [#6356](https://github.com/milvus-io/milvus/issues/6356) Data coordinator 集群代码重构。
- [#6300](https://github.com/milvus-io/milvus/issues/6300) Data coordinator 元数据管理代码重构。
- [#6289](https://github.com/milvus-io/milvus/issues/6289) `SegmentIndexInfo` 新增 `collectionID` 和 `partitionID` 信息。
- [#6258](https://github.com/milvus-io/milvus/issues/6258) 调用 `releaseCollection()` 方法时清除 proxy 中对应的 `searchMsgStream`。
- [#6227](https://github.com/milvus-io/milvus/issues/6227) 合并 query node 召回和查询的相关代码。
- [#6196](https://github.com/milvus-io/milvus/issues/6196) Data coordinator 新增候选管理，用于维护管理 data node 集群。
- [#6188](https://github.com/milvus-io/milvus/issues/6188) 新增“使用 Docker Compose 安装"的相关技术文档。

### 新增功能

- [#6386](https://github.com/milvus-io/milvus/issues/6386) 支持调用 `fget_object()` 方法从 MinIO 加载文件到本地设备。
- [#6253](https://github.com/milvus-io/milvus/issues/6253) 支持在 data coordinator 调用 `GetFlushedSegments()` 方法。
- [#6213](https://github.com/milvus-io/milvus/issues/6213) 新增 `GetIndexStates()` 方法。

### 问题修复

- [#6184](https://github.com/milvus-io/milvus/issues/6184) 数据集规模增加导致查询准确性下降。
- [#6308](https://github.com/milvus-io/milvus/issues/6308) NSG 索引的 KNNG 参数未达到满值会导致服务器崩溃。
- [#6212](https://github.com/milvus-io/milvus/issues/6212) Query node 重启后查询操作宕机。
- [#6265](https://github.com/milvus-io/milvus/issues/6265) 服务器检测到节点在线后不检查节点状态。
- [#6359](https://github.com/milvus-io/milvus/issues/6359) [#6334](https://github.com/milvus-io/milvus/issues/6334) 在 CentOS 系统上编译 Milvus 出现编译错误。

## v2.0.0-RC1

发布时间：2021-06-28

### 版本兼容


| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| :------------- | :----------------- | :--------------- | :------------- |
| 2.0.0-RC1 | 2.0.0rc4 | 即将上线            | 即将上线          |


Milvus 2.0.0-RC1 是 2.0.0 的预览版本。 该版本引入 Go 语言搭建分布式系统，并采用了新的云原生分布式设计。 后者大大提高了系统扩展性和系统弹性。

### 系统架构

Milvus 2.0 是一款云原生向量数据库，采用存储与计算分离的架构设计。该重构版本的所有组件均为无状态组件，极大地增强了系统弹性和灵活性。

整个系统分为四个层面：

- 接入层（Access Layer）
- 协调服务（Coordinator Service）
- 执行节点（Worker Node）
- 存储服务 （Storage）

**接入层Access Layer**：系统的门面，包含了一组对等的 proxy 节点。接入层是暴露给用户的统一 endpoint，负责转发请求并收集执行结果。

**协调服务（Coordinator Service）**：系统的大脑，负责分配任务给执行节点。总共有四类协调者角色，分别为 root 协调者、data 协调者、query 协调者和 index 协调者。

**执行节点（Worker Node）**： 系统的四肢。执行节点只负责被动执行协调服务发起的读写请求。目前有三类执行节点，即 data 节点、query 节点和 index 节点。

**存储服务（Storage）**： 系统的骨骼，是所有其他功能实现的基础。Milvus 依赖三类存储：元数据存储、消息存储（Log Broker）和对象存储。

> 更多系统原理的相关内容详见 [Milvus 2.0 架构](architecture_overview.md)。


### 新增功能

**SDK**

- PyMilvus-ORM

  PyMilvus-ORM API 直接在 collection、partion 和 index 对象上进行操作。用户可专注于搭建业务数据模型，而不必担心具体实现。

**核心功能**

- 标量和向量数据混合查询

  Milvus 2.0 支持存储标量数据。支持使用大于、小于、等于、NOT、IN、AND、OR 等运算符在向量搜索之前进行标量过滤。 当前支持的数据类型包括 bool、int8、int16、int32、int64、float 和 double。 后期版本将逐步支持字符串和 VARBINARY 数据类型。

- 匹配查询（Match Query）

  与返回相似结果的搜索操作不同，匹配查询操作返回完全匹配表达式的对象，可用于按 ID 或按搜索条件查询向量。

- 多一致性

- 分布式数据库需在一致性与可用性以及一致性与延迟之间进行权衡。 Milvus 提供四种一致性级别，从强到弱分别为：强一致性(Strong)、有界一致性(Bounded Staleness)、会话一致性(Session) 、前缀一致性（Consistent Prefix)。 用户可以通过指定时间戳自定义读取一致性。 一般情况下，一致性级别越弱，可用性越高，性能也越好。

- 时间旅行（Time Travel）

  通过时间旅行可以访问指定时间段内任意时刻的历史数据。用户可使用该功能查询、恢复和备份历史数据。

**其他**

- 支持基于 helm 和 docker-compose 一键部署 Milvus 2.0。

- 使用 Prometheus 和 Grafana 实现数据监测和报警功能。

- Milvus Insight

  Milvus Insight 是 Milvus 图形化管理工具，包含了集群状态可视化、元数据管理、数据查询等实用功能。Milvus Insight 源码未来也会作为独立项目开源。

### 不兼容改动

Milvus 2.0 使用的编程语言、数据格式以及分布式架构都与之前的版本完全不同，这意味着不能从之前的 Milvus 版本升级到 2.x 版本。不过，Milvus 1.x 是长期支持版本（LTS），相关的数据迁移工具将尽快上线。

具体改动如下：

- 暂不支持 JAVA、Go 和 C++ SDK。

- 暂不支持删除和更新操作。

- PyMilvus-ORM 不支持 force flush。

- 数据格式与之前版本不兼容。

- 废弃 Mishards —— Milvus 2.0 为分布式架构，无需分片中间件。

- 暂不支持本地文件存储和分布式系统存储。
