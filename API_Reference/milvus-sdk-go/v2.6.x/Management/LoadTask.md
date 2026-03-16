# LoadTask

An async task returned by LoadCollection/LoadPartitions. Call Await() to block until loading completes.

```go
type LoadTask struct {
}
```

**METHODS:**

- `Await(ctx context.Context) error`

    Blocks until the async operation completes or the context is cancelled. Returns an error if the operation fails.