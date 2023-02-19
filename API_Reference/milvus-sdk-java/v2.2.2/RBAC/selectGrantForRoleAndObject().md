# selectGrantForRoleAndObject()

A MilvusClient interface. This method lists privileges and accessible objects of the current role.

<div class="alert note">
Note: Lists privileges and accessible objects of the current role.
</div>

```Java
R<SelectGrantResponse> selectGrantForRoleAndObject(SelectGrantForRoleAndObjectParam requestParam);
```

## SelectGrantForRoleAndObjectParam

Use the `SelectGrantForRoleAndObjectParam.Builder` to construct a `SelectGrantForRoleAndObjectParam` object.

```Java
import io.milvus.param.SelectGrantForRoleAndObjectParam;
SelectGrantForRoleAndObjectParam.Builder builder = SelectGrantForRoleAndObjectParam.newBuilder();
```

Methods of `SelectGrantForRoleAndObjectParam.Builder`:

| Method | Description | Parameters |
| --- | --- | --- |
| `withRoleName(String roleName)` | Sets the role name. <br> The role name cannot be empty or null. | 	`roleName`: The role name. |
| `withObject(String object)` | Sets the object. <br> The object cannot be empty or null. | `object`: A granted object in Milvus, such as collection, partition, and database. |
| `withObjectName(String objectName)` | Sets the object name. <br> The object name cannot be empty or null. |	`objectName`: The object name. |

The `SelectGrantForRoleAndObjectParam.Builder.build()` can throw the following exceptions:
- `ParamException`: error if the parameter is invalid.

## Returns
This method catches all the exceptions and returns an R<RpcStatus> object.
- If the API fails on the server side, it returns an error code and an error message.
- If the API fails due to RPC exceptions, it returns `R.Status.Unknown` and error message of the exception.
- If the API succeeds, it returns `R.Status.Success`.

## Example
```Java
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

