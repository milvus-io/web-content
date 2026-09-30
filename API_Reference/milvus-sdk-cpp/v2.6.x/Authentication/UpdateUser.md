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

- `WithDescription(const std::string& description)`

    Sets the new description to store for the user.

**RETURNS:**

*Status*

Returns a Status indicating whether the user's description was updated successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

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
