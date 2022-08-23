# showCollections()

A MilvusClient interface. This method lists all the collections or gets the collection loading status*.*

```Java
R<ShowCollectionsResponse> showCollections(ShowCollectionsParam requestParam);
```

## ShowCollectionsParam

Use the `ShowCollectionsParam.Builder` to construct a `ShowCollectionsParam` object.

```Java
import io.milvus.param.ShowCollectionsParam;
ShowCollectionsParam.Builder builder = ShowCollectionsParam.newBuilder();
```

Methods of `ShowCollectionsParam.Builder`:

| Method                                              | Description                                                  | Parameters                                                 |
| --------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| `withCollectionNames(List<String> collectionNames)` | Sets a list of collection names. If the list is empty, the method will return all the collections in database. Collection name cannot be empty or null. | `collectionNames`: a list of the collection names to show. |
| `addCollectionName(String collectionName)`          | Adds a collection name. Collection name cannot be empty or null. | `collectionName`: The name of the collection to show.      |
| `build()`                                           | Constructs a `ShowCollectionsParam` object                   | N/A                                                        |

The `ShowCollectionsParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<ShowCollectionsResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `ShowCollectionsResponse` held by the R template. You can use `ShowCollResponseWrapper` to get the information.

## ShowCollResponseWrapper

A tool class to encapsulate the `ShowCollectionsResponse`. 

```Java
import io.milvus.response.ShowCollResponseWrapper;
ShowCollResponseWrapper wrapper = new ShowCollResponseWrapper(showCollectionsResponse);
```

Methods of `ShowCollResponseWrapper`:

| **Method**                                       | **Description**                                              | **Parameters**                    | **Returns**          |
| ------------------------------------------------ | ------------------------------------------------------------ | --------------------------------- | -------------------- |
| `getCollectionsInfo()`                           | Returns a list of `CollectionInfo` objects. Each `CollectionInfo` represents a collection. | N/A                               | List<CollectionInfo> |
| `getCollectionInfoByName(String collectionName)` | Gets a `CollectionInfo` object by collection name.           | `collectionName`: collection name | CollectionInfo       |

## CollectionInfo

A tool class to store a collection's information.

Methods of `ShowCollResponseWrapper.CollectionInfo`:

| **Method**                | **Description**                                              | **Returns** |
| ------------------------- | ------------------------------------------------------------ | ----------- |
| `getName()`               | Gets the name of the collection.                             | String      |
| `getId()`                 | Gets the ID of the collection.                               | long        |
| `getUtcTimestamp()`       | Gets a UTC timestamp that indicates when this collection is created. This method is for internal usage. | long        |
| `getInMemoryPercentage()` | Load percentage on query node.                               | long        |

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

