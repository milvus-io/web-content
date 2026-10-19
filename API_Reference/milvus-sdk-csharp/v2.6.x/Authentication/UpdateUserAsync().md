# UpdateUserAsync()

Updates a user's remark.

```csharp
public async Task UpdateUserAsync(UpdateUserReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new UpdateUserReq
{
    UserName = "alice",
    Description = "Alice's account"
};

await client.UpdateUserAsync(request);
```

**REQUEST PARAMETERS:**

- `UserName` (*string*) -

    The name of the user to update.

- `Description` (*string?*) -

    The new remark of the user. When left `null`, the server preserves the user's existing remark (the field is optional on the wire); set a non-null value (including `""`) to change or clear it.

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

await client.UpdateUserAsync(new UpdateUserReq
{
    UserName = "alice",
    Description = "Alice's account"
});
```
