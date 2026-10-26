# About Milvus C# SDK (V2)

The .NET SDK of Milvus, provided by the `Milvus.Client.V2` NuGet package. Its source code is hosted on [GitHub](https://github.com/milvus-io/milvus-sdk-csharp).

## Installation

You can use [.NET CLI](https://learn.microsoft.com/en-us/nuget/quickstart/install-and-use-a-package-using-the-dotnet-cli) to install and use the SDK.

```shell
dotnet add package Milvus.Client.V2 --version 3.0.0
```

## Quick Start

The following example connects to a Milvus server, creates a collection with a primary-key field `id` and a float vector field `vector`, inserts a row, builds an index, loads the collection, runs a search, and finally drops the collection.

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

// 1. Create a collection with an Int64 primary-key field `id` and a 3-dimensional FloatVector field `vector`.
var schema = new CollectionSchema { Name = "my_collection" };
schema.Fields.Add(new FieldSchema("id", DataType.Int64, isPrimaryKey: true, autoId: true));
schema.Fields.Add(FieldSchema.CreateFloatVector("vector", dimension: 3));

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "my_collection",
    Schema = schema
});

// 2. Insert a row with vector [1, 2, 3].
await client.InsertAsync(new InsertReq
{
    CollectionName = "my_collection",
    RowsData =
    [
        new Dictionary<string, object?>
        {
            ["vector"] = new[] { 1.0f, 2.0f, 3.0f }
        }
    ]
});

// 3. Build an AUTOINDEX / COSINE index on the vector field.
await client.CreateIndexAsync(new CreateIndexReq
{
    CollectionName = "my_collection",
    Indexes = [new IndexParam("vector", indexType: IndexType.AutoIndex, metricType: MetricType.Cosine)]
});

// 4. Load the collection.
await client.LoadCollectionAsync(new LoadCollectionReq { CollectionName = "my_collection" });

// 5. Search for the closest vector to [1, 2, 3] with a limit of 1.
SearchResp results = await client.SearchAsync(new SearchReq
{
    CollectionName = "my_collection",
    VectorFieldName = "vector",
    Vectors = [new[] { 1.0f, 2.0f, 3.0f }],
    MetricType = MetricType.Cosine,
    Limit = 1,
    Parameters = new SearchParameters { ConsistencyLevel = ConsistencyLevel.Strong }
});

// 6. Drop the collection.
await client.DropCollectionAsync(new DropCollectionReq { CollectionName = "my_collection" });
```

## Compatibility

Milvus proto is backward compatible — later SDK versions can work with earlier Milvus servers, because the protocol only ever adds fields and never removes them. The following table lists the recommended SDK version validated for each Milvus version.

| Milvus version | NuGet package | Recommended version |
| --- | --- | --- |
| 3.0.x | Milvus.Client.V2 | 3.0.0 |
| 2.3.x | Milvus.Client (V1) | 2.3.0-preview.1 |
| 2.2.x | Milvus.Client (V1) | 2.2.2-preview.6 |

## Breaking Changes

### 2.6.1

- Renamed the `SimilarityMetricType` enum to `MetricType`. The old type is removed. When upgrading from 2.6.0 or earlier, replace all references and recompile. Metric values and their wire representations are unchanged.

## Contributing

We welcome and encourage the community's contributions to the C# SDK. If you encounter an issue or would like to suggest an improvement, please reach out:

- Join the [Milvus Slack](https://milvusio.slack.com/archives/C053HTUQGUC) community.
- File an issue or open a PR in the [milvus-sdk-csharp](https://github.com/milvus-io/milvus-sdk-csharp) repository.
- Read the [contributing guideline](https://github.com/milvus-io/milvus-sdk-csharp/blob/master/CONTRIBUTING.md).

## License

[Apache License 2.0](https://github.com/milvus-io/milvus-sdk-csharp/blob/master/LICENSE)
