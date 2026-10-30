# BulkInsertState

This is an enumeration that provides the following constants.

```python
class BulkInsertState:
    ImportPending = 0
    ImportFailed = 1
    ImportStarted = 2
    ImportPersisted = 5
    ImportCompleted = 6
    ImportFailedAndCleaned = 7
    ImportUnknownState = 100
```

**Constants:**

- **ImportPending** (0)

    Indicates that the bulk insert task is pending.

- **ImportFailed** (1)

    Indicates that the bulk insert task has failed.

- **ImportStarted** (2)

    Indicates that the bulk insert task has started.

- **ImportPersisted** (5)

    Indicates that the imported data has been persisted.

- **ImportCompleted** (6)

    Indicates that the bulk insert task has completed.

- **ImportFailedAndCleaned** (7)

    Indicates that the bulk insert task has failed and the related data has been cleaned up.

- **ImportUnknownState** (100)

    Indicates that the bulk insert task state is unknown.
