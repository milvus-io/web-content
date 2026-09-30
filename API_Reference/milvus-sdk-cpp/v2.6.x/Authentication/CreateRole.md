# CreateRole()

This operation creates a role in Milvus with the specified name and description. Privileges can be granted to the role afterwards.

```cpp
Status CreateRole(const CreateRoleRequest& request)
```

## Request Syntax

```cpp
auto request = CreateRoleRequest()
    .WithRoleName(name)
    .WithDescription(description);
```

**REQUEST METHODS:**

- `WithRoleName(const std::string& name)`

    Sets the name of the role to create.

- `WithDescription(const std::string& description)`

    Sets the description of the role to create.

**RETURNS:**

*Status*

Returns a Status indicating whether the role was created successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Use CreateRole() after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::CreateRoleRequest()
    .WithRoleName("team_lead")
    .WithDescription("Role for team leads with read and write privileges");
status = client->CreateRole(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
