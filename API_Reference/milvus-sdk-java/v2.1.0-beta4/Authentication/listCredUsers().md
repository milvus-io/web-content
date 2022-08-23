# listCredUsers()

A MilvusClient interface. This method lists all user names.

```Java
R<ListCredUsersResponse> listCredUsers(ListCredUsersParam requestParam);
```

## ListCredUsersParam

Use the `ListCredUsersParam.Builder` to construct a `ListCredUsersParam` object.

```Java
import io.milvus.param.ListCredUsersParam;
ListCredUsersParam.Builder builder = ListCredUsersParam.newBuilder();
```

Methods of `ListCredUsersParam.Builder`:

| Method    | Description                               | Parameters |
| --------- | ----------------------------------------- | ---------- |
| `build()` | Constructs a `ListCredUsersParam` object. | N/A        |

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.``Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

ListCredUsersParam param = ListCredUsersParam.newBuilder().build();
R<RpcStatus> response = client.listCredUsers(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```

