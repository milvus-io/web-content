# UpdateReplicateConfigurationAsync()

Updates the replication configuration of a cluster.

```csharp
public async Task<UpdateReplicateConfigurationResp> UpdateReplicateConfigurationAsync(
    UpdateReplicateConfigurationReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new UpdateReplicateConfigurationReq
{
    ReplicateConfiguration = new ReplicateConfiguration(
        clusters: [new MilvusCluster("cluster1", "http://10.0.0.1:19530")],
        crossClusterTopologies: [new CrossClusterTopology("cluster1", "cluster2")]),
    ForcePromote = false
};

UpdateReplicateConfigurationResp result = await client.UpdateReplicateConfigurationAsync(request);
```

**REQUEST PARAMETERS:**

- `ReplicateConfiguration` (*ReplicateConfiguration*) -

    The replication configuration to apply. See [ReplicateConfiguration](ReplicateConfiguration.md).

- `ForcePromote` (*bool*) -

    When set, the current cluster is promoted to primary forcefully. Intended for failover scenarios.

**RETURN TYPE:**

*Task\<UpdateReplicateConfigurationResp\>*

**RETURNS:**

An **UpdateReplicateConfigurationResp** object representing the result of the operation. It has no members.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.UpdateReplicateConfigurationAsync(new UpdateReplicateConfigurationReq
{
    ReplicateConfiguration = new ReplicateConfiguration(
        clusters: [new MilvusCluster("cluster1", "http://10.0.0.1:19530")],
        crossClusterTopologies: [new CrossClusterTopology("cluster1", "cluster2")])
});
```
