# RestoreSnapshotAsync()

Restores a snapshot to the source collection.

```csharp
public async Task<RestoreSnapshotResp> RestoreSnapshotAsync(RestoreSnapshotReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new RestoreSnapshotReq
{
    SnapshotName = "snapshot_1",
    SourceCollectionName = "my_collection",
};

RestoreSnapshotResp result = await client.RestoreSnapshotAsync(request);
```

**REQUEST PARAMETERS:**

- `Name` (*string*) -

    The name of the snapshot to restore.

- `SourceCollectionName` (*string*) -

    The name of the source collection the snapshot belongs to.

**RETURN TYPE:**

*Task<RestoreSnapshotResp>*

**RETURNS:**

A **RestoreSnapshotResp** object.

- `JobId` (*long*) -

    The restore job ID, which can be passed to `GetRestoreSnapshotStateAsync()` to poll progress.

## Example

{example_call and '```csharp
' + example_call + '
```' or ''}
