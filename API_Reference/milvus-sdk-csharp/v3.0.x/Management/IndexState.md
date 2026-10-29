# IndexState

The state of an index build.

```csharp
public enum IndexState
{
    None = 0,
    Unissued = 1,
    InProgress = 2,
    Finished = 3,
    Failed = 4,
    Retry = 5
}
```

**Constants:**

- **None** (0)

    The index does not exist.

- **Unissued** (1)

    The index build has not been issued.

- **InProgress** (2)

    The index build is in progress.

- **Finished** (3)

    The index build has finished.

- **Failed** (4)

    The index build failed.

- **Retry** (5)

    The index build is scheduled for a retry.
