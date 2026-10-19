# HasCollectionAsync()

Checks whether a collection exists.

```csharp
public async Task<HasCollectionResp> HasCollectionAsync(HasCollectionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new HasCollectionReq
{
    CollectionName = "my_collection"
};

HasCollectionResp result = await client.HasCollectionAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to check.

**RETURN TYPE:**

*Task\<HasCollectionResp\>*

**RETURNS:**

A **HasCollectionResp** object that indicates whether the collection exists.

```csharp
HasCollectionResp
    Has    // -> bool
```

**PARAMETERS:**

- **Has** (*bool*) -

    Whether the collection exists.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Responses.Collection;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

HasCollectionResp result = await client.HasCollectionAsync(new HasCollectionReq
{
    CollectionName = "my_collection"
});
```
