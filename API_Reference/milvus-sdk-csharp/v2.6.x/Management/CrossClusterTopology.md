# CrossClusterTopology

A cross-cluster topology entry describing a replication direction between two clusters.

```csharp
public sealed class CrossClusterTopology
{
    public CrossClusterTopology(string sourceClusterId, string targetClusterId) { ... }
    public string SourceClusterId { get; }
    public string TargetClusterId { get; }
}
```

**PARAMETERS:**

- `SourceClusterId` (*string*) -

    The ID of the source cluster.

- `TargetClusterId` (*string*) -

    The ID of the target cluster.

**METHODS:**

- `CrossClusterTopology(string sourceClusterId, string targetClusterId)` (*constructor*) -

    Creates a new topology entry.

## Example

```csharp
using Milvus.Client.V2.Types;

var topology = new CrossClusterTopology(
    sourceClusterId: "cluster-a",
    targetClusterId: "cluster-b");

var configuration = new ReplicateConfiguration(
    clusters: [new MilvusCluster("cluster-a", "http://cluster-a:19530", "token-a")],
    crossClusterTopologies: [topology]);
```
