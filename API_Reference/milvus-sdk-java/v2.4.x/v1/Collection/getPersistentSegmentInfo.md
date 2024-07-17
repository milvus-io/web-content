# getPersistentSegmentInfo()

A MilvusClient interface. This method gets the information of persistent segments from data node, including row count, persistence state (growing or flushed), and more.

```java
R<GetPersistentSegmentInfoResponse> getPersistentSegmentInfo(GetPersistentSegmentInfoParam requestParam);
```

#### GetPersistentSegmentInfoParam

Use the `GetPersistentSegmentInfoParam.Builder` to construct a `GetPersistentSegmentInfoParam` object.

```java
import io.milvus.param.GetPersistentSegmentInfoParam;
GetPersistentSegmentInfoParam.Builder builder = GetPersistentSegmentInfoParam.newBuilder();
```

Methods of `GetPersistentSegmentInfoParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(String collectionName)</p></td>
        <td><p>Sets the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The name of the collection.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Constructs a GetPersistentSegmentInfoParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `GetPersistentSegmentInfoParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<GetPersistentSegmentInfoResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and the error message of the exception.

- If the API succeeds, it returns a valid `GetPersistentSegmentInfoResponse` held by the `R` template. The `GetPersistentSegmentInfoResponse` object contains a list of `PersistentSegmentInfo`, and you can use `PersistentSegmentInfo.getState()` to get the state of the segment.

#### SegmentState

```java
package io.milvus.grpc;
public enum SegmentState
```

<table>
   <tr>
     <th><p><strong>Type</strong></p></th>
     <th><p><strong>Code</strong></p></th>
     <th><p><strong>Description</strong></p></th>
   </tr>
   <tr>
     <td><p>SegmentStateNone</p></td>
     <td><p>0</p></td>
     <td><p>For internal usage.</p></td>
   </tr>
   <tr>
     <td><p>NotExist</p></td>
     <td><p>1</p></td>
     <td><p>For internal usage.</p></td>
   </tr>
   <tr>
     <td><p>Growing</p></td>
     <td><p>2</p></td>
     <td><p>A growing segment in query node.</p></td>
   </tr>
   <tr>
     <td><p>Sealed</p></td>
     <td><p>3</p></td>
     <td><p>The segment is sealed and waiting to be flushed.</p></td>
   </tr>
   <tr>
     <td><p>Flushed</p></td>
     <td><p>4</p></td>
     <td><p>The segment has been flushed to storage.</p></td>
   </tr>
   <tr>
     <td><p>Flushing</p></td>
     <td><p>5</p></td>
     <td><p>The server is flushing this segment.</p></td>
   </tr>
   <tr>
     <td><p>Dropped</p></td>
     <td><p>6</p></td>
     <td><p>The segment has been marked as deleted.</p></td>
   </tr>
   <tr>
     <td><p>Importing</p></td>
     <td><p>7</p></td>
     <td><p>Reserved for bulkinsert interface.</p></td>
   </tr>
</table>

#### Example

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
