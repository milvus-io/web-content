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

- `SetRoleName(const std::string& role_name)`

    Set the role name.

- `WithDescription(const std::string& description)`

    Sets the role's description.

- `SetDescription(const std::string& description)`

    Set the role description.

**RETURNS:**

*[Status](../Client/Status.md)*

Check `status.IsOk()` to confirm success.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

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
