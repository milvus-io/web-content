# DescribeRoleAsync()

Describes a role, its users, its description and its privilege grants.

```csharp
public async Task<DescribeRoleResp> DescribeRoleAsync(DescribeRoleReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DescribeRoleReq
{
    RoleName = "read_only",
    DatabaseName = "default"
};

DescribeRoleResp resp = await client.DescribeRoleAsync(request);
```

**REQUEST PARAMETERS:**

- `RoleName` (*string*) -

    The name of the role to describe.

- `DatabaseName` (*string?*) -

    The database to describe the role in. When empty, the server resolves the `default` database.

**RETURN TYPE:**

*Task\<DescribeRoleResp\>*

**RETURNS:**

A **DescribeRoleResp** object that describes the role, its users, its description and its privilege grants.

```csharp
DescribeRoleResp
    RoleName           // -> string
    Users              // -> IReadOnlyList<string>
    Description        // -> string
    Grants             // -> IReadOnlyList<GrantItem>
```

**PARAMETERS:**

- **RoleName** (*string*) -

    The name of the role.

- **Users** (*IReadOnlyList\<string\>*) -

    The users assigned to the role.

- **Description** (*string*) -

    The role description, as set via `AlterRoleAsync`.

- **Grants** (*IReadOnlyList\<GrantItem\>*) -

    The privilege grants of the role. A **GrantItem** that contains the following members:

    - **ObjectType** (*string*) -

        The object type (e.g. `Global`, `Collection`, `User`).

    - **ObjectName** (*string*) -

        The object name the privilege applies to.

    - **DbName** (*string*) -

        The database in which the grant takes effect.

    - **RoleName** (*string*) -

        The role the grant is assigned to.

    - **Grantor** (*string*) -

        The grantor user.

    - **Privilege** (*string*) -

        The granted privilege.

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

DescribeRoleResp resp = await client.DescribeRoleAsync(new DescribeRoleReq
{
    RoleName = "read_only"
});
```
