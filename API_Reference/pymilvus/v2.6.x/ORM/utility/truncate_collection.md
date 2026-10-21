# truncate_collection()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation truncates a collection by name.

## Request Syntax

```python
truncate_collection(
    collection_name: str,
    timeout: float | None,
    using: str
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    Name of the collection to be truncated.

- **using** (*string*) -

    Alias of the connection. Defaults to **default**.

- **timeout** (*float* | *None*)

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

None

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

conn = connections.connect(
    host="127.0.0.1", 
    port=19530
)

utility.truncate_collection(collection_name="test_collection")
```
