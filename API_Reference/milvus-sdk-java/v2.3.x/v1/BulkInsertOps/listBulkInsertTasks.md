# listBulkInsertTasks()

A MilvusClient interface. This method lists bulk insert tasks.

```java
R<ListImportTasksResponse> listBulkInsertTasks(ListBulkInsertTasksParam requestParam);
```

#### ListBulkInsertTasksParam

Use the `ListBulkInsertTasksParam.Builder` to construct a `ListBulkInsertTasksParam` object.

```java
import io.milvus.param.ListBulkInsertTasksParam;
ListBulkInsertTasksParam.Builder builder = ListBulkInsertTasksParam.newBuilder();
```

Methods of `ListBulkInsertTasksParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the target collection name, list all tasks if the name is empty.</p></td>
        <td><p>collectionName: The name of the target collection.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withLimit(Integer limit)</p></td>
        <td><p>Specify limit count of returned tasks, list all tasks if the value is 0.<br/>Default value is 0</p></td>
        <td><p>limit: The limit value to control the numbe of tasks returned.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a GetBulkInsertStateParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `ListBulkInsertTasksParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<ListImportTasksResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `ListImportTasksResponse` held by the `R` template which you can get states of all the tasks.

#### Example

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
