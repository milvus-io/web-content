# ListFileResources

Lists the external file resources of a collection.

```csharp
public async Task<ListFileResourcesResp> ListFileResourcesAsync(ListFileResourcesReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListFileResourcesReq
{

};

var resp = await client.ListFileResourcesAsync(new ListFileResourcesReq
{

});
```

**REQUEST PARAMETERS:**



**RETURN TYPE:**

*ListFileResourcesResp*

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

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

var resp = await client.ListFileResourcesAsync(new ListFileResourcesReq
{

});
```
