# UpdateUser()

This operation updates the description of an existing user on the Milvus server, sending the user name and the new description through the UpdateCredential RPC. The user's password is left unchanged.

```cpp
Status UpdateUser(const UpdateUserRequest& request)
```

## Request Syntax

```cpp
auto request = UpdateUserRequest()
    .WithUserName(user_name)
    .WithDescription(description);
```

**REQUEST METHODS:**

- `WithUserName(const std::string& user_name)`

    Sets the name of the existing user whose description is updated.

- `SetUserName(const std::string& user_name)`

    Sets the name of the existing user whose description is updated.

- `WithDescription(const std::string& description)`

    Sets the new description to store for the user.

- `SetDescription(const std::string& description)`

    Sets the new description to store for the user.

**RETURNS:**

*Status*

Returns a Status indicating whether the user's description was updated successfully.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Update the description of an existing user after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::UpdateUserRequest()
    .WithUserName("existing_user")
    .WithDescription("Data engineering team account");
status = client->UpdateUser(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
