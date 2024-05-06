# selectGrantForRoleAndObject()

MilvusClient interface. This method lists grant info for a role.

```java
R<SelectGrantResponse> selectGrantForRoleAndObject(SelectGrantForRoleAndObjectParam requestParam);
```

#### SelectGrantForRoleAndObjectParam

Use the `SelectGrantForRoleAndObjectParam.Builder` to construct a `SelectGrantForRoleAndObjectParam` object.

```java
import io.milvus.param.SelectGrantForRoleAndObjectParam;
SelectGrantForRoleAndObjectParam.Builder builder = SelectGrantForRoleAndObjectParam.newBuilder();
```

Methods of `SelectGrantForRoleAndObjectParam.Builder`:

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
        <td>build()</td>
        <td>Construct a SelectGrantForRoleAndObjectParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `SelectGrantForRoleAndObjectParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<SelectGrantResponse>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns a valid `SelectGrantResponse` held by the `R` template. You can use `SelectGrantResponse` to get the grant information.

#### Example

```java
import io.milvus.param.SelectGrantForRoleParam;

R<SelectGrantResponse> response = client.selectGrantForRoleAndObject(SelectGrantForRoleAndObjectParam.newBuilder()
        .withRoleName(roleName)
        .withObject(objectType)
        .withObjectName(objectName)
        .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
