# RemoveFileResourceAsync()

Removes an external file resource from a collection.

```csharp
public async Task RemoveFileResourceAsync(RemoveFileResourceReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new RemoveFileResourceReq
{
    Name = "file_1"
};

await client.RemoveFileResourceAsync(request);
```

**REQUEST PARAMETERS:**

- `Name` (*string*) -

    The name of the file resource to remove.

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
using Milvus.Client.V2.Requests.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

await client.RemoveFileResourceAsync(new RemoveFileResourceReq
{
    Name = "file_1"
});
```
