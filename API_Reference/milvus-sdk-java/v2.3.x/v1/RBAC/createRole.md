# createRole()

MilvusClient interface. This method creates an object that some privileges can bind to. 

```java
R<RpcStatus> createRole(CreateRoleParam requestParam);
```

#### CreateRoleParam

Use the `CreateRoleParam.Builder` to construct a `CreateRoleParam object`.

```java
import io.milvus.param.CreateRoleParam;
CreateRoleParam.Builder builder = CreateRoleParam.newBuilder();
```

Methods of `CreateRoleParam.Builder`:

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
        <td><p>Construct a CreateRoleParam object.</p></td>
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
import io.milvus.param.CreateRoleParam;

R<RpcStatus> response = client.createRole(CreateRoleParam.newBuilder()
            .withRoleName(roleName)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
