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

    Whether to include the shard-node details of each replica. Defaults to `true`.

**RETURN TYPE:**

*Result\<DescribeReplicasResponse\>*

**RETURNS:**

A **DescribeReplicasResponse** containing the replica information. Returns an `Error` if the operation fails.

```rust
DescribeReplicasResponse
    replicas() // -> &[ReplicaInfo]
```

**METHODS:**

- `replicas()` (*&[ReplicaInfo]*) -

    The replica information for the collection.

    - `get_replica_id()` (*i64*) -

        The ID of the replica.

    - `get_collection_id()` (*i64*) -

        The ID of the collection the replica serves.

    - `get_partition_ids()` (*&[i64]*) -

        The IDs of the partitions covered by the replica.

    - `get_shards()` (*&[ShardReplica]*) -

        The shards of the replica.

        - `get_leader_id()` (*i64*) -

            The ID of the leader node of the shard.

        - `get_leader_address()` (*&str*) -

            The address of the leader node of the shard.

        - `get_channel_name()` (*&str*) -

            The name of the channel the shard subscribes to.

        - `get_node_ids()` (*&[i64]*) -

            The IDs of the nodes hosting the shard replica.

    - `get_node_ids()` (*&[i64]*) -

        The IDs of the nodes hosting the replica.

    - `get_resource_group()` (*&str*) -

        The resource group the replica belongs to.

    - `get_outbound_nodes()` (*&HashMap<String, i32>*) -

        The outbound node count per resource group.

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
