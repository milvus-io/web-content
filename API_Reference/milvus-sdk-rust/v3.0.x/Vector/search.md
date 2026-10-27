# search()

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

    Primary keys whose stored vectors are used as search targets. Mutually exclusive with `vectors`. See [Ids](Ids.md).

- `vector_field: String`

    Name of the vector field to search (the ANN field).

- `vectors: SearchVectors`

    Query vectors, one per query. Supports dense float, binary, float16, bfloat16, sparse, int8, embedded-text, and struct embedding-list inputs. See [SearchVectors](SearchVectors.md).

- `partition_names: Vec<String>`

    Partition names to restrict the search to; searches the whole collection when empty.

- `filter: String`

    Scalar filter expression applied before the vector search.

- `filter_templates: HashMap<String, FilterTemplateValue>`

    Placeholder values referenced by the filter expression. See [FilterTemplateValue](FilterTemplateValue.md).

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

    Distance or similarity metric for the search; the server default is used when unset. See [MetricType](../Management/MetricType.md).

- `order_by_fields: Vec<OrderByField>`

    Scalar fields used to order the search results. See [OrderByField](OrderByField.md).

- `extra_params: HashMap<String, String>`

    Additional search parameters, such as `nprobe` or `ef`.

- `rerank: Option<FunctionScore>`

    Reranking configuration for single-vector search. Mutually exclusive with `function_chains`.

    This struct carries reranking functions and combination settings used by search. It is used both as a V2 request input and as a response domain object.

    ```rust
    pub struct FunctionScore
    ```

    **PARAMETERS:**

    - `functions: Vec<Function>`

        Reranking functions applied to the candidate set.

    - `params: HashMap<String, serde_json::Value>`

        Combination settings for the reranking functions.

    **METHODS:**

    - `new()` - Creates a value initialized with its SDK defaults.
    - `functions(value)` / `set_functions(value)` / `get_functions()` - Sets or returns the functions.
    - `add_function(value)` - Adds one function to the existing values.
    - `params(value)` / `set_params(value)` / `get_params()` - Sets or returns the params.

- `timezone: String`

    Timezone applied when searching or filtering Timestamptz fields.

- `highlighter: Option<Highlighter>`

    Text-highlighting configuration for full-text search.

    This struct configures text highlighting for search results.

    ```rust
    pub struct Highlighter
    ```

    **PARAMETERS:**

    - `highlight_type: HighlightType`

        Highlighting strategy, `Lexical` or `Semantic`. Defaults to `Lexical`.

    - `params: HashMap<String, String>`

        Highlighting parameters, such as pre-tags, post-tags, and fragment settings.

    **METHODS:**

    - `new()` - Creates a value initialized with its SDK defaults.
    - `highlight_type(value)` / `set_highlight_type(value)` / `get_highlight_type()` - Sets or returns the highlight type.
    - `params(value)` / `set_params(value)` / `get_params()` - Sets or returns the highlighting parameters.

    `Highlighter` also implements `From<LexicalHighlighter>` and `From<SemanticHighlighter>` to convert a typed highlighter into its parameterized form.

- `consistency_level: Option<ConsistencyLevel>`

    Consistency guarantee for the search; the collection default is used when unset. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

- `function_chains: Vec<FunctionChain>`

    Function chains used to post-process the search results. Mutually exclusive with `rerank`. See [FunctionChain](FunctionChain.md).

- `search_aggregation: Option<SearchAggregation>`

    Hierarchical bucket aggregation settings for the search.

    This struct describes one level of hierarchical bucket aggregation for a search request, recursively nestable. Attach it to a search request with `SearchRequestBuilder::search_aggregation`. It is mutually exclusive with `group_by_field`; when set, the search `limit` is ignored and `size` controls the top-level bucket count.

    ```rust
    pub struct SearchAggregation
    ```

    **PARAMETERS:**

    - `fields: Vec<String>`

        Group-by fields. Must contain at least one field.

    - `size: i64`

        Maximum number of buckets returned at this level. Must be positive.

    - `metrics: HashMap<String, MetricSpec>`

        Metric aggregations keyed by alias.

    - `order: Vec<OrderSpec>`

        Ordering rules applied to the buckets at this level. Each key is a metric alias or one of the special keys `_count`/`_key`.

    - `top_hits: Option<TopHitsSpec>`

        Document snapshot returned for each bucket at this level.

    - `sub_aggregation: Option<Box<SearchAggregation>>`

        Nested recursive aggregation level.

    **METHODS:**

    - `new()` - Creates a value initialized with its SDK defaults.
    - `fields(value)` / `set_fields(value)` / `get_fields()` - Sets or returns the group-by fields.
    - `add_field(value)` - Appends a group-by field.
    - `size(value)` / `set_size(value)` / `get_size()` - Sets or returns the maximum bucket count.
    - `metrics(value)` / `set_metrics(value)` / `get_metrics()` - Sets or returns the metric aggregations.
    - `add_metric(alias, value)` - Adds a metric aggregation by alias.
    - `order(value)` / `set_order(value)` / `get_order()` - Sets or returns the ordering rules.
    - `add_order(value)` - Appends an ordering rule.
    - `top_hits(value)` / `set_top_hits(value)` / `get_top_hits()` - Sets or returns the top-hits snapshot.
    - `sub_aggregation(value)` / `set_sub_aggregation(value)` / `get_sub_aggregation()` - Sets or returns the nested level.
    - `validate()` - Validates that the aggregation can be attached to a search request.

    ## MetricOp

    - `Avg` - Average of the grouped values. Default operator for `MetricSpec::new()`.

    - `Sum` - Sum of the grouped values.

    - `Count` - Number of retained candidates in each group; `NULL` values are skipped when a field is specified.

    - `Min` - Minimum of the grouped values.

    - `Max` - Maximum of the grouped values.

    ## AggDirection

    - `Asc` - Sort aggregation buckets in ascending order.

    - `Desc` - Sort aggregation buckets in descending order. This is the default direction.

    > `SortDirection` is a deprecated alias for `AggDirection`, retained for compatibility with Rust SDK 3.0.0.

    ## MetricSpec

    A metric aggregation over a field, keyed by alias in `SearchAggregation`.

    ```rust
    MetricSpec::new()
        .op(MetricOp::Avg)
        .field_name("price")
    ```

    **METHODS:**

    - `op(value)` / `set_op(value)` / `get_op()` - Sets or returns `MetricOp`.
    - `field_name(value)` / `set_field_name(value)` / `get_field_name()` - Sets or returns the target field.

    ## OrderSpec

    An ordering rule applied to buckets at an aggregation level.

    ```rust
    OrderSpec::new()
        .key("avg_price")
        .direction(AggDirection::Desc)
        .null_first(false)
    ```

    **METHODS:**

    - `key(value)` / `set_key(value)` / `get_key()` - Sets or returns the metric alias, `"_count"`, or `"_key"`.
    - `direction(value)` / `set_direction(value)` / `get_direction()` - Sets or returns `AggDirection`.
    - `null_first(value)` / `set_null_first(value)` / `is_null_first()` - Sets or returns whether null values sort first.

    ## TopHitsSpec

    A document snapshot returned for each bucket at an aggregation level.

    ```rust
    TopHitsSpec::new()
        .size(3)
        .sort([SortSpec::new().field_name("price").direction(AggDirection::Desc)])
    ```

    **METHODS:**

    - `size(value)` / `set_size(value)` / `get_size()` - Sets or returns the number of top hits per bucket.
    - `sort(values)` / `set_sort(values)` / `get_sort()` - Sets or returns `SortSpec` rules.
    - `add_sort(value)` - Appends a `SortSpec` rule.

    ## SortSpec

    A top-hits sort criterion.

    ```rust
    SortSpec::new()
        .field_name("price")
        .direction(AggDirection::Desc)
        .null_first(false)
    ```

    **METHODS:**

    - `field_name(value)` / `set_field_name(value)` / `get_field_name()` - Sets or returns the field to sort by.
    - `direction(value)` / `set_direction(value)` / `get_direction()` - Sets or returns `AggDirection`.
    - `null_first(value)` / `set_null_first(value)` / `is_null_first()` - Sets or returns whether null values sort first.

- `rls_principal: Option<String>`

    Principal name used to enforce row-level security. Required for requests against an RLS-enabled collection unless `skip_rls` is set.

- `skip_rls: bool`

    Whether the request explicitly bypasses row-level security. Defaults to `false`.

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
let request = SearchRequest::builder()
    .collection_name("books")
    .vector_field("embedding")
    .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4]]))
    .output_fields(["id", "title"])
    .limit(5)
    .build()?;
let resp = client.search(request).await?;
```
