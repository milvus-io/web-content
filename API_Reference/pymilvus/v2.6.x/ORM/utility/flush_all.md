# flush_all()

This operation seals all segments.

## Request Syntax

```python
flush_all(
    using: str = "default",
    timeout: float | None,
    **kwargs,
)
```

**PARAMETERS:**

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

N/A

## Examples

```python
from pymilvus import (
    connections, 
    Collection, 
    FieldSchema, 
    CollectionSchema, 
    DataType, 
    utility,
)

# Connect to localhost:19530
connections.connect()

# Create a collection
collection = Collection(
    name="test_collection_flush", 
    schema=CollectionSchema(fields=[
        FieldSchema("film_id", DataType.INT64, is_primary=True),
        FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=128)
    ])
)

# Insert data
collection.insert([[1, 2], [[1.0, 2.0], [3.0, 4.0]]])

utility.flush_all(_async=False) # synchronized flush_all
# or use `future` to flush_all asynchronously

future = utility.flush_all(_async=True)
future.done() # flush_all finished
```

## Related operations

The following operations are related to the `flush_all()` method:

- [drop_collection()](https://zilliverse.feishu.cn/docx/FHcYdN4apoI5TIx0LxScISvtn0f)

- [get_query_segment_info()](https://zilliverse.feishu.cn/docx/CB9edh2ySoJyWhxBoLcchPj9nxg)

- [has_collection()](https://zilliverse.feishu.cn/docx/TWOxdwDYRo4CCHxDdZbc7IOznCg)

- [has_partition()](https://zilliverse.feishu.cn/docx/KsmadNcXRoElO2xJi5HcJO57nwb)

- [list_collections()](https://zilliverse.feishu.cn/docx/QgxEdfBMSodYo6xCg24cH3hInr4)

- [rename_collection()](https://zilliverse.feishu.cn/docx/M0qRdF1cLokrxvxyrXScJ64FnEe)

