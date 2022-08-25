# flush()

A MilvusClient interface. This method triggers a flush action in which all growing segments in the specified collection are marked as sealed and then flushed to storage. 

```Java
R<FlushResponse> flush(FlushParam requestParam);
```

## FlushParam

Use the `FlushParam.Builder` to construct a `FlushParam` object.

```Java
import io.milvus.param.FlushParam;
FlushParam.Builder builder = FlushParam.newBuilder();
```

Methods of `FlushParam.Builder`:

| Method                                              | Description                                                  | Parameters                                                   |
| --------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionNames(List<String> collectionNames)` | Sets a list of collections to be flushed.                    | `collectionNames`: A list of the names of the collections to be flushed. |
| `addCollectionName(String collectionName)`          | Adds a collection to be flushed.                             | `collectionName`: The name of the collection to be flushed.    |
| `withSyncFlush(Boolean syncFlush)`                  | Sets the flush function to sync mode. With sync mode enabled, the client keeps waiting until all segments of the collection are successfully flushed. If sync mode is disabled, the client immediately returns the result after `flush()` is called. | `syncFlush`: A boolean value to indicate if sync mode is enabled. Sync mode is enabled if the value is set to `True`. |
| `withSyncFlushWaitingInterval(Long milliseconds)`   | Sets the waiting interval in sync mode. With sync mode enabled, the client will check segments status at intervals. The value must be greater than zero, and cannot be greater than `Constant.MAX_WAITING_FLUSHING_INTERVAL`. The default value is `500` miliseconds. | `milliseconds`: The time interval in milliseconds for checking the flush status. |
| `withSyncFlushWaitingTimeout(Long seconds)`         | Sets the timeout period for sync mode. The value must be greater than zero, and cannot be greater than `Constant.MAX_WAITING_FLUSHING_TIMEOUT`. The default value is `60` seconds. | `seconds`: A during of time in seconds to wait till timeout. |
| `build()`                                           | Constructs a `FlushParam` object                             | N/A                                                          |

The `FlushParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<FlushResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `FlushResponse` held by the R template. The `FlushResponse` contains a map of collection name and a corresponding list of flushed segments. The map is internally used by other SDK methods such as [createIndex()](../Index/createIndex().md).

## Example

```Java
import io.milvus.param.*;
import io.milvus.grpc.FlushResponse;

FlushParam param = FlushParam.newBuilder()
        .addCollectionName(collectionName)
        .build();
R<FlushResponse> response = client.flush(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

GetCollStatResponseWrapper wrapper = new GetCollStatResponseWrapper(response.getData());
System.out.println("Row count: " + wrapper.getRowCount());
```

