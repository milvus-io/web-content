# getLoadStateV2()

This operation gets detailed load-state information for a collection or partition. Use it when you need both the current load state and loading progress.

```java
public GetLoadStateResp getLoadStateV2(GetLoadStateReq request)
```

## Request Syntax

```java
getLoadStateV2(GetLoadStateReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .build());
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The database that contains the collection.

- `collectionName(String collectionName)`

    The collection whose load state is inspected.

- `partitionName(String partitionName)`

    An optional partition name. Omit it to inspect the collection-level load state.

**RETURNS:**

*GetLoadStateResp*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.GetLoadStateReq;
import io.milvus.v2.service.collection.response.GetLoadStateResp;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

GetLoadStateResp resp = client.getLoadStateV2(GetLoadStateReq.builder()
        .collectionName("book")
        .build());
System.out.println(resp.getState());
System.out.println(resp.getProgress());
```

## Related operations

- [getLoadState()](../Management/getLoadState.md)

- [loadCollection()](../Management/loadCollection.md)
