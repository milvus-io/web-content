# drop_collection()

This operation drops a collection.

## Request syntax

```python
drop_collection(collection_name: str) -> None
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of an existing collection.

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

# 3. List collections
res = client.list_collections() 

# ['test_collection']

# 4. Drop the collection
client.drop_collection(collection_name="test_collection")

# 5. List collections
res = client.list_collections() 

# []
```

## Related methods

- [create_collection()](create_collection.md)

- [create_schema()](create_schema.md)

- [describe_collection()](describe_collection.md)

- [get_collection_stats()](get_collection_stats.md)

- [has_collection()](has_collection.md)

- [list_collections()](list_collections.md)

- [rename_collection()](rename_collection.md)

- [IndexType](IndexType.md)

- [DataType](DataType.md)

