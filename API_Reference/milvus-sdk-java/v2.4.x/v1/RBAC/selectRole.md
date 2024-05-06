# selectRole()

MilvusClient interface. This method gets all users' information about a role. 

```java
R<SelectRoleResponse> selectRole(SelectRoleParam requestParam);
```

## SelectRoleParam

Use the `SelectRoleParam.Builder` to construct a `SelectRoleParam` object.

```java
import io.milvus.param.SelectRoleParam;
SelectRoleParam.Builder builder = SelectRoleParam.newBuilder();
```

Methods of `SelectRoleParam.Builder`:

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
        <td>withIncludeUserInfo(boolean includeUserInfo)</td>
        <td>Sets the includeUserInfo. includeUserInfo default false.</td>
        <td>includeUserInfo: The include user info or not.</td>
    </tr>
    <tr>
        <td>build()</td>
        <td>Construct a SelectRoleParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `SelectRoleParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<SelectRoleResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `SelectRoleResponse` held by the `R` template. You can use `SelectRoleResponse` to get the role information.

## Example

```java
import io.milvus.param.SelectRoleParam;

R<SelectRoleResponse> response = client.selectRole(SelectRoleParam.newBuilder()
            .withRoleName(roleName)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
