# InsertAsync()

Inserts rows of data into a collection.

## Invocation

```c#
await collection.InsertAsync(data, partitionName = null, cancellationToken = default);
```

## Parameters

| Parameter           | Description                                                                                                 | Type                            | Required |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `data`              | The field data to insert; each field contains a list of row values.                                         | `IReadOnlyList<FieldData>`      | True     |
| `partitionName`     | An optional name of a partition to insert into.                                                             | `string?`                       | False    |
| `cancellationToken` | The token to monitor for cancellation requests. The default value is `CancellationToken.None`.              | `CancellationToken`             | False    |

## Return

This method does not return any value.

## Example

```c#
await milvusClient.GetCollection("book").InsertAsync(new FieldData[]
{
    FieldData.Create("book_id", bookIds),
    FieldData.Create("word_count", wordCounts),
    FieldData.CreateFloatVector("book_intro", bookIntros)
});
```
