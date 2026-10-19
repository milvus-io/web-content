# RemovePrivilegesFromGroupAsync()

Removes privileges from a privilege group.

```csharp
public async Task RemovePrivilegesFromGroupAsync(RemovePrivilegesFromGroupReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new RemovePrivilegesFromGroupReq
{
    GroupName = "search_group",
    Privileges = ["Search"]
};

await client.RemovePrivilegesFromGroupAsync(request);
```

**REQUEST PARAMETERS:**

- `GroupName` (*string*) -

    The name of the privilege group.

- `Privileges` (*IReadOnlyList\<string\>*) -

    The privileges to remove from the group.

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

await client.RemovePrivilegesFromGroupAsync(new RemovePrivilegesFromGroupReq
{
    GroupName = "search_group",
    Privileges = ["Search"]
});
```
