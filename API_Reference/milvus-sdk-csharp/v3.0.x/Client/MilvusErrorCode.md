# MilvusErrorCode

An error code returned in `MilvusException.ErrorCode`.

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

| Constant | Value |
|---|---|
| **Success** | 0 |
| **UnexpectedError** | 1 |
| **RateLimit** | 8 |
| **ServiceQuotaExceeded** | 9 |
| **LegacyRateLimit** | 49 |
| **CollectionNotFound** | 100 |
| **SchemaMismatch** | 109 |
| **SegmentNotFound** | 600 |
| **IndexNotFound** | 700 |
