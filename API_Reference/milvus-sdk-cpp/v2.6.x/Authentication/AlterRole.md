# AlterRole()

This operation updates the description of a role.

```cpp
Status AlterRole(const AlterRoleRequest& request)
```

## Request Syntax

```cpp
auto request = AlterRoleRequest()
    .WithRoleName(role_name)
    .WithDescription(description);
```

**REQUEST METHODS:**

- `WithRoleName(const std::string& role_name)`

    Sets the name of the role to alter.

- `SetRoleName(const std::string& role_name)`

    Sets the name of the role to alter.

- `WithDescription(const std::string& description)`

    Sets the new description for the role.

- `SetDescription(const std::string& description)`

    Sets the new description for the role.

**RETURNS:**

*Status*

Returns a Status indicating whether the role was updated successfully.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Call AlterRole() on a connected MilvusClientV2 to update a role's description.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->AlterRole(
    milvus::AlterRoleRequest()
        .WithRoleName(role_name)
        .WithDescription(description)
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
