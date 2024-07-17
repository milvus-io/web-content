# getFlushState()

MilvusClient interface. This method tests whether specified segments are flushed.

```java
R<GetFlushStateResponse> getFlushState(GetFlushStateParam requestParam);
```

#### GetFlushStateParam

Use the `GetFlushStateParam.Builder` to construct a `GetFlushStateParam` object.

```java
import io.milvus.param.GetFlushStateParam;
GetFlushStateParam.Builder builder = GetFlushStateParam.newBuilder();
```

Methods of `GetFlushStateParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withCollectionName(collectionName)</p></td>
        <td><p>Set the collection name. Collection name cannot be empty or null.</p></td>
        <td><p>collectionName: The target collection name.</p></td>
    </tr>
    <tr>
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>withSegmentIDs(List&lt;Long> segmentIDs)</p></td>
        <td><p>Set an ID list of segments to be tested. Typically the ID is returned by flush() method.</p></td>
        <td><p>segmentIDs: An ID list of segments.</p></td>
    </tr>
    <tr>
        <td><p>addSegmentID(Long segmentID)</p></td>
        <td><p>Add a segment ID to be tested. Typically the ID is returned by flush() method.</p></td>
        <td><p>segmentID: A segment ID.</p></td>
    </tr>
    <tr>
        <td><p>withFlushTs(Long flushTs)</p></td>
        <td><p>Input a time stamp of a flush action, get its flush state(optional).</p></td>
        <td><p>flushTs: A time stamp returned by the flush() response.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a GetFlushStateParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `GetFlushStateParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<GetFlushStateResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `GetFlushStateResponse` held by the `R` template.

#### Example

```java
import io.milvus.param.*;
import io.milvus.grpc.GetFlushStateResponse;

GetFlushStateParam param = GetFlushStateParam.newBuilder()
        .addSegmentID(COLLECTION_NAME)
        .build();
R<GetFlushStateResponse> response = client.getFlushState(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

System.out.println("Flushed: " + response.getData().getFlushed());
```
