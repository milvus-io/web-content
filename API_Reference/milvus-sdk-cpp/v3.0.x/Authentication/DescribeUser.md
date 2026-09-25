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

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

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
status = client->DescribeUser(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
