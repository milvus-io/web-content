# IndexParam

This struct holds the parameters used to create an index for a field.

```rust
pub struct IndexParam
```

**PARAMETERS:**

- `field_name: String`

    Name of the field to index.

- `index_name: String`

    Name of the index.

- `index_type: IndexType`

    Index implementation to use. Defaults to `IndexType::Invalid`.

- `metric_type: Option<MetricType>`

    Distance or similarity metric for the index.

- `extra_params: HashMap<String, String>`

    Additional index parameters, such as `M` or `efConstruction` for HNSW.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `field_name(value)` / `set_field_name(value)` / `get_field_name()` - Sets or returns the field name.
- `index_name(value)` / `set_index_name(value)` / `get_index_name()` - Sets or returns the index name.
- `index_type(value)` / `set_index_type(value)` / `get_index_type()` - Sets or returns the index type.
- `metric_type(value)` / `set_metric_type(value)` / `get_metric_type()` - Sets or returns the metric type.
- `extra_params(value)` / `set_extra_params(value)` / `get_extra_params()` - Sets or returns the extra params.

## Example

```rust
let index = IndexParam::new()
    .field_name("embedding")
    .index_type(IndexType::Hnsw)
    .metric_type(MetricType::Cosine)
    .extra_params(HashMap::from([("M".to_owned(), "16".to_owned())]));

let request = CreateIndexRequest::builder()
    .collection_name("books")
    .index_params(vec![index])
    .build()?;
client.create_index(request).await?;
```
