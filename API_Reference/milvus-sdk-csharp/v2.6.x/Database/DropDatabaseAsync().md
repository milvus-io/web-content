# DropDatabaseAsync()

Drops a database.

```csharp
public async Task DropDatabaseAsync(DropDatabaseReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropDatabaseReq
{
    DatabaseName = "book_db"
};

await client.DropDatabaseAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string*) -

    The name of the database to drop.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Database;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.DropDatabaseAsync(new DropDatabaseReq
{
    DatabaseName = "book_db"
});
```
