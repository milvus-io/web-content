# get_bulk_insert_state()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation returns the state of a specified bulk-insert task.

## Request Syntax

```python
get_bulk_insert_state(
    task_id: int,
    timeout: float | None,
    using: str = "default",
    **kwargs,
)
```

**PARAMETERS:**

- **task_id** (*int*) -
**[REQUIRED]**

    A task ID returned by the do_bulk_insert() function.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*[BulkInsertState](BulkInsertState.md)*

**RETURNS:**
A **[BulkInsertState](BulkInsertState.md)** that contains information about the state of the specified bulk-insert task.

```text
├── BulkInsertState
│   ├── task_id 
│   ├── state 
│   ├── state_name   
│   ├── row_count
│   ├── progress
│   └── infos
│       ├── files
│       ├── collection
│       ├── partition
│       ├── failed_reason
│       ├── progress_percent
│       └── persist_cost
│   ├── ids
│   ├── id_ranges
│   ├── files
│   ├── create_timestamp
│   ├── create_time_str
│   └── collection_name
```

For the fields of a **[BulkInsertState](BulkInsertState.md)** object, refer to [BulkInsertState](BulkInsertState.md).

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# Bulk-insert data
task_id = utility.do_bulk_insert(
    collection_name="test_collection",
    files=["data/id.npy", "data/vector.npy"],
) # 446781855410077319

# Get bulk-insert task state
res = utility.get_bulk_insert_state(task_id=task_id)

# <Bulk insert state:
#     - taskID          : 446781855410077319,
#     - state           : Completed,
#     - row_count       : 10000,
#     - infos           : {'files': 'data/id.npy,data/vector.npy', 'collection': 'test_collection_2', 'partition': '_default', 'failed_reason': '', 'progress_percent': '100', 'persist_cost': '0.34'},
#     - id_ranges       : [],
#     - create_ts       : 2024-01-06 22:24:07
# >
```

## Related operations

The following operations are related to `get_bulk_insert_state()`:

- [BulkInsertState](BulkInsertState.md)

- [do_bulk_insert()](do_bulk_insert.md)

- [list_bulk_insert_tasks()](list_bulk_insert_tasks.md)

