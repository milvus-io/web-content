# ImportState

Represents the state of an import task.

```csharp
public enum ImportState
{
    Pending = 0,
    Failed = 1,
    Started = 2,
    Persisted = 5,
    Completed = 6,
    FailedAndCleaned = 7,
    Flushed = 8
}
```

**VALUES:**

- **Pending** (0) - The import task is pending.

- **Failed** (1) - The import task has failed.

- **Started** (2) - The import task has started.

- **Persisted** (5) - The imported data has been persisted.

- **Completed** (6) - The import task has completed.

- **FailedAndCleaned** (7) - The import task failed and the imported data has been cleaned up.

- **Flushed** (8) - The imported data has been flushed.
