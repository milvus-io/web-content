# AddFileResourceAsync()

Adds an external file resource for a collection.

```csharp
public async Task AddFileResourceAsync(AddFileResourceReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new AddFileResourceReq
{
    Name = "file_1",
    Path = "s3://bucket/path/to/file.parquet"
};

await client.AddFileResourceAsync(request);
```

**REQUEST PARAMETERS:**

- `Name` (*string*) -

    The name of the file resource to register.

- `Path` (*string*) -

    The path of the file resource.

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

await client.AddFileResourceAsync(new AddFileResourceReq
{
    Name = "file_1",
    Path = "s3://bucket/path/to/file.parquet"
});
```
