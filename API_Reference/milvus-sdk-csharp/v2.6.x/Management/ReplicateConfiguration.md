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
