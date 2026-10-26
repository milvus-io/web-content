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
    CollectionName = "my_collection",
};

DescribeSnapshotResp result = await client.DescribeSnapshotAsync(request);
```

**REQUEST PARAMETERS:**

- `Name` (*string*) -

    The name of the snapshot to describe.

- `CollectionName` (*string*) -

    The name of the collection the snapshot belongs to.

**RETURN TYPE:**

*Task<DescribeSnapshotResp>*

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

## Example

{example_call and '```csharp
' + example_call + '
```' or ''}
