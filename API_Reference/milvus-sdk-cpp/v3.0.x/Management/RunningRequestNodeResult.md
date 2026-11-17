# RunningRequestNodeResult

This class describes the outcome of a `ListRunningRequests()` or `CancelRequests()` call on one proxy. Both calls are sent to every proxy; a proxy that did not answer contributed nothing to the result, and its requests are missing from it.

The `RunningRequestNodeResults` alias is `std::vector<RunningRequestNodeResult>`.

**METHODS:**

- `int64_t NodeId() const`

    The node id of the proxy.

- `int64_t ErrorCode() const`

    The error code of the proxy's answer; `0` means the proxy answered.

- `const std::string& Reason() const`

    The error message when the proxy did not answer.

- `bool Unimplemented() const`

    Whether the proxy is too old to serve the call, as during a rolling upgrade. Such a proxy holds no listable requests.

- `bool IsSuccess() const`

    Whether the proxy answered the call, i.e. the error code is `0`.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>
using namespace milvus;

// Inspect the per-proxy outcome returned by ListRunningRequests()
auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

ListRunningRequestsResponse response;
auto status = client->ListRunningRequests(ListRunningRequestsRequest(), response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& node : response.NodeResults()) {
    std::cout << "proxy " << node.NodeId()
              << " success=" << node.IsSuccess()
              << " error_code=" << node.ErrorCode() << std::endl;
}
```
