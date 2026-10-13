# ListUsers()

This operation returns a list of user names.

```cpp
Status ListUsers(const ListUsersRequest& request, ListUsersResponse& response)
```

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The list of user names is carried in the response object.

- **response** (*ListUsersResponse*) -

    - **UserNames** (*const std::vector<std::string>&*) -

        Get names of users.

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

milvus::ListUsersRequest request;
milvus::ListUsersResponse response;
status = client->ListUsers(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
