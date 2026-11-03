# ReplicateConfiguration

The replication configuration of a Milvus cluster.

```csharp
public sealed class ReplicateConfiguration
{
    public ReplicateConfiguration(IEnumerable<MilvusCluster> clusters, IEnumerable<CrossClusterTopology>? crossClusterTopologies = null) { ... }
    public IReadOnlyList<MilvusCluster> Clusters { get; }
    public IReadOnlyList<CrossClusterTopology> CrossClusterTopologies { get; }
}
```

**PARAMETERS:**

- `Clusters` (*IReadOnlyList\<MilvusCluster\>*) -

    The clusters participating in replication. See [MilvusCluster](MilvusCluster.md).

- `CrossClusterTopologies` (*IReadOnlyList\<CrossClusterTopology\>*) -

    The cross-cluster topology entries. See [CrossClusterTopology](CrossClusterTopology.md).

**METHODS:**

- `ReplicateConfiguration(IEnumerable<MilvusCluster> clusters, IEnumerable<CrossClusterTopology>? crossClusterTopologies = null)` (*constructor*) -

    Creates a new replication configuration.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});

var configuration = new ReplicateConfiguration(
    clusters:
    [
        new MilvusCluster("cluster-a", "http://cluster-a:19530", "token-a"),
        new MilvusCluster("cluster-b", "http://cluster-b:19530", "token-b")
    ],
    crossClusterTopologies:
    [
        new CrossClusterTopology("cluster-a", "cluster-b")
    ]);

await client.UpdateReplicateConfigurationAsync(new UpdateReplicateConfigurationReq
{
    ReplicateConfiguration = configuration
});
```
