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

```csharp
HealthState
    IsHealthy     // -> bool
    Reason        // -> string
    ErrorCode     // -> MilvusErrorCode
    Reasons       // -> IReadOnlyList<string>?
    QuotaStates   // -> IReadOnlyList<QuotaState>?
```

**PARAMETERS:**

- **IsHealthy** (*bool*) -

    Whether the server reported itself as healthy.

- **Reason** (*string*) -

    The reason reported by the server when unhealthy.

- **ErrorCode** (*MilvusErrorCode*) -

    The error code reported by the server. For the values of the `MilvusErrorCode` enumeration, refer to [MilvusErrorCode](MilvusErrorCode.md).

- **Reasons** (*IReadOnlyList\<string\>?*) -

    The detailed reasons reported by the server when unhealthy.

- **QuotaStates** (*IReadOnlyList\<QuotaState\>?*) -

    The quota states reported by the server.

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
