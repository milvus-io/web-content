---
id: features.md
---

# 主要特性

## 全面的相似度指标
  
Milvus 支持各种常用的相似度计算指标，包括欧氏距离、内积、汉明距离和杰卡德距离等。你可以根据应用需求来选择最有效的向量相似度计算方式。

## 业界领先的性能

Milvus 基于高度优化的 Approximate Nearest Neighbor Search (ANNS) 索引库构建，包括 faiss、 annoy、和 hnswlib 等。你可以针对不同使用场景选择不同的索引类型。

## 动态数据管理
  
你可以随时对数据进行插入、删除、搜索、更新等操作而无需受到静态数据带来的困扰。

## 近实时搜索

近实时搜索指的是，插入 Milvus 的数据在默认 1 秒后即被存入存储设备并能被搜索到。详情请参阅 [Search](index.md)。

## 高成本效益
  
Milvus 充分利用现代处理器的并行计算能力，可以在单台通用服务器上完成对十亿级数据的毫秒级搜索。

## 支持多种数据类型和高级搜索（即将上线）
  
Milvus 的数据记录中的字段支持多种数据类型。你还可以对一个或多个字段使用高级搜索，例如过滤、排序和聚合。

## 高扩展性和可靠性
  
你可以在分布式环境中部署 Milvus。如果要对集群扩容或者增加可靠性，你只需增加节点。

## 云原生

你可以轻松在公有云、私有云、或混合云上运行 Milvus。

## 简单易用

Milvus 提供了易用的 Python、Java、Go 和 C++ SDK，另外还提供了 RESTful API。

## 预写式日志

Milvus 实现了类似数据库系统的 WAL（预写式日志，Write Ahead Log）。任何对于数据的修改操作在进入 Milvus 之前会先存储成为日志，然后再写入 Milvus。一旦在写入 Milvus 过程中遭遇失败（如磁盘空间不足、内存耗尽），Milvus 重启时会从日志中恢复之前没有完成的操作，重新执行。详情请参阅 [预写式日志](write_ahead_log.md)。

## DSL

Milvus 提供了基于 JSON 结构的 DSL（领域特定语言，Domain-specific language）。你可以使用 DSL 灵活地进行查询。

## Mishards

Mishards 是一个用 Python 开发的 Milvus 集群分片中间件，可处理请求转发、读写分离、水平扩展、动态扩容（使得内存和算力可以无限扩容）。详情请参阅 [Mishards](mishards.md)。

## 异构计算

Milvus 能够调度多个 GPU 进行向量搜索和索引建立。利用 GPU 强大的并行运算能力，Milvus 在大批量查询和向量索引建立等高耗时任务上性能表现优异。

## 向量索引

Milvus 支持基于 Faiss、NMSLIB 和 Annoy 的树、图和量化等多种索引。关于向量索引的详情，请参阅 [向量索引](index.md)。而对于索引的选择和索引参数的选择，请参阅 [性能调优](tuning.md)。

## 监控与告警

Milvus 使用 Prometheus 作为监控和性能指标存储方案，使用 Grafana 作为可视化组件进行数据展示。详情请参阅 [监控](monitor.md)。