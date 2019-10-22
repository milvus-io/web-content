---
id: data_store
title: Data Storage
sidebar_label: Data Storage
---

# 数据存储

## 向量数据存储

每次新导入 Milvus 的向量数据都会自动存储在2个地方：您本地的磁盘和 [MinIO私有云](https://min.io/product/multi-cloud-gateway#multi-cloud-gateway). 

将数据备份在云端可以保证数据检索时数据时完整且可以方便获取的。

## 元数据存储

Milvus 中的元数据提供关于向量数据的各种信息，比如有几张表、每张表存储在何处等。根据您是使用单机部署还是分布式部署，您可以选择以下数据库存储元数据。

| 数据库   | Milvus部署方式 |
| -------- | -------------- |
| SQLite 3 | 单机部署       |
| MySQL    | 分布式部署     |

## 相关阅读
[导入数据](../userguide/import_data.md)

