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

- `SetUserName(const std::string& name)`

    Set name of the user.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a status indicating whether the operation succeeded.

- **response** (*DescribeUserResponse*) -

    - **Desc** (*const UserDesc&*) -

        Get user description. The following members belong to `UserDesc`.

        - **Name** (*const std::string&*) -

            The username.

        - **Description** (*const std::string&*) -

            Get the user description.

        - **Roles** (*const std::vector<std::string>&*) -

            List of role names assigned to the user.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

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
