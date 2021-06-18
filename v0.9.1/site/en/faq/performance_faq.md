---
id: performance_faq.md
title: Performance FAQ
sidebar_label: Performance FAQ
---

# Performance FAQ

<!-- TOC -->
- [Why the first search operations takes a long time after restarting Milvus?](#Why-the-first-search-operations-takes-a-long-time-after-restarting-Milvus)
- [Why it is slow to insert data?](#Why-it-is-slow-to-insert-data)
- [Why the search speed is low?](#Why-the-search-speed-is-low)
- [Why is my GPU always idle?](#Why-is-my-GPU-always-idle)
- [Why my data cannot be searched immediately after insertion?](#Why-my-data-cannot-be-searched-immediately-after-insertion)
<!-- /TOC -->

#### Why the first search operations takes a long time after restarting Milvus?

You can load as many collections as the memory permits in `preload_table` from `server_config.yaml`. Thus, after restarting Milvus, data will be loaded to Milvus first. In this way, data will be loaded to Milvus first every time Milvus restarts.

#### Why it is slow to insert data?

- **(If WAL is on)** It is recommended that you set `insert_buffer_size` greater than half of `wal_buffer_size` and the inserted data size less than half of `wal_buffer_size`.
- **(If WAL is not on)** It is recommended that you set the inserted data size smaller than `insert_buffer_size`.

#### Why the search speed is low?

- Set `cpu_cache_capacity` to the largest memory size you can provide.
- Adjust the value of `use_blas_threhold` based on the hardware environment.
  - If the number of nq (number of vectors to search) is smaller than `use_blas_threhold`, you can try changing `use_blas_threhold` to `nq - 1`. Conversely, you can change `use_blas_threhold` to `nq + 1`.
- When creating a collection, the value of `index_file_size` should be as large as possible.

#### Why is my GPU always idle?

Change the value of `gpu_search_threshold` to the value of nq (number of vectors to search) above which Milvus uses GPU to search. when the number of vectors to search is small, GPU search is not recommended.

#### Why my data cannot be searched immediately after insertion?

To ensure that data can be searched immediately after insertion, you can manually invoke the flush interface. However, invoking the flush interface too often will create too many small files, which negatively affects search speed.
