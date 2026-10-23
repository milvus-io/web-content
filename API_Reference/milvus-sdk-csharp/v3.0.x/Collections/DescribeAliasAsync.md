# DescribeAliasAsync()

Describes an alias.

```csharp
public async Task<DescribeAliasResp> DescribeAliasAsync(DescribeAliasReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DescribeAliasReq
{
    Alias = "my_collection_alias"
};

DescribeAliasResp result = await client.DescribeAliasAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `Alias` (*string*) -

    The name of the alias to describe.

**RETURN TYPE:**

*Task\<DescribeAliasResp\>*

**RETURNS:**

A **DescribeAliasResp** object that contains the alias information.

```csharp
DescribeAliasResp
    CollectionName   // -> string
    Alias            // -> string
    DatabaseName     // -> string
```

**PARAMETERS:**

- **CollectionName** (*string*) -

    The name of the collection that the alias points to.

- **Alias** (*string*) -

    The name of the alias.

- **DatabaseName** (*string*) -

    The database that contains the collection.

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

DescribeAliasResp result = await client.DescribeAliasAsync(new DescribeAliasReq
{
    Alias = "my_collection_alias"
});
```
