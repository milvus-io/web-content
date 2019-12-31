---
id: index.md
title: Index Types
sidebar_label: Index Types
---

# Index Types

Milvus supports multiple types of indexes to suit various scenarios. The page introduces the description and main parameters that affects query performance or recall rate when using these indexes. The compatibility of the index with CPU or GPU supported Milvus is also demonstrated.

Some concepts used in this page are explained as follows:

- nq: number of queried vectors.
- `nlist`: total number of buckets generated. The feature space is partitioned into `nlist` buckets. 
- `nprobe`: number of buckets to search at query.
- `gpu_search_threshold`: The threshold value must be compared with nq to decide if the search computation will be executed on GPUs only. If nq >= `gpu_search_threshold`, the search computation will be executed on GPUs only. If nq < `gpu_search_threshold`, the search computation will be executed on both CPUs and GPUs.

<div class="table-wrapper" markdown="block">

| Type                                       | Class name | Description                                                  | Affecting parameters                          | CPU-only Milvus | GPU-enabled Milvus |
| ------------------------------------------ | ---------- | ------------------------------------------------------------ | --------------------------------------------- | --------------- | ------------------ |
| Exact search                               | `FLAT`     | <p style="width: 360px">Provides 100% query recall rate. Compared to other indexes, `FLAT` is the most efficient indexing method when number of queries is small.</p> | nq                                            | ✔️               | ✔️                  |
| Inverted file with exact post-verification | `IVFFLAT`  | <p style="width: 360px">Vectors are partitioned into buckets without any quantization. This partition based multi-probing method is balanced between speed and accuracy.</p> | nq, `nprobe`                                  | ✔️               | ✔️                  |
| IVF and scalar quantizer                   | `IVFSQ8`   | <p style="width: 360px">Adopts a scalar quantizer to significantly reduce the size of a vector (by about 3/4). Compared to `FLAT` and `IVFFLAT`, query speed is much faster and requires less disk and CPU/GPU memory.</p> | nq, `nprobe`, `nlist`                         | ✔️               | ✔️                  |
| IVFSQ8 hybrid search on both CPU and GPU   | `IVFSQ8H`  | <p style="width: 360px">Optimized version of `IVFSQ8` that requires both CPU and GPU to work. Different from `IVFSQ8`,  `IVFSQ8H` uses a GPU-based coarse quantizer that greatly reduces the quantization time.</p> | nq, `nprobe`, `gpu_search_threshold`, `nlist` | ❌               | ✔️                  |
</div>

To choose an appropriate index for your application scenarios, please read [How to select an index in Milvus](https://medium.com/@milvusio/how-to-choose-an-index-in-milvus-4f3d15259212).

## Known issues

### `IVFSQ8H`

When using `IVFSQ8H` index, the concurrent execution of index building and querying on the GPU may lead to server down. 


