# DescribeAsync()

Describes a collection, returning information about its configuration and schema.

## Invocation

```c#
await collection.DescribeAsync(cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                 | Type                            | Required |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.              | `CancellationToken`             | False    |

## Return

A description of the collection.
