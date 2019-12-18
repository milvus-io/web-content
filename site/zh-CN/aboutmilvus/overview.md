---
id: overview
title: Milvus Overview
sidebar_label: Milvus Overview
---

# Milvus 简介

## Milvus 是什么

Milvus 是一款开源的、针对海量特征向量的相似性搜索引擎。基于异构众核计算框架设计，成本更低，性能更好。 在有限的计算资源下，十亿向量搜索仅毫秒响应。

## 主要特性

- 异构众核

  Milvus 使用异构众核计算处理特征向量，成本更低，性能更好。

- 多元化索引

  Milvus 支持多种索引方式，使用量化索引、基于树的索引和图索引等算法。
  
- 资源智能管理

  Milvus 根据实际数据规模和可利用资源，智能调节优化查询计算和索引构建过程。

- 水平扩容

  Milvus 支持在线 / 离线扩容，仅需执行简单命令，便可弹性伸缩计算节点和存储节点。

- 高可用性

  Milvus 集成了 Kubernetes 框架，能有效避免单点障碍情况的发生。

- 全面兼容

  Milvus 兼容大部分深度学习模型和主流程序语言，如 Java，Python 和C++等。

- 简单易用

  Milvus 安装简单，使用方便，您无需关注特征向量之外的信息。

- 图形化监控

  Milvus 支持使用基于 Prometheus 的图形化监控，方便您实时跟踪系统性能。

## 整体架构

![Milvus 架构](https://raw.githubusercontent.com/milvus-io/docs/master/assets/milvus_arch.png)

## 接下来您可以

- 了解 [特征向量](vector.md), [向量数据库](vector_db.md) 的发展现状和 [向量检索算法](index_method.md)
- 几分钟轻易搞定 [Milvus 安装](../userguide/install_milvus.md)
