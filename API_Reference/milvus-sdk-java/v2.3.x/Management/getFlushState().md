# getFlushState()

A MilvusClient interface. This method checks whether the specified segments are flushed.

```Java
R<GetFlushStateResponse> getFlushState(GetFlushStateParam requestParam);
```

## GetFlushStateParam

Use the `GetFlushStateParam.Builder` to construct a `GetFlushStateParam` object.

```Java
import io.milvus.param.GetFlushStateParam;
GetFlushStateParam.Builder builder = GetFlushStateParam.newBuilder();
```

Methods of `GetFlushStateParam.Builder`:

| Method                                | Description                                                  | Parameters                          |
| ------------------------------------- | ------------------------------------------------------------ | ----------------------------------- |
|`withSegmentIDs(List<Long> segmentIDs)` | Sets the ID list of the segments to check, which can be obtained by calling the <code><a href="../Collection/flush().md">flush()</a></code> method. | `segmentIDs`: A list of the IDs of the segments whose flush state needs to be checked. |
| `addSegmentID(Long segmentID)`          | Adds the ID of the segment to check, which can be obtained by calling the <code><a href="../Collection/flush().md">flush()</a></code> method.  | `segmentID`: The ID of the segment whose flush state needs to be checked.           |
| `build()`                               | Constructs a `GetFlushStateParam` object.                        |                      N/A               |

The `GetFlushStateParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetFlushStateResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `GetFlushStateResponse` held by the R template. 

## Example

```Java
import io.milvus.param.*;
import io.milvus.grpc.GetFlushStateResponse;

GetFlushStateParam param = GetFlushStateParam.newBuilder()
        .addSegmentID(collectionName)
        .build();
R<GetFlushStateResponse> response = client.getFlushState(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

System.out.println("Flushed: " + response.getData().getFlushed());
```
