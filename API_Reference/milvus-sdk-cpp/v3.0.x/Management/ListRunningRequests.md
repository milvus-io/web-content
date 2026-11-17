# ListRunningRequests()

Lists the Search, HybridSearch, and Query requests currently running on every proxy.

The filters are combined with AND; an unset filter does not constrain the result. The call succeeds as long as at least one proxy answered; check `NodeResults()` on the response to tell a complete answer from a partial one.

```cpp
Status ListRunningRequests(const ListRunningRequestsRequest& request, ListRunningRequestsResponse& response)
```

## Request Syntax

```cpp
auto request = ListRunningRequestsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithUser(user)
    .WithMinElapsedMs(min_elapsed_ms);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name to match exactly; empty means any database.

- `SetDatabaseName(const std::string& db_name)`

    Set database name to match exactly; empty means any database.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection name to match exactly; empty means any collection.

- `SetCollectionName(const std::string& collection_name)`

    Set collection name to match exactly; empty means any collection.

- `WithUser(const std::string& user)`

    Sets the user whose requests to list; empty means every user. A caller without the `ListRunningRequests` privilege may only see their own requests: empty then means the caller, and any other name is denied.

- `SetUser(const std::string& user)`

    Set the user whose requests to list.

- `WithMinElapsedMs(int64_t min_elapsed_ms)`

    Sets the minimum time, in milliseconds, a request has been running; `0` means no constraint.

- `SetMinElapsedMs(int64_t min_elapsed_ms)`

    Set the minimum time, in milliseconds, a request has been running.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. The running requests and per-proxy outcomes are carried in the response object.

- **response** (*ListRunningRequestsResponse*) -

    - **Requests** (*const RunningRequestInfos&*) -

        The requests running on the proxies that answered. Each entry is a `RunningRequestInfo`; its members are documented on [RunningRequestInfo](RunningRequestInfo.md).

    - **NodeResults** (*const RunningRequestNodeResults&*) -

        The outcome on each proxy. Each entry is a `RunningRequestNodeResult`; its members are documented on [RunningRequestNodeResult](RunningRequestNodeResult.md).

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>

auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::ListRunningRequestsRequest()
    .WithCollectionName("demo")
    .WithMinElapsedMs(1000);
milvus::ListRunningRequestsResponse response;
status = client->ListRunningRequests(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (const auto& info : response.Requests()) {
    std::cout << "request " << info.RequestId() << " type "
              << info.Type() << " state " << info.State() << '\n';
}
```
