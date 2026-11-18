# DescribeIndexAsync()

Describes the indexes on a field of a collection.

```csharp
public async Task<DescribeIndexResp> DescribeIndexAsync(
    DescribeIndexReq request,
    CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DescribeIndexReq
{
    CollectionName = "my_collection",
    FieldName = "embedding",
    IndexName = "_default_idx"
};

DescribeIndexResp result = await client.DescribeIndexAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection.

- `FieldName` (*string*) -

    The field name the index is built on. Optional: the proxy forwards only the collection id, index name and timestamp to the data coordinator and never reads `field_name`, so leaving it empty describes all indexes (or the specific `IndexName`) of the collection.

- `IndexName` (*string?*) -

    The index name. When unset, the empty name is sent, which the proxy treats as "all indexes of the collection". Only set it to describe a specific named index.

- `Timestamp` (*ulong*) -

    Only checks index state at this timestamp. All segments are checked when zero.

**RETURN TYPE:**

*Task\<DescribeIndexResp\>*

**RETURNS:**

A **DescribeIndexResp** object that contains the descriptions of the indexes on the field.

```csharp
DescribeIndexResp
    Indexes  // -> IReadOnlyList<IndexDesc>
```

**PARAMETERS:**

- **Indexes** (*IReadOnlyList\<IndexDesc\>*) -

    The descriptions of the indexes on the field. Each entry is an [IndexDesc](IndexDesc.md).

**METHODS:**

- `GetIndexDescByFieldName(string fieldName)` -

    Finds the index description built on the given field, or `null` when the response has no index on that field.

- `GetIndexDescByIndexName(string indexName)` -

    Finds the index description with the given name, or `null` when the response has no index with that name.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Responses.Index;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

DescribeIndexResp result = await client.DescribeIndexAsync(new DescribeIndexReq
{
    CollectionName = "my_collection",
    FieldName = "embedding"
});

foreach (IndexDesc index in result.Indexes)
{
    Console.WriteLine($"Index '{index.IndexName}' is {index.State}");
}
```
