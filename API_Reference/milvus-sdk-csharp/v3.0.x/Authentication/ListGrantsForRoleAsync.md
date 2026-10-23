# ListGrantsForRoleAsync()

Lists the privileges granted to a role.

```csharp
public async Task<ListGrantsForRoleResp> ListGrantsForRoleAsync(ListGrantsForRoleReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListGrantsForRoleReq
{
    RoleName = "read_only",
    DatabaseName = "default"
};

ListGrantsForRoleResp resp = await client.ListGrantsForRoleAsync(request);
```

**REQUEST PARAMETERS:**

- `RoleName` (*string*) -

    The name of the role whose grants to list.

- `DatabaseName` (*string?*) -

    The database to list the role's grants in. When empty, the server resolves the `default` database.

**RETURN TYPE:**

*Task\<ListGrantsForRoleResp\>*

**RETURNS:**

A **ListGrantsForRoleResp** object that contains the privilege grants of the role.

```csharp
ListGrantsForRoleResp
    Grants             // -> IReadOnlyList<GrantEntity>
```

**PARAMETERS:**

- **Grants** (*IReadOnlyList\<GrantEntity\>*) -

    The privilege grants of the role. A **GrantEntity** that contains the following members:

    - **RoleName** (*string*) -

        The name of the role the privilege is granted to.

    - **ObjectName** (*string*) -

        The name of the object the privilege applies to.

    - **ObjectType** (*string*) -

        The type of the object the privilege applies to (e.g. `Collection`, `Global`).

    - **DbName** (*string*) -

        The database in which the object is defined.

    - **Privilege** (*string*) -

        The granted privilege (e.g. `Search`, `Query`, `Insert`).

    - **Grantor** (*string*) -

        The user who granted the privilege.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Rbac;
using Milvus.Client.V2.Responses.Rbac;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

ListGrantsForRoleResp resp = await client.ListGrantsForRoleAsync(new ListGrantsForRoleReq
{
    RoleName = "read_only"
});
```
