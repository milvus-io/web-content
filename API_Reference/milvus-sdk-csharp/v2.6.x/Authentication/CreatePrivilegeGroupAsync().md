# CreatePrivilegeGroupAsync()

Creates a privilege group.

```csharp
public async Task CreatePrivilegeGroupAsync(CreatePrivilegeGroupReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new CreatePrivilegeGroupReq
{
    GroupName = "search_group"
};

await client.CreatePrivilegeGroupAsync(request);
```

**REQUEST PARAMETERS:**

- `GroupName` (*string*) -

    The name of the privilege group to create.

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

await client.CreatePrivilegeGroupAsync(new CreatePrivilegeGroupReq
{
    GroupName = "search_group"
});
```
