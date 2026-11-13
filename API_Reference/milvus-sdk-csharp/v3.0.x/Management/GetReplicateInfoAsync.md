# GetReplicateInfoAsync()

Gets replication info about a physical channel.

```csharp
public async Task<GetReplicateInfoResp> GetReplicateInfoAsync(
    GetReplicateInfoReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetReplicateInfoReq
{
    SourceClusterId = "cluster1",
    TargetPchannel = "by-dev-rootcoord-dml_0_450357031542v0"
};

GetReplicateInfoResp result = await client.GetReplicateInfoAsync(request);
```

**REQUEST PARAMETERS:**

- `SourceClusterId` (*string*) -

    The ID of the source cluster.

- `TargetPchannel` (*string*) -

    The target physical channel.

**RETURN TYPE:**

*Task\<GetReplicateInfoResp\>*

**RETURNS:**

A **GetReplicateInfoResp** object that contains the replication checkpoints of the physical channel.

```csharp
GetReplicateInfoResp
    Checkpoint         // -> ReplicateCheckpoint?
    SalvageCheckpoint  // -> ReplicateCheckpoint?
```

**PARAMETERS:**

- **Checkpoint** (*ReplicateCheckpoint?*) -

    The last confirmed replication checkpoint, or `null` if no message has been replicated yet. See [ReplicateCheckpoint](#replicatecheckpoint).

- **SalvageCheckpoint** (*ReplicateCheckpoint?*) -

    The salvage checkpoint captured during force promote: the last synced position of the old primary. Data salvage tools can use this to dump unsynchronized messages from the old primary. See [ReplicateCheckpoint](#replicatecheckpoint).

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## ReplicateCheckpoint

A checkpoint describing the last confirmed replicated message of a physical channel.

```csharp
public sealed class ReplicateCheckpoint
{
    public string ClusterId { get; }
    public string Pchannel { get; }
    public string MessageId { get; }
    public WalName WalName { get; }
    public ulong TimeTick { get; }
}
```

**PARAMETERS:**

- `ClusterId` (*string*) -

    The ID of the source cluster.

- `Pchannel` (*string*) -

    The physical channel of the source cluster.

- `MessageId` (*string*) -

    The ID of the last confirmed message of the last replicated message.

- `WalName` (*WalName*) -

    The WAL implementation that produced the message, as the typed `WalName` (matching `MessageID.WalName`). An unknown/unset WAL reports `WalName.Unknown`. See [MessageID](MessageID.md).

- `TimeTick` (*ulong*) -

    The time tick of the last replicated message.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

GetReplicateInfoResp result = await client.GetReplicateInfoAsync(new GetReplicateInfoReq
{
    SourceClusterId = "cluster1",
    TargetPchannel = "by-dev-rootcoord-dml_0_450357031542v0"
});

Console.WriteLine($"Checkpoint: {result.Checkpoint?.MessageId}");
```
