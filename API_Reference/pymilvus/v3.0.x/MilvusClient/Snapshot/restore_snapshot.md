# restore_snapshot()

This operation restores a snapshot to a new target collection, optionally across databases. The restore runs asynchronously — use `get_restore_snapshot_state()` to monitor progress.

<div class="alert note">

The target collection must not already exist; an existing collection causes the restore job to fail. The **source_collection_name** is required to uniquely identify the snapshot, because snapshot names are only unique within a collection.

</div>

## Request Syntax

```python
client.restore_snapshot(
    snapshot_name: str,
    source_collection_name: str,
    target_collection_name: str,
    source_db_name: str = "",
    target_db_name: str = "",
    timeout: Optional[float] = None
) -> int
```

**PARAMETERS:**

- **snapshot_name** (*str*) -

    **[REQUIRED]**

    The name of the snapshot to restore.

- **source_collection_name** (*str*) -

    **[REQUIRED]**

    The collection that the snapshot belongs to. Required to uniquely identify the snapshot.

- **target_collection_name** (*str*) -

    **[REQUIRED]**

    The collection that the snapshot is restored into. Must not already exist.

- **source_db_name** (*str*) -

    The source database name. Defaults to the active database.

- **target_db_name** (*str*) -

    The target database name. Defaults to the active database.

- **timeout** (*Optional[float]*) -

    An optional duration of time in seconds to allow for the RPC.

**RETURN TYPE:**

*int*

The restore job ID. Use this ID with `get_restore_snapshot_state()` to track the restore progress.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when the snapshot does not exist, the target collection already exists, or the operation fails.

## Examples

```python
from pymilvus import MilvusClient
import time

client = MilvusClient(uri="http://localhost:19530")

# Start restore and get the job ID
job_id = client.restore_snapshot(
    snapshot_name="backup_20260418",
    source_collection_name="my_collection",
    target_collection_name="restored_collection",
)

# Poll for completion
while True:
    state = client.get_restore_snapshot_state(job_id=job_id)
    if state.state == "RestoreSnapshotCompleted":
        print(f"Restore complete: {state.progress}%")
        break
    elif state.state == "RestoreSnapshotFailed":
        print(f"Restore failed: {state.reason}")
        break
    print(f"In progress: {state.progress}%")
    time.sleep(2)
```

## Related methods

- [create_snapshot()](create_snapshot.md)

- [describe_snapshot()](describe_snapshot.md)

- [drop_snapshot()](drop_snapshot.md)

- [list_snapshots()](list_snapshots.md)

- [get_restore_snapshot_state()](get_restore_snapshot_state.md)

- [list_restore_snapshot_jobs()](list_restore_snapshot_jobs.md)
