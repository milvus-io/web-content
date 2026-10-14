# drop_snapshot()

This operation permanently deletes a snapshot. Once dropped, the snapshot data cannot be recovered.

## Request Syntax

```python
drop_snapshot(
    snapshot_name: str,
    collection_name: str,
    db_name: str = "",
    timeout: Optional[float] = None,
    **kwargs
) -> None
```

**PARAMETERS:**

- **snapshot_name** (*str*) -
**[REQUIRED]**
The name of the snapshot to drop.

- **collection_name** (*str*) -
**[REQUIRED]**
The name of the collection the snapshot belongs to.

- **db_name** (*str*) -
The name of the database that holds the collection. If this parameter is left empty, the default database is used.

- **timeout** (*Optional[float]*) -
An optional duration of time in seconds to allow for the RPC.

**RETURN TYPE:**

*None*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    If the snapshot does not exist or the operation fails.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

client.drop_snapshot(snapshot_name="backup_20260401", collection_name="my_collection")
```
