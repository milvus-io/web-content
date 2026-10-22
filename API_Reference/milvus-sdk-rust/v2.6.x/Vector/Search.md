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

    Primary keys whose stored vectors are used as search targets. Mutually exclusive with `vectors`. See [Ids](Ids.md).

- `vector_field: String`

    Name of the vector field to search (the ANN field).

- `vectors: SearchVectors`

    Query vectors, one per query. Supports dense float, binary, float16, bfloat16, sparse, int8, embedded-text, and struct embedding-list inputs. See [SearchVectors](SearchVectors.md).

- `partition_names: Vec<String>`

    Partition names to restrict the search to; searches the whole collection when empty.

- `filter: String`

    Scalar filter expression applied before the vector search.

- `filter_templates: HashMap<String, Value>`

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

    Distance or similarity metric for the search; the server default is used when unset. See [MetricType](../Management/MetricType.md).

- `extra_params: HashMap<String, String>`

    Additional search parameters, such as `nprobe` or `ef`.

- `rerank: Option<FunctionScore>`

    Reranking configuration for single-vector search. See [FunctionScore](FunctionScore.md).

- `timezone: String`

    Timezone applied when searching or filtering Timestamptz fields.

- `highlighter: Option<Highlighter>`

    Text-highlighting configuration for full-text search. See [Highlighter](Highlighter.md).

- `consistency_level: Option<ConsistencyLevel>`

    Consistency guarantee for the search; the collection default is used when unset. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

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

    - `get_recalls()` (*&[f32]*) -

        The recall rate per query vector.

    - `len()` (*usize*) -

        The number of hit groups returned.

    - `is_empty()` (*bool*) -

        Whether no hits were returned.

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
