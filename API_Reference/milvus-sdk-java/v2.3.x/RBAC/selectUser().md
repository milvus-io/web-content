# selectUser()

A MilvusClient interface. This method gets all roles that a user has.

<div class="alert note">
Note: Get all roles that a user has.
</div>

```Java
R<SelectUserResponse> selectUser(SelectUserParam requestParam);
```

## SelectUserParam

Use the `SelectUserParam.Builder` to construct a `SelectUserParam` object.

```Java
import io.milvus.param.SelectUserParam;
SelectUserParam.Builder builder = SelectUserParam.newBuilder();
```

Methods of `SelectUserParam.Builder`:

| Method | Description | Parameters |
| --- | --- | --- |
| `withUsername(String username)` | Sets the username. <br> The username cannot be empty or null. | `username`: The user name. |
| `withIncludeRoleInfo(boolean includeRoleInfo)` | Sets the includeRoleInfo. <br> The default value of `includeRoleInfo` is False.	| `includeRoleInfo`: The include role info or not. |

The `SelectUserParam.Builder.build()` can throw the following exceptions:
- `ParamException`: error if the parameter is invalid.

## Returns
This method catches all the exceptions and returns an R<RpcStatus> object.
- If the API fails on the server side, it returns an error code and an error message.
- If the API fails due to RPC exceptions, it returns `R.Status.Unknown` and error message of the exception.
- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.SelectUserParam;

R<RpcStatus> response = client.selectUser(SelectUserParam.newBuilder()
            .withUsername(userName)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```