# ListRolesAsync()

Lists all roles.

```csharp
public async Task<ListRolesResp> ListRolesAsync(ListRolesReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListRolesReq();

ListRolesResp resp = await client.ListRolesAsync(request);
```

**RETURN TYPE:**

*Task\<ListRolesResp\>*

**RETURNS:**

A **ListRolesResp** object that contains the roles and their member users.

```csharp
ListRolesResp
    Roles              // -> IReadOnlyList<RoleResult>
```

**PARAMETERS:**

- **Roles** (*IReadOnlyList\<RoleResult\>*) -

    The roles and their member users. A **RoleResult** that contains the following members:

    - **Role** (*string*) -

        The name of the role.

    - **Users** (*IReadOnlyList\<string\>*) -

        The names of the users the role is granted to.

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

ListRolesResp resp = await client.ListRolesAsync(new ListRolesReq());
```
