# GetReplicateConfigurationAsync()

Gets the replication configuration of a cluster.

```csharp
public async Task<GetReplicateConfigurationResp> GetReplicateConfigurationAsync(
    GetReplicateConfigurationReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetReplicateConfigurationReq();

GetReplicateConfigurationResp result = await client.GetReplicateConfigurationAsync(request);
```

**REQUEST PARAMETERS:**

`GetReplicateConfigurationReq` has no settable properties.

**RETURN TYPE:**

*Task\<GetReplicateConfigurationResp\>*

**RETURNS:**

A **GetReplicateConfigurationResp** object that contains the current replication configuration of the cluster.

```csharp
GetReplicateConfigurationResp
    Configuration  // -> ReplicateConfiguration
```

**PARAMETERS:**

- **Configuration** (*ReplicateConfiguration*) -

    The current replication configuration of the cluster. See [ReplicateConfiguration](ReplicateConfiguration.md).

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

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

GetReplicateConfigurationResp result = await client.GetReplicateConfigurationAsync(new GetReplicateConfigurationReq());

Console.WriteLine($"Clusters: {result.Configuration.Clusters.Count}");
```
