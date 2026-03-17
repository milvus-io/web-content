# RemovePrivilegesFromGroup()

This operation removes privileges from a privilege group.

```cpp
Status RemovePrivilegesFromGroup(const RemovePrivilegesFromGroupRequest& request)
```

## Request Syntax

```cpp
auto request = RemovePrivilegesFromGroupRequest()
    .WithGroupName(name)
    .WithPrivileges(privileges);
```

**REQUEST METHODS:**

- `WithGroupName(const std::string& name)`

    Set the name of the target privilege group for this operation.

- `WithPrivileges(std::set<std::string>&& privileges)`

    Sets the privileges to be removed from the specified group.

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

privileges = {"Search", "Query"};
status = client->RemovePrivilegesFromGroup(
    milvus::RemovePrivilegesFromGroupRequest()
       .WithGroupName(privilege_group_name)
       .WithPrivileges(std::move(privileges))
);

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
