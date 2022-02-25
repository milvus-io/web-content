---
id: architecture_overview.md
---

# Milvus 系统架构概述

Milvus 是一款云原生向量数据库，它具备高可用、高性能、易拓展的特点，用于海量向量数据的实时召回。本文主要描绘了 Milvus 的宏观设计，包括数据模型、架构设计以及关键路径。

Milvus 基于 FAISS、Annoy、HNSW 等向量搜索库构建，核心是解决稠密向量相似度检索的问题。建议在阅读本文前，先了解向量检索的 [基本概念](glossary.md)。

在向量检索库的基础上，Milvus 支持数据分区分片、数据持久化、增量数据摄取、标量向量混合查询、time travel 等功能，同时大幅优化了向量检索的性能，可满足任何向量检索场景的应用需求。我们推荐用户使用 Kubernetes 部署 Milvus，以获得最佳可用性和弹性。

Milvus 采用共享存储架构，存储计算完全分离，计算节点支持横向扩展。

从架构上来看，Milvus 遵循数据流和控制流分离，整体分为了 [四个层次](four_layers.md)，分别为接入层（access layer）、协调服务（coordinator service）、执行节点（worker node）和存储层（storage）。各个层次相互独立，独立扩展和容灾。

![Architecture_diagram](../../../../assets/architecture_diagram.png "Milvus 系统架构。")


更多 Milvus 架构细节，参考 [存储计算分离](four_layers.md) 以及 [主要组件](main_components.md)。
