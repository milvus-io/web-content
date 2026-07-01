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

    The scalar or vector fields contained in each struct element.

- `typeParams(Map<String, String> typeParams)`

    Additional type parameters passed to the server for the struct field.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when validation fails or the server returns an error for this operation.

## Example

```java
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
    .uri("http://localhost:19530")
    .token("root:Milvus")
    .build());

client.addCollectionStructField(AddCollectionStructFieldReq.builder()
    .collectionName("book")
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
