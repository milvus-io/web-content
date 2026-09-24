# AlterRole()

This operation updates the description of a role.

```cpp
Status AlterRole(const AlterRoleRequest& request)
```

## Request Syntax

```cpp
auto request = AlterRoleRequest()
    .WithRoleName(role_name)
    .WithDescription(description);
```

**REQUEST METHODS:**

- `WithRoleName(const std::string& role_name)`

    Sets the name of the role.

- `WithDescription(const std::string& description)`

    Sets the role's description.

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

status = client->AlterRole(
    milvus::AlterRoleRequest()
        .WithRoleName(role_name)
        .WithDescription(description)
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
