# UpdateUser()

This operation updates a user's description.

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

    Sets the name of the user.

- `SetUserName(const std::string& user_name)`

    Set the user name.

- `WithDescription(const std::string& description)`

    Sets the user's description.

- `SetDescription(const std::string& description)`

    Set the user description.

**RETURNS:**

*[Status](../Client/Status.md)*

Check `status.IsOk()` to confirm success.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->UpdateUser(
    milvus::UpdateUserRequest()
        .WithUserName(user_name)
        .WithDescription(description)
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
