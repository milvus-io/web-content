# loadPartitions()

A MilvusClient interface. This method loads the data in a partition into memory before a search or query.

```Java
R<RpcStatus> loadPartitions(LoadPartitionsParam requestParam);
```

## LoadPartitionsParam

Use the `LoadPartitionsParam.Builder` to construct a `LoadPartitionsParam` object.

```Java
import io.milvus.param.LoadPartitionsParam;
LoadPartitionsParam.Builder builder = LoadPartitionsParam.newBuilder();
```

Methods of `LoadPartitionsParam.Builder`:

| Method                                            | Description                                                  | Parameters                                          |
| ------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------- |
| `withCollectionName(String collectionName)`       | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection whose partition needs to be loaded.           |
| `withPartitionNames(List<String> partitionNames)` | Sets the partition name list. The partition name list cannot be null or empty. | `partitionNames`:  A list of the names of the partitions to load.         |
| `addPartitionName(String partitionName)`          | Adds a partition by name. The partition name cannot be empty or null. | `partitionName`: The name of the partition to load.             |
| `withSyncLoad(Boolean syncLoad)`                  | Enables sync mode for load action. With sync mode enabled, the client keeps waiting until all segments of the partition are successfully loaded. If sync mode is disabled, the client returns instantly after the `loadPartitions()` is called. Sync mode is enabled by default. | `syncLoad`: Set the value to `True` to enable sync mode.    |
| `withSyncLoadWaitingInterval(Long milliseconds)`  | Sets the waiting interval for sync mode. In sync mode, the client constantly checks partition load state at intervals. The interval must be greater than zero, and cannot be greater than `Constant.MAX_WAITING_LOADING_INTERVAL`. The default value is `500` milliseconds. | `milliseconds`: The interval value (unit: millisecond). |
| `withSyncLoadWaitingTimeout(Long seconds)`        | Sets the timeout value for sync mode. Timeout value must be greater than zero, and cannot be greater than `Constant.MAX_WAITING_LOADING_TIMEOUT`. The default value is `60` seconds. | `seconds`: The timeout value (unit: second).            |
| `withReplicaNumber(Integer replicaNumber)`        | Specifies the replica number to load. The default value is `1`. | `replicaNumber`: The number of replicas to load when loading the partition.                   |
| `build()`                                         | Constructs a `LoadPartitionsParam` object.                   | N/A                                                 |

The `LoadPartitionsParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

LoadPartitionsParam param = LoadPartitionsParam.newBuilder()
        .withCollectionName(collectionName)
        .addPartitionName(partitionName)
        .build();
R<RpcStatus> response = client.loadPartitions(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```


