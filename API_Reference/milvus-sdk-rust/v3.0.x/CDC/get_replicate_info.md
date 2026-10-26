# GetReplicateInfo()

Retrieves replication progress and metadata for a CDC channel.

```rust
pub async fn get_replicate_info(
    &self,
    request: GetReplicateInfoRequest,
) -> Result<GetReplicateInfoResponse>
```

## Request Syntax

```rust
let request = GetReplicateInfoRequest::builder()
    .source_cluster_id("cdc-a")
    .target_physical_channel("cdc-b-rootcoord-dml_0")
    .build()?;
```

**REQUEST FIELDS:**

- `source_cluster_id: String`

    ID of the source cluster. Required.

- `target_physical_channel: String`

    Physical channel of the target cluster. Required.

**RETURN TYPE:**

*Result\<GetReplicateInfoResponse\>*

**RETURNS:**

A **GetReplicateInfoResponse** containing the replication checkpoints. Returns an `Error` if the operation fails.

```rust
GetReplicateInfoResponse
    checkpoint() // -> &ReplicateCheckpoint
    salvage_checkpoint() // -> Option<&ReplicateCheckpoint>
```

**METHODS:**

- `checkpoint()` (*&ReplicateCheckpoint*) -

    The replication checkpoint.

    - `get_cluster_id()` (*&str*) -

        The cluster ID of the checkpoint.

    - `get_physical_channel()` (*&str*) -

        The physical channel of the checkpoint.

    - `get_message_id()` (*&ReplicateMessageId*) -

        The message ID of the checkpoint.

        - `get_id()` (*&str*) -

            The message ID.

        - `get_wal_name()` (*WalName*) -

            The WAL name of the message.

    - `get_time_tick()` (*u64*) -

        The time tick of the checkpoint.

- `salvage_checkpoint()` (*Option<&ReplicateCheckpoint>*) -

    The salvage checkpoint, when present.

    - `get_cluster_id()` (*&str*) -

        The cluster ID of the checkpoint.

    - `get_physical_channel()` (*&str*) -

        The physical channel of the checkpoint.

    - `get_message_id()` (*&ReplicateMessageId*) -

        The message ID of the checkpoint.

        - `get_id()` (*&str*) -

            The message ID.

        - `get_wal_name()` (*WalName*) -

            The WAL name of the message.

    - `get_time_tick()` (*u64*) -

        The time tick of the checkpoint.

## Example

```rust
let request = GetReplicateInfoRequest::builder()
    .source_cluster_id("cdc-a")
    .target_physical_channel("cdc-b-rootcoord-dml_0")
    .build()?;
let resp = client.get_replicate_info(request).await?;
println!("checkpoint: {}", resp.checkpoint().get_message_id().get_id());
```
