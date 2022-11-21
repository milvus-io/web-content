# ListBulkInsertTasks()

This method lists the state of all bulk insert tasks.

## Invocation

```
client.ListBulkInsertTasks(ctx, collectionName, limit)
```

## Parameters

| Parameter  | Description                                                                                      | Type            |
|------------|--------------------------------------------------------------------------------------------------|-----------------|
| `ctx`      | Context to control API invocation process.                                                       | context.Context |
| `collName` | Name of the collection to query.                                                                 | String          |
| `limit`    | The maximum number of task state to return. The smaller the value, the newer the returned tasks. | int64           |

## Return

Slice of `entity.BulkInsertTaskState`. 

## Example

```

_COLLECTION_NAME = "hello_milvus"
_PART = ""

id, err := milvusClient.BulkInsert(ctx, _COLLECTION_NAME, _PART, file_names, nil)

log.Info("bulkinsert task id", zap.Int64("id", id))

states, _ := milvusClient.ListBulkInsertTasks(ctx, _COLLECTION_NAME, 100)
log.Info("bulkinsert task states", zap.Any("states", states))

var state BulkInsertTaskState
for {
    state, _ := milvusClient.GetBulkInsertState(ctx, id)
    log.Info("bulkinsert task state", zap.Any("state", state))
    switch state.State {
    case entity.BulkInsertPending:
    case entity.BulkInsertStarted:
        time.Sleep(1 * time.Second)
    default:
        break
    }  
}
log.Info("bulkinsert task final state", zap.Any("state", state))
```