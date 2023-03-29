# grantRolePrivilege()

A MilvusClient interface. This method grants privileges to a role.

<div class="alert note">
Note: Grants privileges to a role.
</div>

```Java
R<RpcStatus> grantRolePrivilege(GrantRolePrivilegeParam requestParam);
```

## GrantRolePrivilegeParam

Use the `GrantRolePrivilegeParam.Builder` to construct a `GrantRolePrivilegeParam` object.

```Java
import io.milvus.param.GrantRolePrivilegeParam;
GrantRolePrivilegeParam.Builder builder = GrantRolePrivilegeParam.newBuilder();
```

Methods of `GrantRolePrivilegeParam.Builder`:

| Method | Description | Parameters |
| --- | --- | --- |
| `withRoleName(String roleName)` | Sets the role name. <br> The role name cannot be empty or null. | `roleName`: The role name. |
| `withObject(String object)` | Sets the object. <br> The object cannot be empty or null. | `object`: A granted object in Milvus, such as collection, partition, and database. |
| `withObjectName(String objectName)` | Sets the object name. <br> The object name cannot be empty or null.	| `objectName`: The object name. |
| `withPrivilege(String privilege)`	| Sets the privilege. <br> The privilege cannot be empty or null. |	`privilege`: A concrete permission for accessing some object. | 

For details on applicable objects and privileges, refer to [Users and Roles](https://milvus.io/docs/v2.2.x/users_and_roles.md).

The `GrantRolePrivilegeParam.Builder.build()` can throw the following exceptions:
- `ParamException`: error if the parameter is invalid.

## Returns
This method catches all the exceptions and returns an R<RpcStatus> object.
- If the API fails on the server side, it returns an error code and an error message.
- If the API fails due to RPC exceptions, it returns `R.Status.Unknown` and error message of the exception.
- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.GrantRolePrivilegeParam;

R<RpcStatus> response = client.grantRolePrivilege(GrantRolePrivilegeParam.newBuilder()
        .withRoleName(roleName)
        .withObject(objectType)
        .withObjectName(objectName)
        .withPrivilege(privilege)
        .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```