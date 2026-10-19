# CreateIndexAsync()

Creates one or more indexes on a collection; each `Indexes` entry issues its own create-index RPC and, when `Sync` is set, waits for that index to finish building before continuing.

```csharp
public async Task CreateIndexAsync(
    CreateIndexReq request,
    CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new CreateIndexReq
{
    CollectionName = "my_collection",
    Indexes =
    [
        new IndexParam("embedding", indexType: IndexType.AutoIndex, metricType: SimilarityMetricType.Cosine)
    ],
    Sync = true,
    TimeoutMs = 60000
};

await client.CreateIndexAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection.

- `Indexes` (*IReadOnlyList\<IndexParam\>*) -

    The indexes to create, one entry per field/index. Must not be empty. See [IndexParam](IndexParam.md).

- `Sync` (*bool*) -

    Whether to wait until the index is fully built. Defaults to `true`.

- `TimeoutMs` (*long*) -

    The maximum time in milliseconds to wait for each index to build when `Sync` is enabled. Defaults to 60000. A value of 0 means wait forever.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.CreateIndexAsync(new CreateIndexReq
{
    CollectionName = "my_collection",
    Indexes =
    [
        new IndexParam("embedding", indexType: IndexType.AutoIndex, metricType: SimilarityMetricType.Cosine)
    ]
});
```
