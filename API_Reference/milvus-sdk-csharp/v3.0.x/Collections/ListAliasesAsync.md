# ListAliasesAsync()

Lists the aliases, optionally filtered by collection.

```csharp
public async Task<ListAliasesResp> ListAliasesAsync(ListAliasesReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListAliasesReq
{
    CollectionName = "my_collection"
};

ListAliasesResp result = await client.ListAliasesAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string?*) -

    The name of the collection whose aliases to list. When `null`, the aliases of all collections are returned.

**RETURN TYPE:**

*Task\<ListAliasesResp\>*

**RETURNS:**

A **ListAliasesResp** object that contains the aliases of the requested collection or collections.

```csharp
ListAliasesResp
    CollectionName   // -> string
    DatabaseName     // -> string
    Aliases          // -> IReadOnlyList<string>
```

**PARAMETERS:**

- **CollectionName** (*string*) -

    The name of the collection whose aliases are listed.

- **DatabaseName** (*string*) -

    The database that contains the collection.

- **Aliases** (*IReadOnlyList\<string\>*) -

    The aliases of the requested collection or collections.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Aliases;
using Milvus.Client.V2.Responses.Aliases;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

ListAliasesResp result = await client.ListAliasesAsync(new ListAliasesReq
{
    CollectionName = "my_collection"
});
```
