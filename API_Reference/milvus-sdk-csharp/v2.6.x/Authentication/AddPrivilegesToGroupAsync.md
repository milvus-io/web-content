# AddPrivilegesToGroupAsync()

Adds privileges to a privilege group.

```csharp
public async Task AddPrivilegesToGroupAsync(AddPrivilegesToGroupReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AddPrivilegesToGroupReq
{
    GroupName = "search_group",
    Privileges = ["Search", "Query"]
};

await client.AddPrivilegesToGroupAsync(request);
```

**REQUEST PARAMETERS:**

- `GroupName` (*string*) -

    The name of the privilege group.

- `Privileges` (*IReadOnlyList\<string\>*) -

    The privileges to add to the group.

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

await client.AddPrivilegesToGroupAsync(new AddPrivilegesToGroupReq
{
    GroupName = "search_group",
    Privileges = ["Search", "Query"]
});
```
