# IndexDesc

This struct describes the configuration and state of an existing index, as returned by describe or list index operations.

```rust
pub struct IndexDesc
```

**PARAMETERS:**

- `index_name: String`

    Name of the index.

- `index_id: i64`

    ID of the index.

- `field_name: String`

    Name of the indexed field.

- `index_type: IndexType`

    Index implementation used. Defaults to `IndexType::Invalid`.

- `metric_type: MetricType`

    Distance or similarity metric used. Defaults to `MetricType::Default`.

- `extra_params: HashMap<String, String>`

    Additional index parameters.

- `indexed_rows: i64`

    Number of rows already indexed.

- `total_rows: i64`

    Total number of rows to index.

- `pending_rows: i64`

    Number of rows waiting to be indexed.

- `state: IndexStateCode`

    Build state of the index. Defaults to `IndexStateCode::None`.

- `failure_reason: String`

    Reason for failure when the index build failed.

- `min_version: i32`

    Minimum Milvus version compatible with the index.

- `max_version: i32`

    Maximum Milvus version compatible with the index.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `index_name(value)` / `set_index_name(value)` / `get_index_name()` - Sets or returns the index name.
- `index_id(value)` / `set_index_id(value)` / `get_index_id()` - Sets or returns the index ID.
- `field_name(value)` / `set_field_name(value)` / `get_field_name()` - Sets or returns the field name.
- `index_type(value)` / `set_index_type(value)` / `get_index_type()` - Sets or returns the index type.
- `metric_type(value)` / `set_metric_type(value)` / `get_metric_type()` - Sets or returns the metric type.
- `extra_params(value)` / `set_extra_params(value)` / `get_extra_params()` - Sets or returns the extra params.
- `indexed_rows(value)` / `set_indexed_rows(value)` / `get_indexed_rows()` - Sets or returns the indexed rows.
- `total_rows(value)` / `set_total_rows(value)` / `get_total_rows()` - Sets or returns the total rows.
- `pending_rows(value)` / `set_pending_rows(value)` / `get_pending_rows()` - Sets or returns the pending rows.
- `state(value)` / `set_state(value)` / `get_state()` - Sets or returns the build state.
- `failure_reason(value)` / `set_failure_reason(value)` / `get_failure_reason()` - Sets or returns the failure reason.
- `min_version(value)` / `set_min_version(value)` / `get_min_version()` - Sets or returns the minimum version.
- `max_version(value)` / `set_max_version(value)` / `get_max_version()` - Sets or returns the maximum version.

## Example

```rust
let request = DescribeIndexRequest::builder()
    .collection_name("books")
    .index_name("embedding_idx")
    .build()?;
let resp = client.describe_index(request).await?;
for desc in resp.indexes() {
    println!("state: {:?}", desc.get_state());
}
```
