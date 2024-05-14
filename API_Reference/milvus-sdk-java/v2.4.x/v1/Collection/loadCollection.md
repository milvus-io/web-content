# loadCollection()

A MilvusClient interface. This method loads the specified collection and all the data within to memory for search or query.

```java
R<RpcStatus> loadCollection(LoadCollectionParam requestParam);
```

## LoadCollectionParam

Use the `LoadCollectionParam.Builder` to construct a `LoadCollectionParam` object.

```java
import io.milvus.param.LoadCollectionParam;
LoadCollectionParam.Builder builder = LoadCollectionParam.newBuilder();
```

Methods of `LoadCollectionParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection to load.</td>
    </tr>
    <tr>
        <td>withSyncLoad(Boolean syncLoad)</td>
        <td>Enables sync mode when loading a collection. With sync mode enabled, the client keeps waiting until all segments of the collection are successfully loaded. If sync mode is disabled, the client returns instantly after <code>loadCollection()</code> is called.<br/>Sync mode is enabled by default.</td>
        <td>syncLoad:A boolean value to indicate if sync mode is enabled. If the value is set to <code>True</code>, this means sync mode is enabled.</td>
    </tr>
    <tr>
        <td>withSyncLoadWaitingInterval(Long milliseconds)</td>
        <td>Sets the waiting interval for sync mode. In sync mode, the client checks the collection load status at intervals. The value must be greater than zero, and cannot be greater than Constant.MAX<em>WAITING</em>LOADING_INTERVAL. The default value is 500 milliseconds</td>
        <td>milliseconds: The time interval in milliseconds for checking the data load status.</td>
    </tr>
    <tr>
        <td>withSyncLoadWaitingTimeout(Long seconds)</td>
        <td>Sets the timeout period for sync mode. The value must be greater than zero and cannot be greater than Constant.MAX<em>WAITING</em>LOADING_TIMEOUT. The default value is 60 seconds.</td>
        <td>seconds: A during of time in seconds to wait till timeout.</td>
    </tr>
    <tr>
        <td>withReplicaNumber(Integer replicaNumber)</td>
        <td>Specifies the number of replicas to load. The default value is 1.</td>
        <td>replicaNumber: The number of the replicas to load when loading a collection.</td>
    </tr>
    <tr>
        <td>withRefresh(Boolean refresh)</td>
        <td>Whether to renew the segment list of this collection before loading. This flag must be set to FALSE when first time call the loadCollection(). After loading a collection, call loadCollection() again with refresh=TRUE, the server will look for new segments that are not loaded yet and tries to load them up.<br/>This method is mainly for bulkinsert() interface.</td>
        <td>refresh: The flag whether to renew segment list.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a LoadCollectionParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `LoadCollectionParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

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
