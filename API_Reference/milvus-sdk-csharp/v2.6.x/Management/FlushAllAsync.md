# FlushAllAsync()

Flushes all collections.

```csharp
public async Task<FlushAllResp> FlushAllAsync(FlushAllReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new FlushAllReq
{
    WaitFlushedMs = 60000
};

FlushAllResp result = await client.FlushAllAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `WaitFlushedMs` (*int*) -

    When greater than zero, `FlushAllAsync` waits for the flush-all operation to complete by polling `GetFlushAllStateAsync` for up to this many milliseconds, throwing on timeout. When zero (default), the RPC returns immediately.

**RETURN TYPE:**

*Task\<FlushAllResp\>*

**RETURNS:**

A **FlushAllResp** object that identifies the flush-all operation.

```csharp
FlushAllResp
    FlushAllTimestamp  // -> ulong
    FlushAllTss        // -> IReadOnlyDictionary<string, ulong>?
```

**PARAMETERS:**

- **FlushAllTimestamp** (*ulong*) -

    The timestamp identifying the flush-all operation, used to poll its state.

- **FlushAllTss** (*IReadOnlyDictionary\<string, ulong\>?*) -

    The per-pchannel flush timestamps reported by the flush-all operation, or `null` when the server did not report them (or reported a channel without a timestamp).

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

FlushAllResp result = await client.FlushAllAsync(new FlushAllReq
{
    WaitFlushedMs = 60000
});

Console.WriteLine($"Flush-all timestamp: {result.FlushAllTimestamp}");
```
