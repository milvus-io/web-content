# addCollectionStructField()

This operation adds a struct field to an existing collection. Use it to extend a collection schema with a structured array field after the collection has already been created.

```java
public void addCollectionStructField(AddCollectionStructFieldReq request)
```

## Request Syntax

```java
addCollectionStructField(AddCollectionStructFieldReq.builder()
    .collectionName(String collectionName)
    .databaseName(String databaseName)
    .fieldName(String fieldName)
    .description(String description)
    .maxCapacity(Integer maxCapacity)
    .nullable(Boolean nullable)
    .structFields(List<CreateCollectionReq.FieldSchema> structFields)
    .typeParams(Map<String, String> typeParams)
    .build());
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The target collection name.

- `databaseName(String databaseName)`

    The database that contains the collection. Omit this field to use the current database.

- `fieldName(String fieldName)`

    The name of the struct array field to add.

- `description(String description)`

    A human-readable description for the new field.

- `maxCapacity(Integer maxCapacity)`

    The maximum number of struct elements allowed in each row.

- `nullable(Boolean nullable)`

    Whether the struct field can be null.

- `structFields(List<CreateCollectionReq.FieldSchema> structFields)`

    The scalar or vector fields contained in each struct element. See [FieldSchema](FieldSchema.md).

- `addStructField(AddFieldReq addFieldReq)`

    Converts the given field request into a struct sub-field and appends it to the struct field definition.

- `typeParams(Map<String, String> typeParams)`

    Additional type parameters passed to the server for the struct field.

- `typeParam(String key, String value)`

    Adds a single type parameter to the struct field.

**RETURNS:**

*void*

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
import java.util.Collections;
import io.milvus.v2.service.collection.request.AddCollectionStructFieldReq;
import java.util.Arrays;

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



// 3. Add a struct field to the collection
client.addCollectionStructField(AddCollectionStructFieldReq.builder()
    .collectionName("books")
    .fieldName("metadata")
    .maxCapacity(8)
    .nullable(true)
    .structFields(Arrays.asList(
        CreateCollectionReq.FieldSchema.builder()
            .name("author")
            .dataType(DataType.VarChar)
            .maxLength(256)
            .build()))
    .build());
```

<!-- category: Collections; action: CREATE; addedSince: v3.0.x -->
