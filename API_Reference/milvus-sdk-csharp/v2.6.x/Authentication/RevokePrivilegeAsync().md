# RevokePrivilegeAsync()

Revokes a privilege from a role.

```csharp
public async Task RevokePrivilegeAsync(RevokePrivilegeReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new RevokePrivilegeReq
{
    RoleName = "read_only",
    Object = "Collection",
    ObjectName = "my_collection",
    Privilege = "Search",
    DatabaseName = "default"
};

await client.RevokePrivilegeAsync(request);
```

**REQUEST PARAMETERS:**

- `RoleName` (*string*) -

    The name of the role to revoke the privilege from.

- `Object` (*string*) -

    The type of the object to revoke the privilege on (e.g. `Collection`, `Global`).

- `ObjectName` (*string*) -

    The name of the object to revoke the privilege on.

- `Privilege` (*string*) -

    The privilege to revoke (e.g. `Search`, `Query`, `Insert`).

- `DatabaseName` (*string?*) -

    The database in which the object is defined. When empty, the server resolves the `default` database.

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

await client.RevokePrivilegeAsync(new RevokePrivilegeReq
{
    RoleName = "read_only",
    Object = "Collection",
    ObjectName = "my_collection",
    Privilege = "Search"
});
```
