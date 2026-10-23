# UpdatePasswordAsync()

Updates a user's password.

```csharp
public async Task UpdatePasswordAsync(UpdatePasswordReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new UpdatePasswordReq
{
    UserName = "alice",
    OldPassword = "p@ssw0rd",
    NewPassword = "new_p@ss",
    Description = "Alice's account"
};

await client.UpdatePasswordAsync(request);
```

**REQUEST PARAMETERS:**

- `UserName` (*string*) -

    The name of the user whose password to update.

- `OldPassword` (*string*) -

    The current password of the user.

- `NewPassword` (*string*) -

    The new password for the user.

- `Description` (*string?*) -

    An optional description for the user, updated together with the password.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Rbac;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.UpdatePasswordAsync(new UpdatePasswordReq
{
    UserName = "alice",
    OldPassword = "p@ssw0rd",
    NewPassword = "new_p@ss"
});
```
