
# BulkInsertState

This is an enumeration that provides the following constants.

## Constants

- __ImportPending__ = 0

    Indicates that the bulk-insert task is pending.

- __ImportFailed__ = 1

    Indicates that the bulk-insert task failed.

- __ImportStarted__ = 2

    Indicates that the bulk-insert task has started.

- __ImportPersisted__ = 5

    Indicates that the bulk-insert task has been persisted.

- __ImportCompleted__ = 6

    Indicates that the bulk-insert task is completed.

- __ImportFailedAndCleaned__ = 7

    Indicates that the bulk-insert task failed with data cleaned.

- __ImportUnknownState__ = 100

    Indicates that the bulk-insert task is in an unknown state.