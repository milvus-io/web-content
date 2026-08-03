# CreateUser()

Create an user with username and password to login milvus.

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

    Set name of the user.

- `WithPassword(const std::string& password)`

    Set password of the user.

- `WithDescription(const std::string& description)`

    Set description of the user.

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Demonstrates CreateUser() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::CreateUserRequest();
util::CheckStatus(client->CreateUser(request));
```
