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


PrivilegeGroupInfo members:

**METHODS:**

- `const std::string& Name() const`

    Name of the privilege group.

- `const std::vector<std::string>& Privileges() const`

    List of privilege names included in this group.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

ListPrivilegeGroupsResponse response;
auto status = client->ListPrivilegeGroups(
    ListPrivilegeGroupsRequest(),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const PrivilegeGroupInfos& groups = response.Groups();
for (const auto& group : groups) {
    std::cout << "Group: " << group.Name() << "
";
    for (const auto& priv : group.Privileges()) {
        std::cout << "  " << priv << "
";
    }
}
```

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

milvus::ListPrivilegeGroupsRequest request;
milvus::ListPrivilegeGroupsResponse response;
status = client->ListPrivilegeGroups(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
