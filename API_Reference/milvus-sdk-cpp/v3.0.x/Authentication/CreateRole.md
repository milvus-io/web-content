# CreateRole()

Create a role with specific privileges.

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

    Set name of the role.

- `SetRoleName(const std::string& name)`

    Set name of the role.

- `WithDescription(const std::string& description)`

    Set description of the role.

- `SetDescription(const std::string& description)`

    Set description of the role.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a status indicating whether the operation succeeded.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Demonstrates CreateRole() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::CreateRoleRequest();
util::CheckStatus(client->CreateRole(request));
```
