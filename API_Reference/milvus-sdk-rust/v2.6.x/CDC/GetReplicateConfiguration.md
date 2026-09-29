# GetReplicateConfiguration()

Retrieves the current CDC replication configuration. Use it to inspect configured clusters and replication topology.

```rust
pub async fn get_replicate_configuration(
    &self,
    request: GetReplicateConfigurationRequest,
) -> Result<GetReplicateConfigurationResponse>
```

## Request Syntax

```rust
let request = GetReplicateConfigurationRequest::builder().build()?;
```

**RETURNS:**

*Result\<GetReplicateConfigurationResponse\>*

`GetReplicateConfigurationResponse` exposes `configuration()`, returning a `ReplicateConfiguration` holding the clusters and topology. Returns `Error` on failure.

## Example

```rust
let request = GetReplicateConfigurationRequest::builder().build()?;
let resp = client.get_replicate_configuration(request).await?;
for cluster in resp.configuration().get_clusters() {
    println!("clusterId={}", cluster.get_cluster_id());
}
```
