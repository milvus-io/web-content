# dropRole()

A MilvusClient interface. This method drops a role. 

<div class="alert note">
Note: Drops the role from Milvus. It succeeds if the role exists, otherwise fails.
</div>

```Java
R<RpcStatus> dropRole(DropRoleParam requestParam);
```


## DropRoleParam
Use the `DropRoleParam.Builder` to construct a `DropRoleParam` object.

```Java
import io.milvus.param.DropRoleParam;
DropRoleParam.Builder builder = DropRoleParam.newBuilder();
```

Methods of `DropRoleParam.Builder`:

| Method | Description | Parameters |
| --- | --- | --- |
| `withRoleName(String roleName)` | String `roleName`. The role name cannot be empty or null. | `roleName`: The role name used to create the privilege. |

The `DropRoleParam.Builder.build()` can throw the following exceptions:
- `ParamException`: Prompts an error if the parameter is invalid.


## Returns
This method catches all the exceptions and returns an R<RpcStatus> object.
- If the API fails on the server side, it returns an error code and an error message.
- If the API fails due to RPC exceptions, it returns `R.Status.Unknown` and error message of the exception.
- If the API succeeds, it returns `R.Status.Success`.

## Example

```Java
import io.milvus.param.DropRoleParam;

R<RpcStatus> response = client.dropRole(DropRoleParam.newBuilder()
            .withRoleName(roleName)
            .build());

if (response.getStatus() != R.Status.Success.getCode()) {
    throw new RuntimeException(response.getMessage());
}
```