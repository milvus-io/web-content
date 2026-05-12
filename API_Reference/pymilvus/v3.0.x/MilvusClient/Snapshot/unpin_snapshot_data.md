# unpin_snapshot_data()

This operation releases a snapshot pin created by `pin_snapshot_data()` so normal snapshot data garbage collection can resume.

## Request Syntax

```python
unpin_snapshot_data(
    self,
    pin_id: int,
    timeout: Optional[float] = None,
    **kwargs,
) -> None
```

**PARAMETERS:**

- **pin_id** (*int*) -

    The pin ID returned by `pin_snapshot_data()`.

- **timeout** (*Optional[float]*) -

    The timeout for this operation in seconds.

- **kwargs** (*dict*) -

    Additional request options passed to the underlying RPC.

**RETURN TYPE:**

*NoneType*

This operation does not return data.

**EXCEPTIONS:**

- **MilvusException**

    Raised when the pin does not exist, has already expired, or the request fails.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

pin_id = client.pin_snapshot_data(
    snapshot_name="backup_20260509",
    collection_name="products",
)

client.unpin_snapshot_data(pin_id=pin_id)
```
