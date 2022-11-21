# showPartitions()

A MilvusClient interface. This method shows all the partitions in a specified collection.

```Java
R<ShowPartitionsResponse> showPartitions(ShowPartitionsParam requestParam);
```

## ShowPartitionsParam

Use the `ShowPartitionsParam.Builder` to construct a `ShowPartitionsParam` object.

```Java
import io.milvus.param.ShowPartitionsParam;
ShowPartitionsParam.Builder builder = ShowPartitionsParam.newBuilder();
```

Methods of `ShowPartitionsParam.Builder`:

| Method                                            | Description                                                  | Parameters                                |
| ------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------- |
| `withCollectionName(String collectionName)`       | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection whose partitions needs to be listed. |
| `withPartitionNames(List<String> partitionNames)` | Sets the partition name list. The partition name list cannot be empty or null. | `partitionNames`:  A list of the names of the partitions to list.  |
| `addPartitionName(String partitionName)`          | Adds a partition by name. The partition name cannot be empty or null. | `partitionName`: The name of the partition to list.   |
| `build()`                                         | Constructs a `ShowPartitionsParam` object.                   | N/A                                       |

The `ShowPartitionsParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<ShowPartitionsResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `ShowPartitionsResponse` held by the R template. You can use `ShowPartResponseWrapper` to get the information easily.

## ShowPartResponseWrapper

A tool class to encapsulate the `ShowPartitionsResponse`. 

```Java
import io.milvus.response.ShowPartResponseWrapper;
ShowPartResponseWrapper wrapper = new ShowPartResponseWrapper(showPartitionsResponse);
```

Methods of `ShowPartitionsResponse`:

|   Method                                        |   Description                                           |   Parameters                            |   Returns             |
| ----------------------------------------------- | ------------------------------------------------------- | --------------------------------------- | --------------------- |
| `getPartitionsInfo() `                          | Returns a list of `PartitionInfo`.                      | N/A                                     | `List<PartitionInfo>` |
| `getPartitionInfoByName(String partitionName) ` | Returns a `PartitionInfo` object by the partition name. | `partitionName`: The name of the partition to list. | `PartitionInfo`       |

## PartitionInfo

A tool class to hold information of a partition.

Methods of `ShowPartitionsResponse.PartitionInfo`:

| Method        | Description                       | Returns  |
| ----------------- | ------------------------------------- | ------------ |
| `getIndexType()`  | Gets the index type.                      | <code><a href="../Misc/IndexType.md">IndexType</a></code>  |
| `getMetricType()` | Gets the metric type                      | <code><a href="../Misc/MetricType.md">MetricType</a></code> |
| `getExtraParam()` | Gets the index parameters in `JSON` format. | `String`     |

## Example

```Java
import io.milvus.param.*;
import io.milvus.grpc.ShowPartitionsResponse;
import io.milvus.response.ShowPartResponseWrapper;

ShowPartitionsParam param = ShowPartitionsParam.newBuilder()
        .withCollectionName(collectionName)
        .addPartitionName("_default")
        .build();
R<ShowPartitionsResponse> response = client.showPartitions(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

ShowPartResponseWrapper wrapper = new ShowPartResponseWrapper(response.getData());
ShowPartResponseWrapper.PartitionInfo info = wrapper.getPartitionInfoByName("_default");
System.out.println("Partition name: " + info.getName() + ", ID: " + info.getId() + ", in-memory: " + info.getInMemoryPercentage() + "%");
```
