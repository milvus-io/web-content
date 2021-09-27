---
id: release_notes.md
---
# 发版说明

## v1.1.1

**发布时间**：2021-06-18

#### 版本兼容

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| :------------- | :----------------- | :--------------- | :------------- |
| 1.1.1         | 1.1.0             | 1.1.0            | 1.1.0          |

#### 新增功能

- [#1434](https://github.com/milvus-io/milvus/issues/1434) 支持 S3 存储（由紫光华智实现）。
- [#5142](https://github.com/milvus-io/milvus/issues/5142) 支持在显存中缓存索引。

#### 问题修复

- [#4897](https://github.com/milvus-io/milvus/issues/4897) 已删除 entity 在后继查询中仍然能被查到。
- [#5164](https://github.com/milvus-io/milvus/issues/5164) 在不存在的 partition 上插入或删除 entity 未引发异常报错。
- [#5191](https://github.com/milvus-io/milvus/issues/5191) 一段时间内连续执行多次插入和查询操作后，Mishards 会返回 `index out of range` 错误。
- [#5398](https://github.com/milvus-io/milvus/issues/5398) 系统执行请求后不定时崩溃。
- [#5537](https://github.com/milvus-io/milvus/issues/5537) 电源突然关闭后重启无法加载布隆过滤器。
- [#5574](https://github.com/milvus-io/milvus/issues/5574) 不能在多个 GPU 上同时构建 IVF_SQ8 和 IVF_PQ 索引。
- [#5747](https://github.com/milvus-io/milvus/issues/5747) 查询时 `nq` 或 `TopK` 乘积过大会导致 Milvus 停止响应。

#### 主要改进

- [#5115](https://github.com/milvus-io/milvus/issues/5115) 将使用 CPU 查询的 `TopK` 上限从 16384 提高至 1048576。
- [#5204](https://github.com/milvus-io/milvus/issues/5204) 在未删除任何 entity 的情况下，优化了 IVF 索引在 GPU 版 Milvus 上的查询性能。
- [#5544](https://github.com/milvus-io/milvus/issues/5544) 将 `index_file_size` 上限提高至 128 GB。

## v1.1.0

**发布时间**：2021-05-07

#### 版本兼容

| Milvus 版本 | Python SDK 版本 | Java SDK 版本 | Go SDK 版本 |
| :------------- | :----------------- | :--------------- | :------------- |
| 1.1.0         | 1.1.0             | 1.1.0            | 1.1.0          |

#### 新增功能

- [#4564](https://github.com/milvus-io/milvus/issues/4564) 支持在调用 `get_entity_by_id()` 方法时指定分区。
- [#4806](https://github.com/milvus-io/milvus/issues/4806) 支持在调用 `delete_entity_by_id()` 方法时指定分区。
- [#4905](https://github.com/milvus-io/milvus/issues/4905) 添加 `release_collection()` 方法以从缓存中卸载集合。

#### 主要改进

- [#4756](https://github.com/milvus-io/milvus/issues/4756) 优化了 `get_entity_by_id()` 方法调用的性能。
- [#4856](https://github.com/milvus-io/milvus/issues/4856) 将 hnswlib 升级至 v0.5.0。
- [#4958](https://github.com/milvus-io/milvus/issues/4958) 优化了 IVF 索引训练的性能。

#### 问题修复

- [#4778](https://github.com/milvus-io/milvus/issues/4778) Mishards 中无法读取向量索引。
- [#4797](https://github.com/milvus-io/milvus/issues/4797) 合并不同 `topK` 查询返回结果错误。
- [#4838](https://github.com/milvus-io/milvus/issues/4838) 在空白集合中构建索引时，服务器未立即响应。
- [#4858](https://github.com/milvus-io/milvus/issues/4858) 在 GPU 版 Milvus 上执行大于 2048 的 `topK` 查询请求时系统崩溃退出。
- [#4862](https://github.com/milvus-io/milvus/issues/4862) 只读节点在启动时合并数据段。
- [#4894](https://github.com/milvus-io/milvus/issues/4894) 布隆过滤器的容量与所在数据段的行数不一致。
- [#4908](https://github.com/milvus-io/milvus/issues/4908) 删除集合后未清除 GPU 缓存。
- [#4933](https://github.com/milvus-io/milvus/issues/4933) Milvus 为小数据段建索引耗时长。
- [#4952](https://github.com/milvus-io/milvus/issues/4952) 无法设置时区为 ”UTC + 5:30”。
- [#5008](https://github.com/milvus-io/milvus/issues/5008) 连续同时执行删除、插入和搜索操作时，Milvus 不定时崩溃退出。
- [#5010](https://github.com/milvus-io/milvus/issues/5010) `nbits` 不等于 8 时，IVF_PQ 无法在 GPU 版 Milvus 上查询。
- [#5050](https://github.com/milvus-io/milvus/issues/5050) 对于未完成索引构建的数据段，`get_collection_stats()` 返回错误的索引类型。
- [#5063](https://github.com/milvus-io/milvus/issues/5063) 空白数据落盘导致 Milvus 崩溃退出。
- [#5078](https://github.com/milvus-io/milvus/issues/5078) 在 GPU 版 Milvus 上为 2048、4096 或 8192 维向量构建 IVF 索引时系统崩溃。

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

