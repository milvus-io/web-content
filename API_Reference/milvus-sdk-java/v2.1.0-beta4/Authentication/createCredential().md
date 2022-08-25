# createCredential()

A MilvusClient interface. This method creates an authenticated user access.

```Java
R<RpcStatus> createCredential(CreateCredentialParam requestParam);
```

## CreateCredentialParam

Use the `CreateCredentialParam.Builder` to construct a `CreateCredentialParam` object.

```Java
import io.milvus.param.CreateCredentialParam;
CreateCredentialParam.Builder builder = CreateCredentialParam.newBuilder();
```

Methods of `CreateCredentialParam.Builder`:

| Method                          | Description                                          | Parameters                                                   |
| ------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| `withUsername(String username)` | Sets the username. Username cannot be empty or null. | `username`: The username used to create the credential.     |
| `withPassword(String password)` | Sets the password. Password cannot be empty or null. | `password`: The corresponding password used to create the credential. |
| `build()`                       | Constructs a `CreateCredentialParam` object.         |      N/A                                                 |

The `CreateCredentialParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

CreateCredentialParam param = CreateCredentialParam.newBuilder()
        .withUsername("user")
        .withPassword("password")
        .build();
R<RpcStatus> response = client.createCredential(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```

