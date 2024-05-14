# getPersistentSegmentInfo()

A MilvusClient interface. This method gets the information of persistent segments from data node, including row count, persistence state (growing or flushed), and more.

```java
R<GetPersistentSegmentInfoResponse> getPersistentSegmentInfo(GetPersistentSegmentInfoParam requestParam);
```

## GetPersistentSegmentInfoParam

Use the `GetPersistentSegmentInfoParam.Builder` to construct a `GetPersistentSegmentInfoParam` object.

```java
import io.milvus.param.GetPersistentSegmentInfoParam;
GetPersistentSegmentInfoParam.Builder builder = GetPersistentSegmentInfoParam.newBuilder();
```

Methods of `GetPersistentSegmentInfoParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withCollectionName(String collectionName)</td>
        <td>Sets the collection name. Collection name cannot be empty or null.</td>
        <td>collectionName: The name of the collection.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Constructs a GetPersistentSegmentInfoParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `GetPersistentSegmentInfoParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetPersistentSegmentInfoResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `GetPersistentSegmentInfoResponse` held by the `R` template. The `GetPersistentSegmentInfoResponse` object contains a list of `PersistentSegmentInfo`, and you can use `PersistentSegmentInfo.getState()` to get the state of the segment.

## SegmentState

```java
package io.milvus.grpc;
public enum SegmentState
```

<table>
   <tr>
     <th><strong>Type</strong></th>
     <th><strong>Code</strong></th>
     <th><strong>Description</strong></th>
   </tr>
   <tr>
     <td>SegmentStateNone</td>
     <td>0</td>
     <td>For internal usage.</td>
   </tr>
   <tr>
     <td>NotExist</td>
     <td>1</td>
     <td>For internal usage.</td>
   </tr>
   <tr>
     <td>Growing</td>
     <td>2</td>
     <td>A growing segment in query node.</td>
   </tr>
   <tr>
     <td>Sealed</td>
     <td>3</td>
     <td>The segment is sealed and waiting to be flushed.</td>
   </tr>
   <tr>
     <td>Flushed</td>
     <td>4</td>
     <td>The segment has been flushed to storage.</td>
   </tr>
   <tr>
     <td>Flushing</td>
     <td>5</td>
     <td>The server is flushing this segment.</td>
   </tr>
   <tr>
     <td>Dropped</td>
     <td>6</td>
     <td>The segment has been marked as deleted.</td>
   </tr>
   <tr>
     <td>Importing</td>
     <td>7</td>
     <td>Reserved for bulkinsert interface.</td>
   </tr>
</table>

## Example

```java
import io.milvus.param.*;
import io.milvus.grpc.GetPersistentSegmentInfoResponse;
import io.milvus.grpc.PersistentSegmentInfo;

GetPersistentSegmentInfoParam param = GetPersistentSegmentInfoParam.newBuilder()
        .withCollectionName(COLLECTION_NAME)
        .build();
R<GetPersistentSegmentInfoResponse> response = client.getPersistentSegmentInfo(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

GetPersistentSegmentInfoResponse segmentInfo = response.getData();
for (int i = 0; i < segmentInfo.getInfosCount(); i++) {
    PersistentSegmentInfo info = segmentInfo.getInfos(i);
    System.out.println("Segment ID: " + info.getSegmentID() + ", state: " + info.getState() + ", rows: " + info.getNumRows());
}
```
