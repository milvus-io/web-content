# BulkInsert()

This method imports entities from files. Currently, this method only supports importing from JSON files. You can only import one JSON file in one call.

## Invocation

```
client.BulkInsert(ctx, collName, partitionName, files)
```

## Parameters

| Parameter   | Description                                                                                                                               | Type             |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| `ctx`       | Context to control API invocation process.                                                                                                | context.Context  |
| `collName`  | Name of the collection to insert data into.                                                                                               | String           |
| `partName`  | Name of the partition to insert data into. Data will be inserted into the default partition if the value of this parameter is left empty. | String           |
| `fileNames` | Data files to insert. Currently, only JSON files are supported.                                                                           | String[]         |
| `opts`      | Extra options to control `BulkInsert()`. Not needed for now as this parameter is reserved for future use.                                 | BulkInsertOption |

## Return
`task_id`: INT64 bulk insert task id which can be used to get the progress of BulkInsert.

## Errors
`err`: error in the process (if any).