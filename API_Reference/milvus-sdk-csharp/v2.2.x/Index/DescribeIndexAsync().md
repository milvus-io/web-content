# DescribeIndexAsync()

Describes an index, returning information about its configuration.

## Invocation

```c#
await collection.DescribeIndexAsync(fieldName, indexName = null, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                   | Type                            | Required |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `fieldName`         | The name of the field which has the index to be described.                                                    | `string`                        | True     |
| `indexName`         | An optional name of the index to be described.                                                                | `string?`                       | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.                | `CancellationToken`             | False    |

## Return

A list of `MilvusIndexInfo` containing information about the matching indexes.
