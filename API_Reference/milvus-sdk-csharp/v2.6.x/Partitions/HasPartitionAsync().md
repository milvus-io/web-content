# HasPartitionAsync()

Checks whether a partition exists in a collection.

```csharp
public async Task<HasPartitionResp> HasPartitionAsync(HasPartitionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new HasPartitionReq
{
    CollectionName = "my_collection",
    PartitionName = "recent"
};

HasPartitionResp response = await client.HasPartitionAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection that the partition belongs to.

- `PartitionName` (*string*) -

    The name of the partition to check.

**RETURN TYPE:**

*Task\<HasPartitionResp\>*

**RETURNS:**

A **HasPartitionResp** object that indicates whether the partition exists.

```csharp
HasPartitionResp
    Has   // -> bool
```

**PARAMETERS:**

- **Has** (*bool*) -

    Whether the partition exists in the collection.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Partition;
using Milvus.Client.V2.Responses.Partition;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

HasPartitionResp response = await client.HasPartitionAsync(new HasPartitionReq
{
    CollectionName = "my_collection",
    PartitionName = "recent"
});
```
