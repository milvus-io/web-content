# listBulkInsertTasks()

A MilvusClient interface. This method lists bulk insert tasks.

```Java
R<ListImportTasksResponse> listBulkInsertTasks(ListBulkInsertTasksParam requestParam);
```

## ListBulkInsertTasksParam

Use the `ListBulkInsertTasksParam.Builder` to construct a `ListBulkInsertTasksParam` object.

```Java
import io.milvus.param.ListBulkInsertTasksParam;
ListBulkInsertTasksParam.Builder builder = ListBulkInsertTasksParam.newBuilder();
```

Methods of `ListBulkInsertTasksParam.Builder`:

| Method | Description | Parameters | 
| --- | --- | --- |
| `withCollectionName(String collectionName)` | Sets the target collection name, list all tasks if the name is empty. | `collectionName`: The name of the target collection. |
| `withLimit(Integer limit)` | Specifies limit count of returned tasks, list all tasks if the value is 0. <br> Default value is 0	| `limit`: limit number |
| `build()` | Constructs a `GetBulkInsertStateParam` | object | N/A |

The `ListBulkInsertTasksParam.Builder.build()` can throw the following exceptions:
- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<ListImportTasksResponse>` object.

The `ListImportTasksResponse` contains a list of `GetImportStateResponse`, which you can use `GetBulkInsertStateWrapper` to parse. Call the `getTasksList()` of `ListImportTasksResponse` to get all the tasks.