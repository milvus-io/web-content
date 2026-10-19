# DropUserAsync()

Drops a user.

```csharp
public async Task DropUserAsync(DropUserReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DropUserReq
{
    UserName = "alice"
};

await client.DropUserAsync(request);
```

**REQUEST PARAMETERS:**

- `UserName` (*string*) -

    The name of the user to drop.

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

await client.DropUserAsync(new DropUserReq
{
    UserName = "alice"
});
```
