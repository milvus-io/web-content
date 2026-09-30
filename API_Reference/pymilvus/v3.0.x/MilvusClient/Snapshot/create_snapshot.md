# create_snapshot()

This operation creates a point-in-time snapshot of a collection. Use snapshots to back up collection data and metadata for disaster recovery or migration.

## Request Syntax

```python
client.create_snapshot(
    snapshot_name: str,
    collection_name: str,
    db_name: str = "",
    description: str = "",
    compaction_protection_seconds: int = 0,
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **snapshot_name** (*str*) -

    **[REQUIRED]**

    A unique name for the snapshot. Must not conflict with existing snapshot names.

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection to snapshot.

- **db_name** (*str*) -

    The name of the database that contains the collection. Defaults to the active database.

- **description** (*str*) -

    An optional human-readable description of the snapshot.

- **compaction_protection_seconds** (*int*) -

    The duration in seconds during which the segments referenced by this snapshot are protected from compaction. The value **0** means no protection. Defaults to **0**.

- **timeout** (*Optional[float]*) -

    An optional duration of time in seconds to allow for the RPC. If not provided, the default client-side timeout is used.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when the collection does not exist, the snapshot name is already taken, or the operation fails for any other reason.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

# Recommended: flush before creating snapshot to persist in-memory data
client.flush(collection_name="my_collection")

client.create_snapshot(
    snapshot_name="backup_20260418",
    collection_name="my_collection",
    description="Daily backup before schema change",
    compaction_protection_seconds=3600,
)
```

## Related methods

- [describe_snapshot()](describe_snapshot.md)

- [drop_snapshot()](drop_snapshot.md)

- [list_snapshots()](list_snapshots.md)

- [restore_snapshot()](restore_snapshot.md)

- [pin_snapshot_data()](pin_snapshot_data.md)
