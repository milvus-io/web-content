---
id: overview.md
---

# Milvus 是什么

Milvus 是一款开源向量相似度搜索引擎，建立在 Faiss、NMSLIB、Annoy 等向量索引库基础之上，具有功能强大、稳定可靠以及易于使用等特点。Milvus 集成了这些向量索引库，隐藏了他们的复杂性，提供了一套简单而一致的 API。此外，Milvus 能够有效的管理向量数据，提供针对向量和非向量数据的增删改查的能力。除了提供针对向量的近实时搜索能力外，Milvus 可以对标量数据进行过滤。随着数据和查询规模的增加，Milvus 还提供了集群分片的解决方案，支持读写分离、水平扩展、动态扩容等功能，实现了对于超大数据规模的支持。目前，Milvus 是一个单节点主从式架构（Client-server model）的服务器，最高可以支持 TB 级特征数据的存储和搜索服务。对于有更大数据规模或者高并发需求的用户，可以使用目前尚在实验阶段的集群分片中间件 Mishards 进行部署。

在服务端，Milvus 由两部分组成：Milvus server 和 Meta store。

* Milvus server 提供了 Milvus 的主要功能，包括数据的存储与管理、数据的搜索等。
* Meta store 则存储了 Milvus 的元数据。目前 Milvus 支持的元数据库可以是 MySQL 和 SQLite。

这些能力使得 Milvus 可以广泛地应用于以下场景：

- 图像、视频、音频等音视频搜索领域
- 文本搜索、推荐和交互式问答系统等文本搜索领域
- 新药搜索、基因筛选等生物医药领域

除了提供核心的数据管理和搜索功能外，Milvus 还提供了

- 基于 JSON 的 DSL，提供用户灵活方便的搜索方式
- 基于 Python / Java / Go / C++ 的 SDK 和 RESTful API
- 对接基于 Prometheus 的监控与告警系统
- 基于 Docker和 Kubernetes 的部署方式

以上功能都极大地增强了 Milvus 的易用性。

Milvus 是开箱即用的产品，所有配置参数都有默认值。因此对初学者来说使用体验非常友好。随着深入了解 Milvus，你会发现整个 Milvus 都是灵活可配置的。你可以利用 Milvus 的高级特性来优化向量的存储与搜索，更好地服务于你的业务。

Milvus 在 Apache 2 License 协议下发布，于 2019 年 10 月正式开源，是 [LF AI](https://lfai.foundation/) 基金会的孵化项目。Milvus 的源代码被托管于 Github 之上：[Milvus · 开源的特征向量相似度搜索引擎](https://github.com/milvus-io/milvus)。如果你想加入我们的开发者社区，欢迎访问：[Contribute to Milvus](https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md#contributing-to-milvus)。

如果你对 Milvus 有任何与功能、SDK 等相关的问题，欢迎加入 [Slack](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ) 参与讨论。