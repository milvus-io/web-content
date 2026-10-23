# MilvusCluster

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
