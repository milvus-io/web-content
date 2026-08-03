# DropPrivilegeGroup()

Drop a privilege group.

```cpp
Status DropPrivilegeGroup(const DropPrivilegeGroupRequest& request)
```

## Request Syntax

```cpp
auto request = DropPrivilegeGroupRequest()
    .WithGroupName(name);
```

**REQUEST METHODS:**

- `WithGroupName(const std::string& name)`

    Sets the name of the privilege group.

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

status = client->DropPrivilegeGroup(
    milvus::DropPrivilegeGroupRequest()
        .WithGroupName(privilege_group_name)
);

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
