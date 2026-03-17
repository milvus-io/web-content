# DescribeRole()

This operation returns the description of a specific role.

```cpp
Status DescribeRole(const DescribeRoleRequest& request, DescribeRoleResponse& response)
```

## Request Syntax

```cpp
auto request = DescribeRoleRequest()
    .WithRoleName(name)
    .WithDatabaseName(db_name);
```

**REQUEST METHODS:**

- `WithRoleName(const std::string& name)`

    Sets the role's name.

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of a database to which the role is assigned.

**RETURNS:**

*Status* with *DescribeRoleResponse*

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

milvus::DescribeRoleResponse resp_desc_role;
status = client->DescribeRole(
    milvus::DescribeRoleRequest()
        .WithRoleName(role_name), 
    resp_desc_role
);

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
