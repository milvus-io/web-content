# QueryAsync()

Retrieves rows from a collection via scalar filtering based on a boolean expression.

## Invocation

```c#
await collection.QueryAsync(expression, parameters = null, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                 | Type                            | Required |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `expression`        | A boolean expression determining which rows are to be returned.                                             | `string`                        | True     |
| `parameters`        | Various additional optional parameters to configure the query.                                              | `QueryParameters?`              | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.              | `CancellationToken`             | False    |

## Return

A list of `FieldData` instances with the query results.

## Example

```c#
var results = await Client.GetCollection("book").QueryAsync(
    expression: "book_id in [2,4,6,8]",
    new QueryParameters
    {
        Offset = 0,
        Limit = 10,
        OutputFields = { "book_id", "book_intro" }
    });
```
