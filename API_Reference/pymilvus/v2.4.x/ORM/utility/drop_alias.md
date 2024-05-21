# drop_alias()

This operation drops a specified collection alias. 

## Request Syntax

```python
drop_alias(
    collection_name: str,
    alias: str,
    using: str,
    timeout: float | None
)
```

**PARAMETERS:**

- **alias** (*str*) -

    **[REQUIRED]**

    The alias to drop.

    <div class="admonition note">

    <p><b>notes</b></p>

    <p>When dropping an alias, you do not need to provide the collection name because one alias can only be assigned to exactly one collection. Therefore, the server knows which collection the specified alias belongs to.</p>

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

    This exception will be raised when any error occurs during this operation.

- **BaseException**

    This exception will be raised when this operation fails.

## Examples

```python
from pymilvus import connections, Collection, utility

# Connection to localhost:19530
connections.connect()

# Get an existing collection
collection_1 = Collection("collection_1")

# Create an alias for collection_1
utility.create_alias(collection_name="collection_1", alias="bob")

# List aliases for the collection
utility.list_aliases(collection_name="collection_1") # ['bob']

# Create another alias for collection_1
utility.create_alias(collection_name="collection_1", alias="tom")

# List aliases for the collection
utility.list_aliases(collection_name="collection_1") # ['bob', 'tom']

# Drop the alias bob
utility.drop_alise(alias="bob")

# List aliases for the collection
utility.list_aliases(collection_name="collection_1") # ['tom']
```

## Related operations

The following operations are related to `drop_alias()`:

- [alter_alias()](alter_alias.md)

- [create_alias()](create_alias.md)

- [list_aliases()](list_aliases.md)

