# list_aliases()

This operation lists all existing aliases for a specific collection.

## Request syntax

```python
list_aliases(
    collection_name: str,
    timeout: Optional[float] = None
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection whose aliases are to be listed.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation times out when any response arrives or any error occurs.

**RETURN TYPE:**

*dict*

**RETURNS:**

A dictionary containing the list of aliases assigned to the specified collection.

```python
{
    'aliases': [
        'test'
    ], 
    'collection_name': 'test_collection', 
    'db_name': 'default'
}
```

**PARAMETERS:**

- **aliases** (*list*) -

    A list of aliases assigned to the specified collection.

- **collection_name** (*str*) -

    The specified collection name.

- **db_name** (*str*) -

    The name of the database to which the specified collection belongs to.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

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

# 4. List aliases of the collection
client.list_aliases(collection_name="test_collection")

# {'aliases': ['test'], 'collection_name': 'test_collection', 'db_name': 'default'}
```

## Related methods

- [alter_alias()](alter_alias.md)

- [create_alias()](create_alias.md)

- [describe_alias()](describe_alias.md)

- [drop_alias()](drop_alias.md)

