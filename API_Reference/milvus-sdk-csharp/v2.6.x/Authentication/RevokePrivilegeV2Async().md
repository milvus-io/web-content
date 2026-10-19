# RevokePrivilegeV2Async()

Revokes a privilege from a role using the v2 object/privilege model.

```csharp
public async Task RevokePrivilegeV2Async(RevokePrivilegeReqV2 request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new RevokePrivilegeReqV2
{
    RoleName = "read_only",
    Privilege = "Search",
    DatabaseName = "default",
    CollectionName = "my_collection"
};

await client.RevokePrivilegeV2Async(request);
```

**REQUEST PARAMETERS:**

- `RoleName` (*string*) -

    The name of the role from which the privilege is revoked.

- `Privilege` (*string*) -

    The privilege to revoke, e.g. `"Search"` or `"CreateIndex"`.

- `DatabaseName` (*string*) -

    The name of the database the privilege applies to.

- `CollectionName` (*string*) -

    The name of the collection the privilege applies to.

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

await client.RevokePrivilegeV2Async(new RevokePrivilegeReqV2
{
    RoleName = "read_only",
    Privilege = "Search",
    DatabaseName = "default",
    CollectionName = "my_collection"
});
```
