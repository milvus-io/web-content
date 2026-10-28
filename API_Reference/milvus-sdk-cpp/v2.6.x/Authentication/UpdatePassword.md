# UpdatePassword()

This operation updates the password of an existing user, authenticated with the user's current (old) password. An updated description for the user can be supplied and is sent to the server only when it is non-empty.

```cpp
Status UpdatePassword(const UpdatePasswordRequest& request)
```

## Request Syntax

```cpp
auto request = UpdatePasswordRequest()
    .WithUserName(name)
    .WithOldPassword(password)
    .WithNewPassword(password)
    .WithDescription(description);
```

**REQUEST METHODS:**

- `WithUserName(const std::string& name)`

    Sets the name of the user whose password is to be updated.

- `SetUserName(const std::string& name)`

    Set name of the user.

- `WithOldPassword(const std::string& password)`

    Sets the current password of the user, used to authenticate the update.

- `SetOldPassword(const std::string& password)`

    Set password of the user.

- `WithNewPassword(const std::string& password)`

    Sets the new password to assign to the user.

- `SetNewPassword(const std::string& password)`

    Set new password of the user.

- `WithDescription(const std::string& description)`

    Sets an updated description for the user. Optional.

- `SetDescription(const std::string& description)`

    Set description of the user.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the user's password was updated successfully.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Use UpdatePassword() after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::UpdatePasswordRequest()
    .WithUserName("user_1")
    .WithOldPassword("current_password")
    .WithNewPassword("new_password");
status = client->UpdatePassword(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
