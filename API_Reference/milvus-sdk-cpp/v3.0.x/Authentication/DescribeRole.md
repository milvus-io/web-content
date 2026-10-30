# DescribeRole()

This operation provides the details of the specified role.

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

    Sets the name of the database in which the role is scoped. Optional.

- `SetDatabaseName(const std::string& db_name)`

    Set database name which the role is assigned.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a status indicating whether the operation succeeded.

- **response** (*DescribeRoleResponse*) -

    - **Desc** (*const RoleDesc&*) -

        Get role description.

        - **Name** (*const std::string&*) -

            Get name of the role.

        - **Description** (*const std::string&*) -

            Get the role description.

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

**METHODS:**

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

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Describes the role named <role_name> after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::DescribeRoleRequest()
    .WithRoleName(name)
    .WithDatabaseName(db_name);
milvus::DescribeRoleResponse response;
status = client->DescribeRole(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
