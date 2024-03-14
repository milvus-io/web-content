
# refresh_load()

This operation loads the unloaded data of a loaded collection into memory.

## Request syntax

```python
refresh_load(
    collection_name: str,
    timeout: Optional[str] = None
)
```

__PARAMETERS:__

- __collection_name__ (_str_) -

    __[REQUIRED]__

    The name of the target collection of this operation.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. 

    Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

 None

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient

# 1. Set up a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a collection
client.create_collection(
    collection_name="test_collection",
    dimension=5
)

# 3. Refresh the load status of the collection
client.refresh_load(
    collection_name="test_collection"
)
```

