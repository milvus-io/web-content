# Session()

Creates a session bound to the given cluster ID, scoped to a specific cluster of a global-cluster (Zilliz Cloud) deployment.

A session is a lightweight view of the client that exposes only the DQL query interfaces. Every DQL request issued through the session carries the bound `cluster_id` as a search/query/rank parameter, so the request is routed to the target cluster instead of the client's default routing. The session shares the parent client's connection and caches; `Close` only makes the session unusable and does not disconnect the parent client.

Zilliz Cloud only. Mirrors the `session(clusterId)` of the Java SDK, `Session(clusterId)` of the C++ SDK and `session(cluster_id)` of PyMilvus.

```csharp
public MilvusClientV2Session Session(string clusterId)
```

## Request Syntax

```csharp
MilvusClientV2Session session = client.Session("cluster-abc-123");
```

**PARAMETERS:**

- `clusterId` (*string*) -

    The cluster ID to bind the session to.

**RETURN TYPE:**

*MilvusClientV2Session*

**RETURNS:**

A new session bound to the given cluster. See [MilvusClientV2Session](MilvusClientV2Session.md).

**EXCEPTIONS:**

- `ArgumentException` -

    Thrown when `clusterId` is null or whitespace.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

MilvusClientV2Session session = client.Session("cluster-abc-123");

SearchResp results = await session.SearchAsync(new SearchReq
{
    CollectionName = "my_collection",
    VectorFieldName = "embedding",
    Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f }],
    MetricType = MetricType.L2,
    Limit = 5
});

session.Close();
```
