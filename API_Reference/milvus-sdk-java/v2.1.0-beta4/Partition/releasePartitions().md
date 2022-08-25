# releasePartitions()

A MilvusClient interface. This method releases the data in a partition or partitions from memory.

```Java
R<RpcStatus> releasePartitions(ReleasePartitionsParam requestParam);
```

## ReleasePartitionsParam

Use the `ReleasePartitionsParam.Builder` to construct a `ReleasePartitionsParam` object.

```Java
import io.milvus.param.ReleasePartitionsParam;
ReleasePartitionsParam.Builder builder = ReleasePartitionsParam.newBuilder();
```

Methods of `ReleasePartitionsParam.Builder`:

| Method                                          | Description                                                  | Parameters                             |
| ----------------------------------------------- | ------------------------------------------------------------ | -------------------------------------- |
| `withCollectionName(String collectionName)`       | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection whose partition needs to be released. |
| `withPartitionNames(List<String> partitionNames)` | Sets the partition name list. The partition name list cannot be null or empty. | `partitionNames`:  A list of the names of the partitions to release.  |
| `addPartitionName(String partitionName)`          | Adds a partition by name. The partition name cannot be empty or null. | `partitionName`: The name of the partition to release.   |
| `build()`                                         | Constructs a `ReleasePartitionsParam` object.                    |    N/A                                    |

The `ReleasePartitionsParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

ReleasePartitionsParam param = ReleasePartitionsParam.newBuilder()
        .withCollectionName(collectionName)
        .addPartitionName(partitionName)
        .build();
R<Boolean> response = client.releasePartitions(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
