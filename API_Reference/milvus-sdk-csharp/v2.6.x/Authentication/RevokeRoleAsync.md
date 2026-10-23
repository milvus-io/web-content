# RevokeRoleAsync()

Removes a user from a role.

```csharp
public async Task RevokeRoleAsync(RevokeRoleReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new RevokeRoleReq
{
    UserName = "alice",
    RoleName = "read_only"
};

await client.RevokeRoleAsync(request);
```

**REQUEST PARAMETERS:**

- `UserName` (*string*) -

    The name of the user to revoke the role from.

- `RoleName` (*string*) -

    The name of the role to revoke.

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

await client.RevokeRoleAsync(new RevokeRoleReq
{
    UserName = "alice",
    RoleName = "read_only"
});
```
