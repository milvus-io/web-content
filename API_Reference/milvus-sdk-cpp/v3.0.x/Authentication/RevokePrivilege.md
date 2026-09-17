# RevokePrivilege()

This operation revokes a privilege from a role on an arbitrary object. The object is identified by its type and name, for example a `"Collection"` named `"my_collection"`, a `"Database"` named `"my_db"`, or the `"Global"` scope. Read this page for more about [users and roles](https://milvus.io/docs/users_and_roles.md).

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

    Sets the type of the object the privilege applies to, such as `"Global"`, `"Database"`, `"Collection"`, or `"User"`.

- `WithObjectName(const std::string& object_name)`

    Sets the name of the object the privilege applies to. Use `"*"` for the `"Global"` scope.

- `WithPrivilege(const std::string& privilege)`

    Sets the name of the privilege to revoke from the role.

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name.

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
