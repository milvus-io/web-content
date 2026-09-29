# alter_index()

This operation alters an index of the current collection.

## Request Syntax

```python
alter_index(
    index_name: str,
    extra_params: dict,
    timeout: float | None = None
)
```

**PARAMETERS:**

- **index_name** (*str*) -

    **[REQUIRED]**

    The name of the index to alter.

- **extra_params** (*dict*) -

    **[REQUIRED]**

    The parameters to update on the index. For example, use `"mmap.enabled"` as the key with `True` or `False` as the value to toggle memory-mapped storage.

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

collection.alter_index(
    index_name="vector_idx",
    extra_params={"mmap.enabled": True},
)
```
