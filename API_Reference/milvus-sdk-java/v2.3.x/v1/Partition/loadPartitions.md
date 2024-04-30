# loadPartitions()

MilvusClient interface. This method loads partitions' data into query nodes' memory before the search or query.

```java
R<RpcStatus> loadPartitions(LoadPartitionsParam requestParam);
```

## LoadPartitionsParam

Use the `LoadPartitionsParam.Builder` to construct a `LoadPartitionsParam` object.

```java
import io.milvus.param.LoadPartitionsParam;
LoadPartitionsParam.Builder builder = LoadPartitionsParam.newBuilder();
```

Methods of `LoadPartitionsParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Set the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The target collection name.</td>
    </tr>
    <tr>
        <td>withPartitionNames(List&lt;String> partitionNames)</td>
        <td>Set the partition names list. Partition names list cannot be null or empty.</td>
        <td>partitionNames: The name list of partitions to be loaded.</td>
    </tr>
    <tr>
        <td>addPartitionName(String partitionName)</td>
        <td>Add a partition by name. Partition name cannot be empty or null.</td>
        <td>partitionName: A target partition name.</td>
    </tr>
    <tr>
        <td>withSyncLoad(Boolean syncLoad)</td>
        <td>Enable sync mode for load action. With sync mode enabled, the client keeps waiting until all segments of the partition are successfully loaded.If sync mode is disabled, client returns instantly after the loadPartitions() is called.By default sync mode is enabled.</td>
        <td>syncLoad: set to True is sync mode</td>
    </tr>
    <tr>
        <td>withSyncLoadWaitingInterval(Long milliseconds)</td>
        <td>Set the waiting interval for sync mode. In sync mode, the client constantly checks partition load state by interval.Interval must be greater than zero, and cannot be greater than `Constant.MAX_WAITING_LOADING_INTERVAL`.Default value is 500 milliseconds</td>
        <td>milliseconds: interval value(units: millisecond)</td>
    </tr>
    <tr>
        <td>withSyncLoadWaitingTimeout(Long seconds)</td>
        <td>Set the timeout value for sync mode.Timeout value must be greater than zero, and cannot be greater than `Constant.MAX_WAITING_LOADING_TIMEOUT`.Default value is 60 seconds.</td>
        <td>seconds: timeout value(units: second)</td>
    </tr>
    <tr>
        <td>withReplicaNumber(Integer replicaNumber)</td>
        <td>Specify replica number to load.Default value is 1.</td>
        <td>replicaNumber: replica number</td>
    </tr>
    <tr>
        <td>withRefresh(Boolean refresh)</td>
        <td>Whether to renew the segment list of this partition before loading. This flag must be set to FALSE when first time call the loadPartitions(). After loading a partition, call loadPartitions() again with refresh=TRUE, the server will look for new segments that are not loaded yet and tries to load them up.This method is mainly for bulkinsert() interface.</td>
        <td>refresh: The flag whether to renew segment list.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a LoadPartitionsParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `LoadPartitionsParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

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
