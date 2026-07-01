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

**RETURNS:**

*GetFlushAllStateResp*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
    .uri("http://localhost:19530")
    .token("root:Milvus")
    .build());

FlushAllResp flush = client.flushAll(FlushAllReq.builder()
    .databaseName("default")
    .build());
GetFlushAllStateResp state = client.getFlushAllState(GetFlushAllStateReq.builder()
    .databaseName("default")
    .flushAllTs(flush.getFlushAllTs())
    .build());
System.out.println(state.getFlushed());
```

<!-- category: Management; action: CREATE; addedSince: v3.0.x -->
