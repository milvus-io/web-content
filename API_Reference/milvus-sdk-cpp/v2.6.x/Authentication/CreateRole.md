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

- `SetRoleName(const std::string& name)`

    Set name of the role.

- `WithDescription(const std::string& description)`

    Sets the description of the role to create.

- `SetDescription(const std::string& description)`

    Set description of the role.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the role was created successfully.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

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
