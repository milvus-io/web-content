# query()

Queries a collection with a scalar filter and returns the matching entities.

```rust
pub async fn query(&self, request: QueryRequest) -> Result<QueryResponse>
```

## Request Syntax

```rust
let request = QueryRequest::builder()
    .collection_name("books")
    .filter("id > 0")
    .output_fields(["genre", "count(*)"])
    .group_by_fields(["genre"])
    .limit(10)
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to query. Required.

- `partition_names: Vec<String>`

    Partition names to restrict the query to; queries the whole collection when empty.

- `ids: Ids`

    Primary keys of the entities to retrieve. Mutually exclusive with `filter`. See [Ids](Ids.md).

- `filter: String`

    Scalar filter expression that selects the entities. Mutually exclusive with `ids`.

- `filter_templates: HashMap<String, FilterTemplateValue>`

    Placeholder values referenced by the filter expression. See [FilterTemplateValue](FilterTemplateValue.md).

- `output_fields: Vec<String>`

    Names of the fields returned for each row.

- `limit: Option<i64>`

    Maximum number of rows to return. `None` returns all matching rows.

- `offset: Option<i64>`

    Number of leading rows to skip.

- `ignore_growing: bool`

    Whether to ignore growing segments during the query. Defaults to `false`.

- `timezone: String`

    Timezone applied when querying or filtering Timestamptz fields.

- `consistency_level: Option<ConsistencyLevel>`

    Consistency guarantee for the query; the collection default is used when unset. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

- `order_by_fields: Vec<OrderByField>`

    Scalar fields used to order the query results. See [OrderByField](OrderByField.md).

- `extra_params: HashMap<String, String>`

    Additional query parameters.

- `group_by_fields: Vec<String>`

    Scalar fields used to group aggregation results. Combine them with aggregate expressions such as `count(*)` or `sum(field)` in `output_fields`; the server returns one row per group.

- `rls_principal: Option<String>`

    Principal name used to enforce row-level security. Required for requests against an RLS-enabled collection unless `skip_rls` is set.

- `skip_rls: bool`

    Whether the request explicitly bypasses row-level security. Defaults to `false`.

**RETURN TYPE:**

*Result\<QueryResponse\>*

**RETURNS:**

A **QueryResponse** containing the rows matched by the query. Returns an `Error` if the operation fails.

```rust
QueryResponse
    results() // -> &QueryResults
    session_timestamp() // -> u64
    cost() // -> i64
    scanned_remote_bytes() // -> i64
    scanned_total_bytes() // -> i64
    cache_hit_ratio() // -> f32
```

**METHODS:**

- `results()` (*&QueryResults*) -

    The rows matched by the query.

    - `get_output_fields()` (*&[FieldData]*) -

        The output field values of the returned rows. See [FieldData](FieldData.md).

    - `get_output_field_names()` (*&[String]*) -

        The names of the output fields.

    - `get_output_field()` (*Option<&FieldData>*) -

        The value of the named output field for the returned rows, when present. See [FieldData](FieldData.md).

    - `get_row_count()` (*u64*) -

        The number of rows returned.

    - `get_element_indices()` (*&[Vec<i64>]*) -

        The element indices of the matched rows.

    - `is_empty()` (*bool*) -

        Whether no rows were returned.

    - `get_output_rows()` (*Result<Vec<EntityRow>>*) -

        The returned rows as entity values. See [EntityRow](EntityRow.md).

    - `get_output_row()` (*Result<EntityRow>*) -

        The row at the given index as an entity value. See [EntityRow](EntityRow.md).

    - `rows()` (*Result<ResultRowIter>*) -

        Returns a borrowing iterator over the matched rows, reading values directly from the column-oriented result data.

- `session_timestamp()` (*u64*) -

    The session timestamp of the query.

- `cost()` (*i64*) -

    The execution cost reported by the server.

- `scanned_remote_bytes()` (*i64*) -

    The number of bytes scanned remotely.

- `scanned_total_bytes()` (*i64*) -

    The total number of bytes scanned.

- `cache_hit_ratio()` (*f32*) -

    The ratio of scanned bytes served from the cache.

## Example

```rust
let request = QueryRequest::builder()
    .collection_name("books")
    .filter("id > 0")
    .output_fields(["id", "title"])
    .limit(10)
    .build()?;
let resp = client.query(request).await?;
```
