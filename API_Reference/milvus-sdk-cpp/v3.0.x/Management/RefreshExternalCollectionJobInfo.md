# RefreshExternalCollectionJobInfo

This class holds the information of an external collection refresh job, as returned by `ListRefreshExternalCollectionJobs()` and `GetRefreshExternalCollectionProgress()`. Each field has a corresponding `Set*()` setter.

**METHODS:**

- `int64_t JobID() const`

    The refresh job identifier.

- `const std::string& CollectionName() const`

    The name of the collection being refreshed.

- `RefreshExternalCollectionStateCode State() const`

    The current state of the refresh job. See [RefreshExternalCollectionStateCode](RefreshExternalCollectionStateCode.md).

- `int32_t Progress() const`

    The refresh progress in percent (0 to 100).

- `const std::string& Reason() const`

    The failure reason of the refresh job, empty when the job has not failed.

- `const std::string& ExternalSource() const`

    The external data source, e.g. an S3 path.

- `uint64_t StartTime() const`

    The start timestamp of the refresh job.

- `uint64_t EndTime() const`

    The end timestamp of the refresh job.

- `const nlohmann::json& ExternalSpec() const`

    The external specification of the collection.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>
using namespace milvus;

// ListRefreshExternalCollectionJobs() returns one job-info object per job
auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

ListRefreshExternalCollectionJobsResponse response;
auto status = client->ListRefreshExternalCollectionJobs(
    ListRefreshExternalCollectionJobsRequest().WithCollectionName("my_collection"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& job : response.Jobs()) {
    std::cout << "job " << job.JobID()
              << " state=" << static_cast<int>(job.State())
              << " progress=" << job.Progress() << std::endl;
}
```
