# selectGrantForRole()

MilvusClient interface. This method lists grant info for the role and the specific object.

```java
R<SelectGrantResponse> selectGrantForRole(SelectGrantForRoleParam requestParam);
```

#### SelectGrantForRoleParam

Use the `SelectGrantForRoleParam.Builder` to construct a `SelectGrantForRoleParam` object.

```java
import io.milvus.param.SelectGrantForRoleParam;
SelectGrantForRoleParam.Builder builder = SelectGrantForRoleParam.newBuilder();
```

Methods of `SelectGrantForRoleParam.Builder`:

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
        <td><p>withDatabaseName(String databaseName)</p></td>
        <td><p>Sets the database name. database name can be null for default database.</p></td>
        <td><p>databaseName: The database name.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a SelectGrantForRoleParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `SelectGrantForRoleParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<SelectGrantResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `SelectGrantResponse` held by the `R` template. You can use `SelectGrantResponse` to get the grant information.

#### Example

```java
import io.milvus.param.SelectGrantForRoleParam;

R<RpcStatus> response = client.selectGrantForRole(SelectGrantForRoleParam.newBuilder()
        .withRoleName(roleName)
        .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
