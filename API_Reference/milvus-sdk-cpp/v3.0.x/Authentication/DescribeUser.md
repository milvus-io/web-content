# DescribeUser()

This operation provides the details of the specified user, including the roles granted to them.

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

    Sets the name of the user to describe.

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded.

- **response** (*DescribeUserResponse*) -

    - **Desc** (*const UserDesc&*) -

        Get user description.

        - **Name** (*const std::string&*) -

            Get the name of the user.

        - **Description** (*const std::string&*) -

            Get the user description.

        - **Roles** (*const std::vector<std::string>&*) -

            Get role names of the user.


UserDesc members:

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
    DescribeUserRequest().WithUserName("alice"),
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

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

The following example demonstrates how to use DescribeUser() to retrieve a user's details.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::DescribeUserRequest()
    .WithUserName(name);
milvus::DescribeUserResponse response;
status = client->DescribeUser(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
