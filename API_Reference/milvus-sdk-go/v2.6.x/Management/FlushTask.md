# FlushTask

An async task returned by Flush. Call Await() to block until flushing completes.

```go
type FlushTask struct {
}
```

**METHODS:**

- `Await(ctx context.Context) error`

      Blocks until the async operation completes or the context is cancelled. Returns an error if the operation fails.

- `GetFlushStats() segIDs []int64, flushSegIDs []int64, flushTs uint64, channelCheckpoints map[string]*msgpb.MsgPosition`

      Returns flush statistics including segment IDs and flush timestamp.