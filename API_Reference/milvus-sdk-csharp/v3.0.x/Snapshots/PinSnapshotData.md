# PinSnapshotDataAsync()

Pins the data referenced by a snapshot so it is not compacted away, with a time-to-live.

```csharp
public async Task<PinSnapshotDataResp> PinSnapshotDataAsync(PinSnapshotDataReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new PinSnapshotDataReq
{
    SnapshotName = "snapshot_1",
    CollectionName = "my_collection",
    TtlSeconds = 86400,
};

PinSnapshotDataResp result = await client.PinSnapshotDataAsync(request);
```

**REQUEST PARAMETERS:**

- `Name` (*string*) -

    The name of the snapshot to pin.

- `CollectionName` (*string*) -

    The name of the collection the snapshot belongs to.

- `TtlSeconds` (*long*) -

    The time-to-live of the pin in seconds. 0 means no expiry (uses the server default).

**RETURN TYPE:**

*Task<PinSnapshotDataResp>*

**RETURNS:**

A **PinSnapshotDataResp** object.

- `PinId` (*long*) -

    The pin ID, which can be passed to `UnpinSnapshotDataAsync()` to release the pin.

## Example

{example_call and '```csharp
' + example_call + '
```' or ''}
