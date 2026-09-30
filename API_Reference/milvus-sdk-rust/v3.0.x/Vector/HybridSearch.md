# HybridSearch()

Executes multiple vector searches and combines them with the requested reranking strategy.

```rust
pub async fn hybrid_search(&self, request: HybridSearchRequest) -> Result<SearchResponse>
```

## Request Syntax

```rust
let request = HybridSearchRequest::builder()
    .collection_name("books")
    .sub_requests(vec![
        SubSearchRequest::builder()
            .vector_field("embedding")
            .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4]]))
            .metric_type(MetricType::Cosine)
            .build()?,
    ])
    .rerank(RRFRerank::new())
    .limit(5)
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to search. Required.

- `partition_names: Vec<String>`

    Partition names to restrict the search to.

- `sub_requests: Vec<SubSearchRequest>`

    Child vector searches, each with its own vector field, query vectors, filter, and metric. At least one sub-search is required.

- `rerank: Option<Function>`

    Reranking strategy applied to the combined results, such as RRF or weighted reranking. Use `RRFRerank::new()` or `WeightedRerank::new()`.

- `limit: i64`

    Number of final hits returned after reranking. Defaults to `10`.

- `offset: i64`

    Number of leading hits to skip. Defaults to `0`.

- `round_decimal: i64`

    Number of decimal places for the returned scores; `-1` disables rounding. Defaults to `-1`.

- `ignore_growing: bool`

    Whether to ignore growing segments during the search. Defaults to `false`.

- `extra_params: HashMap<String, String>`

    Additional reranking parameters.

- `group_by_field: String`

    Scalar field used to group the combined results.

- `group_size: i64`

    Number of results to return per group. Defaults to `1`.

- `strict_group_size: bool`

    Whether each group must return exactly `group_size` results. Defaults to `false`.

- `output_fields: Vec<String>`

    Names of the scalar fields returned for each hit.

- `consistency_level: Option<ConsistencyLevel>`

    Consistency guarantee for the search; the collection default is used when unset.

### SubSearchRequest

Each entry in `sub_requests` describes one vector search against a single vector field. Build it with `SubSearchRequest::builder()` and pass the list to `HybridSearchRequest::builder().sub_requests(...)`.

**REQUEST FIELDS:**

- `vector_field: String`

    Name of the vector field to search. Required.

- `vectors: SearchVectors`

    Query vectors, wrapped in the `SearchVectors` enum matching the field's data type (e.g. `SearchVectors::Float`, `SearchVectors::Sparse`). Required.

- `filter: String`

    Scalar filter expression applied to the entities before search.

- `filter_templates: HashMap<String, FilterTemplateValue>`

    Placeholder values referenced by the filter expression.

- `limit: i64`

    Maximum number of hits returned for this sub-search. Defaults to `0`.

- `metric_type: Option<MetricType>`

    Metric type for measuring vector similarity; falls back to the index metric when unset.

- `extra_params: HashMap<String, String>`

    Index-specific search parameters, such as `nprobe` for IVF indexes.

- `radius: Option<f64>`

    Similarity radius used with `range_filter` for range search; matches results whose distance is within the range.

- `range_filter: Option<f64>`

    Lower/upper similarity bound that works with `radius` for range search.

- `timezone: String`

    Timezone applied when filtering on Timestamptz fields.

**RETURNS:**

*Result\<SearchResponse\>*

`HybridSearchResponse` is an alias for `SearchResponse`. It exposes `results()` returning a `SearchResults` with one `SingleResult` per query vector after server-side reranking, plus the session timestamp and execution cost statistics. Returns `Error` on failure.

## Example

```rust
let request = HybridSearchRequest::builder()
    .collection_name("books")
    .sub_requests(vec![
        SubSearchRequest::builder()
            .vector_field("embedding")
            .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4]]))
            .metric_type(MetricType::Cosine)
            .build()?,
    ])
    .rerank(RRFRerank::new())
    .limit(5)
    .build()?;
let resp = client.hybrid_search(request).await?;
```
