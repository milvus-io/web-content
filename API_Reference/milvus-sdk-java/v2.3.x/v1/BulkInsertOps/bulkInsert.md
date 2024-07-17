# bulkInsert()

A MilvusClient interface. This method imports data from external files, currently supports JSON/Numpy/Parquet files. Read [the doc](https://milvus.io/docs/v2.3.x/bulk_insert.md) for details.

```java
R<ImportResponse> bulkInsert(BulkInsertParam requestParam);
```

#### BulkInsertParam

Use the `BulkInsertParam.Builder` to construct a `BulkInsertParam` object.

```java
import io.milvus.param.BulkInsertParam;
BulkInsertParam.Builder builder = BulkInsertParam.newBuilder();
```

Methods of `BulkInsertParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the target collection.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withPartitionName(String partitionName)</p></td>
        <td><p>Sets the partition name. partition name can be null.</p></td>
        <td><p>partitionName: The name of the target partition.</p></td>
    </tr>
    <tr>
        <td><p>withFiles(List\<String> files)</p></td>
        <td><p>Sets the path of the files. The paths cannot be empty or null.<br/>Each file path must be a relative path under the Milvus storage bucket.</p></td>
        <td><p>files: A file paths list. Currently, you can only input one row-based JSON file for each call.</p></td>
    </tr>
    <tr>
        <td><p>addFile(String file)</p></td>
        <td><p>Set a file path to be imported.The paths cannot be empty or null.</p></td>
        <td><p>file: A file path.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a BulkInsertParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `BulkInsertParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<ImportResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `ImportResponse` held by the `R` template. You can use `ImportResponse` to get the task ID.

#### Example

```java
import io.milvus.param.bulkinsert.*;

List<String> files = Arrays.asList("/path_to_bucket/data.json");
R<ImportResponse> response = milvusClient.bulkInsert(BulkInsertParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withFiles(files)
        .build());
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
