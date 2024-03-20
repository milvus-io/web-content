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

__PARAMETERS:__

- __old_name__ (_str_) -

    __[REQUIRED]__

    The name of an existing collection.

    Setting this to a non-existing collection results in a __MilvusException__.

- __new_name__ (_str_) -

    __[REQUIRED]__

    The name of the target collection after this operation.

    Setting this to the value of __old_name__ results in a __MilvusException__.

- __timeout__ (_float_ | _None_) -

    The timeout duration for this operation. 

    Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

None

__EXCEPTIONS:__

- __MilvusException__

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

- [create_collection()](./Collections/create_collection.md)

- [create_schema()](./Collections/create_schema.md)

- [describe_collection()](./Collections/describe_collection.md)

- [drop_collection()](./Collections/drop_collection.md)

- [get_collection_stats()](./Collections/get_collection_stats.md)

- [has_collection()](./Collections/has_collection.md)

- [list_collections()](./Collections/list_collections.md)

- [IndexType](./Collections/IndexType.md)

- [DataType](./Collections/DataType.md)

