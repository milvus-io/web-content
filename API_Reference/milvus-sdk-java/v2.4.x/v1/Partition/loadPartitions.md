# loadPartitions()

MilvusClient interface. This method loads partitions' data into query nodes' memory before the search or query.

```java
R<RpcStatus> loadPartitions(LoadPartitionsParam requestParam);
```

#### LoadPartitionsParam

Use the `LoadPartitionsParam.Builder` to construct a `LoadPartitionsParam` object.

```java
import io.milvus.param.LoadPartitionsParam;
LoadPartitionsParam.Builder builder = LoadPartitionsParam.newBuilder();
```

Methods of `LoadPartitionsParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Set the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The target collection name.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withPartitionNames(List\<String> partitionNames)</p></td>
        <td><p>Set the partition names list. Partition names list cannot be null or empty.</p></td>
        <td><p>partitionNames: <br/>The name list of partitions to be loaded.</p></td>
    </tr>
    <tr>
        <td><p>addPartitionName(String partitionName)</p></td>
        <td><p>Add a partition by name. Partition name cannot be empty or null.</p></td>
        <td><p>partitionName: A target partition name.</p></td>
    </tr>
    <tr>
        <td><p>withSyncLoad(Boolean syncLoad)</p></td>
        <td><p>Enable sync mode for load action. With sync mode enabled, the client keeps waiting until all segments of the partition are successfully loaded.If sync mode is disabled, client returns instantly after the loadPartitions() is called.<br/>By default sync mode is enabled.</p></td>
        <td><p>syncLoad: set to True is sync mode</p></td>
    </tr>
    <tr>
        <td><p>withSyncLoadWaitingInterval(Long milliseconds)</p></td>
        <td><p>Set the waiting interval for sync mode. In sync mode, the client constantly checks partition load state by interval.<br/>Interval must be greater than zero, and cannot be greater than <code>Constant.MAX_WAITING_LOADING_INTERVAL</code>.<br/>Default value is 500 milliseconds</p></td>
        <td><p>milliseconds: interval value(units: millisecond)</p></td>
    </tr>
    <tr>
        <td><p>withSyncLoadWaitingTimeout(Long seconds)</p></td>
        <td><p>Set the timeout value for sync mode.<br/>Timeout value must be greater than zero, and cannot be greater than <code>Constant.MAX_WAITING_LOADING_TIMEOUT</code>.<br/>Default value is 60 seconds.</p></td>
        <td><p>seconds: timeout value(units: second)</p></td>
    </tr>
    <tr>
        <td><p>withReplicaNumber(Integer replicaNumber)</p></td>
        <td><p>Specify replica number to load.<br/>Default value is 1.</p></td>
        <td><p>replicaNumber: replica number</p></td>
    </tr>
    <tr>
        <td><p>withRefresh(Boolean refresh)</p></td>
        <td><p>Whether to renew the segment list of this partition before loading. This flag must be set to FALSE when first time call the loadPartitions(). After loading a partition, call loadPartitions() again with refresh=TRUE, the server will look for new segments that are not loaded yet and tries to load them up.<br/>This method is mainly for bulkinsert() interface.</p></td>
        <td><p>refresh: The flag whether to renew segment list.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a LoadPartitionsParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `LoadPartitionsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.*;

LoadPartitionsParam param = LoadPartitionsParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .addPartitionName(PARTITION_NAME)
        .build();
R<RpcStatus> response = client.loadPartitions(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
