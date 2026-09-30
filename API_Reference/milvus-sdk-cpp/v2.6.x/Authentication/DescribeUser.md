# DescribeUser()

This operation retrieves the details of a specified user from Milvus, including the roles granted to that user, and fills the caller-provided DescribeUserResponse with the result. On success, the response carries a UserDesc with the user's name, description, and granted role names.

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

Returns a Status indicating whether the operation succeeded; on success, the response object carries the user's details, including the roles granted to the user.

- **response** (*DescribeUserResponse*) -

    - **Desc** (*const UserDesc&*) -

        Get user description.

        - **Name** (*const std::string&*) -

            Get the name of the user.

        - **Description** (*const std::string&*) -

        - **Roles** (*const std::vector<std::string>&*) -

            Get role names of the user.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Describe a user after connecting a MilvusClientV2; the user's details are written into the response object.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::DescribeUserRequest request;
milvus::DescribeUserResponse response;
request.WithUserName("user_1");

status = client->DescribeUser(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
} else {
    const auto& desc = response.Desc();
    std::cout << "User: " << desc.Name() << ", roles: " << desc.Roles().size() << std::endl;
}
```
