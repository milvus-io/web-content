# add_field()

This operation adds a field to the schema of a collection.

## Request Syntax

```python
add_field(
    field_name: str,
    datatype: DataType,
    **kwargs
)
```

**PARAMETERS:**

- **field_name** (*string*) - 

    **[REQUIRED]**

    The name of the field.

- **datatype** (*[DataType](../../MilvusClient/Collections/DataType.md)*) - 

    **[REQUIRED]**

    The data type of the field.

    You can choose from the following options when selecting a data type for different fields:

    - Primary key field: Use **DataType.INT64** or **DataType.VARCHAR**.

    - Scalar fields: Choose from a variety of options, including 

        - **DataType.BOOL**,

        - **DataType.INT8**,

        - **DataType.INT16**,

        - **DataType.INT32**,

        - **DataType.INT64**,

        - **DataType.FLOAT**,

        - **DataType.DOUBLE**,

        - **DataType.BINARY_VECTOR**,

        - **DataType.FLOAT_VECTOR**,

        - **DataType.FLOAT16_VECTOR**,

        - **DataType.BFLOAT16_VECTOR**,

        - **DataType.VARCHAR**,

        - **DataType.JSON**, and

        - **DataType.ARRAY**

    - Vector fields: Select **DataType.BINARY_VECTOR**, **DataType.FLOAT_VECTOR**, **DataType.FLOAT16_VECTOR**, **DataType.BFLOAT16_VECTOR**, or **DataType.SPARSE_FLOAT_VECTOR**.

- **is_primary** (*bool*) -

    Whether the current field is the primary field in a collection.

    <div class="admonition note">

    <p><b>notes</b></p>

    <ul>
    <li><p>Each collection has only one primary field.</p></li>
    <li><p>A primary field should be of either the <strong>DataType.INT64</strong> type or the <strong>DataType.VARCHAR</strong> type.</p></li>
    </ul>

    </div>

- **max_length** (*int*) -

    The maximum byte length for strings allowed to be inserted. Note that multibyte characters (e.g., Unicode characters) may occupy more than one byte each, so ensure the byte length of inserted strings does not exceed the specified limit. Value range: [1, 65,535].

    This is mandatory for a **DataType.VARCHAR** field.

- **element_type** (*str*) -

    The data type of the elements in the field value.

    This is mandatory for a **DataType.ARRAY** field.

- **max_capacity** (*int*) -

    The number of elements in an Array field value.

    This is mandatory for a **DataType.ARRAY** field.

- **dim** (*int*) -

    The dimension of the vector embeddings. The value should be an integer greater than 1.

    This is mandatory for a field of the **DataType.FLOAT_VECTOR**, **DataType.BINARY_VECTOR**, **DataType.FLOAT16_VECTOR**, or **DataType.BFLOAT16_VECTOR** type. If you use **DataType.SPARSE_FLOAT_VECTOR**, omit this parameter.

- **is_partition_key** (*bool*) -

    Whether the current field serves as the partition key. Each collection can have one partition key.

    This parameter is not applicable to Milvus Lite. For more information on Milvus Lite limits, refer to [Run Milvus Lite](https://milvus.io/docs/milvus_lite.md).

    <div class="admonition note">

    <p><b>what is the partition key?</b></p>

    <p>To facilitate partition-oriented multi-tenancy, you can set a field as the partition key field so that Milvus hashes the field values and distributes entities among the specified number of partitions accordingly.</p>
    <p>When retrieving entities, ensure that the partition key field is used in the boolean expression to filter out entities of a specific field value.</p>
    <p>For details, refer to <a href="https://milvus.io/docs/use-partition-key">Use Partition Key</a> and <a href="https://milvus.io/docs/multi_tenancy.md">Multi-tenancy</a>.</p>

    </div>

- **is_clustering_key** (*bool*) -

    Whether the current field serves as the clustering key. Each collection can have one partition key. You can also use the partition key as the clustering key. For details, refer to Clustering Compaction.

- **mmap_enabled** (*bool*) -

    Whether Milvus maps the field data into memory instead of fully loading it. For details settings, refer to MMap-enabled Data Storage.

- **nullable** (*bool*) -

    A Boolean parameter that specifies whether the field can accept null values. Valid values:

    - **True**: The field can contain null values, indicating that the field is optional, and missing data is permitted for entries.

    - **False** (default): The field must contain a valid value for each entity; missing data is not allowed, making the field mandatory.

    For more information, refer to [Nullable & Default](https://milvus.io/docs/nullable-and-default.md).

- **default_value** (*DataType*)

    Sets a default value for a specific field in a collection schema when creating it. This is particularly useful when you want certain fields to have an initial value even if no value is explicitly provided during data insertion.

- **analyzer_params** (*dict*) -

    Configures the analyzer for text processing, specifically for `DataType.VARCHAR` fields. This parameter configures tokenizer and filter settings, particularly for text fields used in [keyword matching](https://milvus.io/docs/keyword-match.md) or [full text search](https://milvus.io/docs/full-text-search.md). Depending on the type of analyzer, it can be configured in either of the following methods:

    - Built-in analyzer

        ```python
        analyzer_params = {
            "type": "standard" # Uses the standard built-in analyzer
        }
        ```

        - `type` (*str*) -

            Pre-configured analyzer type built into Milvus, which can be used out-of-the-box by specifying its name. Possible values: `standard`, `english`, `chinese`. For more information, refer to [Standard Analyzer](https://milvus.io/docs/standard-analyzer.md), [English Analyzer](https://milvus.io/docs/english-analyzer.md), and [Chinese Analyzer](https://milvus.io/docs/chinese-analyzer.md).

    - Custom analyzer

        ```python
        analyzer_params = {
            "tokenizer": "standard",
            "filter": ["lowercase"],
        }
        ```

        - `tokenizer` (*str*) -

            Defines the tokenizer type. Possible values: `standard` (default), `whitespace`, `jieba`. For more information, refer to [Standard Tokenizer](https://milvus.io/docs/standard-tokenizer.md), [Whitespace Tokenizer](https://milvus.io/docs/whitespace-tokenizer.md), and [Jieba Tokenizer](https://milvus.io/docs/jieba-tokenizer.md).

        - `filter` (*Union[List[str], List[dict]*]) -

            - Lists filters to refine tokens produced by the tokenizer, with options for built-in filters and custom filters. For more information, refer to [Alphanumonly Filter](https://milvus.io/docs/alphanumonly-filer.md) and others.

- **enable_analyzer** (*bool*)

    Whether to enable text analysis for the specified `VARCHAR` field. When set to `True`, it instructs Milvus to use a text analyzer, which tokenizes and filters the text content of the field.

- **enable_match** (*bool*)

    Whether to enable keyword matching for the specified `VARCHAR` field. When set to `True`, Milvus creates an inverted index for the field, allowing for quick and efficient keyword lookups. `enable_match` works in conjunction with `enable_analyzer` to provide structured keyword-based text search, with `enable_analyzer` handling tokenization and `enable_match` handling the search operations on these tokens.

**RETURN TYPE:**

*[CollectionSchema](CollectionSchema.md)*

**RETURNS:**

A **CollectionSchema** object contains the fields that have been added to the schema.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import DataType, FieldSchema, CollectionSchema

schema = CollectionSchema(
    fields = [primary_key, vector]
)

# Add the primary key field
schema.add_field(
    field_name="id",
    datatype=DataType.INT64,
    is_primary=True
)

# Add the vector field
schema.add_field(
    field_name="vector",
    datatype=FLOAT_VECTOR,
    dim=768
)

# Add a scalar field to the schema
schema.add_field(
    field_name="scalar_01",
    datatype=DataType.INT32
)

# {
#     'auto_id': False, 
#     'description': '', 
#     'fields': [
#         {
#             'name': 'id', 
#             'description': '', 
#             'type': <DataType.INT64: 5>, 
#             'is_primary': True, 
#             'auto_id': False
#         }, 
#         {
#             'name': 'vector', 
#             'description': '', 
#             'type': <DataType.FLOAT_VECTOR: 101>, 
#             'params': {'dim': 768}
#        }, 
#        {
#             'name': 'scalar_01', 
#             'description': '', 
#             'type': <DataType.INT32: 4>
#        }
#     ]
# }
```

## Related operations

The following operations are related to `add_field()`:

- [FieldSchema](../FieldSchema/FieldSchema.md)

- [DataType](../../MilvusClient/Collections/DataType.md)

- [construct_from_dict()](../../MilvusClient/CollectionSchema/construct_from_dict_1.md)

- [to_dict()](../../MilvusClient/CollectionSchema/to_dict_1.md)

- [verify()](../../MilvusClient/CollectionSchema/verify_1.md)

