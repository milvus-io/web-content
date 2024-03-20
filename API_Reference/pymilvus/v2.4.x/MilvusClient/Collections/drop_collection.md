# drop_collection()

This operation drops a collection.

## Request syntax

```python
drop_collection(collection_name: str) -> None
```

__PARAMETERS:__

- __collection_name__ (_str_) -

    __[REQUIRED]__

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

- [create_collection()](./Collections/create_collection.md)

- [create_schema()](./Collections/create_schema.md)

- [describe_collection()](./Collections/describe_collection.md)

- [get_collection_stats()](./Collections/get_collection_stats.md)

- [has_collection()](./Collections/has_collection.md)

- [list_collections()](./Collections/list_collections.md)

- [rename_collection()](./Collections/rename_collection.md)

- [IndexType](./Collections/IndexType.md)

- [DataType](./Collections/DataType.md)

