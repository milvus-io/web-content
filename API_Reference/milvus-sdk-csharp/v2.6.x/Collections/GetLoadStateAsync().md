# GetLoadStateAsync()

Gets the load state of a collection, including the loading progress when the collection is loading.

```csharp
public async Task<GetLoadStateResp> GetLoadStateAsync(GetLoadStateReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetLoadStateReq
{
    CollectionName = "my_collection"
};

GetLoadStateResp result = await client.GetLoadStateAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection.

- `PartitionNames` (*IReadOnlyList\<string\>*) -

    Optional partition names to check the load state of. When empty, the state of the whole collection is returned.

**RETURN TYPE:**

*Task\<GetLoadStateResp\>*

**RETURNS:**

A **GetLoadStateResp** object that contains the load state of the collection.

```csharp
GetLoadStateResp
    State      // -> LoadState
    Progress   // -> long
```

**PARAMETERS:**

- **State** (*LoadState*) -

    The load state of the collection. See [LoadState](../Management/LoadState.md).

- **Progress** (*long*) -

    The loading progress of the collection as a percentage (0-100), populated when the state is `LoadState.Loading` (via the `GetLoadingProgress` RPC) or `LoadState.Loaded` (100). Otherwise 0.

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

GetLoadStateResp result = await client.GetLoadStateAsync(new GetLoadStateReq
{
    CollectionName = "my_collection"
});
```
