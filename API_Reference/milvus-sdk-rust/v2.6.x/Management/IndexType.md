# IndexType

This enum selects the index algorithm. Pass an `IndexType` value to `IndexParam` when calling `CreateIndexRequest`, or to `IndexDesc` in responses. The valid choices depend on the field's data type.

```rust
pub enum IndexType {
    Invalid,
    Flat,
    IvfFlat,
    IvfSq8,
    IvfPq,
    Hnsw,
    HnswSq,
    HnswPq,
    HnswPrq,
    DiskAnn,
    AutoIndex,
    Scann,
    IvfRabitq,
    Aisaq,
    GpuIvfFlat,
    GpuIvfPq,
    GpuBruteForce,
    GpuCagra,
    BinFlat,
    BinIvfFlat,
    MinhashLsh,
    Trie,
    Ngram,
    Rtree,
    StlSort,
    Inverted,
    Bitmap,
    SparseInvertedIndex,
    SparseWand,
}
```

**VARIANTS:**

- `Invalid`

    Unspecified or invalid index type. This is the default.

- `Flat`

    Brute-force exact search; no index structure is built.

- `IvfFlat`

    Inverted-file index with flat storage of vectors in each cluster.

- `IvfSq8`

    IVF index with scalar-quantized vector storage.

- `IvfPq`

    IVF index with product-quantized vector storage.

- `Hnsw`

    Hierarchical navigable small-world graph index for ANN search.

- `HnswSq`

    HNSW index with scalar-quantized vector storage.

- `HnswPq`

    HNSW index with product-quantized vector storage.

- `HnswPrq`

    HNSW index with product residual quantization (PQ + RQ).

- `DiskAnn`

    Disk-based ANN index that keeps most of the graph on disk.

- `AutoIndex`

    Lets the server choose an appropriate index automatically.

- `Scann`

    Scan index using anisotropic vector quantization with re-ranking.

- `IvfRabitq`

    IVF index with range-approximation binary quantization.

- `Aisaq`

    Adaptive index for high-recall ANN search on disk.

- `GpuIvfFlat`

    GPU-accelerated IVF flat index.

- `GpuIvfPq`

    GPU-accelerated IVF product-quantization index.

- `GpuBruteForce`

    GPU brute-force exact search.

- `GpuCagra`

    GPU-accelerated CAGRA graph index.

- `BinFlat`

    Exact search index for binary vectors.

- `BinIvfFlat`

    IVF index for binary vectors.

- `MinhashLsh`

    MinHash LSH index for set similarity search.

- `Trie`

    Trie index used for string filtering.

- `Ngram`

    N-gram index used for string matching.

- `Rtree`

    R-tree index used for spatial queries.

- `StlSort`

    Sorted-list index over scalar values.

- `Inverted`

    Inverted index over scalar values for efficient filtering.

- `Bitmap`

    Bitmap index over scalar values for efficient filtering.

- `SparseInvertedIndex`

    Inverted index over sparse vector dimensions.

- `SparseWand`

    Sparse-WAND index for sparse-vector ranking. Deprecated since Milvus 2.5.4; use `inverted_index_algo: DAAT_WAND` on `SparseInvertedIndex` instead.

## Example

```rust
let index = IndexParam::new()
    .field_name("embedding")
    .index_type(IndexType::Hnsw)
    .metric_type(MetricType::Cosine)
    .extra_params(HashMap::from([("M".to_owned(), "16".to_owned())]));
```
