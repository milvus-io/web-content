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

**Constants:**

- **Success** (0)

    The operation succeeded.

- **UnexpectedError** (1)

    An unexpected error occurred.

- **RateLimit** (8)

    The request was rate-limited by the server.

- **ServiceQuotaExceeded** (9)

    The request exceeded a service quota.

- **LegacyRateLimit** (49)

    The request was rate-limited by a legacy Milvus server.

- **CollectionNotFound** (100)

    The collection was not found.

- **SchemaMismatch** (109)

    The collection schema no longer matches the data sent by the client, usually because the collection was recreated or altered by another client between operations.

- **SegmentNotFound** (600)

    The segment was not found.

- **IndexNotFound** (700)

    The index was not found.

## Example

```csharp
using Milvus.Client.V2;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});

try
{
    await client.DescribeCollectionAsync(new DescribeCollectionReq("my_collection"));
}
catch (MilvusException e)
{
    Console.WriteLine(e.ErrorCode == MilvusErrorCode.CollectionNotFound
        ? "Collection not found"
        : $"Error {e.ErrorCode}: {e.Message}");
}
```
