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

**RETURN TYPE:**

*Result\<GetReplicateConfigurationResponse\>*

**RETURNS:**

A **GetReplicateConfigurationResponse** containing the replication configuration. Returns an `Error` if the operation fails.

```rust
GetReplicateConfigurationResponse
    configuration() // -> &ReplicateConfiguration
```

**METHODS:**

- `configuration()` (*&ReplicateConfiguration*) -

    The replication configuration.

    - `get_clusters()` (*&[ReplicateCluster]*) -

        The replication clusters.

        - `get_cluster_id()` (*&str*) -

            The ID of the cluster.

        - `get_uri()` (*&str*) -

            The URI of the cluster.

        - `get_token()` (*&str*) -

            The authentication token for the cluster.

        - `get_physical_channels()` (*&[String]*) -

            The physical channels replicated from the cluster.

    - `get_topology()` (*&[CrossClusterTopology]*) -

        The cross-cluster replication topology.

        - `get_source_cluster_id()` (*&str*) -

            The ID of the source cluster.

        - `get_target_cluster_id()` (*&str*) -

            The ID of the target cluster.

## Example

```rust
let request = GetReplicateConfigurationRequest::builder().build()?;
let resp = client.get_replicate_configuration(request).await?;
for cluster in resp.configuration().get_clusters() {
    println!("clusterId={}", cluster.get_cluster_id());
}
```
