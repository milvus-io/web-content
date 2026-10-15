# GetCompactionPlans()

This operation fetches the current state and merge plans of a compaction job on a collection. Pass the compaction job ID returned by Compact().

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

    Sets the ID of the compaction job to query, which is returned by Compact().

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The compaction state and merge plans are carried in the response: call Plans() to get the list of plans, each mapping its source segments to the merged target segment, and State() for the CompactionStateCode.

- **response** (*GetCompactionPlansResponse*) -

    - **Plans** (*const CompactionPlans&*) -

        Get plans of the compaction.

        - **SourceSegments** (*const std::vector<int64_t>&*) -

            Segment id array to be merged.

        - **DestinySegemnt** (*int64_t*) -

            New generated segment id after merging.

    - **CompactionID** (*int64_t*) -

        Get the id of the compaction.

    - **State** (*CompactionStateCode*) -

        Get the state of the compaction.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Call GetCompactionPlans() on a connected MilvusClientV2 to fetch the state and merge plans of a compaction job.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

int64_t compaction_id = 448702239994542855;

auto request = milvus::GetCompactionPlansRequest().WithCompactionID(compaction_id);
milvus::GetCompactionPlansResponse response;
status = client->GetCompactionPlans(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::cout << "compaction state: " << static_cast<int>(response.State()) << std::endl;
for (const auto& plan : response.Plans()) {
    std::cout << "plan merges " << plan.SourceSegments().size() << " segments into segment "
              << plan.DestinySegemnt() << std::endl;
}
```
