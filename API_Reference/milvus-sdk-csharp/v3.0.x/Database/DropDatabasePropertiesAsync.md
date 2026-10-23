# DropDatabasePropertiesAsync()

Drops the properties of a database.

```csharp
public async Task DropDatabasePropertiesAsync(DropDatabasePropertiesReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropDatabasePropertiesReq
{
    DatabaseName = "book_db",
    DeleteKeys = ["database.replica.number"]
};

await client.DropDatabasePropertiesAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string*) -

    The name of the database.

- `DeleteKeys` (*IReadOnlyList\<string\>*) -

    The names of the properties to remove from the database.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

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

await client.DropDatabasePropertiesAsync(new DropDatabasePropertiesReq
{
    DatabaseName = "book_db",
    DeleteKeys = ["database.replica.number"]
});
```
