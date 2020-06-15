---
id: release_notes_admin.md
title: Milvus Admin 发版说明
sidebar_label: Milvus Admin 发版说明
---

# Milvus Admin 发版说明

Milvus Admin 是 Milvus 的图形化客户端。你可以通过 Milvus Admin 对 Milvus 服务端进行操作。

## v0.3.0

**发布时间**：2020-5-15

**版本兼容**

| Milvus Version    | Milvus Admin Version  |
| ---------------| -----------------|
| 0.9.0          | 0.3.0           |


**主要功能**

- 一些界面设计修改，优化用户体验。
- 在浏览器标签显示当前连接的 Milvus 地址。
- 在页面显示当前链接的 Milvus 版本号。
- 兼容 Milvus 0.9.0 相关 API 修改。
- 支持在界面修改参数 `auto_flush_interval` ( `Advanced Setting` > `PERFORMANCE TUNNING` > `Auto Flush Interval`)。

## v0.2.0

**发布时间**：2020-4-17

**版本兼容**

| Milvus Version    | Milvus Admin Version  |
| ---------------| -----------------|
| 0.8.0          | 0.2.0           |

**Bug修复**

- 修复向量数在插入向量后不更新的问题. #1853.
- Milvus本身并不支持https，如果你在milvus之前放置https的代理，在milvus admin中，新增登录时输入https前缀来访问https的milvus.
- 在分区面板中支持显示segments信息.
- 支持milvus0.8.0 所支持的索引和距离.

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
