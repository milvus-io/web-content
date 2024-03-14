
# describe_alias()

This operation displays the details of an alias.

## Request Syntax

```python
describe_alias(
    alias: str,
    timeout: Optional[float] = None
) -> dict
```

__PARAMETERS:__

- __alias__ (_str_) -

    __[REQUIRED]__

    The alias of a collection. 

    Before this operation, ensure that the alias exists. Otherwise, exceptions will occur.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. 

    Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_Dict_

__RETURNS:__

A dictionary containing the alias details.

```python
{
    alias: 'string',
    collection_name: 'string',
    db_name: 'default'
}
```

__PARAMETERS:__

- __alias__ (_str_) -

    The specified alias. 

- __collection_name__ (_str_) -

    The name of the bound collection. 

- __db_name__ (_str_) -

    The database to which the bound collection belongs. 

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

# 4. Describe the alias
client.describe_alias(alias="test")

# {
#     'alias': 'test', 
#     'collection_name': 'test_collection', 
#     'db_name': 'default'
# }
```

