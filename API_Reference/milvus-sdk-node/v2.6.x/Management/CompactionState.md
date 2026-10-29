# CompactionState

Represents the state of a compaction task.

```typescript
export enum CompactionState {
  UndefiedState = 0,
  Executing = 1,
  Completed = 2,
}
```

**Constants:**

- **UndefiedState** (0)

    The compaction state is undefined (spelling as in the SDK source).

- **Executing** (1)

    A compaction task is currently running.

- **Completed** (2)

    The compaction task has completed.
