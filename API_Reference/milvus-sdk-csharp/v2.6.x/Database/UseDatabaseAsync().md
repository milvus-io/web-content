# UseDatabaseAsync()

Switches the default database for this client.

```csharp
public Task UseDatabaseAsync(UseDatabaseReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new UseDatabaseReq
{
    DatabaseName = "book_db"
};

await client.UseDatabaseAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string*) -

    The name of the database to switch to.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.UseDatabaseAsync(new UseDatabaseReq
{
    DatabaseName = "book_db"
});
```
