---
id: overview
title: Milvus Overview
sidebar_label: Milvus Overview
---

# Milvus 简介

## Milvus 是什么

Milvus 是 ZILLIZ 公司设计的分布式特征向量检索数据库，旨在帮助用户实现海量非结构化数据的近似检索和分析。

## 主要特性

- GPU 加速搜索系统

  Milvus 针对大规模向量数据索引而设计。CPU/GPU 异构众核计算让您的数据处理速度提高1000倍以上。

- 智能索引

  拥有“用户自定义算法”功能。您可以轻松在 Milvus 上使用顶尖的机器学习相关算法技术，不用担心复杂数据在不同系统间的转换和迁移。Milvus 基于量化索引，基于树的索引和图索引等算法，提供了更加优化的算法功能，您可以根据业务需要自由选择。

- 弹性伸缩

  计算与存储分离的架构，让您根据业务扩展情况，弹性伸缩计算节点和存储节点。

- 高可用

  分布式集群架构能在少数节点故障时提供持续的服务能力。

- 全面兼容

  兼容各种人工智能训练模型，和主流开发语言。

- 简单好用

  使用 Milvus，你只需关注向量数据，而不用操心系统管理。向量检索前数据无需特殊处理。

  安装简单，几分钟便可轻松搞定。基于 Prometheus 的图形化监控仪表盘可以实时跟踪系统表现。

## 整体架构

！[Milvus 架构](assets/milvus_arch.png)

## 接下来您可以

- 了解 [特征向量](vector.md), [向量数据库](vector_db.md) 的发展现状和 [向量检索算法](index_method.md)
- 通过 [Milvus 快速入门](../QuickStart.md) 尝试第一次向量查询
- 几分钟轻易搞定 [Milvus 安装](../userguide/install_milvus.md)
