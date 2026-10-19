# CreatePartitionAsync()

Creates a partition in a collection.

```csharp
public async Task CreatePartitionAsync(CreatePartitionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new CreatePartitionReq
{
    CollectionName = "my_collection",
    PartitionName = "recent"
};

await client.CreatePartitionAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to create the partition in.

- `PartitionName` (*string*) -

    The name of the partition to create.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Partition;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.CreatePartitionAsync(new CreatePartitionReq
{
    CollectionName = "my_collection",
    PartitionName = "recent"
});
```
