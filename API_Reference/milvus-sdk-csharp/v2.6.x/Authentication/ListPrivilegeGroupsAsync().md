# ListPrivilegeGroupsAsync()

Lists all privilege groups.

```csharp
public async Task<ListPrivilegeGroupsResp> ListPrivilegeGroupsAsync(ListPrivilegeGroupsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListPrivilegeGroupsReq();

ListPrivilegeGroupsResp resp = await client.ListPrivilegeGroupsAsync(request);
```

**RETURN TYPE:**

*Task\<ListPrivilegeGroupsResp\>*

**RETURNS:**

A **ListPrivilegeGroupsResp** object that contains the privilege groups and the privileges they contain.

```csharp
ListPrivilegeGroupsResp
    Groups             // -> IReadOnlyList<PrivilegeGroupInfo>
    GroupNames         // -> IReadOnlyList<string>
```

**PARAMETERS:**

- **Groups** (*IReadOnlyList\<PrivilegeGroupInfo\>*) -

    The privilege groups and the privileges they contain. A **PrivilegeGroupInfo** that contains the following members:

    - **GroupName** (*string*) -

        The name of the privilege group.

    - **Privileges** (*IReadOnlyList\<string\>*) -

        The privileges contained in the group.

- **GroupNames** (*IReadOnlyList\<string\>*) -

    The names of the privilege groups.

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

ListPrivilegeGroupsResp resp = await client.ListPrivilegeGroupsAsync(new ListPrivilegeGroupsReq());
```
