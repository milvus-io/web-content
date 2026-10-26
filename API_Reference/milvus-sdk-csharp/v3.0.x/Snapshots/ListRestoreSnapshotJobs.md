# ListRestoreSnapshotJobsAsync()

Lists the snapshot restore jobs for a collection, or all restore jobs when no collection is given.

```csharp
public async Task<ListRestoreSnapshotJobsResp> ListRestoreSnapshotJobsAsync(ListRestoreSnapshotJobsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListRestoreSnapshotJobsReq
{
    CollectionName = "my_collection",
};

ListRestoreSnapshotJobsResp result = await client.ListRestoreSnapshotJobsAsync(request);
```

**REQUEST PARAMETERS:**

- `CollectionName` (*string*) -

    The name of the target collection to filter jobs for. When empty, all restore jobs are listed.

**RETURN TYPE:**

*Task<ListRestoreSnapshotJobsResp>*

**RETURNS:**

A **ListRestoreSnapshotJobsResp** object.

- `Jobs` (*IReadOnlyList\<RestoreSnapshotJobInfo\>*) -

    The list of restore jobs matching the collection filter. Each entry is a [RestoreSnapshotJobInfo](RestoreSnapshotJobInfo.md).

## Example

{example_call and '```csharp
' + example_call + '
```' or ''}
