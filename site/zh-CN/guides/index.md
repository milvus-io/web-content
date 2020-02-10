---
id: index.md
title: Index Types
sidebar_label: Index Types
---

# Milvus 索引类型

Milvus 支持多种索引类型。本页面主要介绍这些索引类型的定义，和影响搜索速度和召回率的主要参数，以及这些索引类型是否可以用在仅支持 CPU 和支持 GPU 的 Milvus 中。

## 基本概念

本页面用到的一些概念解释如下，主要帮助您更好地理解 Milvus 索引类型以及影响其性能的主要参数。

- `top_k`：与目标向量最相似的 k 条向量，在搜索时定义。
- nq：查询的目标向量条目数，在搜索时定义。
- `nlist`: 聚类时总的分桶数，在创建索引时定义。特征空间被聚类为 `nlist` 个桶。
- `nprobe`: 查询时需要搜索的分桶数目，在搜索时定义。
- `gpu_search_threshold`: Milvus 性能调优参数。此参数必须与 nq 比较以确定搜索计算是否只在 GPU 上进行。如果 nq >= `gpu_search_threshold`，则搜索计算只在 GPU 上进行。如果 nq < `gpu_search_threshold`，则搜索计算将在 CPU 和 GPU 上协同进行。

## 索引概览

<div class="table-wrapper" markdown="block">

| 类型                      | Class name | 性能影响参数                                  | 仅支持 CPU 的 Milvus | 支持GPU的Milvus |
| ------------------------- | ---------- | --------------------------------------------- | -------------------- | --------------- |
| 精确搜索                  | `FLAT`     | `top_k`, nq                                    | ✔️                    | ✔️               |
| 倒排索引                  | `IVFLAT`   | `top_k`, nq, `nprobe`, `gpu_search_threshold`          | ✔️            | ✔️               |
| 倒排+标准量化索引         | `IVF_SQ8`  | `top_k`, nq, `nprobe`, `nlist`, `gpu_search_threshold`  | ✔️            | ✔️               |
| 倒排+标准量化索引混合模式 | `IVF_SQ8H` | `top_k`, nq, `nprobe`, `nlist`, `gpu_search_threshold`  | ❌             | ✔️               |
| 倒排+乘积量化索引         | `IVF_PQ`   | `top_k`, nq, `nprobe`, `nlist`                         | ✔️             | ❌               |
| NSG 加强版                 | `RNSG`     | `top_k`, nq                                           | ✔️            | ✔️               |
| HNSW | `HNSW`     | `top_k`, nq   | ✔️               | ✔️                  |
</div>

## Milvus 索引

### `FLAT`

如果使用 `FLAT` 索引，向量会以浮点/二进制的方式存储，不做任何压缩处理。搜索时，所有的向量会依次解码并于要搜索的目标向量对比计算距离。

`FLAT` 提供100%的检索召回率。相比其它索引方式，在搜索量不大的情况下速度最快。

### `IVFLAT`

在聚类时，向量被直接添加到各个分桶中，不做任何压缩。这种基于聚类，多簇搜索的方式搜索速度和准确性都不错。

### `IVF_SQ8`

运用 scalar quantizer 的向量索引，能大幅缩小向量体积（大概缩减到原来的1/4）。相比 `FLAT` 和 `IVFFLAT`，搜索速度更快，而且磁盘，内存显存等资源占用小。

向量被量化为 8 字节的浮点数，可能造成搜索精度的损失。

### `IVF_SQ8H`

基于 `IVF_SQ8` 做了深层优化，但需要 CPU 和 GPU 都在的情况下才能使用。不同于 `IVF_SQ8`，`IVF_SQ8H` 使用基于 GPU 的 coarse quantizer，能极大减少标准量化时间，提高查询速度。

### `IVF_PQ`

基于乘积量化的索引类型，意思是将原来的向量空间分解为若干个低维向量空间的笛卡尔积，然后对分解得到的低维向量空间分别做量化。

向量大小可以缩减至原来大小的1/16甚至1/32。该索引方式适用于低内存环境下的大规模向量搜索，但搜索精度会有损失，需注意权衡。

目前每个 sub-quantizer 仅支持 1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32 维。sub-quantizer 总数量仅支持 1, 2, 3, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 96。

### `RNSG`

`RNSG` 是 Milvus 自研的一种索引方式，基于 `NSG` 索引做了各种优化。`NSG` 是一种基于图的索引算法，它可以 a) 降低图的平均出度；b) 缩短搜索路径；c) 缩减索引大小；d) 降低索引复杂度。

不同于 `NSG` 单个搜索的方式，`RNSG` 支持多个目标向量的并发搜索。

### `HNSW`

`HNSW` 索引基于 HNSW 构建。HNSW (Hierarchical Small World Graph) 是一种基于图的索引算法，可以增量建立多层结构并且将边根据特征距离半径进行分层。由于计算复杂度是对数，HNSW 对于高维数据非常高效。

与 `RNSG` 相比， `HNSW` 的运行效率和内存使用效率更高。`HNSW` 支持增量建立索引，而 `RNSG` 则不支持。但是，因为图需要加载到内存中，`HNSW` 的内存需求要大于 `RNSG`。

## 如何选择索引

若要为您的使用场景选择合适的索引，请参阅 [如何选择索引类型](https://milvus.io/cn/blogs/2019-12-03-select-index.md)。


