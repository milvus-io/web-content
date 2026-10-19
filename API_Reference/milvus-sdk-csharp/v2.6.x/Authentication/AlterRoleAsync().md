# AlterRoleAsync()

Alters a role's remark.

```csharp
public async Task AlterRoleAsync(AlterRoleReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AlterRoleReq
{
    RoleName = "read_only",
    Description = "Read-only access to the book collection"
};

await client.AlterRoleAsync(request);
```

**REQUEST PARAMETERS:**

- `RoleName` (*string*) -

    The name of the role to alter.

- `Description` (*string*) -

    The new description of the role.

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

await client.AlterRoleAsync(new AlterRoleReq
{
    RoleName = "read_only",
    Description = "Read-only access to the book collection"
});
```
