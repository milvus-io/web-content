# DropAliasAsync()

Drops an alias.

```csharp
public async Task DropAliasAsync(DropAliasReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropAliasReq
{
    Alias = "my_collection_alias"
};

await client.DropAliasAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `Alias` (*string*) -

    The name of the alias to drop.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Aliases;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.DropAliasAsync(new DropAliasReq
{
    Alias = "my_collection_alias"
});
```
