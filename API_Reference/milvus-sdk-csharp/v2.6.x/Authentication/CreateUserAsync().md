# CreateUserAsync()

Creates a user with the given password.

```csharp
public async Task CreateUserAsync(CreateUserReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new CreateUserReq
{
    UserName = "alice",
    Password = "p@ssw0rd",
    Description = "Alice's account"
};

await client.CreateUserAsync(request);
```

**REQUEST PARAMETERS:**

- `UserName` (*string*) -

    The name of the user to create.

- `Password` (*string*) -

    The password of the user to create. Sent to the server base64-encoded.

- `Description` (*string?*) -

    An optional description for the user.

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

await client.CreateUserAsync(new CreateUserReq
{
    UserName = "alice",
    Password = "p@ssw0rd",
    Description = "Alice's account"
});
```
