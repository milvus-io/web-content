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

A **ListFileResourcesResp** object returned by the operation.
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
