# UserDesc

This class represents the metadata of a Milvus user. It is returned by calling `Desc()` on a `DescribeUserResponse`.

```cpp
UserDesc();
UserDesc(const std::string& name, std::vector<std::string>&& roles);
```

**METHODS:**

- `const std::string& Name() const`

    The username.

- `const std::vector<std::string>& Roles() const`

    List of role names assigned to the user.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

DescribeUserResponse response;
auto status = client->DescribeUser(
    DescribeUserRequest().WithUsername("alice"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const UserDesc& desc = response.Desc();
std::cout << "User: " << desc.Name() << "\n";
for (const auto& role : desc.Roles()) {
    std::cout << "  role: " << role << "\n";
}
```
