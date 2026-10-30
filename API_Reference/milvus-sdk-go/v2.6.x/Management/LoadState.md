# LoadState

Represents the load state of a collection or partition, including progress percentage.

```go
type LoadState struct {
    State LoadStateCode
    Progress int64
}
```

**PARAMETERS:**

- **State** (*LoadStateCode*)

    The current load state of the collection or partitions.

    **Constants:**

    - **LoadStateLoading**

        The collection or partitions are being loaded.

    - **LoadStateLoaded**

        The collection or partitions have been fully loaded.

    - **LoadStateUnloading**

        The collection or partitions are being released.

    - **LoadStateNotLoad**

        The collection or partitions are not loaded.

- **Progress** (*int64*)

    The progress percentage.