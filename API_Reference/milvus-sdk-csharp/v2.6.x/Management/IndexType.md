# IndexType

The index type used when creating an index on a field.

```csharp
public enum IndexType
{
    Invalid = 0,
    Flat = 1,
    IvfFlat = 2,
    IvfSq8 = 3,
    IvfPq = 4,
    Hnsw = 5,
    HnswSq = 6,
    HnswPq = 7,
    HnswPrq = 8,
    DiskAnn = 9,
    AutoIndex = 10,
    Scann = 11,
    GpuIvfFlat = 12,
    GpuIvfPq = 13,
    GpuBruteForce = 14,
    GpuCagra = 15,
    BinFlat = 16,
    BinIvfFlat = 17,
    Trie = 18,
    StlSort = 19,
    Inverted = 20,
    Bitmap = 21,
    SparseInvertedIndex = 22,
    SparseWand = 23,
    Ngram = 24,
    Rtree = 25,
    FmIndex = 26,
    Hybrid = 27,
    VecIndex = 28,
    IvfRabitq = 29,
    MinHashLsh = 30,
    Aisaq = 31
}
```

**VALUES:**

- **Invalid** (0) - An invalid index type.

- **Flat** (1) - A brute-force index that compares each query vector against all vectors. CPU index for float vectors; always exact (no quantization loss). Good for small datasets.

- **IvfFlat** (2) - An inverted-file index that partitions the vector space into clusters. CPU index for float vectors; the `nlist` extra param controls cluster count.

- **IvfSq8** (3) - An IVF index with scalar quantization.

- **IvfPq** (4) - An IVF index with product quantization.

- **Hnsw** (5) - A graph-based index using Hierarchical Navigable Small World graphs. CPU index for float vectors; the `M` and `efConstruction` extra params tune recall vs cost.

- **HnswSq** (6) - An HNSW index with scalar quantization.

- **HnswPq** (7) - An HNSW index with product quantization.

- **HnswPrq** (8) - An HNSW index with product quantization and residual coding.

- **DiskAnn** (9) - A disk-based index for very large datasets.

- **AutoIndex** (10) - An index type automatically chosen by the server.

- **Scann** (11) - A graph-based index from Microsoft (ANNS).

- **GpuIvfFlat** (12) - A GPU-accelerated IVF index.

- **GpuIvfPq** (13) - A GPU-accelerated IVF index with product quantization.

- **GpuBruteForce** (14) - A GPU brute-force index.

- **GpuCagra** (15) - A GPU-accelerated CAGRA graph index.

- **BinFlat** (16) - A binary vector flat index. CPU index for binary vectors; exact (no quantization loss).

- **BinIvfFlat** (17) - A binary vector inverted-file index. CPU index for binary vectors; the `nlist` extra param controls cluster count.

- **Trie** (18) - A trie index for string fields. Used for exact-match prefix queries on VarChar fields.

- **StlSort** (19) - A sorted-list index for numeric fields.

- **Inverted** (20) - An inverted index for scalar fields (works for all scalar fields except JSON).

- **Bitmap** (21) - A bitmap index for scalar fields (works for all scalar fields except JSON, FLOAT and DOUBLE).

- **SparseInvertedIndex** (22) - An inverted index for sparse vectors.

- **SparseWand** (23) - A sparse vector index using the WAND algorithm.

- **Ngram** (24) - An n-gram full-text index for string fields.

- **Rtree** (25) - An R-tree index for spatial/geographic data.

- **FmIndex** (26) - A full-text index using the FM algorithm.

- **Hybrid** (27) - A hybrid index (combined BITMAP + INVERTED).

- **VecIndex** (28) - A vector index automatically selected by the server for the target vector type.

- **IvfRabitq** (29) - An IVF index with RaBitQ quantization.

- **MinHashLsh** (30) - A MinHash LSH index for binary vectors holding MinHash signatures, used for Jaccard-similarity search.

- **Aisaq** (31) - An AISAQ index for scalar/vector fields. Adaptive Indexing with Scalar And Quantization; supports scalar fields and low-dimensional vectors.
