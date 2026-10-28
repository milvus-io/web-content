# RevokePrivilege()

This operation revokes a privilege from a role on a specific object.

```cpp
Status RevokePrivilege(const RevokePrivilegeRequest& request)
```

## Request Syntax

```cpp
auto request = RevokePrivilegeRequest()
    .WithRoleName(name)
    .WithObjectType(object_type)
    .WithObjectName(object_name)
    .WithPrivilege(privilege)
    .WithDatabaseName(db_name);
```

**REQUEST METHODS:**

- `WithRoleName(const std::string& name)`

    Sets the name of the role.

- `WithObjectType(const std::string& object_type)`

    Sets the type of the target object, such as `Collection` or `Global`.

- `WithObjectName(const std::string& object_name)`

    Sets the name of the target object. Use `*` to apply the privilege to all objects of the given type.

- `WithPrivilege(const std::string& privilege)`

    Sets the name of the privilege to revoke. For available privileges, refer to [Grant Privileges](https://milvus.io/docs/grant_privileges.md).

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

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

status = client->RevokePrivilege(
    milvus::RevokePrivilegeRequest()
        .WithRoleName(role_name)
        .WithObjectType("Collection")
        .WithObjectName(collection_name)
        .WithPrivilege("Search")
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
