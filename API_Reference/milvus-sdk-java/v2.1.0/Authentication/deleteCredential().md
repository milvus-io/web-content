# deleteCredential()

A MilvusClient interface. This method deletes an authenticated user access.

```Java
R<RpcStatus> deleteCredential(DeleteCredentialParam requestParam);
```

## DeleteCredentialParam

Use the `DeleteCredentialParam.Builder` to construct a `DeleteCredentialParam` object.

```Java
import io.milvus.param.DeleteCredentialParam;
DeleteCredentialParam.Builder builder = DeleteCredentialParam.newBuilder();
```

Methods of `DeleteCredentialParam.Builder`:

| Method                          | Description                                          | Parameters                                             |
| ------------------------------- | ---------------------------------------------------- | ------------------------------------------------------ |
| `withUsername(String username)` | Sets the username. The username cannot be empty or null. | `username`: The username used to delete a credential. |
| `build()`                       | Constructs a `DeleteCredentialParam` object.         | N/A                                                    |

The `DeleteCredentialParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

DeleteCredentialParam param = DeleteCredentialParam.newBuilder()
        .withUsername("user")
        .build();
R<RpcStatus> response = client.deleteCredential(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
