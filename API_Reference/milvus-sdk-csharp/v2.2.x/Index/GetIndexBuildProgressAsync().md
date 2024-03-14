# GetIndexBuildProgressAsync()

Gets the build progress of an index.

## Invocation

```c#
await collection.GetIndexBuildProgressAsync(fieldName, indexName = null, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `fieldName`         | The name of the field which has the index.                                                                    | `string`                        | True     |
| `indexName`         | An optional name of the index.                                                                                | `string?`                       | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

An `IndexBuildProgress` with the number of rows indexed and the total number of rows.
