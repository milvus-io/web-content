# add_collection_field()

This operation adds a new scalar field to an existing collection without recreating it. The field becomes available almost immediately with minimal delay due to internal schema synchronization.

<div class="admonition note">

<p><b>notes</b></p>

<p>If the collection has dynamic field enabled and you add a static field with the same name as an existing dynamic field key, the static field will mask the dynamic field key. The original dynamic values remain accessible via <code>$meta&#91;'field_name'&#93;</code> syntax.</p>

</div>

## Request Syntax

```python
add_collection_field(
    collection_name: str,
    field_name: str,
    data_type: DataType,
    desc: str = "",
    timeout: Optional[float] = None,
    **kwargs
)
```

**PARAMETERS:**

- **collection_name** *(string)* –

    **&#91;REQUIRED&#93;**

    The name of the target collection.

- **field_name** *(string)* –

    **&#91;REQUIRED&#93;**

    The name of the new field.

- **data_type** *(DataType)* –

    **&#91;REQUIRED&#93;**

    The data type of the new field. See DataType for supported types.

- **desc** *(string, optional)* –

    A brief description of the field.

- **timeout** *(float)* –

    Timeout (in seconds) for the RPC request. If `None`, the call waits indefinitely.

- **kwargs** *(dict, optional)* –

    Additional parameters include:

    - **nullable** *(bool)*:

        Must be set to `True` for dynamically added fields to accommodate existing entities that don't have values for the new field.

    - **default_value** *(DataType-specific)*:

        A default value for the field if none is provided during data insertion.

    - **max_length** *(int)*:

        Required for `DataType.VARCHAR` fields. Sets the maximum allowed byte length for strings (1 to 65,535).

    - **element_type** *(DataType)*:

        Required for `DataType.ARRAY` fields. Specifies the data type of elements within the array.

    - **max_capacity** *(int)*:

        Required for `DataType.ARRAY` fields. Defines the maximum number of elements in the array.

**RETURN TYPE:**

*None*

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

**Example 1:** Add a basic nullable field

```python
client.add_collection_field(
    collection_name="product_catalog",
    field_name="created_timestamp",
    data_type=DataType.INT64,
    nullable=True  # Required for added fields
)
```

**Example 2:** Add a field with default value

```python
client.add_collection_field(
    collection_name="product_catalog",
    field_name="priority_level",
    data_type=DataType.VARCHAR,
    max_length=20,
    nullable=True,          # Required for added fields
    default_value="standard"  # Default value for existing entities
)
```
