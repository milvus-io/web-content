# drop_alias()

This operation drops a specified collection alias. 

## Request syntax

```python
drop_alias(
    alias: str,
    timeout: float | None
) -> None
```

**PARAMETERS:**

- **alias** (*str*) -

    **[REQUIRED]**

    The alias of a collection. 

    Before this operation, ensure that the alias exists. Otherwise, exceptions will occur.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation, especially when you set `alias` to a non-existing alias.

- **BaseException**

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

- [alter_alias()](alter_alias.md)

- [create_alias()](create_alias.md)

- [describe_alias()](describe_alias.md)

- [list_aliases()](list_aliases.md)

