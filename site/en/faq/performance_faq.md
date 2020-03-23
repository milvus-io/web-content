---
id: performance_faq.md
title: Performance FAQs
sidebar_label: Performance FAQs
---

# Performance FAQs

#### Why the first search operations takes a long time after restarting Milvus?

You can load as many collections as the memory permits in `preload_table` from `server_config.yaml`. Thus, after restarting Milvus, data will be loaded to Milvus first. In this way, data will be loaded to Milvus first every time Milvus restarts.

#### Why it is slow to insert data?

- **(If WAL is on)** It is recommended that you set `insert_buffer_size` greater than half of `wal_buffer_size` and the inserted data size less than half of `wal_buffer_size`.
- **(If WAL is not on)** It is recommended that you set the inserted data size smaller than `insert_buffer_size`.

#### Why the search speed is low?

- 将`cpu_cache_capacity` 设置为用户能提供的最大内存数。
- 调整 `use_blas_threhold`（根据硬件环境调整）:
  - 如果当前批量查询的 nq 数（向量条数）小于 `use_blas_threhold`，可以尝试将 `use_blas_threhold` 调整为 `nq - 1`, 反之把 `use_blas_threhold` 调整为 `nq + 1`。
- 在创建 collection 时，`index_file_size` 参数应该尽量调大。

#### Why is my GPU always idle?

将 `gpu_search_threshold` 的值调整为您期望开启 GPU 搜索的批量查询的 nq 数（向量条数）。不建议在搜索量较小时使用 GPU 搜索。

#### Why my data cannot be searched immediately after insertion?

要确保数据插入后立刻能搜索到，可以手动调用 flush 接口。但是频繁调用 flush 接口可能会产生大量小数据文件，从而导致查询变慢。
