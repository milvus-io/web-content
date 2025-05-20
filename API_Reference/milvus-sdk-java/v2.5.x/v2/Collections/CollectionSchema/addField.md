# addField()

This operation adds a vector field to the schema of a collection.

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
    .analyzerParams(Map<String, Object>, analyzerParams)

    .build()
)
```

**BUILDER METHODS**

- `fieldName(String fieldName)`

    The name of the field.

- `description(String description)`

    The description of the field.

- `dataType(DataType dataType)`

    The data type of the field.

    You can choose from the following options when selecting a data type for different fields:

    - Primary key field: Use **DataType.Int64** or **DataType.VarChar**.

    - Scalar fields: Choose from a variety of options, including **DataType.Bool**, **DataType.Int8**, **DataType.Int16**, **DataType.Int32**, **DataType.Int64**, **DataType.Float**, **DataType.Double**, **DataType.VarChar**, **DataType.JSON**, and **DataType.Array**.

    - Vector fields: Select **DataType.BinaryVector** or **DataType.FloatVector**.

- `maxLength(Integer maxLength)`

    The maximum number of characters a value should contain.

    This is required if **dataType** of this field is set to **DataType.VarChar.**

- `isPrimaryKey(Boolean isPrimaryKey)`

    Whether the current field is the primary field.

    Setting this to **True** makes the current field the primary field.

- `isPartitionKey(Boolean isPartitionKey)`

    Whether the current field is the partitionKey field.

    Setting this to **True** makes the current field the partition key.

- `autoID(Boolean autoID)`

    Whether allows the primary field to automatically increment.

    Setting this to **True** makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors.

    Set this parameter in the field with **isPrimaryKey** set to **True**.

- `dimension(int dimension)`

    The dimensionality of a vector field. 

    The value should be greater than 1 and is usually determined by the embedding model in use.

    This is required if **dataType** of this field is set to **DataType.FloatVector**.

- `elementType(DataType elementType)`

    The data type of elements in array fields.

    This is required if **dataType** of this field is set to **DataType.Array**.

- `maxCapacity(Integer maxCapacity)`

    The maximum number of elements that an array field can contain.

    This is required if **dataType** of this field is set to **DataType.Array**.

- `isNullable(Boolean isNullable)`

    A Boolean parameter that specifies whether the field can accept null values. Valid values:

    - **True**: The field can contain null values, indicating that the field is optional, and missing data is permitted for entries.

    - **False** (default): The field must contain a valid value for each entity; missing data is not allowed, making the field mandatory.

    For more information, refer to [Nullable & Default](https://milvus.io/docs/nullable-and-default.md).

- `defaultValue(DataType dataType)`

    Sets a default value for a specific field in a collection schema when creating it. This is particularly useful when you want certain fields to have an initial value even if no value is explicitly provided during data insertion.

- `enableAnalyzer(Boolean enableAnalyzer)`

    Whether to enable text analysis for the specified `VARCHAR` field. When set to `true`, it instructs Milvus to use a text analyzer, which tokenizes and filters the text content of the field.

- `enableMatch(Boolean enableMatch)`

    Whether to enable keyword matching for the specified `VARCHAR` field. When set to `true`, Milvus creates an inverted index for the field, allowing for quick and efficient keyword lookups. `enableMatch` works in conjunction with `enableAnalyzer` to provide structured term-based text search, with `enableAnalyzer` handling tokenization and `enableMatch` handling the search operations on these tokens.

- `analyzerParams(Map<String, Object>, analyzerParams)`

    Configures the analyzer for text processing, specifically for `DataType.VarChar` fields. This parameter configures tokenizer and filter settings, particularly for text fields used in [keyword matching](https://milvus.io/docs/keyword-match.md) or [full text search](https://milvus.io/docs/full-text-search.md). Depending on the type of analyzer, it can be configured in either of the following methods:

    - Built-in analyzer

        ```java
        Map<String, Object> analyzerParams = new HashMap<>();
        analyzerParams.put("type", "english");
        ```

        - `type` (*String*) -

            Pre-configured analyzer type built into Milvus, which can be used out-of-the-box by specifying its name. Possible values: `standard`, `english`, `chinese`. For more information, refer to [Standard Analyzer](https://milvus.io/docs/standard-analyzer.md), [English Analyzer](https://milvus.io/docs/english-analyzer.md), and [Chinese Analyzer](https://milvus.io/docs/chinese-analyzer.md).

    - Custom analyzer

        ```java
        Map<String, Object> analyzerParams = new HashMap<>();
        analyzerParams.put("tokenizer", "standard");
        analyzerParams.put("filter", Collections.singletonList("lowercase"));
        ```

        - `tokenizer` (*String*) -

            Defines the tokenizer type. Possible values: `standard` (default), `whitespace`, `jieba`. For more information, refer to [Standard Tokenizer](https://milvus.io/docs/standard-tokenizer.md), [Whitespace Tokenizer](https://milvus.io/docs/whitespace-tokenizer.md), and [Jieba Tokenizer](https://milvus.io/docs/jieba-tokenizer.md).

        - `filter` (*List\<String>*) -

            Lists filters to refine tokens produced by the tokenizer, with options for built-in filters and custom filters. For more information, refer to [Alphanumonly Filter](https://milvus.io/docs/alphanumonly-filer.md) and others.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq.CollectionSchema collectionSchema = client.createSchema();
// add two field, id and vector
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).description("id").build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(dim).build());
```

