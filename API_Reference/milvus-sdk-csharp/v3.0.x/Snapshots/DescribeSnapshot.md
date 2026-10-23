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

- `SnapshotName` (*string*) -

    The name of the snapshot to describe.

- `CollectionName` (*string*) -

    The name of the collection the snapshot belongs to.

**RETURN TYPE:**

*Task<DescribeSnapshotResp>*

**RETURNS:**

A **DescribeSnapshotResp** object returned by the operation.
## Example

{example_call and '```csharp
' + example_call + '
```' or ''}
