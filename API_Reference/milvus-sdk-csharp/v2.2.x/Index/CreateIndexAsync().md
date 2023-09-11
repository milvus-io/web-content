# CreateIndexAsync()

Creates an index.

## Invocation

```c#
await collection.CreateIndexAsync(fieldName, indexType = null, metricType = null, indexName = null, extraParams = null, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `fieldName`         | The name of the field in the collection for which the index will be created.                                  | `string`                        | True     |
| `indexType`         | The type of the index to be created.                                                                          | `IndexType?`                    | False    |
| `metricType`        | Method used to measure the distance between vectors during search.                                            | `SimilarityMetricType?`         | False    |
| `indexName`         | An optional name for the index to be created.                                                                 | `string?`                       | False    |
| `extraParams`       | Extra parameters specific to each index type; consult the documentation for your index type for more details. | `IDictionary<string, string>?`  | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

This method does not return any value.
