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

    The data type of the new function output field.

- `maxLength(Integer maxLength)`

    The maximum length for a variable-length field.

- `dimension(Integer dimension)`

    The dimension of the vector field.

- `elementType(DataType elementType)`

    The element type for an array field.

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

    The function definition. It must have exactly one output matching fieldName.

- `indexParam(IndexParam indexParam)`

    The bound index configuration. It must use the same field and an explicit index type other than None or AUTOINDEX.

**RETURNS:**

*void*

This operation does not return a value.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
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
