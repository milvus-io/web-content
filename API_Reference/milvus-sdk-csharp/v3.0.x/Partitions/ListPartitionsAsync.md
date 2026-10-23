# ListPartitionsAsync()

Lists the partitions of a collection.

```csharp
public async Task<ListPartitionsResp> ListPartitionsAsync(ListPartitionsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListPartitionsReq
{
    CollectionName = "my_collection"
};

ListPartitionsResp response = await client.ListPartitionsAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to list the partitions of.

**RETURN TYPE:**

*Task\<ListPartitionsResp\>*

**RETURNS:**

A **ListPartitionsResp** object that contains the list of partitions.

```csharp
ListPartitionsResp
    PartitionNames       // -> IReadOnlyList<string>
    PartitionIds         // -> IReadOnlyList<long>
    CreatedTimestamps    // -> IReadOnlyList<ulong>
    CreatedUtcTimestamps // -> IReadOnlyList<ulong>
    InMemoryPercentages  // -> IReadOnlyList<long>
```

**PARAMETERS:**

- **PartitionNames** (*IReadOnlyList\<string\>*) -

    The names of the partitions in the collection.

- **PartitionIds** (*IReadOnlyList\<long\>*) -

    The IDs of the partitions in the collection.

- **CreatedTimestamps** (*IReadOnlyList\<ulong\>*) -

    The hybrid timestamps at which the partitions were created, aligned with `PartitionNames`.

- **CreatedUtcTimestamps** (*IReadOnlyList\<ulong\>*) -

    The UTC timestamps at which the partitions were created, aligned with `PartitionNames`.

- **InMemoryPercentages** (*IReadOnlyList\<long\>*) -

    The percentage of each partition loaded into memory, aligned with `PartitionNames`.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

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

ListPartitionsResp response = await client.ListPartitionsAsync(new ListPartitionsReq
{
    CollectionName = "my_collection"
});
```
