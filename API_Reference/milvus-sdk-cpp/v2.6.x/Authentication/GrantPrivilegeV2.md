# GrantPrivilegeV2()

This operation grants a privilege or a privilege group to a role.

```cpp
Status GrantPrivilegeV2(const GrantPrivilegeV2Request& request)
```

## Request Syntax

```cpp
auto request = GrantPrivilegeV2Request()
    .WithRoleName(name)
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPrivilege(privilege);
```

**REQUEST METHODS:**

- `WithRoleName(const std::string& name)`

    Sets the role's name.

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name for the role.

- `WithCollectionName(const std::string& collection_name)`

    Sets the target collection name for the role.

- `WithPrivilege(const std::string& privilege)`

    Sets the name of the privilege to assign to the role. For available privileges, refer to [this page](https://milvus.io/docs/grant_privileges.md).

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

status = client->GrantPrivilegeV2(
    milvus::GrantPrivilegeV2Request()
        .WithRoleName(role_name)
        .WithPrivilege(privilege_group_name)
        .WithCollectionName(collection_name)
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
