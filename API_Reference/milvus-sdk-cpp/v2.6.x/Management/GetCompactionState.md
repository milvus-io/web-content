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

*Status*

Returns a Status indicating whether the operation succeeded. On success, the GetCompactionStateResponse carries the state of the compaction job.

- **response** (*GetCompactionStateResponse*) -

    - **State** (*const CompactionState&*) -

        Get state of the compaction.

        - **State** (***CompactionStateCode***) -

            Compaction state code.

        - **ExecutingPlan** (*int64_t*) -

            The executing plan id.

        - **TimeoutPlan** (*int64_t*) -

            The number of timeout plans.

        - **CompletedPlan** (*int64_t*) -

            The number of completed plans.

        - **FailedPlan** (*int64_t*) -

            The number of failed plans.


CompactionStateCode members:

**VALUES:**

- **UNKNOWN** (0) - The compaction state is unknown.

- **EXECUTING** (1) - The compaction job is executing.

- **COMPLETED** (2) - The compaction job completed.

## Example

```cpp
#include <milvus/types/CompactionState.h>
using namespace milvus;

auto state = response.State().State();
if (state == CompactionStateCode::COMPLETED) {
    // Handle the completed compaction.
}
```

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

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
