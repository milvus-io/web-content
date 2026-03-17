# GrantRole()

This operation grants a role to a user.

```cpp
Status GrantRole(const GrantRoleRequest& request)
```

## Request Syntax

```cpp
auto request = GrantRoleRequest()
    .WithUserName(name)
    .WithRoleName(name);
```

**REQUEST METHODS:**

- `WithUserName(const std::string& name)`

    Sets the name of the target user of this operation.

- `WithRoleName(const std::string& name)`

    Sets the name of the role to be granted.

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

status = client->GrantRole(
    milvus::GrantRoleRequest()
        .WithUserName(user_name)
        .WithRoleName(role_name)
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
