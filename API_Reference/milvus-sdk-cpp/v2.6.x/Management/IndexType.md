# IndexType

This enum selects the index algorithm. Pass an `IndexType` value to `IndexDesc` when calling `CreateIndex()`. The valid choices depend on the field's data type.

```cpp
enum class IndexType {
    INVALID = 0,
    // Dense float — CPU
    FLAT = 1, IVF_FLAT = 2, IVF_SQ8 = 3, IVF_PQ = 4,
    HNSW = 5, DISKANN = 6, AUTOINDEX = 7, SCANN = 8,
    HNSW_SQ = 9, HNSW_PQ = 10, HNSW_PRQ = 11, IVF_RABITQ = 12,
    // Dense float — GPU
    GPU_IVF_FLAT = 201, GPU_IVF_PQ = 202,
    GPU_BRUTE_FORCE = 203, GPU_CAGRA = 204,
    // Binary vectors
    BIN_FLAT = 1001, BIN_IVF_FLAT = 1002, MINHASH_LSH = 1003,
    // Scalar fields
    TRIE = 1101, STL_SORT = 1102, INVERTED = 1103,
    BITMAP = 1104, NGRAM = 1105,
    // Sparse vectors
    SPARSE_INVERTED_INDEX = 1201, SPARSE_WAND = 1202,
};
```

**VALUES:**

*Dense float vectors — CPU (`FLOAT_VECTOR`, `FLOAT16_VECTOR`, `BFLOAT16_VECTOR`, `INT8_VECTOR`):*

- **FLAT** (1) - Brute-force exact search. 100% recall; no training required. Best for small datasets (< 1 M vectors).

- **IVF_FLAT** (2) - Inverted file index. Clusters vectors into `nlist` buckets and searches the closest `nprobe` buckets. Extra params: `nlist` (required).

- **IVF_SQ8** (3) - IVF with scalar quantization (int8). Smaller memory footprint than `IVF_FLAT` at a small recall cost. Extra params: `nlist` (required).

- **IVF_PQ** (4) - IVF with product quantization. Highest compression ratio. Extra params: `nlist`, `m`, `nbits`.

- **HNSW** (5) - Hierarchical Navigable Small World graph. Best balance of speed and recall for in-memory datasets. Extra params: `M` (required), `efConstruction` (required).

- **DISKANN** (6) - Disk-based ANN index for datasets too large to fit in RAM. Good recall with low memory.

- **AUTOINDEX** (7) - Milvus auto-selects the best index type and parameters for the data. Recommended for quick start.

- **SCANN** (8) - ScaNN (Scalable Nearest Neighbors) algorithm. High recall at competitive speed.

- **HNSW_SQ** (9) - HNSW with scalar quantization. Reduces memory vs. `HNSW` with minimal recall loss.

- **HNSW_PQ** (10) - HNSW with product quantization. Further memory reduction at some recall cost.

- **HNSW_PRQ** (11) - HNSW with product residual quantization. Best recall among HNSW quantized variants.

- **IVF_RABITQ** (12) - IVF with RaBitQ binary quantization. Very low memory; competitive recall.

*Dense float vectors — GPU:*

- **GPU_IVF_FLAT** (201) - GPU-accelerated `IVF_FLAT`. Requires NVIDIA GPU with CUDA.

- **GPU_IVF_PQ** (202) - GPU-accelerated `IVF_PQ`. Lowest memory footprint on GPU.

- **GPU_BRUTE_FORCE** (203) - GPU exact brute-force search. 100% recall; fastest option for small batch queries on GPU.

- **GPU_CAGRA** (204) - GPU CAGRA graph-based index. Highest query throughput on GPU; best for large-scale GPU workloads.

*Binary vectors (`BINARY_VECTOR`):*

- **BIN_FLAT** (1001) - Brute-force exact search for binary vectors.

- **BIN_IVF_FLAT** (1002) - IVF exact search for binary vectors. Extra params: `nlist`.

- **MINHASH_LSH** (1003) - MinHash-based LSH index. Designed for Jaccard similarity on binary vectors.

*Scalar fields (INT*, FLOAT, DOUBLE, VARCHAR, BOOL, ARRAY):*

- **TRIE** (1101) - Prefix-tree index. **VARCHAR only.** Enables prefix filtering; fastest for string equality and prefix queries.

- **STL_SORT** (1102) - Sorted array index. **Numeric scalar fields only.** Best for range queries on low-cardinality numeric fields.

- **INVERTED** (1103) - Inverted index. Supports all scalar types except JSON. Good general-purpose scalar index with the broadest type coverage.

- **BITMAP** (1104) - Bitmap index. Supports all scalar types except JSON, FLOAT, and DOUBLE. Optimal for low-cardinality fields (e.g., status codes, boolean-like integers).

- **NGRAM** (1105) - N-gram index. **VARCHAR or JSON path only.** Enables fast infix (`LIKE '%keyword%'`) and tokenized text search.

*Sparse vectors (`SPARSE_FLOAT_VECTOR`):*

- **SPARSE_INVERTED_INDEX** (1201) - Inverted index for sparse float vectors. Highest recall; recommended default for sparse vectors.

- **SPARSE_WAND** (1202) - Weak AND (WAND) algorithm for sparse vectors. Faster than `SPARSE_INVERTED_INDEX` for large result sets at a small recall cost.

*Internal:*

- **INVALID** (0) - Uninitialized; do not use directly.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <milvus/MilvusClientV2.h>
#include <milvus/types/IndexType.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

// HNSW for float vector (most common choice)
IndexDesc idx_hnsw("vec", "vec_idx", IndexType::HNSW, MetricType::COSINE);
idx_hnsw.AddExtraParam("M", "16");
idx_hnsw.AddExtraParam("efConstruction", "200");

// INVERTED for a VARCHAR scalar field
IndexDesc idx_inv("name", "name_idx", IndexType::INVERTED);

// SPARSE_INVERTED_INDEX for full-text search
IndexDesc idx_sparse("sparse_vec", "sparse_idx",
                     IndexType::SPARSE_INVERTED_INDEX, MetricType::BM25);

client->CreateIndex(
    CreateIndexRequest()
        .WithCollectionName("my_collection")
        .WithSync(true)
        .AddIndex(std::move(idx_hnsw))
        .AddIndex(std::move(idx_inv))
        .AddIndex(std::move(idx_sparse)));
```
