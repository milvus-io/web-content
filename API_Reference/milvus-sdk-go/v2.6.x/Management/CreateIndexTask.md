# CreateIndexTask

An async task returned by CreateIndex. Call Await() to block until the index build completes.

```go
type CreateIndexTask struct {
}
```

**METHODS:**

- `Await(ctx context.Context) error`

    Blocks until the async operation completes or the context is cancelled. Returns an error if the operation fails.