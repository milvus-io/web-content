# RoleDesc

This page documents both `RoleDesc` and `GrantItem`. `RoleDesc` represents the metadata of a Milvus role and its associated privileges. It is returned by calling `Desc()` on a `DescribeRoleResponse`. Each privilege entry is a `GrantItem` struct.

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
