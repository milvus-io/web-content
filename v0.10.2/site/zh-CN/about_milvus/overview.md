---
id: overview.md
---

# Milvus 是什么

Milvus 是一款开源向量相似度搜索引擎，在 Apache 2 License 协议下发布，于 2019 年 10 月正式开源，是 [LF AI](https://lfai.foundation/) 基金会的孵化项目。Milvus 的源代码被托管于 [Github](https://github.com/milvus-io/milvus)。


Milvus 建立在 Faiss、NMSLIB、Annoy 等向量索引库基础之上，具有功能强大、稳定可靠以及易于使用等特点。Milvus 集成了这些向量索引库，隐藏了他们的复杂性，提供了一套简单而一致的 API。你可以针对不同使用场景选择不同的索引类型。此外，Milvus 能够有效的管理向量数据，提供针对向量和非向量数据的增删改查的能力。除了提供针对向量的近实时搜索能力外，Milvus 可以对标量数据进行过滤。随着数据和查询规模的增加，Milvus 还提供了集群分片的解决方案，支持读写分离、水平扩展、动态扩容等功能，实现了对于超大数据规模的支持。目前，Milvus 是一个单节点主从式架构（Client-server model）的服务器，最高可以支持 TB 级特征数据的存储和搜索服务。

- 在服务端，Milvus 由 Milvus server 和 Meta store 两部分组成：
    - Milvus server 提供了 Milvus 的主要功能，包括数据的存储与管理、数据的搜索等。
    - Meta store 则存储了 Milvus 的元数据。目前 Milvus 支持的元数据库可以是 MySQL 和 SQLite。
- 在客户端，Milvus 还提供了基于 Python、Java、Go、C++ 的 SDK 和 RESTful API。

对于有更大数据规模或者高并发需求的用户，可以使用目前尚在实验阶段的集群分片中间件 Mishards 进行部署。



## 整体架构

![Milvus 架构](../../../assets/milvus_arch.png)


## 应用场景

Milvus 可以广泛地应用于以下场景：

- 图像、视频、音频等音视频搜索领域
- 文本搜索、推荐和交互式问答系统等文本搜索领域
- 新药搜索、基因筛选等生物医药领域

详见 [应用场景](https://milvus.io/cn/scenarios/)。


## 主要特性

### 全面的相似度指标
  
Milvus 支持各种常用的相似度计算指标，包括欧氏距离、内积、汉明距离和杰卡德距离等。你可以根据应用需求来选择最有效的向量相似度计算方式。

### 业界领先的性能

Milvus 基于高度优化的 Approximate Nearest Neighbor Search (ANNS) 索引库构建，包括 Faiss、 Annoy、和 hnswlib 等。你可以针对不同使用场景选择不同的索引类型。

### 动态数据管理
  
你可以随时对数据进行插入、删除、搜索、更新等操作而无需受到静态数据带来的困扰。

### 近实时搜索

近实时搜索指的是，插入 Milvus 的数据在默认 1 秒后即被存入存储设备并能被搜索到。

### 高成本效益
  
Milvus 充分利用现代处理器的并行计算能力，可以在单台通用服务器上完成对十亿级数据的毫秒级搜索。

### 支持多种数据类型和高级搜索（即将上线）
  
Milvus 的数据记录中的字段支持多种数据类型。你还可以对一个或多个字段使用高级搜索，例如过滤、排序和聚合。

### 高扩展性和可靠性
  
你可以在分布式环境中部署 Milvus。如果要对集群扩容或者增加可靠性，你只需增加节点。

### 云原生

你可以轻松在公有云、私有云、或混合云上运行 Milvus。


### 预写式日志

Milvus 实现了类似数据库系统的 WAL（预写式日志，Write Ahead Log）。任何对于数据的修改操作在进入 Milvus 之前会先存储成为日志，然后再写入 Milvus。一旦在写入 Milvus 过程中遭遇失败（如磁盘空间不足、内存耗尽），Milvus 重启时会从日志中恢复之前没有完成的操作，重新执行。详情请参阅 [预写式日志](write_ahead_log.md)。

### DSL

Milvus 提供了基于 JSON 结构的 DSL（领域特定语言，Domain-specific language）。你可以使用 DSL 灵活地进行查询。

### Mishards

Mishards 是一个用 Python 开发的 Milvus 集群分片中间件，可处理请求转发、读写分离、水平扩展、动态扩容（使得内存和算力可以无限扩容）。详情请参阅 [Mishards](mishards.md)。

### 异构计算

Milvus 能够调度多个 GPU 进行向量搜索和索引建立。利用 GPU 强大的并行运算能力，Milvus 在大批量查询和向量索引建立等高耗时任务上性能表现优异。

### 向量索引

Milvus 支持基于 Faiss、NMSLIB 和 Annoy 的树、图和量化等多种索引。关于向量索引的详情，请参阅 [向量索引](index.md)。而对于索引的选择和索引参数的选择，请参阅 [性能调优](tuning.md)。

### 监控与告警

Milvus 使用 Prometheus 作为监控和性能指标存储方案，使用 Grafana 作为可视化组件进行数据展示。详情请参阅 [监控](monitor.md)。




## 加入开发者社区

如果你想为 Milvus 项目贡献代码，欢迎访问：[Contribute to Milvus](https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md#contributing-to-milvus)。

如果你对 Milvus 有任何与功能、SDK 等相关的问题，欢迎加入 [Slack](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ) 参与讨论。