# getLoadingProgress()

A MilvusClient interface. This method gets loading collection progress.

```java
R<GetLoadingProgressResponse> getLoadingProgress(GetLoadingProgressParam requestParam);
```

#### LoadCollectionParam

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
        <td><p>withPartitionNames(List&lt;String> partitionNames)</p></td>
        <td><p>Sets partition names list to specify query scope (Optional).</p></td>
        <td><p>partitionNames: <br/>The name list of partitions to be loaded.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a LoadCollectionParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
    <tr>
        <td><p><code>withSyncLoadWaitingInterval(Long milliseconds)</code></p></td>
        <td><p>Sets the waiting interval for sync mode. In sync mode, the client checks the collection load status at intervals. The value must be greater than zero, and cannot be greater than <code>Constant.MAX_WAITING_LOADING_INTERVAL</code>. The default value is <code>500</code> milliseconds</p></td>
        <td><p><code>milliseconds</code>: The time interval in milliseconds for checking the data load status.</p></td>
    </tr>
    <tr>
        <td><p><code>withSyncLoadWaitingTimeout(Long seconds)</code></p></td>
        <td><p>Sets the timeout period for sync mode. The value must be greater than zero and cannot be greater than <code>Constant.MAX_WAITING_LOADING_TIMEOUT</code>. The default value is <code>60</code> seconds.</p></td>
        <td><p><code>seconds</code>: A during of time in seconds to wait till timeout.</p></td>
    </tr>
    <tr>
        <td><p><code>withReplicaNumber(Integer replicaNumber)</code></p></td>
        <td><p>Specifies the number of replicas to load. The default value is <code>1</code>.</p></td>
        <td><p><code>replicaNumber</code>: The number of the replicas to load when loading a collection.</p></td>
    </tr>
    <tr>
        <td><p><code>build()</code></p></td>
        <td><p>Constructs a <code>LoadCollectionParam</code> object</p></td>
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

