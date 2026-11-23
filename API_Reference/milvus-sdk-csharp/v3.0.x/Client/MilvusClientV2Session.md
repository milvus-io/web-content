# MilvusClientV2Session

A cluster-scoped view of [MilvusClientV2](MilvusClientV2.md) exposing DQL interfaces only.

All DQL operations issued through a session are routed to the bound cluster (the wire request carries the `cluster_id` search/query/rank parameter, which the proxy uses to route in a global-cluster deployment). The session becomes unusable once `Close` is called; closing it does not disconnect the parent client.

Zilliz Cloud only. Mirrors the `MilvusClientV2Session` of the Java SDK, `MilvusClientV2Session` of the C++ SDK and `MilvusClientSession` of PyMilvus.

```csharp
public sealed class MilvusClientV2Session
{
    public string ClusterId { get; }
    public Task<SearchResp> SearchAsync(SearchReq request, CancellationToken cancellationToken = default)
    public Task<SearchResp> HybridSearchAsync(HybridSearchReq request, CancellationToken cancellationToken = default)
    public Task<QueryResp> QueryAsync(QueryReq request, CancellationToken cancellationToken = default)
    public Task<GetResp> GetAsync(GetReq request, CancellationToken cancellationToken = default)
    public QueryIterator QueryIteratorAsync(QueryIteratorReq request)
    public SearchIterator SearchIteratorAsync(SearchIteratorReq request)
    public void Close()
}
```

A session is obtained from `MilvusClientV2.Session(clusterId)`, which binds it to a specific cluster of a global-cluster (Zilliz Cloud) deployment. The session shares the parent client's connection and caches.

**PARAMETERS:**

- `ClusterId` (*string*) -

    The identifier of the cluster this session is bound to.

**METHODS:**

- `SearchAsync(SearchReq request, CancellationToken cancellationToken = default)` -

    Performs a vector similarity search on the bound cluster. See [SearchAsync](../Vector/SearchAsync.md).

- `HybridSearchAsync(HybridSearchReq request, CancellationToken cancellationToken = default)` -

    Performs a hybrid search on the bound cluster. See [HybridSearchAsync](../Vector/HybridSearchAsync.md).

- `QueryAsync(QueryReq request, CancellationToken cancellationToken = default)` -

    Queries rows by expression on the bound cluster. See [QueryAsync](../Vector/QueryAsync.md).

- `GetAsync(GetReq request, CancellationToken cancellationToken = default)` -

    Fetches rows by primary key on the bound cluster. See [GetAsync](../Vector/GetAsync.md).

- `QueryIteratorAsync(QueryIteratorReq request)` -

    Creates a query iterator on the bound cluster. See [QueryIteratorAsync](../Vector/QueryIteratorAsync.md).

- `SearchIteratorAsync(SearchIteratorReq request)` -

    Creates a search iterator on the bound cluster. See [SearchIteratorAsync](../Vector/SearchIteratorAsync.md).

- `Close()` -

    Closes this session. Any subsequent operation on the session fails with `MilvusException`; the parent client is left untouched. Query/search iterators created before `Close` are unaffected: they hold the parent client and the bound cluster id directly, so they keep routing to the cluster while they are being consumed.

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
