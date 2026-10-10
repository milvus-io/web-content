# flushAll()

This operation flushes insert buffers for all collections in a database. Use it before backup, verification, or workflows that require all recent writes to be persisted.

```java
public FlushAllResp flushAll(FlushAllReq request)
```

## Request Syntax

```java
flushAll(FlushAllReq.builder()
    .databaseName(String databaseName)
    .waitFlushedTimeoutMs(Long waitFlushedTimeoutMs)
    .build());
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The database whose collections should be flushed. Omit it to use the current database context.

- `waitFlushedTimeoutMs(Long waitFlushedTimeoutMs)`

    How long to wait for the flush-all operation to finish. Values greater than zero enable synchronous waiting.

**RETURN TYPE:**

*FlushAllResp*

**RETURNS:**

A **FlushAllResp** object that contains the flush-all timestamp.

- `getFlushAllTs()` (*Long*) -

    The timestamp of the flush-all operation.

**EXCEPTIONS