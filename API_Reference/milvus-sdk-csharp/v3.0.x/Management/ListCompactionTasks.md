# ListCompactionTasks

Lists the compaction tasks of a collection.

```csharp
public async Task<GetCompactionPlansResp> ListCompactionTasksAsync(ListCompactionTasksReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListCompactionTasksReq
{

};

var resp = await client.ListCompactionTasksAsync(new ListCompactionTasksReq
{

});
```

**REQUEST PARAMETERS:**



**RETURN TYPE:**

*GetCompactionPlansResp*

**RETURNS:**

A **GetCompactionPlansResp** object returned by the operation.
## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Management;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

var resp = await client.ListCompactionTasksAsync(new ListCompactionTasksReq
{

});
```
