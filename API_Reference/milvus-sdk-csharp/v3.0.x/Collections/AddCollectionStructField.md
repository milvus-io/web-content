# AddCollectionStructField

Adds a struct field to an existing collection.

```csharp
public async Task AddCollectionStructFieldAsync(AddCollectionStructFieldReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AddCollectionStructFieldReq
{
    DatabaseName = null,
    CollectionName = "value",
    StructField = 0,
};

await client.AddCollectionStructFieldAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used, matching the Java/C++ SDKs' request-level database override.

- `CollectionName` (*string*) -

    The name of the collection to add the struct field to.

- `StructField` (*StructFieldSchema*) -

    The schema of the struct field to add. The struct field must be nullable: Milvus only accepts a nullable struct field when adding it to an existing collection, mirroring the Java/C++/Rust SDKs.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

await client.AddCollectionStructFieldAsync(new AddCollectionStructFieldReq
{
    DatabaseName = null,
    CollectionName = "value",
    StructField = 0,
});
```
