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

        Get role description. The following members belong to `RoleDesc`.

        - **Name** (*const std::string&*) -

            Name of the role.

        - **Description** (*const std::string&*) -

            Get the role description.

        - **GrantItems** (*const std::vector<GrantItem>&*) -

            List of privilege grants assigned to this role. Each entry is a `GrantItem` plain struct with the following fields.

            - **object_type_** (*std::string*) -

                Privilege type, for example `Global` or `Collection`.

            - **object_name_** (*std::string*) -

                Privilege object name, for example a collection name or `*`.

            - **db_name_** (*std::string*) -

                The database in which the privilege takes effect.

            - **role_name_** (*std::string*) -

                The role the privilege is granted to.

            - **privilege_** (*std::string*) -

                The privilege name, for example `Insert` or `Search`.

            - **grantor_name_** (*std::string*) -

                The name of the user who granted the privilege.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

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
