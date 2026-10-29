# QueryAsync()

Queries rows from a collection by expression.

```csharp
public async Task<QueryResp> QueryAsync(QueryReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new QueryReq
{
    CollectionName = "my_collection",
    Expression = "title == \"The Hobbit\" and pages > 300",
    Parameters = new QueryParameters { OutputFields = { "id", "title", "pages" } }
};

QueryResp results = await client.QueryAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to query.

- `Expression` (*string*) -

    The boolean expression identifying the rows to return (e.g. `"id in [1, 2, 3]"`). When empty, all rows are fetched.

- `Parameters` (*QueryParameters?*) -

    The optional query parameters. See [QueryParameters](QueryParameters.md).

- `RlsPrincipal` (*string?*) -

    The row-level security (RLS) principal for the operation. When set, Milvus applies the row policies of the collection to this operation.

- `SkipRls` (*bool?*) -

    Whether the operation should skip row-level security (RLS) enforcement. When `null`, the server default applies.

**RETURN TYPE:**

*Task\<QueryResp\>*

**RETURNS:**

A **QueryResp** object that contains the query results.

```csharp
QueryResp
    CollectionName     // -> string
    FieldsData         // -> IReadOnlyList<FieldData>
    PrimaryKeyName     // -> string?
    SessionTs          // -> ulong
    Cost               // -> long
    ScannedRemoteBytes // -> long
    ScannedTotalBytes  // -> long
    CacheHitRatio      // -> float?
    RowCount           // -> int
```

**PARAMETERS:**

- **CollectionName** (*string*) -

    The name of the queried collection.

- **FieldsData** (*IReadOnlyList\<FieldData\>*) -

    The returned fields data. See [FieldData](FieldData.md).

- **PrimaryKeyName** (*string?*) -

    The name of the primary-key field of the queried collection, as reported by the server, so callers can identify the pk column in `FieldsData` without re-describing the collection.

- **SessionTs** (*ulong*) -

    The server-side timestamp at which the query was executed, used for session-like operations such as iterators (read-your-writes consistency).

- **Cost** (*long*) -

    The cost of the query in milliseconds, as reported by the server's `report_value` extra info, or 0 when the server does not report a cost.

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

QueryResp results = await client.QueryAsync(new QueryReq
{
    CollectionName = "my_collection",
    Expression = "title == \"The Hobbit\" and pages > 300",
    Parameters = new QueryParameters
    {
        OutputFields = { "id", "title", "pages" },
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
```
