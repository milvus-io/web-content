# GetCompactionPlans()

This operation returns the plans of a compaction job.

```cpp
Status GetCompactionPlans(const GetCompactionPlansRequest& request, GetCompactionPlansResponse& response)
```

## Request Syntax

```cpp
auto request = GetCompactionPlansRequest()
    .WithCompactionID(id);
```

**REQUEST METHODS:**

- `WithCompactionID(int64_t id)`

    Sets the compaction job ID returned by `Compact()`.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. On success, the GetCompactionPlansResponse carries the plans of the compaction job.

- **response** (*GetCompactionPlansResponse*) -

    - **Plans** (*const std::vector<CompactionPlan>&*) -

        Get plans of the compaction.

        - **SourceSegments** (*const std::vector<int64_t>&*) -

            Segment id array to be merged.

        - **DestinySegemnt** (*int64_t*) -

            New generated segment id after merging.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details. See [StatusCode](../Client/StatusCode.md).

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

milvus::GetCompactionPlansResponse response;
status = client->GetCompactionPlans(
    milvus::GetCompactionPlansRequest()
        .WithCompactionID(compaction_id),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Plan count: " << response.Plans().size() << std::endl;
```
