# RunningRequestInfo

This class describes one Search, HybridSearch, or Query request that a proxy is executing, as returned by `ListRunningRequests()` and `CancelRequests()`.

The `RunningRequestInfos` alias is `std::vector<RunningRequestInfo>`.

**METHODS:**

- `const std::string& RequestId() const`

    The request id, an opaque string such as `25-to03zu-rs`; pass it to `CancelRequests()` unchanged.

- `int64_t ProxyId() const`

    The node id of the proxy that holds the request.

- `const std::string& Type() const`

    The request type: `Search`, `HybridSearch`, or `Query`.

- `const std::string& DatabaseName() const`

    The database name.

- `const std::string& CollectionName() const`

    The collection name.

- `const std::string& User() const`

    The user who issued the request.

- `const std::string& ClientAddr() const`

    The client address seen by the proxy.

- `int64_t Nq() const`

    The number of query vectors.

- `int64_t TopK() const`

    The top-k of the request.

- `const std::string& Expr() const`

    The leading part (at most 256 bytes) of the filter expression.

- `int64_t StartTimeMs() const`

    The time the request started, in milliseconds since the Unix epoch.

- `int64_t QueuedMs() const`

    How long the request's first task waited in the proxy queue, in milliseconds; `0` until that task starts.

- `int64_t ElapsedMs() const`

    How long the request has been running, in milliseconds. In a `CancelRequests()` answer it is how long the request had been running when it was canceled.

- `const std::string& State() const`

    The request state: `Queued`, `Running`, or `Canceling`. In a `CancelRequests()` answer it is the state before the cancel, or `Canceling` when the call repeated an earlier cancel.

- `const std::vector<int64_t>& TaskIds() const`

    The ids of the proxy tasks the request has created.

- `const std::string& TraceId() const`

    The trace id of the request.

- `bool Cancellable() const`

    Whether the request can be canceled.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>
using namespace milvus;

// ListRunningRequests() returns one RunningRequestInfo per running request
auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

ListRunningRequestsResponse response;
auto status = client->ListRunningRequests(
    ListRunningRequestsRequest().WithMinElapsedMs(1000),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& info : response.Requests()) {
    std::cout << "request " << info.RequestId()
              << " type=" << info.Type()
              << " state=" << info.State()
              << " elapsed=" << info.ElapsedMs() << std::endl;
}
```
