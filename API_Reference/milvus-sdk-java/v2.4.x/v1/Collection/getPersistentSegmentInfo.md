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

|  **Type**         |  **Code** |  **Description**                                  |
| ----------------- | --------- | ------------------------------------------------- |
|  SegmentStateNone |  0        |  For internal usage.                              |
|  NotExist         |  1        |  For internal usage.                              |
|  Growing          |  2        |  A growing segment in query node.                 |
|  Sealed           |  3        |  The segment is sealed and waiting to be flushed. |
|  Flushed          |  4        |  The segment has been flushed to storage.         |
|  Flushing         |  5        |  The server is flushing this segment.             |
|  Dropped          |  6        |  The segment has been marked as deleted.          |
|  Importing        |  7        |  Reserved for bulkinsert interface.               |

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
