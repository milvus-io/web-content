# GrantPrivilege()

This operation assigns a privilege to a role.

```cpp
Status GrantPrivilege(const GrantPrivilegeRequest& request)
```

## Request Syntax

```cpp
auto request = GrantPrivilegeRequest()
    .WithRoleName(role_name)
    .WithDatabaseName(db_name)
    .WithObjectType(object_type)
    .WithObjectName(object_name)
    .WithPrivilege(privilege);
```

**REQUEST METHODS:**

- `WithRoleName(const std::string& name)`

    Sets the name of the role.

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the database to which the privilege applies.

- `WithObjectType(const std::string& object_type)`

    Sets the type of the object the privilege applies to, such as `Global`, `Database`, or `Collection`.

- `WithObjectName(const std::string& object_name)`

    Sets the name of the object the privilege applies to. Use `*` for the `Global` scope.

- `WithPrivilege(const std::string& privilege)`

    Sets the name of the privilege. For available privileges, refer to [this page](https://milvus.io/docs/grant_privileges.md).

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
        .WithPrivilege("Search"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
