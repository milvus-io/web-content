# ListPrivilegeGroups()

This operation returns a list of all privilege groups.

```cpp
Status ListPrivilegeGroups(const ListPrivilegeGroupsRequest& request, ListPrivilegeGroupsResponse& response)
```

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The list of privilege groups is carried in the response object.

- **response** (*ListPrivilegeGroupsResponse*) -

    - **Groups** (*const std::vector<PrivilegeGroupInfo>&*) -

        Get information of privilege groups.

        - **Name** (*const std::string&*) -

            Name of the privilege group.

        - **Privileges** (*const std::vector<std::string>&*) -

            Privileges of the privilege group.

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

milvus::ListPrivilegeGroupsRequest request;
milvus::ListPrivilegeGroupsResponse response;
status = client->ListPrivilegeGroups(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
