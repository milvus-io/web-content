# DropPartitionAsync()

Drops a partition from a collection.

```csharp
public async Task DropPartitionAsync(DropPartitionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropPartitionReq
{
    CollectionName = "my_collection",
    PartitionName = "recent"
};

await client.DropPartitionAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection that contains the partition to drop.

- `PartitionName` (*string*) -

    The name of the partition to drop.

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

await client.DropPartitionAsync(new DropPartitionReq
{
    CollectionName = "my_collection",
    PartitionName = "recent"
});
```
