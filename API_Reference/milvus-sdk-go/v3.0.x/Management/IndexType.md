# IndexType

Enumerates the supported index algorithms for vector and scalar fields.

```go
type IndexType string
```

**VALUES:**

- **Flat** = "FLAT"

    Flat (brute-force) index. Exact but slow for large datasets.

- **BinFlat** = "BIN_FLAT"

    Flat index for binary vectors.

- **IvfFlat** = "IVF_FLAT"

    IVF with flat quantization. Good accuracy/speed balance.

- **BinIvfFlat** = "BIN_IVF_FLAT"

    IVF-Flat for binary vectors.

- **IvfPQ** = "IVF_PQ"

    IVF with product quantization. Memory-efficient.

- **IvfSQ8** = "IVF_SQ8"

    IVF with 8-bit scalar quantization.

- **IvfRabitQ** = "IVF_RABITQ"

    IVF with RaBitQ quantization.

- **HNSW** = "HNSW"

    Hierarchical Navigable Small World graph. High recall and fast search.

- **HNSWSQ** = "HNSW_SQ"

    HNSW with scalar quantization for reduced memory usage.

- **HNSWPQ** = "HNSW_PQ"

    HNSW with product quantization for reduced memory usage.

- **HNSWPRQ** = "HNSW_PRQ"

    HNSW with product-residual quantization for reduced memory usage.

- **IvfHNSW** = "IVF_HNSW"

    Combined IVF and HNSW index.

- **AUTOINDEX** = "AUTOINDEX"

    Automatically selects the best index type.

- **DISKANN** = "DISKANN"

    Disk-based ANN index for large-scale datasets.

- **AISAQ** = "AISAQ"

    DiskANN variant that keeps PQ codes inline with the graph to cut random reads per hop.

- **SCANN** = "SCANN"

    ScaNN (Scalable Nearest Neighbors) index.

- **MinHashLSH** = "MINHASH_LSH"

    MinHash LSH index for set similarity.

- **SparseInverted** = "SPARSE_INVERTED_INDEX"

    Inverted index for sparse vectors.

- **SparseWAND** = "SPARSE_WAND"

    WAND algorithm for sparse vector search.

- **GPUIvfFlat** = "GPU_IVF_FLAT"

    GPU-accelerated IVF-Flat index.

- **GPUIvfPQ** = "GPU_IVF_PQ"

    GPU-accelerated IVF-PQ index.

- **GPUCagra** = "GPU_CAGRA"

    GPU-accelerated CAGRA graph index.

- **GPUBruteForce** = "GPU_BRUTE_FORCE"

    GPU-accelerated brute-force index.

- **Trie** = "Trie"

    Trie index for string fields.

- **Sorted** = "STL_SORT"

    Sorted index for scalar fields.

- **Inverted** = "INVERTED"

    Inverted index for scalar fields.

- **NGRAM** = "NGRAM"

    N-gram index for VARCHAR fields that accelerates substring operators (LIKE prefix / infix / suffix and regex match).

- **FMINDEX** = "FMINDEX"

    FM-index for VARCHAR fields that answers anchored LIKE (prefix / infix / suffix) exactly without candidate recheck.

- **BITMAP** = "BITMAP"

    Bitmap index for low-cardinality scalar fields.

- **RTREE** = "RTREE"

    R-tree index for spatial data.

## Example

```go
import (
    "context"

    "github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    // handle error
}

defer cli.Close(ctx)

// Create an HNSW index on a float vector field
hnswIndex := index.NewHNSWIndex(entity.L2, 16, 200)
_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(
    "my_collection", "embedding", hnswIndex))
if err != nil {
    // handle error
}

// Create an IVF_FLAT index
ivfIndex := index.NewIvfFlatIndex(entity.L2, 128)
_, err = cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(
    "my_collection", "embedding2", ivfIndex))
if err != nil {
    // handle error
}
```
