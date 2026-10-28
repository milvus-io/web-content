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

status = client->DropUser(
    milvus::DropUserRequest()
        .WithUserName(user_name)
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
