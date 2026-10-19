# DropRoleAsync()

Drops a role.

```csharp
public async Task DropRoleAsync(DropRoleReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropRoleReq
{
    RoleName = "read_only",
    ForceDrop = true
};

await client.DropRoleAsync(request);
```

**REQUEST PARAMETERS:**

- `RoleName` (*string*) -

    The name of the role to drop.

- `ForceDrop` (*bool*) -

    When true, drops the role even if it still has privilege grants. The server otherwise refuses to drop a role that has any grants.

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

await client.DropRoleAsync(new DropRoleReq
{
    RoleName = "read_only"
});
```
