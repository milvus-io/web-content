# ListFileResourcesAsync()

Lists the external file resources of a collection.

```csharp
public async Task<ListFileResourcesResp> ListFileResourcesAsync(ListFileResourcesReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListFileResourcesReq();

ListFileResourcesResp result = await client.ListFileResourcesAsync(request);
```

**REQUEST PARAMETERS:**

`ListFileResourcesReq` takes no parameters.

**RETURN TYPE:**

*Task\<ListFileResourcesResp\>*

**RETURNS:**

A **ListFileResourcesResp** object.

- `Resources` (*IReadOnlyList\<FileResourceInfo\>*) -

    The file resources attached to the collection. Each **FileResourceInfo** exposes:

    - `Id` (*long*) -

        The ID of the file resource.

    - `Name` (*string*) -

        The name of the file resource.

    - `Path` (*string*) -

        The path of the file resource.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

ListFileResourcesResp result = await client.ListFileResourcesAsync(new ListFileResourcesReq());
```
