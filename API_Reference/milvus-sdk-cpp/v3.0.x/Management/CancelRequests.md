# CancelRequests()

Cancels running requests by the ids returned by `ListRunningRequests()`.

An empty request id list is rejected with an invalid-argument status. Every requested id is in exactly one of `Canceled()`, `NotFound()`, and `Undetermined()` in the response. Cancellation is asynchronous: a canceled request stops at its next cancellation check, usually within milliseconds, and until then `ListRunningRequests()` shows it in state `Canceling`.

```cpp
Status CancelRequests(const CancelRequestsRequest& request, CancelRequestsResponse& response)
```

## Request Syntax

```cpp
auto request = CancelRequestsRequest()
    .WithRequestIds(request_ids)
    .AddRequestId(request_id)
    .WithReason(reason)
    .WithUser(user);
```

**REQUEST METHODS:**

- `WithRequestIds(std::vector<std::string>&& request_ids)`

    Sets the ids of the requests to cancel, exactly as returned by `ListRunningRequests()`; must not be empty.

- `SetRequestIds(const std::vector<std::string>& request_ids)`

    Set the ids of the requests to cancel.

- `SetRequestIds(std::vector<std::string>&& request_ids)`

    Set the ids of the requests to cancel.

- `AddRequestId(const std::string& request_id)`

    Adds a request id to cancel.

- `WithReason(const std::string& reason)`

    Sets a free-text reason, recorded in the server's audit log and returned to the client whose request is canceled.

- `SetReason(const std::string& reason)`

    Set the cancellation reason.

- `WithUser(const std::string& user)`

    Sets the user whose requests are canceled. When set, only requests issued by this user are canceled; the ids of other users' requests are reported as not found. A caller without the `CancelRequests` privilege may only cancel their own requests: empty then means the caller, and any other name is denied.

- `SetUser(const std::string& user)`

    Set the user whose requests are canceled.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. The cancellation outcome is carried in the response object.

- **response** (*CancelRequestsResponse*) -

    - **Canceled** (*const RunningRequestInfos&*) -

        The canceled requests, each as it was at the moment it was canceled. Each entry is a `RunningRequestInfo`; its members are documented on [RunningRequestInfo](RunningRequestInfo.md).

    - **NotFound** (*const std::vector<std::string>&*) -

        The ids no proxy holds, known because every proxy answered: the request already finished, never existed, or was issued by another user.

    - **Undetermined** (*const std::vector<std::string>&*) -

        The ids not canceled while some proxy did not answer: each may be running on that proxy or may have finished. Retry the cancel, or list again, once the proxy is back.

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

milvus::ListRunningRequestsResponse running;
status = client->ListRunningRequests(milvus::ListRunningRequestsRequest(), running);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::vector<std::string> ids;
for (const auto& info : running.Requests()) {
    ids.push_back(info.RequestId());
}

auto request = milvus::CancelRequestsRequest()
    .WithRequestIds(std::move(ids))
    .WithReason("canceled by the administrator");
milvus::CancelRequestsResponse response;
status = client->CancelRequests(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::cout << "canceled: " << response.Canceled().size()
          << " not found: " << response.NotFound().size()
          << " undetermined: " << response.Undetermined().size() << '\n';
```
