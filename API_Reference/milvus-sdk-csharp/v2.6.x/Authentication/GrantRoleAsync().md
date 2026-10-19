# GrantRoleAsync()

Adds a user to a role.

```csharp
public async Task GrantRoleAsync(GrantRoleReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GrantRoleReq
{
    UserName = "alice",
    RoleName = "read_only"
};

await client.GrantRoleAsync(request);
```

**REQUEST PARAMETERS:**

- `UserName` (*string*) -

    The name of the user to grant the role to.

- `RoleName` (*string*) -

    The name of the role to grant.

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

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

await client.GrantRoleAsync(new GrantRoleReq
{
    UserName = "alice",
    RoleName = "read_only"
});
```
