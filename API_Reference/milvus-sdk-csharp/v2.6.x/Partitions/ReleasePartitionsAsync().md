# ReleasePartitionsAsync()

Releases specific partitions from memory.

```csharp
public async Task ReleasePartitionsAsync(ReleasePartitionsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ReleasePartitionsReq
{
    CollectionName = "my_collection",
    PartitionNames = ["recent"]
};

await client.ReleasePartitionsAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection that contains the partitions to release.

- `PartitionNames` (*IReadOnlyList\<string\>*) -

    The names of the partitions to release.

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

await client.ReleasePartitionsAsync(new ReleasePartitionsReq
{
    CollectionName = "my_collection",
    PartitionNames = ["recent"]
});
```
