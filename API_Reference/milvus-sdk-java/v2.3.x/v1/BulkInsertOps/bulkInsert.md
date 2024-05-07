# bulkInsert()

A MilvusClient interface. This method imports data from external files, currently supports JSON/Numpy/Parquet files. Read [the doc](https://milvus.io/docs/v2.3.x/bulk_insert.md) for details.

```java
R<ImportResponse> bulkInsert(BulkInsertParam requestParam);
```

#### BulkInsertParam{#bulkinsertparam}

Use the `BulkInsertParam.Builder` to construct a `BulkInsertParam` object.

```java
import io.milvus.param.BulkInsertParam;
BulkInsertParam.Builder builder = BulkInsertParam.newBuilder();
```

Methods of `BulkInsertParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the target collection.</td>
    </tr>
    <tr>
        <td>withPartitionName(String partitionName)</td>
        <td>Sets the partition name. partition name can be null.</td>
        <td>partitionName: The name of the target partition.</td>
    </tr>
    <tr>
        <td>withFiles(List<String> files)</td>
        <td>Sets the path of the files. The paths cannot be empty or null.<br/>Each file path must be a relative path under the Milvus storage bucket.</td>
        <td>files: A file paths list. Currently, you can only input one row-based JSON file for each call.</td>
    </tr>
    <tr>
        <td>addFile(String file)</td>
        <td>Set a file path to be imported.The paths cannot be empty or null.</td>
        <td>file: A file path.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a BulkInsertParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `BulkInsertParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns{#returns}

This method catches all the exceptions and returns an `R<ImportResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `ImportResponse` held by the `R` template. You can use `ImportResponse` to get the task ID.

#### Example{#example}

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
