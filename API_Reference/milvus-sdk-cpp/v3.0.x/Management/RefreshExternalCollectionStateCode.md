# RefreshExternalCollectionStateCode

This enum describes the state of an external collection refresh job.

```cpp
enum class RefreshExternalCollectionStateCode {
    PENDING = 0,
    IN_PROGRESS = 1,
    COMPLETED = 2,
    FAILED = 3,
};
```

**VALUES:**

- **PENDING** (0) - The refresh job is pending.

- **IN_PROGRESS** (1) - The refresh job is running.

- **COMPLETED** (2) - The refresh job completed.

- **FAILED** (3) - The refresh job failed.

## Example

```cpp
#include <milvus/types/RefreshExternalCollectionState.h>
using namespace milvus;

if (job.State() == RefreshExternalCollectionStateCode::COMPLETED) {
    // The external collection refresh completed.
}
```
