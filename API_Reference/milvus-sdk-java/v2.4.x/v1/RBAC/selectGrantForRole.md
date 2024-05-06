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
        <th>Method</th>
        <th>Description</th>
        <th>Parameters</th>
    </tr>
    <tr>
        <td>withRoleName(String roleName)</td>
        <td>Sets the roleName. RoleName cannot be empty or null.</td>
        <td>roleName: The role name used to create the privilege.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a SelectGrantForRoleParam object.</td>
        <td>N/A</td>
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
