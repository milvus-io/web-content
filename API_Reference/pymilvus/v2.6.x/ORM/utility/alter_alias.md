# alter_alias()

This operation reassigns the alias of one collection to another.

## Request Syntax

```python
alter_alias(
    collection_name: str,
    alias: str,
    using: str,
    timeout: float | None
)
```

```python
from pymilvus import utility

# Alter collection alias
alter_alias(
    collection_name="string",
    alias="string",
    using="default"
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the target collection to reassign an alias to.

- **alias** (*str*) -

    **[REQUIRED]**

    The alias of the collection. Note that the alias should exist beforehand.

    <div class="alert note">
    
    A collection alias is an additional name for a collection. Collection aliases are useful when you want to switch your application to a new collection without any changes to your code. 
    
    In MilvusZilliz Cloud, a collection alias is a globally unique identifier. One alias can only be assigned to exactly one collection. Conversely, a collection can have multiple aliases.
    
    Below is an example of reassigning the alias of one collection to another:
    
    Suppose there are two collections: `collection_1` and `collection_2`. There is also a collection alias named `bob`, which was originally assigned to `collection_1`:
    
    - `collection_1`'s alias = ["bob"]
    
    - `collection_2`'s alias = []
    
    After calling `alter_alias("collection_2", "bob")`:
    
    - `collection_1`'s alias = []
    
    - `collection_2`'s alias = ["bob"]
    
    </div>

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

 None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation, especially when the specified alias does not exist.

## Examples

```python
from pymilvus import connections, Collection, utility

# Connection to localhost:19530
connections.connect()

# Get two existing collections
collection_1 = Collection("collection_1")
collection_2 = Collection("collection_2")

# Create an alias for collection_1
utility.create_alias(collection_name="collection_1", alias="bob")

# List aliases for both collections
utility.list_aliases(collection_name="collection_1") # ['bob']
utility.list_aliases(collection_name="collection_2") # []
        
# Reassigns the alias to collection_2
utility.alter_alias(collection_name="test_collection_2", alias="bob")

# List aliases for both collections
utility.list_aliases(collection_name="collection_1") # []
utility.list_aliases(collection_name="collection_2") # ['bob']
```

## Related operations

The following operations are related to `alter_alias()`:

- [create_alias()](create_alias.md)

- [drop_alias()](drop_alias.md)

- [list_aliases()](list_aliases.md)

