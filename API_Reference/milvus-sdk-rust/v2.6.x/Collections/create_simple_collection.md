# CreateSimpleCollection()

Creates a collection with a simplified schema: one primary-key field and one float vector field.

```rust
pub async fn create_collection(&self, request: impl Into<CreateCollectionRequest>) -> Result<()>
```

## Request Syntax

```rust
let request = CreateSimpleCollectionRequest::builder()
    .collection_name("quick_setup")
    .dimension(128)
    .metric_type(MetricType::Cosine)
    .build()?;
```

The `CreateSimpleCollectionRequest` is converted into a `CreateCollectionRequest` before dispatch, so it is passed to the same `create_collection` method.

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to create. Required.

- `dimension: u32`

    Dimension of the float vector field. Must be greater than zero.

- `primary_field: String`

    Name of the primary-key field. Defaults to `id`.

- `primary_field_type: DataType`

    Data type of the primary key; must be `Int64` or `VarChar`. Defaults to `Int64`. See [DataType](DataType.md).

- `max_length: u32`

    Maximum length of a `VarChar` primary key. Defaults to `65535`.

- `vector_field: String`

    Name of the float vector field. Defaults to `vector`.

- `auto_id: bool`

    Whether primary keys are auto-generated. Defaults to `false`.

- `enable_dynamic_field: bool`

    Whether dynamic fields are enabled. Defaults to `true`.

- `consistency_level: ConsistencyLevel`

    Default consistency level for reads on the collection. Defaults to `Bounded`. See [ConsistencyLevel](ConsistencyLevel.md).

- `metric_type: MetricType`

    Metric type used by the AutoIndex created on the vector field. Defaults to `Cosine`. See [MetricType](../Management/MetricType.md).

**RETURN TYPE:**

*Result\<()\>*

**RETURNS:**

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = CreateSimpleCollectionRequest::builder()
    .collection_name("quick_setup")
    .dimension(128)
    .metric_type(MetricType::Cosine)
    .build()?;
client.create_collection(request).await?;
```
