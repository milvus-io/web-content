# CreateDatabaseAsync()

Creates a database.

```csharp
public async Task CreateDatabaseAsync(CreateDatabaseReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new CreateDatabaseReq
{
    DatabaseName = "book_db",
    Properties = { { "database.replica.number", "3" } }
};

await client.CreateDatabaseAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string*) -

    The name of the database to create.

- `Properties` (*IDictionary\<string, string\>*) -

    Database-level properties applied at creation time. Entries are added via the collection-initializer syntax `Properties = { ... }`.

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

await client.CreateDatabaseAsync(new CreateDatabaseReq
{
    DatabaseName = "book_db",
    Properties = { { "database.replica.number", "3" } }
});
```
