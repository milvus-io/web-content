getFlushAllState()

A MilvusClient interface. This method tests whether the specified segments are flushed.

```Java
R<GetFlushAllStateResponse> getFlushAllState(GetFlushAllStateParam requestParam);
```

## GetFlushAllStateParam

Use the `GetFlushAllStateParam.Builder` to construct a `GetFlushAllStateParam` object.

```Java
import io.milvus.param.GetFlushAllStateParam;
GetFlushAllStateParam.Builder builder = GetFlushAllStateParam.newBuilder();
```

Methods of `GetFlushAllStateParam.Builder`:

| Method    | Description                                 | Parameters |
|-----------|---------------------------------------------|------------|
| `build()` | Construct a `GetFlushAllStateParam` object. | N/A        |

## Returns

This method catches all the exceptions and returns an `R<GetFlushAllStateResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns a valid `GetFlushAllStateResponse` held by the R template.

## Example

```Java
import io.milvus.param.*;
import io.milvus.grpc.GetFlushAllStateResponse;

GetFlushAllStateParam param = GetFlushAllStateParam.newBuilder()
    .build();
    
R<GetFlushAllStateResponse> response = client.getFlushAllState(param);

if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```