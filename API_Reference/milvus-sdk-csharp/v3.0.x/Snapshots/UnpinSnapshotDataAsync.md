# UnpinSnapshotDataAsync()

Releases a previously pinned snapshot.

```csharp
public async Task UnpinSnapshotDataAsync(UnpinSnapshotDataReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new UnpinSnapshotDataReq
{
    PinId = 12345
};

await client.UnpinSnapshotDataAsync(request);
```

**REQUEST PARAMETERS:**

- `PinId` (*long*) -

    The ID of the pin to release, as returned by `PinSnapshotDataAsync()`.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Snapshot;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.UnpinSnapshotDataAsync(new UnpinSnapshotDataReq
{
    PinId = 12345
});
```
