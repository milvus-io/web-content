# revokeRolePrivilege()

MilvusClient interface. This method revokes the role privilege.

```java
R<RpcStatus> revokeRolePrivilege(RevokeRolePrivilegeParam requestParam);
```

#### RevokeRolePrivilegeParam

Use the `RevokeRolePrivilegeParam.Builder` to construct a `RevokeRolePrivilegeParam` object.

```java
import io.milvus.param.RevokeRolePrivilegeParam;
RevokeRolePrivilegeParam.Builder builder = RevokeRolePrivilegeParam.newBuilder();
```

Methods of `RevokeRolePrivilegeParam.Builder`:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withRoleName(String roleName)</p></td>
        <td><p>Sets the roleName. RoleName cannot be empty or null.</p></td>
        <td><p>roleName: The role name.</p></td>
    </tr>
    <tr>
        <td><p>withObject(String object)</p></td>
        <td><p>Sets the object. object cannot be empty or null.</p></td>
        <td><p>object: A granted object in Milvus, such as collection, partition, and database.</p></td>
    </tr>
    <tr>
        <td><p>withObjectName(String objectName)</p></td>
        <td><p>Sets the objectName. objectName cannot be empty or null.</p></td>
        <td><p>objectName: The object name.</p></td>
    </tr>
    <tr>
        <td><p>withPrivilege(String privilege)</p></td>
        <td><p>Sets the privilege. privilege cannot be empty or null.</p></td>
        <td><p>privilege: A concrete permission for accessing some object.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a RevokeRolePrivilegeParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `RevokeRolePrivilegeParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.RevokeRolePrivilegeParam;

R<RpcStatus> response = client.revokeRolePrivilege(RevokeRolePrivilegeParam.newBuilder()
        .withRoleName(roleName)
        .withObject(objectType)
        .withObjectName(objectName)
        .withPrivilege(privilege)
        .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
