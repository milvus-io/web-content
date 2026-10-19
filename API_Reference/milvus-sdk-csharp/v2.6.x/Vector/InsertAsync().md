# InsertAsync()

Inserts rows into a collection.

```csharp
public Task<MutationResp> InsertAsync(InsertReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new InsertReq
{
    CollectionName = "my_collection",
    ColumnsData =
    [
        FieldData.Create("id", new long[] { 1, 2 }),
        FieldData.CreateVarChar("title", new[] { "A", "B" }),
        FieldData.Create("embedding", new[]
        {
            new[] { 0.1f, 0.2f },
            new[] { 0.3f, 0.4f }
        })
    ]
};

MutationResp result = await client.InsertAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to insert into.

- `ColumnsData` (*IReadOnlyList\<FieldData\>*) -

    The column-based data to insert; each field contains one value per row. Mutually exclusive with `RowsData`. See [FieldData](FieldData.md).

- `RowsData` (*IReadOnlyList\<IDictionary\<string, object?\>\>*) -

    Optional row-based data to insert: one dictionary per row mapping field names to values. Mutually exclusive with `ColumnsData`. Values are encoded according to the collection schema.

- `PartitionName` (*string?*) -

    An optional partition to insert into.

**RETURN TYPE:**

*Task\<MutationResp\>*

**RETURNS:**

A **MutationResp** object that contains the result of the insert operation.

```csharp
MutationResp
    LongIds      // -> IReadOnlyList<long>?
    StringIds    // -> IReadOnlyList<string>?
    InsertCount  // -> long
    DeleteCount  // -> long
    UpsertCount  // -> long
    Timestamp    // -> ulong
    SuccessIndex // -> IReadOnlyList<long>?
    ErrorIndex   // -> IReadOnlyList<long>?
    Cost         // -> long
    Acknowledged // -> bool
```

**PARAMETERS:**

- **LongIds** (*IReadOnlyList\<long\>?*) -

    The ids of the mutated rows when the primary key is an integer, or `null` for string keys.

- **StringIds** (*IReadOnlyList\<string\>?*) -

    The ids of the mutated rows when the primary key is a string, or `null` for integer keys.

- **InsertCount** (*long*) -

    The number of inserted rows.

- **DeleteCount** (*long*) -

    The number of deleted rows.

- **UpsertCount** (*long*) -

    The number of upserted rows.

- **Timestamp** (*ulong*) -

    The hybrid timestamp of the mutation, used by the `CollectionTsCache` for Session consistency.

- **SuccessIndex** (*IReadOnlyList\<long\>?*) -

    The zero-based indexes of the rows that were successfully written, or `null` when the server reports no partial-failure information.

- **ErrorIndex** (*IReadOnlyList\<long\>?*) -

    The zero-based indexes of the rows that failed, or `null` when the server reports no partial-failure information. An empty-but-non-null list means all rows succeeded.

- **Cost** (*long*) -

    The cost of the mutation in milliseconds, as reported by the server's `report_value` extra info, or 0 when the server does not report a cost.

- **Acknowledged** (*bool*) -

    Whether the mutation was acknowledged by the server. The current server does not populate the flag.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Responses.Dml;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

MutationResp result = await client.InsertAsync(new InsertReq
{
    CollectionName = "my_collection",
    RowsData =
    [
        new Dictionary<string, object?> { ["id"] = 1L, ["title"] = "A", ["vector"] = new[] { 0.1f, 0.2f } },
        new Dictionary<string, object?> { ["id"] = 2L, ["title"] = "B", ["vector"] = new[] { 0.3f, 0.4f } }
    ]
});
```
