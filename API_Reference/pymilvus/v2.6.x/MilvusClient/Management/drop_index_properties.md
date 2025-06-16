# drop_index_properties()

This operation drops the specified index properties.

## Request Syntax

```python
drop_index_properties(
    self,
    collection_name: str,
    index_name: str,
    property_keys: List[str],
    timeout: Optional[float] = None,
    **kwargs,
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    The name of the target collection.

- **index_name** (*str*) -

    The name of the index file to drop.

- **property_keys** (*List[str]*) -

    The names of the properties to drop in a list. Possible properties are as follows:

    - `mmap.enabled`

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

client.drop_index_properties(
    collection_name="collection_name",
    index_name="my_vector", 
    property_keys = ["mmap.enabled"]
)
```

