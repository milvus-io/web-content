# LoadPartitions()

Loads selected partitions into query-node memory. A synchronous request polls load state until completion; an asynchronous request returns once the server accepts the load operation.

```rust
pub async fn load_partitions(
    &self,
    mut request: LoadPartitionsRequest,
) -> Result<()>
```

## Request Syntax

```rust
let request = LoadPartitionsRequest::builder()
    .collection_name("quick_setup")
    .partition_names(["partitionA", "partitionB"])
    .sync(true)
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection. Required.

- `partition_names: Vec<String>`

    Names of the partitions to load. Must contain at least one value. Required.

- `sync: bool`

    Whether to wait until the partitions are fully loaded before returning. Defaults to `true`.

- `replica_number: i32`

    Number of replicas to create. Must be greater than zero. Defaults to `1`.

- `timeout_ms: i64`

    Overall loading wait timeout in milliseconds. A value less than or equal to zero waits indefinitely. Defaults to `60000`.

- `refresh: bool`

    Whether to load newly generated segments from the bulk import interface. Defaults to `false`.

- `load_fields: Vec<String>`

    Names of the fields to load.

- `skip_load_dynamic_field: bool`

    Whether to skip loading the dynamic field. Defaults to `false`.

- `resource_groups: Vec<String>`

    Resource groups the partitions are loaded into; the default resource group is used when empty.

- `load_priority: Option<String>`

    Load priority forwarded as the `load_priority` load param; for example, `"low"` uses a lower priority than the default.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success, or `Error` on failure.

## Example

```rust
let request = LoadPartitionsRequest::builder()
    .collection_name("quick_setup")
    .partition_names(["partitionA", "partitionB"])
    .build()?;
client.load_partitions(request).await?;
```
