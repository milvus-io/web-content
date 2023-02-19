# removeUserFromRole()

A MilvusClient interface. This method dissociates a Milvus user from a Milvus role. 

<div class="alert note">
Note: The user losses access to the permissions bound to the role.
</div>

```Java
R<RpcStatus> removeUserFromRole(RemoveUserFromRoleParam requestParam);
```

## RemoveUserFromRoleParam

Use the `RemoveUserFromRoleParam.Builder` to construct a `RemoveUserFromRoleParam` object.

```Java
import io.milvus.param.RemoveUserFromRoleParam;
RemoveUserFromRoleParam.Builder builder = RemoveUserFromRoleParam.newBuilder();
```

Methods of AddUserToRoleParam.Builder:

| Method | Description | Parameters |
| --- | --- | --- |
| `withRoleName(String roleName)` | Sets the role name. <br> The role name cannot be empty or null. | `roleName`: The role name used to create the privilege. |
| `withUsername(String username)` | Sets the username. <br> The username cannot be empty or null. |	`username`: The user name. | 

The `RemoveUserFromRoleParam.Builder.build()` can throw the following exceptions:
- `ParamException`: error if the parameter is invalid.

## Returns
This method catches all the exceptions and returns an R<RpcStatus> object.
- If the API fails on the server side, it returns an error code and an error message.
- If the API fails due to RPC exceptions, it returns `R.Status.Unknown` and error message of the exception.
- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.AddUserToRoleParam;

R<RpcStatus> response = client.removeUserFromRole(AddUserToRoleParam.newBuilder()
            .withRoleName(roleName)
            .withUserName(userName)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```