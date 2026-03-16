# CompactionState

Enumerates the possible states of a compaction operation.

```go
type CompactionState commonpb
```

**VALUES:**

- **CompactionStateRunning** = CompactionState(commonpb.CompactionState_Executing)

      The compaction operation is currently executing.

- **CompactionStateCompleted** = CompactionState(commonpb.CompactionState_Completed)

      The compaction operation has completed.