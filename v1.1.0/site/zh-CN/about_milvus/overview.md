---
id: overview.md
---

# Milvus 是什么

Milvus 是一款开源的向量数据库，支持针对 TB 级向量的增删改操作和近实时查询，具有高度灵活、稳定可靠以及高速查询等特点。Milvus 集成了 Faiss、NMSLIB、Annoy 等广泛应用的向量索引库，提供了一整套简单直观的 API，让你可以针对不同场景选择不同的索引类型。此外，Milvus 还可以对标量数据进行过滤，进一步提高了召回率，增强了搜索的灵活性。

Milvus 服务器采用主从式架构 (Client-server model)。

- 在服务端，Milvus 由 Milvus Core 和 Meta Store 两部分组成：
    - Milvus Core 存储与管理向量和标量数据。
    - Meta Store 存储与管理 SQLite 和 MySQL 中的元数据，分别用于测试和生产。
- 在客户端，Milvus 还提供了基于 Python、Java、Go、C++ 的 SDK 和 RESTful API。

Milvus 在 Apache 2 License 协议下发布，于 2019 年 10 月正式开源，是 [LF AI & DATA 基金会](https://lfaidata.foundation/)的毕业项目。Milvus 的源代码被托管于 [Github](https://github.com/milvus-io/milvus)。

> 目前，Milvus 的服务器在单节点上运行。对于有更大数据规模或者高并发需求的用户，可以使用目前尚在开发阶段的集群分片中间件 Mishards 进行部署。



## 整体架构

![Milvus 架构](../../../assets/milvus_arch.png)


## 应用场景

Milvus 在全球范围内已被数百家组织和机构所采用，广泛应用于以下场景：

- 图像、视频、音频等音视频搜索领域
- 文本搜索、推荐和交互式问答系统等文本搜索领域
- 新药搜索、基因筛选等生物医药领域

详见 [应用场景](https://milvus.io/cn/scenarios/)。


## 主要特性

#### 异构计算

- 优化了基于 GPU 搜索向量和建立索引的性能。
- 可以在单台通用服务器上完成对 TB 级数据的毫秒级搜索。
- 动态数据管理。

#### 支持主流索引库、距离计算方式和监控工具

- 集成了 Faiss、NMSLIB、Annoy 等向量索引库。
- 支持基于量化的索引、基于图的索引和基于树的索引。
- 相似度计算方式包括欧氏距离 (L2)、内积 (IP)、汉明距离、杰卡德距离等。
- Prometheus 作为监控和性能指标存储方案，Grafana 作为可视化组件进行数据展示。

#### 近实时搜索

- 插入 Milvus 的数据默认在 1 秒后即可被搜索到。 

#### 标量字段过滤 (即将上线) 

- 支持向量和标量数据。
- 可以对标量数据进行过滤，增强搜索的灵活性。

## 发行版本
<a name='distributions'></a>

Milvus 提供两个发行版本：CPU 版本和 GPU 版本。

<ul>
<li>CPU 版 Milvus 仅支持使用 CPU 建索引和搜索。</li>
<li>GPU 版 Milvus 在 CPU 版的基础上进行了 GPU 加速：支持同时进行索引创建和搜索计算以提高查询效率。你可以在同一时间内使用 GPU 建索引，使用 CPU 搜索向量。</li>
</ul>

如果你的计算机上安装了支持 CUDA 功能的 GPU 设备，你可以安装 Milvus 的 GPU 版本以获取针对海量数据的更优的查询性能。

详见：[Milvus 发行版本](milvus_distributions-cpu.md)。

## 加入开发者社区

如果你想为 Milvus 项目贡献代码，请参考我们的代码贡献指南：[Contribute to Milvus](https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md#contributing-to-milvus)。

如果你对 Milvus 有任何与功能、SDK 等相关的问题，欢迎加入 [Slack](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ) 参与讨论。