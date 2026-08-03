# DropUser()

This operation drops a user.

```cpp
Status DropUser(const DropUserRequest& request)
```

## Request Syntax

```cpp
auto request = DropUserRequest()
    .WithUserName(name);
```

**REQUEST METHODS:**

- `WithUserName(const std::string& name)`

    Sets the name of the user.

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

status = client->DropUser(
    milvus::DropUserRequest()
        .WithUserName(user_name)
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
