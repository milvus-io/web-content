# ListIndexesAsync()

Lists the indexes of a collection.

```csharp
public async Task<ListIndexesResp> ListIndexesAsync(
    ListIndexesReq request,
    CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListIndexesReq
{
    CollectionName = "my_collection"
};

ListIndexesResp result = await client.ListIndexesAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection.

- `FieldName` (*string?*) -

    An optional field name to filter the listed indexes to those built on that field. When empty, all indexes of the collection are returned.

**RETURN TYPE:**

*Task\<ListIndexesResp\>*

**RETURNS:**

A **ListIndexesResp** object that contains the descriptions of the indexes on the collection.

```csharp
ListIndexesResp
    Indexes     // -> IReadOnlyList<IndexDesc>
    IndexNames  // -> IReadOnlyList<string>
```

**PARAMETERS:**

- **Indexes** (*IReadOnlyList\<IndexDesc\>*) -

    The descriptions of the indexes on the collection. Each entry is an `IndexDesc` with the same members as the ones described on [DescribeIndexAsync](DescribeIndexAsync.md).

- **IndexNames** (*IReadOnlyList\<string\>*) -

    The names of the indexes on the collection, in the same order as `Indexes`.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Responses.Index;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

ListIndexesResp result = await client.ListIndexesAsync(new ListIndexesReq
{
    CollectionName = "my_collection"
});

foreach (string indexName in result.IndexNames)
{
    Console.WriteLine(indexName);
}
```
