# RevokePrivilegeV2()

This operation revokes a privilege or a privilege group from a role. 

```cpp
Status RevokePrivilegeV2(const RevokePrivilegeV2Request& request)
```

## Request Syntax

```cpp
auto request = RevokePrivilegeV2Request()
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

status = client->RevokePrivilegeV2(milvus::RevokePrivilegeV2Request()
                                       .WithRoleName(role_name)
                                       .WithPrivilege(privilege_group_name)
                                       .WithCollectionName(collection_name));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
