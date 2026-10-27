# create_collection()

Creates a collection and, optionally, its indexes and load state.

```rust
pub async fn create_collection(&self, request: impl Into<CreateCollectionRequest>) -> Result<()>
```

## Request Syntax

```rust
let request = CreateCollectionRequest::builder()
    .collection_name("books")
    .schema(
        CollectionSchema::new()
            .add_field(FieldSchema::new().name("id").data_type(DataType::Int64).primary_key(true))
            .add_field(FieldSchema::new().name("embedding").data_type(DataType::FloatVector).dimension(4)),
    )
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to create. Required.

- `description: Option<String>`

    Optional description of the collection.

- `schema: Option<CollectionSchema>`

    The collection schema, including its fields. Must contain exactly one primary-key field. Required.

    Struct fields are configured with `StructFieldSchema`; use `type_param()` for struct-level parameters such as `mmap.enabled` and `warmup`.

- `num_partitions: i64`

    Number of partitions to create. Defaults to `0`.

- `num_shards: i32`

    Number of shards for the collection. Defaults to `1`.

- `consistency_level: ConsistencyLevel`

    Default consistency level for reads on the collection. Defaults to `Bounded`. See [ConsistencyLevel](ConsistencyLevel.md).

- `index_params: Vec<IndexParam>`

    Index parameters created together with the collection. Use `index_param()` to add one. See [IndexParam](IndexParam.md).

- `properties: HashMap<String, String>`

    Collection properties, such as TTL settings.

### Simple collection request syntax

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

Returns an empty result indicating success. When index parameters are supplied, index creation and loading continue as asynchronous follow-up operations. Returns `Error` on failure.

## Example

```rust
let request = CreateCollectionRequest::builder()
    .collection_name("books")
    .schema(
        CollectionSchema::new()
            .add_field(FieldSchema::new().name("id").data_type(DataType::Int64).primary_key(true))
            .add_field(FieldSchema::new().name("embedding").data_type(DataType::FloatVector).dimension(4)),
    )
    .build()?;
client.create_collection(request).await?;
```
