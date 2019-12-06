---
id: index
title: Index Types
sidebar_label: Index Types
---

# Index Types

Milvus supports the multiple types of indexes to suit various scenarios. The page introduces the description and main parameters that affects query performance or recall rate when using these indexes. The compatibility of the index with CPU or GPU supported Milvus is also demonstrated.

| Type                                       | Class name | Description                                                  | Affecting parameters                          | CPU-only Milvus    | GPU-enabled Milvus |
| ------------------------------------------ | ---------- | ------------------------------------------------------------ | --------------------------------------------- | ------------------ | ------------------ |
| Exact search                               | `FLAT`     | Provides 100% query recall rate. Compared to other indexes, `FLAT` is the most efficient indexing method when number of queries is small. | nq                                            | :heavy_check_mark: | :heavy_check_mark: |
| Inverted file with exact post-verification | `IVFFLAT`  | Vectors are partitioned into buckets without any quantization. This partition based multi-probing method is balanced between speed and accuracy. | nq, `nprobe`                                  | :heavy_check_mark: | :heavy_check_mark: |
| IVF and scalar quantizer                   | `IVFSQ8`   | Adopts a scalar quantizer to significantly reduce the size of a vector (by about 3/4). Compared to `FLAT` and `IVFFLAT`, query speed is much faster and requires less disk and CPU/GPU memory. | nq, `nprobe`, `nlist`                         | :heavy_check_mark: | :heavy_check_mark: |
| IVFSQ8 hybrid search on both CPU and GPU   | `IVFSQ8H`  | Optimized version of `IVFSQ8` that requires both CPU and GPU to work. Different from `IVFSQ8`,  `IVFSQ8H` uses a GPU-based coarse quantizer that greatly reduces the quantization time. | nq, `nprobe`, `gpu_search_threshold`, `nlist` | :x:                | :heavy_check_mark: |

To choose an appropriate index for your application scenarios, please read [How to select an index in Milvus](https://medium.com/@milvusio/how-to-choose-an-index-in-milvus-4f3d15259212).

