# GetCompactionState()

This operation gets the status of a compaction job.

```cpp
Status GetCompactionState(const GetCompactionStateRequest& request, GetCompactionStateResponse& response)
```

## Request Syntax

```cpp
auto request = GetCompactionStateRequest()
    .WithCompactionID(id);
```

**REQUEST METHODS:**

- `WithCompactionID(int64_t id)`

    Sets the compaction job ID returned by `Compact()`.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. The compaction state is carried in the response object.

- **response** (*GetCompactionStateResponse*) -

    - **State** (*const CompactionState&*) -

        Get state of the compaction.

        - **CompletedPlan** (*int64_t*) -

            Number of completed plans.

        - **ExecutingPlan** (*int64_t*) -

            Executing plan ID.

        - **FailedPlan** (*int64_t*) -

            Number of failed plans.

        - **State** (*CompactionStateCode*) -

            Compaction state code.
            See [CompactionStateCode](CompactionStateCode.md).

        - **TimeoutPlan** (*int64_t*) -

            Number of timeout plans.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

int64_t compaction_id = 12345;  // obtained from Compact()

milvus::GetCompactionStateResponse response;
status = client->GetCompactionState(
    milvus::GetCompactionStateRequest()
        .WithCompactionID(compaction_id),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "State: " << static_cast<int>(response.State().State()) << std::endl;
```
