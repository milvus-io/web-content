---
id: index.md
title: Index Types
sidebar_label: Index Types
---

# Milvus Indexes

## Index Overview

> Note: For indexes supporting both CPU search and GPU search, you can create or search them using different devices, either CPU or GPU. For example, you can create an index using CPU and conduct a vector search using GPU. 

### Index types in CPU-only Milvus

<div class="table-wrapper" markdown="block">

| Name       | Index building with CPU | Search with CPU | Float vector support | Binary vector support |
| ---------- | ----------------------- | --------------- | -------------------- | --------------------- |
| `FLAT`     | ✔️                      | ✔️              | ✔️                   | ✔️                    |
| `IVFLAT`   | ✔️                      | ✔️              | ✔️                   | ✔️                    |
| `IVF_SQ8`  | ✔️                      | ✔️              | ✔️                   | ❌                    |
| `IVF_SQ8H` | ❌                      | ❌              | ✔️                   | ❌                    |
| `IVF_PQ`   | ✔️                      | ✔️              | ✔️                   | ❌                    |
| `RNSG`     | ✔️                      | ✔️              | ✔️                   | ❌                    |
| `HNSW`     | ✔️                      | ✔️              | ✔️                   | ❌                    |
| `ANNOY`    | ✔️                      | ✔️              | ✔️                   | ❌                    |

</div>

### Index types in Milvus with GPU support

<div class="table-wrapper" markdown="block">

| Name       | Index building with CPU | Search with CPU | Search with GPU                                                  | Search with GPU                                          | Float vector support | Binary vector support |
| ---------- | ----------------------- | --------------- | ---------------------------------------------------------------- | -------------------------------------------------------- | -------------------- | --------------------- |
| `FLAT`     | ✔️                      | ✔️              | ✔️ (Does not support GPU index building for binary vectors)      | ✔️ (Does not support GPU search for binary vectors)      | ✔️                   | ✔️                    |
| `IVFLAT`   | ✔️                      | ✔️              | ✔️ (Does not support GPU index building for binary vectors)      | ✔️ (Does not support GPU search for binary vectors)      | ✔️                   | ✔️                    |
| `IVF_SQ8`  | ✔️                      | ✔️              | ✔️                                                               | ✔️                                                       | ✔️                   | ❌                    |
| `IVF_SQ8H` | ✔️                      | ✔️              | ✔️                                                               | ✔️                                                       | ✔️                   | ❌                    |
| `IVF_PQ`   | ✔️                      | ✔️              | ✔️ (GPU index building is supported only for Euclidean distance) | ✔️ (GPU search is supported only for Euclidean distance) | ✔️                   | ❌                    |
| `RNSG`     | ✔️                      | ✔️              | ❌                                                               | ❌                                                       | ✔️                   | ❌                    |
| `HNSW`     | ✔️                      | ✔️              | ❌                                                               | ❌                                                       | ✔️                   | ❌                    |
| `ANNOY`    | ✔️                      | ✔️              | ❌                                                               | ❌                                                       | ✔️                   | ❌                    |

</div>

> Note: Index building parameters and search parameters vary with index type. Refer to [learn Milvus Operations](milvus_operation.md) for more information.

## Milvus Indexes

### `FLAT`

If `FLAT` index is used, the vectors are stored in an array of float/binary data without any compression. At search time, all indexed vectors are decoded sequentially and compared to the query vectors.

`FLAT` index provides 100% query recall rate. Compared to other indexes, it is the most efficient indexing method when number of queries is small.

### `IVFLAT`

Vectors are partitioned into buckets without any compression. This partition based multi-probing method is balanced between speed and accuracy.

### `IVF_SQ8`

Adopts a scalar quantizer to significantly reduce the size of a vector (to about 1/4 of the original size). `IVF_SQ8` has a much faster query speed than `FLAT`, and requires less disk storage and CPU/GPU memory than `IVFFLAT`.

Vectors are quantized to 8-bit floats. This may cause accuracy loss.

### `IVF_SQ8H`

Optimized version of `IVF_SQ8` that requires both CPU and GPU to work. Unlike `IVF_SQ8`, `IVF_SQ8H` uses a GPU-based coarse quantizer, which greatly reduces time to quantize.

### `IVF_PQ`

`IVF_PQ` index is built based on product quantization. The input vectors are split into distinct sub-vectors which are then quantized separately.

Vector size can be reduced to 1/16 or 1/32 of the original size. If you choose this index, note that there is an inevitable trade-off between memory and search accuracy.

Only 1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32 dimensions per sub-quantizer are currently supported. The supported sub-quantizer number are 1, 2, 3, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 96.

`IVF_PQ` is probably the most suitable index for large-scale, high-dimensional vector search.

### `RNSG`

`RNSG` is a self-developed index that makes various optimizations based on `NSG` index. `NSG` is a graph-based search algorithm that a) lowers the average out-degree of the graph for fast traversal; b) shortens the search path; c) reduces the index size; d) lowers the indexing complexity.

Compared to `NSG` which searches query vectors one by one, `RNSG` supports concurrent searches of multiple query vectors.

### `HNSW`

`HNSW` index is built based on hierarchical navigable small world graphs, which is a graph-based structure that incrementally builds a multi-layer structure and separates links by characteristc distance scales. Logarithmic scaling complexity makes it quite efficient for high-dimensional data.

Compared with `RNSG`, `HNSW` has better memory and time efficiency. `HNSW` also supports incremental indexing, which is missing in `RNSG`. However, because the graphs need to be loaded to memory, `HNSW` requires more memory than `RNSG`.

### `ANNOY`

`ANNOY` index is built based on the tree structure and divides the space by hyperplanes chosen with random projections. `ANNOY` supports concurrent searches of multiple query vectors.

## Choosing an index

To learn how to choose an appropriate index for your application scenarios, please read [How to Select an Index in Milvus](https://medium.com/@milvusio/how-to-choose-an-index-in-milvus-4f3d15259212).

To learn how to choose an appropriate index for a metric, refer to [Distance Metrics](metric.md).
