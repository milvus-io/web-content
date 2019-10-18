---
id: overview
title: Milvus Overview
sidebar_label: Milvus Overview
---

# Milvus 简介

## Milvus 是什么

Milvus 是一款分布式特征向量检索引擎，旨在帮助用户实现十亿级特征向量的近似检索和分析。

## 主要特性

- GPU 加速搜索系统

  Milvus 使用 CPU/GPU 异构众核计算处理特征向量，在查询速度上可超出传统数据库几个数量级。

- 多种索引

  Milvus 支持量化索引，基于树的索引和图索引等算法。
  
- 智能调度

  Milvus 根据数据规模和可用资源智能优化查询计算和索引构建。

- 水平伸缩

  Milvus 可以在运行时弹性伸缩计算节点和存储节点。您可以任意伸缩数据规模而无需重新设计系统。

- 高可用

  分布式集群架构能在少数节点故障时提供持续的服务能力。

- 全面兼容

  兼容主流人工智能模型和程序语言。

- 简单易用

  Milvus 安装简单，使用方便。您无需关注特征向量之外的信息。特征向量检索前不需要预处理。

- 可视化性能监控

  您可以使用基于 Prometheus 的图形化监控仪表盘实时跟踪系统性能。

## 整体架构

![Milvus 架构](assets/milvus_arch.png)

## 接下来您可以

- 了解 [特征向量](vector.md), [向量数据库](vector_db.md) 的发展现状和 [向量检索算法](index_method.md)
- 通过 [Milvus 快速入门](../QuickStart.md) 尝试第一次向量查询
- 几分钟轻易搞定 [Milvus 安装](../userguide/install_milvus.md)
