# describe_alias()

This operation displays the details of an alias.

## Request Syntax

```python
describe_alias(
    alias: str,
    timeout: Optional[float] = None
) -> dict
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

*Dict*

**RETURNS:**

A dictionary containing the alias details.

```python
{
    alias: 'string',
    collection_name: 'string',
    db_name: 'default'
}
```

**PARAMETERS:**

- **alias** (*str*) -

    The specified alias. 

- **collection_name** (*str*) -

    The name of the bound collection. 

- **db_name** (*str*) -

    The database to which the bound collection belongs. 

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

# 4. Describe the alias
client.describe_alias(alias="test")

# {
#     'alias': 'test', 
#     'collection_name': 'test_collection', 
#     'db_name': 'default'
# }
```

## Related methods

- [alter_alias()](alter_alias.md)

- [create_alias()](create_alias.md)

- [drop_alias()](drop_alias.md)

- [list_aliases()](list_aliases.md)

