# SearchAsync()()

Perform a vector similarity search.

## Invocation

```c#
await collection.SearchAsync<T>(vectorFieldName, vectors, metricType, limit, parameters = null, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                                              | Type                               | Required |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | -------- |
| `vectorFieldName`   | The name of the vector field to search in.                                                                                               | `string`                           | True     |
| `vectors`           | The set of vectors to send as input for the similarity search.                                                                           | `IReadOnlyList<ReadOnlyMemory<T>>` | True     |
| `metricType`        | Method used to measure the distance between vectors during search. Must correspond to the metric type specified when building the index. | `SimilarityMetricType`             | True     |
| `limit`             | The maximum number of records to return, also known as 'topk'. Must be between 1 and 16384.                                              | `int`                              | True     |
| `parameters`        | Various additional optional parameters to configure the similarity search.                                                               | `SearchParameters`                 | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                                           | `CancellationToken`                | False    |

## Return

The results of the vector similarity search.

## Example

```c#
var results = await milvusClient.GetCollection("book").SearchAsync(
    vectorFieldName: "book_intro",
    vectors: new ReadOnlyMemory<float>[] { new[] { 0.1f, 0.2f } },
    SimilarityMetricType.L2,
    // the sum of `offset` in `parameters` and `limit` should be less than 16384.
    limit: 10,
    new SearchParameters
    {
        OutputFields = { "title" },
        ConsistencyLevel = ConsistencyLevel.Strong,
        Offset = 5,
        ExtraParameters = { ["nprobe"] = "1024" }
    });
```
