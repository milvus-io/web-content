# GetAsync()

Fetches rows by primary key.

```csharp
public async Task<GetResp> GetAsync(GetReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetReq
{
    CollectionName = "my_collection",
    Ids = [1, 2, 3],
    OutputFields = ["id", "title"]
};

GetResp results = await client.GetAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection.

- `Ids` (*IReadOnlyList\<object\>*) -

    The primary key values to fetch.

- `PartitionName` (*string?*) -

    An optional partition name to restrict the fetch to. When empty, all partitions are queried. For multiple partitions use `Partitions`.

- `Partitions` (*IReadOnlyList\<string\>?*) -

    An optional set of partition names to restrict the fetch to. When empty, all partitions are queried.

- `ConsistencyLevel` (*ConsistencyLevel?*) -

    The consistency level for the fetch. When unset, `ConsistencyLevel.Session` is used. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

- `OutputFields` (*IReadOnlyList\<string\>?*) -

    The fields to return. Empty means all fields.

**RETURN TYPE:**

*Task\<GetResp\>*

**RETURNS:**

A **GetResp** object that contains the fetched rows. If `Ids` is empty, an empty result is returned without issuing the RPC.

```csharp
GetResp
    FieldsData         // -> IReadOnlyList<FieldData>
    SessionTs          // -> ulong
    PrimaryKeyName     // -> string?
    Cost               // -> long
    ScannedRemoteBytes // -> long
    ScannedTotalBytes  // -> long
    CacheHitRatio      // -> float?
    RowCount           // -> int
```

**PARAMETERS:**

- **FieldsData** (*IReadOnlyList\<FieldData\>*) -

    The returned fields data. See [FieldData](FieldData.md).

- **SessionTs** (*ulong*) -

    The server-side timestamp at which the fetch was executed, used for session-like operations such as iterators (read-your-writes consistency).

- **PrimaryKeyName** (*string?*) -

    The name of the primary-key field of the collection, as reported by the server, so callers can identify the pk column in `FieldsData` without re-describing the collection.

- **Cost** (*long*) -

    The cost of the fetch in milliseconds, as reported by the server's `report_value` extra info, or 0 when the server does not report a cost.

- **ScannedRemoteBytes** (*long*) -

    The number of bytes scanned from remote storage, or 0 when the server does not report it.

- **ScannedTotalBytes** (*long*) -

    The total number of bytes scanned, or 0 when the server does not report it.

- **CacheHitRatio** (*float?*) -

    The cache hit ratio, or `null` when the server does not report it.

- **RowCount** (*int*) -

    The number of rows in the result, equal to the row count of the first `FieldData`.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

GetResp results = await client.GetAsync(new GetReq
{
    CollectionName = "my_collection",
    Ids = [1, 2, 3],
    OutputFields = ["id", "title"]
});
```
