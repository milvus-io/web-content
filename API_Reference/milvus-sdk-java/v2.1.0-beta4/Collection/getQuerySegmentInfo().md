# getQuerySegmentInfo()

A MilvusClient interface. This method gets the query information of segments in a collection from query node, including row count, memory usage, index name, and more.

```Java
R<GetQuerySegmentInfoResponse> getQuerySegmentInfo(GetQuerySegmentInfoParam requestParam);
```

## GetQuerySegmentInfoParam

Use the `GetQuerySegmentInfoParam.Builder` to construct a `GetQuerySegmentInfoParam` object.

```Java
import io.milvus.param.GetQuerySegmentInfoParam;
GetQuerySegmentInfoParam.Builder builder = GetQuerySegmentInfoParam.newBuilder();
```

Methods of `GetQuerySegmentInfoParam.Builder`:

| Method                                      | Description                                                  | Parameters                                                   |
| ------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName(String collectionName)` | Sets the collection name. The collection name cannot be empty or null. | `collectionName`: The name of the collection to get the query information of the segment from. |
| `build()`                                   | Constructs a `GetQuerySegmentInfoParam` object.              | N/A                                                          |

The `GetQuerySegmentInfoParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetQuerySegmentInfoResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `GetQuerySegmentInfoResponse` held by the R template. The `GetQuerySegmentInfoResponse` object contains a list of `QuerySegmentInfo`, and you can use `getState()` in `QuerySegmentInfo` to get the state of the segment. This process is similar to that of [PersistentSegmentInfo](getPersistentSegmentInfo().md).

## Example

```Java
import io.milvus.param.*;
import io.milvus.grpc.GetQuerySegmentInfoResponse;
import io.milvus.grpc.QuerySegmentInfo;

GetQuerySegmentInfoParam param = GetQuerySegmentInfoParam.newBuilder()
        .withCollectionName(collectionName)
        .build();
R<GetQuerySegmentInfoResponse> response = client.getQuerySegmentInfo(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

GetQuerySegmentInfoResponse segmentInfo = response.getData();
for (int i = 0; i < segmentInfo.getInfosCount(); i++) {
    QuerySegmentInfo info = segmentInfo.getInfos(i);
    System.out.println("Segment ID: " + info.getSegmentID() + ", state: " + info.getState() + ", rows: " + info.getNumRows());
}
```

