# CreateRole()

This operation creates a role with specific privileges.

```cpp
Status CreateRole(const CreateRoleRequest& request)
```

## Request Syntax

```cpp
auto request = CreateRoleRequest()
    .WithRoleName(name);
```

**REQUEST METHODS:**

- `WithRoleName(const std::string& name)`

    Sets the role's name.

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

status = client->CreateRole(
    milvus::CreateRoleRequest()
        .WithRoleName(role_name)
);

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
