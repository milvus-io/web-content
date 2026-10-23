# FlushAsync()

Flushes the given collections, optionally waiting for the flush to complete.

```csharp
public async Task<FlushResp> FlushAsync(FlushReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new FlushReq
{
    CollectionNames = ["my_collection"],
    WaitFlushedMs = 60000
};

FlushResp result = await client.FlushAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionNames` (*IReadOnlyList\<string\>*) -

    The names of the collections to flush.

- `WaitFlushedMs` (*long*) -

    The maximum time in milliseconds to wait for the flush to complete. When zero (default), the flush waits forever until all segments are flushed. When greater than zero and the deadline elapses before all segments are flushed, `FlushAsync` throws `TimeoutException`.

**RETURN TYPE:**

*Task\<FlushResp\>*

**RETURNS:**

A **FlushResp** object that contains the flush results for the given collections.

```csharp
FlushResp
    DatabaseName     // -> string
    CollSegIDs       // -> IReadOnlyDictionary<string, IReadOnlyList<long>>
    FlushCollSegIDs  // -> IReadOnlyDictionary<string, IReadOnlyList<long>>
    CollSealTimes    // -> IReadOnlyDictionary<string, long>
    CollFlushTs      // -> IReadOnlyDictionary<string, ulong>
```

**PARAMETERS:**

- **DatabaseName** (*string*) -

    The database that contains the flushed collections.

- **CollSegIDs** (*IReadOnlyDictionary\<string, IReadOnlyList\<long\>\>*) -

    The segment IDs per collection.

- **FlushCollSegIDs** (*IReadOnlyDictionary\<string, IReadOnlyList\<long\>\>*) -

    The set of segments actually flushed by this flush, per collection.

- **CollSealTimes** (*IReadOnlyDictionary\<string, long\>*) -

    The physical seal time per collection, used by backup tooling.

- **CollFlushTs** (*IReadOnlyDictionary\<string, ulong\>*) -

    The hybrid timestamp per collection, used to poll the flush state.

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

FlushResp result = await client.FlushAsync(new FlushReq
{
    CollectionNames = ["my_collection"],
    WaitFlushedMs = 60000
});

Console.WriteLine($"Flushed segments for 'my_collection': {result.CollSegIDs["my_collection"].Count}");
```
