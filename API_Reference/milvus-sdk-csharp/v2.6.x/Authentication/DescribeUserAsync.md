# DescribeUserAsync()

Describes a user and its roles.

```csharp
public async Task<DescribeUserResp> DescribeUserAsync(DescribeUserReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DescribeUserReq
{
    UserName = "alice"
};

DescribeUserResp resp = await client.DescribeUserAsync(request);
```

**REQUEST PARAMETERS:**

- `UserName` (*string*) -

    The name of the user to describe.

**RETURN TYPE:**

*Task\<DescribeUserResp\>*

**RETURNS:**

A **DescribeUserResp** object that contains the described user.

```csharp
DescribeUserResp
    User               // -> UserResult?
```

**PARAMETERS:**

- **User** (*UserResult?*) -

    The described user, or `null` when the user does not exist. A **UserResult** that contains the following members:

    - **User** (*string*) -

        The name of the user.

    - **Roles** (*IReadOnlyList\<string\>*) -

        The names of the roles granted to the user.

    - **Description** (*string*) -

        The user description, as set via `UpdateUserAsync`.

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

DescribeUserResp resp = await client.DescribeUserAsync(new DescribeUserReq
{
    UserName = "alice"
});
```
