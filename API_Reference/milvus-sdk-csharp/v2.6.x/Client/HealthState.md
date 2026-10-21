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

    The error code reported by the server. See the **MilvusErrorCode** values below.

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

```csharp
public enum MilvusErrorCode
{
    Success = 0,
    UnexpectedError = 1,
    RateLimit = 8,
    ServiceQuotaExceeded = 9,
    LegacyRateLimit = 49,
    CollectionNotFound = 100,
    SchemaMismatch = 109,
    SegmentNotFound = 600,
    IndexNotFound = 700
}
```

**VALUES:**

- **Success** (0) - The server reported no error.

- **UnexpectedError** (1) - An unexpected server-side error occurred.

- **RateLimit** (8) - The server rejected or throttled the request because a rate limit was hit.

- **ServiceQuotaExceeded** (9) - The server's service quota was exceeded.

- **LegacyRateLimit** (49) - A rate limit reported by an older server version.

- **CollectionNotFound** (100) - The requested collection does not exist.

- **SchemaMismatch** (109) - The request schema does not match the collection schema.

- **SegmentNotFound** (600) - The requested segment does not exist.

- **IndexNotFound** (700) - The requested index does not exist.
