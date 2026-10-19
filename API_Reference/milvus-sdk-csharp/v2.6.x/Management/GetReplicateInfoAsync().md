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

    The last confirmed replication checkpoint, or `null` if no message has been replicated yet. See [ReplicateCheckpoint](ReplicateCheckpoint.md).

- **SalvageCheckpoint** (*ReplicateCheckpoint?*) -

    The salvage checkpoint captured during force promote: the last synced position of the old primary. Data salvage tools can use this to dump unsynchronized messages from the old primary. See [ReplicateCheckpoint](ReplicateCheckpoint.md).

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
