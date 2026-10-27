# dropCollectionFunction()

**Deprecated since SDK v3.0.10.** Milvus 3.0 and later do not support dropping a function separately. Use [`dropFunctionField()`](dropFunctionField.md) instead, which also removes the function's output field and its index.

Removes a function definition from an existing collection without removing its output field. Use [`dropFunctionField()`](dropFunctionField.md) to remove both.

```java
public void dropCollectionFunction(DropCollectionFunctionReq request)
```

## Request Syntax

```java
DropCollectionFunctionReq.builder()
    .collectionName(collectionName)
    .databaseName(databaseName)
    .functionName(functionName)
    .build();
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of the target collection.

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `functionName(String functionName)`

    The name of the function definition to remove.

**RETURNS:**

*void*

This operation does not return a value.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.DropCollectionFunctionReq;
import java.util.Collections;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with an "id" field and a "vector" field
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Drop the function named "bm25"
client.dropCollectionFunction(DropCollectionFunctionReq.builder()
    .collectionName("my_collection")
    .functionName("bm25")
    .build());
```
