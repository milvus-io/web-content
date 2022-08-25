# hasPartition()

A MilvusClient interface. This method checks if a partition exists in the specified collection.

```Java
R<Boolean> hasPartition(HasPartitionParam requestParam);
```

## HasPartitionParam

Use the `HasPartitionParam.Builder` to construct a `HasPartitionParam` object.

```Java
import io.milvus.param.HasPartitionParam;
HasPartitionParam.Builder builder = HasPartitionParam.newBuilder();
```

Methods of `HasPartitionParam.Builder`:

| Method                                      | Description                                                  | Parameters                                |
| ------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------- |
| `withCollectionName(String collectionName)` | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection to check. |
| `withPartitionName(String partitionName)`   | Sets the partition name. The partition name cannot be empty or null. | `partitionName`: The name of the partition to check.    |
| `build()`                                   | Constructs a `HasPartitionParam `object.                     | N/A                                       |

The `HasPartitionParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<Boolean>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

HasPartitionParam param = HasPartitionParam.newBuilder()
        .withCollectionName(collectionName)
        .withPartitionName(partitionName)
        .build();
R<Boolean> response = client.hasPartition(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

System.out.println("Partition existence: " + response.getData());
```
