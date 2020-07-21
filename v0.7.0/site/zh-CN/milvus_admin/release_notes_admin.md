---
id: release_notes_admin.md
title: Milvus Admin 发版说明
sidebar_label: Milvus Admin 发版说明
---

# Milvus Admin 发版说明

Milvus Admin 是 Milvus 的图形化客户端。您可以通过 Milvus Admin 对 Milvus 服务端进行操作。

## v0.1.0

**发布时间**：2020-3-14

**版本兼容**

| Milvus 版本    | Milvus Admin 版本  |
| ---------------| -----------------|
| 0.7.0          | 0.1.0           |

**主要功能**

- 支持对向量数据的插入、删除、查询、读取等操作。
- 支持以下索引类型：FLAT、IVFLAT、IVF_SQ8、IVF_SQ8H、IVF_PQ、HNSW。
- 支持以下向量距离度量方式：欧氏距离（L2）、内积（IP）、汉明距离（Hamming）、谷本距离（Tanimoto）、杰卡德（Jaccard）距离。
- 支持对 Milvus 服务端配置文件（`server_config.yaml`）进行运行时修改。部分参数修改后即时生效，无需重启 Milvus。