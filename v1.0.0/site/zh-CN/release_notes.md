---
id: release_notes.md
---

# 发版说明

## v1.0.0

**发布时间**：2021-03-09

#### 版本兼容

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| :------------- | :----------------- | :--------------- | :------------- |
| 1.0.0         | 1.0.x             | 1.0.x            | 1.0.x          |

#### 新增功能

- 支持将日志写入 stdout。[#3977](https://github.com/milvus-io/milvus/issues/3977)

#### 主要改进

- 减小了 C++ SDK 使用的 grpc-milvus 的包体积。[#4754](https://github.com/milvus-io/milvus/issues/4754)

#### 问题修复

- 修复了建索引或查询操作时产生的内存泄漏问题。[#4749](https://github.com/milvus-io/milvus/issues/4749)、[#4757](https://github.com/milvus-io/milvus/issues/4757)、[#4765](https://github.com/milvus-io/milvus/issues/4765)、[#4766](https://github.com/milvus-io/milvus/issues/4766)

> - 更多有关新增功能的信息，详见 [Milvus 1.0 新增功能](https://zilliz.com/blog/Whats-Inside-Milvus-1.0)。
> - 关于产品路线图，详见 [Milvus 1.0 产品路线图](https://zilliz.com/blog/milvus-1-0-the-worlds-most-popular-open-source-vector-database-just-got-better)。
