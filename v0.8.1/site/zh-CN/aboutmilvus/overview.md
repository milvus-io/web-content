---
id: overview.md
title: Milvus Overview
sidebar_label: Milvus Overview
---

# Milvus 简介

## Milvus 是什么

Milvus 是一款开源的特征向量相似度搜索引擎，具有使用方便、实用可靠、易于扩展、稳定高效和搜索迅速等特点，在全球范围内被上百家组织和机构所采用。Milvus 已经被广泛应用于多个领域，其中包括图像处理、机器视觉、自然语言处理、语音识别、推荐系统以及新药发现等。

## 主要特性

- 全面的相似度指标
  
  Milvus 支持各种常用的相似度计算指标，包括欧氏距离、内积、汉明距离和杰卡德距离等。你可以根据应用需求来选择最有效的向量相似度计算方式。

- 业界领先的性能

  Milvus 基于高度优化的 Approximate Nearest Neighbor Search (ANNS) 索引库构建，包括 faiss、 annoy、和 hnswlib 等。你可以针对不同使用场景选择不同的索引类型。

- 动态数据管理
  
  你可以随时对数据进行插入、删除、搜索、更新等操作而无需受到静态数据带来的困扰。

- 近实时搜索
  
  在插入或更新数据之后，你可以几乎立刻对插入或更新过的数据进行搜索。Milvus 负责保证搜索结果的准确率和数据一致性。

- 高成本效益
  
  Milvus 充分利用现代处理器的并行计算能力，可以在单台通用服务器上完成对十亿级数据的毫秒级搜索。

- 支持多种数据类型和高级搜索（即将上线）
  
  Milvus 的数据记录中的字段支持多种数据类型。你还可以对一个或多个字段使用高级搜索，例如过滤、排序和聚合。

- 高扩展性和可靠性
  
  你可以在分布式环境中部署 Milvus。如果要对集群扩容或者增加可靠性，你只需增加节点。

- 云原生

  你可以轻松在公有云、私有云、或混合云上运行 Milvus。

- 简单易用

  Milvus 提供了易用的 Python、Java、Go 和 C++ SDK，另外还提供了 RESTful API。


## 整体架构

![Milvus 架构](../../../assets/milvus_arch.png)

## 接下来你可以

- 了解 [特征向量](vector.md), [向量数据库](vector_db.md) 的发展现状和 [向量检索算法](index_method.md)
- 几分钟轻易搞定 [Milvus 安装](../guides/get_started/install_milvus/install_milvus.md)
