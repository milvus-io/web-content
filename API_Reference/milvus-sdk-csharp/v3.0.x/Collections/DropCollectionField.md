# DropCollectionField

Drops a field from an existing collection.

```csharp
public async Task DropCollectionFieldAsync(DropCollectionFieldReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropCollectionFieldReq
{
    DatabaseName = null,
    CollectionName = "value",
    FieldName = null,
    FieldId = 0,
};

await client.DropCollectionFieldAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection to drop the field from.

- `FieldName` (*string?*) -

    The name of the field to drop. Mutually exclusive with <see cref="FieldId" />: exactly one of the two must be provided.

- `FieldId` (*long?*) -

    The id of the field to drop. Must be a positive field id. Mutually exclusive with <see cref="FieldName" />: exactly one of the two must be provided.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

await client.DropCollectionFieldAsync(new DropCollectionFieldReq
{
    DatabaseName = null,
    CollectionName = "value",
    FieldName = null,
    FieldId = 0,
});
```
