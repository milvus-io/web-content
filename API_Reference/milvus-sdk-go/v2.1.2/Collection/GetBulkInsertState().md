# GetBulkInsertState()

This method shows the state of a bulk insert task.


## Invocation

```
client.GetBulkInsertState(ctx, taskId)
```

## Parameters

| Parameter | Description                                | Type            |
|-----------|--------------------------------------------|-----------------|
| `ctx`     | Context to control API invocation process. | context.Context |
| `taskId`  | Bulk insert task ID.                       | int64           |


## Return

Pointer of entity. `BulkInsertTaskState` that represents the state of `BulkInsert`.

```
type BulkInsertTaskState struct {
   ID           int64             // id of an BulkInsert task
   State        BulkInsertState   // is this BulkInsert task finished or not
   RowCount     int64             // if the task is finished, this value is how many rows are imported. if the task is not finished, this value is how many rows are parsed. return 0 if failed.
   IDList       []int64           // auto generated ids if the primary key is autoid
   Infos        map[string]string // more information about the task, progress percent, file path, failed reason, etc.
   CollectionID int64             // collection ID of the import task.
   SegmentIDs   []int64           // a list of segment IDs created by the import task.
   CreateTs     int64             // timestamp when the import task is created.
}
```

## Errors

`err`: error in the process (if any).

