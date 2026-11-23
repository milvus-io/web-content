# CancelRequestsAsync()

Cancels running requests by the ids returned by `ListRunningRequestsAsync`.

Cancellation is asynchronous: a request in `Canceled` has been told to stop and does so at its next cancellation check, usually within milliseconds, then leaves the list. Until then `ListRunningRequestsAsync` shows it in state `Canceling`. Canceling the same id again before it has left is harmless.

```csharp
public async Task<CancelRequestsResp> CancelRequestsAsync(
    CancelRequestsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new CancelRequestsReq
{
    RequestIds = ["25-to03zu-rs", "26-pq4xabc-rt"],
    Reason = "long-running query"
};

CancelRequestsResp result = await client.CancelRequestsAsync(request);
```

**REQUEST PARAMETERS:**

- `RequestIds` (*IReadOnlyList\<string\>*) -

    The ids of the requests to cancel, exactly as returned by `ListRunningRequestsAsync`. Must not be empty; request ids are opaque strings such as `"25-to03zu-rs"`.

- `Reason` (*string*) -

    A free-text reason, recorded in the server's audit log and returned to the client whose request is canceled.

- `User` (*string*) -

    When set, only requests issued by this user are canceled; the ids of other users' requests are reported as not found. A caller without the `CancelRequests` privilege may only cancel their own requests: empty then means the caller, and any other name is denied.

**RETURN TYPE:**

*Task\<CancelRequestsResp\>*

**RETURNS:**

A **CancelRequestsResp** object that reports which of the requested ids were canceled, not found, or undetermined.

```csharp
CancelRequestsResp
    Canceled      // -> IReadOnlyList<RunningRequestInfo>
    NotFound      // -> IReadOnlyList<string>
    Undetermined  // -> IReadOnlyList<string>
    NodeResults   // -> IReadOnlyList<RunningRequestNodeResult>
```

**PARAMETERS:**

- **Canceled** (*IReadOnlyList\<RunningRequestInfo\>*) -

    One entry per canceled request, describing it as it was at the moment of cancellation: `ElapsedMs` is how long it had been running when it was stopped, and `State` is the state it was in before it was canceled (queued or running), or `Canceling` when this call repeated an earlier cancel. See [RunningRequestInfo](RunningRequestInfo.md).

- **NotFound** (*IReadOnlyList\<string\>*) -

    The ids that no proxy holds, known because every proxy answered: the request already finished, never existed, or (when `User` is set) was issued by another user. A proxy too old to serve this call counts as having answered, since it registers no requests. Empty whenever some proxy did not answer; those ids are reported in `Undetermined` instead.

- **Undetermined** (*IReadOnlyList\<string\>*) -

    The ids not canceled while some proxy did not answer (see `NodeResults`): the cancel is sent to every proxy, so each of these may be running on a proxy that was not reached, or may have finished. Retry the cancel, or list again, once that proxy is back.

- **NodeResults** (*IReadOnlyList\<RunningRequestNodeResult\>*) -

    The outcome on each proxy: one entry per proxy the call was sent to. A proxy that did not answer has a non-zero `RunningRequestNodeResult.ErrorCode`. See [RunningRequestNodeResult](RunningRequestNodeResult.md).

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. The client of a canceled Search/HybridSearch/Query request receives a `MilvusErrorCode.RequestCanceled` error carrying the operator's reason. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

ListRunningRequestsResp running = await client.ListRunningRequestsAsync(new ListRunningRequestsReq());

CancelRequestsResp result = await client.CancelRequestsAsync(new CancelRequestsReq
{
    RequestIds = running.Requests.Select(r => r.RequestId).ToArray(),
    Reason = "long-running query"
});

Console.WriteLine($"Canceled: {result.Canceled.Count}; not found: {result.NotFound.Count}; " +
    $"undetermined: {result.Undetermined.Count}");
```
