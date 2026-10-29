# DropCollectionFieldAsync()

Drops a field from an existing collection.

```csharp
public async Task DropCollectionFieldAsync(DropCollectionFieldReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropCollectionFieldReq
{
    CollectionName = "my_collection",
    FieldName = "extra_field"
};

await client.DropCollectionFieldAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection to drop the field from.

- `FieldName` (*string?*) -

    The name of the field to drop. Mutually exclusive with `FieldId`: exactly one of the two must be provided.

- `FieldId` (*long?*) -

    The ID of the field to drop. Must be a positive field ID. Mutually exclusive with `FieldName`: exactly one of the two must be provided.

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

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.DropCollectionFieldAsync(new DropCollectionFieldReq
{
    CollectionName = "my_collection",
    FieldName = "extra_field"
});
```
