# UpsertAsync()

Upserts (inserts or updates) rows into a collection.

```csharp
public Task<MutationResp> UpsertAsync(UpsertReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new UpsertReq
{
    CollectionName = "my_collection",
    ColumnsData =
    [
        FieldData.Create("id", new long[] { 1, 2 }),
        FieldData.CreateVarChar("title", new[] { "A", "B" })
    ]
};

MutationResp result = await client.UpsertAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to upsert into.

- `ColumnsData` (*IReadOnlyList\<FieldData\>*) -

    The column-based data to upsert; each field contains one value per row. Mutually exclusive with `RowsData`. See [FieldData](FieldData.md).

- `RowsData` (*IReadOnlyList\<IDictionary\<string, object?\>\>*) -

    Optional row-based data to upsert: one dictionary per row mapping field names to values. Mutually exclusive with `ColumnsData`. Values are encoded according to the collection schema.

- `PartitionName` (*string?*) -

    An optional partition to upsert into.

- `PartialUpdate` (*bool*) -

    When true, only the specified fields are updated while the other fields of existing rows remain unchanged.

- `FieldOps` (*IReadOnlyList\<FieldPartialUpdateOp\>*) -

    Per-field partial-update operations describing how each field is merged during a partial upsert. A non-replace operation implies `PartialUpdate` regardless of the flag. Each **FieldPartialUpdateOp** is constructed from a field name and an operation type, with these members:

    - `FieldName` (*string*) -

        The name of the field the operation applies to.

    - `OpType` (*FieldPartialUpdateOpType*) -

        How the field is merged into the existing row. Defaults to `FieldPartialUpdateOpType.Replace`. Supported values:

        - `Replace` (0) - Replace the stored field value with the upserted value.

        - `ArrayAppend` (1) - Append the upserted elements to the stored array field.

        - `ArrayRemove` (2) - Remove the upserted elements from the stored array field.

- `RlsPrincipal` (*string?*) -

    The row-level security (RLS) principal for the operation. When set, Milvus applies the row policies of the collection to this operation.

- `SkipRls` (*bool?*) -

    Whether the operation should skip row-level security (RLS) enforcement. When `null`, the server default applies.

**RETURN TYPE:**

*Task\<MutationResp\>*

**RETURNS:**

A **MutationResp** object that contains the result of the upsert operation. If `RowsData` and `ColumnsData` are both empty, an empty result is returned without issuing the RPC.

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

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

> **Note:** `UpsertAsync()` requires an explicit primary-key value in each row. On collections created with `autoId: true`, upsert fails with "Field 'id' is not provided and has no default value or nullable flag." Use a non-autoID primary key for upsert workflows.

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

MutationResp result = await client.UpsertAsync(new UpsertReq
{
    CollectionName = "my_collection",
    RowsData =
    [
        new Dictionary<string, object?> { ["id"] = 1L, ["title"] = "A", ["vector"] = new[] { 0.1f, 0.2f } },
        new Dictionary<string, object?> { ["id"] = 2L, ["title"] = "B", ["vector"] = new[] { 0.3f, 0.4f } }
    ]
});
```
