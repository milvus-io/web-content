# DescribeSnapshotAsync()

Gets detailed information about a specific snapshot.

```csharp
public async Task<DescribeSnapshotResp> DescribeSnapshotAsync(DescribeSnapshotReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DescribeSnapshotReq
{
    SnapshotName = "snapshot_1",
    CollectionName = "my_collection"
};

DescribeSnapshotResp result = await client.DescribeSnapshotAsync(request);
```

**REQUEST PARAMETERS:**

- `SnapshotName` (*string*) -

    The name of the snapshot to describe.

- `CollectionName` (*string*) -

    The name of the collection the snapshot belongs to.

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

**RETURN TYPE:**

*Task\<DescribeSnapshotResp\>*

**RETURNS:**

A **DescribeSnapshotResp** object.

- `Name` (*string*) -

    The name of the snapshot.

- `Description` (*string*) -

    The description of the snapshot.

- `CollectionName` (*string*) -

    The name of the collection the snapshot belongs to.

- `PartitionNames` (*IReadOnlyList\<string\>*) -

    The names of the partitions included in the snapshot.

- `CreateTs` (*long*) -

    The creation timestamp of the snapshot.

- `S3Location` (*string*) -

    The S3 location of the snapshot data.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Snapshot;
using Milvus.Client.V2.Responses.Snapshot;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

DescribeSnapshotResp result = await client.DescribeSnapshotAsync(new DescribeSnapshotReq
{
    SnapshotName = "snapshot_1",
    CollectionName = "my_collection"
});
```
