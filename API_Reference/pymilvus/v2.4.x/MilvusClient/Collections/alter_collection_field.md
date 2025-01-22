# alter_collection_field()

This operation changes the specified collection field parameters.

## Request Syntax

```python
alter_collection_field(
    collection_name: str, 
    field_name: str, 
    field_params: Dict,
    db_name="",
    timeout: Optional[float] = None,
    **kwargs,
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    The name of the target collection.

- **field_name** (*str*) -

    The name of the target field.

- **field_params** (*dict*) -

    The field parameters to change. The properties not mentioned remains unchanged. Possible parameters vary with the field type. 

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

- **timeout** (*Optional[float]*) - 

    The timeout duration for this operation.

    Setting this to None indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation, especially when the specified alias does not exist.

## Example

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# upsert properties
field_params = {"max_length": 1500}

client.alter_collection_field(
    collection_name="collection_name", 
    field_name="my_varchar",
    field_params=field_params
)
```

