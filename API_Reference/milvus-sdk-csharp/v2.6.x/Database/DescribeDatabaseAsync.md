# DescribeDatabaseAsync()

Describes a database.

```csharp
public async Task<DescribeDatabaseResp> DescribeDatabaseAsync(DescribeDatabaseReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DescribeDatabaseReq
{
    DatabaseName = "book_db"
};

DescribeDatabaseResp response = await client.DescribeDatabaseAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string*) -

    The name of the database to describe.

**RETURN TYPE:**

*Task\<DescribeDatabaseResp\>*

**RETURNS:**

A **DescribeDatabaseResp** object that contains the database details.

```csharp
DescribeDatabaseResp
    DatabaseName      // -> string
    DbId              // -> long
    CreatedTimestamp  // -> ulong
    Properties        // -> IReadOnlyDictionary<string, string>
```

**PARAMETERS:**

- **DatabaseName** (*string*) -

    The name of the database.

- **DbId** (*long*) -

    The ID of the database.

- **CreatedTimestamp** (*ulong*) -

    The timestamp at which the database was created.

- **Properties** (*IReadOnlyDictionary\<string, string\>*) -

    The properties of the database, keyed by property name.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

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

DescribeDatabaseResp response = await client.DescribeDatabaseAsync(new DescribeDatabaseReq
{
    DatabaseName = "book_db"
});
```
