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

    The descriptions of the indexes on the collection. Each **IndexDesc** has the following members:

    - **IndexName** (*string*) -

        The index name.

    - **IndexId** (*long*) -

        The index id.

    - **FieldName** (*string*) -

        The field name the index is built on.

    - **State** (*IndexState*) -

        The index build state. See [IndexState](IndexState.md).

    - **IndexedRows** (*long*) -

        The number of rows indexed so far.

    - **TotalRows** (*long*) -

        The total number of rows to index.

    - **PendingIndexRows** (*long*) -

        The number of rows pending index build.

    - **IndexStateFailReason** (*string?*) -

        The failure reason when the index build failed, or `null`.

    - **Parameters** (*IReadOnlyDictionary\<string, string\>*) -

        The index parameters (e.g. `index_type`, `metric_type`, `nlist`).

    - **IndexType** (*IndexType?*) -

        The typed index type, parsed from `Parameters`' `index_type` entry, or `null` when absent or unrecognized. See [IndexType](IndexType.md).

    - **MetricType** (*MetricType?*) -

        The typed metric type, parsed from `Parameters`' `metric_type` entry, or `null` when absent or unrecognized (e.g. scalar indexes have no metric). See [MetricType](../Vector/MetricType.md).

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
