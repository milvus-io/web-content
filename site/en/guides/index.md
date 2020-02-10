---
id: index.md
title: Index Types
sidebar_label: Index Types
---

# Milvus Indexes

Milvus supports multiple types of indexes to suit various scenarios. The page introduces the description and main parameters that affects query performance or recall rate when using these indexes. The compatibility of the index with CPU or GPU supported Milvus is also demonstrated.

## Basic concepts

The following concepts are provided to help you better understand Milvus index types and what parameters affect their performance.

- `top_k`: top k vectors with the highest similarity compared to the query vectors.

- nq: number of queried vectors.

- `nlist`: total number of buckets generated. The feature space is partitioned into `nlist` buckets. 

- `nprobe`: number of buckets to search at query.

- `gpu_search_threshold`: The threshold value must be compared with nq to decide if the search computation will be executed on GPUs only. If nq >= `gpu_search_threshold`, the search computation will be executed on GPUs only. If nq < `gpu_search_threshold`, the search computation will be executed on both CPUs and GPUs.

- vector encodings

  The available vector encodings in Milvus are as follows: (from least to strongest compression)

  - No compression at all (`FLAT` and `IVFLAT`)
  - 8-bit float encoding: the vectors are quantized to 8-bit floats, which may cause some loss of precision. (`IVF_SQ8` and `IVF_SQ8H`)
  - PQ encoding: vectors are split into sub-vectors that are each quantized to 8 bits. (`IVF_PQ`)

## Index Overview

<div class="table-wrapper" markdown="block">

| Type                                               | Class name | Parameters affecting performance | CPU-only Milvus  | GPU-enabled Milvus |
| -------------------------------------------------- | ---------- | --------------------------------------------- | ---------------- | ------------------ |
| Exact search                                       | `FLAT`     | `top_k`, nq                                   | ✔️               | ✔️                  |
| Inverted file with exact post-verification         | `IVFLAT`   | `top_k`, nq, `nprobe`, `gpu_search_threshold` | ✔️               | ✔️                  |
| IVF and scalar quantizer                           | `IVF_SQ8`  | `top_k`, nq, `nprobe`, `nlist`, `gpu_search_threshold`  | ✔️               | ✔️                  |
| IVFSQ8 hybrid search on both CPU and GPU           | `IVF_SQ8H` | `top_k`, nq, `nprobe`, `nlist`, `gpu_search_threshold`  | ❌               | ✔️                  |
| Inverted file with product quantization refinement | `IVF_PQ`   | `top_k`, nq, `nprobe`, `nlist`                          | ✔️               | ❌                  |
| Refined Navigating Spreading-out Graph             | `RNSG`     | `top_k`, nq                                             | ✔️               | ✔️                  |
| Hierarchical Navigable Small World Graphs             | `HNSW`     | `top_k`, nq                                             | ✔️               | ✔️                  |
</div>

To choose an appropriate index for your application scenarios, please read [How to select an index in Milvus](https://medium.com/@milvusio/how-to-choose-an-index-in-milvus-4f3d15259212).

## Milvus Indexes

### `FLAT`

If `FLAT` index is used, the vectors are stored in an array of float/binary data without any compression. At search time, all indexed vectors are decoded sequentially and compared to the query vectors.

`FLAT` index provides 100% query recall rate. Compared to other indexes, it is the most efficient indexing method when number of queries is small.

### `IVFLAT`

Vectors are partitioned into buckets without any compression. This partition based multi-probing method is balanced between speed and accuracy.

### `IVF_SQ8`

Adopts a scalar quantizer to significantly reduce the size of a vector (to about 1/4 of the original size). Compared to `FLAT` and `IVFFLAT`, query speed is much faster and requires less disk and CPU/GPU memory.

Vectors are quantized to 8-bit floats, which may cause some loss of precision.

### `IVF_SQ8H`

Optimized version of `IVF_SQ8` that requires both CPU and GPU to work. Different from `IVF_SQ8`,  `IVF_SQ8H` uses a GPU-based coarse quantizer that greatly reduces the quantization time.

### `IVF_PQ`

`IVF_PQ` index is built based on product quantization. The input vectors are split into distinct sub-vectors which are then quantized separately. 

Vector size can be reduced to 1/16 or 1/32 of the original size. If you choose this index, note that there is an inevitable trade-off between memory and search accuracy.

Only 1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32 dimensions per sub-quantizer are currently supported. The supported sub-quantizer number are 1, 2, 3, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 96.

`IVF_PQ` is probably is most suitable index for large-scale, high-dimensional vector search.

### `RNSG`

`RNSG` is a self-developed index that makes various optimizations based on `NSG` index. `NSG`  is a graph-based search algorithm that a) lowers the average out-degree of the graph for fast traversal; b) shortens the search path; c) reduces the index size; d) lowers the indexing complexity.

Compared to `NSG` which searches query vectors one by one, `RNSG` supports concurrent searches of multiple query vectors.

### `HNSW`

`HNSW` is built based on hierarchical navigable small world graphs, which is a graph-based structure that incrementally builds a multi layer structure and separates links by distance scales. Logarithmic scaling complexity makes it quite efficient for high-dimensional data.

Compared with `RNSG`, `HNSW` has better memory and time efficiency. `HNSW` also supports incremental indexing, which is missing in `RNSG`. However, memory requirement of `HNSW` is greater than `RNSG`.  

## Choosing an index

To choose an appropriate index for your application scenarios, please read [How to select an index in Milvus](https://medium.com/@milvusio/how-to-choose-an-index-in-milvus-4f3d15259212).


