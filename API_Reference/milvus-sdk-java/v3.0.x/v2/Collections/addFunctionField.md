# addFunctionField()

Adds a function-backed field and its explicitly configured bound index to an existing Milvus 3.0 collection.

```java
public void addFunctionField(AddFunctionFieldReq request)
```

## Request Syntax

```java
AddFunctionFieldReq.builder()
    .collectionName(collectionName)
    .databaseName(databaseName)
    .fieldName(fieldName)
    .description(description)
    .dataType(dataType)
    .maxLength(maxLength)
    .dimension(dimension)
    .elementType(elementType)
    .maxCapacity(maxCapacity)
    .isNullable(isNullable)
    .defaultValue(defaultValue)
    .enableAnalyzer(enableAnalyzer)
    .analyzerParams(analyzerParams)
    .enableMatch(enableMatch)
    .typeParams(typeParams)
    .function(function)
    .indexParam(indexParam)
    .build();
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of the target collection.

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `fieldName(String fieldName)`

    The name of the function output field to add.

- `description(String description)`

    A human-readable description of the new field.

- `dataType(DataType dataType)`

    The data type of the new function output field. See [DataType](DataType.md).

- `maxLength(Integer maxLength)`

    The maximum length for a variable-length field.

- `dimension(Integer dimension)`

    The dimension of the vector field.

- `elementType(DataType elementType)`

    The element type for an array field. See [DataType](DataType.md).

- `maxCapacity(Integer maxCapacity)`

    The maximum number of elements in an array field.

- `isNullable(Boolean isNullable)`

    Whether the field accepts null values.

- `defaultValue(Object defaultValue)`

    The default value for a scalar field.

- `enableAnalyzer(Boolean enableAnalyzer)`

    Whether text analysis is enabled for the field.

- `analyzerParams(Map<String, Object> analyzerParams)`

    Analyzer configuration for the field.

- `enableMatch(Boolean enableMatch)`

    Whether text match is enabled for the field.

- `typeParams(Map<String, String> typeParams)`

    Additional field type parameters.

- `function(CreateCollectionReq.Function function)`

    The function definition. It must have exactly one output matching fieldName. See [Function](Function/Function.md).

- `indexParam(IndexParam indexParam)`

    The bound index configuration. It must use the same field and an explicit index type other than None or AUTOINDEX. See [IndexParam](../Management/IndexParam.md).

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
import java.util.Collections;
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.service.collection.request.AddFunctionFieldReq;
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
        .collectionName("books")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());



// 3. Add a BM25 function field (requires StorageV3 enabled on the server)
CreateCollectionReq.Function bm25Function = CreateCollectionReq.Function.builder()
    .name("bm25")
    .functionType(FunctionType.BM25)
    .inputFieldNames(Collections.singletonList("text"))
    .outputFieldNames(Collections.singletonList("sparse"))
    .build();

IndexParam sparseIndex = IndexParam.builder()
    .fieldName("sparse")
    .indexName("sparse_idx")
    .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
    .metricType(IndexParam.MetricType.BM25)
    .build();

client.addFunctionField(AddFunctionFieldReq.builder()
    .collectionName("books")
    .fieldName("sparse")
    .dataType(DataType.SparseFloatVector)
    .function(bm25Function)
    .indexParam(sparseIndex)
    .build());
```
