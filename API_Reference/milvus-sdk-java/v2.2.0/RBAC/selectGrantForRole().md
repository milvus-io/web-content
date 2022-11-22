# selectGrantForRole()

A MilvusClient interface. This method lists information about the privileges granted to a role.

<div class="alert note">
Note: Lists a GrantInfo object for the role.
</div>

```Java
R<SelectGrantResponse> selectGrantForRole(SelectGrantForRoleParam requestParam);
```
## SelectGrantForRoleParam
Use the `RevokeRolePrivilegeParam.Builder` to construct a `RevokeRolePrivilegeParam` object.

```Java
import io.milvus.param.SelectGrantForRoleParam;
SelectGrantForRoleParam.Builder builder = SelectGrantForRoleParam.newBuilder();
```

Methods of `CreateRoleParam.Builder`:

| Method | Description | Parameters |
| --- | --- | --- |
| `withRoleName(String roleName)` | String `roleName`. The role name cannot be empty or null. | `roleName`: The role name used to create the privilege. |

The `SelectGrantForRoleParam.Builder.build()` can throw the following exceptions:
- `ParamException`: error if the parameter is invalid.

## Returns

- If the API fails on the server side, it returns an error code and an error message.
- If the API fails due to RPC exceptions, it returns `R.Status.Unknown` and error message of the exception.
- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.SelectGrantForRoleParam;

R<RpcStatus> response = client.selectGrantForRole(SelectGrantForRoleParam.newBuilder()
        .withRoleName(roleName)
        .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```