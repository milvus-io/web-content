# CreateUser()

This operation creates a user account with the given username and password for logging in to Milvus. An optional description can be attached to the account.

```cpp
Status CreateUser(const CreateUserRequest& request)
```

## Request Syntax

```cpp
auto request = CreateUserRequest()
    .WithUserName(name)
    .WithPassword(password)
    .WithDescription(description);
```

**REQUEST METHODS:**

- `WithUserName(const std::string& name)`

    Sets the name of the user to create.

- `WithPassword(const std::string& password)`

    Sets the login password of the user.

- `WithDescription(const std::string& description)`

    Sets the description of the user. Optional.

**RETURNS:**

*Status*

Returns a Status indicating whether the user was created successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Create a user after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::CreateUserRequest()
    .WithUserName("alice")
    .WithPassword("Milvus123")
    .WithDescription("User for the analytics team");
status = client->CreateUser(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
