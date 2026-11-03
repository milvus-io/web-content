# Ids

A wrapper around an array of IDs returned from a query or search. Can contain either long or string IDs.

```csharp
public readonly struct Ids : IEquatable<Ids>
{
    public IReadOnlyList<long>? LongIds { get; }
    public IReadOnlyList<string>? StringIds { get; }
}
```

**PARAMETERS:**

- `LongIds` (*IReadOnlyList\<long\>?*) -

    The long IDs, or `null` when the primary key is a string.

- `StringIds` (*IReadOnlyList\<string\>?*) -

    The string IDs, or `null` when the primary key is an integer.

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

SearchResp results = await client.SearchAsync(new SearchReq
{
    CollectionName = "my_collection",
    VectorFieldName = "embedding",
    Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f }],
    Limit = 5
});

Ids ids = results.Ids;
foreach (long id in ids.LongIds ?? Array.Empty<long>())
{
    Console.WriteLine(id);
}
```
