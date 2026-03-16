# create_alias()

This operation creates an alias for an existing collection.

## Request syntax

```python
create_alias(
    collection_name: str,
    alias: str,
    timeout: float | None
) -> None
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection to create an alias for.

- **alias** (*str*) -

    **[REQUIRED]**

    The alias of the collection. Before this operation, ensure that the alias does not already exist. If it does, exceptions will occur.

    <div class="alert note">
    
    A collection alias is an additional name for a collection. Collection aliases are useful when you want to switch your application to a new collection without any changes to your code. 
    
    In Milvus, a collection alias is a globally unique identifier. One alias can only be assigned to exactly one collection. Conversely, a collection can have multiple aliases.
    
    Below is an example of reassigning the alias of one collection to another:
    
    Suppose there are two collections: `collection_1` and `collection_2`. There is also a collection alias named `bob`, which was originally assigned to `collection_1`:
    
    - `collection_1`'s alias = ["bob"]
    
    - `collection_2`'s alias = []
    
    After calling `alter_alias("collection_2", "bob")`:
    
    - `collection_1`'s alias = []
    
    - `collection_2`'s alias = ["bob"]
    
    </div>

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation, especially when you set `alias` to an existing alias.

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
```

## Related methods

- [alter_alias()](alter_alias.md)

- [describe_alias()](describe_alias.md)

- [drop_alias()](drop_alias.md)

- [list_aliases()](list_aliases.md)

