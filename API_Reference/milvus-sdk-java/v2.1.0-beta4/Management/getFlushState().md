# getFlushState()

A MilvusClient interface. This method tests whether specified segments are flushed.

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
|`withSegmentIDs(List<Long> segmentIDs)` | Sets the ID list of the segments to be tested. Typically the ID is returned by `flush()` method. | `segmentIDs`: ID list of segments. |
| `addSegmentID(Long segmentID)`          | Adds the segment ID to be tested. Typically the ID is returned by `flush()` method. | `segmentID`: Segment ID.             |
| `build()`                               | Constructs a `GetFlushStateParam` object.                        |                      N/A               |

The `GetFlushStateParam.Builder.build()` could throw the following exceptions:

- `ParamException` -- error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetFlushStateResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and error message of the exception.

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
