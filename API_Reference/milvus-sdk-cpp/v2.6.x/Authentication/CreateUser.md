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

- `SetUserName(const std::string& name)`

    Set name of the user.

- `WithPassword(const std::string& password)`

    Sets the login password of the user.

- `SetPassword(const std::string& password)`

    Set password of the user.

- `WithDescription(const std::string& description)`

    Sets the description of the user. Optional.

- `SetDescription(const std::string& description)`

    Set description of the user.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the user was created successfully.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

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
