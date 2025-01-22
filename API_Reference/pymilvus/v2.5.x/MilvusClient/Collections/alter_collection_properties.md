# alter_collection_properties()

This operation alters the specified collection properties.

## Request Syntax

```python
alter_collection_properties(
    self, 
    collection_name: str, 
    properties: dict, 
    timeout: Optional[float] = None, 
    **kwargs
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    The name of the target collection.

- **properties** (*dict*) -

    The properties and their new values in a dictionary. Possible dictionary keys are as follows:

    - **collection.ttl.seconds** (*int*) -

        The time-to-live (TTL) of a collection in seconds.

    - **mmap.enabled** (*bool*) -

        Whether to enable mmap for the raw data and indexes of all fields in the collection. For details, refer to [Mmap-enabled Data Storage](https://milvus.io/docs/mmap.md).

    - **partitionkey.isolation** (bool) -

        Whether to enable partition key isolation. For details, refer to [Use Partition Key](https://milvus.io/docs/use-partition-key.md).

- **timeout** (*Optional[float]*) - 

    The timeout duration for this operation.

    Setting this to None indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation, especially when the specified alias does not exist.

## Example

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# upsert properties
properties = {"collection.ttl.seconds": 500, "mmap.enabled": true}

client.alter_collection_properties(
    collection_name="collection_name", 
    properties = properties
)
```

