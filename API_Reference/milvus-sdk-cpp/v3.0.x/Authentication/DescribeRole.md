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

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the database in which the role is scoped. Optional.

**RETURNS:**

*Status*

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

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

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
status = client->DescribeRole(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
