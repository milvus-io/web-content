# truncate()

This operation truncates the current collection, removing all its data. It has the same effect as `utility.truncate_collection()`.

## Request Syntax

```python
truncate(
    timeout: float | None = None
)
```

**PARAMETERS:**

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Collection

collection = Collection("test")

collection.truncate()
```
