# ReplicateConfiguration

The replication configuration of a Milvus cluster. Related types (`MilvusCluster`, `CrossClusterTopology`) are documented in the sections below.

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

    The clusters participating in replication. See [MilvusCluster](#milvuscluster).

- `CrossClusterTopologies` (*IReadOnlyList\<CrossClusterTopology\>*) -

    The cross-cluster topology entries. See [CrossClusterTopology](#crossclustertopology).

**METHODS:**

- `ReplicateConfiguration(IEnumerable<MilvusCluster> clusters, IEnumerable<CrossClusterTopology>? crossClusterTopologies = null)` (*constructor*) -

    Creates a new replication configuration.

## MilvusCluster

A Milvus cluster participating in cross-cluster replication.

```csharp
public sealed class MilvusCluster
{
    public MilvusCluster(string clusterId, string uri, string token = "", IEnumerable<string>? pchannels = null) { ... }
    public string ClusterId { get; }
    public string Uri { get; }
    public string Token { get; }
    public IReadOnlyList<string> Pchannels { get; }
}
```

**PARAMETERS:**

- `ClusterId` (*string*) -

    The ID of the cluster.

- `Uri` (*string*) -

    The connection URI of the cluster.

- `Token` (*string*) -

    The connection token of the cluster.

- `Pchannels` (*IReadOnlyList\<string\>*) -

    The physical channels replicated from this cluster.

**METHODS:**

- `MilvusCluster(string clusterId, string uri, string token = "", IEnumerable<string>? pchannels = null)` (*constructor*) -

    Creates a new cluster definition.

## CrossClusterTopology

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
