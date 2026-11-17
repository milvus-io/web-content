# listRunningRequests()

This operation lists the Search, HybridSearch, and Query requests running on every proxy of the cluster. Use it to inspect the current load or to find a request to cancel.

```java
public ListRunningRequestsResp listRunningRequests(ListRunningRequestsReq request)
```

## Request Syntax

```java
listRunningRequests(ListRunningRequestsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .user(String user)
    .minElapsedMs(Long minElapsedMs)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The database name to match exactly. Empty means any database.

- `collectionName(String collectionName)`

    The collection name to match exactly. Empty means any collection.

- `user(String user)`

    The user whose requests to list. Empty means every user. A caller without the ListRunningRequests privilege may only see their own requests: empty then means the caller, and any other name is denied.

- `minElapsedMs(Long minElapsedMs)`

    The minimum time, in milliseconds, a request has been running. `0` means no constraint.

**RETURN TYPE:**

*ListRunningRequestsResp*

**RETURNS:**

A **ListRunningRequestsResp** object that contains the requests running on the proxies that answered. The call succeeds as long as at least one proxy answered; a proxy that did not answer is reported in `getNodeResults()`, and its requests are missing from the result.

- `getRequests()` (*List\<RunningRequestInfo\>*) -

    The requests running on the proxies that answered. Each **RunningRequestInfo** has the following getters:

    - `getRequestId()` (*String*) -

        The request id, an opaque string such as `"25-to03zu-rs"`. Pass it to `cancelRequests()` unchanged.

    - `getProxyId()` (*Long*) -

        The node id of the proxy that holds the request.

    - `getType()` (*String*) -

        The request type: `Search`, `HybridSearch`, or `Query`.

    - `getDatabaseName()` (*String*) -

        The name of the database.

    - `getCollectionName()` (*String*) -

        The name of the collection.

    - `getUser()` (*String*) -

        The user who issued the request.

    - `getClientAddr()` (*String*) -

        The client address seen by the proxy.

    - `getNq()` (*Long*) -

        The number of query vectors.

    - `getTopK()` (*Long*) -

        The top-k of the request.

    - `getExpr()` (*String*) -

        The leading part (at most 256 bytes) of the filter expression.

    - `getStartTimeMs()` (*Long*) -

        The time the request started, in milliseconds since the Unix epoch.

    - `getQueuedMs()` (*Long*) -

        How long the request's first task waited in the proxy queue, in milliseconds; `0` until that task starts.

    - `getElapsedMs()` (*Long*) -

        How long the request has been running, in milliseconds.

    - `getState()` (*String*) -

        The request state: `Queued`, `Running`, or `Canceling`.

    - `getTaskIds()` (*List\<Long\>*) -

        The ids of the proxy tasks the request has created.

    - `getTraceId()` (*String*) -

        The trace id of the request.

    - `getCancellable()` (*Boolean*) -

        Whether the request can be canceled.

- `getNodeResults()` (*List\<RunningRequestNodeResult\>*) -

    The outcome on each proxy. Each **RunningRequestNodeResult** has the following getters:

    - `getNodeId()` (*Long*) -

        The node id of the proxy.

    - `getErrorCode()` (*Integer*) -

        The error code of the proxy's answer; `0` means the proxy answered.

    - `getReason()` (*String*) -

        The error message when the proxy did not answer.

    - `getUnimplemented()` (*Boolean*) -

        Whether the proxy is too old to serve the call, as during a rolling upgrade. Such a proxy holds no listable requests.

    - `isSuccess()` (*boolean*) -

        Whether the proxy answered the call. Returns `true` when `getErrorCode()` is `0`.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.ListRunningRequestsReq;
import io.milvus.v2.service.utility.response.ListRunningRequestsResp;
import io.milvus.v2.service.utility.response.RunningRequestInfo;
import io.milvus.v2.service.utility.response.RunningRequestNodeResult;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. List the requests running on a collection
ListRunningRequestsResp resp = client.listRunningRequests(ListRunningRequestsReq.builder()
    .collectionName("my_collection")
    .build());

for (RunningRequestInfo info : resp.getRequests()) {
    System.out.printf("%s user=%s nq=%d state=%s elapsed=%dms%n",
            info.getRequestId(), info.getUser(), info.getNq(), info.getState(), info.getElapsedMs());
}
for (RunningRequestNodeResult node : resp.getNodeResults()) {
    if (!node.isSuccess()) {
        System.out.printf("proxy %d did not answer: %s%n", node.getNodeId(), node.getReason());
    }
}
```

<!-- category: Management; action: READ; addedSince: v3.0.x -->
