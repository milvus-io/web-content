# loadCollection()

A MilvusClient interface. This method loads the specified collection and all the data within to memory for search or query.

```Java
R<RpcStatus> loadCollection(LoadCollectionParam requestParam);
```

## LoadCollectionParam

Use the `LoadCollectionParam.Builder` to construct a `LoadCollectionParam` object.

```Java
import io.milvus.param.LoadCollectionParam;
LoadCollectionParam.Builder builder = LoadCollectionParam.newBuilder();
```

Methods of `LoadCollectionParam.Builder`:

| Method                                           | Description                                                  | Parameters                                                   |
| ------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName(String collectionName)`      | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection to load.        |
| `withSyncLoad(Boolean syncLoad)`                 | Enables sync mode when loading a collection. With sync mode enabled, the client keeps waiting until all segments of the collection are successfully loaded. If sync mode is disabled, the client returns instantly after `loadCollection()` is called. Sync mode is enabled by default. | `syncLoad`:A boolean value to indicate if sync mode is enabled. If the value is set to `True`, this means sync mode is enabled. |
| `withSyncLoadWaitingInterval(Long milliseconds)` | Sets the waiting interval for sync mode. In sync mode, the client checks the collection load status at intervals. The value must be greater than zero, and cannot be greater than `Constant.MAX_WAITING_LOADING_INTERVAL`. The default value is `500` milliseconds. | `milliseconds`: The time interval in milliseconds for checking the data load status. |
| `withSyncLoadWaitingTimeout(Long seconds)`       | Sets the timeout period for sync mode. The value must be greater than zero and cannot be greater than `Constant.MAX_WAITING_LOADING_TIMEOUT`. The default value is `60` seconds. | `seconds`: A duration of time in seconds to wait till timeout. |
| `withReplicaNumber(Integer replicaNumber)`       | Specifies the number of replicas to load. The default value is `1`. | `replicaNumber`: The number of the replicas to load when loading a collection. |
| `withRefresh(Boolean refresh)`  | Specifies whether to renew the segement list of this collection before loading. The flag must be `FALSE` when you load a collection for the first time. Set the flag to `TRUE` have Milvus look for the segments that are not loaded and try to load them into query nodes.  | `refresh`: The flag to indicate whether to have Milvus renew the segment list.
| `build()`                                        | Constructs a `LoadCollectionParam` object.                    | N/A                                                          |

The `LoadCollectionParam.Builder.build()` could throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

LoadCollectionParam param = LoadCollectionParam.newBuilder()
        .withCollectionName(collectionName)
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

