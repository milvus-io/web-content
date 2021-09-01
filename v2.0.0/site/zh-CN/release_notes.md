---
id: release_notes.md
---

# 发版说明

## v2.0.0-RC5

发布时间：2021-08-30

### 版本兼容

<table class="version">
	<thead>
	<tr>
		<th>Milvus 版本</th>
		<th>Python SDK 版本</th>
		<th>Java SDK 版本</th>
		<th>Go SDK 版本</th>
		<th>Node SDK 版本</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>2.0.0-RC5</td>
		<td>2.0.0rc5</td>
		<td>即将上线</td>
		<td>即将上线</td>
		<td>1.0.16</td>
	</tr>
	</tbody>
</table>

Milvus 2.0.0-RC5 是 2.0.0 的预览版本。该版本支持 message queue 数据保留机制和 etcd 数据清理，通过 API 暴露分布式版指标，并为后续支持删除操作做准备。 RC5 在系统稳定性方面也取得了很大的进步。 该版本修复了一系列资源泄露、操作卡死、 以及 Milvus 集群下单机 Pulsar 的配置错误等问题。

### 主要改进

- [#7226](https://github.com/milvus-io/milvus/pull/7226) 重构 data coord allocator。
- [#6867](https://github.com/milvus-io/milvus/pull/6867) 添加 connection manager。
- [#7172](https://github.com/milvus-io/milvus/pull/7172) 添加 seal 策略以限制 segment 的生命周期。
- [#7163](https://github.com/milvus-io/milvus/pull/7163) 增加创建索引时 gRPC 连接的超时时间。
- [#6996](https://github.com/milvus-io/milvus/pull/6996) 添加 segment flush 的最小间隔。
- [#6590](https://github.com/milvus-io/milvus/pull/6590) 在 `SegmentInfo` 中保存 binlog 路径。
- [#6848](https://github.com/milvus-io/milvus/pull/6848) 移除 `RetrieveRequest` 和 `RetrieveTask`。
- [#7102](https://github.com/milvus-io/milvus/pull/7102) 支持搜索输出向量 field。
- [#7075](https://github.com/milvus-io/milvus/pull/7075) 重构 `NewEtcdKV` API.
- [#6965](https://github.com/milvus-io/milvus/pull/6965) 为 data node 添加 channel 以监听 etcd。
- [#7066](https://github.com/milvus-io/milvus/pull/7066) 优化搜索聚合逻辑。
- [#6993](https://github.com/milvus-io/milvus/pull/6993) 针对解析 gRPC 收发参数增强日志系统。
- [#7331](https://github.com/milvus-io/milvus/pull/7331) 修改 context 至正确的 package。
- [#7278](https://github.com/milvus-io/milvus/pull/7278) 每 1000 次修订后启用 etcd 自动压缩。
- [#7355](https://github.com/milvus-io/milvus/pull/7355) 从 util/flowgraph 中清除 `fmt.Println `。

### 新增功能

- [#7112](https://github.com/milvus-io/milvus/pull/7112) [#7174](https://github.com/milvus-io/milvus/pull/7174) 引入嵌入式 etcdKV（第一阶段完成）。
- [#7231](https://github.com/milvus-io/milvus/pull/7231) 添加 segment filter 接口。
- [#7157](https://github.com/milvus-io/milvus/pull/7157) 暴露 index coord 和 index nodes 的 metrics 信息。
- [#7137](https://github.com/milvus-io/milvus/pull/7137) [#7157](https://github.com/milvus-io/milvus/pull/7157) 通过 proxy 暴露系统拓扑信息。
- [#7113](https://github.com/milvus-io/milvus/pull/7113) [#7157](https://github.com/milvus-io/milvus/pull/7157) 暴露 query coord 和 query nodes 的指标信息。
- [#7134](https://github.com/milvus-io/milvus/pull/7134) 允许用户仅使用内存执行向量搜索。
- [#6617](https://github.com/milvus-io/milvus/pull/6617) 为 Rocksmq 添加 log 保留策略。
- [#7303](https://github.com/milvus-io/milvus/pull/7303) 添加 query node segment filter。
- [#7304](https://github.com/milvus-io/milvus/pull/7304) 在 proto 中添加 `delete` API。
- [#7261](https://github.com/milvus-io/milvus/pull/7261) 添加 delete node。
- [#7268](https://github.com/milvus-io/milvus/pull/7268) 插入数据时搭建 Bloom filter。

### 问题修复

- [#7272](https://github.com/milvus-io/milvus/pull/7272) [#7352](https://github.com/milvus-io/milvus/pull/7352) [#7335](https://github.com/milvus-io/milvus/pull/7335) 若已创建索引，则无法使用现有 volume 启动新的 Docker 容器：proxy 不健康。
- [#7243](https://github.com/milvus-io/milvus/pull/7243) 旧版本插入的数据在新版本 Milvus 中创建索引失败。
- [#7253](https://github.com/milvus-io/milvus/pull/7253) 释放不同的 partition 后，搜索结果为空。
- [#7244](https://github.com/milvus-io/milvus/pull/7244) [#7227](https://github.com/milvus-io/milvus/pull/7227) 收到空搜索结果时 proxy 崩溃。
- [#7203](https://github.com/milvus-io/milvus/pull/7203) gRPC 服务器关闭时连接卡住。
- [#7188](https://github.com/milvus-io/milvus/pull/7188) 单元测试逻辑不完整。
- [#7175](https://github.com/milvus-io/milvus/pull/7175) 未加载的情况下使用 collection ID 计算距离时返回的错误消息不明确。
- [#7151](https://github.com/milvus-io/milvus/pull/7151) 由于缺少 `DropCollection` 导致 data node flowgraph 不关闭。
- [#7167](https://github.com/milvus-io/milvus/pull/7167) 无法加载 IVF_FLAT 索引。
- [#7123](https://github.com/milvus-io/milvus/pull/7123) “Timestamp go back” 问题。
- [#7140](https://github.com/milvus-io/milvus/pull/7140) 使用谷本距离计算相似度时，`calc_distance` 会返回错误的二元向量结果。
- [#7143](https://github.com/milvus-io/milvus/pull/7143) KV 操作失败时，内存和 etcd 的状态不一致。
- [#7141](https://github.com/milvus-io/milvus/pull/7141) [#7136](https://github.com/milvus-io/milvus/pull/7136) 当 index node pod 频繁重启时，索引构建会卡住。
- [#7119](https://github.com/milvus-io/milvus/pull/7119) 当使用相同的 topic 和 sub name 订阅时，Pulsar `msgStream` 可能会卡住。
- [#6971](https://github.com/milvus-io/milvus/pull/6971) 使用 HNSW 索引搜索时发生异常。
- [#7104](https://github.com/milvus-io/milvus/pull/7104) 如果 query node 只加载 sealed segment 而未监听 insert channel，搜索会卡住。
- [#7085](https://github.com/milvus-io/milvus/pull/7085) Segment 无法自动 flush。
- [#7074](https://github.com/milvus-io/milvus/pull/7074) Index node 等待至 index coord 启动后完成操作。
- [#7061](https://github.com/milvus-io/milvus/pull/7061) 如果 data coord 没有收到来自 data node 的 timetick 消息，则 segment allocation 不会过期。
- [#7059](https://github.com/milvus-io/milvus/pull/7059) Query nodes 发生 producer 泄漏。
- [#7005](https://github.com/milvus-io/milvus/pull/7005) 当 `loadSegmentInternal` 失败时，query node 不会向 query coord 返回错误。
- [#7054](https://github.com/milvus-io/milvus/pull/7054) 当 `topk` 大于 `row_num.` 时，query node 返回错误的 ID。
- [#7053](https://github.com/milvus-io/milvus/pull/7053) Allocation 逻辑不完整。
- [#7044](https://github.com/milvus-io/milvus/pull/7044) 在检索本地存储中的向量之前，未对内存中未建索引向量的检查。
- [#6862](https://github.com/milvus-io/milvus/pull/6862) Data node 的 flush `cache` 内存泄露。
- [#7346](https://github.com/milvus-io/milvus/pull/7346) 重启分布式版 Milvus 后 query coord 容器在一分钟内退出。
- [#7339](https://github.com/milvus-io/milvus/pull/7339) 表达式边界问题。
- [#7311](https://github.com/milvus-io/milvus/pull/7311) 添加 `queryCollection` 时 collection 为空。
- [#7266](https://github.com/milvus-io/milvus/pull/7266) Flowgraph 内存释放错误。
- [#7310](https://github.com/milvus-io/milvus/pull/7310) 释放和加载 partition 后搜索时 timeout 过长。
- [#7320](https://github.com/milvus-io/milvus/pull/7320) 嵌入式 etcd 和外部 etcd 之间的端口冲突。
- [#7336](https://github.com/milvus-io/milvus/pull/7336) Data node 边界情况。




## v2.0.0-RC4

发布时间：2021-08-13

### 版本兼容

| **Milvus 版本** | **Python SDK 版本**                   | **Java SDK 版本** | **Go SDK 版本** |
| --------------- | ------------------------------------- | ----------------- | --------------- |
| 2.0.0-RC4       | 2.0.0rc5 | 即将上线          | 即将上线        |

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
| 2.0.0-RC2         | 2.0.0rc5              | 即将上线            | 即将上线          |

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
| 2.0.0-RC1 | 2.0.0rc5 | 即将上线            | 即将上线          |


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

- PyMilvus

  PyMilvus API 直接在 collection、partion 和 index 对象上进行操作。用户可专注于搭建业务数据模型，而不必担心具体实现。

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

- PyMilvus 不支持 force flush。

- 数据格式与之前版本不兼容。

- 废弃 Mishards —— Milvus 2.0 为分布式架构，无需分片中间件。

- 暂不支持本地文件存储和分布式系统存储。
