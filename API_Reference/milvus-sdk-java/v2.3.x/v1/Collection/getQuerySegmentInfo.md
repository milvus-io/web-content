# getQuerySegmentInfo()

A MilvusClient interface. This method gets the query information of segments in a collection from the query node, including row count, memory usage, index name, and more.

```java
R<GetQuerySegmentInfoResponse> getQuerySegmentInfo(GetQuerySegmentInfoParam requestParam);
```

#### GetQuerySegmentInfoParam

Use the `GetQuerySegmentInfoParam.Builder` to construct a `GetQuerySegmentInfoParam` object.

```java
import io.milvus.param.GetQuerySegmentInfoParam;
GetQuerySegmentInfoParam.Builder builder = GetQuerySegmentInfoParam.newBuilder();
```

Methods of `GetQuerySegmentInfoParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the collection to get the query information of the segment from.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a GetQuerySegmentInfoParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `GetQuerySegmentInfoParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<GetQuerySegmentInfoResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `GetQuerySegmentInfoResponse` held by the `R`  template. The `GetQuerySegmentInfoResponse` object contains a list of `QuerySegmentInfo`, and you can use `QuerySegmentInfo.getState()` to get the state of the segment. This process is similar to that of `PersistentSegmentInfo`.

#### Example

```java
import io.milvus.param.*;
import io.milvus.grpc.GetQuerySegmentInfoResponse;
import io.milvus.grpc.QuerySegmentInfo;

GetQuerySegmentInfoParam param = GetQuerySegmentInfoParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
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
