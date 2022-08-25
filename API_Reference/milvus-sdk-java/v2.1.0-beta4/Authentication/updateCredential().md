# updateCredential()

A MilvusClient interface. This method updates the password of an authenticated user access. The original username and password must be provided when checking the validility of the update operation. 

<div class="alert note">
The old connection to the Milvus client can be invalidated after the credential is updated. 
</div>


```Java
R<RpcStatus> updateCredential(UpdateCredentialParam requestParam);
```

## UpdateCredentialParam

Use the `UpdateCredentialParam.Builder` to construct an `UpdateCredentialParam` object.

```Java
import io.milvus.param.UpdateCredentialParam;
UpdateCredentialParam.Builder builder = UpdateCredentialParam.newBuilder();
```

Methods of `UpdateCredentialParam.Builder`:

| Method                             | Description                                                  | Parameters                  |
| ---------------------------------- | ------------------------------------------------------------ | --------------------------- |
| `withUsername(String username)`    | Sets the username. The username cannot be empty or null.         | `username`: The username used to reset the password.  |
| `withOldPassword(String password)` | Sets the old password. The old password cannot be empty or null. | password: The old password. |
| `withNewPassword(String password)` | Sets the new password. The new password cannot be empty or null. | password: The new password to create for the provided username. |
| `build()`                          | Constructs a `UpdateCredentialParam` object.           |         N/A               |

The `UpdateCredentialParam.Builder.build()` can throw the following exceptions:

- `ParamException`: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknow` and the error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.*;

UpdateCredentialParam param = UpdateCredentialParam.newBuilder()
        .withUsername("user")
        .withOldPassword("old_password")
        .withNewPassword("new_password")
        .build();
R<RpcStatus> response = client.updateCredential(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```
