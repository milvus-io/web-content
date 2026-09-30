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

- `WithOldPassword(const std::string& password)`

    Sets the current password of the user, used to authenticate the update.

- `WithNewPassword(const std::string& password)`

    Sets the new password to assign to the user.

- `WithDescription(const std::string& description)`

    Sets an updated description for the user. Optional.

**RETURNS:**

*Status*

Returns a Status indicating whether the user's password was updated successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

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
