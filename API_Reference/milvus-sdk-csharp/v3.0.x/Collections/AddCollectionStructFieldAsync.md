# AddCollectionStructFieldAsync()

Adds a struct field to an existing collection.

```csharp
public async Task AddCollectionStructFieldAsync(AddCollectionStructFieldReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AddCollectionStructFieldReq
{
    CollectionName = "my_collection",
    StructField = new StructFieldSchema("address")
};

await client.AddCollectionStructFieldAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection to add the struct field to.

- `StructField` (*StructFieldSchema*) -

    The struct field to add to the existing collection, mirroring the Java/C++/Rust SDKs. See [StructFieldSchema](StructFieldSchema.md).

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

await client.AddCollectionStructFieldAsync(new AddCollectionStructFieldReq
{
    CollectionName = "my_collection",
    StructField = new StructFieldSchema("address")
});
```
