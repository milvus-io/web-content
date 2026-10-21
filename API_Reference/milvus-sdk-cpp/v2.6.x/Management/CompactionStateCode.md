# CompactionStateCode

This enum describes the state of a compaction job returned by `GetCompactionState()`.

```cpp
enum class CompactionStateCode {
    UNKNOWN = 0,
    EXECUTING = 1,
    COMPLETED = 2,
};
```

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
