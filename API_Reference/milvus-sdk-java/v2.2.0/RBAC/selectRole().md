# selectRole()

A MilvusClient interface. This method gets all users associated with a role. 

<div class="alert note">
Note: Gets all users associated with the specified role.
</div>

```Java
R<SelectRoleResponse> selectRole(SelectRoleParam requestParam);
```

## SelectRoleParam

Use the `SelectRoleParam.Builder` to construct a `SelectRoleParam` object.

```Java
import io.milvus.param.SelectRoleParam;
SelectRoleParam.Builder builder = SelectRoleParam.newBuilder();
```

Methods of SelectRoleParam.Builder:

| Method | Description | Parameters |
| `withRoleName(String roleName)` | String `roleName`. <br> The role name cannot be empty or null. | `roleName`: Name of the role to which certain privileges are bound. |
| `withIncludeUserInfo(boolean includeUserInfo)` | Sets the `includeUserInfo`. <br> The default value of `includeUserInfo` is false.	| `includeUserInfo`: Whether UserInfo is included in the returned results. | 

The `SelectRoleParam.Builder.build()` can throw the following exceptions:
- `ParamException`: error if the parameter is invalid.

## Returns
This method catches all the exceptions and returns an R<RpcStatus> object.
- If the API fails on the server side, it returns an error code and an error message.
- If the API fails due to RPC exceptions, it returns `R.Status.Unknown` and error message of the exception.
- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.SelectRoleParam;

R<RpcStatus> response = client.selectRole(SelectRoleParam.newBuilder()
            .withRoleName(roleName)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```