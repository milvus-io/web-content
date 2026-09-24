# RefreshExternalCollectionState

Enumerates the possible states of a refresh external collection job.

```go
type RefreshExternalCollectionState milvuspb.RefreshExternalCollectionState
```

**VALUES:**

- **RefreshStatePending** = RefreshExternalCollectionState(RefreshExternalCollectionState_RefreshPending)

    The refresh job is pending.

- **RefreshStateInProgress** = RefreshExternalCollectionState(RefreshExternalCollectionState_RefreshInProgress)

    The refresh job is in progress.

- **RefreshStateCompleted** = RefreshExternalCollectionState(RefreshExternalCollectionState_RefreshCompleted)

    The refresh job has completed.

- **RefreshStateFailed** = RefreshExternalCollectionState(RefreshExternalCollectionState_RefreshFailed)

    The refresh job has failed.

**METHODS:**

- `String() string`

    Returns the string representation of the state.
