# list_restore_snapshot_jobs()

This operation lists all restore snapshot jobs. Optionally filter by collection name to see restore jobs targeting a specific collection.

## Request Syntax

```python
list_restore_snapshot_jobs(
    collection_name: str = "",
    timeout: Optional[float] = None,
    **kwargs
) -> List[RestoreSnapshotJobInfo]
```

**PARAMETERS:**

- **collection_name** (*str*) -
An optional collection name to filter restore jobs. If empty, all restore jobs are listed.

- **timeout** (*Optional[float]*) -
An optional duration of time in seconds to allow for the RPC.

**RETURN TYPE:**

*List[RestoreSnapshotJobInfo]*

**RETURNS:**

A list of RestoreSnapshotJobInfo objects, each containing restore job information with the following fields:

```python
{
    'job_id': int,
    'snapshot_name': str,
    'db_name': str,
    'collection_name': str,
    'state': str,
    'progress': int,
    'reason': str,
    'start_time': int,
    'time_cost': int
}
```

**PARAMETERS:**

- **job_id** (*int*) -

    The restore job ID.

- **snapshot_name** (*str*) -

    The snapshot name being restored.

- **db_name** (*str*) -

    The target database name.

- **collection_name** (*str*) -

    The target collection name.

- **state** (*str*) -

    Current state. Possible values: *RestoreSnapshotNone*, *RestoreSnapshotPending*, *RestoreSnapshotExecuting*, *RestoreSnapshotCompleted*, *RestoreSnapshotFailed*.

- **progress** (*int*) -

    Progress percentage (0-100).

- **reason** (*str*) -

    Error reason if the job failed.

- **start_time** (*int*) -

    Start timestamp in milliseconds.

- **time_cost** (*int*) -

    Time cost in milliseconds.

**EXCEPTIONS:**

- **MilvusException**

    If the operation fails.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

# List all restore jobs
jobs = client.list_restore_snapshot_jobs()
for job in jobs:
    print(f"Job {job.job_id}: {job.snapshot_name} -> {job.collection_name} ({job.state})")

# Filter by target collection
jobs = client.list_restore_snapshot_jobs(collection_name="my_collection")
```
