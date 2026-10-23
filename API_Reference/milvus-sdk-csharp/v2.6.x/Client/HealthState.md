# HealthState

The health state of the Milvus server, as reported by `MilvusClientV2.HealthAsync`.

```csharp
public sealed record HealthState(
    bool IsHealthy,
    string Reason,
    MilvusErrorCode ErrorCode,
    IReadOnlyList<string>? Reasons = null,
    IReadOnlyList<QuotaState>? QuotaStates = null);
```

**PARAMETERS:**

- `IsHealthy` (*bool*) -

    Whether the server reported itself as healthy.

- `Reason` (*string*) -

    The reason reported by the server when unhealthy.

- `ErrorCode` (*MilvusErrorCode*) -

    The error code reported by the server. For the values of the `MilvusErrorCode` enumeration, refer to [MilvusErrorCode](MilvusErrorCode.md).

- `Reasons` (*IReadOnlyList\<string\>?*) -

    The detailed reasons reported by the server when unhealthy.

- `QuotaStates` (*IReadOnlyList\<QuotaState\>?*) -

    The quota states reported by the server.

```csharp
public enum QuotaState
{
    Unknown = 0,
    ReadLimited = 2,
    WriteLimited = 3,
    DenyToRead = 4,
    DenyToWrite = 5
}
```

**VALUES:**

- **Unknown** (0) - The quota state is unknown.

- **ReadLimited** (2) - Reads are rate-limited.

- **WriteLimited** (3) - Writes are rate-limited.

- **DenyToRead** (4) - Reads are denied.

- **DenyToWrite** (5) - Writes are denied.
