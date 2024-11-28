# dropRole()

MilvusClient interface. This method drops a role. It will succeed if the role exists, otherwise fail.

```java
R<RpcStatus> dropRole(DropRoleParam requestParam);
```

#### DropRoleParam

Use the `DropRoleParam.Builder` to construct a `DropRoleParam` object.

```java
import io.milvus.param.DropRoleParam;
DropRoleParam.Builder builder = DropRoleParam.newBuilder();
```

Methods of `DropRoleParam.Builder`:

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
        <td><p>build()</p></td>
        <td><p>Construct a DropRoleParam object.</p></td>
        <td><p>N/A</p></td>
    </tr>
</table>

The `CreateRoleParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

#### Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

#### Example

```java
import io.milvus.param.DropRoleParam;

R<RpcStatus> response = client.dropRole(DropRoleParam.newBuilder()
            .withRoleName(roleName)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
