# IndexDesc

The description of an index, as returned by `DescribeIndexAsync()` and `ListIndexesAsync()`.

```csharp
public sealed class IndexDesc
{
    public string IndexName { get; }
    public long IndexId { get; }
    public string FieldName { get; }
    public IndexState State { get; }
    public long IndexedRows { get; }
    public long TotalRows { get; }
    public long PendingIndexRows { get; }
    public string? IndexStateFailReason { get; }
    public IReadOnlyDictionary<string, string> Parameters { get; }
    public IndexType? IndexType { get; }
    public MetricType? MetricType { get; }
}
```

**PARAMETERS:**

- `IndexName` (*string*) -

    The index name.

- `IndexId` (*long*) -

    The index id.

- `FieldName` (*string*) -

    The field name the index is built on.

- `State` (*IndexState*) -

    The index build state. See [IndexState](IndexState.md).

- `IndexedRows` (*long*) -

    The number of rows indexed so far.

- `TotalRows` (*long*) -

    The total number of rows to index.

- `PendingIndexRows` (*long*) -

    The number of rows pending index build.

- `IndexStateFailReason` (*string?*) -

    The failure reason when the index build failed, or `null`.

- `Parameters` (*IReadOnlyDictionary\<string, string\>*) -

    The index parameters (e.g. `index_type`, `metric_type`, `nlist`).

- `IndexType` (*IndexType?*) -

    The typed index type, parsed from `Parameters`' `index_type` entry, or `null` when absent or unrecognized. See [IndexType](IndexType.md).

- `MetricType` (*MetricType?*) -

    The typed metric type, parsed from `Parameters`' `metric_type` entry, or `null` when absent or unrecognized (e.g. scalar indexes have no metric). See [MetricType](../Vector/MetricType.md).

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
