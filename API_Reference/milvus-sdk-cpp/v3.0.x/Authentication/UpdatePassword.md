# UpdatePassword()

This operation updates a user's password.

```cpp
Status UpdatePassword(const UpdatePasswordRequest& request)
```

## Request Syntax

```cpp
auto request = UpdatePasswordRequest()
    .WithUserName(name)
    .WithOldPassword(password1)
    .WithNewPassword(password2)
    .WithDescription(description)
    .WithResetConnection(reset_connection);
```

**REQUEST METHODS:**

- `WithUserName(const std::string& name)`

    Sets the name of the user.

- `WithOldPassword(const std::string& password)`

    Sets the password of the user.

- `WithNewPassword(const std::string& password)`

    Sets the user's new password.

- `WithDescription(const std::string& description)`

    Sets the description of the user.

- `WithResetConnection(bool reset_connection)`

    Sets whether to reset the current connection with the new credentials after the password is updated. When **True**, the client reconnects using the new password so subsequent RPCs keep working. Note that the password is updated on the server before the reconnect is attempted; if the reconnect fails, the returned status reports that the password was updated but the connection must be re-established manually with the new credentials. The default value is **False**.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

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

status = client->UpdatePassword(
    milvus::UpdatePasswordRequest()
        .WithUserName(user_name)
        .WithOldPassword("P@ssw0rd!")
        .WithNewPassword("P@ssw1rd#")
);

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
