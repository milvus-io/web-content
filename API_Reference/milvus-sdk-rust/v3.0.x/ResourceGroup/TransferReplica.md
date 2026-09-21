# TransferReplica()

Transfers collection replicas from one resource group to another.

```rust
pub async fn transfer_replica(&self, request: TransferReplicaRequest) -> Result<()>
```

## Request Syntax

```rust
let request = TransferReplicaRequest::builder()
    .collection_name("books")
    .source_group("group_1")
    .target_group("group_2")
    .replica_count(1)
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: String`

    Name of the database that owns the collection.

- `collection_name: String`

    Name of the collection whose replicas are transferred. Required.

- `source_group: String`

    Name of the resource group the replicas are transferred from. Required.

- `target_group: String`

    Name of the resource group the replicas are transferred to. Required.

- `replica_count: i64`

    Number of replicas to transfer. Must be greater than zero.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = TransferReplicaRequest::builder()
    .collection_name("books")
    .source_group("group_1")
    .target_group("group_2")
    .replica_count(1)
    .build()?;
client.transfer_replica(request).await?;
```
