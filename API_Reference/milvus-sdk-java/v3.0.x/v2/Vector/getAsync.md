# getAsync()

Gets specific entities by their IDs asynchronously and returns a future.

```java
public CompletableFuture<GetResp> getAsync(GetReq request)
```

This method uses the same request parameters as `get()` but returns a `CompletableFuture<GetResp>` immediately. Use the returned future to consume the result or handle the exceptional completion when the operation fails.

## Request Syntax

```java
CompletableFuture<GetResp> future = client.getAsync(GetReq.builder()
    .collectionName(String collectionName)
    .ids(List<Object> ids)
    .build());
```

For the full list of `GetReq` builder methods, refer to [get()](get.md).

**RETURNS:**

*CompletableFuture\<GetResp\>*

A future completed with a `GetResp`, or completed exceptionally when the operation fails.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when request validation, transport, or server execution fails.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.GetReq;
import io.milvus.v2.service.vector.response.GetResp;

import java.util.Collections;
import java.util.concurrent.CompletableFuture;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

CompletableFuture<GetResp> future = client.getAsync(GetReq.builder()
        .collectionName("my_collection")
        .ids(Collections.singletonList("0"))
        .build());
GetResp response = future.get();
```
