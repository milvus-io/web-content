# getPartitionStatistics()

A MilvusClient interface. This method shows the statistical information of a specified partition.

```Java
R<GetPartitionStatisticsResponse> getPartitionStatistics(GetPartitionStatisticsParam requestParam);
```

## GetPartitionStatisticsParam

Use the `GetPartitionStatisticsParam.Builder` to construct a `GetPartitionStatisticsParam `object.

```Java
import io.milvus.param.GetPartitionStatisticsParam;
GetPartitionStatisticsParam.Builder builder = GetPartitionStatisticsParam.newBuilder();
```

Methods of `GetPartitionStatisticsParam.Builder`:

| Method                                      | Description                                                  | Parameters                                        |
| ------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------- |
| `withCollectionName(String collectionName)` | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection whose partition statistical information needs to be checked.         |
| `withPartitionName(String partitionName)`   | Sets the partition name. The partition name cannot be empty or null. | `partitionName`: The name of the partition whose statistical information needs to be checked.           |
| `withFlush(Boolean flush)`                  | Request a flush action before retrieving partition statistics. The value is `True` by default. | `flush`: Set the value to `True` to request a flush action. |
| `build()`                                   | Constructs a `GetPartitionStatisticsParam` object.           | N/A                                               |

The `GetPartitionStatisticsParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetPartitionStatisticsResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `GetPartitionStatisticsResponse` held by the R template. You can use `GetPartStatResponseWrapper` to get statistics easily.

## GetPartStatResponseWrapper

A tool class to encapsulate the `GetPartitionStatisticsResponse`. 

```Java
import io.milvus.response.GetPartStatResponseWrapper;
GetPartStatResponseWrapper wrapper = new GetPartStatResponseWrapper(partStatResponse);
```

Methods of `GetPartStatResponseWrapper`:

|   Method        |   Description                                                |   Returns   |
| --------------- | ------------------------------------------------------------ | ----------- |
| `getRowCount()` | Gets the row count of a partition. `NumberFormatException` is thrown if the row count string is illegal. | `long`      |

## Example

```Java
import io.milvus.param.*;
import io.milvus.grpc.GetPartitionStatisticsResponse;
import io.milvus.response.GetPartStatResponseWrapper;

GetPartitionStatisticsParam param = GetPartitionStatisticsParam.newBuilder()
        .withCollectionName(collectionName)
        .withPartitionName("_default")
        .build();
R<GetPartitionStatisticsResponse> response = client.getPartitionStatistics(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

GetPartStatResponseWrapper wrapper = new GetPartStatResponseWrapper(response.getData());
System.out.println("Partition row count: " + wrapper.getRowCount());
```
