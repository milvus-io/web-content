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

- `AddPrivilege(const std::string& privilege)`

    Adds one privilege to be removed from the specified group.

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
