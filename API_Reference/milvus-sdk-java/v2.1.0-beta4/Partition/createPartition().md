# createPartition()

A MilvusClient interface. This method creates a partition in a specified collection.

```Java
R<RpcStatus> createPartition(CreatePartitionParam requestParam);
```

## CreatePartitionParam

Use the `CreatePartitionParam.Builder` to construct a `CreatePartitionParam` object.

```Java
import io.milvus.param.CreatePartitionParam;
CreatePartitionParam.Builder builder = CreatePartitionParam.newBuilder();
```

Methods of `CreatePartitionParam.Builder`:

| Method                                      | Description                                                  | Parameters                                |
| ------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------- |
| `withCollectionName(String collectionName)` | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the  collection in which a partition needs to be created. |
| `withPartitionName(String partitionName)`   | Sets the partition name. The partition name cannot be empty or null. | `partitionName`: The name of the partition to create.          |
| `build()`                                   | Constructs a `CreatePartitionParam` object.                  | N/A                                       |

The `CreatePartitionParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

CreatePartitionParam param = CreatePartitionParam.newBuilder()
        .withCollectionName(collectionName)
        .withPartitionName(partitionName)
        .build();
R<RpcStatus> response = client.createPartition(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
