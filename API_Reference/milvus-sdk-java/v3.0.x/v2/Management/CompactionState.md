# CompactionState

This enum represents the state of a compaction job as reported by the `getCompactionState()` API.

```java
class io.milvus.v2.common.CompactionState
```

**METHODS:**

- **getCode()** (*int*) -

    The numeric compaction-state code.

- **forNumber(int code)** (*CompactionState*) -

    Returns the canonical compaction state for the given numeric code. The proto enum spells the undefined value `UndefiedState`; this lookup maps it to `UndefinedState` so consumers comparing against the corrected constant always match. Throws an `IllegalArgumentException` if the code is unknown.

## VARIANTS

- **UndefinedState** (0) - The compaction state is undefined.

- **UndefiedState** (0) - **Deprecated.** A deprecated alias of `UndefinedState`, kept for backward compatibility. Use `UndefinedState` instead.

- **Executing** (1) - A compaction job is currently running.

- **Completed** (2) - A compaction job has completed.
