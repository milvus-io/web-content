# AddCollectionFieldAsync()

Adds a field to a collection's schema.

```csharp
public async Task AddCollectionFieldAsync(AddCollectionFieldReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AddCollectionFieldReq
{
    CollectionName = "my_collection",
    Field = FieldSchema.CreateVarchar("category", maxLength: 128, nullable: true)
};

await client.AddCollectionFieldAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to add the field to.

- `Field` (*FieldSchema*) -

    The schema of the field to add. The field must be nullable or have a default value. See [FieldSchema](FieldSchema.md).

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
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.AddCollectionFieldAsync(new AddCollectionFieldReq
{
    CollectionName = "my_collection",
    Field = FieldSchema.CreateVarchar("category", maxLength: 128, nullable: true)
});
```
