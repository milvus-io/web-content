# FieldSchema

A **FieldSchema** instance defines the data type and related attributes of a specific field in a collection.

```java
io.milvus.v2.service.collection.request.CreateCollectionReq.FieldSchema
```

## Constructor

Constructs the schema of a field by defining the field name, data type, and other parameters.

```java
CreateCollectionReq.FieldSchema.builder()
    .name(String name)
    .description(String description)
    .dataType(DataType dataType)
    .maxLength(Integer maxLength)
    .dimension(Integer dimension)
    .isPrimaryKey(Boolean isPrimaryKey)
    .isPartitionKey(Boolean isPartitionKey)
    .isClusteringKey(Boolean isClusteringKey)
    .autoID(Boolean autoID)

    .elementType(DataType elementType)
    .maxCapacity(Integer maxCapacity)

    .isNullable(Boolean isNullable)
    .defaultValue(Object defaultValue)
    .enableAnalyzer(Boolean enableAnalyzer)
    .analyzerParams(Map<String, Object> analyzerParams)
    .enableMatch(Boolean enableMatch)
    .typeParams(Map<String, String> typeParams)
    .multiAnalyzerParams(Map<String, Object> multiAnalyzerParams)
    .externalField(String externalField)
    .build();
```

**BUILDER METHODS:**

- `name(String name)` -

    The name of the field.

- `description(String description)` -

    The description of the field.

- `dataType(DataType dataType)` -

    The data type of the field. You can choose from the following options when selecting a data type for different fields: primary key field — use **DataType.Int64** or **DataType.VarChar**; scalar fields — choose from **DataType.Bool**, **DataType.Int8**, **DataType.Int16**, **DataType.Int32**, **DataType.Int64**, **DataType.Float**, **DataType.Double**, **DataType.VarChar**, **DataType.JSON**, or **DataType.Array**; vector fields — select **DataType.BinaryVector** or **DataType.FloatVector**.

- `maxLength(Integer maxLength)` -

    The maximum number of characters a value should contain. This is required if **[dataType](DataType.md)** of this field is set to **DataType.VarChar**.

- `dimension(Integer dimension)` -

    The number of dimensions a value should have. This is required if **[dataType](DataType.md)** of this field is set to **DataType.FloatVector**.

- `isPrimaryKey(Boolean isPrimaryKey)` -

    Whether the current field is the primary field. Setting this to **True** makes the current field the primary field.

- `isPartitionKey(Boolean isPartitionKey)` -

    Whether the current field is the partition-key field. Setting this to **True** makes the current field the partition key.

- `isClusteringKey(Boolean isClusteringKey)` -

    Whether the current field is the clustering key. The clustering key controls on-disk segment grouping to accelerate queries that filter on this field.

- `autoID(Boolean autoID)` -

    Whether allows the primary field to automatically increment. Setting this to **True** makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors. Set this parameter in the field with **isPrimaryKey** set to **True**.

- `elementType(DataType elementType)` -

    The data type of elements in array fields. This is required if **[dataType](DataType.md)** of this field is set to **DataType.Array**. Available only in self-hosted Milvus.

- `maxCapacity(Integer maxCapacity)` -

    The maximum number of elements that an array field can contain. This is required if **[dataType](DataType.md)** of this field is set to **DataType.Array**. Available only in self-hosted Milvus.

- `isNullable(Boolean isNullable)` -

    Allows `null` values for this field. Default: `false`. For more information, refer to Nullable & Default.

- `defaultValue(Object defaultValue)` -

    Sets a default value for the field used when the field is absent from an insert. The runtime type must match `dataType`.

- `enableAnalyzer(Boolean enableAnalyzer)` -

    Whether to enable text analysis for the specified `VARCHAR` field. When set to `true`, Milvus uses a text analyzer that tokenizes and filters the text content of the field. Required for full-text search.

- `analyzerParams(Map<String, Object> analyzerParams)` -

    Per-field analyzer configuration (tokenizer, filters) for `DataType.VarChar` fields. Used together with `enableAnalyzer`.

- `enableMatch(Boolean enableMatch)` -

    Whether to enable keyword matching for the specified `VARCHAR` field. When `true`, Milvus creates an inverted index for the field, allowing for quick and efficient keyword lookups. `enableMatch` works in conjunction with `enableAnalyzer` to provide structured term-based text search.

- `typeParams(Map<String, String> typeParams)` -

    Generic per-type parameters not surfaced as dedicated builder methods. Once specified, values here override the corresponding parameter values set above.

- `multiAnalyzerParams(Map<String, Object> multiAnalyzerParams)` -

    A multi-language analyzer that allows you to configure multiple analyzers for a text field and store multilingual documents in this text field.

- `externalField(String externalField)` -

    Maps this Milvus field to a column in the external source identified on the schema's `externalSource`. Used for external collections.

**RETURN TYPE:**

*FieldSchema*

**RETURNS:**

A **FieldSchema** object.

**EXCEPTIONS:**

- **MilvusClientExceptions**

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
