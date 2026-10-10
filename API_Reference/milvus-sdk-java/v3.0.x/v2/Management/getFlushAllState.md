# getFlushAllState()

This operation checks whether a previous flush-all action has finished. Use it when you call `flushAll` asynchronously and need to poll for completion.

```java
public GetFlushAllStateResp getFlushAllState(GetFlushAllStateReq request)
```

## Request Syntax

```java
getFlushAllState(GetFlushAllStateReq.builder()
    .databaseName(String databaseName)
    .flushAllTs(Long flushAllTs)
    .build());
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The database used when `flushAll` was called.

- `flushAllTs(Long flushAllTs)`

    The flush-all timestamp returned by `flushAll`.

**RETURN TYPE:**

*GetFlushAllStateResp*

**RETURNS:**

A **GetFlushAllStateResp** object that indicates whether the flush-all operation has completed.

- `getFlushed()` (*Boolean*) -

    Whether the flush-all operation has completed.

**EXCEPTIONS