# selectRole()

MilvusClient interface. This method gets all users' information about a role. 

```java
R<SelectRoleResponse> selectRole(SelectRoleParam requestParam);
```

#### SelectRoleParam

Use the `SelectRoleParam.Builder` to construct a `SelectRoleParam` object.

```java
import io.milvus.param.SelectRoleParam;
SelectRoleParam.Builder builder = SelectRoleParam.newBuilder();
```

Methods of `SelectRoleParam.Builder`:

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
        <td><p>withIncludeUserInfo(boolean includeUserInfo)</p></td>
        <td><p>Sets the includeUserInfo. includeUserInfo default false.</p></td>
        <td><p>includeUserInfo: The include user info or not.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a SelectRoleParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `SelectRoleParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<SelectRoleResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns R.Status.Unknow and error message of the exception.

- If the API succeeds, it returns a valid `SelectRoleResponse` held by the `R` template. You can use `SelectRoleResponse` to get the role information.

#### Example

```java
import io.milvus.param.SelectRoleParam;

R<SelectRoleResponse> response = client.selectRole(SelectRoleParam.newBuilder()
            .withRoleName(roleName)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
