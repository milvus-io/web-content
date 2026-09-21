# CreateCollection()

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

- `num_partitions: i64`

    Number of partitions to create. Defaults to `0`.

- `num_shards: i32`

    Number of shards for the collection. Defaults to `1`.

- `consistency_level: ConsistencyLevel`

    Default consistency level for reads on the collection. Defaults to `Bounded`.

- `index_params: Vec<IndexParam>`

    Index parameters created together with the collection. Use `index_param()` to add one.

- `properties: HashMap<String, String>`

    Collection properties, such as TTL settings.

**RETURNS:**

*Result\<()\>*

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
