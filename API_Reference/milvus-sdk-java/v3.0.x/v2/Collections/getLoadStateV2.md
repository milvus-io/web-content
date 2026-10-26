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

**RETURN TYPE:**

*GetLoadStateResp*

**RETURNS:**

A **GetLoadStateResp** object that indicates the load state of the collection. When the collection or partition does not exist, the response reports `LoadStateNotExist` instead of raising an exception.

- `getState()` (*LoadState*) -

    The load state of the collection.

- `getStateName()` (*String*) -

    The name of the load state, or `null` if no state is set.

- `getProgress()` (*Long*) -

    The loading progress of the collection, expressed as a percentage.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.GetLoadStateReq;
import io.milvus.v2.service.collection.response.GetLoadStateResp;
import java.util.Collections;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// Create a collection named "book"
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("book")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

GetLoadStateResp resp = client.getLoadStateV2(GetLoadStateReq.builder()
        .collectionName("book")
        .build());
System.out.println(resp.getState());
System.out.println(resp.getProgress());
```
