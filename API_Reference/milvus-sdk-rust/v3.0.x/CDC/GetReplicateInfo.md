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

**RETURNS:**

*Result\<GetReplicateInfoResponse\>*

`GetReplicateInfoResponse` exposes `checkpoint()`, returning a `ReplicateCheckpoint`, and `salvage_checkpoint()`, returning an optional salvage checkpoint. Returns `Error` on failure.

## Example

```rust
let request = GetReplicateInfoRequest::builder()
    .source_cluster_id("cdc-a")
    .target_physical_channel("cdc-b-rootcoord-dml_0")
    .build()?;
let resp = client.get_replicate_info(request).await?;
println!("checkpoint: {}", resp.checkpoint().get_message_id().get_id());
```
