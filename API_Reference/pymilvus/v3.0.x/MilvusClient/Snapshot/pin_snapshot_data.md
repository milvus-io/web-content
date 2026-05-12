# pin_snapshot_data()

This operation pins snapshot data for a period of time so garbage collection does not remove it while you export or back up files.

## Request Syntax

```python
pin_snapshot_data(
    self,
    snapshot_name: str,
    collection_name: str,
    db_name: str = "",
    ttl_seconds: int = 0,
    timeout: Optional[float] = None,
    **kwargs,
) -> int
```

**PARAMETERS:**

- **snapshot_name** (*str*) -

    The snapshot name to pin.

- **collection_name** (*str*) -

    The collection that owns the snapshot.

- **db_name** (*str*) -

    The database name. Leave empty to use the active database.

- **ttl_seconds** (*int*) -

    Pin lifetime in seconds. `0` uses the server default TTL.

- **timeout** (*Optional[float]*) -

    The timeout for this operation in seconds.

- **kwargs** (*dict*) -

    Additional request options passed to the underlying RPC.

**RETURN TYPE:**

*int*

The `pin_id` used to release this pin with `unpin_snapshot_data()`.

**EXCEPTIONS:**

- **MilvusException**

    Raised when the snapshot cannot be pinned or the request fails.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

pin_id = client.pin_snapshot_data(
    snapshot_name="backup_20260509",
    collection_name="products",
    ttl_seconds=3600,
)

# Copy snapshot data to external storage here.

client.unpin_snapshot_data(pin_id=pin_id)
```
