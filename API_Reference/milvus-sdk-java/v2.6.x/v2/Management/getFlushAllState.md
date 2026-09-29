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
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.FlushAllReq;
import io.milvus.v2.service.utility.request.GetFlushAllStateReq;
import io.milvus.v2.service.utility.response.FlushAllResp;
import io.milvus.v2.service.utility.response.GetFlushAllStateResp;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

FlushAllResp flush = client.flushAll(FlushAllReq.builder()
        .databaseName("default")
        .build());
GetFlushAllStateResp state = client.getFlushAllState(GetFlushAllStateReq.builder()
        .databaseName("default")
        .flushAllTs(flush.getFlushAllTs())
        .build());
System.out.println(state.getFlushed());
```

## Related operations

- [flushAll()](flushAll.md)

- [flush()](flush.md)
