# DropSnapshotAsync()

Drops a snapshot permanently.

```csharp
public async Task DropSnapshotAsync(DropSnapshotReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropSnapshotReq
{
    SnapshotName = "snapshot_1",
    CollectionName = "my_collection",
};

await client.DropSnapshotAsync(request);
```

**REQUEST PARAMETERS:**

- `Name` (*string*) -

    The name of the snapshot to drop.

- `CollectionName` (*string*) -

    The name of the collection the snapshot belongs to.
## Example

{example_call and '```csharp
' + example_call + '
```' or ''}
