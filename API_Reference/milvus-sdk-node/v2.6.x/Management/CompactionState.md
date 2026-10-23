# CompactionState

This enum represents the state of a compaction task. Note that `UndefiedState` is spelled as-is in the SDK source.

```typescript
export enum CompactionState {
  UndefiedState = 0,
  Executing = 1,
  Completed = 2,
}

```

**FIELDS:**

- **UndefiedState** (CompactionState)

    The compaction state is undefined (spelling as in the SDK source).

- **Executing** (CompactionState)

    A compaction task is currently running.

- **Completed** (CompactionState)

    The compaction task has completed.
