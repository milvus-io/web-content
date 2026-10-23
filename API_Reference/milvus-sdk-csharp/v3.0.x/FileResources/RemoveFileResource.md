# RemoveFileResource

Removes an external file resource from a collection.

```csharp
public async Task RemoveFileResourceAsync(RemoveFileResourceReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new RemoveFileResourceReq
{
    Name = "value",
};

await client.RemoveFileResourceAsync(new RemoveFileResourceReq
{
    Name = "value",
});
```

**REQUEST PARAMETERS:**

- `Name` (*string*) -

    The name of the file resource to remove.
## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

await client.RemoveFileResourceAsync(new RemoveFileResourceReq
{
    Name = "value",
});
```
