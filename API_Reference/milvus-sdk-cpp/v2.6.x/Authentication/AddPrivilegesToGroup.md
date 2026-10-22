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

- `AddPrivilege(const std::string& privilege)`

    Adds one privilege to be granted to the specified group.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

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
