# GrantPrivilege()

This operation grants a privilege to a role on a specific object.

```cpp
Status GrantPrivilege(const GrantPrivilegeRequest& request)
```

## Request Syntax

```cpp
auto request = GrantPrivilegeRequest()
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

    Sets the name of the privilege to grant. For available privileges, refer to [Grant Privileges](https://milvus.io/docs/grant_privileges.md).

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

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

status = client->GrantPrivilege(
    milvus::GrantPrivilegeRequest()
        .WithRoleName(role_name)
        .WithObjectType("Collection")
        .WithObjectName(collection_name)
        .WithPrivilege("Search")
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
