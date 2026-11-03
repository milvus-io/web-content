# RestoreSnapshotJobInfo

This class holds the information of a snapshot restore job, as returned by `ListRestoreSnapshotJobs()` and `GetRestoreSnapshotState()`. Each field has a corresponding `Set*()` setter.

**METHODS:**

- `int64_t JobID() const`

    The restore job identifier.

- `const std::string& SnapshotName() const`

    The name of the snapshot being restored.

- `const std::string& DatabaseName() const`

    The name of the database the snapshot belongs to.

- `const std::string& CollectionName() const`

    The name of the collection being restored.

- `RestoreSnapshotStateCode State() const`

    The current state of the restore job. See [RestoreSnapshotStateCode](RestoreSnapshotStateCode.md).

- `int32_t Progress() const`

    The restore progress in percent (0 to 100).

- `const std::string& Reason() const`

    The failure reason of the restore job, empty when the job has not failed.

- `uint64_t StartTime() const`

    The start timestamp of the restore job.

- `uint64_t TimeCost() const`

    The elapsed time of the restore job.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>
using namespace milvus;

// ListRestoreSnapshotJobs() returns one job-info object per restore job
auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

ListRestoreSnapshotJobsResponse response;
auto status = client->ListRestoreSnapshotJobs(
    ListRestoreSnapshotJobsRequest().WithCollectionName("my_collection"),
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
