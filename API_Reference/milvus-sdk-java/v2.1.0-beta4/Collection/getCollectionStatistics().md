# getCollectionStatistics()

A MilvusClient interface. This method shows the statistical information of a specified collection. 


<div class="alert note">
The current version only returns the row count of a collection. This method can be deprecated in the future. 
</div>


```Java
R<GetCollectionStatisticsResponse> getCollectionStatistics(GetCollectionStatisticsParam requestParam);
```

## GetCollectionStatisticsParam

Use the `GetCollectionStatisticsParam.Builder` to construct a `GetCollectionStatisticsParam` object.

```Java
import io.milvus.param.GetCollectionStatisticsParam;
GetCollectionStatisticsParam.Builder builder = GetCollectionStatisticsParam.newBuilder();
```

Methods of `GetCollectionStatisticsParam.Builder`:

| Method                                      | Description                                                  | Parameters                                                   |
| ------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName(String collectionName)` | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection whose statistical information needs to be checked. |
| `withFlush(Boolean flush)`                  | Requests a flush action before retrieving collection statistics. | `flush`: Set the value to `true` to perform a flush action.  |
| `build()`                                   | Constructs a `GetCollectionStatisticsParam` object.          | N/A                                                          |

The `GetCollectionStatisticsParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetCollectionStatisticsResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `GetCollectionStatisticsResponse` held by the R template. You can use `GetCollStatResponseWrapper` to get the information.

## GetCollStatResponseWrapper

A tool class to encapsulate the `GetCollectionStatisticsResponse`. 

```Java
import io.milvus.response.GetCollStatResponseWrapper;
GetCollStatResponseWrapper wrapper = new GetCollStatResponseWrapper(getStatResponse);
```

Methods of `GetCollStatResponseWrapper`:

| Method      | Description                                              | Parameters | Returns |
| --------------- | ------------------------------------------------------------ | -------------- | ----------- |
| `getRowCount()` | Gets the row count of a collection. Note that due to technical reasones, the deleted entities are not counted in the row count. | N/A            | long        |

## Example

```Java
import io.milvus.param.*;
import io.milvus.response.GetCollStatResponseWrapper;
import io.milvus.grpc.GetCollectionStatisticsResponse;

GetCollectionStatisticsParam param = GetCollectionStatisticsParam.newBuilder()
        .withCollectionName(collectionName)
        .build();
R<GetCollectionStatisticsResponse> response = client.getCollectionStatistics(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

GetCollStatResponseWrapper wrapper = new GetCollStatResponseWrapper(response.getData());
System.out.println("Row count: " + wrapper.getRowCount());
```

