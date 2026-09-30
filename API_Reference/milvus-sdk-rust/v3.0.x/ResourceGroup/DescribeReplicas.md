# DescribeReplicas()

Returns the replica information of a loaded collection.

```rust
pub async fn describe_replicas(&self, request: DescribeReplicasRequest) -> Result<DescribeReplicasResponse>
```

## Request Syntax

```rust
let request = DescribeReplicasRequest::builder()
    .collection_name("books")
    .with_shard_nodes(true)
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the loaded collection whose replicas to describe. Required.

- `with_shard_nodes: bool`

    Whether to include the shard-node details of each replica. Defaults to `false`.

**RETURNS:**

*Result\<DescribeReplicasResponse\>*

`DescribeReplicasResponse` exposes `replicas()` returning a slice of `ReplicaInfo`, each describing one replica of the collection (replica ID, collection ID, partition IDs, and shards). Returns an `Error` on failure.

## Example

```rust
let request = DescribeReplicasRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.describe_replicas(request).await?;
for replica in resp.replicas() {
    println!("replica_id: {}", replica.get_replica_id());
}
```
