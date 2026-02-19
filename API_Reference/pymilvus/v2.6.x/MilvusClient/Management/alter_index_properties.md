# alter_index_properties()

This operation changes the specified index properties.

## Request Syntax

```python
alter_index_properties(
    self,
    collection_name: str,
    index_name: str,
    properties: dict,
    timeout: Optional[float] = None,
    **kwargs,
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    The name of the target collection.

- **index_name** (*str*) -

    The name of the index file to alter.

- **properties** (*dict*) -

    The properties and their values after this operation. Possible properties to change include:

    - **mmap.enabled** (*bool*) -

        Whether to enable mmap for the specified index. Setting this to `true` offloads the specified index onto the disk. For details, refer to [Mmap-enabled Data Storage](https://milvus.io/docs/mmap.md)

- **timeout** (*Optional[float]*) - 

    The timeout duration for this operation.

    Setting this to None indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="https://inxx-xxxxxxxxxxxx.api.gcp-us-west1.zillizcloud.com:19530",
    token="user:password"
)

# update properties
properties = {"mmap.enabled": true}

client.alter_index_properties(
    collection_name="collection_name",
    index_name="my_vector", 
    properties = properties
)
```

