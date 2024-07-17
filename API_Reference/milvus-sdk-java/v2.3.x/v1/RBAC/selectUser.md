# selectUser()

MilvusClient interface. This method gets all roles the user has.

```java
R<SelectUserResponse> selectUser(SelectUserParam requestParam);
```

#### SelectUserParam

Use the `SelectUserParam.Builder` to construct a `SelectUserParam` object.

```java
import io.milvus.param.SelectUserParam;
SelectUserParam.Builder builder = SelectUserParam.newBuilder();
```

Methods of SelectUserParam.Builder:

<table>
    <tr>
        <th><p>Method</p></th>
        <th><p>Description</p></th>
        <th><p>Parameters</p></th>
    </tr>
    <tr>
        <td><p>withUsername(String username)</p></td>
        <td><p>Sets the username. Username cannot be empty or null.</p></td>
        <td><p>username: The user name.</p></td>
    </tr>
    <tr>
        <td><p>withIncludeRoleInfo(boolean includeRoleInfo)</p></td>
        <td><p>Sets the includeRoleInfo. Default value is false.</p></td>
        <td><p>includeRoleInfo: The include role info or not.</p></td>
    </tr>
    <tr>
        <td><p>build()</p></td>
        <td><p>Construct a SelectUserParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `SelectUserParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<SelectUserResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `SelectUserResponse` held by the `R` template. You can use `SelectUserResponse` to get the user information.

#### Example

```java
import io.milvus.param.SelectUserParam;

R<SelectUserResponse> response = client.selectUser(SelectUserParam.newBuilder()
            .withUsername(userName)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
