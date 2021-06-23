---
id: performance_faq.md
title: 性能常见问题
sidebar_label: 性能常见问题
---

# 性能常见问题

<!-- TOC -->

<!-- /TOC -->

#### 如何设置 IVF 索引的 `nlist` 和 `nprobe` 参数？

IVF 索引的 `nlist` 值应根据具体使用情况设置。一般来说，建议值为 `4 × sqrt(n)`，其中 `n` 指 segment 最多包含的 entity 条数。

每个 segment 的大小由参数 `dataservice.segment.size` 决定，默认为 512 MB。Segment 内的 entity 条数可通过将 dataservice.segment.size 除以每条 entity 的大小估算得出。

`nprobe` 值的选取需要根据数据总量和实际场景在查询性能和准确率之间进行取舍。建议通过多次实验确定合理取值。

以下是使用公开测试数据集 sift50m 针对 `nlist` 和 `nprobe` 的一个测试。以索引类型 IVF_SQ8 为例，测试对比了不同 `nlist`/`nprobe` 组合的搜索时间和召回率。

![accuracy_nlist_nprobe.png](../../../assets/accuracy_nlist_nprobe.png)

测试显示，召回率与 `nlist`/`nprobe` 值呈正相关。

![performance_nlist_nprobe.png](../../../assets/performance_nlist_nprobe.png)

 

#### 为什么有时小数据集查询时间反而更长？

查询操作在 segment 上进行，有索引时查询性能更高。如果 segment 尚未构建索引，Milvus 将对原始数据进行暴力搜索，大大增加查询时长。

因此，当小数据集（collection）尚未创建索引时，就有可能出现查询时间更长的情况。这是因为其 segment 的大小没有达到 `master.minSegmentSizeToEnableIndex` 所设定的索引构建阈值。调用 `create_index()` 方法可对已达到该阈值但没有构建索引的 segment 强制构建索引以加快查询速度。

 

 

#### CPU 利用率受哪些因素的影响？

Milvus 构建索引和执行查询操作时，CPU 利用率提高。一般来说，除了 ANNOY 索引是单线程运行之外，索引构建都会占用大量 CPU 资源。

向量查询时， CPU 利用率受参数 `nq` 和 `nprobe` 影响，当 `nq` 和 `nprobe` 都较小时，程序并发度较小，故 CPU 利用率不高。

 

 

 

#### 边插入边搜索会影响搜索性能吗？

数据插入本身并不是一个 CPU 密集型操作，但是由于新插入的数据所在 segment 的大小可能还未达到自动创建索引的阈值，在查询时只能对其采用暴搜的方式，查询性能就会降低。

 参数 `dataservice.segment.size` 决定了 segment 自动构建索引的阈值，默认值为 512 MB。

#### 仍有问题没有得到解答？

如果仍有其他问题，你可以：

- 访问我们的 [GitHub 主页](https://github.com/milvus-io/milvus/issues)，与我们分享你的问题和想法，或帮助其他用户。
- 加入我们的 [Slack 社区](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk)，参与开源社区的讨论交流。
