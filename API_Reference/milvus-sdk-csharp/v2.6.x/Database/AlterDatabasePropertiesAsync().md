# AlterDatabasePropertiesAsync()

Alters the properties of a database.

```csharp
public async Task AlterDatabasePropertiesAsync(AlterDatabasePropertiesReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AlterDatabasePropertiesReq
{
    DatabaseName = "book_db",
    Properties = { { "database.replica.number", "3" } }
};

await client.AlterDatabasePropertiesAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string*) -

    The name of the database.

- `Properties` (*IDictionary\<string, string\>*) -

    The properties to set or update on the database. Entries are added via the collection-initializer syntax `Properties = { ... }`.

- `DeleteKeys` (*IReadOnlyList\<string\>?*) -

    The names of the properties to remove from the database.

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

await client.AlterDatabasePropertiesAsync(new AlterDatabasePropertiesReq
{
    DatabaseName = "book_db",
    Properties = { { "database.replica.number", "3" } }
});
```
