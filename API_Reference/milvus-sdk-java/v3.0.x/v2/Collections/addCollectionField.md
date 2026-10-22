# addCollectionField()

This operation adds a new scalar or vector field to an existing collection without recreating the collection. Existing rows do not have values for the new field, so added vector fields must be nullable.

```java
public void addCollectionField(AddCollectionFieldReq request)
```

## Request Syntax

```java
client.addCollectionField(AddCollectionFieldReq.builder()
    .collectionName(String collectionName)
    .databaseName(String databaseName)
    .fieldName(String fieldName)
    .description(String description)
    .dataType(DataType dataType)
    .maxLength(Integer maxLength)
    .dimension(Integer dimension)
    .elementType(DataType elementType)
    .maxCapacity(Integer maxCapacity)
    .isNullable(Boolean isNullable)
    .defaultValue(Object defaultValue)
    .enableAnalyzer(Boolean enableAnalyzer)
    .analyzerParams(Map<String, Object> analyzerParams)
    .enableMatch(Boolean enableMatch)
    .typeParams(Map<String, String> typeParams)
    .multiAnalyzerParams(Map<String, Object> multiAnalyzerParams)
    .structFields(List<CreateCollectionReq.FieldSchema> structFields)
    .externalField(String externalField)
    .build()
);
```

**BUILDER METHODS:**

- `collectionName(String collectionName)` -

    The name of the target collection.

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `fieldName(String fieldName)` -

    The name of the field to add.

- `description(String description)` -

    A human-readable description for the field.

- `dataType(DataType dataType)` -

    The data type of the field. Scalar, vector, array, JSON, and struct-related field types follow the same `DataType` values used when creating a collection. See [DataType](DataType.md).

- `maxLength(Integer maxLength)` -

    The maximum number of characters for a `DataType.VarChar` field. This is required for VarChar fields unless the value is supplied through `typeParams`.

- `dimension(Integer dimension)` -

    The vector dimension. This is required for fixed-dimension vector fields such as `DataType.FloatVector`.

- `elementType(DataType elementType)` -

    The element type for an array field. See [DataType](DataType.md).

- `maxCapacity(Integer maxCapacity)` -

    The maximum number of elements allowed in an array field.

- `isNullable(Boolean isNullable)` -

    Whether the added field accepts `null` values. For v3.0.1 and later, vector fields added to an existing collection must set this to `true`; otherwise the SDK raises `MilvusClientException`.

- `defaultValue(Object defaultValue)` -

    The default value for the added field. The runtime type must match `dataType`.

- `enableAnalyzer(Boolean enableAnalyzer)` -

    Whether to enable text analysis for a `DataType.VarChar` field.

- `analyzerParams(Map<String, Object> analyzerParams)` -

    Analyzer configuration for a VarChar field, such as tokenizer and filter settings.

- `enableMatch(Boolean enableMatch)` -

    Whether to enable keyword matching for a VarChar field.

- `typeParams(Map<String, String> typeParams)` -

    Additional field type parameters. Dedicated builder methods such as `dimension` or `maxLength` override corresponding entries in this map.

- `multiAnalyzerParams(Map<String, Object> multiAnalyzerParams)` -

    Multi-language analyzer configuration for a text field.

- `structFields(List<CreateCollectionReq.FieldSchema> structFields)` -

    Nested field schemas for a struct field. See [FieldSchema](FieldSchema.md).

- `externalField(String externalField)` -

    The external source field that maps to this Milvus field when the collection is backed by an external source.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation, including when a vector field is added with `isNullable(false)` or without setting `isNullable(true)`.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddCollectionFieldReq;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
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

// 3. Add a nullable VarChar field to the existing collection.
// The new field must be nullable so that existing rows get null values.
client.addCollectionField(AddCollectionFieldReq.builder()
        .collectionName("my_collection")
        .fieldName("text")
        .dataType(DataType.VarChar)
        .maxLength(100)
        .isNullable(true)
        .build());
```
