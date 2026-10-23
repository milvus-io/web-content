# AddFileResource

Adds an external file resource for a collection.

```csharp
public async Task AddFileResourceAsync(AddFileResourceReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AddFileResourceReq
{
    Name = "value",
    Path = "value",
};

await client.AddFileResourceAsync(new AddFileResourceReq
{
    Name = "value",
    Path = "value",
});
```

**REQUEST PARAMETERS:**

- `Name` (*string*) -

    The name of the file resource to register.

- `Path` (*string*) -

    The path of the file resource.
## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

await client.AddFileResourceAsync(new AddFileResourceReq
{
    Name = "value",
    Path = "value",
});
```
