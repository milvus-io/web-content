# listBulkInsertTasks()

A MilvusClient interface. This method lists bulk insert tasks.

```java
R<ListImportTasksResponse> listBulkInsertTasks(ListBulkInsertTasksParam requestParam);
```

## ListBulkInsertTasksParam

Use the `ListBulkInsertTasksParam.Builder` to construct a `ListBulkInsertTasksParam` object.

```java
import io.milvus.param.ListBulkInsertTasksParam;
ListBulkInsertTasksParam.Builder builder = ListBulkInsertTasksParam.newBuilder();
```

Methods of `ListBulkInsertTasksParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the target collection name, list all tasks if the name is empty.</td>
        <td>collectionName: The name of the target collection.</td>
    </tr>
    <tr>
        <td>withLimit(Integer limit)</td>
        <td>Specify limit count of returned tasks, list all tasks if the value is 0.<br/>Default value is 0</td>
        <td>limit: The limit value to control the numbe of tasks returned.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a GetBulkInsertStateParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `ListBulkInsertTasksParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<ListImportTasksResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `ListImportTasksResponse` held by the `R` template which you can get states of all the tasks.

## Example

```java
import io.milvus.param.bulkinsert.*;

R<ListImportTasksResponse> response = milvusClient.listBulkInsertTasks(ListBulkInsertTasksParam.newBuilder()
            .withCollectionName(COLLECTION_NAME)
            .withLimit(10)
            .build());
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
