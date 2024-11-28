# loadCollection()

A MilvusClient interface. This method loads the specified collection and all the data within to memory for search or query.

```java
R<RpcStatus> loadCollection(LoadCollectionParam requestParam);
```

#### LoadCollectionParam

Use the `LoadCollectionParam.Builder` to construct a `LoadCollectionParam` object.

```java
import io.milvus.param.LoadCollectionParam;
LoadCollectionParam.Builder builder = LoadCollectionParam.newBuilder();
```

Methods of `LoadCollectionParam.Builder`:

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
        <td><p>withSyncLoad(Boolean syncLoad)</p></td>
        <td><p>Enables sync mode when loading a collection. With sync mode enabled, the client keeps waiting until all segments of the collection are successfully loaded. If sync mode is disabled, the client returns instantly after <code>loadCollection()</code> is called.<br/>Sync mode is enabled by default.</p></td>
        <td><p>syncLoad:A boolean value to indicate if sync mode is enabled. If the value is set to <code>True</code>, this means sync mode is enabled.</p></td>
    </tr>
    <tr>
        <td><p>withSyncLoadWaitingInterval(Long milliseconds)</p></td>
        <td><p>Sets the waiting interval for sync mode. In sync mode, the client checks the collection load status at intervals. The value must be greater than zero, and cannot be greater than Constant.MAX<em>WAITING</em>LOADING_INTERVAL. The default value is 500 milliseconds</p></td>
        <td><p>milliseconds: The time interval in milliseconds for checking the data load status.</p></td>
    </tr>
    <tr>
        <td><p>withSyncLoadWaitingTimeout(Long seconds)</p></td>
        <td><p>Sets the timeout period for sync mode. The value must be greater than zero and cannot be greater than Constant.MAX<em>WAITING</em>LOADING_TIMEOUT. The default value is 60 seconds.</p></td>
        <td><p>seconds: A during of time in seconds to wait till timeout.</p></td>
    </tr>
    <tr>
        <td><p>withReplicaNumber(Integer replicaNumber)</p></td>
        <td><p>Specifies the number of replicas to load. The default value is 1.</p></td>
        <td><p>replicaNumber: The number of the replicas to load when loading a collection.</p></td>
    </tr>
    <tr>
        <td><p>withRefresh(Boolean refresh)</p></td>
        <td><p>Whether to renew the segment list of this collection before loading. This flag must be set to FALSE when first time call the loadCollection(). After loading a collection, call loadCollection() again with refresh=TRUE, the server will look for new segments that are not loaded yet and tries to load them up.<br/>This method is mainly for bulkinsert() interface.</p></td>
        <td><p>refresh: The flag whether to renew segment list.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a LoadCollectionParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `LoadCollectionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

LoadCollectionParam param = LoadCollectionParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .withReplicaNumber(2)
        .withSyncLoad(Boolean.TRUE)
        .withSyncLoadWaitingInterval(500L)
        .withSyncLoadWaitingTimeout(30L)
        .build();
R<RpcStatus> response = client.loadCollection(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
