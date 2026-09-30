# addField()

This operation adds a field to the schema of a collection.

```java
public void addField(AddFieldReq addFieldReq)
```

## Request Syntax

```java
CollectionSchema.addField(AddFieldReq.builder()
    .fieldName(String fieldName)
    .description(String description)
    .dataType(DataType dataType)
    .maxLength(Integer maxLength)
    .isPrimaryKey(Boolean isPrimaryKey)
    .isPartitionKey(Boolean isPartitionKey)
    .autoID(Boolean autoID)
    .dimension(int dimension)
    .elementType(DataType elementType)
    .maxCapacity(Integer maxCapacity)
    .isNullable(Boolean isNullable)
    .defaultValue(DataType dataType)
    .enableAnalyzer(Boolean enableAnalyzer)
    .enableMatch(Boolean enableMatch)
    .analyzerParams(Map<String, Object> analyzerParams)
    .typeParams(Map<String, String> typeParams)
    .multiAnalyzerParams(Map<String, Object> multiAnalyzerParams)
    .structFields(List<CreateCollectionReq.FieldSchema> structFields)
    .externalField(String externalField)
    .build()
)
```

**BUILDER METHODS:**

- `fieldName(String fieldName)` -

    The name of the field.

- `description(String description)` -

    The description of the field.

- `dataType(DataType dataType)` -

    The data type of the field.

    You can choose from the following options when selecting a data type for different fields.

- `maxLength(Integer maxLength)` -

    The maximum number of characters a value should contain.

    This is required if **[dataType](../DataType.md)** of this field is set to **DataType.VarChar**.

- `isPrimaryKey(Boolean isPrimaryKey)` -

    Whether the current field is the primary field.

    Setting this to **True** makes the current field the primary field.

- `isPartitionKey(Boolean isPartitionKey)` -

    Whether the current field is the partitionKey field.

    Setting this to **True** makes the current field the partition key.

- `autoID(Boolean autoID)` -

    Whether allows the primary field to automatically increment.

    Setting this to **True** makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors.

    Set this parameter in the field with **isPrimaryKey** set to **True**.

- `dimension(int dimension)` -

    The dimensionality of a vector field. The value should be greater than 1 and is usually determined by the embedding model in use.

    This is required if **[dataType](../DataType.md)** of this field is set to **DataType.FloatVector**.

- `elementType(DataType elementType)` -

    The data type of elements in array fields.

    This is required if **[dataType](../DataType.md)** of this field is set to **DataType.Array**.

- `maxCapacity(Integer maxCapacity)` -

    The maximum number of elements that an array field can contain.

    This is required if **[dataType](../DataType.md)** of this field is set to **DataType.Array**.

- `isNullable(Boolean isNullable)` -

    A Boolean parameter that specifies whether the field can accept null values.

    For more information, refer to Nullable & Default.

- `defaultValue(DataType dataType)` -

    Sets a default value for a specific field in a collection schema when creating it. This is particularly useful when you want certain fields to have an initial value even if no value is explicitly provided during data insertion.

- `enableAnalyzer(Boolean enableAnalyzer)` -

    Whether to enable text analysis for the specified `VARCHAR` field. When set to `true`, it instructs Milvus to use a text analyzer, which tokenizes and filters the text content of the field.

- `enableMatch(Boolean enableMatch)` -

    Whether to enable keyword matching for the specified `VARCHAR` field. When set to `true`, Milvus creates an inverted index for the field, allowing for quick and efficient keyword lookups. `enableMatch` works in conjunction with `enableAnalyzer` to provide structured term-based text search.

- `analyzerParams(Map<String, Object> analyzerParams)` -

    Configures the analyzer for text processing, specifically for `DataType.VarChar` fields. This parameter configures tokenizer and filter settings, particularly for text fields used in keyword matching or full text search.

- `typeParams(Map<String, String> typeParams)` -

    The parameters specific to the data type of the current field to add. For example, you can set `maxLength` for a `VarChar` field. Once specified, it overrides the corresponding parameter values specified above.

- `multiAnalyzerParams(Map<String, Object> multiAnalyzerParams)` -

    A multi-language analyzer that allows you to configure multiple analyzers for a text field and store multilingual documents in this text field.

- `structFields(List<CreateCollectionReq.FieldSchema> structFields)` -

    A list of fields in the Array of Structs field.

    This is required if **[dataType](../DataType.md)** of this field is set to **DataType.Array** and **elementType** of this field is set to **DataType.Struct**.

- `externalField(String externalField)` -

    The name of an external field that this Milvus field maps to. Used together with `externalSource` and `externalSpec` on `CollectionSchema` to declare a collection backed by an external data source. The external field's values are pulled into this Milvus field on refresh.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.CollectionSchema collectionSchema = client.createSchema();
// add two fields, id and vector
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).description("id").build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(128).build());
```
