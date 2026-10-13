# ListPrivilegeGroups()

This operation returns a list of all privilege groups.

```cpp
Status ListPrivilegeGroups(const ListPrivilegeGroupsRequest& request, ListPrivilegeGroupsResponse& response)
```

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. On success, the ListPrivilegeGroupsResponse carries the privilege group information.

- **response** (*ListPrivilegeGroupsResponse*) -

    - **Groups** (*const std::vector<PrivilegeGroupInfo>&*) -

        Get informations of privilege groups.

        - **Name** (*const std::string&*) -

            Name of the group.

        - **Privileges** (*const std::vector<std::string>&*) -

            Privileges of the group.

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
