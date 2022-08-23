# dropPartition()

A MilvusClient interface. This method drops a partition. 

<div class="alert note">
This method drops all data in this partition and the `_default` partition cannot be dropped.
</div>

```Java
R<RpcStatus> dropPartition(DropPartitionParam requestParam);
```

## DropPartitionParam

Use the `DropPartitionParam.Builder` to construct a `DropPartitionParam` object.

```Java
import io.milvus.param.DropPartitionParam;
DropPartitionParam.Builder builder = DropPartitionParam.newBuilder();
```

Methods of `DropPartitionParam.Builder`:

| Method                                    | Description                                                  | Parameters                             |
| ----------------------------------------- | ------------------------------------------------------------ | -------------------------------------- |
| `withCollectionName(String collectionName)` | Sets the collection name. Collection name cannot be empty or null. | `collectionName`: Target collection name. |
| `withPartitionName(String partitionName)`   | Sets the partition name. Partition name cannot be empty or null. | `partitionName`: Target partition name.   |
| `build()`                                   | Constructs a `DropPartitionParam` object.                        |                           N/A             |

The `DropPartitionParam.Builder.build()` could throw the following exceptions:

- `ParamException` -- error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

DropPartitionParam param = DropPartitionParam.newBuilder()
        .withCollectionName(collectionName)
        .withPartitionName(partitionName)
        .build();
R<RpcStatus> response = client.dropPartition(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
