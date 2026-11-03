# IndexState

The state of an index build.

```csharp
public enum IndexState
{
    None = 0,
    Unissued = 1,
    InProgress = 2,
    Finished = 3,
    Failed = 4,
    Retry = 5
}
```

**Constants:**

- **None** (0)

    The index does not exist.

- **Unissued** (1)

    The index build has not been issued.

- **InProgress** (2)

    The index build is in progress.

- **Finished** (3)

    The index build has finished.

- **Failed** (4)

    The index build failed.

- **Retry** (5)

    The index build is scheduled for a retry.

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

DescribeIndexResp desc = await client.DescribeIndexAsync(new DescribeIndexReq
{
    CollectionName = "my_collection",
    FieldName = "embedding"
});

foreach (IndexDesc index in desc.Indexes)
{
    Console.WriteLine($"{index.IndexName}: {index.State}");
    if (index.State == IndexState.Failed)
    {
        Console.WriteLine(index.IndexStateFailReason);
    }
}
```
