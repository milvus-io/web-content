# CompactionState

Represents the state of a compaction job returned by `getCompactionState()` and `getCompactionPlans()`.

```java
public enum CompactionState
```

**METHODS:**

- `getCode()` (*int*) -

    Returns the numeric compaction-state code.

- **forNumber(int code)** (*CompactionState*) -

    Returns the `CompactionState` constant whose code matches the given value. The proto enum historically spells the undefined value `UndefiedState`; this lookup maps it to `UndefinedState` so consumers comparing against the corrected constant always match. Throws an `IllegalArgumentException` if no constant matches.

**Constants:**

- **UndefinedState** (0)

    The compaction state is undefined.

- **UndefiedState** (0)

    **Deprecated.** A backward-compatible alias of `UndefinedState`. Use `UndefinedState` instead.

- **Executing** (1)

    The compaction job is currently running.

- **Completed** (2)

    The compaction job has completed.
