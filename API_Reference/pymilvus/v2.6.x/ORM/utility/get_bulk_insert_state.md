# get_bulk_insert_state()

This operation returns the state of a specified bulk-insert task.

## Request syntax

```python
get_bulk_insert_state(
    task_id: int,
    timeout: float | None,
    using: str = "default",
    **kwargs,
)
```

```python
from pymilvus import connections, utility
connections.connect()

task_id = utility.do_bulk_insert(
    collection_name="string",
    files=["string.npy", "string.npy"],
)

# Get bulk-insert task state
res = utility.get_bulk_insert_state(task_id=task_id)
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

RETURN TYPE:

*BulkInsertState*

**RETURNS:**
A **BulkInsertState** that contains information about the state of the specified bulk-insert task.

```python
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

A **BulkInsertState** object has the following fields

- **task_id** (*int*)

    A task ID returned by the **do_bulk_insert()** function.

- **state** (*int*)

    The state of the specified bulk_insert task in integers. Possible values are the following integers:

    - **0**: Indicates that the task is in a pending state

    - **1**: Indicates that the task failed.

    - **2**: Indicates that the task has already started.

    - **5**: Indicates that the data has been persisted.

    - **6**: Indicates that the task has been completed.

    - **7**: Indicates that the task failed and the data has been cleaned up.

    - **100**: Indicates that the task is in an unknown state.

- **state_name** (*str*)

    The state of the specified bulk_insert task in integers. Possible values are the following integers:

    - **Pending**: Indicates that the task is in a pending state

    - **Failed**: Indicates that the task failed.

    - **Started**: Indicates that the task has already started.

    - **Persisted**: Indicates that the data has been persisted.

    - **Completed**: Indicates that the task has been completed.

    - **FailedAndCleaned**: Indicates that the task failed and the data has been cleaned up.

    - **Unknown**: Indicates that the task is in an unknown state.

- **row_count** (*int*)

    The number of entities inserted in the current bulk-insert task.

- **progress** (*int*) 

    The progress of the current bulk-insert task.

- **infos** (*dict*)

    A dictionary containing information about the current bulk-insert task. Possible keys are as follows:

    - **files** (*str*)

        The names of the files involved in the current bulk-insert task in a comma-separated string.

    - **collection** (*str*)

        The name of the target collection.

    - **partition** (*str*)

        The name of the target partition.

    - **failed_reason** (*str*)

        The reason for any bulk-insert failures. If the task succeeds, this is an empty string.

    - **progress_percent** (str)

        The progress of the current bulk-insert task in percentage.

    - **persist_cost** (str)

        The persistence cost of the current bulk-insert task.

- **ids** (*list*) 

    The IDs of the inserted entities in a list.

- **id_ranges** (*google._upb._message.RepeatedScalarContainer*)

- The ID of the inserted entities in a range.

- **files** (str)

    The names of the files involved in the current bulk-insert task in a comma-separated string.

- **create_timestamp** (int)

    The timestamp at which the current bulk-insert task has been created.

- **create_time_str** (str)

    The timestamp at which the current bulk-insert task has been created, in a human-readable string.

- **collection_name** (str)

    The name of the target collection.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

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

