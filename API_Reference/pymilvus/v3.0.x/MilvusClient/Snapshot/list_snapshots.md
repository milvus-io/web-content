# list_snapshots()

This operation lists all snapshot names. Optionally filter by collection name to list snapshots belonging to a specific collection.

## Request Syntax

```python
list_snapshots(
    collection_name: str = "",
    db_name: str = "",
    timeout: Optional[float] = None,
    **kwargs
) -> List[str]
```

**PARAMETERS:**

- **collection_name** (*str*) -
An optional collection name to filter snapshots. If empty, all snapshots are listed.

- **db_name** (*str*) -
An optional database name to filter snapshots. If empty, the default database is used.

- **timeout** (*Optional[float]*) -
An optional duration of time in seconds to allow for the RPC.

**RETURN TYPE:**

*List[str]*

**RETURNS:**

A list of snapshot names.

**EXCEPTIONS:**

- **MilvusException**

    If the operation fails.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

# List all snapshots for a specific collection
snapshots = client.list_snapshots(collection_name="my_collection")
print(snapshots)
# ['backup_20260401', 'backup_20260418']

# List snapshots for another collection
all_snapshots = client.list_snapshots(collection_name="my_other_collection")
```
