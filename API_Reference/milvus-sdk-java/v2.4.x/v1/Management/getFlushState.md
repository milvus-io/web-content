# getFlushState()

MilvusClient interface. This method tests whether specified segments are flushed.

```java
R<GetFlushStateResponse> getFlushState(GetFlushStateParam requestParam);
```

## GetFlushStateParam

Use the `GetFlushStateParam.Builder` to construct a `GetFlushStateParam` object.

```java
import io.milvus.param.GetFlushStateParam;
GetFlushStateParam.Builder builder = GetFlushStateParam.newBuilder();
```

Methods of `GetFlushStateParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withSegmentIDs(List<Long> segmentIDs)</td>
        <td>Set an ID list of segments to be tested. Typically the ID is returned by flush() method.</td>
        <td>segmentIDs: An ID list of segments.</td>
    </tr>
    <tr>
        <td>addSegmentID(Long segmentID)</td>
        <td>Add a segment ID to be tested. Typically the ID is returned by flush() method.</td>
        <td>segmentID: A segment ID</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a GetFlushStateParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `GetFlushStateParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetFlushStateResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `GetFlushStateResponse` held by the `R` template.

## Example

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
