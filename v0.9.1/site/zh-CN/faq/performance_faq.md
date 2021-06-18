---
id: performance_faq.md
title: 性能常见问题
sidebar_label: 性能常见问题
---

# 性能常见问题

<!-- TOC -->
- [为什么重启 Milvus 服务端之后，第一次搜索时间非常长？](#为什么重启-Milvus-服务端之后第一次搜索时间非常长)
- [为什么插入数据的速度很慢？](#为什么插入数据的速度很慢)
- [为什么搜索的速度很慢？](#为什么搜索的速度很慢)
- [为什么 GPU 一直空闲？](#为什么-GPU-一直空闲)
- [为什么我的数据插入后不可以马上被搜索到？](#为什么我的数据插入后不可以马上被搜索到)
<!-- /TOC -->

#### 为什么重启 Milvus 服务端之后，第一次搜索时间非常长？

你需要在 `server_config.yaml` 中开启 `preload_table`。在内存允许的情况下尽可能多地加载 collection。这样在每次重启服务端之后，数据都会先载入到 Milvus 中，可以解决第一次搜索耗时很长的问题。

#### 为什么插入数据的速度很慢？

- （如果 WAL 开启了）建议 `insert_buffer_size` 大于 `wal_buffer_size` 的一半 且插入数据量小于 `wal_buffer_size`的一半。
- （如果 WAL 没有开启）建议插入的数据量小于 `insert_buffer_size`。

#### 为什么搜索的速度很慢？

- 将`cpu_cache_capacity` 设置为用户能提供的最大内存数。
- 调整 `use_blas_threhold`（根据硬件环境调整）:
  - 如果当前批量查询的 nq 数（向量条数）小于 `use_blas_threhold`，可以尝试将 `use_blas_threhold` 调整为 `nq - 1`, 反之把 `use_blas_threhold` 调整为 `nq + 1`。
- 在创建 collection 时，`index_file_size` 参数应该尽量调大。

#### 为什么 GPU 一直空闲？

将 `gpu_search_threshold` 的值调整为你期望开启 GPU 搜索的批量查询的 nq 数（向量条数）。不建议在搜索量较小时使用 GPU 搜索。

#### 为什么我的数据插入后不可以马上被搜索到？

要确保数据插入后立刻能搜索到，可以手动调用 flush 接口。但是频繁调用 flush 接口可能会产生大量小数据文件，从而导致查询变慢。
