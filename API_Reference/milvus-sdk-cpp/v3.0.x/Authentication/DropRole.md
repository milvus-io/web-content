# DropRole()

This operation drops a role.

```cpp
Status DropRole(const DropRoleRequest& request)
```

## Request Syntax

```cpp
auto request = DropRoleRequest()
    .WithRoleName(name)
    .WithForceDrop(force_drop);
```

**REQUEST METHODS:**

- `WithRoleName(const std::string& name)`

    Sets the name of the role.

- `WithForceDrop(bool force_drop)`

    Sets the flag whether to force drop the role.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->DropRole(
    milvus::DropRoleRequest()
        .WithRoleName(role_name)
        .WithForceDrop(false)
);

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
