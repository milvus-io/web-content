# OptimizeAsync()

Optimizes a collection (rebuilding indexes and compacting segments).

```csharp
public async Task<OptimizeResp> OptimizeAsync(OptimizeReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new OptimizeReq
{
    CollectionName = "my_collection",
    TargetSizeInMB = 1024,
    WaitForCompletion = true
};

OptimizeResp result = await client.OptimizeAsync(request);
```

**REQUEST PARAMETERS:**

- `CollectionName` (*string*) -

    The name of the collection to optimize.

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `TargetSizeInMB` (*long?*) -

    An optional target segment size in MB for the compaction.

- `TargetSize` (*string?*) -

    An optional target segment size with a free-form unit (e.g. `"512MB"`, `"1GB"`). Mutually exclusive with `TargetSizeInMB`.

- `WaitForCompletion` (*bool*) -

    Whether to block until the optimization completes. Defaults to `true`.

- `TimeoutMilliseconds` (*long?*) -

    The timeout in milliseconds for waiting for the optimization to complete. Defaults to no timeout.

**RETURN TYPE:**

*Task\<OptimizeResp\>*

**RETURNS:**

An **OptimizeResp** object that contains the result of the optimization.

```csharp
OptimizeResp
    Status          // -> string
    CollectionName  // -> string
    CompactionId    // -> long?
    TargetSize      // -> string?
    Progress        // -> IReadOnlyList<string>
```

**PARAMETERS:**

- **Status** (*string*) -

    The overall result status; `"success"` when the optimization completed without error.

- **CollectionName** (*string*) -

    The name of the optimized collection (SDK-derived from the request).

- **CompactionId** (*long?*) -

    The ID of the compaction triggered by the optimization, or `null` if none was triggered.

- **TargetSize** (*string?*) -

    The target segment size used for the compaction, in MB.

- **Progress** (*IReadOnlyList\<string\>*) -

    The stages the optimization passed through, e.g. `waiting for indexes`, `compacting`, `waiting for compaction`, `refreshing load`.

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

OptimizeResp result = await client.OptimizeAsync(new OptimizeReq
{
    CollectionName = "my_collection",
    TargetSizeInMB = 1024
});

Console.WriteLine($"Optimize status: {result.Status}");
```
