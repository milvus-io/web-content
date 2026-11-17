# cancelRequests()

This operation cancels running requests by the ids returned by `listRunningRequests()`. Cancellation is asynchronous: a canceled request stops at its next cancellation check, usually within milliseconds.

```java
public CancelRequestsResp cancelRequests(CancelRequestsReq request)
```

## Request Syntax

```java
cancelRequests(CancelRequestsReq.builder()
    .requestIds(List<String> requestIds)
    .reason(String reason)
    .user(String user)
    .build()
)
```

**BUILDER METHODS:**

- `requestIds(List<String> requestIds)`

    The ids of the requests to cancel, exactly as returned by `listRunningRequests()`. Must not be empty.

- `reason(String reason)`

    A free-text reason, recorded in the server's audit log and returned to the client whose request is canceled.

- `user(String user)`

    When set, only requests issued by this user are canceled; the ids of other users' requests are reported as not found. A caller without the CancelRequests privilege may only cancel their own requests: empty then means the caller, and any other name is denied.

**RETURN TYPE:**

*CancelRequestsResp*

**RETURNS:**

A **CancelRequestsResp** object that contains the canceled requests, the ids not found or not settled, and the outcome on each proxy. Every requested id is in exactly one of `getCanceled()`, `getNotFound()`, and `getUndetermined()`.

- `getCanceled()` (*List\<RunningRequestInfo\>*) -

    The canceled requests, each as it was at the moment it was canceled. Each **RunningRequestInfo** has the same getters as the entries returned by `listRunningRequests()` (see [RunningRequestInfo](listRunningRequests.md)), except that `getElapsedMs()` is how long the request had been running when it was canceled and `getState()` is the state before the cancel, or `Canceling` when the call repeated an earlier cancel.

- `getNotFound()` (*List\<String\>*) -

    The ids no proxy holds, known because every proxy answered: the request already finished, never existed, or was issued by another user.

- `getUndetermined()` (*List\<String\>*) -

    The ids not canceled while some proxy did not answer: each may be running on that proxy or may have finished. Retry the cancel, or list again, once the proxy is back.

- `getNodeResults()` (*List\<RunningRequestNodeResult\>*) -

    The outcome on each proxy. Each **RunningRequestNodeResult** has the following getters:

    - `getNodeId()` (*Long*) -

        The node id of the proxy.

    - `getErrorCode()` (*Integer*) -

        The error code of the proxy's answer; `0` means the proxy answered.

    - `getReason()` (*String*) -

        The error message when the proxy did not answer.

    - `getUnimplemented()` (*Boolean*) -

        Whether the proxy is too old to serve the call, as during a rolling upgrade.

    - `isSuccess()` (*boolean*) -

        Whether the proxy answered the call. Returns `true` when `getErrorCode()` is `0`.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation, including when the request id list is empty.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.CancelRequestsReq;
import io.milvus.v2.service.utility.request.ListRunningRequestsReq;
import io.milvus.v2.service.utility.response.CancelRequestsResp;
import io.milvus.v2.service.utility.response.ListRunningRequestsResp;
import io.milvus.v2.service.utility.response.RunningRequestInfo;

import java.util.Collections;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Find a running request by collection, then cancel it by id
ListRunningRequestsResp listed = client.listRunningRequests(ListRunningRequestsReq.builder()
    .collectionName("my_collection")
    .build());

for (RunningRequestInfo info : listed.getRequests()) {
    CancelRequestsResp canceled = client.cancelRequests(CancelRequestsReq.builder()
        .requestIds(Collections.singletonList(info.getRequestId()))
        .reason("canceled by application")
        .build());
    for (RunningRequestInfo item : canceled.getCanceled()) {
        System.out.printf("canceled %s%n", item.getRequestId());
    }
}
```

<!-- category: Management; action: DELETE; addedSince: v3.0.x -->
