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

**RETURNS:**

*FlushAllResp*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
    .uri("http://localhost:19530")
    .token("root:Milvus")
    .build());

FlushAllResp resp = client.flushAll(FlushAllReq.builder()
    .databaseName("default")
    .waitFlushedTimeoutMs(60000L)
    .build());
System.out.println(resp.getFlushAllTs());
```

<!-- category: Management; action: CREATE; addedSince: v3.0.x -->
