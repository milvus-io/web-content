# ListUsers()

This operation returns a list of user names.

```cpp
Status ListUsers(const ListUsersRequest& request, ListUsersResponse& response)
```

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. On success, the ListUsersResponse carries the list of user names.

- **response** (*ListUsersResponse*) -

    - **UserNames** (*const std::vector<std::string>&*) -

        Get user names.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details. See [StatusCode](../Client/StatusCode.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::ListUsersRequest request;
milvus::ListUsersResponse response;
status = client->ListUsers(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
