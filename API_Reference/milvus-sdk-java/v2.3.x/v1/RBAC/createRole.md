# createRole()

MilvusClient interface. This method creates an object that some privileges can bind to. 

```java
R<RpcStatus> createRole(CreateRoleParam requestParam);
```

## CreateRoleParam

Use the `CreateRoleParam.Builder` to construct a `CreateRoleParam object`.

```java
import io.milvus.param.CreateRoleParam;
CreateRoleParam.Builder builder = CreateRoleParam.newBuilder();
```

Methods of `CreateRoleParam.Builder`:

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
        <td>Construct a CreateRoleParam object.</td>
        <td>N/A</td>
    </tr>
</table>

The `CreateRoleParam.Builder.build()` can throw the following exceptions:

- ParamException: error if the parameter is invalid.

## Returns

This method catches all the exceptions and returns an `R<RpcStatus>` object.

- If the API fails on the server side, it returns the error code and message from the server.

- If the API fails by RPC exception, it returns `R.Status.Unknown` and error message of the exception.

- If the API succeeds, it returns `R.Status.Success`.

## Example

```java
import io.milvus.param.CreateRoleParam;

R<RpcStatus> response = client.createRole(CreateRoleParam.newBuilder()
            .withRoleName(roleName)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```
