# IndexStateCode

This enum describes the build state of an index.

```cpp
enum class IndexStateCode {
    NONE = 0,
    UNISSUED = 1,
    IN_PROGRESS = 2,
    FINISHED = 3,
    FAILED = 4,
    RETRY = 5,
};
```

**VALUES:**

- **NONE** (0) - No index state is available.

- **UNISSUED** (1) - The index-building task has not been issued.

- **IN_PROGRESS** (2) - The index is being built.

- **FINISHED** (3) - The index build completed successfully.

- **FAILED** (4) - The index build failed.

- **RETRY** (5) - The index build is waiting to be retried.

## Example

```cpp
#include <milvus/types/IndexState.h>
using namespace milvus;

if (index_desc.StateCode() == IndexStateCode::FINISHED) {
    // The index is ready to load.
}
```
