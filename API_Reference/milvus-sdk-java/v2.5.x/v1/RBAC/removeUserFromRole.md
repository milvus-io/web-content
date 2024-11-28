# removeUserFromRole()

MilvusClient interface. This method removes a user from a role. The user will remove permissions that the role is allowed to perform operations.

```java
R<RpcStatus> removeUserFromRole(RemoveUserFromRoleParam requestParam);
```

#### RemoveUserFromRoleParam

Use the `RemoveUserFromRoleParam.Builder` to construct a `RemoveUserFromRoleParam` object.

```java
import io.milvus.param.RemoveUserFromRoleParam;
RemoveUserFromRoleParam.Builder builder = RemoveUserFromRoleParam.newBuilder();
```

Methods of `AddUserToRoleParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withRoleName(String roleName)</p></td>
        <td><p>Sets the roleName. RoleName cannot be empty or null.</p></td>
        <td><p>roleName: The role name used to create the privilege.</p></td>
    </tr>
    <tr>
        <td><p>withUsername(String username)</p></td>
        <td><p>Sets the username. Username cannot be empty or null.</p></td>
        <td><p>username: The user name.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a RemoveUserFromRoleParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `RemoveUserFromRoleParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.AddUserToRoleParam;

R<RpcStatus> response = client.removeUserFromRole(AddUserToRoleParam.newBuilder()
            .withRoleName(roleName)
            .withUserName(userName)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
