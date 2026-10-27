# hybrid_search()

Executes multiple vector searches and combines them with a reranking strategy or function chain.

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
    .function_chains([FunctionChain::new()
        .name("refine")
        .stage(FunctionChainStage::L2Rerank)
        .limit(5, 0)])
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

    Consistency guarantee for the search; the collection default is used when unset. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

- `function_chains: Vec<FunctionChain>`

    Function chains used to post-process the combined results. Mutually exclusive with `rerank`. See [FunctionChain](FunctionChain.md).

- `rls_principal: Option<String>`

    Principal name used to enforce row-level security for every sub-search. Required for requests against an RLS-enabled collection unless `skip_rls` is set.

- `skip_rls: bool`

    Whether the request explicitly bypasses row-level security for every sub-search. Defaults to `false`.

### SubSearchRequest

Each entry in `sub_requests` describes one vector search against a single vector field. Build it with `SubSearchRequest::builder()` and pass the list to `HybridSearchRequest::builder().sub_requests(...)`.

**REQUEST FIELDS:**

- `vector_field: String`

    Name of the vector field to search. Required.

- `vectors: SearchVectors`

    Query vectors, wrapped in the `SearchVectors` enum matching the field's data type (e.g. `SearchVectors::Float`, `SearchVectors::Sparse`). Required. See [SearchVectors](SearchVectors.md).

- `filter: String`

    Scalar filter expression applied to the entities before search.

- `filter_templates: HashMap<String, FilterTemplateValue>`

    Placeholder values referenced by the filter expression. See [FilterTemplateValue](FilterTemplateValue.md).

- `limit: i64`

    Maximum number of hits returned for this sub-search. Defaults to `0`.

- `metric_type: Option<MetricType>`

    Metric type for measuring vector similarity; falls back to the index metric when unset. See [MetricType](../Management/MetricType.md).

- `extra_params: HashMap<String, String>`

    Index-specific search parameters, such as `nprobe` for IVF indexes.

- `radius: Option<f64>`

    Similarity radius used with `range_filter` for range search; matches results whose distance is within the range.

- `range_filter: Option<f64>`

    Lower/upper similarity bound that works with `radius` for range search.

- `timezone: String`

    Timezone applied when filtering on Timestamptz fields.

**RETURN TYPE:**

*Result\<SearchResponse\>*

**RETURNS:**

A **SearchResponse** containing the ranked hits for each query vector. Returns an `Error` if the operation fails.

```rust
SearchResponse
    results() // -> &SearchResults
    session_timestamp() // -> u64
    cost() // -> i64
    scanned_remote_bytes() // -> i64
    scanned_total_bytes() // -> i64
    cache_hit_ratio() // -> f32
```

**METHODS:**

- `results()` (*&SearchResults*) -

    The ranked hits, one group per query vector.

    - `get_results()` (*&[SingleResult]*) -

        The hits, one per query vector.

        - `get_ids()` (*&Ids*) -

            The IDs of the hits for one query vector. See [Ids](Ids.md).

        - `get_scores()` (*&[f32]*) -

            The similarity scores of the hits.

        - `get_element_indices()` (*Option<&[i64]>*) -

            The element indices of the hits, when present.

        - `get_output_fields()` (*&[FieldData]*) -

            The output field values of the hits. See [FieldData](FieldData.md).

        - `get_output_field_names()` (*&[String]*) -

            The names of the output fields.

        - `get_primary_field_name()` (*&str*) -

            The name of the primary-key field.

        - `get_score_field_name()` (*&str*) -

            The name of the score field.

        - `get_highlight_results()` (*&[HashMap<String, HighlightResult>]*) -

            The text-highlighting results per hit, when full-text search highlighting was requested.

            - `get_field_name()` (*&str*) -

                The name of the highlighted field.

            - `get_fragments()` (*&[String]*) -

                The highlighted text fragments.

            - `get_scores()` (*&[f32]*) -

                The relevance scores of the fragments.

        - `len()` (*usize*) -

            The number of hits for one query vector.

        - `is_empty()` (*bool*) -

            Whether no hits were returned for the query vector.

        - `get_output_field()` (*Option<&FieldData>*) -

            The value of the named output field for the hit, when present. See [FieldData](FieldData.md).

        - `get_output_rows()` (*Result<Vec<EntityRow>>*) -

            The hits as entity rows. See [EntityRow](EntityRow.md).

        - `get_output_row()` (*Result<EntityRow>*) -

            The hit at the given index as an entity row. See [EntityRow](EntityRow.md).

        - `rows()` (*Result<ResultRowIter>*) -

            Returns a borrowing iterator over the matched rows, reading values directly from the column-oriented result data.

    - `get_recalls()` (*&[f32]*) -

        The recall rate per query vector.

    - `len()` (*usize*) -

        The number of hit groups returned.

    - `is_empty()` (*bool*) -

        Whether no hits were returned.

    - `iter()` (*std::slice::Iter<SingleResult>*) -

        Iterates over the result associated with each query vector.

    - `get_agg_buckets()` (*&[Vec<AggregationBucket>]*) -

        The aggregation buckets produced by the search.

        - `get_key()` (*&[BucketKeyEntry]*) -

            The bucket keys, one entry per grouped field.

            - `get_field_id()` (*i64*) -

                The ID of the field the key belongs to.

            - `get_field_name()` (*&str*) -

                The name of the field the key belongs to.

            - `get_value()` (*&AggregationBucketValue*) -

                The value of the bucket key.

        - `get_count()` (*i64*) -

            The number of rows in the bucket.

        - `get_metrics()` (*&HashMap<String, AggregationMetricValue>*) -

            The metric values computed for the bucket. See [AggregationMetricValue](AggregationMetricValue.md).

        - `get_hits()` (*&[AggregationHit]*) -

            The representative hits of the bucket.

            - `get_pk()` (*Option<&AggregationHitPk>*) -

                The primary key of the representative hit.

            - `get_score()` (*f32*) -

                The score of the representative hit.

            - `get_fields()` (*&[AggregationHitField]*) -

                The field values of the representative hit.

                - `get_field_id()` (*i64*) -

                    The ID of the field.

                - `get_field_name()` (*&str*) -

                    The name of the field.

                - `get_value()` (*&AggregationHitFieldValue*) -

                    The value of the field.

        - `get_sub_groups()` (*&[AggregationBucket]*) -

            The nested sub-buckets of the bucket.

- `session_timestamp()` (*u64*) -

    The session timestamp of the search.

- `cost()` (*i64*) -

    The execution cost reported by the server.

- `scanned_remote_bytes()` (*i64*) -

    The number of bytes scanned from remote storage.

- `scanned_total_bytes()` (*i64*) -

    The total number of bytes scanned.

- `cache_hit_ratio()` (*f32*) -

    The ratio of scanned bytes served from the cache.

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
