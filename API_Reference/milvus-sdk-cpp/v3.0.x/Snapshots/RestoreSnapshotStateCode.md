# RestoreSnapshotStateCode

This enum describes the state of a snapshot restore job.

```cpp
enum class RestoreSnapshotStateCode {
    UNKNOWN = 0,
    PENDING = 1,
    EXECUTING = 2,
    COMPLETED = 3,
    FAILED = 4,
};
```

**VALUES:**

- **UNKNOWN** (0) - The restore job state is unknown.

- **PENDING** (1) - The restore job is pending.

- **EXECUTING** (2) - The restore job is running.

- **COMPLETED** (3) - The restore job completed.

- **FAILED** (4) - The restore job failed.

## Example

```cpp
#include <milvus/types/RestoreSnapshotState.h>
using namespace milvus;

if (job.State() == RestoreSnapshotStateCode::COMPLETED) {
    // The snapshot restore completed.
}
```
