# ListUsersAsync()

Lists all users.

```csharp
public async Task<ListUsersResp> ListUsersAsync(ListUsersReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListUsersReq();

ListUsersResp resp = await client.ListUsersAsync(request);
```

**RETURN TYPE:**

*Task\<ListUsersResp\>*

**RETURNS:**

A **ListUsersResp** object that contains the names of the users.

```csharp
ListUsersResp
    Users              // -> IReadOnlyList<string>
```

**PARAMETERS:**

- **Users** (*IReadOnlyList\<string\>*) -

    The names of the users.

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

ListUsersResp resp = await client.ListUsersAsync(new ListUsersReq());
```
