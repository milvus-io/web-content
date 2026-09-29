# MetricType

This enum specifies the distance or similarity metric used by vector indexes and searches. Pass a `MetricType` value to `IndexParam` when building an index, or to a search request. The valid choices depend on the vector field's data type.

```rust
pub enum MetricType {
    Default,
    L2,
    Ip,
    Cosine,
    Hamming,
    Jaccard,
    MhJaccard,
    Bm25,
    MaxSimCosine,
    MaxSimIp,
    MaxSimL2,
    MaxSimJaccard,
    MaxSimHamming,
}
```

**VARIANTS:**

- `Default`

    Lets the Milvus server determine the metric type. This is the default.

- `L2`

    Euclidean distance; Milvus returns the squared value `sum((a_i - b_i)^2)`. Smaller is more similar.

- `Ip`

    Inner product, `sum(a_i * b_i)`. Larger is more similar.

- `Cosine`

    Cosine similarity, `cos(a, b)`. Larger is more similar.

- `Hamming`

    Hamming distance, the number of positions at which two binary vectors differ. Smaller is more similar.

- `Jaccard`

    Jaccard distance, `1 - |A ∩ B| / |A ∪ B|`. Smaller is more similar.

- `MhJaccard`

    MinHash Jaccard distance over binary MinHash signatures, `1 - estimated similarity`. Smaller is more similar.

- `Bm25`

    BM25 relevance score for full-text search over sparse vectors.

- `MaxSimCosine`

    MaxSim Cosine, used to search embedding lists stored in array-of-structs vector fields.

- `MaxSimIp`

    MaxSim Inner Product, used to search embedding lists stored in array-of-structs vector fields.

- `MaxSimL2`

    MaxSim L2, used to search embedding lists stored in array-of-structs vector fields.

- `MaxSimJaccard`

    MaxSim Jaccard, used to search embedding lists stored in array-of-structs vector fields.

- `MaxSimHamming`

    MaxSim Hamming, used to search embedding lists stored in array-of-structs vector fields.

## Example

```rust
let index = IndexParam::new()
    .field_name("embedding")
    .index_type(IndexType::Hnsw)
    .metric_type(MetricType::Cosine)
    .extra_params(HashMap::from([("M".to_owned(), "16".to_owned())]));
```
