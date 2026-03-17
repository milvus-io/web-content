# AddPrivilegesToGroup()

This operation adds privileges to a privilege group.

```cpp
Status AddPrivilegesToGroup(const AddPrivilegesToGroupRequest& request)
```

## Request Syntax

```cpp
auto request = AddPrivilegesToGroupRequest()
    .WithGroupName(name)
    .WithPrivileges(privileges);
```

**REQUEST METHODS:**

- `WithGroupName(const std::string& name)`

    Set the name of the target privilege group for this operation.

- `WithPrivileges(std::set<std::string>&& privileges)`

    Sets the privileges to be added to the specified group.

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

std::set<std::string> privileges = {"Search", "Query"};
status = client->AddPrivilegesToGroup(
    milvus::AddPrivilegesToGroupRequest()
        .WithGroupName(privilege_group_name)
        .WithPrivileges(std::move(privileges))
);

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
