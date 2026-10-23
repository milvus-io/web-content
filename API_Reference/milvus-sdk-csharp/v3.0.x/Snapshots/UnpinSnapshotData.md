# UnpinSnapshotDataAsync()

Releases a previously pinned snapshot.

```csharp
public async Task UnpinSnapshotDataAsync(UnpinSnapshotDataReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new UnpinSnapshotDataReq
{
    PinId = 12345,
};

await client.UnpinSnapshotDataAsync(request);
```

**REQUEST PARAMETERS:**

- `PinId` (*long*) -

    The ID of the pin to release, as returned by `PinSnapshotDataAsync()`.
## Example

{example_call and '```csharp
' + example_call + '
```' or ''}
