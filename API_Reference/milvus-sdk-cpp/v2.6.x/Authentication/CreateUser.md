# CreateUser()

This operation creates a user account with a username and password for logging into Milvus. 

```cpp
Status CreateUser(const CreateUserRequest& request)
```

## Request Syntax

```cpp
auto request = CreateUserRequest()
    .WithUserName(name)
    .WithPassword(password);
```

**REQUEST METHODS:**

- `WithUserName(const std::string& name)`

    Sets the name of the user.

- `WithPassword(const std::string& password)`

    Sets the password of the user.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->CreateUser(
    milvus::CreateUserRequest().
        WithUserName(user_name).
        WithPassword("P@ssw0rd!")
);

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
