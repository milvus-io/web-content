# drop_alias()

This operation drops a specified collection alias. 

## Request syntax

```python
drop_alias(
    alias: str,
    timeout: float | None
) -> None
```

__PARAMETERS:__

- __alias __(_str_) -

    __[REQUIRED]__

    The alias of a collection. 

    Before this operation, ensure that the alias exists. Otherwise, exceptions will occur.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. 

    Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

None

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation, especially when you set `alias` to a non-existing alias.

- __BaseException__

    This exception will be raised when this operation fails.

## Example

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a collection
client.create_collection(collection_name="test_collection", dimension=5)

# 3. Create an alias for the collection
client.create_alias(collection_name="test_collection", alias="test")

# 4. Drop the alias
client.drop_alias(alias="test")
```

## Related methods

- [alter_alias()](./Collections/alter_alias.md)

- [create_alias()](./Collections/create_alias.md)

- [describe_alias()](./Collections/describe_alias.md)

- [list_aliases()](./Collections/list_aliases.md)

