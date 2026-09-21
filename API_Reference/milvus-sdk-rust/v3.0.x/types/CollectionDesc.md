# CollectionDesc

This struct describes the schema and metadata of a collection, as returned by describe collection operations.

```rust
pub struct CollectionDesc
```

**PARAMETERS:**

- `database_name: String`

    Name of the database that holds the collection.

- `collection_name: String`

    Name of the collection.

- `description: String`

    Description of the collection.

- `num_partitions: i64`

    Number of partitions in the collection.

- `field_names: Vec<String>`

    Names of all fields in the collection schema.

- `vector_field_names: Vec<String>`

    Names of all vector fields in the collection schema.

- `primary_field_name: String`

    Name of the primary-key field.

- `enable_dynamic_field: bool`

    Whether the dynamic field is enabled. Defaults to `true`.

- `auto_id: bool`

    Whether the primary key is auto-generated. Defaults to `false`.

- `num_shards: i64`

    Number of shards. Defaults to `1`.

- `schema: CollectionSchema`

    The collection schema.

- `collection_id: i64`

    ID of the collection.

- `aliases: Vec<String>`

    Aliases of the collection.

- `created_time: u64`

    Creation timestamp of the collection.

- `created_utc_time: u64`

    UTC creation timestamp of the collection.

- `update_time: u64`

    Last update timestamp of the collection.

- `consistency_level: ConsistencyLevel`

    Default consistency level of the collection.

- `properties: HashMap<String, String>`

    Collection properties.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `database_name(value)` / `set_database_name(value)` / `get_database_name()` - Sets or returns the database name.
- `collection_name(value)` / `set_collection_name(value)` / `get_collection_name()` - Sets or returns the collection name.
- `description(value)` / `set_description(value)` / `get_description()` - Sets or returns the description.
- `num_partitions(value)` / `set_num_partitions(value)` / `get_num_partitions()` - Sets or returns the partition count.
- `field_names(value)` / `set_field_names(value)` / `get_field_names()` - Sets or returns the field names.
- `add_field_name(value)` - Appends a field name.
- `vector_field_names(value)` / `set_vector_field_names(value)` / `get_vector_field_names()` - Sets or returns the vector field names.
- `add_vector_field_name(value)` - Appends a vector field name.
- `primary_field_name(value)` / `set_primary_field_name(value)` / `get_primary_field_name()` - Sets or returns the primary-field name.
- `enable_dynamic_field(value)` / `set_enable_dynamic_field(value)` / `is_dynamic_field_enabled()` - Sets or returns whether the dynamic field is enabled.
- `auto_id(value)` / `set_auto_id(value)` / `get_auto_id()` - Sets or returns whether the primary key is auto-generated.
- `num_shards(value)` / `set_num_shards(value)` / `get_num_shards()` - Sets or returns the shard count.
- `schema(value)` / `set_schema(value)` / `get_schema()` - Sets or returns the collection schema.
- `collection_id(value)` / `set_collection_id(value)` / `get_collection_id()` - Sets or returns the collection ID.
- `aliases(value)` / `set_aliases(value)` / `get_aliases()` - Sets or returns the aliases.
- `add_alias(value)` - Appends an alias.
- `created_time(value)` / `set_created_time(value)` / `get_created_time()` - Sets or returns the creation timestamp.
- `created_utc_time(value)` / `set_created_utc_time(value)` / `get_created_utc_time()` - Sets or returns the UTC creation timestamp.
- `update_time(value)` / `set_update_time(value)` / `get_update_time()` - Sets or returns the update timestamp.
- `consistency_level(value)` / `set_consistency_level(value)` / `get_consistency_level()` - Sets or returns the consistency level.
- `consistency_level_name()` - Returns the consistency level as a string.
- `properties(value)` / `set_properties(value)` / `get_properties()` - Sets or returns the properties.
- `get_external_source()` - Returns the external source of the underlying schema.
- `get_external_spec()` - Returns the external spec of the underlying schema.

## Example

```rust
let request = DescribeCollectionRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.describe_collection(request).await?;
let desc = resp.description();
println!("{}", desc.get_collection_name());
```
