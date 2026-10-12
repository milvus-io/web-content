# FieldSchema

A **FieldSchema** instance defines the data type and related attributes of a specific field in a collection.

```java
io.milvus.v2.service.collection.request.CreateCollectionReq.FieldSchema
```

## Constructor

Constructs the schema of a field by defining the field name, data type, and other parameters.

```java
CreateCollectionReq.FieldSchema.builder()
    .name(String fieldName)
    .description(String description)
    .dataType(DataType dataType)
    .maxLength(int maxLength)
    .dimension(int dimension)
    .isPrimaryKey(boolean isPrimaryKey)
    .isPartitionKey(boolean isPartitionKey)
    .autoID(boolean autoID)

    .elementType(DataType elementType)
    .maxCapacity(int maxCapacity)
    .isClusteringKey(boolean isClusteringKey)
    .isNullable(boolean isNullable)
    .defaultValue(Object defaultValue)
    .enableAnalyzer(boolean enableAnalyzer)
    .analyzerParams(Map<String, Object> analyzerParams)
    .enableMatch(boolean enableMatch)
    .typeParams(Map<String, String> typeParams)
    .multiAnalyzerParams(Map<String, Object> multiAnalyzerParams)

    .build();
```

**BUILDER METHODS:**

- `name(String fieldName)`

    The name of the field.

- `description(String description)`

    The description of the field.

- `dataType([DataType](DataType.md) dataType)`

    The data type of the field.

    You can choose from the following options when selecting a data type for different fields:

    - Primary key field: Use **DataType.Int64** or **DataType.VarChar**.

    - Scalar fields: Choose from a variety of options, including **DataType.Bool**, **DataType.Int8**, **DataType.Int16**, **DataType.Int32**, **DataType.Int64**, **DataType.Float**, **DataType.Double**, **DataType.VarChar**, **DataType.JSON**, and **DataType.Array**.

    - Vector fields: Select **DataType.BinaryVector** or **DataType.FloatVector**.

- `maxLength(int maxLength)`

    The maximum number of characters a value should contain.

    This is required if **[dataType](DataType.md)** of this field is set to **DataType.VarChar.**

- `dimension(int dimension)`

    The number of dimensions a value should have.

    This is required if **[dataType](DataType.md)** of this field is set to **DataType.FloatVector**.

- `isPrimaryKey(boolean isPrimaryKey)`

    Whether the current field is the primary field.

    Setting this to **True** makes the current field the primary field.

- `isPartitionKey(boolean isPartitionKey)`

    Whether the current field is the partitionKey field.

    Setting this to **True** makes the current field the partition key.

- `autoID(boolean autoID)`

    Whether allows the primary field to automatically increment.

    Setting this to **True** makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors.

    Set this parameter in the field with **isPrimaryKey** set to **True**.

- `elementType(DataType elementType)`

    The data type of elements in array fields.

    This is required if **[dataType](DataType.md)** of this field is set to **DataType.Array**.

- `maxCapacity(int maxCapacity)`

    The maximum number of elements that an array field can contain.

    This is required if **[dataType](DataType.md)** of this field is set to **DataType.Array**.

- `isClusteringKey(boolean isClusteringKey)`

    Whether the current field is the clustering key.

    Setting this to **True** makes the current field the clustering key.

- `isNullable(boolean isNullable)`

    Whether the field can accept null values. Defaults to `false`.

- `defaultValue(Object defaultValue)`

    The default value of the field, used when no value is provided during data insertion.

- `enableAnalyzer(boolean enableAnalyzer)`

    Whether to enable text analysis for the specified `VARCHAR` field.

- `analyzerParams(Map<String, Object> analyzerParams)`

    Configures the analyzer for text processing, specifically for `DataType.VarChar` fields.

- `enableMatch(boolean enableMatch)`

    Whether to enable keyword matching for the specified `VARCHAR` field.

- `typeParams(Map<String, String> typeParams)`

    The parameters specific to the data type of the field. Once specified, a parameter overrides the corresponding value set above.

- `multiAnalyzerParams(Map<String, Object> multiAnalyzerParams)`

    A multi-language analyzer that allows you to configure multiple analyzers for a text field and store multilingual documents in this text field.

**RETURN TYPE:**

*FieldSchema*

**RETURNS:**

A **FieldSchema** object.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
// define a id field with autoID set to false
CreateCollectionReq.FieldSchema fieldSchema = CreateCollectionReq.FieldSchema.builder()
        .name("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .autoID(Boolean.FALSE)
        .build();
```
