# DescribeRole()

This operation retrieves the details of the specified role and fills the output response with the role's information, including the privilege grants assigned to it.

```cpp
Status DescribeRole(const DescribeRoleRequest& request, DescribeRoleResponse& response)
```

## Request Syntax

```cpp
auto request = DescribeRoleRequest()
    .WithRoleName(name)
    .WithDatabaseName(db_name);
```

**REQUEST METHODS:**

- `WithRoleName(const std::string& name)`

    Sets the name of the role to describe.

- `SetRoleName(const std::string& name)`

    Set name of the role.

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the database to which the role is assigned.

- `SetDatabaseName(const std::string& db_name)`

    Set database name which the role is assigned.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded; on success, the output DescribeRoleResponse carries the role's details, including its name, description, and the privilege grants assigned to it.

- **response** (*DescribeRoleResponse*) -

    - **Desc** (*const RoleDesc&*) -

        Get role description.

        - **Name** (*const std::string&*) -

            Get name of the role.

        - **Description** (*const std::string&*) -

        - **GrantItems** (*const std::vector<GrantItem>&*) -

            Get privilege items of the role.

            - **object_type_** (*std::string*) -

                privilege type.

            - **object_name_** (*std::string*) -

                privilege name.

            - **db_name_** (*std::string*) -

                in which database take effect.

            - **role_name_** (*std::string*) -

                grant to which role.

            - **privilege_** (*std::string*) -

                privilege.

            - **grantor_name_** (*std::string*) -

                grantor name.


RoleDesc members:

## RoleDesc

```cpp
RoleDesc();
RoleDesc(const std::string& name, std::vector<GrantItem>&& grant_items);
```

**Methods:**

- `const std::string& Name() const`

    Name of the role.

- `const std::vector<GrantItem>& GrantItems() const`

    List of privilege grants assigned to this role. Each entry is a GrantItem struct (see below).

## GrantItem

`GrantItem` is a plain struct that describes a single privilege grant.

```cpp
struct GrantItem {
    GrantItem(const std::string& object_type, const std::string& object_name,
              const std::string& db_name, const std::string& role_name,
              const std::string& grantor_name, const std::string& privilege);

    std::string object_type_;   // e.g., "Global", "Collection"
    std::string object_name_;   // resource name (e.g., collection name or "*")
    std::string db_name_;       // database in which the privilege takes effect
    std::string role_name_;     // role that holds this privilege
    std::string privilege_;     // privilege name (e.g., "Insert", "Search")
    std::string grantor_name_;  // user who granted this privilege
};
```

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

DescribeRoleResponse response;
auto status = client->DescribeRole(
    DescribeRoleRequest().WithRoleName("read_only"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const RoleDesc& desc = response.Desc();
std::cout << "Role: " << desc.Name() << "\n";
for (const auto& item : desc.GrantItems()) {
    std::cout << "  " << item.privilege_
              << " on " << item.object_type_ << "/" << item.object_name_
              << " (db=" << item.db_name_ << ")\n";
}
```

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Use DescribeRole() after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::DescribeRoleRequest()
    .WithRoleName("project_reader")
    .WithDatabaseName("default");
milvus::DescribeRoleResponse response;
status = client->DescribeRole(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
