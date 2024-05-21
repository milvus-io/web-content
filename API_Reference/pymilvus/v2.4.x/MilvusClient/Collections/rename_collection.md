# rename_collection()

This operation renames an existing collection.

## Request Syntax

```python
rename_collection(
    old_name: str,
    new_name: str,
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **old_name** (*str*) -

    **[REQUIRED]**

    The name of an existing collection.

    Setting this to a non-existing collection results in a **MilvusException**.

- **new_name** (*str*) -

    **[REQUIRED]**

    The name of the target collection after this operation.

    Setting this to the value of **old_name** results in a **MilvusException**.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient

# 1. Set up a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a collection
client.create_collection(
    collection_name="test_collection",
    dimension=5
)

# 3. Rename the collection
client.rename_collection(
    old_name="test_collection",
    new_name="test_collection_renamed"
)
```

## Related methods

- [create_collection()](create_collection.md)

- [create_schema()](create_schema.md)

- [describe_collection()](describe_collection.md)

- [drop_collection()](drop_collection.md)

- [get_collection_stats()](get_collection_stats.md)

- [has_collection()](has_collection.md)

- [list_collections()](list_collections.md)

- [IndexType](IndexType.md)

- [DataType](DataType.md)

