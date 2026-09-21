# Query()

Queries a collection with a scalar filter and returns the matching entities.

```rust
pub async fn query(&self, request: QueryRequest) -> Result<QueryResponse>
```

## Request Syntax

```rust
let request = QueryRequest::builder()
    .collection_name("books")
    .filter("id > 0")
    .output_fields(["id", "title"])
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

    Primary keys of the entities to retrieve. Mutually exclusive with `filter`.

- `filter: String`

    Scalar filter expression that selects the entities. Mutually exclusive with `ids`.

- `filter_templates: HashMap<String, FilterTemplateValue>`

    Placeholder values referenced by the filter expression.

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

    Consistency guarantee for the query; the collection default is used when unset.

- `order_by_fields: Vec<OrderByField>`

    Scalar fields used to order the query results.

- `extra_params: HashMap<String, String>`

    Additional query parameters.

**RETURNS:**

*Result\<QueryResponse\>*

`QueryResponse` exposes `results()` returning a column-oriented `QueryResults` with the requested output fields. Iterate rows with `results().rows()` or materialize them with `get_output_rows()`. The response also carries the session timestamp. Returns `Error` on failure.

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
