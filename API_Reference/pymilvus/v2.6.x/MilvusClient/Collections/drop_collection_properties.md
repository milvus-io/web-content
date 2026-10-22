# drop_collection_properties()

This operation drops the specified collection properties.

## Request Syntax

```python
drop_collection_properties(
    self,
    collection_name: str,
    property_keys: List[str],
    timeout: Optional[float] = None,
    **kwargs,
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    The name of the target collection.

- **property_keys** (*List[str]*) -

    The names of the properties to drop in a list. Possible values are as follows:

    - `collection.ttl.seconds`

    - `mmap.enabled`

    - `partitionkey.isolation`

- **timeout** (*Optional[float]*) - 

    The timeout duration for this operation.

    Setting this to None indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation, especially when the specified alias does not exist.

## Example

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a collection and set its properties
client.create_collection(
    collection_name="my_collection",
    dimension=5
)
client.release_collection(collection_name="my_collection")
client.alter_collection_properties(
    collection_name="my_collection",
    properties={"mmap.enabled": True, "collection.ttl.seconds": 500}
)

# 3. Drop the properties
property_keys = ["mmap.enabled", "collection.ttl.seconds"]

client.drop_collection_properties(
    collection_name="my_collection", 
    property_keys=property_keys
)
```

