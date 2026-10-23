# GetRestoreSnapshotStateAsync()

Gets the state of a snapshot restore job.

```csharp
public async Task<GetRestoreSnapshotStateResp> GetRestoreSnapshotStateAsync(GetRestoreSnapshotStateReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetRestoreSnapshotStateReq
{
    JobId = 12345,
};

GetRestoreSnapshotStateResp result = await client.GetRestoreSnapshotStateAsync(request);
```

**REQUEST PARAMETERS:**

- `JobId` (*long*) -

    The ID of the restore job to query, as returned by `RestoreSnapshotAsync()`.

**RETURN TYPE:**

*Task<GetRestoreSnapshotStateResp>*

**RETURNS:**

A **GetRestoreSnapshotStateResp** object returned by the operation.
## Example

{example_call and '```csharp
' + example_call + '
```' or ''}
