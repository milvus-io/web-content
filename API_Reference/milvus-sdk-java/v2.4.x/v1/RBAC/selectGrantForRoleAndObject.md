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
        <td><p>build()</p></td>
        <td><p>Construct a SelectGrantForRoleAndObjectParam object.</p></td>
        <td><p>N/A</p></td>
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
