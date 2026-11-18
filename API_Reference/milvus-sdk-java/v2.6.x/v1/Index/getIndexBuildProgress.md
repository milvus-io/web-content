# getIndexBuildProgress()

MilvusClient interface. This method shows the index-building progress, such as how many rows are indexed.

```java
R<GetIndexBuildProgressResponse> getIndexBuildProgress(GetIndexBuildProgressParam requestParam);
```

#### GetIndexBuildProgressParam

Use the `GetIndexBuildProgressParam.Builder` to construct a `GetIndexBuildProgressParam` object.

```java
import io.milvus.param.GetIndexBuildProgressParam;
GetIndexBuildProgressParam.Builder builder = GetIndexBuildProgressParam.newBuilder();
```

Methods of `GetIndexBuildProgressParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(collectionName)</p></td>
        <td><p>Set the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The target collection name.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withIndexName(String indexName)</p></td>
        <td><p>Set the target index name. If no index name is specified,the default index name is empty string which means let the server determine it.</p></td>
        <td><p>indexName: The name of the index.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a GetIndexBuildProgressParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `GetIndexBuildProgressParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<GetIndexBuildProgressResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `GetIndexBuildProgressResponse` held by the `R` template.

#### Example

```java
import io.milvus.param.*;
import io.milvus.grpc.GetIndexBuildProgressResponse;

GetIndexBuildProgressParam param = GetIndexBuildProgressParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withIndexName("index1")
        .build();
R<GetIndexBuildProgressResponse> response = client.getIndexBuildProgress(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

long indexedRows = response.getData().getIndexedRows();
long totalRows = response.getData().getTotalRows();
System.out.println("indexed rows: "  + indexedRows + ", total rows: " + totalRows);
```
