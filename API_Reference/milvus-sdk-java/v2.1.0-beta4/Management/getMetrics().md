# getMetrics()

A MilvusClient interface. This method returns the runtime metrics information of Milvus in JSON format.

```Java
R<GetMetricsResponse> getMetrics(GetMetricsParam requestParam);
```

## GetMetricsParam

Use the `GetMetricsParam.Builder` to construct a `GetMetricsParam` object.

```Java
import io.milvus.param.GetMetricsParam;
GetMetricsParam.Builder builder = GetMetricsParam.newBuilder();
```

Methods of `GetMetricsParam.Builder`:

| Method                      | Description                                                  | Parameters                             |
| --------------------------- | ------------------------------------------------------------ | -------------------------------------- |
| `withRequest(String request)` | Sets request in JSON format to retrieve metric information from server. | `request`: Request string in JSON format. |
| `build()`                     | Constructs a `GetMetricsParam` object.                           |      N/A                                  |

The `GetMetricsParam.Builder.build()` could throw the following exceptions:

- `ParamException` -- error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<GetMetricsResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and error message of the exception.

- If the API succeeds, it returns a valid `GetMetricsResponse` held by the R template.

## Example

```Java
import io.milvus.param.*;
import io.milvus.grpc.GetMetricsResponse;

GetMetricsParam param = GetMetricsParam.newBuilder()
        .withRequest("{\"metric_type\":\"system_info\"}")
        .build();
R<GetMetricsResponse> response = client.getMetrics(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

System.out.println(response.getData().getResponse());
```


