# ListResourceGroupsAsync()

Lists all resource groups.

```csharp
public async Task<ListResourceGroupsResp> ListResourceGroupsAsync(ListResourceGroupsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListResourceGroupsReq();

ListResourceGroupsResp response = await client.ListResourceGroupsAsync(request);
```

**REQUEST PARAMETERS:**

This request takes no fields.

**RETURN TYPE:**

*Task\<ListResourceGroupsResp\>*

**RETURNS:**

A **ListResourceGroupsResp** object that contains the names of the resource groups.

```csharp
ListResourceGroupsResp
    ResourceGroups  // -> IReadOnlyList<string>
```

**PARAMETERS:**

- **ResourceGroups** (*IReadOnlyList\<string\>*) -

    The names of the resource groups.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.ResourceGroup;
using Milvus.Client.V2.Responses.ResourceGroup;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

ListResourceGroupsResp response = await client.ListResourceGroupsAsync(new ListResourceGroupsReq());
foreach (string name in response.ResourceGroups)
{
    Console.WriteLine(name);
}
```
