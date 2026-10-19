# ListDatabasesAsync()

Lists all databases.

```csharp
public async Task<ListDatabasesResp> ListDatabasesAsync(ListDatabasesReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListDatabasesReq();

ListDatabasesResp response = await client.ListDatabasesAsync(request);
```

**REQUEST PARAMETERS:**

`ListDatabasesReq` has no parameters.

**RETURN TYPE:**

*Task\<ListDatabasesResp\>*

**RETURNS:**

A **ListDatabasesResp** object that contains the list of databases in the cluster.

```csharp
ListDatabasesResp
    DatabaseNames      // -> IReadOnlyList<string>
    CreatedTimestamps  // -> IReadOnlyList<ulong>
    DatabaseIds        // -> IReadOnlyList<long>
```

**PARAMETERS:**

- **DatabaseNames** (*IReadOnlyList\<string\>*) -

    The names of the databases in the cluster.

- **CreatedTimestamps** (*IReadOnlyList\<ulong\>*) -

    The hybrid timestamps at which the databases were created, aligned with `DatabaseNames`.

- **DatabaseIds** (*IReadOnlyList\<long\>*) -

    The ids of the databases, aligned with `DatabaseNames`.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Database;
using Milvus.Client.V2.Responses.Database;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

ListDatabasesResp response = await client.ListDatabasesAsync(new ListDatabasesReq());
```
