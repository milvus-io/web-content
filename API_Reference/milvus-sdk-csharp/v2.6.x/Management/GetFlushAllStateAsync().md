# GetFlushAllStateAsync()

Gets the state of a flush-all operation.

```csharp
public async Task<GetFlushAllStateResp> GetFlushAllStateAsync(
    GetFlushAllStateReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetFlushAllStateReq
{
    FlushAllTimestamp = 450357031542
};

GetFlushAllStateResp result = await client.GetFlushAllStateAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `FlushAllTimestamp` (*ulong*) -

    The timestamp returned by the flush-all operation, identifying the flush to wait for.

- `FlushAllTss` (*IReadOnlyDictionary\<string, ulong\>?*) -

    Per-pchannel flush timestamps returned by a flush-all operation (proto `flush_all_tss`, field 5). When provided, the server verifies the flush per physical channel rather than via the deprecated global `FlushAllTimestamp`.

**RETURN TYPE:**

*Task\<GetFlushAllStateResp\>*

**RETURNS:**

A **GetFlushAllStateResp** object that indicates whether the flush-all operation has completed.

```csharp
GetFlushAllStateResp
    Flushed  // -> bool
```

**PARAMETERS:**

- **Flushed** (*bool*) -

    Whether the flush-all operation has completed.

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

GetFlushAllStateResp result = await client.GetFlushAllStateAsync(new GetFlushAllStateReq
{
    FlushAllTimestamp = 450357031542
});

Console.WriteLine($"Flushed: {result.Flushed}");
```
