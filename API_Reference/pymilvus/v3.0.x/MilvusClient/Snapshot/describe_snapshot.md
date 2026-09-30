# describe_snapshot()

This operation retrieves detailed metadata about a specific snapshot, including the source collection, partition names, creation timestamp, and storage location.

## Request Syntax

```python
describe_snapshot(
    snapshot_name: str,
    timeout: Optional[float] = None,
    **kwargs
) -> SnapshotInfo
```

**PARAMETERS:**

- **snapshot_name** (*str*) -
**[REQUIRED]**
The name of the snapshot to describe.

- **timeout** (*Optional[float]*) -
An optional duration of time in seconds to allow for the RPC.

**RETURN TYPE:**

*SnapshotInfo*

**RETURNS:**

A dataclass containing snapshot metadata with the following fields:

```python
{
    'name': str,
    'description': str,
    'collection_name': str,
    'partition_names': List[str],
    'create_ts': int,
    's3_location': str
}
```

**PARAMETERS:**

- **name** (*str*) - 

    The snapshot name.

- **description** (*str*) - 

    The snapshot description.

- **collection_name** (*str*) - 

    The source collection name.

- **partition_names** (*List[str]*) - 

    List of partition names included in the snapshot.

- **create_ts** (*int*) - 

    Creation timestamp in milliseconds.

- **s3_location** (*str*) - 

    S3 storage location of the snapshot data.

**EXCEPTIONS:**

- **MilvusException**

    If the snapshot does not exist or the operation fails.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

info = client.describe_snapshot(snapshot_name="backup_20260418")
print(f"Snapshot: {info.name}")
print(f"Collection: {info.collection_name}")
print(f"Partitions: {info.partition_names}")
print(f"Created at: {info.create_ts}")
print(f"S3 location: {info.s3_location}")
```
