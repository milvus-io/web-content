# DeleteAsync()

Deletes rows from a collection by expression.

```csharp
public async Task<MutationResp> DeleteAsync(DeleteReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DeleteReq
{
    CollectionName = "my_collection",
    Expression = "title == \"The Hobbit\""
};

MutationResp result = await client.DeleteAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to delete from.

- `Expression` (*string*) -

    The boolean expression identifying the rows to delete (e.g. `"id in [1, 2, 3]"`).

- `Ids` (*IReadOnlyList\<object\>?*) -

    The primary key values identifying the rows to delete. Mutually exclusive with `Expression`; when set, an expression is generated from the collection's primary key field.

- `PartitionName` (*string?*) -

    An optional partition to delete from.

- `ConsistencyLevel` (*ConsistencyLevel?*) -

    The consistency level to use for the delete. When `null`, the server applies the collection's configured level. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

- `FilterTemplates` (*IDictionary\<string, object\>*) -

    Named expression-template values used by the delete expression, for parameterized expressions. Entries are added via the collection-initializer syntax `FilterTemplates = { ... }`.

**RETURN TYPE:**

*Task\<MutationResp\>*

**RETURNS:**

A **MutationResp** object that contains the result of the delete operation.

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

MutationResp result = await client.DeleteAsync(new DeleteReq
{
    CollectionName = "my_collection",
    Expression = "title == \"The Hobbit\""
});
```
