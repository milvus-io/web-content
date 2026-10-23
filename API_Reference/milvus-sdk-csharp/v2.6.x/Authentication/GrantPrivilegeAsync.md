# GrantPrivilegeAsync()

Grants a privilege to a role.

```csharp
public async Task GrantPrivilegeAsync(GrantPrivilegeReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GrantPrivilegeReq
{
    RoleName = "read_only",
    Object = "Collection",
    ObjectName = "my_collection",
    Privilege = "Search",
    DatabaseName = "default"
};

await client.GrantPrivilegeAsync(request);
```

**REQUEST PARAMETERS:**

- `RoleName` (*string*) -

    The name of the role to grant the privilege to.

- `Object` (*string*) -

    The type of the object to grant the privilege on (e.g. `Collection`, `Global`).

- `ObjectName` (*string*) -

    The name of the object to grant the privilege on.

- `Privilege` (*string*) -

    The privilege to grant (e.g. `Search`, `Query`, `Insert`).

- `DatabaseName` (*string?*) -

    The database in which the object is defined. When empty, the server resolves the `default` database.

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

await client.GrantPrivilegeAsync(new GrantPrivilegeReq
{
    RoleName = "read_only",
    Object = "Collection",
    ObjectName = "my_collection",
    Privilege = "Search"
});
```
