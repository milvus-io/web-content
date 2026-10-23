# ListSnapshotsAsync()

Lists the snapshots of a collection, or all snapshots when no collection is given.

```csharp
public async Task<ListSnapshotsResp> ListSnapshotsAsync(ListSnapshotsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListSnapshotsReq
{
    CollectionName = "my_collection",
};

ListSnapshotsResp result = await client.ListSnapshotsAsync(request);
```

**REQUEST PARAMETERS:**

- `CollectionName` (*string*) - [REQUIRED]

    The name of the collection to list snapshots for. When empty, all snapshots are listed.

**RETURN TYPE:**

*Task<ListSnapshotsResp>*

**RETURNS:**

A **ListSnapshotsResp** object returned by the operation.
## Example

{example_call and '```csharp
' + example_call + '
```' or ''}
