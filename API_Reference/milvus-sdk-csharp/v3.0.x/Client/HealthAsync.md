# HealthAsync()

Checks the health of the Milvus server.

```csharp
public async Task<HealthState> HealthAsync(CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
HealthState health = await client.HealthAsync();
```

**RETURN TYPE:**

*Task\<HealthState\>*

**RETURNS:**

A **HealthState** object that describes the health of the Milvus server. See [HealthState](HealthState.md).

**EXCEPTIONS:**

- [MilvusException](MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

HealthState health = await client.HealthAsync();
```
