# CompactionState

This enum represents the state of a compaction task, as returned in each plan of `getCompactionPlans()`.

```java
class io.milvus.v2.common.CompactionState
```

**METHODS:**

- **getCode()** (*int*) -

    The numeric compaction state code.

## VARIANTS

- **UndefiedState** (0) - The compaction state is undefined. (The spelling matches the SDK source, where this constant name contains a typo.)

- **Executing** (1) - A compaction task is currently running.

- **Completed** (2) - A compaction task has completed.

## Example

```java
resp.getPlans().forEach(plan ->
    System.out.println(plan.getState() == CompactionState.Completed ? "done" : "in progress"));
```
