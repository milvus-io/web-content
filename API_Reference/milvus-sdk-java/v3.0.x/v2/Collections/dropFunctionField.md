# dropFunctionField()

Drops a function and the output field owned by that function.

```java
public void dropFunctionField(DropFunctionFieldReq request)
```

## Request Syntax

```java
DropFunctionFieldReq.builder()
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

    The name of the function whose definition and output field should be removed.

**RETURNS:**

*void*

This operation does not return a value.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.DropFunctionFieldReq;
import java.util.Collections;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with a BM25 function field
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("text").dataType(DataType.VarChar).maxLength(512).enableAnalyzer(Boolean.TRUE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("sparse").dataType(DataType.SparseFloatVector).build());
collectionSchema.addFunction(CreateCollectionReq.Function.builder()
    .functionType(FunctionType.BM25)
    .name("bm25")
    .inputFieldNames(Collections.singletonList("text"))
    .outputFieldNames(Collections.singletonList("sparse"))
    .build());
IndexParam vectorIndex = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
IndexParam sparseIndex = IndexParam.builder()
        .fieldName("sparse")
        .metricType(IndexParam.MetricType.BM25)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("books")
        .collectionSchema(collectionSchema)
        .indexParams(java.util.Arrays.asList(vectorIndex, sparseIndex))
        .build());

// 3. Drop the function field
client.dropFunctionField(DropFunctionFieldReq.builder()
    .collectionName("books")
    .functionName("bm25")
    .build());
```
