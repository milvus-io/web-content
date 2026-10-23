# GetFlushStateAsync()

Checks whether the given segments have been flushed.

```csharp
public async Task<GetFlushStateResp> GetFlushStateAsync(
    GetFlushStateReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetFlushStateReq
{
    CollectionName = "my_collection",
    SegmentIds = [450357031542],
    FlushTs = 0
};

GetFlushStateResp result = await client.GetFlushStateAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `SegmentIds` (*IReadOnlyList\<long\>*) -

    The segment IDs to check.

- `CollectionName` (*string*) -

    The collection name the segments belong to.

- `FlushTs` (*ulong*) -

    The hybrid flush timestamp of the collection, from `FlushResp.CollFlushTs`. When set, the datacoord waits for the WAL channel checkpoint to catch up before reporting flushed; passing 0 skips that gate.

**RETURN TYPE:**

*Task\<GetFlushStateResp\>*

**RETURNS:**

A **GetFlushStateResp** object that indicates whether the given segments have been flushed.

```csharp
GetFlushStateResp
    Flushed  // -> bool
```

**PARAMETERS:**

- **Flushed** (*bool*) -

    Whether all the checked segments have been flushed.

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

GetFlushStateResp result = await client.GetFlushStateAsync(new GetFlushStateReq
{
    CollectionName = "my_collection",
    SegmentIds = [450357031542]
});

Console.WriteLine($"Flushed: {result.Flushed}");
```
