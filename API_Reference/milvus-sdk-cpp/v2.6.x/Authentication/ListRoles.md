# ListRoles()

This operation returns a list of roles.

```cpp
Status ListRoles(const ListRolesRequest& request, ListRolesResponse& response)
```

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. On success, the ListRolesResponse carries the list of role names.

- **response** (*ListRolesResponse*) -

    - **RoleNames** (*const std::vector<std::string>&*) -

        Get role names.

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

milvus::ListRolesRequest request;
milvus::ListRolesResponse response;
status = client->ListRoles(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
