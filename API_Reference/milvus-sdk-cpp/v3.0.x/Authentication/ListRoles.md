# ListRoles()

This operation returns a list of roles.

```cpp
Status ListRoles(const ListRolesRequest& request, ListRolesResponse& response)
```

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The list of role names is carried in the response object.

- **response** (*ListRolesResponse*) -

    - **RoleNames** (*const std::vector<std::string>&*) -

        Get names of roles.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

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
