# grantRolePrivilege()

MilvusClient interface. This method grants the role privilege*.*

```java
R<RpcStatus> grantRolePrivilege(GrantRolePrivilegeParam requestParam);
```

## GrantRolePrivilegeParam

Use the `GrantRolePrivilegeParam.Builder` to construct a `GrantRolePrivilegeParam` object.

```java
import io.milvus.param.GrantRolePrivilegeParam;
GrantRolePrivilegeParam.Builder builder = GrantRolePrivilegeParam.newBuilder();
```

Methods of `GrantRolePrivilegeParam.Builder`:

<table>
    <tr>
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withRoleName(String roleName)</td>
        <td>Sets the roleName. RoleName cannot be empty or null.</td>
        <td>roleName: The role name.</td>
    </tr>
    <tr>
        <td>withObject(String object)</td>
        <td>Sets the object. object cannot be empty or null.</td>
        <td>object: A granted object in Milvus, such as collection, partition, and database.</td>
    </tr>
    <tr>
        <td>withObjectName(String objectName)</td>
        <td>Sets the objectName. objectName cannot be empty or null.</td>
        <td>objectName: The object name.</td>
    </tr>
    <tr>
        <td>withPrivilege(String privilege)</td>
        <td>Sets the privilege. privilege cannot be empty or null.</td>
        <td>privilege: A concrete permission for accessing some object.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a GrantRolePrivilegeParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `GrantRolePrivilegeParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```java
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
