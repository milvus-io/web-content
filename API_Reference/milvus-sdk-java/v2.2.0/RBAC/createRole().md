# createRole()

A MilvusClient interface. This method creates an object to which you can bind some privileges. 

<div class="alert note">
Note: Creates an object to which you can bind some privileges.
</div>

```Java
R<RpcStatus> createRole(CreateRoleParam requestParam);
```

## RequestParam
Use the `CreateRoleParam.Builder` to construct a `CreateRoleParam` object.

```Java
import io.milvus.param.CreateRoleParam;
CreateRoleParam.Builder builder = CreateRoleParam.newBuilder();
```

Methods of `CreateRoleParam.Builder`:

| Method | Description | Parameters |
| --- | --- | --- |
| `withRoleName(String roleName)` | String `roleName`. The role name cannot be empty or null. | `roleName`: The role name used to create the privilege. |

The `CreateRoleParam.Builder.build()` can throw the following exceptions:
- `ParamException`: error if the parameter is invalid.

## Returns
This method catches all the exceptions and returns an `R<RpcStatus>` object.
- If the API fails on the server side, it returns an error code and an error message.
- If the API fails due to RPC exceptions, it returns `R.Status.Unknown` and error message of the exception.
- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.CreateRoleParam;

R<RpcStatus> response = client.createRole(CreateRoleParam.newBuilder()
            .withRoleName(roleName)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```