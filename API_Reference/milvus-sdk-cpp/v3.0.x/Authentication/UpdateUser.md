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

- `WithDescription(const std::string& description)`

    Sets the user's description.

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

status = client->UpdateUser(
    milvus::UpdateUserRequest()
        .WithUserName(user_name)
        .WithDescription(description)
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: Authentication; action: CREATE; addedSince: v3.0.x -->
