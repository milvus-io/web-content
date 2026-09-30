# Search()

Searches vector fields and returns ranked hits for each query vector.

```rust
pub async fn search(&self, request: SearchRequest) -> Result<SearchResponse>
```

## Request Syntax

```rust
let request = SearchRequest::builder()
    .collection_name("books")
    .vector_field("embedding")
    .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4]]))
    .output_fields(["id", "title"])
    .limit(5)
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to search. Required.

- `ids: Ids`

    Primary keys whose stored vectors are used as search targets. Mutually exclusive with `vectors`.

- `vector_field: String`

    Name of the vector field to search (the ANN field).

- `vectors: SearchVectors`

    Query vectors, one per query. Supports dense float, binary, float16, bfloat16, sparse, int8, embedded-text, and struct embedding-list inputs.

- `partition_names: Vec<String>`

    Partition names to restrict the search to; searches the whole collection when empty.

- `filter: String`

    Scalar filter expression applied before the vector search.

- `filter_templates: HashMap<String, FilterTemplateValue>`

    Placeholder values referenced by the filter expression.

- `output_fields: Vec<String>`

    Names of the scalar fields returned for each hit.

- `limit: i64`

    Number of hits returned per query vector. Defaults to `10`.

- `offset: i64`

    Number of leading hits to skip per query vector. Defaults to `0`.

- `round_decimal: i64`

    Number of decimal places for the returned scores; `-1` disables rounding. Defaults to `-1`.

- `ignore_growing: bool`

    Whether to ignore growing segments during the search. Defaults to `false`.

- `group_by_field: String`

    Scalar field used to group the search results.

- `group_size: i64`

    Number of results to return per group. Defaults to `1`.

- `strict_group_size: bool`

    Whether each group must return exactly `group_size` results. Defaults to `false`.

- `radius: Option<f64>`

    Range-search radius that filters the returned distances.

- `range_filter: Option<f64>`

    Lower or upper distance bound used together with `radius`.

- `metric_type: Option<MetricType>`

    Distance or similarity metric for the search; the server default is used when unset.

- `order_by_fields: Vec<OrderByField>`

    Scalar fields used to order the search results.

- `extra_params: HashMap<String, String>`

    Additional search parameters, such as `nprobe` or `ef`.

- `rerank: Option<FunctionScore>`

    Reranking configuration for single-vector search. Mutually exclusive with `function_chains`.

- `timezone: String`

    Timezone applied when searching or filtering Timestamptz fields.

- `highlighter: Option<Highlighter>`

    Text-highlighting configuration for full-text search.

- `consistency_level: Option<ConsistencyLevel>`

    Consistency guarantee for the search; the collection default is used when unset.

- `function_chains: Vec<FunctionChain>`

    Function chains used to post-process the search results. Mutually exclusive with `rerank`.

- `search_aggregation: Option<SearchAggregation>`

    Hierarchical bucket aggregation settings for the search.

**RETURNS:**

*Result\<SearchResponse\>*

`SearchResponse` exposes `results()` returning a `SearchResults`, which holds one `SingleResult` per query vector; each `SingleResult` carries the hit IDs, scores, and requested output fields. The response also reports the session timestamp and execution cost statistics. Returns `Error` on failure.

## Example

```rust
let request = SearchRequest::builder()
    .collection_name("books")
    .vector_field("embedding")
    .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4]]))
    .output_fields(["id", "title"])
    .limit(5)
    .build()?;
let resp = client.search(request).await?;
```
