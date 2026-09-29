# UpdateReplicateConfiguration()

Updates the CDC replication configuration for the current database. Use it to change cluster definitions or cross-cluster topology.

```rust
pub async fn update_replicate_configuration(
    &self,
    request: UpdateReplicateConfigurationRequest,
) -> Result<()>
```

## Request Syntax

```rust
let configuration = ReplicateConfiguration::new()
    .add_cluster(
        ReplicateCluster::new()
            .cluster_id("cdc-a")
            .uri("http://localhost:19530")
            .physical_channels(["cdc-a-rootcoord-dml_0"]),
    )
    .add_topology(
        CrossClusterTopology::new()
            .source_cluster_id("cdc-a")
            .target_cluster_id("cdc-b"),
    );
let request = UpdateReplicateConfigurationRequest::builder()
    .configuration(configuration)
    .build()?;
```

**REQUEST FIELDS:**

- `configuration: ReplicateConfiguration`

    The desired replication configuration, including clusters and cross-cluster topology. Required.

- `force_promote: bool`

    Whether the update should force promotion during replication configuration changes. Defaults to `false`.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success, or `Error` on failure.

## Example

```rust
let request = UpdateReplicateConfigurationRequest::builder()
    .configuration(configuration)
    .build()?;
client.update_replicate_configuration(request).await?;
```
