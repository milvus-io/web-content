---
id: index.md
title: Index Types
sidebar_label: Index Types
---

# 索引类型 

Milvus 支持多种索引类型。本页面主要介绍这些索引类型的定义，和影响搜索速度和召回率的主要参数，以及这些索引类型是否可以用在仅支持 CPU 和支持 GPU 的 Milvus 中。

本页面用到的一些概念解释如下：

- nq：查询的目标向量条目数，在搜索时定义。
- `nlist`: 聚类时总的分桶数，在创建索引时定义。特征空间被聚类为 `nlist` 个桶。
- `nprobe`: 查询时需要搜索的分桶数目，在搜索时定义。
- `gpu_search_threshold`: Milvus 性能调优参数。此参数必须与 nq 比较以确定搜索计算是否只在 GPU 上进行。如果 nq >= `gpu_search_threshold`，则搜索计算只在 GPU 上进行。如果 nq < `gpu_search_threshold`，则搜索计算将在 CPU 和 GPU 上协同进行。

<div class="table-wrapper" markdown="block">

| 类型                      | Class name | 描述                                                         | 主要影响参数                                  | 仅支持 CPU 的 Milvus | 支持GPU的Milvus |
| ------------------------- | ---------- | ------------------------------------------------------------ | --------------------------------------------- | -------------------- | --------------- |
| 精确搜索                  | `FLAT`     | <p style="width: 360px">提供100%的检索召回率。相比其它索引方式，在搜索量不大的情况下速度最快。</p> | nq                                            | ✔️                    | ✔️               |
| 倒排索引                  | `IVFFLAT`  | <p style="width: 360px">在聚类时，向量被直接添加到各个分桶中，不做任何压缩。这种基于聚类，多簇搜索的方式搜索速度和准确性都不错。</p> | nq, `nprobe`                                  | ✔️                    | ✔️               |
| 倒排+标准量化索引         | `IVFSQ8`   | <p style="width: 360px">运用 scalar quantizer 的向量索引，能大幅缩小向量体积（大概缩减到原来的1/4）。相比 `FLAT` 和 `IVFFLAT`，搜索速度更快，而且磁盘，内存显存等资源占用小。</p> | nq, `nprobe`, `nlist`                         | ✔️                    | ✔️               |
| 倒排+标准量化索引混合模式 | `IVFSQ8H`  | <p style="width: 360px">基于 `IVFSQ8` 做了深层优化，但需要 CPU 和 GPU 都在的情况下才能使用。不同于 `IVFSQ8`，`IVFSQ8H` 使用基于 GPU 的 coarse quantizer，能极大减少标准量化时间，提高查询速度。</p> | nq, `nprobe`, `gpu_search_threshold`, `nlist` | ❌                    | ✔️               |
</div>

若要为您的使用场景选择合适的索引，请参阅 [如何选择索引类型](https://milvus.io/cn/blogs/2019-12-03-select-index.md)。

## 已知问题

### `IVFSQ8H`

使用 `IVFSQ8H` 索引时，如果创建索引和查询同时在 GPU 上进行可能会导致系统崩溃。
