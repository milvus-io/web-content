# PrivilegeGroupInfo

This class represents a single privilege group, which is a named set of privileges that can be granted to a role as a unit. `ListPrivilegeGroupsResponse::Groups()` returns a `PrivilegeGroupInfos` value, which is a type alias for `std::vector<PrivilegeGroupInfo>`.

```cpp
PrivilegeGroupInfo();
PrivilegeGroupInfo(const std::string& name, std::vector<std::string>&& privileges);

using PrivilegeGroupInfos = std::vector<PrivilegeGroupInfo>;
```

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
    std::cout << "Group: " << group.Name() << "\n";
    for (const auto& priv : group.Privileges()) {
        std::cout << "  " << priv << "\n";
    }
}
```
