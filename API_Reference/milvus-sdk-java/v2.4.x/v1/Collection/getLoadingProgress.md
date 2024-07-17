# getLoadingProgress()

A MilvusClient interface. This method gets loading collection progress.

```java
R<GetLoadingProgressResponse> getLoadingProgress(GetLoadingProgressParam requestParam);
```

#### GetLoadingProgressParam

Use the `GetLoadingProgressParam.Builder` to construct a `GetLoadingProgressParam` object.

```java
import io.milvus.param.GetLoadingProgressParam;
GetLoadingProgressParam.Builder builder = GetLoadingProgressParam.newBuilder();
```

Methods of `GetLoadingProgressParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the collection to load.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withPartitionNames(List\<String> partitionNames)</p></td>
        <td><p>Sets partition names list to specify query scope(optional).</p></td>
        <td><p>partitionNames: <br/>The name list of partitions to be loaded.</p></td>
    </tr>
    <tr>
        <td><p>addPartitionName(String partitionName)</p></td>
        <td><p>Adds a partition name to specify query scope(optional).</p></td>
        <td><p>partitionName: A partition name.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a GetLoadingProgressParam object</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `GetLoadingProgressParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<GetLoadingProgressResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

GetLoadingProgressParam param = GetLoadingProgressParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .build();
R<GetLoadingProgressResponse> response = client.getLoadingProgress(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
System.out.println(response.getProgress());
```

