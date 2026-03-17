# DescribeUser()

This operation returns a user's detailed description.

```cpp
Status DescribeUser(const DescribeUserRequest& request, DescribeUserResponse& response)
```

## Request Syntax

```cpp
auto request = DescribeUserRequest()
    .WithUserName(name);
```

**REQUEST METHODS:**

- `WithUserName(const std::string& name)`

    Sets the name of the user.

**RETURNS:**

*Status* with *DescribeUserResponse*

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

milvus::DescribeUserResponse resp_desc_user;

status = client->DescribeUser(
    milvus::DescribeUserRequest()
        .WithUserName(user_name), resp_desc_user
);

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
